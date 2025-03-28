import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const stock = searchParams.get("prod_stock");
    const procurementEnabled = searchParams.get("prod_procurementEnabled");
    const saleEnabled = searchParams.get("prod_saleEnabled");
    const lote = searchParams.get("prod_batch");
    const margenMin = searchParams.get("prod_margin_min");
    const margenMax = searchParams.get("prod_margin_max");
    const costoMin = searchParams.get("prod_unit_cost_min");
    const costoMax = searchParams.get("prod_unit_cost_max");
    const categoria = searchParams.get("prod_category");
    const proveedor = searchParams.get("prod_supplier");
    const fechaInicio = searchParams.get("prod_createdAt_min");
    const fechaFin = searchParams.get("prod_createdAt_max");
    const referencia = searchParams.get("prod_ref");
    const nombre = searchParams.get("prod_name");

    const page = parseInt(searchParams.get("prod_page") || "1", 10);
    const limit = parseInt(searchParams.get("prod_page_size") || "20", 10);
    const offset = (page - 1) * limit;

    // Construcción dinámica del WHERE
    const where: Prisma.ProductWhereInput = {};

    // Filtros directos en la tabla Product
    if (stock !== null) {
      where.Prod_stock = stock === "0" ? 0 : { gt: 0 };
    }

    if (procurementEnabled !== null) {
      where.Prod_procurementEnabled = procurementEnabled === "1";
    }

    if (saleEnabled !== null) {
      where.Prod_saleEnabled = saleEnabled === "1";
    }

    if (lote !== null) where.Prod_batch = lote;

    if (margenMin !== null || margenMax !== null) {
      where.Prod_margin = {
        ...(margenMin !== null ? { gte: parseFloat(margenMin) / 100 } : {}),
        ...(margenMax !== null ? { lte: parseFloat(margenMax) / 100 } : {}),
      };
    }

    if (fechaInicio !== null || fechaFin !== null) {
      where.createdAt = {
        ...(fechaInicio !== null ? { gte: new Date(fechaInicio) } : {}),
        ...(fechaFin !== null ? { lte: new Date(fechaFin) } : {}),
      };
    }

    if (nombre !== null) {
      where.Prod_name = { contains: nombre, mode: "insensitive" };
    }

    if (referencia !== null) {
      where.Prod_ref = { contains: referencia, mode: "insensitive" };
    }

    // Filtros en relaciones
    if (
      costoMin !== null ||
      costoMax !== null ||
      categoria !== null ||
      proveedor !== null
    ) {
      where.Item = {
        ...(costoMin !== null
          ? { Item_unitCost: { gte: parseFloat(costoMin) } }
          : {}),
        ...(costoMax !== null
          ? { Item_unitCost: { lte: parseFloat(costoMax) } }
          : {}),
        ...(categoria !== null
          ? {
              Category: {
                Cat_name: { contains: categoria, mode: "insensitive" },
              },
            }
          : {}),
        ...(proveedor !== null
          ? {
              Procurement: {
                Supplier: {
                  Supp_name: { contains: proveedor, mode: "insensitive" },
                },
              },
            }
          : {}),
      };
    }

    // Consulta de productos con filtros y paginación
    const products = await prisma.product.findMany({
      where,
      select: {
        Prod_id: true,
        Prod_name: true,
        Prod_ref: true,
        Prod_stock: true,
        Prod_batch: true,
        Prod_procurementEnabled: true,
        Prod_saleEnabled: true,
        Prod_margin: true,
        Item: {
          select: {
            Item_unitCost: true,
            Category: {
              select: {
                Cat_name: true,
              },
            },
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
      orderBy: { Prod_id: "asc" },
      skip: offset,
      take: limit,
    });

    // Segunda consulta para obtener el total de registros sin paginación
    const totalRecords = await prisma.product.count({ where });

    return NextResponse.json({
      ok: true,
      data: products,
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
