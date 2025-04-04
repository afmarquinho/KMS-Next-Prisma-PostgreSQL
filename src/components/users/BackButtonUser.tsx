"use client";

import { userStore } from "@/store";
import { Undo2Icon } from "lucide-react";

export const BackButtonUser = () => {
  const { clearUserDetails } = userStore();

  const closeUserView = () => {
    clearUserDetails();
  };

  return (
    <button
      className={`border-white dark:border-slate-300 hover:text-slate-200 w-28 md:w-32 md:px-0 h-10 flex justify-center items-center gap-1 text-xs shadow-md p-2 border-2 transition-all duration-300 rounded bg-white dark:bg-transparent hover:bg-teal-900 hover:dark:bg-slate-900
       `}
      onClick={closeUserView}
    >
      <Undo2Icon className={`w-5`} />
      Atrás
    </button>
  );
};
