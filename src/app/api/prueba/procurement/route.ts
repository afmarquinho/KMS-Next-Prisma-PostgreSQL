import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

      const {
      Pro_id,
      Pro_desc,
      Pro_date,
      Pro_totalAmount,
      Pro_paymentMethod,
      Pro_dueDate,
      Pro_close,
      Pro_processed,
      Pro_userId,
      Pro_suppId,
    } = body;

   
      // Crear la compra
    const newProcurement = await prisma.procurement.create({
      data: {
        Pro_id,
        Pro_desc,
        Pro_date,
        Pro_totalAmount,
        Pro_paymentMethod,
        Pro_dueDate,
        Pro_close,
        Pro_processed,
        Pro_userId,
        Pro_suppId,
      } ,
    });

    return NextResponse.json(
      {
        ok: true,
        data: newProcurement,
        message: "Compra creada exitosamente.",
      },
      { status: 201 }
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