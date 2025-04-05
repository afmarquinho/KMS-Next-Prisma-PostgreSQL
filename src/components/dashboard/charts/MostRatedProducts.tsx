"use client";

import { useEffect, useState } from "react";
import { ChartTitle } from "./ChartTitle";
import { Ratings } from "./Ratings";

type RatedProduct = {
  Prod_id: number;
  Prod_name: string;
  Prod_rating: number;
  salePrice: number;
};

type MostRatedProductsData = {
  mostRatedProducts: RatedProduct[];
};

type MostRatedProductsResponse = {
  ok: boolean;
  data: MostRatedProductsData | null;
  message: string;
};

export const MostRatedProducts = () => {
  const [data, setData] = useState<MostRatedProductsResponse | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/statistics`
      );
      setData(await res.json());
    }
    fetchPosts();
  }, []);

  if (!data || !data.ok || !data.data) {
    // return <p>Error al cargar los datos</p>;
    return <p>No hay datos para mostrar</p>;
  }


  return (
    <>
      <ChartTitle title="Productos mas populares" />
      {data.data.mostRatedProducts.map(
        (p: {
          Prod_id: number;
          Prod_name: string;
          Prod_rating: number;
          salePrice: number;
        }) => (
          <div
            key={p.Prod_id}
            className={`w-full p-2 bg-white dark:bg-slate-900 rounded shadow-md`}
          >
            <div className={`flex justify-between items-center`}>
              <span className={`font-medium`}>{p.Prod_name}</span>
              <span className={`font-bold`}>$ {p.salePrice}</span>
            </div>
            <div className={`flex`}>
              <Ratings rate={Number(p.Prod_rating)} />
            </div>
          </div>
        )
      )}
    </>
  );
};
