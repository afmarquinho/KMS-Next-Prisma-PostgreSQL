import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { ref: string } }
) => {
  try {
    const { ref } = params;
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;

    if (!ref) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "Referencia del producto no proporcionado.",
        },
        { status: 400 }
      );
    }

    const res = await prisma.product.findMany({
      where: {
        Prod_ref: ref,
      },
      select: {
        Prod_id: true,
        Prod_batch: true,
        createdAt: true,
        Prod_batchDueDate: true,
        Prod_stock: true,
        Prod_margin: true,
        Prod_validity: true,
        Prod_saleEnabled: true,
        Prod_procurementEnabled: true,
        Prod_location: true,
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
      skip: offset,
      take: limit,
    });

    const totalRecords = await prisma.product.count({
      where: { Prod_ref: ref },
    });

    if (!res || res.length === 0) {
      return NextResponse.json(
        { ok: false, data: null, message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        data:{ res},
        total: totalRecords,
        page,
        pageSize: res.length,
        message: "Productos obtenidos exitosamente",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: error instanceof Error ? error.message : "Error interno",
      },
      { status: 500 }
    );
  }
};
