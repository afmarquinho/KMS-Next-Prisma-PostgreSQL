import { Category } from "@prisma/client";
import { create } from "zustand";

type States = {
  categories: Category[] | null;
  category: Category | null;
  newCategoryModalOpen: boolean;
  deleteCategoryModalOpen: {
    isOpen: boolean;
    categoryId: number | null;
  };
};

type UpdateAction = "add" | "update" | "delete";

type Actions = {
  setCategories: (categories: Category[]) => void;
  setCategory: (category: Category) => void;
  clearCategory: () => void;
  toggleNewCategoryModal: () => void;
  updateCategories: (action: UpdateAction, category: Category) => void;
  setDeleteCategoryModal: (modalState: {
    isOpen: boolean;
    categoryId: number | null;
  }) => void;
};

// Crear el store
export const useCategoryStore = create<States & Actions>((set, get) => ({
  categories: null,
  category: null,
  newCategoryModalOpen: false,
  deleteCategoryModalOpen: {
    isOpen: false,
    categoryId: null,
  },

  setCategories: (categories) => {
    set({ categories });
  },
  setCategory: (category) => {
    set({ category });
  },
  clearCategory: () => {
    set({ category: null });
  },

  updateCategories: (action, category) => {
    if (!category) {
      console.error("Categoría no válida.");
      return;
    }

    const { categories } = get();

    if (action === "add") {
      set(() => ({
        categories: !categories ? [category] : [...categories, category],
      }));
    } else if (action === "update") {
      if (typeof category.Cat_id !== "number") {
        console.error("Id de la categpría inválida.");
        return;
      }
      if (!categories) return;
      set(() => ({
        categories: categories.map((item) =>
          item.Cat_id === category.Cat_id ? category : item
        ),
      }));
    } else if (action === "delete") {
      if (typeof category.Cat_id !== "number") {
        console.error("Id de la categpría inválida.");
        return;
      }
      if (!categories) return;

      const newArray = categories.filter(
        (item) => item.Cat_id !== category.Cat_id
      );
      set({ categories: newArray });
    } else {
      console.error("Acción no reconocida");
    }
  },

  toggleNewCategoryModal: () => {
    const { newCategoryModalOpen } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ newCategoryModalOpen: !newCategoryModalOpen });
  },

  setDeleteCategoryModal: (modalState) => {
    set({ deleteCategoryModalOpen: modalState });
  },
}));
