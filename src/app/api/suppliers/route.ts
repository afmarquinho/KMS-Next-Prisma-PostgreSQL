import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({
      orderBy: {
        Supplier_name: "asc",
      },
    });

    return NextResponse.json(
      {
        ok: true,
        data: suppliers,
        message:
          suppliers.length === 0
            ? "No hay proveedores registrados."
            : "Proveedores cargados exitosamente.",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("No se pudo mostrar los proveedores: ", errorMessage);

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
      Supplier_nit,
      Supplier_name,
      Supplier_contactInfo,
      Supplier_email,
      Supplier_phoneNumber,
      Supplier_city,
      Supplier_address,
    } = body;

    // Validar que los campos requeridos estén presentes
    if (
      !Supplier_nit ||
      !Supplier_name ||
      !Supplier_contactInfo ||
      !Supplier_email ||
      !Supplier_phoneNumber ||
      !Supplier_city ||
      !Supplier_address
    ) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "Todos los campos requeridos deben ser proporcionados.",
        },
        { status: 400 }
      );
    }

    // Crear nuevo proveedor
    const newSupplier = await prisma.supplier.create({
      data: {
        Supplier_nit,
        Supplier_name,
        Supplier_contactInfo,
        Supplier_email,
        Supplier_phoneNumber,
        Supplier_city,
        Supplier_address,
        Supplier_userId: 1,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        data: newSupplier,
        message: "Proveedor registrado exitosamente.",
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("Error al registrar proveedor: ", errorMessage);

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
