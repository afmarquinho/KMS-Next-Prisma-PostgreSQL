"use client";

import { userStore } from "@/store";
import { UsersTable } from "./UserTable";
import { UserForm } from "./UserForm";


export const UserViewManager = () => {
  const { currentView } = userStore();

  const views = {
    list: <UsersTable />,
    form: <UserForm />,
  };

  return views[currentView] || <UsersTable />; // Si el estado es inválido, muestra la tabla por defecto.
};
