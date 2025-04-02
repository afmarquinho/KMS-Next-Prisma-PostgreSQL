"use client";

import { LoadingSpinner, MainButton, Subtitle } from "@/components/UI";
import { useProvisionRequest } from "@/hooks";
import { formatISOToDate } from "@/utils";
import { CalendarDaysIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export const ProvisionRequest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [provRequests, setProvRequests] = useState<
    {
      Prov_id: number;
      Prov_prodId: number;
      Prov_quantity: number;
      Prov_status: string;
      Prov_desc: string;
      createdBy: number;
      createdAt: string;
      User: {
        User_name: string;
        User_surname: string;
      };
      Product: {
        Prod_name: string;
        Prod_ref: string;
        Category: {
          Cat_name: string;
        };
      };
    }[]
  >([]);

  const { getProvRequest } = useProvisionRequest();

  const handleProvisionRequests = async () => {
    setLoading(true);
    try {
      const { ok, data, message } = await getProvRequest();
      if (ok && data) {
        setProvRequests(data);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener las solicitudes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`mt-2`}>
      <MainButton variant="primary" onClick={handleProvisionRequests}>
        {loading ? <LoadingSpinner /> : "Ver Solicitudes"}
      </MainButton>
      {provRequests.length < 1 ? (
        <p className={`text-center mt-5 italic font-medium`}>
          No hay solicitudes pendientes
        </p>
      ) : (
        <div className={`mt-5`}>
          <Subtitle label="Listado de solicitudes de compras" />

          <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 rounded">
            <table
              className={`w-full rounded border-collapse text-left overflow-hidden shadow-md`}
            >
              <thead
                className={`bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800`}
              >
                <tr>
                  <th className={`py-3 px-2`}>Item</th>
                  <th className={`py-3 px-1`}>Referencia</th>
                  <th className={`py-3 px-1`}>Nombre</th>
                  <th className={`py-3 px-1`}>Categoría</th>
                  <th className={`py-3 px-1`}>Descripción</th>
                  <th className={`py-3 px-1`}>Cantidad</th>
                  <th className={`py-3 px-1`}>Solicitado por</th>
                  <th className={`py-3 px-1`}>Fecha</th>
                  <th className={`py-3 px-1`}>Estado</th>
                  <th className={`py-3 px-1`}></th>
                  {/* <th className={`py-3 px-1`}>Cancelar</th> */}
                </tr>
              </thead>
              <tbody className={`px-10`}>
                {provRequests.map((p, i) => (
                  <tr
                    key={p.Prov_id}
                    className={`dark:border-slate-600 hover:bg-gray-300 dark:hover:bg-teal-900 py-5 ${
                      i % 2 === 0 && "bg-slate-100 dark:bg-slate-800"
                    }`}
                  >
                    <td className={`py-2 px-2`}>{i + 1}</td>
                    <td className={`py-2 px-1`}>{p.Product.Prod_ref}</td>
                    <td className={`py-2 px-1 max-w-32`}>
                      {p.Product.Prod_name}
                    </td>
                    <td className={`py-2 px-1 max-w-28`}>
                      {p.Product.Category.Cat_name}
                    </td>
                    <td className={`py-2 px-1`}>{p.Prov_desc}</td>
                    <td className={`py-2 px-1`}>{p.Prov_quantity}</td>
                    <td className={`py-2 px-1`}>
                      {p.User.User_name} {p.User.User_surname}
                    </td>
                    <td className={`py-2 px-1`}>
                      {formatISOToDate(p.createdAt)}
                    </td>
                    <td className={`py-2 px-1`}>{p.Prov_status}</td>

                    <td className={`py-2 px-1`}>
                      <button>
                        <CalendarDaysIcon className={`w-5 h-5`} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
