import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({
      orderBy: {
        Supp_name: "asc",
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
      Supp_nit,
      Supp_name,
      Supp_contactInfo,
      Supp_email,
      Supp_phoneNumber,
      Supp_city,
      Supp_address,
    } = body;

    // Validar que los campos requeridos estén presentes
    if (
      !Supp_nit ||
      !Supp_name ||
      !Supp_contactInfo ||
      !Supp_email ||
      !Supp_phoneNumber ||
      !Supp_city ||
      !Supp_address
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
        Supp_nit,
        Supp_name,
        Supp_contactInfo,
        Supp_email,
        Supp_phoneNumber,
        Supp_city,
        Supp_address,
        Supp_userId: 1,
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
