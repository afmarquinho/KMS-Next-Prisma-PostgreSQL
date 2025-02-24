"use client";

import { LoadingSpinner } from "@/components/UI";
import { useItem } from "@/hooks/useItem";
import { useItemStore, useProcurementStore } from "@/store";
import { TriangleAlertIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export const DeleteItemModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toggleDeleteItemModal, item, setItems, clearItem } = useItemStore();
  const { deleteItem } = useItem();
  const { setProcurementDetails, updateAmount} = useProcurementStore()

  const handleCancel = () => {
    toggleDeleteItemModal();
    clearItem()
  };

  const handleDelete = async () => {
    setLoading(true);
    if (!item) return;
    try {
      const { ok, data, message } = await deleteItem(item?.Item_id);

      if (ok && data) {
        const { Item, ...procurement } = data;
        setProcurementDetails(procurement);
        setItems(Item);
        updateAmount(procurement.Pro_id, procurement.Pro_totalAmount);
        toggleDeleteItemModal();
        toast.success("Producto eliminado.");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Hubo un problema al procesar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-[-100px] bg-black bg-opacity-60 dark:bg-opacity-80 z-20 flex justify-center items-center backdrop-blur-[1px]`}
      >
        <div className={`w-full max-w-96 bg-white dark:bg-slate-700 rounded overflow-hidden`}>
          <div className={`relative`}>
            <TriangleAlertIcon
              className={`absolute top-2 left-2 text-yellow-400`}
              strokeWidth={3}
            />
            <button
              className={`absolute top-2 right-2 bg-red-800 hover:bg-red-950`}
              onClick={handleCancel}
              disabled={loading}
            >
              <XIcon
                className={`  text-yellow-400 cursor-pointer`}
                strokeWidth={3}
              />
            </button>
            <h2
              className={`bg-gradient-to-b  text-center text-white uppercase font-bold py-3 from-red-500 to-red-600`}
            >
              Alerta
            </h2>
          </div>

          <div className={`p-4`}>
            <p className={`text-center`}>
              ¿Realmente deseas eliminar este producto:{" "}
              <span className={`font-medium`}>{item?.Item_name}</span>?
            </p>

            <button
              className={`flex gap-1 justify-center items-center  rounded text-white transition-all mx-auto mt-5 uppercase font-semibold shadow-md bg-gradient-to-b from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 w-28 md:w-32 h-8 md:h-10`}
              onClick={handleDelete}
            >
              {loading ? <LoadingSpinner /> : "Eliminar"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
