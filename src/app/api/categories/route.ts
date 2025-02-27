import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        Cat_name: "asc",
      },
    });

    return NextResponse.json(
      {
        ok: true,
        data: categories,
        message:
          categories.length === 0
            ? "No hay categorías registradas."
            : "Categorías cargadas exitosamente.",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("No se pudo mostrar las categorías: ", errorMessage);

    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: error instanceof Error ? error.message : "Error desconocido.",
      },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { Cat_name } = body;
    // Validación de campos requeridos
    if (!Cat_name) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "El nombre de la castegoría es obligatorio.",
        },
        { status: 400 }
      );
    }

    // TODO: Cambiar el userId
    const newCategory = await prisma.category.create({
      data: { ...body, Cat_createdBy: 2 },
    });

    return NextResponse.json(
      {
        ok: true,
        data: newCategory,
        message: "Categoría creada exitosamente." 
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("No se pudo crear la categoría: ", errorMessage);

    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: error instanceof Error ? error.message : "Error desconocido.",
      },
      { status: 500 }
    );
  }
}
