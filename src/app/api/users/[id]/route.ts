import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    // const id = req.url.split("/").pop() Extracción directa de la url, tambien es posible.
   
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

   if (!id) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID no proporcionado." },
        { status: 400 }
      );
    }

    const userId = parseInt(id, 10);

    if (isNaN(userId)) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID inválido." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const {
      User_address,
      User_phoneNumber,
      User_role,
      User_depId,
      User_email,
      User_active,
    } = body;

    //* Validación de campos obligatorios
    if (
      !User_address ||
      !User_phoneNumber ||
      !User_role ||
      !User_depId ||
      !User_email ||
      User_active === undefined
    ) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "Todos los campos son obligatorios.",
        },
        { status: 400 }
      );
    }

    // Verificar si el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { User_id: userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { ok: false, data: null, message: "Usuario no encontrado." },
        { status: 404 }
      );
    }

    // Verificar si el email ya está en uso por otro usuario
    const existingEmail = await prisma.user.findUnique({
      where: { User_email },
    });

    if (existingEmail && existingEmail.User_id !== userId) {
      return NextResponse.json(
        { ok: false, data: null, message: "Email ya está en uso." },
        { status: 400 }
      );
    }

    // Actualizar usuario
    const updatedUser = await prisma.user.update({
      where: { User_id: userId },
      data: {
        User_role,
        User_email,
        User_phoneNumber,
        User_address,
        User_depId,
        User_active,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        data: updatedUser,
        message: "Usuario actualizado exitosamente.",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("Error al actualizar el usuario:", errorMessage);

    return NextResponse.json(
      { ok: false, data: null, message: "Error en el servidor." },
      { status: 500 }
    );
  }
}