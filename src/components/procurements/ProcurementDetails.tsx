"use client";

import { procurementStore } from "@/store/procurementStore";
import { LoadingSpinner2, SectionTitle } from "../UI";
import { formatISOToDate, formatToCurrency } from "@/utils";
import { LockIcon, LockOpenIcon } from "lucide-react";
import { AddItemButton } from "./items/AddItemButton";
import { BackButtonProcurement } from "./BackButtonProcurement";
import { ItemsGrid } from "./ItemsGrid";
import { ItemForm } from "./items/ItemForm";
import { itemStore } from "@/store";

export const ProcurementDetails = () => {
  const { procurementDetails, loadingDetails } = procurementStore();
  const { itemModalOpen } = itemStore();

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
        className={`bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 border-t-8 transition-colros duration-300
      ${
        procurementDetails.Proc_processed
          ? "border-gray-500"
          : "border-green-600"
      }`}
      >
        <h2 className="font-bold text-center text-lg uppercase mb-4">
          Detalle de la Compra
        </h2>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-5`}>
          <div>
            <SectionTitle label="Información de la compra" />

            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <tbody className="text-left">
                {[
                  ["Consecutivo", procurementDetails.Proc_id],
                  ["Descripción", procurementDetails.Proc_desc],
                  ["Fecha", formatISOToDate(procurementDetails.Proc_date)],
                  [
                    "Fecha de Vencimiento",
                    formatISOToDate(procurementDetails.Proc_dueDate),
                  ],
                  ["Término de pago", procurementDetails.Proc_paymentMethod],
                  [
                    "Monto",
                    formatToCurrency(procurementDetails.Proc_totalAmount),
                  ],
                  [
                    "Creado por",
                    `${procurementDetails?.User.User_name} ${procurementDetails?.User.User_surname}`,
                  ],
                ].map(([label, value], index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <th className="px-3 py-1 italic bg-gray-100 dark:bg-gray-800 transition-colors duration-300 w-1/3">
                      {label}
                    </th>
                    <td className="px-3 py-1">{value}</td>
                  </tr>
                ))}

                <tr className="border-b border-gray-300">
                  <th className="px-3 py-1 italic bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
                    Estado
                  </th>
                  <td className="px-3 py-1 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          procurementDetails.Proc_processed
                            ? "bg-gray-500"
                            : "bg-green-600"
                        }`}
                      ></div>
                      {procurementDetails.Proc_processed
                        ? "Cerrada"
                        : "Abierta"}
                    </div>
                    {procurementDetails.Proc_processed ? (
                      <LockIcon className="w-5" />
                    ) : (
                      <LockOpenIcon className="w-5" />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <SectionTitle label="Información del proveedor" />
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <tbody className="text-left">
                {[
                  ["Nit", procurementDetails.Supplier.Supp_nit],
                  ["Razón Social", procurementDetails.Supplier.Supp_name],
                  ["Ciudad", procurementDetails.Supplier.Supp_city],
                  ["Dirección", procurementDetails.Supplier.Supp_address],
                  ["Contacto", procurementDetails.Supplier.Supp_contactInfo],
                  ["Email", procurementDetails.Supplier.Supp_email],
                  ["Teléfono", procurementDetails.Supplier.Supp_phoneNumber],
                ].map(([label, value], index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <th className="px-3 py-1 italic bg-gray-100 dark:bg-gray-800 transition-colors duration-300 w-1/3">
                      {label}
                    </th>
                    <td className="px-3 py-1">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {!procurementDetails.Proc_processed && (
          <div className="flex justify-center mt-5">
            <AddItemButton />
          </div>
        )}
      </div>

      <ItemsGrid />
      {itemModalOpen && <ItemForm />}
    </div>
  );
};
