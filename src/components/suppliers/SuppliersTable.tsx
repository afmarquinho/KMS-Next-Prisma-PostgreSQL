import { useSupplierStore } from "@/store";
import { GetSuppliersButton } from "./GetSuppliersButton";
import { FilePenLineIcon, SearchIcon } from "lucide-react";
import { Supplier } from "@prisma/client";
import { useSuppliers } from "@/hooks/useSuppliers";
import { toast } from "react-toastify";

export const SuppliersTable = () => {
  const {
    suppliers,
    setSupplier,
    toggleCurrentView,
    setDetailManager,
    setLoadingdetails,
    setSupplierDetails,
  } = useSupplierStore();

  const {getSupplierById} = useSuppliers()

  const handleEdit = (supplier: Supplier) => {
    setSupplier(supplier);
    toggleCurrentView("form");
  };

  const handleViewSupplier = async (id: number) => {
    try {
      setDetailManager(true);
      setLoadingdetails(true);
      const { ok, data, message } = await getSupplierById(id);
      if (ok && data) {
        setSupplierDetails(data);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Hubo un problema al procesar la solicitud");
      console.error(error);
    } finally {
      setLoadingdetails(false);
    }
  };

  if (!suppliers || suppliers.length === 0) {
    const message = !suppliers
      ? 'No hay proveedores para visualizar, presiona el botón "Mostrar Proveedores".'
      : "No hay proveedores registrados.";

    return (
      <>
        <GetSuppliersButton />
        <div className="italic font-medium text-base">{message}</div>
      </>
    );
  }

  return (
    <>
      <GetSuppliersButton />
      <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 rounded">
        <table
          className={`w-full rounded border-collapse text-left overflow-hidden shadow-md`}
        >
          <thead
            className={`bg-indigo-900 dark:bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800`}
          >
            <tr>
              <th className={`py-3 px-2`}>Item</th>
              <th className={`py-3 px-1`}>Nit</th>
              <th className={`py-3 px-1`}>Razon Social</th>
              <th className={`py-3 px-1`}>Contato</th>
              <th className={`py-3 px-1`}>Estado</th>
              <th className={`py-3 px-1`}>Ver</th>
              <th className={`py-3 px-1`}>Editar</th>
            </tr>
          </thead>
          <tbody className={`px-10`}>
            {suppliers?.map((supplier, i) => (
              <tr
                key={supplier.Supp_id}
                className={` dark:border-slate-600 hover:bg-gray-300 dark:hover:bg-yellow-900 py-5 ${
                  i % 2 === 0 && "bg-slate-100 dark:bg-slate-800"
                }`}
              >
                <td className={`py-2 px-2`}>{i + 1}</td>
                <td className={`py-2 px-1`}>{supplier.Supp_nit}</td>
                <td className={`py-2 px-1`}>{supplier.Supp_name}</td>
                <td className={`py-2 px-1`}>{supplier.Supp_contactInfo}</td>
                <td className={`py-2 px-1`}>
                  <div className={`flex gap-1 items-center`}>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        supplier.Supp_active ? "bg-green-500" : "bg-red-600"
                      }`}
                    ></div>{" "}
                    {supplier.Supp_active ? "Activo" : "No Activo"}
                  </div>
                </td>
                <td className={`py-2 px-1`}>
                  {/* //*Watch button */}
                  <button
                    className={`bg-gradient-to-b from-rose-500 to-rose-700 hover:from-red-800 hover:to-red-800 transition-colors duration-300 ease-linear rounded-full w-8 h-6 p-1 flex justify-center items-center shadow`}
                    onClick={() => handleViewSupplier(supplier.Supp_id)}
                  >
                    <SearchIcon className={`text-white w-5`} />
                  </button>
                </td>
                <td className={`py-2 px-1`}>
                  {/* //*Edit button */}
                  <button
                    className={`bg-gradient-to-b from-indigo-500 to-indigo-700 hover:from-blue-800 hover:to-blue-800 transition-colors duration-300 ease-linear w-8 h-6 p-1 flex justify-center items-center shadow-md rounded`}
                    onClick={() => handleEdit(supplier)}
                  >
                    <FilePenLineIcon className={`text-white w-5`} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
