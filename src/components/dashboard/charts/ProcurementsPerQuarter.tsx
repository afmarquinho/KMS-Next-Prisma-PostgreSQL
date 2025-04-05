"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadarChart,
  ResponsiveContainer,
  Radar,
} from "recharts";
import { ChartTitle } from "./ChartTitle";

export const comprasPorTrimestre2024 = [
  { trimestre: "Trim 1", valor: 33300 },
  { trimestre: "Trim 2", valor: 28400 },
  { trimestre: "Trim 3", valor: 20100 },
  { trimestre: "Trim 4", valor: 18400 },
];

export const ProcurementsPerQuarter = () => {
  return (
    <>
      <ChartTitle title="Compras trimeste 2.024" />
      <div className={`flex-1 flex justify-center items-center p-2`}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            outerRadius={90}
            data={comprasPorTrimestre2024}
            width={730}
            height={250}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="trimestre" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar
              name="Mike"
              dataKey="valor"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
