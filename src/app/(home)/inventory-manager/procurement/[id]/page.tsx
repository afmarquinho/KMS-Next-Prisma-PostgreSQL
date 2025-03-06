import {
  AddNoteForm,
  CommentsSection,
  IncomeTrackingTable,
  SectionTitle,
  Subtitle,
} from "@/components";
import { getProcurementInventoryById } from "@/server-actions";
import { FolderClosedIcon } from "lucide-react";

interface PageProps {
  params: { id: string }; // El parámetro dinámico de la URL
}

const InventoryItemsManagementPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const idInt = parseInt(id, 10); // Convertir el parámetro a número

  const { response } = await getProcurementInventoryById(idInt);
  const { ok, data } = response;

  if (!ok || !data) {
    return (
      <div className={`italic text-base font-semibold`}>
        No hay datos para mostrar
      </div>
    );
  }

  return (
    <>
      <Subtitle label="Detalle de Compra e Ingreso a Inventario" />

      <SectionTitle label="Detalle de Compra" />

      <table className="bg-white dark:bg-slate-700 rounded-lg shadow-lg w-full max-w-[900px] overflow-hidden mx-auto">
        <tbody className="text-left">
          {/* <!-- Encabezado general --> */}
          <tr className="bg-gray-100 dark:bg-slate-800 font-bold border-b-2 dark:border-gray-500">
            <th className="italic p-3 w-1/3 sm:w-1/4 md:w-[12rem] border-r-2 border-gray-300 dark:border-gray-500">
              Serial:
            </th>
            <td className="p-3">{data.Pro_id}</td>
          </tr>
          <tr className="border-b-2 border-gray-300 dark:border-gray-500">
            <th className="italic p-3 w-1/3 sm:w-1/4 md:w-1/5 lg:w-[10rem] border-r-2 border-gray-300 dark:border-gray-500">
              Descripción:
            </th>
            <td className="p-3">{data.Pro_desc}</td>
          </tr>

          {/* <!-- Subtítulo centrado --> */}
          <tr>
            <td
              colSpan={2}
              className="bg-gray-200 dark:bg-slate-800 text-center font-semibold text-gray-700 dark:text-gray-200 p-3 uppercase text-xs border-b-2 dark:border-gray-500"
            >
              Datos del Proveedor
            </td>
          </tr>

          {/* <!-- Contenido del subtítulo --> */}
          <tr className="border-b-2 border-gray-300 dark:border-gray-500">
            <th className="italic p-3 w-1/3 sm:w-1/4 md:w-1/5 lg:w-[10rem] border-r-2 border-gray-300 dark:border-gray-500">
              Proveedor:
            </th>
            <td className="p-3">{data.Supplier.Supp_name}</td>
          </tr>
          <tr className="border-b-2 border-gray-300 dark:border-gray-500">
            <th className="italic p-3 w-1/3 sm:w-1/4 md:w-1/5 lg:w-[10rem] border-r-2 border-gray-300 dark:border-gray-500">
              Cuidad:
            </th>
            <td className="p-3">{data.Supplier.Supp_city}</td>
          </tr>
          <tr className="border-b-2 border-gray-300 dark:border-gray-500">
            <th className="italic p-3 w-1/3 sm:w-1/4 md:w-1/5 lg:w-[10rem] border-r-2 border-gray-300 dark:border-gray-500">
              Nombre de Contacto
            </th>
            <td className="p-3">{data.Supplier.Supp_contactInfo}</td>
          </tr>
          <tr className="border-b-2 border-gray-300 dark:border-gray-500">
            <th className="italic p-3 w-1/3 sm:w-1/4 md:w-1/5 lg:w-[10rem] border-r-2 border-gray-300 dark:border-gray-500">
              Correo:
            </th>
            <td className="p-3">{data.Supplier.Supp_email}</td>
          </tr>
          <tr className="border-b-2 border-gray-300 dark:border-gray-500">
            <th className="italic p-3 w-1/3 sm:w-1/4 md:w-1/5 lg:w-[10rem] border-r-2 border-gray-300 dark:border-gray-500">
              Teléfono:
            </th>
            <td className="p-3">{data.Supplier.Supp_phoneNumber}</td>
          </tr>
        </tbody>
      </table>

      <SectionTitle label="Control de Ingreso" />

      <IncomeTrackingTable items={data.Item} />

      <SectionTitle label="Anotaciones" />
      <div className="flex flex-col md:flex-row gap-5 w-full mb-5 ps-1">
        <AddNoteForm proId={data.Pro_id} />

        {/* //*Línea divisoria adaptable */}
        <div className="relative">
          <div className="hidden md:block w-[1px] bg-slate-400 h-full mx-auto" />
          <div className="block md:hidden h-[1px] bg-slate-400 w-full my-2" />
        </div>

        {/* //*Sección de comentarios con scroll */}

        <CommentsSection notes={data.ProcurementNote} />
      </div>
      {!data.Pro_close && (
        <button
          type="button"
          className={`shadow-lg rounded p-2 flex gap-2 text-xs text-white items-center justify-center my-5 bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-600 transition-colors duration-300`}
        >
          <FolderClosedIcon strokeWidth={1.5} />
          Cerrar Compra
        </button>
      )}
    </>
  );
};
export default InventoryItemsManagementPage;
