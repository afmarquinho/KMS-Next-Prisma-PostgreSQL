"use client";

import { useInventory } from "@/hooks";
import { SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  proId: number;
};
export const AddNoteForm = ({ proId }: Props) => {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const { createNote } = useInventory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //* Validaciones

    if (!text.trim()) {
      toast.error("Debes escribir nota antes de enviarla.");
      return;
    }
    if (text.length < 5) {
      toast.error("Nota demasiado corta.");
      setText("")
      return;
    }
    if (text.length > 200) {
      toast.error("La nota no puede exceder los 200 caracteres.");
      return;
    }

    try {
      const { ok, data, message } = await createNote(proId, text);
      if (ok && data) {
        setText("")
        router.refresh();
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Hubo un problema al procesar la solicitud");
      console.error(error);
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
      <button
        type="submit"
        className="bg-teal-600 dark:bg-teal-700 rounded-full text-white p-2 my-2 hover:bg-teal-500 dark:hover:bg-teal-500 shadow-md transition-all"
      >
        <SendHorizontal />
      </button>
    </form>
  );
};
