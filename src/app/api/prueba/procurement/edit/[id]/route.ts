import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const id = req.url.split("/").pop();
    if (!id) {
      return NextResponse.json(
        { ok: false, data: null, message: "Id de la compra no proporcionado." },
        { status: 400 }
      );
    }

    const procurementId = parseInt(id, 10);

    const body = await req.json();
    const Pro_userId: number = 4

    // Actualizar la compra
    const updatedPro = await prisma.procurement.update({
      where: { Pro_id: procurementId},
      data: {...body, Pro_userId},
      include: {
        Supplier: {
          select: {
            Supp_name: true,
          },
        },
      },
    });

    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(updatedPro.Pro_totalAmount));

    // Retornamos el objeto con el valor actualizado
    const response = {
      ...updatedPro,
      Pro_totalAmount: formattedAmount, // Reemplazamos el valor original
    };

    return NextResponse.json(
      {
        ok: true,
        data: response,
        message: "compra actualizada actualizada exitosamente.",
      },
      { status: 200 }
    );
  } catch (prismaError) {
    console.error("Error en Prisma:", prismaError);
    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: "Error al crear la compra en la base de datos.",
      },
      { status: 500 }
    );
  }
}
