import { CurrentViewCustomerPage, CustomerDetails } from "@/interface";
import { Customer } from "@prisma/client";

import { create } from "zustand";

type States = {
  customers: Customer[] | null; //*Almacena todos los clientes que vienen que la bd para visulizar en la página principal.
  customer: Customer | null; //* Cliente para visualizar o llenar el formulario para editar.
  currentView: CurrentViewCustomerPage; //* El tipo de vista actual, puede ser 'list' o 'form'.

  customerDetails: CustomerDetails | null; //* Estado para visualizar un usuario en detalle.
  detailManager: boolean; //* Maneja la vista para el customer details
  loadingDetails: boolean; //* Muestra un cargando o spinner mienstras se carga la respuesta la api para monstrar el detalle del cliente.
};

type Actions = {
  setCustomers: (customers: Customer[]) => void; //* Llena los clientes.
  setCustomer: (customer: Customer) => void; //* Llena l cliente.
  clearCustomer: () => void; //* Vacía el cliente.
  updateCustomers: (action: string, customer: Customer) => void; //* Actualiza (crea o edita) el array de clientes.
  toggleCurrentView: (view: CurrentViewCustomerPage) => void; //* Alterna entre 'list' y 'form'.

  setCustomerDetails: (details: CustomerDetails) => void; //* Estado para mostrar el cliente en detalle.
  clearCustomerDetails: () => void; //* Estado para limpiar el detalle del cliente.

  setDetailManager: (status: boolean) => void; //* Maneja el estado del detailmanager
  setLoadingdetails: (status: boolean) => void; //* Maneja el esstado del loadingDetail.
};

export const useCustomerStore = create<States & Actions>((set, get) => ({
  customers: null,
  customer: null,
  currentView: "list",
  customerDetails: null,
  detailManager: false,
  loadingDetails: false,

  setCustomers: (customers) => {
    set({ customers });
  },
  setCustomer: (customer) => {
    set({ customer });
  },

  clearCustomer: () => {
    set({ customer: null });
  },

  toggleCurrentView: (view) => {
    set({
      currentView: view,
    });
  },

  updateCustomers: (action, customer) => {
    if (!customer) {
      console.error("Cliente no válido");
      return;
    }
    const { customers } = get();

    if (action === "add") {
      set(() => ({
        customers: !customers ? [customer] : [...customers, customer],
      }));
    } else if (action === "update") {
      if (typeof customer.Cust_id !== "number") {
        console.error("Id del Cliente inválido");
        return;
      }

      if (!customers) return;
      set(() => ({
        customers: customers.map((item) =>
          item.Cust_id === customer.Cust_id ? customer : item
        ),
      }));
    } else {
      console.error("Acción no reconocida");
    }
  },

  setCustomerDetails: (customer) => {
    set({ customerDetails: customer });
  },
  clearCustomerDetails: () => {
    set({ customerDetails: null });
  },
  setDetailManager: (status) => {
    set({ detailManager: status });
  },
  setLoadingdetails: (status) => {
    set({ loadingDetails: status });
  },
}));
