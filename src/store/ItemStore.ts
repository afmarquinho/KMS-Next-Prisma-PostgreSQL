import { ItemDetailsType } from "@/interface";
import { create } from "zustand";

type States = {
  items: ItemDetailsType[] | null; //* Items para mostrar en la pagina purchase details
  item: ItemDetailsType | null; //* Item para editar, o eliminar
  deleteItemModalOpen: boolean; //* Modal para eliminar item
  itemModalOpen: boolean; //* Modal para editar o crear item
};

type Actions = {
  setItems: (items: ItemDetailsType[]) => void; //*llenar el items
  clearItems: () => void; //* limpiar el estado de items
  setItem: (item: ItemDetailsType) => void; //*llenar el item
  clearItem: () => void; //* limpiar el estado de item
  toggleDeleteItemModal: () => void; //* activar o desactivar el modal de eliminar
  toggleItemModal: () => void; //* activiar el formulario para editar o crear
  updateItems: (action: string, item: ItemDetailsType) => void; //* Actualiza (crea o reemplaza por el editado) el array de items.
};

// Crear el store
export const useItemStore = create<States & Actions>((set, get) => ({
  items: null,
  item: null,
  deleteItemModalOpen: false,
  itemModalOpen: false,

  setItems: (items) => {
    set({ items });
  },
  clearItems: () => {
    set({ items: null });
  },

  setItem: (item) => {
    set({ item });
  },
  clearItem: () => {
    set({ item: null });
  },
  toggleDeleteItemModal: () => {
    const { deleteItemModalOpen } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ deleteItemModalOpen: !deleteItemModalOpen });
  },
  toggleItemModal: () => {
    const { itemModalOpen } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ itemModalOpen: !itemModalOpen });
  },

  updateItems: (action, item) => {
    if (!item) {
      console.error("Item no válido");
      return;
    }
    const { items } = get();

    if (action === "add") {
      set(() => ({
        items: !items ? [item] : [...items, item],
      }));
    } else if (action === "update") {
      if (typeof item.Item_id !== "number") {
        console.error("Id del ítem de la compra inválida");
        return;
      }
      if (!items) return;
      set(() => ({
        items: items.map((value) =>
          value.Item_id === item.Item_id ? item : value
        ),
      }));
    } else if (action === "delete") {
      if (typeof item.Item_id !== "number") {
        console.error("Id del ítem de la compra inválida");
        return;
      }
      if (!items) return;
      const newArray = items.filter((value) => value.Item_id !== item.Item_id);
      set({ items: newArray });
    } else {
      console.error("Acción no reconocida");
    }
  },
}));
