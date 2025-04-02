"use client";

import { BackButton } from "@/components/UI";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { InventoryMenuButton } from "./InventoryMenuButton";


export const InvetoryMenu = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/inventory-manager" ? (
        <div className={`flex gap-2 mb-2`}>
          <InventoryMenuButton label="Compras" />
          <InventoryMenuButton label="Inventario" />
          <InventoryMenuButton label="Referencias" />
          
        </div>
      ) : (
        <div className={`flex justify-end gap-2`}>
          <Link
            href="/inventory"
            className={`p-2 w-12 h-full flex justify-center items-center transition-all duration-300 rounded text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-gray-600`}
          >
            <HomeIcon className={`w-full`} />
          </Link>
          <BackButton />
        </div>
      )}
    </>
  );
};