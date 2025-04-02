import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await prisma.product.findMany({
      orderBy: { Prod_name: "asc" },
      include: {
        Category: {
          select: {
            Cat_name: true,
          },
        },
      },
    });

    return NextResponse.json(
      { ok: true, data: res, message: "Se cargaron los productos." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al cargar los productos: ", error);

    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: error instanceof Error ? error.message : "Error desconocido.",
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    // TODO: Obtener userId dinámicamente
    const createdBy = 5;

    const res = await prisma.product.create({
      data: {
        ...body,
        Prod_brand: body.Prod_brand ? body.Prod_brand : null,
        createdBy,
      },
      include: {
        Category: {
          select: {
            Cat_name: true,
          },
        },
      },
    });
  

    return NextResponse.json(
      { ok: true, data: res, message: "Producto creado exitosamente." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al crear el producto: ", error);

    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: error instanceof Error ? error.message : "Error desconocido.",
      },
      { status: 500 }
    );
  }
};
