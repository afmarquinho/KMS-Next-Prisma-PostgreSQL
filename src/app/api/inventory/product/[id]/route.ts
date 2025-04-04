import { InvDataType } from "@/interface";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

//TODO: Extraer los params así es mejor y mas limpio, por si cambia la url.

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise <{ id: string }> }
) => {
  try {
    const { id } = await params;
    
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID del producto inválido." },
        { status: 400 }
      );
    }

    let body: InvDataType;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, data: null, message: "Cuerpo de la petición inválido." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, data: null, message: "Datos de producto inválidos." },
        { status: 400 }
      );
    }

    console.log("Product id", productId);
    console.log("Inventory", body);

    // TODO: Obtener userId dinámicamente
    const createdBy: number = 3;

    // Validar existencia del ítem y del producto antes de iniciar la transacción
    const item = await prisma.item.findUnique({
      where: { Item_id: body.Inv_itemId },
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

    const product = await prisma.product.findUnique({
      where: { Prod_id: productId },
    });
    if (!product) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "El producto no existe.",
        },
        { status: 404 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      // Crear producto en el inventario
      await tx.inventory.create({
        data: {
          Inv_prodId: productId,
          Inv_stock: body.Inv_stock,
          Inv_itemId: body.Inv_itemId,
          Inv_batch: body.Inv_batch,
          Inv_batchDueDate: body.Inv_batchDueDate,
          createdBy,
        },
      });

      // Registrar movimiento de inventario
      await tx.stockMovement.create({
        data: {
          Mov_type: "entrada",
          Mov_qty: body.Inv_stock || 0,
          Mov_reason: body.Mov_reason || "Compra",
          Mov_prodId: productId,
          createdBy,
          Mov_procId: item.Item_procId,
        },
      });

      // Actualizar el ítem de compra
      const upItem = await tx.item.update({
        where: { Item_id: body.Inv_itemId },
        data: {
          Item_qtyReceived: {
            increment: body.Inv_stock || 0,
          },
          Item_location: "PARTIALLY_RECEIVED",
        },
        select: {
          Item_qtyOrdered: true,
          Item_qtyReceived: true,
          Item_procId: true,
        },
      });

      if (upItem.Item_qtyOrdered === upItem.Item_qtyReceived) {
        await tx.item.update({
          where: { Item_id: body.Inv_itemId },
          data: {
            Item_location: "STORAGE",
            Item_status: "CLOSED",
          },
        });
      }

      //Verificar si hay almenos 1 item abierto, es decir que su estado es difernte a close, si el array es vacío se cierra la compra
      const openItems = await tx.item.findMany({
        where: {
          Item_procId: upItem.Item_procId,
          Item_status: { not: "CLOSED" }, // Solo traer los que no estén cerrados
        },
        select: { Item_id: true }, // Solo traer el ID para optimizar, es decir 1 solo campo y no todos los campos del la tabla.
      });

      // Si no hay ítems abiertos, cerrar la compra
      if (openItems.length === 0) {
        await tx.procurement.update({
          where: { Proc_id: upItem.Item_procId },
          data: { Proc_close: true },
        });

        return NextResponse.json(
          {
            ok: true,
            data: null, // No retorno nada ya que no lo necesito.
            message: `Compra cerrada exitosamente.`,
          },
          { status: 201 }
        );
      }

      return NextResponse.json(
        {
          ok: true,
          data: null, // No retorno nada ya que no lo necesito.
          message: `Producto procesado exitosamente.`,
        },
        { status: 201 }
      );
    });

    return result;
  } catch (error) {
    console.error(
      "Error al registrar producto en el inventario y el movimiento:",
      error
    );

    return NextResponse.json(
      { ok: false, data: null, message: "Error interno del servidor." },
      { status: 500 }
    );
  }
};
