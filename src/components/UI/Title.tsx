"use client";
import { usePathname } from "next/navigation";

export const Title = () => {
  const pathname = usePathname();

  const titles: Record<string, string> = {
    "/dashboard": "Análisis",
    "/procurements": "Módulo de Compras",
    "/inventory": "Módulo de Inventarios",
    "/masters": "Módulo de Terceros: Proveedores - Clientes",
    "/users": "Módulo de Usuarios",
  };

  const title = Object.keys(titles).find((key) => pathname.startsWith(key))
    ? titles[Object.keys(titles).find((key) => pathname.startsWith(key))!]
    : "Página No Encontrada";

  return (
    <>
      <h1
        className={`italic font-black uppercase text-blue-900 dark:text-yellow-500`}
      >
        {title}
      </h1>
    </>
  );
};
