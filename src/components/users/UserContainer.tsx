"use client";

import { userStore } from "@/store";
import { UserDetails } from "./UserDetails";
import { MainButton } from "../UI";
import { useState } from "react";
import { Grid2x2CheckIcon, UserRoundCogIcon } from "lucide-react";
import { UsersManager } from "./UsersManager";
import { DepartmentsManager } from "./departments/DepartmentsManager";

export const UserContainer = () => {
  const { userDetails } = userStore();
  const [isUsesrActive, setIsUsesrActive] = useState<boolean>(true);

  return (
    <>
      {userDetails ? (
        <UserDetails /> // Renderiza el detalle del usuario seleccionado en la misma pagina en lugar de crear una nueva ruta
      ) : (
        <>
          {/* Botones para usuarios y departamentos */}
          <div className={`flex gap-2`}>
            <MainButton
              className={`${
                isUsesrActive
                  ? "bg-indigo-900 dark:bg-teal-700 text-slate-200"
                  : "bg-white dark:bg-transparent hover:bg-teal-900 h        over:dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:text-slate-200"
              }`}
              variant="primary"
              onClick={() => setIsUsesrActive(true)}
            >
              <UserRoundCogIcon className={`w-5 h-5`} />
              Usuarios
            </MainButton>
            <MainButton
              className={`${
                !isUsesrActive
                  ? "bg-indigo-900 dark:bg-teal-700 text-slate-200"
                  : "bg-white dark:bg-transparent hover:bg-teal-900 hover:dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:text-slate-200"
              }`}
              variant="primary"
              onClick={() => setIsUsesrActive(false)}
            >
              <Grid2x2CheckIcon className={`w-5 h-5`} />
              Departamentos
            </MainButton>
          </div>

          {isUsesrActive ? <UsersManager /> : <DepartmentsManager />}
        </>
      )}
    </>
  );
};
