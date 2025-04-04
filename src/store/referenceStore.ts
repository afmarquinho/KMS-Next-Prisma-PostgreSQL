import { referenceListType } from '@/interface/reference.interface';
import { create } from 'zustand';

type States = {
  referenceList: referenceListType[];
};

type Actions = {
  setReferenceList: (referenceList: referenceListType[]) => void;
  updateReferenceList: (action: 'add' | 'update', reference: referenceListType) => void;
};

export const referenceStore = create<States & Actions>((set, get) => ({
  referenceList: [],

  setReferenceList: (referenceList) => {
    set({ referenceList });
  },

  updateReferenceList: (action, reference) => {
    if (!reference) {
      console.error("Referencia no válida");
      return;
    }

    const { referenceList } = get();

    if (action === "add") {
      set(() => ({
        referenceList: !referenceList ? [reference] : [...referenceList, reference],
      }));
    } else if (action === "update") {
      if (typeof reference.Prod_id !== "number") {
        console.error("Id de la referencia inválida");
        return;
      }

      if (!referenceList) return;
      set(() => ({
        referenceList: referenceList.map((r) =>
          r.Prod_id === reference.Prod_id ? reference : r
        ),
      }));
    } else {
      console.error("Acción no reconocida");
    }
  },
}));
