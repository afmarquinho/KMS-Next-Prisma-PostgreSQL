import { MenuButton } from "@/components";
import { HandCoinsIcon, TruckIcon } from "lucide-react";


const MastersPage = () => {
  return (
    <div className={`flex gap-5`}>
      <MenuButton href="masters/suppliers" icon={TruckIcon} name="Proveedores" />
      <MenuButton href="masters/customers" icon={HandCoinsIcon} name="Clientes" />
    </div>
  );
};
export default MastersPage;