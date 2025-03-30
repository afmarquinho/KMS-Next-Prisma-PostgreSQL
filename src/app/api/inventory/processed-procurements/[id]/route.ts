import { prisma } from "@/lib/db";
import { formatISOToDate, formatToCurrency } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

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

    const procurement = await prisma.procurement.findUnique({
      where: { Proc_id: procurementId },
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
            Supp_active: true,
          },
        },
        Item: {
          orderBy: {
            Item_id: "asc",
          },
          include: {
            Product: {
              select: {
                Prod_id: true,
                Prod_name: true,
                Prod_ref: true,
                Prod_desc: true,
                Category: {
                  select: {
                    Cat_name: true,
                  },
                },
              },
            },
          },
        },
        ProcurementNote: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            User: {
              select: {
                User_name: true,
                User_surname: true,
              },
            },
          },
        },
        User: {
          select: {
            User_name: true,
            User_surname: true,
          },
        },
      },
    });

    if (!procurement) {
      if (!procurement) {
        return NextResponse.json(
          { ok: false, data: null, message: "La compra que buscas no existe" },
          { status: 404 }
        );
      }
    }

    const res = {
      ...procurement,
      Proc_totalAmount: formatToCurrency(procurement.Proc_totalAmount),
      Proc_date: formatISOToDate(procurement.Proc_date),
      Proc_dueDate: formatISOToDate(procurement.Proc_dueDate),
      ProcurementNote: procurement.ProcurementNote.map((note) => ({
        ...note,
        createdAt: formatISOToDate(note.createdAt),
      })),
      Item: procurement.Item.map((item) => ({
        ...item,
        Item_unitCost: formatToCurrency(item.Item_unitCost),
        Item_totalAmount: formatToCurrency(item.Item_totalAmount),
      })),
    };

    return NextResponse.json(
      { ok: true, data: res, message: "Compra cargada exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al obtener la compra: ", error);
    return NextResponse.json(
      { ok: false, data: null, message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
