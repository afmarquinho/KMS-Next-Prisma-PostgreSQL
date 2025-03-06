// import { InventoryTable, Purchases } from "@/interfaces";
import { ProcurementType } from "@/interface";
import { create } from "zustand";

type States = {
  processedProcurement: ProcurementType[] | null;

  categoryModalOpen: boolean;
  procurementModalOpen: boolean;
  inventoryModalOpen: boolean;
  requestsModalOpen: boolean;
  
  productModalOpen: boolean;
  // products: any | null;
  loadingDetails: boolean; // LOading que maneja el spinner de la pagina de detalles de compras
  
};

type Actions = {
  setProcessedProcurements: (procurement: ProcurementType[]) => void;
  toggleProcurementModal: (isOpen: boolean) => void;
  toggleCategoryModal: (isOpen: boolean) => void;
  toggleInventoryModal: (isOpen: boolean) => void;
  toggleRequestsModal: (isOpen: boolean) => void;
  toggleProductModal: () => void;
  // setProducts: (products: any) => void;
  setLoadingDetails: () => void;
};

// Crear el store
export const useInventoryStore = create<States & Actions>((set, get) => ({
  // Estados iniciales
  processedProcurement: null,

  procurementModalOpen: true, // Inicia mostrando la tabla de compras en el módulo de inventarios.
  categoryModalOpen: false,
  inventoryModalOpen: false,

  newCategoryModal: false,
  // products: null,
  productModalOpen: false,
  requestsModalOpen: false,
  loadingDetails: false,

  // Acciones para actualizar el estado
  setProcessedProcurements: (purchases) => {
    set({ processedProcurement: purchases });
  },
  toggleProcurementModal: (isOpen) => {
    if (isOpen) {
      set({
        procurementModalOpen: isOpen,
        categoryModalOpen: !isOpen,
        inventoryModalOpen: !isOpen,
        requestsModalOpen: !isOpen,
      });
    }
    return;
  },
  toggleCategoryModal: (isOpen) => {
    if (isOpen) {
      set({
        procurementModalOpen: !isOpen,
        categoryModalOpen: isOpen,
        inventoryModalOpen: !isOpen,
        requestsModalOpen: !isOpen,
      });
    }
    return;
  },
  toggleInventoryModal: (isOpen) => {
    if (isOpen) {
      set({
        procurementModalOpen: !isOpen,
        categoryModalOpen: !isOpen,
        inventoryModalOpen: isOpen,
        requestsModalOpen: !isOpen,
      });
    }
    return;
  },

  toggleRequestsModal: (isOpen) => {
    if (isOpen) {
      set({
        procurementModalOpen: !isOpen,
        categoryModalOpen: !isOpen,
        inventoryModalOpen: !isOpen,
        requestsModalOpen: isOpen,
      });
    }
    return;
  },

  toggleProductModal: () => {
    const { productModalOpen } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ productModalOpen: !productModalOpen });
  },

  // setProducts: (products) => {
  //   set({ products });
  // },

  setLoadingDetails: () => {
    const { loadingDetails } = get();
    set({ loadingDetails: !loadingDetails });
  },
}));
