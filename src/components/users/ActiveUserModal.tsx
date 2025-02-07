"use client";

import { useUserStore } from "@/store/userStore";
import { TriangleAlert, UserRoundX, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { useUsers } from "@/hooks";

export const ActiveUserModal = () => {
  const { userDetails, toggleActiveUserModal, updateUsers, setUserDetails } =
    useUserStore();
  const { activeUser } = useUsers();
  const [loading, setLoading] = useState<boolean>();

  const handleActiveUser = async () => {
    setLoading(true);
    try {
      if (!userDetails) return;
      
      const { ok, data, message } = await activeUser(userDetails);
      if (ok && data) {
        toggleActiveUserModal();
        setUserDetails(data);
        updateUsers("update", data);
        toast.success(
          `¡Usuario ${
            data.User_active ? "Activado" : "Desactivado"
          } con éxito!.`
        );
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("¡No se puedo actualizar el estado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 z-20 flex justify-center items-center backdrop-blur-[1px]`}
    >
      <div className={`w-full max-w-96 bg-white dark:bg-slate-700`}>
        <div className={`relative`}>
          <TriangleAlert
            className={`absolute top-2 left-2 text-yellow-400`}
            strokeWidth={3}
          />
          <button
            className={`absolute top-2 right-2 ${
              userDetails?.User_active
                ? "bg-red-800 hover:bg-red-950"
                : "bg-green-800 hover:bg-green-950"
            }`}
            onClick={toggleActiveUserModal}
          >
            <X className={`  text-yellow-400 cursor-pointer`} strokeWidth={3} />
          </button>
          <h2
            className={`text-center text-white uppercase font-bold py-3 ${
              userDetails?.User_active
                ? "bg-red-600 dark:bg-red-700"
                : "bg-green-600 dark:bg-green-700"
            }`}
          >
            Alerta
          </h2>
        </div>
        <div className={`p-4`}>
          <p>
            ¿Realmente deseas{" "}
            {userDetails?.User_active ? "Desactivar" : "Activar"} a{" "}
            <span className={`font-bold`}>
              {userDetails?.User_name} {userDetails?.User_surname}?
            </span>
          </p>

          <button
            className={`w-32 h-8 flex gap-1 justify-center items-center  rounded text-white transition-all mx-auto mt-5 uppercase font-semibold shadow-md ${
              userDetails?.User_active
                ? "bg-red-600 dark:bg-red-700"
                : "bg-green-600 dark:bg-green-700"
            }`}
            onClick={handleActiveUser}
          >
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <UserRoundX className={`w-5`} />
                {userDetails?.User_active ? "Desactivar" : "Activar"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
