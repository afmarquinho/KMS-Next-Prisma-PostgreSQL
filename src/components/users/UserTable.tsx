"use client";

import { useUserStore } from "@/store/userStore";
import { FilePenLineIcon, SearchIcon } from "lucide-react";

import { User } from "@prisma/client";
// import { useEffect } from "react";
// import { UserModal } from "./UserModal";
import { GetUsersButton } from "./GetUsersButton";

// import { userStore } from "../../utils/userStore";
// import { EditUserModal } from "./EditUserModal";
// import { UserType } from "@/src/types";

export const UsersTable = () => {
  const { users, setUser, setUserDetails, toggleCurrentView } = useUserStore();

  //   const { users, editUserModalOpen, setEditUserModal, setUser, cleanUser } =
  //     userStore();

  const handleEdit = (user: User) => {
    setUser(user);
    toggleCurrentView("form");
  };

  const handleViewUser = (user: User) => {
    setUserDetails(user);
    // router.push(
    //   `/users/user-details/${user.User_name}-${user.User_code}-${user.User_surname}`
    // );
  };

  // useEffect(() => {
  //   clearUser();
  // }, [clearUser]);

  if (!users || users.length === 0) {
    const message = !users
      ? 'No hay Usuarios para visualizar, presiona el botón "Mostrar Usuarios".'
      : "No hay usuarios en la base de datos.";

    return (
      <>
        <GetUsersButton />
        <div className="italic font-medium text-base">{message}</div>
        {/* {userModalOpen && <UserModal />} */}
      </>
    );
  }

  return (
    <>
      <GetUsersButton />
      <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900 rounded">
        <table
          className={`w-full rounded border-collapse text-left overflow-hidden shadow-md`}
        >
          <thead
            className={`bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800`}
          >
            <tr>
              <th className={`py-3 px-2`}>Item</th>
              <th className={`py-3 px-1`}>Apellido</th>
              <th className={`py-3 px-1`}>Nombre</th>
              <th className={`py-3 px-1`}>Rol</th>
              <th className={`py-3 px-1`}>Estado</th>
              <th className={`py-3 px-1`}>Ver</th>
              <th className={`py-3 px-1`}>Editar</th>
            </tr>
          </thead>
          <tbody className={`px-10`}>
            {users.map((user, i) => (
              <tr
                key={user.User_code}
                className={`dark:border-slate-600 hover:bg-gray-300 dark:hover:bg-teal-900 py-5 ${
                  i % 2 === 0 && "bg-slate-100 dark:bg-slate-800"
                }`}
              >
                <td className={`py-2 px-2`}>{i + 1}</td>
                <td className={`py-2 px-1`}>{user.User_surname}</td>
                <td className={`py-2 px-1`}>{user.User_name}</td>
                <td className={`py-2 px-1`}>
                  {user.User_role === "ADMIN"
                    ? "Administrador"
                    : user.User_role === "MANAGER"
                    ? "Gerente"
                    : "Usuario"}
                </td>
                <td className={`py-2 px-1`}>
                  {" "}
                  <div className={`flex gap-1 items-center`}>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        user.User_active ? "bg-green-500" : "bg-red-600"
                      }`}
                    ></div>{" "}
                    {user.User_active ? "Activo" : "No Activo"}
                  </div>
                </td>
                <td className={`py-2 px-1`}>
                  {/* //*Watch button */}
                  <button
                    className="w-8 h-6 p-1 bg-rose-500 hover:bg-red-700 text-white rounded shadow-md transition-colors duration-300 ease-linear  flex justify-center items-center"
                    onClick={() => handleViewUser(user)}
                  >
                    <SearchIcon className={`text-white w-5`} />
                  </button>
                </td>
                <td className={`py-2 px-1`}>
                  {/* //*Edit button */}
                  <button
                    className={`w-8 h-6 p-1 bg-blue-500 hover:bg-blue-700 text-white rounded  shadow-md transition-colors duration-300 ease-linear  flex justify-center items-center ${
                      !user.User_active && "opacity-40 cursor-not-allowed"
                    }`}
                    onClick={() => handleEdit(user)}
                  >
                    <FilePenLineIcon className={`text-white w-5`} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* {userModalOpen && <UserModal />} */}
    </>
  );
};
