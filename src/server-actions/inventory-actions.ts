import { prisma } from "@/lib/db";
import { formatISOToDate, formatToCurrency } from "@/utils";

export const getProcurementInventoryById = async (id: number) => {
  try {
    const procurement = await prisma.procurement.findUnique({
      where: { Proc_id: id },
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
              },
            },
          },
        },
        ProcurementNotes: {
          orderBy: {
            Note_createdAt: "desc",
          },
          select: {
            Note_id: true,
            Note_content: true,
            Note_createdAt: true,
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
      return {
        response: {
          ok: false,
          data: null,
          message: "La compra que buscas no existe",
        },
        status: { status: 404 },
      };
    }

    const res = {
      ...procurement,
      Proc_totalAmount: formatToCurrency(procurement.Proc_totalAmount),
      Proc_date: formatISOToDate(procurement.Proc_date),
      Proc_dueDate: formatISOToDate(procurement.Proc_dueDate),
      ProcurementNote: procurement.ProcurementNotes.map((note) => ({
        ...note,
        Note_createdAt: formatISOToDate(note.Note_createdAt),
      })),
      Item: procurement.Item.map((item) => ({
        ...item,
        Item_unitCost: formatToCurrency(item.Item_unitCost),
        Item_totalAmount: formatToCurrency(item.Item_totalAmount),
      })),
    };

    return {
      response: {
        ok: true,
        data: res,
        message: "Compra cargada exitosamente",
      },
      status: { status: 200 },
    };
  } catch (error) {
    console.error("Error al obtener la compra: ", error);
    return {
      response: {
        ok: false,
        data: null,
        message: error instanceof Error ? error.message : "Error desconocido",
      },
      status: { status: 500 },
    };
  }
};
