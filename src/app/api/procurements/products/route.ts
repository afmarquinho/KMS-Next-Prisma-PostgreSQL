import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        Prod_name: "asc",
      },
      select: {
        Prod_id: true,
        Prod_name: true,
        Prod_procurementEnabled: true,
        Prod_unitMeasure: true,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        data: products,
        message:
          products.length === 0
            ? "No hay clientes registrados."
            : "Clientes cargados exitosamente.",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("No se pudo cargar los productos: ", errorMessage);

    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: error instanceof Error ? error.message : "Error desconocido.",
      },
      { status: 500 }
    );
  }
};
