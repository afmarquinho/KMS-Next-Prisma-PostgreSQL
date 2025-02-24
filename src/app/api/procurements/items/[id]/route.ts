import { prisma } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

//TODO: HACER TRANSACCIÓN

export async function POST(req: NextRequest) {
  // TODO: HACER UN TRANSACTION YA QUE INVOLUCRA LA BBDD ITEM Y PROCUREMENT
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID no proporcionado." },
        { status: 400 }
      );
    }

    const proId = parseInt(id, 10);

    if (isNaN(proId)) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID inválido." },
        { status: 400 }
      );
    }

    const procurementExists = await prisma.procurement.findUnique({
      where: { Pro_id: proId },
    });

    if (!procurementExists) {
      return NextResponse.json(
        { ok: false, data: null, message: "Compra no encontrada." },
        { status: 404 }
      );
    }

    const body = await req.json();
    const {
      Item_ref,
      Item_name,
      Item_desc,
      Item_unitCost,
      Item_qtyOrdered,
      Item_catId,
      Item_unitMeasure,
    } = body;

    // Validación de campos obligatorios
    if (
      !Item_name.trim() ||
      !Item_desc.trim() ||
      !Item_unitMeasure ||
      Item_catId === undefined ||
      Item_unitCost === undefined ||
      Item_qtyOrdered === undefined
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

    // Validación de valores numéricos
    if (
      isNaN(Number(Item_unitCost)) ||
      Number(Item_unitCost) <= 0 ||
      isNaN(Number(Item_qtyOrdered)) ||
      Number(Item_qtyOrdered) <= 0
    ) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "Cantidad y costo unitario deben ser números positivos.",
        },
        { status: 400 }
      );
    }

    if (isNaN(Number(Item_catId)) || Number(Item_catId) <= 0) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message:
            "Debes seleccionar una categoría correcta para el item de la compra.",
        },
        { status: 400 }
      );
    }

    // Validar si la referencia ya existe en la misma compra
    if (Item_ref) {
      const refFound = await prisma.item.findFirst({
        where: {
          Item_proId: proId, // Filtrar por el ID de la compra
          Item_ref: Item_ref, // Filtrar por la referencia
        },
      });

      if (refFound) {
        return NextResponse.json(
          {
            ok: false,
            data: null,
            message: "No puedes repetir la referencia en una misma compra.",
          },
          { status: 400 }
        );
      }
    }

    const datos = {
      Item_ref: Item_ref ? Item_ref.trim().toUpperCase() : null,
      Item_name: Item_name.trim(),
      Item_desc: Item_desc.trim(),
      Item_unitCost,
      Item_qtyOrdered,
      Item_totalAmount: Item_unitCost * Item_qtyOrdered,
      Item_unitMeasure,
      Item_proId: proId,
      Item_catId,
    };

    // Creación del nuevo Item
    await prisma.item.create({
      data: datos,
      include: {
        Category: {
          select: { Cat_name: true },
        },
      },
    });

    //Actualiza el totalAmount en procurement

    //1. Sumo tdos los subtotales del item con el mismo proId
    const totalAmount = await prisma.item
      .aggregate({
        where: {
          Item_proId: proId,
        },
        _sum: {
          Item_totalAmount: true,
        },
      })
      .then((res) => res._sum.Item_totalAmount ?? 0); // maneja la respues, si es valor es nullo, devuelve 0, "??" es un operador que se llama nullish coalescing operator y se usa para manejar valores null o undefined.

    //2. Actualiza en nuevo valor en procuremente y deuelve todo en formato para reemplazar en el store.
    const updatedProcurement = await prisma.procurement.update({
      where: {
        Pro_id: proId,
      },
      data: {
        Pro_totalAmount: totalAmount,
      },
      include: {
        Supplier: {
          select: {
            Supp_nit: true,
            Supp_contactInfo: true,
            Supp_email: true,
            Supp_phoneNumber: true,
            Supp_name: true,
          },
        },
        User: {
          select: {
            User_name: true,
            User_surname: true,
          },
        },
        Item: {
          select: {
            Item_id: true,
            Item_desc: true,
            Item_name: true,
            Item_location: true,
            Item_proId: true,
            Item_qtyOrdered: true,
            Item_qtyReceived: true,
            Item_ref: true,
            Item_status: true,
            Item_totalAmount: true,
            Item_unitCost: true,
            Item_catId: true,
            Item_unitMeasure: true,
            Category: {
              select: { Cat_name: true },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        ok: true,
        data: updatedProcurement,
        message: "Item creado exitosamente.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en la creación del item:", error);

    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: "Error interno del servidor.",
        error: error instanceof Error ? error.message : "Error desconocido.",
      },
      { status: 500 }
    );
  }
}

//TODO: HACER TRANSACCIÓN
export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { ok: false, data: null, message: "Id de la compra no proporcionado." },
        { status: 400 }
      );
    }

    const proId = parseInt(id, 10);

    if (isNaN(proId)) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID inválido." },
        { status: 400 }
      );
    }

    const procurementExists = await prisma.procurement.findUnique({
      where: { Pro_id: proId },
    });

    if (!procurementExists) {
      return NextResponse.json(
        { ok: false, data: null, message: "Compra no encontrada." },
        { status: 404 }
      );
    }

    const body = await req.json();

    const {
      Item_id,
      Item_name,
      Item_desc,
      Item_unitCost,
      Item_qtyOrdered,
      Item_catId,
      Item_unitMeasure,
    } = body;

    // Validación de campos obligatorios
    if (
      Item_id === undefined ||
      !Item_name.trim() ||
      !Item_desc.trim() ||
      !Item_unitMeasure ||
      Item_catId === undefined ||
      Item_unitCost === undefined ||
      Item_qtyOrdered === undefined
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

    // Validación de valores numéricos
    if (
      isNaN(Number(Item_unitCost)) ||
      Number(Item_unitCost) <= 0 ||
      isNaN(Number(Item_qtyOrdered)) ||
      Number(Item_qtyOrdered) <= 0
    ) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "Cantidad y costo unitario deben ser números positivos.",
        },
        { status: 400 }
      );
    }

    if (isNaN(Number(Item_catId)) || Number(Item_catId) <= 0) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message:
            "Debes seleccionar una categoría correcta para el item de la compra.",
        },
        { status: 400 }
      );
    }

    if (isNaN(Number(Item_id)) || Number(Item_id) <= 0) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "Debes seleccionar un ítem de la compra válido.",
        },
        { status: 400 }
      );
    }

    // Validar que el item a editar exista
    const itemExists = await prisma.item.findUnique({
      where: { Item_id: Item_id },
    });

    if (!itemExists) {
      return NextResponse.json(
        { ok: false, data: null, message: "Item no encontrado." },
        { status: 404 }
      );
    }

    const datos = {
      Item_name: Item_name.trim(),
      Item_desc: Item_desc.trim(),
      Item_unitCost,
      Item_qtyOrdered,
      Item_totalAmount: Item_unitCost * Item_qtyOrdered,
      Item_unitMeasure,
      Item_catId,
    };

    // Edición del Item
    await prisma.item.update({
      where: { Item_id },
      data: datos,
    });

    //Actualiza el totalAmount en procurement
    //1. Sumo tdos los subtotales del item con el mismo proId
    const totalAmount = await prisma.item.aggregate({
      where: {
        Item_proId: proId,
      },
      _sum: {
        Item_totalAmount: true,
      },
    });

    //2. Actualiza en nuevo valor en procuremente y deuelve todo en formato para reemplazar en el store.
    const updatedProcurement = await prisma.procurement.update({
      where: {
        Pro_id: proId,
      },
      data: {
        Pro_totalAmount: totalAmount._sum.Item_totalAmount ?? 0,
      },
      include: {
        Supplier: {
          select: {
            Supp_nit: true,
            Supp_contactInfo: true,
            Supp_email: true,
            Supp_phoneNumber: true,
            Supp_name: true,
          },
        },
        User: {
          select: {
            User_name: true,
            User_surname: true,
          },
        },
        Item: {
          select: {
            Item_id: true,
            Item_desc: true,
            Item_name: true,
            Item_location: true,
            Item_proId: true,
            Item_qtyOrdered: true,
            Item_qtyReceived: true,
            Item_ref: true,
            Item_status: true,
            Item_totalAmount: true,
            Item_unitCost: true,
            Item_catId: true,
            Item_unitMeasure: true,
            Category: {
              select: { Cat_name: true },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        ok: true,
        data: updatedProcurement,
        message: "Item actualizado exitosamente.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en la actualización del item:", error);

    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: "Error interno del servidor.",
        error: error instanceof Error ? error.message : "Error desconocido.",
      },
      { status: 500 }
    );
  }
}

//TODO: HACER TRANSACCIÓN
export async function DELETE(req: NextRequest) {
  try {
    //* Extrae el item de la URL.
    const id = req.nextUrl.pathname.split("/").pop();

    //* 1 Valida que el ítem venga en la url.
    if (!id) {
      return NextResponse.json(
        { ok: false, data: null, message: "Id no proporcionado." },
        { status: 400 }
      );
    }

    //* 2 Convierte a número y validamos el parámetro.
    const itemId = parseInt(id, 10);

    if (isNaN(itemId)) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID inválido." },
        { status: 400 }
      );
    }

    //* 3 Valida que el ítem exista en la bbbdd, si no, respondemos con error.
    const itemExists = await prisma.item.findUnique({
      where: { Item_id: itemId },
    });

    if (!itemExists) {
      return NextResponse.json(
        { ok: false, data: null, message: "Ítem no encontrado." },
        { status: 404 }
      );
    }

    //* Elimina el ítem.
    const deletedItem = await prisma.item.delete({
      where: { Item_id: itemId },
      select: {
        Item_proId: true,
      },
    });

    //*Actualiza el totalAmount en procurement.
    //* 1 Suma todos los subtotales de los items con el mismo proId restantes
    const totalAmount = await prisma.item.aggregate({
      where: {
        Item_proId: deletedItem.Item_proId,
      },
      _sum: {
        Item_totalAmount: true,
      },
    });

    //* 2. Actualiza en nuevo valor en procurement y deuelve todo en formato para reemplazar en el store.
    const updatedProcurement = await prisma.procurement.update({
      where: {
        Pro_id: deletedItem.Item_proId,
      },
      data: {
        Pro_totalAmount: totalAmount._sum.Item_totalAmount ?? 0,
      },
      include: {
        Supplier: {
          select: {
            Supp_nit: true,
            Supp_contactInfo: true,
            Supp_email: true,
            Supp_phoneNumber: true,
            Supp_name: true,
          },
        },
        User: {
          select: {
            User_name: true,
            User_surname: true,
          },
        },
        Item: {
          select: {
            Item_id: true,
            Item_desc: true,
            Item_name: true,
            Item_location: true,
            Item_proId: true,
            Item_qtyOrdered: true,
            Item_qtyReceived: true,
            Item_ref: true,
            Item_status: true,
            Item_totalAmount: true,
            Item_unitCost: true,
            Item_catId: true,
            Item_unitMeasure: true,
            Category: {
              select: { Cat_name: true },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        ok: true,
        data: updatedProcurement,
        message: "Item actualizado exitosamente.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en la actualización del item:", error);

    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: "Error interno del servidor.",
        error: error instanceof Error ? error.message : "Error desconocido.",
      },
      { status: 500 }
    );
  }
}
