import { InventoryByCategory } from "./InventoryByCategory";
import MostRatedProducts from "./MostRatedProducts";
import { ProcurementsPerMonth, } from "./ProcurementsPerMonth";
import { ProcurementsPerYear } from "./ProcurementsPerYear";

export const ChartGrid = () => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 mt-5`}
    >
      <div
        className={`flex flex-col gap-[2px] pt-2 bg-white dark:bg-slate-900 rounded shadow-md max-h-80 col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4`}
      >
        <InventoryByCategory />
      </div>
      <div
        className={`grid grid-cols-1 gap-[2px] overflow-y-auto pt-2 bg-white dark:bg-slate-900 rounded shadow-md max-h-80`}
      >
        <MostRatedProducts />
      </div>

      <div className={`bg-white dark:bg-slate-900 rounded shadow-md w-full h-80 overflow-hidden flex flex-col`}>
        <ProcurementsPerMonth/>
      </div>

      <div className={`bg-white dark:bg-slate-900 rounded shadow-md w-full h-`}>
        <ProcurementsPerYear/>
      </div>




    </div>
  );
};
