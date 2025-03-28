import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const GET = async (
  req: NextRequest,
  { params }: { params: { ref: string } }
) => {
  try {
    const { ref } = params;

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

    const res = await prisma.product.findFirst({
      where: {
        Prod_ref: ref,
      },
      include: {
        Category: {
          select: {
            Cat_name: true,
          },
        },
        Item: {
          select: {
            Item_unitMeasure: true,
          },
        },
      },
    });

    if (!res) {
      return NextResponse.json(
        { ok: false, data: null, message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const totalStock = await prisma.product
      .aggregate({
        where: { Prod_ref: ref },
        _sum: { Prod_stock: true },
      })
      .then((res) => res._sum.Prod_stock ?? 0);

    const product = {
      Prod_ref: res.Prod_ref,
      Prod_name: res.Prod_name,
      Prod_stock: totalStock,
      Prod_procurementEnabled: true,
      Prod_Category: res.Category.Cat_name,
      Prod_unitMeasure: res.Item.Item_unitMeasure,
    };

    return NextResponse.json(
      { ok: true, data: product, message: "Producto cargadio" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al obentener el producto:", error);
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
