import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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

    const supplierId = parseInt(id, 10);

    if (isNaN(supplierId)) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID inválido." },
        { status: 400 }
      );
    }

    // TODO: Manejar el userId
    // Actualizar cliente
    const customer = await prisma.supplier.findUnique({
      where: { Supplier_id: supplierId },
    });

    return NextResponse.json(
      {
        ok: true,
        data: customer,
        message: "Proveedor cargado.",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("Error al cargar el proveedor:", errorMessage);

    return NextResponse.json(
      { ok: false, data: null, message: "Error en el servidor." },
      { status: 500 }
    );
  }
}

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

    // Buscar el proveedor
    const supplier = await prisma.supplier.findUnique({
      where: { Supplier_id: supplierId },
      select: { Supplier_active: true },
    });

    if (!supplier) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "Proveedor no encontrado.",
        },
        { status: 404 }
      );
    }

    // Invertir el estado de Supplier_active
    const updatedSupplier = await prisma.supplier.update({
      where: { Supplier_id: supplierId },
      data: { Supplier_active: !supplier.Supplier_active },
    });

    return NextResponse.json(
      {
        ok: true,
        data: updatedSupplier,
        message: "Estado del proveedor actualizado exitosamente.",
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

