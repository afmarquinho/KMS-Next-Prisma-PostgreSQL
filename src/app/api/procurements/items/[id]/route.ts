import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
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

    //Validate that the procurement exists
    const existingProcurement = await prisma.procurement.findUnique({
      where: { Proc_id: procurementId },
    });
    if (!existingProcurement) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "Compra no encontrada.",
        },
        { status: 404 }
      );
    }

    // Ensure the request body is an array with at least one object
    const items = Array.isArray(body) ? body : [];
    if (items.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "El cuerpo debe ser un arreglo con al menos un objeto.",
        },
        { status: 400 }
      );
    }

    // Validate required fields for each item
    for (const item of items) {
      const { Item_unitCost, Item_qtyOrdered, Item_totalAmount, Item_prodId } =
        item;
      if (
        Item_unitCost === undefined ||
        Item_qtyOrdered === undefined ||
        Item_totalAmount === undefined ||
        Item_prodId === undefined
      ) {
        return NextResponse.json(
          {
            ok: false,
            data: null,
            message: "Todos los campos son obligatorios en cada objeto.",
          },
          { status: 400 }
        );
      }
    }

    // TODO: CAMBIAR EL USERID A UNO DINÁMICO
    const createdBy: number = 1;
    const existingUser = await prisma.user.findUnique({
      where: { User_id: createdBy },
    });
    if (!existingUser) {
      return NextResponse.json(
        { ok: false, data: null, message: "Usuario no encontrado." },
        { status: 404 }
      );
    }

    // Check if any of the products in the items array already exist in this procurement
    const productIds = items.map((item) => item.Item_prodId);
    const existingItems = await prisma.item.findMany({
      where: {
        Item_procId: procurementId,
        Item_prodId: { in: productIds },
      },
    });
    if (existingItems.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "No puedes repetir el producto en la misma compra.",
        },
        { status: 400 }
      );
    }

    const finalItems = items.map((item) => ({
      Item_unitCost: item.Item_unitCost,
      Item_qtyOrdered: item.Item_qtyOrdered,
      Item_totalAmount: item.Item_totalAmount,
      Item_prodId: item.Item_prodId,
      Item_procId: procurementId,
      createdBy,
    }));

    // **Start of the Transaction**
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create many items
      await tx.item.createMany({
        data: finalItems,
        skipDuplicates: false,
      });

      // 2. Sum all subtotals of items with the same Item_procId
      const totalAmount = await tx.item
        .aggregate({
          where: { Item_procId: procurementId },
          _sum: { Item_totalAmount: true },
        })
        .then((res) => res._sum.Item_totalAmount ?? 0);

      // 3. Update the procurement with the new total amount and return full details
      const updatedProcurement = await tx.procurement.update({
        where: { Proc_id: procurementId },
        data: { Proc_totalAmount: totalAmount },
        include: {
          Supplier: {
            select: {
              Supp_nit: true,
              Supp_name: true,
              Supp_contactInfo: true,
              Supp_email: true,
              Supp_phoneNumber: true,
              Supp_city: true,
              Supp_address: true,
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
              Item_unitCost: true,
              Item_qtyOrdered: true,
              Item_totalAmount: true,
              Item_qtyReceived: true,
              Item_location: true,
              Item_status: true,
              Item_prodId: true,
              Item_procId: true,
              createdBy: true,
              Product: {
                select: {
                  Prod_name: true,
                  Prod_desc: true,
                  Prod_ref: true,
                  Prod_unitMeasure: true,
                  Category: {
                    select: {
                      Cat_name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return updatedProcurement;
    });

    return NextResponse.json(
      {
        ok: true,
        data: result,
        message: "Items creados exitosamente.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en la creación de los items:", error);
    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: "Error interno del servidor.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
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

    const existingProcurement = await prisma.procurement.findUnique({
      where: { Proc_id: procurementId },
    });
    if (!existingProcurement) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "Compra no encontrada.",
        },
        { status: 404 }
      );
    }

    const {
      Item_id,
      Item_unitCost,
      Item_qtyOrdered,
      Item_totalAmount,
      Item_prodId,
      Item_procId,
    } = body;

    // Validación de campos obligatorios
    if (
      Item_id === undefined ||
      Item_unitCost === undefined ||
      Item_qtyOrdered === undefined ||
      Item_totalAmount === undefined ||
      Item_prodId === undefined ||
      Item_procId === undefined 
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

    if (isNaN(Number(Item_prodId)) || Number(Item_prodId) <= 0) {
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
    if (isNaN(Number(Item_procId)) || Number(Item_procId) <= 0) {
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

    //** Start of the transaction */
    const result = await prisma.$transaction(async (tx) => {
      // Edición del Item
      await tx.item.update({
        where: { Item_id },
        data: body,
      });

      //Recalculamos la cantidad total de los items para actualizar la compra
      const totalAmount = await tx.item
        .aggregate({
          where: { Item_procId: procurementId },
          _sum: { Item_totalAmount: true },
        })
        .then((res) => res._sum.Item_totalAmount ?? 0);
      const updatedProcurement = await tx.procurement.update({
        where: { Proc_id: procurementId },
        data: { Proc_totalAmount: totalAmount },
        include: {
          Supplier: {
            select: {
              Supp_nit: true,
              Supp_name: true,
              Supp_contactInfo: true,
              Supp_email: true,
              Supp_phoneNumber: true,
              Supp_city: true,
              Supp_address: true,
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
              Item_unitCost: true,
              Item_qtyOrdered: true,
              Item_totalAmount: true,
              Item_qtyReceived: true,
              Item_location: true,
              Item_status: true,
              Item_prodId: true,
              Item_procId: true,
              createdBy: true,
              Product: {
                select: {
                  Prod_name: true,
                  Prod_desc: true,
                  Prod_ref: true,
                  Prod_unitMeasure: true,
                  Category: {
                    select: {
                      Cat_name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return updatedProcurement;
    });

    return NextResponse.json(
      {
        ok: true,
        data: result,
        message: "Item actualizado.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en la actualización del item:", error);

    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: "Error interno del servidor.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // ** 1. Extrae el item de la URL. **
    const id = req.nextUrl.pathname.split("/").pop();

    // ** 2. Valida que el ítem venga en la url. **
    if (!id) {
      return NextResponse.json(
        { ok: false, data: null, message: "Id no proporcionado." },
        { status: 400 }
      );
    }

    // ** 3. Convierte a número y validamos el parámetro. **
    const itemId = parseInt(id, 10);

    if (isNaN(itemId)) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID inválido." },
        { status: 400 }
      );
    }

    // ** 4 Valida que el ítem exista en la bbbdd, si no, respondemos con error. **
    const itemExists = await prisma.item.findUnique({
      where: { Item_id: itemId },
    });

    if (!itemExists) {
      return NextResponse.json(
        { ok: false, data: null, message: "Ítem no encontrado." },
        { status: 404 }
      );
    }

    // ** 5. Inicia la transacción. **
    const result = await prisma.$transaction(async (tx) => {
      // ** 6. Elimina el ítem. **
      const deletedItem = await tx.item.delete({
        where: { Item_id: itemId },
        select: {
          Item_procId: true,
        },
      });

      // ** 6. Actualiza los total amounts
      const totalAmount = await tx.item
        .aggregate({
          where: {
            Item_procId: deletedItem.Item_procId,
          },
          _sum: {
            Item_totalAmount: true,
          },
        })
        .then((res) => res._sum.Item_totalAmount ?? 0);

      const updatedProcurement = await tx.procurement.update({
        where: {
          Proc_id: deletedItem.Item_procId,
        },
        data: {
          Proc_totalAmount: totalAmount,
        },
        include: {
          Supplier: {
            select: {
              Supp_nit: true,
              Supp_name: true,
              Supp_contactInfo: true,
              Supp_email: true,
              Supp_phoneNumber: true,
              Supp_city: true,
              Supp_address: true,
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
              Item_unitCost: true,
              Item_qtyOrdered: true,
              Item_totalAmount: true,
              Item_qtyReceived: true,
              Item_location: true,
              Item_status: true,
              Item_prodId: true,
              Item_procId: true,
              createdBy: true,
              Product: {
                select: {
                  Prod_name: true,
                  Prod_desc: true,
                  Prod_ref: true,
                  Prod_unitMeasure: true,
                  Category: {
                    select: {
                      Cat_name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return updatedProcurement;
    });

    return NextResponse.json(
      {
        ok: true,
        data: result,
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
