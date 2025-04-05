"use client";

import { ChartTitle } from "./ChartTitle";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const purchasesByYear = [
  { year: 2023, total: 115000 },
  { year: 2024, total: 132700 },
  { year: 2025, total: 51000 },
];

export const ProcurementsPerYear = () => {
  return (
    <>
      <ChartTitle title="Compras por año" />
      <div className={`flex-1 flex justify-center items-center p-2`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={purchasesByYear}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
