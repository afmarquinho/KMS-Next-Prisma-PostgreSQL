import { LockKeyholeIcon, LockKeyholeOpenIcon } from "lucide-react";

type Props = {
  id: number;
  desc: string;
  date: string;
  dueDate: string;
  paymentMethod: string;
  close: boolean;
  totalAmount: string;
  Supplier: {
    Supp_name: string;
    Supp_city: string;
    Supp_contactInfo: string;
    Supp_email: string;
    Supp_phoneNumber: string;
  };
};

export const ProcurementSummary = (props: Props) => {
  return (
    <div className="bg-white dark:bg-slate-700 rounded shadow-lg w-full max-w-[1100px] mx-auto p-4 flex flex-col md:flex-row gap-4 border border-gray-300 dark:border-gray-500">
      {/* Tabla de Detalles de Compra */}
      <table className="w-full md:w-1/2 border-collapse">
        <thead>
          <tr>
            <td
              colSpan={2}
              className="bg-gray-200 dark:bg-slate-800 text-center font-semibold text-gray-700 dark:text-gray-200 px-3 py-1 uppercase text-xs border-b dark:border-gray-500"
            >
              Datos de la compra
            </td>
          </tr>
        </thead>
        <tbody className="text-left">
          <tr className="border-b border-gray-300 dark:border-gray-500">
            <th className="font-medium italic px-3 py-1 w-1/3 border-r border-gray-300 dark:border-gray-500">
              Serial:
            </th>
            <td className="px-3 py-1">{props.id}</td>
          </tr>
          <tr className="border-b border-gray-300 dark:border-gray-500">
            <th className="font-medium italic px-3 py-1 w-1/3 border-r border-gray-300 dark:border-gray-500">
              Descripción:
            </th>
            <td className="px-3 py-1">{props.desc}</td>
          </tr>
          <tr className="border-b border-gray-300 dark:border-gray-500">
            <th className="font-medium italic px-3 py-1 w-1/3 border-r border-gray-300 dark:border-gray-500">
              Fecha:
            </th>
            <td className="px-3 py-1">{props.date}</td>
          </tr>
          <tr className="border-b border-gray-300 dark:border-gray-500">
            <th className="font-medium italic px-3 py-1 w-1/3 border-r border-gray-300 dark:border-gray-500">
              Fecha de Vencimiento:
            </th>
            <td className="px-3 py-1">{props.dueDate}</td>
          </tr>
          <tr className="border-b border-gray-300 dark:border-gray-500">
            <th className="font-medium italic px-3 py-1 w-1/3 border-r border-gray-300 dark:border-gray-500">
              Método de Pago:
            </th>
            <td className="px-3 py-1">{props.paymentMethod}</td>
          </tr>
          <tr className="border-b border-gray-300 dark:border-gray-500">
            <th className="font-medium italic px-3 py-1 w-1/3 border-r border-gray-300 dark:border-gray-500">
              Estado de la compra:
            </th>
            <td className="px-3 py-1 flex items-center gap-2">
              {props.close ? (
                <>
                  <LockKeyholeIcon className="w-5 h-5" /> Cerrada
                </>
              ) : (
                <>
                  <LockKeyholeOpenIcon className="w-5 h-5" /> Abierta
                </>
              )}
            </td>
          </tr>
          <tr>
            <th className="font-medium italic px-3 py-1 w-1/3 border-r border-gray-300 dark:border-gray-500">
              Monto total:
            </th>
            <td className="px-3 py-1">{props.totalAmount}</td>
          </tr>
        </tbody>
      </table>

      {/* Línea divisoria */}
      <div className="w-[450px] h-[2px] md:w-[2px] md:min-h-[200px] m-auto bg-gray-300 dark:bg-gray-500" />

      {/* Tabla de Datos del Proveedor */}
      <table className="w-full md:w-1/2 border-collapse">
        <thead>
          <tr>
            <td
              colSpan={2}
              className="bg-gray-200 dark:bg-slate-800 text-center font-semibold text-gray-700 dark:text-gray-200 px-3 py-1 uppercase text-xs border-b dark:border-gray-500"
            >
              Datos del Proveedor
            </td>
          </tr>
        </thead>
        <tbody className="text-left">
          <tr className="border-b border-gray-300 dark:border-gray-500">
            <th className="font-medium italic px-3 py-1 w-1/3 border-r border-gray-300 dark:border-gray-500">
              Proveedor:
            </th>
            <td className="px-3 py-1">{props.Supplier.Supp_name}</td>
          </tr>
          <tr className="border-b border-gray-300 dark:border-gray-500">
            <th className="font-medium italic px-3 py-1 w-1/3 border-r border-gray-300 dark:border-gray-500">
              Ciudad:
            </th>
            <td className="px-3 py-1">{props.Supplier.Supp_city}</td>
          </tr>
          <tr className="border-b border-gray-300 dark:border-gray-500">
            <th className="font-medium italic px-3 py-1 w-1/3 border-r border-gray-300 dark:border-gray-500">
              Nombre de Contacto:
            </th>
            <td className="px-3 py-1">{props.Supplier.Supp_contactInfo}</td>
          </tr>
          <tr className="border-b border-gray-300 dark:border-gray-500">
            <th className="font-medium italic px-3 py-1 w-1/3 border-r border-gray-300 dark:border-gray-500">
              Correo:
            </th>
            <td className="px-3 py-1">{props.Supplier.Supp_email}</td>
          </tr>
          <tr>
            <th className="font-medium italic px-3 py-1 w-1/3 border-r border-gray-300 dark:border-gray-500">
              Teléfono:
            </th>
            <td className="px-3 py-1">{props.Supplier.Supp_phoneNumber}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
