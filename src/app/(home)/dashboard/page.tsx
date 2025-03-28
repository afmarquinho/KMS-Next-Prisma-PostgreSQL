import { CircleDollarSignIcon, GitPullRequestCreateArrowIcon, HandCoinsIcon, NewspaperIcon, ReceiptIcon, ShoppingBagIcon, User2Icon, WarehouseIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KMS - Dashboard",
  description: "Mange your processes eficiently",
};

const DashboardPage = () => {
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-5`}>
      {/* Tarjeta 1 */}
      <div className={`flex w-[17rem] h-20 bg-orange-500 text-white`}>
        <div
          className={`w-20 h-20 bg-orange-600 flex justify-center items-center`}
        >
          <User2Icon  className={`w-16 h-16 p-1 bg-orange-700`} />
        </div>
        <div className={`flex-1 flex flex-col justify-center p-2`}>
          <p className={`font-medium`}>Usuarios</p>
          <p className={`font-normal text-4xl`}>16</p>
        </div>
      </div>
      {/* Fin Tarjeta 1 */}
      {/* Tarjeta 2 */}
      <div className={`flex w-[17rem] h-20 bg-indigo-500 text-white`}>
        <div
          className={`w-20 h-20 bg-indigo-600 flex justify-center items-center`}
        >
          <HandCoinsIcon  className={`w-16 h-16 p-1 bg-indigo-700`} />
        </div>
        <div className={`flex-1 flex flex-col justify-center p-2`}>
          <p className={`font-medium`}>Ventas</p>
          <p className={`font-normal text-4xl`}>16</p>
        </div>
      </div>
      {/* Fin Tarjeta 2 */}
      {/* Tarjeta 3 */}
      <div className={`flex w-[17rem] h-20 bg-rose-500 text-white`}>
        <div
          className={`w-20 h-20 bg-rose-600 flex justify-center items-center`}
        >
         <ReceiptIcon className={`w-16 h-16 p-1 bg-rose-700`} />
        </div>
        <div className={`flex-1 flex flex-col justify-center p-2`}>
          <p className={`font-medium`}>Facturas</p>
          <p className={`font-normal text-4xl`}>16</p>
        </div>
      </div>
      {/* Fin Tarjeta 3 */}
      {/* Tarjeta 4 */}
      <div className={`flex w-[17rem] h-20 bg-emerald-500 text-white`}>
        <div
          className={`w-20 h-20 bg-emerald-600 flex justify-center items-center`}
        >
          <NewspaperIcon  className={`w-16 h-16 p-1 bg-emerald-700`} />
        </div>
        <div className={`flex-1 flex flex-col justify-center p-2`}>
          <p className={`font-medium`}>Órdenes pendientes</p>
          <p className={`font-normal text-4xl`}>16</p>
        </div>
      </div>
      {/* Fin Tarjeta 4 */}
        {/* Tarjeta 5 */}
        <div className={`flex w-[17rem] h-20 bg-pink-500 text-white`}>
        <div
          className={`w-20 h-20 bg-pink-600 flex justify-center items-center`}
        >
          <GitPullRequestCreateArrowIcon  className={`w-16 h-16 p-1 bg-pink-700`} />
        </div>
        <div className={`flex-1 flex flex-col justify-center p-2`}>
          <p className={`font-medium`}>Solicitudes</p>
          <p className={`font-normal text-4xl`}>16</p>
        </div>
      </div>
      {/* Fin Tarjeta 5 */}
      {/* Tarjeta 6 */}
      <div className={`flex w-[17rem] h-20 bg-amber-500 text-white`}>
        <div
          className={`w-20 h-20 bg-amber-600 flex justify-center items-center`}
        >
          <WarehouseIcon className={`w-16 h-16 p-1 bg-amber-700`} />
        </div>
        <div className={`flex-1 flex flex-col justify-center p-2`}>
          <p className={`font-medium`}>Costo del Inventario (mill)</p>
          <p className={`font-normal text-4xl`}>$ 16</p>
        </div>
      </div>
      {/* Fin Tarjeta 6 */}
      {/* Tarjeta 7 */}
      <div className={`flex w-[17rem] h-20 bg-purple-500 text-white`}>
        <div
          className={`w-20 h-20 bg-purple-600 flex justify-center items-center`}
        >
          <CircleDollarSignIcon className={`w-16 h-16 p-1 bg-purple-700`} />
        </div>
        <div className={`flex-1 flex flex-col justify-center p-2`}>
          <p className={`font-medium`}>Beneficio Bruto (mill)</p>
          <p className={`font-normal text-4xl`}>$ 2</p>
        </div>
      </div>
      {/* Fin Tarjeta 7 */}
      {/* Tarjeta 8 */}
      <div className={`flex w-[17rem] h-20 bg-cyan-500 text-white`}>
        <div
          className={`w-20 h-20 bg-cyan-600 flex justify-center items-center`}
        >
          <ShoppingBagIcon  className={`w-16 h-16 p-1 bg-cyan-700`} />
        </div>
        <div className={`flex-1 flex flex-col justify-center p-2`}>
          <p className={`font-medium`}>Ventas 2.025 (mill)</p>
          <p className={`font-normal text-4xl`}>$ 18</p>
        </div>
      </div>
      {/* Fin Tarjeta 8 */}
    </div>
  );
};
export default DashboardPage;
