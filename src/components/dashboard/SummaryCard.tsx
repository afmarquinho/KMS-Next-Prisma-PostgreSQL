import { LucideIcon } from "lucide-react";

type Props = {
  label:
    | "Clientes"
    | "Proveedores"
    | "Solicitudes de compras pendientes"
    | "Total Compras - en miles"
    | "Inventario - en miles";
  data: number | string;
  money?: boolean;
  icon: LucideIcon;
};

export const SummaryCard = ({
  label,
  data,
  money = false,
  icon: Icon,
}: Props) => {
  return (
    <div
      className={`flex lgmax-w-[17rem] h-20 text-white ${
        label === "Clientes"
          ? "bg-indigo-500"
          : label === "Proveedores"
          ? "bg-rose-500"
          : label === "Solicitudes de compras pendientes"
          ? "bg-amber-500"
          : label === "Total Compras - en miles"
          ? "bg-emerald-500"
          : label === "Inventario - en miles"
          ? "bg-pink-500"
          : ""
      }`}
    >
      <div
        className={`w-20 h-20 flex justify-center items-center ${
          label === "Clientes"
            ? "bg-indigo-600"
            : label === "Proveedores"
            ? "bg-rose-600"
            : label === "Solicitudes de compras pendientes"
            ? "bg-amber-600"
            : label === "Total Compras - en miles"
            ? "bg-emerald-600"
            : label === "Inventario - en miles"
            ? "bg-pink-600"
            : ""
        }`}
      >
        <Icon className={`w-16 h-16 p-1 `} />
      </div>
      <div className={`flex-1 flex flex-col justify-center p-2 my-1`}>
        <p className={`font-medium`}>{label}</p>
        <p className={`font-normal md:font-bold text-2xl md:text-4xl`}>
          {money && "$"} {data}
        </p>
      </div>
    </div>
  );
};
