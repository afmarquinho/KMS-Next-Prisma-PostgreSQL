import { inventoryStore } from "@/store";
import { ArchiveIcon, PackageOpenIcon, TruckIcon } from "lucide-react";

type Props = {
  label: keyof typeof icons; // Restringe label a las claves de icons
};

const icons = {
  Compras: <PackageOpenIcon size={20} strokeWidth={1.25} className="h-4" />,
  Inventario: <ArchiveIcon size={20} strokeWidth={1.25} className="h-4" />,
  Referencias: <TruckIcon size={20} strokeWidth={1.25} className="h-4" />,
};

export const InventoryMenuButton = ({ label }: Props) => {
  const {
    toggleProcurementModal,
    toggleInventoryModal,
    toggleReferenceModal,
    procurementModalOpen,
    inventoryModalOpen,
    referenceModalOpen
  } = inventoryStore();

  // Configuración de modales y estados
  const modalConfig = {
    Compras: { isOpen: procurementModalOpen, toggle: toggleProcurementModal },
    Inventario: { isOpen: inventoryModalOpen, toggle: toggleInventoryModal },
    Referencias: { isOpen: referenceModalOpen, toggle: toggleReferenceModal },
  };

  // Clases dinámicas basadas en el estado del modal
  const dynamicClasses = modalConfig[label].isOpen
    ? "bg-indigo-900 dark:bg-teal-700 text-slate-200"
    : "hover:bg-gray-300 hover:dark:bg-slate-900 bg-white dark:bg-transparent";

  const handleClick = () => {
    modalConfig[label].toggle(true);
  };

  return (
    <button
      className={`w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-xs shadow-md p-2 border-2 transition-all duration-300 rounded ${dynamicClasses}  dark:border-slate-300  border-white`}
      onClick={handleClick}
    >
      {icons[label]} {label}
    </button>
  );
};
