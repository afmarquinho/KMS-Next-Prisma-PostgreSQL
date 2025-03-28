import { ProductListType } from "@/interface";
import { create } from "zustand";

type States = {
  productList: ProductListType[] | null; //Lista para mostar los productos para la compra
};

type Actions = {
  setProductList: (productList:ProductListType[]) => void; //Función para obtener los productos
};

// Crear el store
export const useProductStore = create<States & Actions>((set) => ({
  productList: null,

  setProductList: (productList) => {
    set({ productList });
  },
}));
