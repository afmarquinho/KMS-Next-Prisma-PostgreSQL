"use client";

import { LoadingSpinner } from "@/components/UI";
import { useInventory } from "@/hooks";
import { InvItemType } from "@/interface";
import { inventoryStore } from "@/store";
import { inventorySchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { BanIcon, LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

type Props = {
  product: InvItemType | null;
  itemQtyRemaining: number;
  setItemQtyRemaining: React.Dispatch<React.SetStateAction<number>>;
  setProduct: React.Dispatch<React.SetStateAction<InvItemType | null>>;
};

type FormValuesType = z.infer<typeof inventorySchema>;

export const AddProductModal = ({
  product,
  itemQtyRemaining,
  setItemQtyRemaining,
  setProduct,
}: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const { toggleProductModal } = inventoryStore();
  const { updateInvAndStockMov } = useInventory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesType>({
    resolver: zodResolver(inventorySchema),
  });

  const handleCancel = () => {
    setProduct(null);
    setItemQtyRemaining(0);
    toggleProductModal();
  };

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    if (!product) return;
    if (data.Inv_qty > itemQtyRemaining) {
      toast.error("La cantidad no puede ser mayor que los faltantes.");
      return;
    }
    if (data.Inv_qty <= 0) {
      toast.error("Ingrese un cantidad válida.");
      return;
    }
    //* Actualizamos o creamos la bbdd del inventario con la cantidad recibida.
    setLoading(true);
    try {
      const { ok, message } = await updateInvAndStockMov(product.Item_prodId, {
        Inv_stock: data.Inv_qty,
        Inv_itemId: product.Item_id,
        Inv_batch: data.Inv_batch.toUpperCase(),
        Inv_batchDueDate: data.Inv_batchDueDate,
        Mov_reason: data.Mov_reason,
      });
      if (ok) {
        toast.success(message);
        setProduct(null);
        setItemQtyRemaining(0);
        toggleProductModal();
        reset();
        router.refresh();
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Hubo un problema al procesar la solicitud");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 z-20 flex justify-center items-start md:items-center overflow-auto pt-5 md:pt-0 backdrop-blur-[1px]`}
      onClick={handleCancel}
    >
      <div
        className={`bg-white dark:bg-slate-600 p-5 w-11/12 max-w-[300px] shadow`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={`italic font-bold text-center mb-2`}>
          Ingresar: <span>{product?.Product.Prod_name}</span> al Inventario
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>
            Referencia:{" "}
            <span className={`font-medium`}>{product?.Product.Prod_ref}</span>
          </p>

          <label className={`flex gap-2 justify-start items-center mb-2`}>
            <span className={`w-20 italic`}>Cantidad:</span>
            {errors.Inv_qty && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Inv_qty.message}
              </div>
            )}
            <input
              type="number"
              className={`bg-slate-300 dark:bg-slate-800 p-2 focus:outline-none text-base rounded h-8 flex-1 max-w-40`}
              {...register("Inv_qty", { valueAsNumber: true })}
            />
          </label>

          <label className={`flex gap-2 justify-start items-center mb-2`}>
            <span className={`w-20 italic`}>Lote:</span>
            {errors.Inv_batch && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Inv_batch.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-800 p-2 focus:outline-none text-base rounded h-8 flex-1 max-w-40 uppercase`}
              {...register("Inv_batch")}
            />
          </label>

          <label className={`flex gap-2 justify-start items-center mb-2`}>
            <span className={`w-20 italic`}>Fecha vencimiento lote:</span>
            {errors.Inv_batchDueDate && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Inv_batchDueDate.message}
              </div>
            )}
            <input
              type="date"
              className={`bg-slate-300 dark:bg-slate-800 p-2 focus:outline-none rounded h-8 flex-1 max-w-40 uppercase`}
              {...register("Inv_batchDueDate", { valueAsDate: true })}
            />
          </label>

          <div className={`flex justify-end gap-4 mt-4`}>
            <button type="button" onClick={handleCancel}>
              <BanIcon className="w-5 h-5 inline-block mr-1" />
              Cancelar
            </button>
            <button type="submit" disabled={loading}>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <LogInIcon className="w-5 h-5 inline-block mr-1" />
                  Confirmar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
