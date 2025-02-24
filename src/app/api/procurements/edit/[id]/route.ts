import { prisma } from "@/lib/db";
import { formatToCurrency } from "@/utils";
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

    if (isNaN(procurementId)) {
        return NextResponse.json(
          { ok: false, data: null, message: "ID inválido." },
          { status: 400 }
        );
      }

// Validamos que exista la compra
    const existingProcurement = await prisma.procurement.findUnique({
        where:{
            Pro_id: procurementId
        }
    })
    if (!existingProcurement) {
        return NextResponse.json(
          { ok: false, data: null, message: "La compra que intantas actualizar no existe." },
          { status: 404 }
        );
      }

    const body = await req.json();
    

    const { Pro_desc, Pro_paymentMethod, Pro_dueDate, Pro_suppId } = body;

     // Validación de campos obligatorios
     if (!Pro_desc || !Pro_paymentMethod || !Pro_dueDate || !Pro_suppId) {
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
    const Pro_userId: number = 4

    const existingUser = await prisma.user.findUnique({
        where: { User_id: Pro_userId },
      });
  
      if (!existingUser) {
        return NextResponse.json(
          { ok: false, data: null, message: "Usuario no encontrado." },
          { status: 404 }
        );
      }

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

   
    const response = {
      ...updatedPro,
      Pro_totalAmount: formatToCurrency(updatedPro.Pro_totalAmount), // Reemplazamos el valor original
    };

    return NextResponse.json(
      {
        ok: true,
        data: response,
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
