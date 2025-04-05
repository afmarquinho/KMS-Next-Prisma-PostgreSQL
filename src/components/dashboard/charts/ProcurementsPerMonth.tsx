"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTitle } from "./ChartTitle";

export const purchasesByMonth2024 = [
  { month: "Enero", total: 1500 },
  { month: "Febrero", total: 9800 },
  { month: "Marzo", total: 8000 },
  { month: "Abril", total: 10300 },
  { month: "Mayo", total: 9400 },
  { month: "Junio", total: 8700 },
  { month: "Julio", total: 11200 },
  { month: "Agosto", total: 9900 },
  { month: "Septiembre", total: 7000 },
  { month: "Octubre", total: 11800 },
  { month: "Noviembre", total: 12500 },
  { month: "Diciembre", total: 18100 },
];

export const ProcurementsPerMonth = () => {
  return (
    <>
      <ChartTitle title="Compras por mes 2.024" />
      <div className={`flex-1 flex justify-center items-center`}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={purchasesByMonth2024}
              dataKey="total"
              nameKey="month"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
