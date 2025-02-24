"use client";

import { ItemDetailsType } from "@/interface";
import { useItemStore } from "@/store";
import { formatToCurrency } from "@/utils";
import { PencilIcon, XIcon } from "lucide-react";

type Props = {
  item: ItemDetailsType;
  procurementStatus: boolean;
};

export const ItemCard = ({ item, procurementStatus }: Props) => {
  const { setItem, toggleDeleteItemModal, toggleItemModal } = useItemStore();

  const handleEdit = (item: ItemDetailsType) => {
    toggleItemModal();
    setItem(item);
  };

  const handleDelete = (item: ItemDetailsType) => {
    setItem(item);
    toggleDeleteItemModal();
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg p-6 w-full transition-transform transform hover:scale-105 hover:shadow-lg relative">
      {!procurementStatus && (
        <div className="flex gap-3 justify-end">
          <button
            className="flex gap-1 text-xs items-center justify-center text-yellow-600 dark:text-yellow-400 font-bold bg-yellow-100 dark:bg-yellow-950 py-1 px-2 rounded shadow-sm hover:bg-yellow-200 dark:hover:bg-yellow-800 transition"
            onClick={() => handleEdit(item)}
          >
            <PencilIcon className="w-4" /> Editar
          </button>
          <button
            className="flex gap-1 text-xs items-center justify-center text-red-600 dark:text-red-400 font-bold bg-red-100 dark:bg-red-950 py-1 px-2 rounded shadow-sm hover:bg-red-200 dark:hover:bg-red-800 transition"
            onClick={() => handleDelete(item)}
          >
            <XIcon className="w-4" /> Eliminar
          </button>
        </div>
      )}

      <table className="w-full text-left">
        <tbody>
          <tr>
            <th className="text-gray-600 dark:text-gray-300 pb-1">
              Referencia
            </th>
            <td className="font-medium">{item.Item_ref}</td>
          </tr>
          <tr>
            <th className="text-gray-600 dark:text-gray-300 pb-1">Nombre</th>
            <td className="font-bold text-lg">{item.Item_name}</td>
          </tr>
          <tr>
            <th className="text-gray-600 dark:text-gray-300 pb-1">
              Descripción
            </th>
            <td>{item.Item_desc}</td>
          </tr>
          <tr>
            <th className="text-gray-600 dark:text-gray-300 pb-1">Categoría</th>
            <td className="italic text-indigo-600 dark:text-indigo-400">
              {item.Category.Cat_name}
            </td>
          </tr>
          <tr>
            <th className="text-gray-600 dark:text-gray-300 pb-1">Costo</th>
            <td className="text-green-600 dark:text-green-400 font-semibold">
              {formatToCurrency(item.Item_unitCost)}
            </td>
          </tr>
          <tr>
            <th className="text-gray-600 dark:text-gray-300 pb-1">Cantidad</th>
            <td>{item.Item_qtyOrdered}</td>
          </tr>
          <tr>
            <th className="text-gray-600 dark:text-gray-300 pb-1">
              Unidad de Medida
            </th>
            <td>{item.Item_unitMeasure}</td>
          </tr>
          <tr>
            <th className="text-gray-600 dark:text-gray-300 pb-1">TOTAL</th>
            <td className="font-bold text-lg text-red-600 dark:text-red-400">
              {formatToCurrency(item.Item_totalAmount)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
