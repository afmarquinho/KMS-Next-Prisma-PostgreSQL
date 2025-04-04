"use client";

import { InvItemType } from "@/interface";
import { inventoryStore } from "@/store";
import { LogInIcon } from "lucide-react";
import { useState } from "react";
import { AddProductModal } from "./AddProductModal";

type Props = {
  items: InvItemType[];
};

export const IncomeTrackingTable = ({ items }: Props) => {
  
  const { productModalOpen, toggleProductModal } = inventoryStore();
  const [itemQtyRemaining, setItemQtyRemaining] = useState<number>(0);

  const [product, setProduct] = useState<InvItemType | null>(null);

  const handleStock = (item: InvItemType) => {
    setProduct(item);
    setItemQtyRemaining(item.Item_qtyOrdered - item.Item_qtyReceived);
    toggleProductModal();
  };

  return (
    <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 rounded">
      <table
        className={`w-full rounded border-collapse text-left overflow-hidden shadow-md text-sm mb-5`}
      >
        <thead
          className={`bg-indigo-900 dark:bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800`}
        >
          <tr>
            <th className={`py-3 px-2`}>Item</th>
            <th className={`py-3 px-2`}>Ref</th>
            <th className={`py-3 px-2`}>Nombre</th>
            <th className={`py-3 px-2`}>Categoría</th>
            <th className={`py-3 px-1`}>Descripción</th>
            <th className={`py-3 px-1`}>Cant.</th>
            <th className={`py-3 px-1`}>Recibido</th>
            <th className={`py-3 px-1`}>Faltantes</th>
            <th className={`py-3 px-1`}>Ingresar</th>
          </tr>
        </thead>
        <tbody className={`px-10`}>
          {items.map((item, i) => (
            <tr
              key={item.Item_id}
              className={`dark:border-slate-600 hover:bg-gray-300 dark:hover:bg-teal-900 py-5 ${
                i % 2 === 0 && "bg-slate-100 dark:bg-slate-800"
              }`}
            >
              <td className={`py-2 px-2`}>{i + 1}</td>
              <td className={`py-2 px-1`}>{item.Product.Prod_ref}</td>
              <td className={`py-2 px-1`}>{item.Product.Prod_name}</td>
              <td className={`py-2 px-1`}>{item.Product.Category.Cat_name}</td>
              <td className={`py-2 px-1`}>{item.Product.Prod_desc}</td>
              <td className={`py-2 px-1`}>{item.Item_qtyOrdered}</td>
              <td className={`py-2 px-1`}>{item.Item_qtyReceived}</td>
              <td className={`py-2 px-1`}>
                {item.Item_qtyOrdered - item.Item_qtyReceived}
              </td>
              <td className={`py-2 px-1`}>
                {item.Item_qtyOrdered > item.Item_qtyReceived && (
                  <button
                    className={`w-8 h-full flex justify-center items-center shadow-md rounded bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-600 transition-colors duration-300`}
                    onClick={() => handleStock(item)}
                  >
                    <LogInIcon className={`text-white w-5`} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {productModalOpen && (
        <AddProductModal
          product={product}
          itemQtyRemaining={itemQtyRemaining}
          setItemQtyRemaining={setItemQtyRemaining} // Se pasa la acción para limpiar el estado al terminar o cancelar
          setProduct={setProduct} // Se pasa la acción para limpiar el estado al terminar o cancelar
        />
      )}
    </div>
  );
};
