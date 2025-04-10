"use client";

import { userStore } from "@/store";
import { UserRoundPlusIcon } from "lucide-react";
import { MainButton } from "../UI";

export const NewUserButton = () => {
  const { toggleCurrentView, currentView, user } = userStore();

  const handleView = () => {
    toggleCurrentView("form");
  };

  return (
    <MainButton
      variant="primary"
      className={`${
        currentView === "form"
          ? "bg-indigo-900 dark:bg-teal-700 text-slate-200"
          : "bg-white dark:bg-transparent hover:bg-teal-900 hover:dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:text-slate-200"
      }`}
      onClick={handleView}
    >
      <UserRoundPlusIcon className={`w-5`} />
      {user ? "Editar Usuario" : "Nuevo Usuario"}
    </MainButton>
  );
};
