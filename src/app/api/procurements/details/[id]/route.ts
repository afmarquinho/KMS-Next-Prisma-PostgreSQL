import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { ok: false, data: null, message: "ID no proporcionado." },
      { status: 400 }
    );
  }

  const procId = parseInt(id, 10);

  if (isNaN(procId)) {
    return NextResponse.json(
      { ok: false, data: null, message: "ID inválido." },
      { status: 400 }
    );
  }

  try {
    const procurementDetails = await prisma.procurement.findUnique({
      where: { Proc_id: procId },
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

    if (!procurementDetails) {
      return NextResponse.json(
        { ok: false, data: null, message: "Compra no encontrada." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { ok: true, data: procurementDetails, message: "Compra encontrada." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al obtener la compra: ", error);

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

export const DELETE = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

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

  try {
    const deletedProcurement = await prisma.procurement.delete({
      where: { Proc_id: proId },
      include: {
        Supplier: {
          select: {
            Supp_name: true,
          },
        },
      },
    });

    return NextResponse.json(
      { ok: true, data: deletedProcurement, message: "Compra eliminada." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar la compra: ", error);

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

export const PUT = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

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

  try {
    const closedProcurement = await prisma.procurement.update({
      where: { Proc_id: proId },
      data: { Proc_processed: true },
      include: {
        Supplier: {
          select: {
            Supp_name: true,
          },
        },
      },
    });
    

    return NextResponse.json(
      { ok: true, data: closedProcurement, message: "Compra procesada." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al procesar la compra: ", error);

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
