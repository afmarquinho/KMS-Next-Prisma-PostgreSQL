import { InvrProductDataType } from "@/interface";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params;
    const proId = parseInt(id, 10);

    if (isNaN(proId)) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID de la compra inválido." },
        { status: 400 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, data: null, message: "Cuerpo de la petición inválido." },
        { status: 400 }
      );
    }

    if (!body.product || typeof body.product !== "object") {
      return NextResponse.json(
        { ok: false, data: null, message: "Datos de producto inválidos." },
        { status: 400 }
      );
    }

    const data: InvrProductDataType = body.product;

    // TODO: Obtener userId dinámicamente
    const userId: number = 3;

    // Validar existencia del ítem de compra antes de iniciar la transacción
    const item = await prisma.item.findUnique({
      where: { Item_id: data.Item_id },
    });
    if (!item) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "El ítem de compra no existe.",
        },
        { status: 404 }
      );
    }
    

    const result = await prisma.$transaction(async (tx) => {
     
      // Crear producto
      const product = await tx.product.create({
        data: {
          Prod_name: data.Prod_name.trim(),
          Prod_ref: data.Prod_ref.trim().toUpperCase(),
          Prod_stock: data.Prod_qtyReceive,
          Prod_itemId: data.Item_id,
          Prod_catId: data.Prod_catId,
          Prod_batch: data.Prod_batchCode.trim().toLocaleUpperCase(),
          Prod_batchDueDate: data.Prod_batchDate,
          Prod_userId: userId,
        },
      });

  

      // Todo: Revisar el por qué no coge el valor por defecto en location

      // Registrar movimiento de inventario
      await tx.stockMovement.create({
        data: {
          Mov_type: "entrada",
          Mov_qty: data.Prod_qtyReceive || 0,
          Mov_reason: data.reason || "compra",
          Mov_prodId: product.Prod_id,
          Mov_userId: userId,
          Mov_proId: proId,
        },
      });


      // Actualizar el ítem de compra
      const upItem = await tx.item.update({
        where: { Item_id: data.Item_id },
        data: {
          Item_qtyReceived: {
            increment: data.Prod_qtyReceive || 0,
          },
        },
      });
      if ((upItem.Item_qtyOrdered = upItem.Item_qtyReceived)) {
        await tx.item.update({
          where: { Item_id: data.Item_id },
          data: {
            Item_location: "Bodega",
            Item_status: "CLOSED",
          },
        });
      }

      return NextResponse.json(
        {
          ok: true,
          data: product,
          message: `Producto ${product.Prod_name} procesado exitosamente.`,
        },
        { status: 201 }
      );
    });

    return result;
  } catch (error) {
    console.error("Error al registrar producto con movimiento:", error);
    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
};
