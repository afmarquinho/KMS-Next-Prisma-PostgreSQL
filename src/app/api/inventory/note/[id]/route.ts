import { prisma } from "@/lib/db";
import { formatISOToDate } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID de la compra inválido." },
        { status: 400 }
      );
    }
    const proId = Number(id);

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
    if (!note || typeof note !== "string" || note.trim().length < 5 || note.length > 200) {
      return NextResponse.json(
        { ok: false, data: null, message: "El comentario debe tener entre 5 y 200 caracteres." },
        { status: 400 }
      );
    }

    // TODO: Obtener userId dinámicamente
    const userId = 1;

    const newNote = await prisma.procurementNote.create({
      data: {
        Note_content: note.trim(),
        Note_userId: userId,
        Note_proId: proId,
      },
      select: {
        Note_id: true,
        Note_content: true,
        Note_createdAt: true,
        User: { select: { User_name: true, User_surname: true } },
      },
    });

    return NextResponse.json(
      {
        ok: true,
        data: { ...newNote, Note_createdAt: formatISOToDate(newNote.Note_createdAt) },
        message: "Comentario agregado exitosamente",
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error al agregar el comentario:", error);
    return NextResponse.json(
      { ok: false, data: null, message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
