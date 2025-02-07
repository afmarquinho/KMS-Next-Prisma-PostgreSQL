"use client";

import { Power, PowerOff, ShieldMinus, User } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { BackButtonUser } from "./BackButtonUser";
import { ActiveUserModal } from "./ActiveUserModal";


//TODO: ACTULIZAR CONTRASEÑA INCLUIDO EL HASHEO
export const UserDetails = () => {
  const { userDetails, toggleActiveUserModal, activeUserModal } = useUserStore();

  if (!userDetails) {
    return (
      <>
        <div className={`flex justify-end`}>
          <BackButtonUser />
        </div>
        <div className={`text-base italic font-semibold`}>
          No has seleccionado un usuario para visualizar
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`flex justify-end`}>
        <BackButtonUser />
      </div>
      <div className={`flex gap-5`}>
        {/* //* Caja de la foto de perfil */}
        <div
          className={`bg-white dark:bg-slate-900 rounded-lg h-52 w-52  flex justify-center items-center p-5 transition-colors shadow-lg`}
        >
          <div
            className={`relative w-full h-full  rounded-full flex items-center justify-center overflow-hidden`}
          >
            <User className={` w-full h-full`} />
          </div>
        </div>
        {/* //* Fin de la foto de perfil*/}

        {/* //* Caja de información del perfil */}
        <div
          className={`bg-white dark:bg-slate-900 rounded-lg flex-1 shadow-lg p-5 border-t-8 ${
            userDetails.User_active ? "border-green-500" : "border-red-500"
          }`}
        >
          <table border={1}>
            <tbody className={`text-left`}>
              <tr>
                <th className={`italic`}>Cédula de Ciudadanía</th>
                <td className={`p-3`}>{userDetails?.User_dni}</td>
              </tr>
              <tr>
                <th className={`italic`}>Nombre</th>
                <td className={`p-3`}>{userDetails?.User_name}</td>
              </tr>
              <tr>
                <th className={`italic`}>Apellido</th>
                <td className={`p-3`}>{userDetails?.User_surname}</td>
              </tr>
              <tr>
                <th className={`italic`}>Teléfono</th>
                <td className={`p-3`}>{userDetails?.User_phoneNumber}</td>
              </tr>
              <tr>
                <th className={`italic`}>Dirección</th>
                <td className={`p-3`}>{userDetails?.User_address}</td>
              </tr>
              <tr>
                <th className={`italic`}>Email</th>
                <td className={`p-3`}>{userDetails?.User_email}</td>
              </tr>
              <tr>
                <th className={`italic`}>Rol</th>
                <td className={`p-3`}>
                  {userDetails?.User_role === "ADMIN"
                    ? "Administrador"
                    : userDetails?.User_role === "MANAGER"
                    ? "Gerente"
                    : "Usuario"}
                </td>
              </tr>
              <tr>
                <th className={`italic`}>Estado</th>
                <td className={`p-3`}>
                  <div className={`flex gap-1 items-center`}>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        userDetails.User_active ? "bg-green-500" : "bg-red-600"
                      }`}
                    ></div>{" "}
                    {userDetails.User_active ? "Activo" : "No Activo"}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className={`flex gap-5`}>
            <button
              className={`flex justify-center items-center gap-2 shadow-md text-white py-1 px-3 rounded mt-5 transition-colors duration-300 ${
                userDetails.User_active
                  ? "bg-rose-600 hover:bg-red-800"
                  : "bg-green-600 hover:bg-green-800"
              }`}
              onClick={toggleActiveUserModal}
            >
              {userDetails.User_active ? <PowerOff /> : <Power />}
              {userDetails.User_active ? "Desactivar" : "Activar"}
            </button>

            <button
              className={`flex justify-center items-center gap-2 shadow-md text-white py-1 px-3 rounded mt-5 bg-blue-600 hover:bg-blue-700 transition-colors duration-300`}
              // onClick={toggleActiveUserModal}
            >
              <ShieldMinus /> Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>
      {
        activeUserModal && <ActiveUserModal/>
      }
    </>
  );
};
