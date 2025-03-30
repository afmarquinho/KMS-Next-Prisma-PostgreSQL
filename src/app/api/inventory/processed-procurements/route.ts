import { prisma } from "@/lib/db";
import { formatISOToDate, formatToCurrency } from "@/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const processed = await prisma.procurement.findMany({
      where: {
        Proc_processed: true,
      },
      orderBy: {
        Proc_dueDate: "asc",
      },
      include: {
        Supplier: {
          select: {
            Supp_name: true,
          },
        },
      },
    });

    const formattedProcessed = processed.map((procurement) => ({
      ...procurement,
      Proc_totalAmount: formatToCurrency(procurement.Proc_totalAmount),
      Proc_date: formatISOToDate(procurement.Proc_date),
      Proc_dueDate: formatISOToDate(procurement.Proc_dueDate),
    }));

    return NextResponse.json(
      { ok: true, data: formattedProcessed, message: "Compras procesadas." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al procesar la solicitud: ", error);

    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: error instanceof Error ? error.message : "Error desconocido.",
      },
      { status: 500 }
    );
  }
}
