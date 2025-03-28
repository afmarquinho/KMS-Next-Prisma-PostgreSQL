type Props = {
  data: {
    Prod_ref: string;
    Prod_name: string;
    Prod_stock: number;
    Prod_procurementEnabled: boolean;
    Prod_Category: string;
    Prod_unitMeasure: string;
  };
};

export const ProductHeader = ({ data }: Props) => {
  return (
    <table className="bg-white dark:bg-slate-700 rounded-lg shadow-lg w-full max-w-[900px] overflow-hidden mx-auto">
      <tbody className="text-left">
        {/* Encabezado general */}
        <tr className="bg-gray-100 dark:bg-slate-800 font-bold border-b-2 dark:border-gray-500">
          <th className="italic p-3 w-1/3 sm:w-1/4 md:w-[12rem] border-r-2 border-gray-300 dark:border-gray-500">
            Referencia:
          </th>
          <td className="p-3">{data.Prod_ref}</td>
        </tr>
        <tr className="border-b-2 border-gray-300 dark:border-gray-500">
          <th className="italic p-3 w-1/3 sm:w-1/4 md:w-[12rem] border-r-2 border-gray-300 dark:border-gray-500">
            Nombre:
          </th>
          <td className="p-3">{data.Prod_name}</td>
        </tr>
        <tr className="border-b-2 border-gray-300 dark:border-gray-500">
          <th className="italic p-3 w-1/3 sm:w-1/4 md:w-[12rem] border-r-2 border-gray-300 dark:border-gray-500">
            Categoría:
          </th>
          <td className="p-3">{data.Prod_Category}</td>
        </tr>
        <tr className="border-b-2 border-gray-300 dark:border-gray-500">
          <th className="italic p-3 w-1/3 sm:w-1/4 md:w-[12rem] border-r-2 border-gray-300 dark:border-gray-500">
            Stock Disponible:
          </th>
          <td className="p-3">
            {data.Prod_stock > 0 ? (
              data.Prod_stock
            ) : (
              <span
                className={`text-red-700 dark:text-red-200 bg-red-200 dark:bg-red-800 rounded-lg px-2 font-medium`}
              >
                Agotado
              </span>
            )}
          </td>
        </tr>
        <tr className="border-b-2 border-gray-300 dark:border-gray-500">
          <th className="italic p-3 w-1/3 sm:w-1/4 md:w-[12rem] border-r-2 border-gray-300 dark:border-gray-500">
            Unidad de medida:
          </th>
          <td className="p-3">
            {data.Prod_unitMeasure.charAt(0).toUpperCase() +
              data.Prod_unitMeasure.slice(1)}
          </td>
        </tr>
        <tr className="border-b-2 border-gray-300 dark:border-gray-500">
          <th className="italic p-3 w-1/3 sm:w-1/4 md:w-[12rem] border-r-2 border-gray-300 dark:border-gray-500">
            Habilitado para compras
          </th>
          <td className="p-3">
            {data.Prod_procurementEnabled ? (
              <div className={`flex gap-1 items-center justify-start`}>
                <div className={`w-2 h-2 rounded-full bg-green-500`}></div>{" "}
                Habilitado
              </div>
            ) : (
              <div className={`flex gap-1 items-center justify-start`}>
                <div className={`w-2 h-2 rounded-full bg-red-500`}></div>{" "}
                Deshabilitado
              </div>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
