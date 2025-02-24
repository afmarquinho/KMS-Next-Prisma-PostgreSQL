"use client";

import { useProcurementStore } from "@/store/procurementStore";
import { LoadingSpinner2 } from "../UI";
import { formatISOToDate, formatToCurrency } from "@/utils";
import { LockIcon, LockOpenIcon } from "lucide-react";
import { AddItemButton } from "./items/AddItemButton";
import { BackButtonProcurement } from "./BackButtonProcurement";
import { ProcurementGrid } from "./ProcurementGrid";

export const ProcurementDetails = () => {
  const { procurementDetails, loadingDetails } = useProcurementStore();

  if (loadingDetails) {
    return (
      <div className="flex justify-center items-center min-h-[450px]">
        <LoadingSpinner2 />
      </div>
    );
  }

  if (!procurementDetails) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <BackButtonProcurement />
        </div>
        <p className="text-base italic font-semibold text-center">
          No has seleccionado una compra para visualizar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-end">
        <BackButtonProcurement />
      </div>

      <div
        className={`bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 border-t-8 transition-all
      ${
        procurementDetails.Pro_processed
          ? "border-gray-500"
          : "border-green-600"
      }`}
      >
        <h2 className="font-bold text-center text-lg uppercase mb-4">
          Detalle de la Compra
        </h2>

        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <tbody className="text-left">
            {[
              ["Consecutivo", procurementDetails.Pro_id],
              ["Descripción", procurementDetails.Pro_desc],
              ["Fecha", formatISOToDate(procurementDetails.Pro_date)],
              [
                "Fecha de Vencimiento",
                formatISOToDate(procurementDetails.Pro_dueDate),
              ],
              ["Término de pago", procurementDetails.Pro_paymentMethod],
              ["Monto", formatToCurrency(procurementDetails.Pro_totalAmount)],
              [
                "Creado por",
                `${procurementDetails?.User.User_name} ${procurementDetails?.User.User_surname}`,
              ],
            ].map(([label, value], index) => (
              <tr key={index} className="border-b border-gray-300">
                <th className="p-3 italic bg-gray-100 dark:bg-gray-800 w-1/3">
                  {label}
                </th>
                <td className="p-3">{value}</td>
              </tr>
            ))}

            <tr className="border-b border-gray-300">
              <th className="p-3 italic bg-gray-100 dark:bg-gray-800">
                Estado
              </th>
              <td className="p-3 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      procurementDetails.Pro_processed
                        ? "bg-gray-500"
                        : "bg-green-600"
                    }`}
                  ></div>
                  {procurementDetails.Pro_processed ? "Cerrada" : "Abierta"}
                </div>
                {procurementDetails.Pro_processed ? (
                  <LockIcon className="w-5" />
                ) : (
                  <LockOpenIcon className="w-5" />
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {!procurementDetails.Pro_processed && (
          <div className="flex justify-center mt-5">
            <AddItemButton />
          </div>
        )}
      </div>

      <ProcurementGrid />
    </div>
  );
};
