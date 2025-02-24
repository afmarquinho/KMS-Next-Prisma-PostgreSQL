import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID no proporcionado." },
        { status: 400 }
      );
    }

    const supplierId = parseInt(id, 10);

    if (isNaN(supplierId)) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "El ID del proveedor no es válido.",
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const {
      Supp_name,
      Supp_contactInfo,
      Supp_email,
      Supp_phoneNumber,
      Supp_city,
      Supp_address,
    } = body;

    // Validar que los campos requeridos estén presentes
    if (
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

    // Verificar si el cliente ya existe.
    const existingSupplier = await prisma.supplier.findUnique({
      where: { Supp_id: supplierId },
    });

    if (!existingSupplier) {
      return NextResponse.json(
        { ok: false, data: null, message: "El proveedor no existe." },
        { status: 404 }
      );
    }

    // TODO: Manejar el userId
    // Actualizar cliente
    const updatedSupplier = await prisma.supplier.update({
      where: { Supp_id: supplierId },
      data: {
        Supp_name,
        Supp_contactInfo,
        Supp_email,
        Supp_phoneNumber,
        Supp_city,
        Supp_address,
        Supp_userId: 2,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        data: updatedSupplier,
        message: "Proveedor actualizado exitosamente.",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("Error al actualizar proveedor: ", errorMessage);

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
