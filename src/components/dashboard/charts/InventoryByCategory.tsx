"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTitle } from "./ChartTitle";

const data = [
  { category: "Tecnología", totalValue: 12500 },
  { category: "Electrónica", totalValue: 9800 },
  { category: "Muebles de Oficina", totalValue: 15000 },
  { category: "Papel y Útiles de Oficina", totalValue: 3200 },
  { category: "Limpieza y Aseo", totalValue: 2750 },
  { category: "Productos Sanitarios", totalValue: 4300 },
  { category: "Herramientas de Construcción", totalValue: 11700 },
  { category: "Materiales de Construcción", totalValue: 18900 },
  { category: "Accesorios de Computación", totalValue: 6400 },
  { category: "Equipos de Seguridad", totalValue: 8600 },
];

export const InventoryByCategory = () => {
  return (
    <div>
      <ChartTitle title="Inventario por cataegoría" />
      <br />
      <div className={`w-full h-52 p-4`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            {/* <YAxis tick={{ fontSize: 12 }} /> */}
            <defs>
              <linearGradient
                id="colorTotalValue"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#8884d8", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#82ca9d", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <XAxis dataKey="category" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip contentStyle={{ fontSize: 12 }} />
            <Area
              type="monotone"
              dataKey="totalValue"
              stroke="#8884d8"
              fill="url(#colorTotalValue)"
            />
            <ReferenceLine x="Materiales de Construcción" stroke="green" label="Mayor existencias"/>
            <ReferenceLine y={12000} stroke="red" label="Aceptable"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
