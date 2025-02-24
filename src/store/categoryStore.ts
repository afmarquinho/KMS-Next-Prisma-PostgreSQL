import { Category } from "@prisma/client";
import { create } from "zustand";

type States = {
  categories: Category[] | null;
};

type Actions = {
  setCategories: (categories: Category[]) => void;
};

// Crear el store
export const useCategoryStore = create<States & Actions>((set) => ({
  categories: null,

  setCategories: (categories) => {
    set({ categories });
  },
}));
