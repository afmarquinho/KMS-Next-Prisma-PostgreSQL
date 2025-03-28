import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const procurements = await prisma.procurement.findMany({
      orderBy: {
        Proc_date: "asc",
      },

      include: {
        Supplier: {
          select: {
            Supp_name: true,
          },
        },
      },
    });
    //* Formatear el tipo decimal a moneda (string)

   
    return NextResponse.json(
      {
        ok: true,
        data: procurements,
        message:
          procurements.length === 0
            ? "No hay compras registradas."
            : "Compras cargadas exitosamente.",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("No se pudo mostrar las compras: ", errorMessage);

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Verificar si el body está vacío o es null
    if (!body || Object.keys(body).length === 0) {
      console.error("El body de la petición está vacío o es null:", body);
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "El cuerpo de la solicitud no puede estar vacío.",
        },
        { status: 400 }
      );
    }

    console.log(body)

    const { Proc_desc, Proc_paymentMethod, Proc_dueDate, Proc_suppId } = body;

    // Validación de campos obligatorios
    if (!Proc_desc || !Proc_paymentMethod || !Proc_dueDate || !Proc_suppId) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "Todos los campos son obligatorios.",
        },
        { status: 400 }
      );
    }
    //TODO: CORREGIR EL USERID
    const createdBy: number = 2;

    // Verificar existencia del usuario
    const existingUser = await prisma.user.findUnique({
      where: { User_id: createdBy },
    });

    if (!existingUser) {
      return NextResponse.json(
        { ok: false, data: null, message: "El usuario no existe." },
        { status: 400 }
      );
    }

    // Verificar existencia del proveedor
    const existingSupplier = await prisma.supplier.findUnique({
      where: { Supp_id: Proc_suppId },
    });
    if (!existingSupplier) {
      return NextResponse.json(
        { ok: false, data: null, message: "El proveedor no existe." },
        { status: 400 }
      );
    }
    // const dueDate = new Date(Proc_dueDate);
    // if (isNaN(dueDate.getTime())) {
    //   return NextResponse.json(
    //     {
    //       ok: false,
    //       data: null,
    //       message: "La fecha de vencimiento no es válida.",
    //     },
    //     { status: 400 }
    //   );
    // }

    // Crear la compra
    const newProcurement = await prisma.procurement.create({
      data: { ...body, createdBy },
      include: {
        Supplier: {
          select: {
            Supp_name: true,
          },
        },
      },
    });

    // Formateamos el total amount, esta es otra manera
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(newProcurement.Proc_totalAmount));

    // Retornamos el objeto con el valor actualizado
    const response = {
      ...newProcurement,
      Proc_totalAmount: formattedAmount, // Reemplazamos el valor original
    };

    return NextResponse.json(
      {
        ok: true,
        data: response,
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
