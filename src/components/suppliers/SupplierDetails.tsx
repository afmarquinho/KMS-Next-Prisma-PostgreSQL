"use client";

import { supplierStore } from "@/store";
import { PowerIcon, PowerOffIcon } from "lucide-react";
import { LoadingSpinner2 } from "../UI";
import { BackButtonSupplier } from "./BackButtonSupplier";
import { ActiveSupplierModal } from "./ActiveSupplierModal";

export const SupplierDetails = () => {
  const {
    supplierDetails,
    loadingDetails,
    isActiveModalOpen,
    toggleActiveModal,
  } = supplierStore();

  if (loadingDetails) {
    return (
      <div className="flex justify-center items-center min-h-[450px]">
        <LoadingSpinner2 />
      </div>
    );
  }

  if (!supplierDetails) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <BackButtonSupplier />
        </div>
        <p className="text-base italic font-semibold text-center">
          No has seleccionado un proveedor para visualizar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-end">
        <BackButtonSupplier />
      </div>

      <div
        className={`bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 border-t-8 transition-all ${
          supplierDetails.Supp_active
            ? "border-green-500"
            : "border-red-500"
        }`}
      >
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <tbody className="text-left">
            {[
              ["Nit", supplierDetails.Supp_nit],
              ["Razón Social", supplierDetails.Supp_name],
              ["Nombre de Contacto", supplierDetails.Supp_contactInfo],
              ["Correo Electrónico", supplierDetails.Supp_email],
              ["Teléfono", supplierDetails.Supp_phoneNumber],
              ["Ciudad", supplierDetails.Supp_city],
              ["Dirección", supplierDetails.Supp_address],
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
                <div className={`flex items-center justify-center gap-1`}>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      supplierDetails.Supp_active
                        ? "bg-green-500"
                        : "bg-red-600"
                    }`}
                  ></div>
                  {supplierDetails.Supp_active ? "Activo" : "No Activo"}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-center mt-5">
          <button
            className={`flex items-center gap-2 px-6 py-2 text-white font-semibold rounded shadow-md transition-all ${
              supplierDetails.Supp_active
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
            onClick={toggleActiveModal}
          >
            {supplierDetails.Supp_active ? <PowerOffIcon /> : <PowerIcon />}
            {supplierDetails.Supp_active ? "Desactivar" : "Activar"}
          </button>
        </div>
      </div>

      {isActiveModalOpen && <ActiveSupplierModal />}
    </div>
  );
};
