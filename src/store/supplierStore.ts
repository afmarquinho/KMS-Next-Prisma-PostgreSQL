// import { SupplierList } from "@/interfaces";
import { CurrentViewSupplierPage } from "@/interface";
import { Supplier } from "@prisma/client";
import { create } from "zustand";

type States = {
  suppliers: Supplier[] | null; //*Almacena todos los proveedores que vienen que la bd para visulizar en la página principal.
  supplier: Supplier | null; //* Proveedor para visualizar o llenar el formulario para editar.
  currentView: CurrentViewSupplierPage; //* El tipo de vista actual, puede ser 'list' o 'form'.

  supplierDetails: Supplier | null; //* Estado para visualizar un proveedor en detalle.
  detailManager: boolean; //* Maneja la vista para el supplier details.
  loadingDetails: boolean; //* Muestra un cargando o spinner mienstras se carga la respuesta la api para monstrar el detalle del proveedor.
  isActiveModalOpen: boolean //* Muestra u oculta el modal para activar o desactivar proveedor.
};

type Actions = {
  setSuppliers: (suppliers: Supplier[]) => void; //* Llena los proveedores.
  setSupplier: (supplier: Supplier) => void; //* Llena el proveedor.
  clearSupplier: () => void; //* Vacía el proveedor.
  toggleCurrentView: (view: CurrentViewSupplierPage) => void; //* Alterna entre 'list' y 'form'.

  updateSuppliers: (action: string, supplier: Supplier) => void; //* Actualiza (crea o edita) el array de proveedores.

  setSupplierDetails: (supplierDetails: Supplier) => void; //* Estado para mostrar el proveedor en detalle.
  clearSupplierDetails: () => void; //* Estado para limpiar el detalle del proveedor.

  setDetailManager: (status: boolean) => void; //* Maneja el estado del detailmanager
  setLoadingdetails: (status: boolean) => void; //* Maneja el esstado del loadingDetail.

  toggleActiveModal: ()=> void; //* Maneja el estado del isActivEModal.
};

export const useSupplierStore = create<States & Actions>((set, get) => ({
  suppliers: null,
  supplier: null,
  currentView: "list",
  supplierDetails: null,
  detailManager: false,
  loadingDetails: false,
  isActiveModalOpen: false,

  setSuppliers: (suppliers) => {
    set({ suppliers });
  },

  setSupplier: (supplier) => {
    set({ supplier });
  },

  clearSupplier: () => {
    set({ supplier: null });
  },
  toggleCurrentView: (view) => {
    set({
      currentView: view,
    });
  },
  updateSuppliers: (action, supplier) => {
    if (!supplier) {
      console.error("Proveedor no válido");
      return;
    }

    const { suppliers } = get();

    if (action === "add") {
      set(() => ({
        suppliers: !suppliers ? [supplier] : [...suppliers, supplier],
      }));
    } else if (action === "update") {
      if (typeof supplier.Supplier_id !== "number") {
        console.error("Id del proveedor inválido");
        return;
      }
      if (!suppliers) return;
      set(() => ({
        suppliers: suppliers.map((item) =>
          item.Supplier_id === supplier.Supplier_id ? supplier : item
        ),
      }));
    } else {
      console.error("Acción no reconocida");
    }
  },
  setSupplierDetails: (supplier) => {
    set({supplierDetails: supplier})
  },
  clearSupplierDetails: () => {
    set({ supplierDetails: null });
  },
  setDetailManager: (status) => {
    set({ detailManager: status });
  },
  setLoadingdetails: (status) => {
    set({ loadingDetails: status });
  },
  toggleActiveModal: ()=>{
    const { isActiveModalOpen} = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ isActiveModalOpen: !isActiveModalOpen });
  }
}));
