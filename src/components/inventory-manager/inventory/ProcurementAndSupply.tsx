"use client";

import { useInventory } from "@/hooks";
import { useState } from "react";
type Props = {
  productRef: string;
};

export const ProcurementAndSupply = ({ productRef }: Props) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState("10");

  const { fetchProductProcurementDetails } = useInventory();

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);

    const queryString = `limit=${limit}`;

    const response = await fetchProductProcurementDetails(
      productRef,
      queryString
    );

    if (response.ok) {
      setProducts(response.data);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <label className="flex items-center justify-start gap-2 mb-5">
        Mostrar:
        <select
          className="w-20 md:w-24 h-8 rounded bg-white dark:bg-slate-700 border-2"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </label>

      <button
        className="w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-xs shadow-md p-2 border-2 transition-all duration-300 rounded bg-blue-600 dark:border-slate-300 border-white hover:bg-teal-600 dark:bg-blue-800 dark:hover:bg-teal-600 text-white"
        onClick={handleFetchData}
      >
        Ver aprovisionamiento
      </button>

      {loading && <p className="mt-4 text-blue-500">Cargando datos...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {products.length > 0 && (
        <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 rounded">
          <table className="w-full rounded border-collapse text-left overflow-hidden shadow-md">
            <thead className="bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800">
              <tr>
                <th className="py-3 px-2">Lote</th>
                <th className="py-3 px-1">Stock</th>
                <th className="py-3 px-1">Margen</th>
                <th className="py-3 px-1">Ubicación</th>
                <th className="py-3 px-1">Habilitado</th>
                <th className="py-3 px-1">Costo</th>
              </tr>
            </thead>
            <tbody className="px-10">
              {products.map((product, i) => (
                <tr
                  key={product.Prod_id}
                  className={`dark:border-slate-600 hover:bg-gray-300 dark:hover:bg-teal-900 py-5 ${
                    i % 2 === 0 ? "bg-slate-100 dark:bg-slate-800" : ""
                  }`}
                >
                  <td className="py-2 px-2">{product.Prod_batch}</td>
                  <td className="py-2 px-1">{product.Prod_stock}</td>
                  <td className="py-2 px-1">{product.Prod_margin}%</td>
                  <td className="py-2 px-1">{product.Prod_location}</td>
                  <td className="py-2 px-1">
                    {product.Prod_saleEnabled ? "Sí" : "No"}
                  </td>
                  <td className="py-2 px-1">${product.Item?.Item_unitCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
