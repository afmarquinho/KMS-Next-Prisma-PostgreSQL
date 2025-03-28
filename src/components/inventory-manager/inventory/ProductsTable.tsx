import { InvProductType } from "@/interface";
import { formatToCurrency } from "@/utils";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  products: InvProductType[];
};

export const ProductsTable = ({ products }: Props) => {
  return (
    <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 rounded shadow-md">
      <table className="w-full border-collapse text-left rounded overflow-hidden text-xs">
        <thead className="bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800">
          <tr>
            <th className="py-3 px-1">Ítem</th>
            <th className="py-3 px-2 w-40">Nombre</th>
            <th className="py-3 px-2">Referencia</th>
            <th className="py-3 px-2">Lote</th>
            <th className="py-3 px-2">Stock</th>
            <th className="py-3 px-2">Costo U.</th>
            <th className="py-3 px-2">Margen</th>
            <th className="py-3 px-2">Precio V.</th>
            <th className="py-3 px-2 w-32">Categoría</th>
            <th className="py-3 px-2 w-32">Proveedor</th>
            <th className="py-3 px-2 w-32">Hab C.</th>
            <th className="py-3 px-2 w-32">Hab. V.</th>
            <th className="py-3 px-2">Detalle</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr
              key={p.Prod_id}
              className={`dark:border-slate-600 hover:bg-gray-300 dark:hover:bg-teal-900 ${
                i % 2 === 0 ? "bg-slate-100 dark:bg-slate-800" : ""
              }`}
            >
              <td className="py-2 px-2">{i + 1}</td>
              <td className="py-2 px-2">{p.Prod_name}</td>
              <td className="py-2 px-2 text-amber-700 dark:text-amber-400">
                {p.Prod_ref}
              </td>
              <td className="py-2 px-2 text-amber-700 dark:text-amber-400">
                {p.Prod_batch}
              </td>
              <td
                className={`py-2 px-2 ${
                  p.Prod_stock < 1
                    ? "bg-rose-200 text-center text-red-700 dark:bg-rose-950 dark:text-red-100"
                    : "text-green-600 dark:text-green-400 font-medium"
                }`}
              >
                {p.Prod_stock < 1 ? "Agotado" : p.Prod_stock}
              </td>
              <td className="py-2 px-2 text-green-600 dark:text-green-400">
                {formatToCurrency(p.Item.Item_unitCost)}
              </td>
              <td className="py-2 px-2 text-green-600 dark:text-green-400">
                {(parseFloat(p.Prod_margin.toString()) * 100).toFixed(1)} %
              </td>
              <td className="py-2 px-2 text-green-600 dark:text-green-400">
                $
                {(
                  parseFloat(p.Item.Item_unitCost.toString()) *
                  (parseFloat(p.Prod_margin.toString()) + 1)
                ).toFixed(2)}
              </td>
              <td className="py-2 px-2 text-amber-700 dark:text-amber-400">
                {p.Item.Category.Cat_name}
              </td>
              <td className="py-2 px-2">
                {p.Item.Procurement.Supplier.Supp_name}
              </td>
              <td
                className={`px-2 py-2 ${
                  p.Prod_procurementEnabled
                    ? ""
                    : "bg-slate-600 text-center text-white dark:bg-rose-950 dark:text-red-100"
                }`}
              >
                <div className={`flex gap-1 items-center justify-start`}>
                  {p.Prod_procurementEnabled ? (
                    <>
                      <div className={`h-2 w-2 rounded-full bg-green-500`} />{" "}
                      Habilidato
                    </>
                  ) : (
                    <>
                      <div className={`h-2 w-2 rounded-full bg-red-500`} />{" "}
                      Deshabilitado
                    </>
                  )}
                </div>
              </td>
              <td
                className={`px-2 py-2 ${
                  p.Prod_saleEnabled
                    ? ""
                    : "bg-slate-600 text-center text-white dark:bg-rose-950 dark:text-red-100"
                }`}
              >
                <div className={`flex gap-1 items-center justify-start`}>
                  {p.Prod_saleEnabled ? (
                    <>
                      <div className={`h-2 w-2 rounded-full bg-green-500`} />{" "}
                      Habilidato
                    </>
                  ) : (
                    <>
                      <div className={`h-2 w-2 rounded-full bg-red-500`} />{" "}
                      Deshabilitado
                    </>
                  )}
                </div>
              </td>
              <td className={`py-2 px-2`}>
                <Link
                  href={`/inventory-manager/product/${p.Prod_ref}`}
                  className="w-8 h-6 p-1 bg-rose-500 hover:bg-red-700 text-white rounded shadow-md transition-colors duration-300 ease-linear  flex justify-center items-center"
                  onClick={() => console.log("Ver producto", p)}
                >
                  <SearchIcon className="text-white w-5" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
