"use client";
import { Button, LoadingSpinner } from "@/components/UI";
import { useProvisionRequest } from "@/hooks";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  setRequestModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  requestData: {
    id: number;
    name: string;
    available: boolean;
  } | null;
};

export const RequestModal = ({ setRequestModalOpen, requestData }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string>("");
  
  const {createProvRequest} = useProvisionRequest()

  const handleClose = () => {
    setRequestModalOpen(false);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!requestData) {
      setRequestModalOpen(false);
  
      return;
    }
 
    if (quantity < 1) {
      alert("La cantidad debe ser mayor que 0.");
      return;
    }
    
    if (!note.trim() || note.length <= 5 ) {
      alert("Escriba una descripción válida.");
      return;
    }
    
    setLoading(true);
    try {

      const {ok, data, message} = await createProvRequest({quantity, note, id:requestData?.id})
      if(ok && data){
        toast.success(message)
        setRequestModalOpen(false);

      } else{
        toast.error("Error al crear la solicitud")
      }
    } catch (error) {
      console.error(error);
      toast.error("No se pudo crear la solicitud.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 z-20 flex justify-center items-center backdrop-blur-[1px] !m-0`}
    >
      <div className={`w-full max-w-96 bg-white dark:bg-slate-700 rounded p-5`}>
        {requestData?.available ? (
          <>
            <h2
              className={`text-center py-2 bg-indigo-900 text-white flex items-center justify-center font-semibold my-2`}
            >
              Soliciud de compras
            </h2>
            <form className={`flex flex-col gap-2`}>
              <p className={`flex justify-start`}>
                <span className={`w-20`}>Producto: </span> {requestData.name}
              </p>
              <label className={`w-full flex items-center justify-start`}>
                <span className={`w-20`}>Cantidad:</span>
                <input
                  type="number"
                  placeholder="0"
                  className="bg-slate-300 dark:bg-slate-900 outline-none p-2 flex-1 rounded"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min={1}
                />
              </label>

              <label className={`w-full flex items-center justify-start`}>
                <span className={`w-20`}>Nota:</span>
                <textarea
                  className="bg-slate-300 dark:bg-slate-900 outline-none p-2 flex-1 rounded resize-none"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </label>
              <div className="flex flex-row-reverse justify-between items-center my-5">
                <Button
                  variant="danger"
                  showIcon={true}
                  className="w-36"
                  onClick={handleClose}
                  type="button"
                >
                  Cancelar
                </Button>

                <Button
                  variant="primary"
                  showIcon={loading ? false : true}
                  className="w-36"
                  type="submit"
                  onClick={handleSubmit}
                >
                  {loading ? <LoadingSpinner /> : <>Guardar</>}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <p className={`text-center`}>Producto no disponible para compras</p>
            <Button
              variant="danger"
              showIcon={true}
              className="w-36 mx-auto mt-5"
              onClick={handleClose}
              type="button"
            >
              Cerrar
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
