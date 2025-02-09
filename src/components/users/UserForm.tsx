"use client";

import { useUserStore } from "@/store";
import { z } from "zod";
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { userSchema } from "@/validations";
import { useUsers } from "@/hooks";
import { EllipsisIcon } from "lucide-react";
import { toast } from "react-toastify";

type FormValuesType = z.infer<typeof userSchema>;

export const UserForm = () => {
  const { user, clearUser, updateUsers } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const { createUser, updateUser } = useUsers();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesType>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    setLoading(true); // Inicia el estado de carga

    if (user) {
      //? Se edita el usuario existente

      try {
        const {
          ok,
          data: updatedUser,
          message,
        } = await updateUser(data, user.User_id, user.User_active);
        if (ok && updatedUser) {
          updateUsers("update", updatedUser); // Actualiza el usuario en el estado
          toast.success("Usuario actualizado."); // Notificación de éxito
          reset(); //* Resetear el formulario
        } else {
          toast.error(message); // Notificación de error
        }
      } catch (error) {
        toast.error("Hubo un problema al procesar la solicitud");
        console.error(error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
        clearUser(); //* Limpiar cualquier estado
      }
    } else {
      //? Se crea un nuevo usuario
      try {
        const { ok, data: newUser, message } = await createUser(data); //* Renombro la data como newUser para no generar conflicto con data del hookForm
        if (ok && newUser) {
          updateUsers("add", newUser); // Agregar usuario
          toast.success("Usuario creado con éxito"); // Notificación de éxito
          reset(); //* Resetear el formulario
        } else {
          toast.error(message); // Notificación de error
        }
      } catch (error) {
        toast.error("Hubo un problema al procesar la solicitud");
        console.error(error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
        clearUser(); //* Limpiar cualquier estado
      }
    }
  };

  return (
    <>
      <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 rounded max-w-[800px] mx-auto">
        <h2
          className={`text-base font-bold text-center bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800 py-2 uppercase rounded mx-auto`}
        >
          {user ? "Editar Usuario" : "Nuevo Usuario"}
        </h2>
        <form
          action=""
          className={`w-full max-w-[600px] mx-auto py-2 space-y-4`}
          onSubmit={handleSubmit(onSubmit, (errors) =>
            console.log("Errores de validación:", errors)
          )}
        >
          {/* NAME AND SURENAME */}
          <div className={`flex flex-col md:flex-row w-full gap-4`}>
            <label className={`flex flex-col w-full md:w-1/2`}>
              Nombre
              {errors.User_name && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.User_name.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md ${
                  user === null ? "" : "text-gray-500"
                }`}
                {...register("User_name")}
                defaultValue={user ? user.User_name : ""}
                readOnly={user !== null || loading}
                autoFocus={user === null}
              />
            </label>

            <label className={`flex flex-col w-full md:w-1/2`}>
              Apellido
              {errors.User_surname && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.User_surname.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md ${
                  user === null ? "" : "text-gray-500"
                }`}
                {...register("User_surname")}
                defaultValue={user ? user.User_surname : ""}
                readOnly={user !== null || loading}
              />
            </label>
          </div>

          {/* DNI AND ADDRESS */}
          <div className={`flex flex-col md:flex-row w-full gap-4`}>
            <label className={`flex flex-col w-full md:w-1/2`}>
              <span>
                Cédula{" "}
                <span className={`text-red-500 text-xs`}>
                  (Sin puntos ni comas)
                </span>
              </span>
              {errors.User_dni && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.User_dni.message}
                </div>
              )}
              <input
                type="number"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md ${
                  user === null ? "" : "text-gray-500"
                }`}
                {...register("User_dni", { valueAsNumber: true })}
                defaultValue={user ? user.User_dni : ""}
                readOnly={user !== null || loading}
              />
            </label>

            <label className={`flex flex-col w-full md:w-1/2`}>
              Dirección
              {errors.User_address && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.User_address.message}
                </div>
              )}
              <input
                type="text"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
                {...register("User_address")}
                defaultValue={user ? user.User_address : ""}
                autoFocus={user !== null}
                readOnly={loading}
              />
            </label>
          </div>

          {/* PHONENUMBER AND ROLE */}
          <div className={`flex flex-col md:flex-row w-full gap-4`}>
            <label className={`flex flex-col w-full md:w-1/2`}>
              Teléfono
              {errors.User_phoneNumber && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.User_phoneNumber.message}
                </div>
              )}
              <input
                type="tel"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
                {...register("User_phoneNumber")}
                defaultValue={user ? user.User_phoneNumber : ""}
                readOnly={loading}
              />
            </label>

            <label className={`flex flex-col w-full md:w-1/2`}>
              Rol
              {errors.User_role && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.User_role.message}
                </div>
              )}
              <select
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
                {...register("User_role")}
                defaultValue={user ? user.User_role : ""}
              >
                <option value="">-- Seleccione --</option>
                <option value="ADMIN">Administrador</option>
                <option value="MANAGER">Gerente</option>
                <option value="USER">Usuario</option>
              </select>
            </label>
          </div>

          <div className={`flex flex-col md:flex-row w-full gap-4`}>
            <label className={`flex flex-col w-full md:w-1/2`}>
              Departamento/Área
              {errors.User_depId && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.User_depId.message}
                </div>
              )}
              <div className={`flex gap-2`}>
                <button
                  className={`bg-gradient-to-b from-slate-300 to-slate-400 hover:to-slate-400 hover:from-slate-400 text-slate-900 rounded p-1 w-10 h-10 flex items-center justify-center`}
                >
                  <EllipsisIcon />
                </button>

                <input
                  type="number"
                  className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md flex-1`}
                  {...register("User_depId", { valueAsNumber: true })}
                  defaultValue={1}
                  readOnly
                  // readOnly={loading}
                />
              </div>
            </label>
            <label className={`flex flex-col w-full md:w-1/2`}>
              Email
              {errors.User_email && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.User_email.message}
                </div>
              )}
              <input
                type="email"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
                {...register("User_email")}
                defaultValue={user ? user.User_email : ""}
                readOnly={loading}
              />
            </label>
          </div>
          {/* Oculta los campos de contraseña, si la opción es editar */}

          <div
            className={`flex flex-col md:flex-row w-full gap-4 ${
              user ? "hidden" : "block"
            }`}
          >
            <label className={`flex flex-col w-full md:w-1/2`}>
              Contraseña
              {errors.User_password && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.User_password.message}
                </div>
              )}
              <input
                type="password"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
                {...register("User_password")}
                defaultValue={user ? user.User_password : ""}
                readOnly={user !== null}
              />
            </label>

            <label className={`flex flex-col w-full md:w-1/2`}>
              Confirma Contraseña
              {errors.User_passwordConfirm && (
                <div className={`text-xs text-red-600 my-0 font-medium`}>
                  {errors.User_passwordConfirm.message}
                </div>
              )}
              <input
                type="password"
                className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
                {...register("User_passwordConfirm")}
                defaultValue={user ? user.User_password : ""}
                readOnly={user !== null}
              />
            </label>
          </div>

          <div className={`w-full flex justify-center`}>
            <button
              type="submit"
              className={`bg-indigo-900 hover:bg-indigo-700 text-slate-200 font-semibold text-base p-2 focus:outline-none rounded-md cursor-pointer w-full mt-4 max-w-96 transition-colors flex justify-center items-center`}
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : user ? "Editar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
