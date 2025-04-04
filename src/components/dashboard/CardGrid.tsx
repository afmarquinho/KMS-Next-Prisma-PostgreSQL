import {  
  TruckIcon,
  User2Icon,
  WarehouseIcon,
  HandCoinsIcon,
  BaggageClaimIcon,
} from "lucide-react";
import { SummaryCard } from "./SummaryCard";

export const CardGrid = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/figures`
  );

  const { ok, data, message } = await res.json();
  if (!ok || !data) {
    // return <p>Error al cargar los datos</p>;
    return <p>{message}</p>;
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3`}>
      <SummaryCard label="Clientes" data={data.totalClients} icon={User2Icon} />
      <SummaryCard
        label="Solicitudes de compras pendientes"
        data={data.totalProcurementRequests}
        icon={BaggageClaimIcon}
      />
      <SummaryCard
        label="Proveedores"
        data={data.totalSuppliers}
        icon={TruckIcon}
      />
      <SummaryCard
        label="Total Compras - en miles"
        data={data.totalProcessedProcurements}
        icon={HandCoinsIcon}
        money={true}
      />
      <SummaryCard
        label="Inventario - en miles"
        data={data.totalInventory}
        icon={WarehouseIcon}
        money={true}
      />
    </div>
  );
};
