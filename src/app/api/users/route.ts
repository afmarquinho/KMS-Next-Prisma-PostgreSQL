import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { User_surname: "asc" },
    });
    if (users.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "No hay usuarios en la base de datos.",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { ok: true, data: users, message: "Usuarios cargados exitosamente." },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("No se pudo mostrar los usuarios: ", errorMessage);

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
