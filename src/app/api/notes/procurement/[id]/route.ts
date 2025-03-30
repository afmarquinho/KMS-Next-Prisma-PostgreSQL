import { prisma } from "@/lib/db";
import { formatISOToDate } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID de la compra inválido." },
        { status: 400 }
      );
    }
    const procurementId = parseInt(id, 10);

    let body;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, data: null, message: "Cuerpo de la petición inválido." },
        { status: 400 }
      );
    }

    const { note } = body;
    if (
      !note ||
      typeof note !== "string" ||
      note.trim().length < 5 ||
      note.length > 200 
    ) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "El comentario debe tener entre 5 y 200 caracteres.",
        },
        { status: 400 }
      );
    }

    // TODO: Obtener userId dinámicamente
    const createdBy = 5;

    console.log("pasa todas las validaciones")

    const newNote = await prisma.procurementNote.create({
      data: {
        Note_content: note.trim(),
        Note_procId: procurementId,
        createdBy,
      },
      include: {
        User: { select: { User_name: true, User_surname: true } },
      },
    });

    return NextResponse.json(
      {
        ok: true,
        data: {
          ...newNote,
          createdAt: formatISOToDate(newNote.createdAt),
        },
        message: "Comentario agregado exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear el comentario:", error);
    return NextResponse.json(
      { ok: false, data: null, message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
