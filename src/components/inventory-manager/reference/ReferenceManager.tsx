"use client";

import { LoadingSpinner, MainButton, Subtitle } from "@/components/UI";
import { useReferences } from "@/hooks";
import { useReferenceStore } from "@/store";
import { RefreshCcwIcon, ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { ReferenceForm } from "./ReferenceForm";
import { RequestModal } from "../request/RequestModal";

export const ReferenceManager = () => {
  const [checkReferences, setcheckReferences] = useState<boolean>(true);
  const [refForm, setRefForm] = useState<boolean>(false);
  const [loadingRef, setLoadingRef] = useState<boolean>(false);
  const [requestModalOpen, setRequestModalOpen] = useState<boolean>(false);
  const [provRequest, setProvRequest] = useState<{
    id: number;
    name: string;
    available:boolean
  } | null>(null);

  const { getReferenceList } = useReferences();
  const { setReferenceList, referenceList } = useReferenceStore();

  const handleReferences = async () => {
    setLoadingRef(true);
    try {
      const { ok, data, message } = await getReferenceList();
      if (ok && data) {
        setReferenceList(data);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Errror al cargar las referencias");
    } finally {
      setLoadingRef(false);
    }
  };

  const handleCheckReferences = () => {
    setcheckReferences(true);
    setRefForm(false);
  };

  const handleForm = () => {
    setcheckReferences(false);
    setRefForm(true);
  };

  const handleRequest = (id: number, name: string, available: boolean) => {
    setRequestModalOpen(true);
    setProvRequest({ id, name, available });
  };

  return (
    <>
      <div className={`flex gap-1 mt-2`}>
        <MainButton
          variant="secondary"
          onClick={handleCheckReferences}
          className={`${
            !checkReferences
              ? "bg-white text-slate-800 dark:bg-transparent dark:text-slate-200 hover:bg-gray-300 dark:hover:bg-slate-900"
              : "text-white dark:bg-slate-500"
          }`}
        >
          Referencias
        </MainButton>
        <MainButton
          variant="secondary"
          onClick={handleForm}
          className={`${
            !refForm
              ? "bg-white text-slate-800 dark:bg-transparent dark:text-slate-200 hover:bg-gray-300 dark:hover:bg-slate-900"
              : "text-white dark:bg-slate-500"
          }`}
        >
          Nueva Referencia
        </MainButton>
      </div>

      {checkReferences && (
        <div className={`mt-2`}>
          <MainButton variant="primary" onClick={handleReferences}>
            {loadingRef ? (
              <LoadingSpinner />
            ) : referenceList.length > 0 ? (
              <>
                <RefreshCcwIcon className={`w-5 h-5`} /> Recargar
              </>
            ) : (
              " Ver Referencias"
            )}
          </MainButton>
          {referenceList.length < 1 ? (
            <p className={`mt-2`}>No hay productos cargados</p>
          ) : (
            <>
              <Subtitle label="Administrar Referencias" />
              <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 rounded">
                <table
                  className={`w-full rounded border-collapse text-left overflow-hidden shadow-md`}
                >
                  <thead
                    className={`bg-indigo-900 dark:bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800`}
                  >
                    <tr>
                      <th className={`py-3 px-2`}>Item</th>
                      <th className={`py-3 px-2`}>Referencia</th>
                      <th className={`py-3 px-1`}>Nombre</th>
                      <th className={`py-3 px-1`}>Descripción</th>
                      <th className={`py-3 px-1`}>Categoría</th>
                      <th className={`py-3 px-1`}>Estado</th>
                      <th className={`py-3 px-1`}>Solicitar</th>
                    </tr>
                  </thead>
                  <tbody className={`px-10`}>
                    {referenceList.map((ref, i) => (
                      <tr
                        key={ref.Prod_id}
                        className={` dark:border-slate-600 hover:bg-gray-300 dark:hover:bg-teal-950 py-5 ${
                          i % 2 === 0 && "bg-slate-100 dark:bg-slate-800"
                        }`}
                      >
                        <td className={`py-2 px-2`}>{i + 1}</td>
                        <td className={`py-2 px-1`}>{ref.Prod_ref}</td>
                        <td className={`py-2 px-1`}>{ref.Prod_name}</td>
                        <td className={`py-2 px-1`}>{ref.Prod_desc}</td>
                        <td className={`py-2 px-1`}>{ref.Category.Cat_name}</td>
                        <td
                          className={`py-2 px-1 min-w-32 ${
                            !ref.Prod_procurementEnabled
                              ? "bg-slate-600 text-slate-200"
                              : ""
                          }`}
                        >
                          {ref.Prod_procurementEnabled ? (
                            <div
                              className={`flex justify-start items-center gap-1`}
                            >
                              <div
                                className={`w-2 h-2 bg-green-400 rounded-full`}
                              />{" "}
                              Disponible
                            </div>
                          ) : (
                            <div
                              className={`flex justify-start items-center gap-1`}
                            >
                              <div
                                className={`w-2 h-2 bg-red-400 rounded-full`}
                              />{" "}
                              No Disponible
                            </div>
                          )}
                        </td>

                        <td className={`py-2 px-1`}>
                          {/* //*Edit button */}
                          <button
                            className={`bg-rose-500 hover:bg-rose-600 transition-colors duration-300 ease-linear w-8 h-6 p-1 flex justify-center items-center shadow-md rounded`}
                            onClick={() =>
                              handleRequest(ref.Prod_id, ref.Prod_name, ref.Prod_procurementEnabled)
                            } // Se pasan correctamente los valores
                          >
                            <ShoppingCartIcon className={`text-white w-5`} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
      {refForm && <ReferenceForm />}
      {requestModalOpen && (
        <RequestModal
          setRequestModalOpen={setRequestModalOpen}
          requestData={provRequest}
        />
      )}
    </>
  );
};
