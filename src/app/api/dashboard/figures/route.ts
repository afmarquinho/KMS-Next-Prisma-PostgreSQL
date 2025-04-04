import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const totalClients = await prisma.customer.count();
    const totalSuppliers = await prisma.supplier.count();
    const totalProcurementRequests = await prisma.provisionRequests.count();
    const totalProcessedProcurements = await prisma.procurement
      .aggregate({
        where: {
          Proc_processed: true,
        },
        _sum: {
          Proc_totalAmount: true,
        },
      })
      .then((result) => result._sum.Proc_totalAmount || 0);

    const inventory = await prisma.inventory.findMany({
      where: {
        Inv_stock: {
          gt: 0,
        },
      },
      select: {
        Inv_stock: true,
        Item: {
          select: { Item_unitCost: true },
        },
      },
    });
    const totalInventory = inventory.reduce((total, inv) => {
      const stock = inv.Inv_stock;
      const unitCost = Number(inv.Item.Item_unitCost);
      return total + stock * unitCost;
    }, 0);

    return NextResponse.json(
      {
        ok: true,
        data: {
          totalClients,
          totalSuppliers,
          totalProcurementRequests,
          totalProcessedProcurements:
            Number(totalProcessedProcurements) !== 0
              ? (Number(totalProcessedProcurements) / 1000).toFixed(2)
              : 0,
          totalInventory: Number(totalInventory) !== 0 ? (Number(totalInventory) / 1000).toFixed(2) : 0,
        },
        message: "Datos obtenidos correctamente",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, data: null, message: "Error al obtener los datos" },
      { status: 500 }
    );
  }
};
