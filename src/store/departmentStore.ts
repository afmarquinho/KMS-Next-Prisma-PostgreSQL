import { CurrentView } from "@/interface";
import { create } from "zustand";

type Department = {
  Dep_id: number;
  Dep_name: string;
};

type States = {
  currentView: CurrentView; //* El tipo de vista actual, puede ser 'list' o 'form'.
  departments: Department[] | null; //*Almacena todos los departamentos que vienen de la bbdd para visulizar en la página principal.
};

type Actions = {
  toggleCurrentView: (view: CurrentView) => void; //* Alterna entre 'list' y 'form'.
  setDepartments: (departments: Department[] | null) => void; //* Llena los departamentos
  updateDeparments: (action: string, department: Department) => void;
};

// Crear el store
export const departmentStore = create<States & Actions>((set, get) => ({
  currentView: "list",
  departments: null,

  toggleCurrentView: (view) => {
    set({
      currentView: view,
    });
  },
  setDepartments: (departments) => {
    set({ departments });
  },
  updateDeparments: (action, department) => {
    if (!department) {
      console.error("Departamento no válido");
      return;
    }

    const { departments } = get();

    if(action === "add"){
      set(() => ({
        departments: !departments ? [department] : [...departments, department],
      }));
    } else if (action === "update") {
  
      if (!departments) return;
      set(() => ({
        departments: departments.map((dep) =>
          dep.Dep_id === department.Dep_id ? department : dep
        ),
      }));
    } else {
      console.error("Acción no reconocida");
    }
  },
}));
