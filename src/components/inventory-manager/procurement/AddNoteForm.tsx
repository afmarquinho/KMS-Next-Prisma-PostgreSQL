"use client";

import { LoadingSpinner } from "@/components/UI";
import { useProcurementNotes } from "@/hooks";
import { SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  procId: number;
  procClose: boolean;
};
export const AddNoteForm = ({ procId, procClose }: Props) => {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { createNote } = useProcurementNotes();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //* Validaciones

    if (!text.trim()) {
      toast.error("Debes escribir nota antes de enviarla.");
      return;
    }
    if (text.length < 5) {
      toast.error("Nota demasiado corta.");
      setText("");
      return;
    }
    if (text.length > 200) {
      toast.error("La nota no puede exceder los 200 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const { ok, data, message } = await createNote(procId, text);
      if (ok && data) {
        setText("");
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
  };

  return (
    <form className="flex-1" onSubmit={handleSubmit}>
      <textarea
        className="w-full h-20 outline-none rounded-lg bg-white dark:bg-slate-900 resize-none p-2 shadow-md focus:ring-2 focus:ring-teal-600"
        placeholder="Escribe tu comentario, max 100 carctácteres."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      {!procClose && (
        <button
          type="submit"
          className="bg-teal-600 dark:bg-teal-700 rounded-full text-white w-11 h-11 hover:bg-teal-500 dark:hover:bg-teal-500 shadow-md transition-all flex items-center justify-center mt-1"
          disabled={loading}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <SendHorizontal className={`w-6 h-6`} />
          )}
        </button>
      )}
    </form>
  );
};
