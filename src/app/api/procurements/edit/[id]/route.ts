import { prisma } from "@/lib/db";
import { formatToCurrency } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const id = req.url.split("/").pop();
    const body = await req.json();

    if (!id) {
      return NextResponse.json(
        { ok: false, data: null, message: "Id de la compra no proporcionado." },
        { status: 400 }
      );
    }

    const procurementId = parseInt(id, 10);

    if (isNaN(procurementId)) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID inválido." },
        { status: 400 }
      );
    }

    // Validamos que exista la compra
    const existingProcurement = await prisma.procurement.findUnique({
      where: {
        Proc_id: procurementId,
      },
    });
    if (!existingProcurement) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "La compra que intantas actualizar no existe.",
        },
        { status: 404 }
      );
    }

    // Validación de campos obligatorios
    if (
      !body.Proc_desc ||
      !body.Proc_paymentMethod ||
      !body.Proc_dueDate ||
      !body.Proc_suppId
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

    //TODO: CAMBIAR EL USERID
    const createdBy: number = 4;

    const existingUser = await prisma.user.findUnique({
      where: { User_id: createdBy },
    });

    if (!existingUser) {
      return NextResponse.json(
        { ok: false, data: null, message: "Usuario no encontrado." },
        { status: 404 }
      );
    }

    // Actualizar la compra
    const updatedPro = await prisma.procurement.update({
      where: { Proc_id: procurementId },
      data: body,
      include: {
        Supplier: {
          select: {
            Supp_name: true,
          },
        },
      },
    });

    const res = {
      ...updatedPro,
      Proc_totalAmount: formatToCurrency(updatedPro.Proc_totalAmount),
    };

    return NextResponse.json(
      {
        ok: true,
        data: res,
        message: "Compra actualizada actualizada exitosamente.",
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
