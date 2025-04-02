import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    // TODO: Obtener userId dinámicamente
    const createdBy = 5;

    const res = await prisma.provisionRequests.create({
      data: {
        Prov_quantity: body.quantity,
        Prov_desc: body.note,
        Prov_prodId: body.id,
        createdBy,
      },
    });

    return NextResponse.json(
      { ok: true, data: res, message: "Solicitud creada exitosamente." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al crear la solicitud: ", error);

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

export const GET = async () => {
  try {
    const res = await prisma.provisionRequests.findMany({
      include: {
        User: {
          select: {
            User_name: true,
            User_surname: true,
          },
        },
        Product: {
          select: {
            Prod_name: true,
            Prod_ref: true,
            Category: {
              select: {
                Cat_name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(
      { ok: true, data: res, message: "Solicitud cargadas exitosamente." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al obtener las solicitudes de compras: ", error);
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
