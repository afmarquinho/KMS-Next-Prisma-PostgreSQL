"use client";

import {
  TruckIcon,
  User2Icon,
  WarehouseIcon,
  HandCoinsIcon,
  BaggageClaimIcon,
} from "lucide-react";
import { SummaryCard } from "./SummaryCard";
import { useEffect, useState } from "react";

type DashboardData = {
  totalClients: number;
  totalSuppliers: number;
  totalProcurementRequests: number;
  totalProcessedProcurements: string | number; // Se devuelve como string con toFixed o 0
  totalInventory: string | number; // También puede ser string con toFixed o 0
};

type DashboardResponse = {
  ok: boolean;
  data: DashboardData | null;
  message: string;
};

export const CardGrid = () => {
  const [data, setData] = useState<DashboardResponse | null>(null);


  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/figures`
      );
      
      setData(await res.json());
    }
    fetchPosts();
  }, []);

  if (!data || !data.ok || !data.data) {
    // return <p>Error al cargar los datos</p>;
    return <p>No hay datos para mostrar</p>;
  }

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3`}
    >
      <SummaryCard label="Clientes" data={data.data.totalClients} icon={User2Icon} />
      <SummaryCard
        label="Solicitudes de compras pendientes"
        data={data.data.totalProcurementRequests}
        icon={BaggageClaimIcon}
      />
      <SummaryCard
        label="Proveedores"
        data={data.data.totalSuppliers}
        icon={TruckIcon}
      />
      <SummaryCard
        label="Total Compras - en miles"
        data={data.data.totalProcessedProcurements}
        icon={HandCoinsIcon}
        money={true}
      />
      <SummaryCard
        label="Inventario - en miles"
        data={data.data.totalInventory}
        icon={WarehouseIcon}
        money={true}
      />
    </div>
  );
};
