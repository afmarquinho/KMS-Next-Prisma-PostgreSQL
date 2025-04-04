"use client";
import {
  ClipboardPenIcon,
  // CircleDollarSign,
  // CircleUserRound,
  // ClipboardPen,
  // NotebookText,
  PanelsTopLeft,
  ShoppingBagIcon,
  UserRoundCogIcon,
  WarehouseIcon,
  // Wrench,
  X,
} from "lucide-react";

import Image from "next/image";
import logo from "../../../public/logo.png";

import { UIStore } from "@/store/UIStore";
import { SidebarLink } from "./SidebarLink";

export const Sidebar = () => {
  const { isSidebarCollapsed, setSidebarCollapsed } = UIStore();

  return (
    <div
      className={`bg-white dark:bg-slate-800 fixed md:relative min-h-full md:min-h-full z-10 transition-all 
    ${isSidebarCollapsed ? "w-0 md:w-14" : "w-56"}
    `}
    >
      <div
        className={`flex items-center justify-between p-3 border-b-2 border-slate-200 dark:border-slate-700`}
      >
        {/* DIV TO WRAP LOGO AND NAME */}
        <div className={`flex justify-start items-center gap-1`}>
          <div
            className={`p-1 ${
              isSidebarCollapsed ? "hidden md:block" : "block"
            }`}
          >
            <div className={`w-6 h-7 relative`}>
              <Image
                src={logo}
                alt="Kassya"
                width={100}
                height={100}
                className={``}
              />
            </div>
          </div>
          <p
            className={`font-bold text-2xl text-red-500 ${
              isSidebarCollapsed ? "hidden" : "block"
            }`}
          >
            Kassya
          </p>
        </div>

        <button
          onClick={setSidebarCollapsed}
          className={`hover:bg-slate-200 dark:hover:bg-slate-800 p-2 rounded-full  ${
            isSidebarCollapsed ? "hidden" : "block md:hidden"
          }`}
        >
          <X className={`text-red-500 dark:text-yellow-500`} />
        </button>
      </div>

      <SidebarLink
        path="Panel"
        href="/dashboard"
        icon={PanelsTopLeft}
        subtitle="Resumen general"
      />
      <SidebarLink
        path="Órdenes de Compra"
        href="/procurements"
        icon={ShoppingBagIcon}
        subtitle="Administrar órdenes"
      />
      <SidebarLink
        path="Inventarios"
        href="/inventory-manager"
        icon={WarehouseIcon}
        subtitle="Gestión de stock"
      />
      <SidebarLink
        path="Terceros"
        href="/masters"
        icon={ClipboardPenIcon}
        subtitle="Proveedores y clientes"
      />
      <SidebarLink
        path="Gestor de Usuarios"
        href="/users"
        icon={UserRoundCogIcon}
        subtitle="Administrar usuarios"
      />
    </div>
  );
};
