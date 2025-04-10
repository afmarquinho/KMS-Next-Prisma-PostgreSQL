"use client";

import { userStore } from "@/store";
import { UsersRound } from "lucide-react";
import { MainButton } from "../UI";

export const UserListButton = () => {
  const { toggleCurrentView, currentView, clearUser } = userStore();

  const handleView = () => {
    toggleCurrentView("list");
    clearUser();
  };

  return (
    <>
      <MainButton
        variant="primary"
        className={`${
          currentView === "list"
            ? "bg-indigo-900 dark:bg-teal-700 text-slate-200"
            : "bg-white dark:bg-transparent hover:bg-teal-900 hover:dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:text-slate-200"
        }`}
        onClick={handleView}
      >
        <UsersRound className={`w-5`} />
        Ver Usuarios
      </MainButton>
    </>
  );
};
