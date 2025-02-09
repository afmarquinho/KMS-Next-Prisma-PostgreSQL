"use client";

import { RefreshCcw, SlidersHorizontalIcon, UserSearchIcon } from "lucide-react";
import { useState } from "react";
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { useUserStore } from "@/store";
import { useUsers } from "@/hooks";
import { toast } from "react-toastify";

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
        toast.error("Error al obtener los usuarios");
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex gap-5`}>
      <button className={`hover:bg-slate-300 dark:hover:bg-slate-800 p-2 rounded`}>
        <SlidersHorizontalIcon  className={`w-5`} />
      </button>
      <button
        className={`bg-white dark:bg-transparent hover:bg-teal-900 hover:dark:bg-slate-900 border-white dark:border-slate-300 hover:text-slate-200 w-28 md:w-32 md:px-0 h-10 flex justify-center items-center gap-1 text-xs shadow-md p-2 border-2 transition-all duration-300 rounded`}
        onClick={handleGetUsers}
        disabled={loading || users?.length === 0}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {!users ? (
              <UserSearchIcon className={`w-5`} />
            ) : users.length > 1 ? (
              <RefreshCcw className={`w-5`} />
            ) : (
              <UserSearchIcon className={`w-5`} />
            )}
            {!users
              ? "Ver todos"
              : users.length > 1
              ? "Resfrescar"
              : "Ver todos"}
          </>
        )}
      </button>
    </div>
  );
};
