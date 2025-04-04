import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID no proporcionado." },
        { status: 400 }
      );
    }

    const intInt = parseInt(id, 10);

    const procurement = await prisma.procurement.findUnique({
      where: {
        Proc_id: intInt,
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
            Supp_active: true,
          },
        },
        Item: {
          select: {
            Item_id: true,
            Item_qtyOrdered: true,
            Item_location: true,
            Item_qtyReceived: true,
            Item_status: true,
            Product: {
              select: {
                Category: {
                  select: {
                    Cat_id: true,
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
          select: {
            Note_id: true,
            Note_content: true,
            createdAt: true,
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
      return NextResponse.json(
        { ok: false, data: null, message: "La compra que buscas no existe" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { ok: true, data: procurement, message: "Compra cargada exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("Error al cargar la compra:", errorMessage);

    return NextResponse.json(
      { ok: false, data: null, message: "Error en el servidor." },
      { status: 500 }
    );
  }
}
