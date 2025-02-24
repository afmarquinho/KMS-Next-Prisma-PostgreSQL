import { prisma } from "@/lib/db";
import {  NextResponse } from "next/server";

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