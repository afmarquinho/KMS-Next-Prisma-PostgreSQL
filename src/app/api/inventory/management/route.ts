import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Extraer los parámetros de búsqueda
    const stock = searchParams.get("stock");
    const batch = searchParams.get("batch");
    const marginMin = searchParams.get("margin_min");
    const marginMax = searchParams.get("margin_max");
    const minCost = searchParams.get("unit_cost_min");
    const maxCost = searchParams.get("unit_cost_max");
    const category = searchParams.get("category");
    const supplierName = searchParams.get("supplier");
    const startDate = searchParams.get("createdAt_min");
    const endDate = searchParams.get("createdAt_max");
    const ref = searchParams.get("ref");
    const name = searchParams.get("name");
    const procurementEnabled = searchParams.get("procurementEnabled");
    const saleEnabled = searchParams.get("saleEnabled");

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("page_size") || "20", 10);
    const offset = (page - 1) * limit;

    // Construcción dinámica del filtro `where`
    const where: Prisma.InventoryWhereInput = {};

    if (stock) where.Inv_stock = parseInt(stock);
    if (saleEnabled) where.Inv_saleEnabled = saleEnabled === "true";
    if (batch) where.Inv_batch = { contains: batch, mode: "insensitive" };
    if (marginMin || marginMax) {
      where.Inv_margin = {};
      if (marginMin) where.Inv_margin.gte = parseFloat(marginMin);
      if (marginMax) where.Inv_margin.lte = parseFloat(marginMax);
    }
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const whereProduct: Prisma.ProductWhereInput = {};

    if (procurementEnabled)
      whereProduct.Prod_procurementEnabled = procurementEnabled === "true";
    if (category)
      whereProduct.Category = {
        Cat_name: { contains: category, mode: "insensitive" },
      };
    if (ref) whereProduct.Prod_ref = { contains: ref, mode: "insensitive" };
    if (name) whereProduct.Prod_name = { contains: name, mode: "insensitive" };

    const whereItem: Prisma.ItemWhereInput = {};
    if (minCost || maxCost) {
      whereItem.Item_unitCost = {};
      if (minCost) whereItem.Item_unitCost.gte = parseFloat(minCost);
      if (maxCost) whereItem.Item_unitCost.lte = parseFloat(maxCost);
    }

    const whereSupplier: Prisma.SupplierWhereInput = {};
    if (supplierName)
      whereSupplier.Supp_name = { contains: supplierName, mode: "insensitive" };

    console.log("Buscando el inventario...");
    console.log("Clausula where", where);

    // Consulta Prisma con relaciones
    const data = await prisma.inventory.findMany({
      where: {
        ...where,
        Product: { ...whereProduct },
        Item: { ...whereItem, Procurement: { Supplier: { ...whereSupplier } } },
      },
      select: {
        Inv_id: true,
        Inv_stock: true,
        Inv_saleEnabled: true,
        Inv_location: true,
        Inv_batch: true,
        Inv_batchDueDate: true,
        Inv_margin: true,
        createdAt: true,
        Product: {
          select: {
            Prod_name: true,
            Prod_procurementEnabled: true,
            Prod_ref: true,
            Category: {
              select: {
                Cat_name: true,
              },
            },
          },
        },
        Item: {
          select: {
            Item_unitCost: true,
            Procurement: {
              select: {
                Supplier: {
                  select: {
                    Supp_name: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "asc" },
      skip: offset,
      take: limit,
    });

    
    const totalRecords = await prisma.inventory.count({
      where: {
      ...where,
      Product: { ...whereProduct },
      Item: { ...whereItem, Procurement: { Supplier: { ...whereSupplier } } },
    }});

    return NextResponse.json({
      ok: true,
      data,
      total: totalRecords,
      page,
      pageSize: limit,
      message: "Productos obtenidos exitosamente.",
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return NextResponse.json(
      {
        ok: false,
        data: null,
        total: 0,
        page: 0,
        pageSize: 0,
        message: "Error interno del servidor.",
      },
      { status: 500 }
    );
  }
}
