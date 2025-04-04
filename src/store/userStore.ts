import { CurrentView } from "@/interface";
import { User } from "@prisma/client";
import { create } from "zustand";

type States = {
  user: User | null; //* Usuario para visualizar o llenar el formulario para editar.
  users: User[] | null; //*Almacena todos los usuarios que vienen que la bd para visulizar en la página principal.
  userDetails: User | null; //* Estado para visualizar un usuario en detalle.
  currentView: CurrentView; //* El tipo de vista actual, puede ser 'list' o 'form'.
  activeUserModal: boolean; //* Modal para activar o desactivar usuario.
};

type Actions = {
  setUser: (user: User) => void; //* Llena el usuario.
  clearUser: () => void; //* Vacía el usuario.
  setUsers: (users: User[] | null) => void; //* Llena los usuarios.
  updateUsers: (action: string, user: User) => void; //* Actualiza (crea o edita) el array de usuarios.
  setUserDetails: (userDetails: User) => void; //* Estado para mostrar el usuario en detalle.
  clearUserDetails: () => void; //* Estado para limpiar el detalle del usuario.

  toggleCurrentView: (view: CurrentView) => void; //* Alterna entre 'list' y 'form'.
  toggleActiveUserModal: () => void; //* Manejador del estado para activar o desactivar al usuario
};

// Crear el store
export const userStore = create<States & Actions>((set, get) => ({
  user: null,
  users: null,
  userDetails: null,
  currentView: "list",
  activeUserModal: false,

  setUsers: (users) => {
    set({ users });
  },
  updateUsers: (action, user) => {
    if (!user) {
      console.error("Usuario no válido");
      return;
    }

    const { users } = get();

    if (action === "add") {
      set(() => ({
        users: !users ? [user] : [...users, user],
      }));
    } else if (action === "update") {
      if (typeof user.User_id !== "number") {
        console.error("Id del usuario inválido");
        return;
      }
      if (!users) return;
      set(() => ({
        users: users.map((item) =>
          item.User_id === user.User_id ? user : item
        ),
      }));
    } else {
      console.error("Acción no reconocida");
    }
  },
  toggleCurrentView: (view) => {
    set({
      currentView: view,
    });
  },
  setUser: (user) => {
    set({ user });
  },

  clearUser: () => {
    set({ user: null });
  },

  setUserDetails: (userDetails) => {
    set({ userDetails });
  },
  clearUserDetails: () => {
    set({ userDetails: null });
  },

  toggleActiveUserModal: () => {
    const { activeUserModal } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ activeUserModal: !activeUserModal });
  },
}));
