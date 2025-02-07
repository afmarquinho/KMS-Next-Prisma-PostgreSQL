import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { User_surname: "asc" },
    });

    return NextResponse.json(
      {
        ok: true,
        data: users,
        message:
          users.length === 0
            ? "No hay usuarios en la base de datos."
            : "Usuarios cargados exitosamente.",
      },
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

//TODO: Hacer el hash de la contraseña

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      User_dni,
      User_role,
      User_name,
      User_surname,
      User_email,
      User_password,
      User_phoneNumber,
      User_address,
      User_depId,
    } = body;

    // Validación de campos requeridos
    if (
      !User_dni ||
      !User_role ||
      !User_name ||
      !User_surname ||
      !User_email ||
      !User_password ||
      !User_phoneNumber ||
      !User_address ||
      !User_depId
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

    // Validación de email
    const existingEmail = await prisma.user.findUnique({
      where: { User_email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { ok: false, data: null, message: "Email ya existe." },
        { status: 400 }
      );
    }

    // Validación de DNI único
    const existingUser = await prisma.user.findUnique({
      where: { User_dni },
    });

    if (existingUser) {
      return NextResponse.json(
        { ok: false, data: null, message: "El DNI ya está registrado." },
        { status: 400 }
      );
    }

    // // Validación del teléfono
    // const existingPhone = await prisma.user.findUnique({
    //   where: { User_phoneNumber },
    // });

    // if (existingPhone) {
    //   return NextResponse.json(
    //     { ok: false, data: null, message: "El téléfono ya existe." },
    //     { status: 400 }
    //   );
    // }

    const newUser = await prisma.user.create({
      data: {
        User_dni,
        User_role,
        User_name,
        User_surname,
        User_email,
        User_password,
        User_phoneNumber,
        User_address,
        User_depId,
      },
    });

    return NextResponse.json(
      { ok: true, data: newUser, message: "Usuario creado exitosamente." },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("No se pudo crear el usuario: ", errorMessage);

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


