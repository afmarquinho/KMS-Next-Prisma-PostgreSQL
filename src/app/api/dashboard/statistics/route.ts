import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

    export const GET = async () => {
      try {
        const mostRatedProducts = await prisma.product.findMany({
          select: {
            Prod_id: true,
            Prod_name: true,
            Prod_rating: true,
            Inventories: {
              select: {
                Inv_margin: true,
              },
              take: 1, // Tomamos solo el primer inventario si hay varios
            },
            Item: {
              select: {
                Item_unitCost: true,
              },
              take: 1, 
            },
          },
          orderBy: {
            Prod_rating: "desc",
          },
          take: 10,
        });
    
        const processedProducts = mostRatedProducts.map((prod) => {
          const unitCost = prod.Item?.[0]?.Item_unitCost ?? 0;
          const margin = prod.Inventories?.[0]?.Inv_margin ?? 0;
          const salePrice = Number(unitCost) * (1 + Number(margin));
    
          return {
            Prod_id: prod.Prod_id,
            Prod_name: prod.Prod_name,
            Prod_rating: prod.Prod_rating,
            salePrice: Number(salePrice.toFixed(2)),
          };
        });
    

    return NextResponse.json(
      {
        ok: true,
        data: {
          mostRatedProducts: processedProducts,
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
