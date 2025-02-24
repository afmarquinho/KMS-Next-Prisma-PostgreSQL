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
      Cust_dni,
      Cust_name,
      Cust_surname,
      Cust_email,
      Cust_phoneNumber,
      Cust_address,
    } = body;

    //* Validación de campos obligatorios
    if (
      !Cust_dni ||
      !Cust_name ||
      !Cust_surname ||
      !Cust_email ||
      !Cust_phoneNumber ||
      !Cust_address
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
      where: { Cust_id: customerId },
    });

    if (!existingCustomer) {
      return NextResponse.json(
        { ok: false, data: null, message: "Cliente no encontrado." },
        { status: 404 }
      );
    }

    // Verificar si el email ya está en uso por otro usuario
    const existingEmail = await prisma.customer.findUnique({
      where: { Cust_email },
    });

    if (existingEmail && existingEmail.Cust_id !== customerId) {
      return NextResponse.json(
        { ok: false, data: null, message: "Email ya está en uso." },
        { status: 400 }
      );
    }
    // TODO: Manejar el userId
    // Actualizar cliente
    const updatedCustomer = await prisma.customer.update({
      where: { Cust_id: customerId },
      data: {
        Cust_dni,
        Cust_name,
        Cust_surname,
        Cust_email,
        Cust_phoneNumber,
        Cust_address,
        Cust_userId: 5,
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
      where: { Cust_id: customerId },
      select: {
        Cust_id: true,
        Cust_address: true,
        Cust_dni: true,
        Cust_email: true,
        Cust_habeasData: true,
        Cust_name: true,
        Cust_surname: true,
        Cust_phoneNumber: true,
        Cust_registrationDate: true,
        Cust_userId: true,
        
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
