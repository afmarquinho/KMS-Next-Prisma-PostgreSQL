import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        Customer_surname: "asc",
      },
    });

    return NextResponse.json(
      {
        ok: true,
        data: customers,
        message:
          customers.length === 0
            ? "No hay clientes registrados."
            : "Clientes cargados exitosamente.",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("No se pudo mostrar los clientes: ", errorMessage);

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

    const {
      Customer_dni,
      Customer_name,
      Customer_surname,
      Customer_email,
      Customer_phoneNumber,
      Customer_address,
    } = body;
    // Validación de campos requeridos
    if (
      !Customer_dni ||
      !Customer_name ||
      !Customer_surname ||
      !Customer_email ||
      !Customer_phoneNumber ||
      !Customer_address
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
    const existingEmail = await prisma.customer.findUnique({
      where: { Customer_email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { ok: false, data: null, message: "Email ya existe." },
        { status: 400 }
      );
    }

    // Validación de DNI único
    const existingUser = await prisma.customer.findUnique({
      where: { Customer_dni },
    });

    if (existingUser) {
      return NextResponse.json(
        { ok: false, data: null, message: "El DNI ya está registrado." },
        { status: 400 }
      );
    }
    // TODO: Cambiar el userId
    const newCustomer = await prisma.customer.create({
      data: {
        Customer_dni,
        Customer_name,
        Customer_surname,
        Customer_email,
        Customer_phoneNumber,
        Customer_address,
        Customer_userId: 2       
      },
    })
    return NextResponse.json(
      { ok: true, data: newCustomer, message: "Cliente creado exitosamente." },
      { status: 201 }
    )


  } catch (error) {

    const errorMessage =
    error instanceof Error ? error.message : JSON.stringify(error);
  console.error("No se pudo crear el cliente: ", errorMessage);

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
