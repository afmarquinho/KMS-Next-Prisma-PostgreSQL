"use client";

import { RefreshCcw, UsersRound } from "lucide-react";
import { useState } from "react";
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { useUserStore } from "@/store";
import { useUsers } from "@/hooks";

export const GetUsersButton = () => {
  const { users, setUsers } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const { getAllUsers } = useUsers();

  const handleGetUsers = async () => {
    setLoading(true);

    try {
      const res = await getAllUsers();
      // const { ok, data, message } = res;
      const { ok, data } = res;

      if (ok) {
        setUsers(data);
      } else {
        console.error("Error al obtener los usuarios");
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`bg-white hover:bg-indigo-900 dark:bg-transparent hover:dark:bg-slate-900 border-white dark:border-slate-300 hover:text-slate-200 backdrop:w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-xs shadow-md p-2 border-2 transition-all duration-300 rounded`}
      onClick={handleGetUsers}
      disabled={loading}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {users ? (
            <RefreshCcw className={`w-5`} />
          ) : (
            <UsersRound className={`w-5`} />
          )}
          {users ? "Refrescar" : "Mostrar Usuarios"}
        </>
      )}
    </button>
  );
};
