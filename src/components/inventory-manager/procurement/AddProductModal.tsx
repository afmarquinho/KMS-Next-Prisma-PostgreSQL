"use client";

import { LoadingSpinner } from "@/components/UI";
import { useInventory } from "@/hooks";
import { InvItemType } from "@/interface";
import { useInventoryStore } from "@/store";
import { productSchema } from "@/validations";
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

type FormValuesType = z.infer<typeof productSchema>;

export const AddProductModal = ({
  product,
  itemQtyRemaining,
  setItemQtyRemaining,
  setProduct,
}: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const { toggleProductModal } = useInventoryStore();
  const { updateInvAndStockMov } = useInventory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesType>({
    resolver: zodResolver(productSchema),
  });

  const handleCancel = () => {
    setProduct(null);
    setItemQtyRemaining(0);
    toggleProductModal();
  };

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    if (!product) return;
    if (data.Prod_qtyReceive > itemQtyRemaining) {
      toast.error("La cantidad no puede ser mayor que los faltantes.");
      return;
    }
    if (data.Prod_qtyReceive <= 0) {
      toast.error("Ingrese un cantidad válida.");
      return;
    }
    //* Actualizamos o creamos la bbdd del inventario con la cantidad recibida.
    setLoading(true);
    try {
      const {
        ok,
        message,
      } = await updateInvAndStockMov(product.Item_prodId, {
        Inv_stock: data.Prod_qtyReceive,
        Inv_itemId: product.Item_id,
        Inv_batch: data.Prod_batchCode,
        Inv_batchDueDate: data.Prod_batchDate,
        Mov_reason: data.reason
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

    //     const updatedProductData: ProductData = {
    //       ...productData,
    //       Product_qtyReceive: qtyReceive,
    //       Product_batchCode: batchCode,
    //       Product_batchDate: batchDate,
    //       reason,
    //     };
    //     setLoading(true);
    //     try {
    //       const { ok, data, message } = await updatePurchaseItemStock(
    //         updatedProductData.Product_purchaseId,
    //         updatedProductData,
    //         // TODO: Reemplazar con userId dinámico
    //         4
    //       );
    //       if (ok && data) {
    //         toast.success(message);
    //         setQtyReceive(0);
    //         setBatchCode("");
    //         setReason("");
    //         setBatchDate("");
    //         setProductData(null);
    //         setItemQtyRemaining(0);
    //         toggleProductModal();
    //         router.refresh();
    //       } else {
    //         toast.error(message);
    //       }
    //     } catch (error) {
    //       console.error(error);
    //       toast.error("Error al procesar el producto.");
    //     } finally {
    //       setLoading(false);
    //     }
    //   }
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
          <p>Referencia: <span className={`font-medium`}>{product?.Product.Prod_ref}</span></p>
          <label className={`flex gap-2 justify-start items-center mb-2`}>
            <span className={`w-20 italic`}>Cantidad:</span>
            {errors.Prod_qtyReceive && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Prod_qtyReceive.message}
              </div>
            )}
            <input
              type="number"
              className={`bg-slate-300 dark:bg-slate-800 p-2 focus:outline-none text-base rounded h-8 flex-1 max-w-40`}
              {...register("Prod_qtyReceive", { valueAsNumber: true })}
            />
          </label>
          <label className={`flex gap-2 justify-start items-center mb-2`}>
            <span className={`w-20 italic`}>Lote:</span>
            {errors.Prod_batchCode && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Prod_batchCode.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-800 p-2 focus:outline-none text-base rounded h-8 flex-1 max-w-40 uppercase`}
              {...register("Prod_batchCode")}
            />
          </label>
          <label className={`flex gap-2 justify-start items-center mb-2`}>
            <span className={`w-20 italic`}>Fecha lote:</span>
            {errors.Prod_batchDate && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Prod_batchDate.message}
              </div>
            )}
            <input
              type="date"
              className={`bg-slate-300 dark:bg-slate-800 p-2 focus:outline-none rounded h-8 flex-1 max-w-40 uppercase`}
              {...register("Prod_batchDate", { valueAsDate: true })}
            />
          </label>
          <label className={`flex gap-2 justify-start items-center mb-2 `}>
            <span className={`w-20 italic`}>Razón:</span>
            {errors.reason && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.reason.message}
              </div>
            )}
            <select
              className={`outline-none bg-slate-300 dark:bg-slate-800 h-8 w-40 rounded`}
              {...register("reason")}
            >
              <option value="compra">-- Seleccione --</option>
              <option value="compra">Compra</option>
              <option value="reposición">Reposición</option>
              <option value="devolución">Devolucón</option>
              <option value="ajuste">Ajuste</option>
            </select>
          </label>
          <div className={`flex gap-2 mt-5`}>
            <button
              type="button"
              className={`flex justify-center items-center py-2 text-white gap-1 my-1 bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-600 mx-auto rounded mt-2 w-28 transition-all duration-300`}
              onClick={handleCancel}
              disabled={loading}
            >
              <BanIcon className={`w-5`} />
              Cancelar
            </button>

            <button
              type="submit"
              className={`flex justify-center items-center py-2 text-white gap-1 my-1 bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 mx-auto rounded mt-2 w-28 transition-all duration-300`}
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <LogInIcon className={`w-5`} />
                  Enviar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
