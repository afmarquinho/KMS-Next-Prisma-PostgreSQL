import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supplierList = await prisma.supplier.findMany({
      orderBy: {
        Supp_name: "asc",
      },
      select: {
        Supp_name: true,
        Supp_id: true,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        data: supplierList,
        message:
          supplierList.length === 0
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
