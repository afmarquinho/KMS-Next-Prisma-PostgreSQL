// import { InventoryTable, Purchases } from "@/interfaces";
import { InventoryResponseType, ProcurementType } from "@/interface";
import { create } from "zustand";

type States = {
  processedProcurement: ProcurementType[] | null;

  procurementModalOpen: boolean;
  inventoryModalOpen: boolean;
  referenceModalOpen: boolean;

  productModalOpen: boolean;
  // products: any | null;
  loadingDetails: boolean; // LOading que maneja el spinner de la pagina de detalles de compras

  // Estados para la sección de inventario
  inventoryList: InventoryResponseType[] | null; // Productos en inventario
  isExpanded: boolean; // Estado para expandir los criterios de búsqueda
  totalRecords: number; // Total de registros en la tabla de inventario
  pageSize: number; // Cantidad de registros por página
  hasSearched: boolean; // Estado para saber si se ha realizado una búsqueda
};

type Actions = {
  setProcessedProcurements: (procurement: ProcurementType[]) => void;
  toggleProcurementModal: (isOpen: boolean) => void;
  toggleInventoryModal: (isOpen: boolean) => void;
  toggleReferenceModal: (isOpen: boolean) => void;
  toggleProductModal: () => void;
  // setProducts: (products: any) => void;
  setLoadingDetails: () => void;

  setInventoryList: (products: InventoryResponseType[]) => void;
  setIsExpanded: () => void;
  setTotalRecords: (total: number) => void;
  setPageSize: (size: number) => void;
  setHasSearched: () => void;
};

// Crear el store
export const inventoryStore = create<States & Actions>((set, get) => ({
  // Estados iniciales
  processedProcurement: null,

  procurementModalOpen: true, // Inicia mostrando la tabla de compras en el módulo de inventarios.
  inventoryModalOpen: false,

  newCategoryModal: false,
  // products: null,
  productModalOpen: false,
  referenceModalOpen: false,
  loadingDetails: false,

  inventoryList: null,
  isExpanded: false,
  totalRecords: 0,
  pageSize: 0,
  hasSearched: false,

  // Acciones para actualizar el estado
  setProcessedProcurements: (purchases) => {
    set({ processedProcurement: purchases });
  },
  toggleProcurementModal: (isOpen) => {
    if (isOpen) {
      set({
        procurementModalOpen: isOpen,
        inventoryModalOpen: !isOpen,
        referenceModalOpen: !isOpen,
      });
    }
    return;
  },

  toggleInventoryModal: (isOpen) => {
    if (isOpen) {
      set({
        procurementModalOpen: !isOpen,
        inventoryModalOpen: isOpen,
        referenceModalOpen: !isOpen,
      });
    }
    return;
  },

  toggleReferenceModal: (isOpen) => {
    if (isOpen) {
      set({
        procurementModalOpen: !isOpen,
        inventoryModalOpen: !isOpen,
        referenceModalOpen: isOpen,
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

  setInventoryList: (products) => {
    set({ inventoryList: products });
  },

  setIsExpanded: () => {
    const { isExpanded } = get();
    set({ isExpanded: !isExpanded });
  },
  setTotalRecords: (total) => {
    set({ totalRecords: total });
  },
  setPageSize: (size) => {
    set({ pageSize: size });
  },
  setHasSearched: () => {
    set({ hasSearched: true });
  },
}));
