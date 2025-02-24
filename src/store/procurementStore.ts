import {
  ProcurementDetailsType,
  ProcurementType,
} from "@/interface/procurement.interface";
import { Decimal } from "@prisma/client/runtime/client";
import { create } from "zustand";

type States = {
  procurements: ProcurementType[] | null; //*Almacena todas las compras que vienen que la bd para visulizar en la página principal.
  procurement: ProcurementType | null; //* Compra para visualizar, llenar el formulario para editar.
  currentView: "list" | "form"; //* El tipo de vista actual, puede ser 'list' o 'form'.
  procurementDetails: ProcurementDetailsType | null; //* Estado para visualizar un usuario en detalle.
  detailManager: boolean; //* Maneja la vista para el customer details
  loadingDetails: boolean; //* Muestra un cargando o spinner mienstras se carga la respuesta la api para monstrar el detalle del cliente.
  procurementModalOpen: boolean; //* Activa el modal del formulario para crear y editar una compra.
  processProcurementModalOpen: boolean; //* Activa el modal para cerrar la compra
  procurementId: number | null; //* almacena el id para cerrar la compra
  deleteProcurementModalOpen: boolean; //*Activa el modal para eliminar un compra.
  proId: number | null; //* Toma el id de la compra para eliminar
};

type Actions = {
  setProcurements: (procurements: ProcurementType[]) => void; //* Llena el estado de las compras.
  setProcurement: (procurements: ProcurementType) => void; //* Llena el estado de la compra
  clearProcurement: () => void; //* Vacía la compra.
  toggleCurrentView: (view: "list" | "form") => void; //* Alterna entre 'list' y 'form'.
  setProcurementDetails: (details: ProcurementDetailsType) => void; //* Estado para mostrar la compra en detalle.
  clearProcurementDetails: () => void; //* Estado para limpiar el detalle de la compra.
  setDetailManager: (status: boolean) => void; //* Maneja el estado del detailmanager
  setLoadingdetails: (status: boolean) => void; //* Maneja el esstado del loadingDetail.

  toggleProcurementModal: () => void; //* Maneja el estado que activa el modal del formulario para crear o e ditar.
  updateProcurements: (action: string, procurement: ProcurementType) => void; //* Actualiza (crea o edita) el array de compras.
  updateAmount: (Pro_id: number, newAmount: Decimal) => void; //* Actualiza el monto total del arry de procurements cuando se crea o edita o elimina un nuevo item
  toggleProcessProcurementModal: () => void; //* Maneja estado que activa el modal de cerrar compra.
  setProcurementId: (procurementId: number) => void; //* Llena el estado que almacena el Procurement_id.
  clearProcurementId: () => void; //* Limpia el estado que almacena el Procurement_id.
  toggleDeleteProcurementModal: () => void;
  setProId: (proId: number) => void; //* Maneja el estado del Pro id.
  clearProId: () => void; //* Limpia el Pro id.
};

export const useProcurementStore = create<States & Actions>((set, get) => ({
  procurements: null,
  procurement: null,
  currentView: "list",
  procurementDetails: null,
  detailManager: false,
  loadingDetails: false,
  procurementModalOpen: false,
  processProcurementModalOpen: false,
  procurementId: null,
  deleteProcurementModalOpen: false,
  proId: null,

  setProcurements: (procurements) => {
    set({ procurements: procurements });
  },
  setProcurement: (procurements) => {
    set({ procurement: procurements });
  },
  clearProcurement: () => {
    set({ procurement: null });
  },
  toggleCurrentView: (view) => {
    set({
      currentView: view,
    });
  },
  setProcurementDetails: (details) => {
    set({ procurementDetails: details });
  },
  clearProcurementDetails: () => {
    set({ procurementDetails: null });
  },
  setDetailManager: (status) => {
    set({ detailManager: status });
  },
  setLoadingdetails: (status) => {
    set({ loadingDetails: status });
  },

  updateProcurements: (action, procurement) => {
    if (!procurement) {
      console.error("Compra no válida");
      return;
    }
    const { procurements } = get();

    if (action === "add") {
      set(() => ({
        procurements: !procurements
          ? [procurement]
          : [...procurements, procurement],
      }));
    } else if (action === "update") {
      if (typeof procurement.Pro_id !== "number") {
        console.error("Id del la compra inválida");
        return;
      }

      if (!procurements) return;
      set(() => ({
        procurements: procurements.map((item) =>
          item.Pro_id === procurement.Pro_id ? procurement : item
        ),
      }));
    } else if (action === "delete") {
      if (typeof procurement.Pro_id !== "number") {
        console.error("Id del la compra inválida");
        return;
      }
      if (!procurements) return;

      const newArray = procurements.filter(
        (item) => item.Pro_id !== procurement.Pro_id
      );
      set({ procurements: newArray });
    } else {
      console.error("Acción no reconocida");
    }
  },

  updateAmount: (Pro_id,  newAmount) => {
    const { procurements } = get();
    if (!procurements) return;

    set(() => ({
      procurements: procurements.map((item) =>
        item.Pro_id=== Pro_id ? { ...item, Pro_totalAmount: newAmount } : item
      ),
    }));
  },

  toggleProcurementModal: () => {
    const { procurementModalOpen } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ procurementModalOpen: !procurementModalOpen });
  },

  toggleProcessProcurementModal: () => {
    const { processProcurementModalOpen } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ processProcurementModalOpen: !processProcurementModalOpen });
  },
  setProcurementId: (procurementId) => {
    set({ procurementId });
  },
  clearProcurementId: () => {
    set({ procurementId: null });
  },
  toggleDeleteProcurementModal: () => {
    const { deleteProcurementModalOpen: deleteProcurementModalOpen } = get();
    document.documentElement.classList.toggle("overflow-hidden");
    set({ deleteProcurementModalOpen: !deleteProcurementModalOpen });
  },
  setProId: (proId) => {
    set({ proId });
  },
  clearProId: () => {
    set({ proId: null });
  },
}));
