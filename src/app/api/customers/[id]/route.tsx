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

    const customerId = parseInt(id, 10);

    if (isNaN(customerId)) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID inválido." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const {
      Customer_dni,
      Customer_name,
      Customer_surname,
      Customer_email,
      Customer_phoneNumber,
      Customer_address,
    } = body;

    //* Validación de campos obligatorios
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

    // Verificar si el cliente ya existe.
    const existingCustomer = await prisma.customer.findUnique({
      where: { Customer_id: customerId },
    });

    if (!existingCustomer) {
      return NextResponse.json(
        { ok: false, data: null, message: "Cliente no encontrado." },
        { status: 404 }
      );
    }

    // Verificar si el email ya está en uso por otro usuario
    const existingEmail = await prisma.customer.findUnique({
      where: { Customer_email },
    });

    if (existingEmail && existingEmail.Customer_id !== customerId) {
      return NextResponse.json(
        { ok: false, data: null, message: "Email ya está en uso." },
        { status: 400 }
      );
    }
    // TODO: Manejar el userId
    // Actualizar cliente
    const updatedCustomer = await prisma.customer.update({
      where: { Customer_id: customerId },
      data: {
        Customer_dni,
        Customer_name,
        Customer_surname,
        Customer_email,
        Customer_phoneNumber,
        Customer_address,
        Customer_userId: 5,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        data: updatedCustomer,
        message: "Cliente actualizado exitosamente.",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("Error al actualizar el cliente:", errorMessage);

    return NextResponse.json(
      { ok: false, data: null, message: "Error en el servidor." },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
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

    const customerId = parseInt(id, 10);

    if (isNaN(customerId)) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID inválido." },
        { status: 400 }
      );
    }

    // TODO: Manejar el userId
    // Actualizar cliente
    const customer = await prisma.customer.findUnique({
      where: { Customer_id: customerId },
      select: {
        Customer_id: true,
        Customer_address: true,
        Customer_dni: true,
        Customer_email: true,
        Customer_habeasData: true,
        Customer_name: true,
        Customer_surname: true,
        Customer_phoneNumber: true,
        Customer_registrationDate: true,
        Customer_userId: true,
        Sales: true,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        data: customer,
        message: "Cliente cargado.",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("Error al cargar el cliente:", errorMessage);

    return NextResponse.json(
      { ok: false, data: null, message: "Error en el servidor." },
      { status: 500 }
    );
  }
}
