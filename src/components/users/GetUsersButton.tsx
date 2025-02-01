"use client";

import axios from "axios";
import { RefreshCcw, UsersRound } from "lucide-react";
import { useState } from "react";
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { useUserStore } from "@/store";

export const GetUsersButton = () => {
  const { users, setUsers } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetUsers = async () => {
    setLoading(true);

    try {
      const response = await axios.get("/api/users");
      const { ok, data } = response.data;

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
    className={`bg-white backdrop:w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-xs shadow-md p-2 border-2 transition-all duration-300 rounded dark:border-slate-300 border-white dark:bg-blue-800 hover:bg-gray-300 hover:dark:bg-slate-900 dark:bg-transparent`}
      onClick={handleGetUsers}
      disabled={loading}
    >
    {loading ? (
          <LoadingSpinner/>
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