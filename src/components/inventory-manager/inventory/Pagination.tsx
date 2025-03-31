import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";



type Props = {
  pageSize: number;
  totalRecords: number;
};
export const Pagination = ({ pageSize, totalRecords }: Props) => {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-slate-900 gpx-4 py-3 sm:px-6 rounded shadow-md">
      <div className="flex flex-1 justify-evenly sm:hidden">
        <button className="relative inline-flex items-center rounded border border-gray-300 dark:border-transparent bg-white dark:bg-teal-600 px-4 py-2 text-sm font-medium  hover:bg-slate-200 dark:hover:bg-teal-500 transition-colors duration-300">
          Anterior
        </button>
        <button className="relative inline-flex items-center rounded border border-gray-300 dark:border-transparent bg-white dark:bg-teal-600 px-4 py-2 text-sm font-medium  hover:bg-slate-200 dark:hover:bg-teal-500 transition-colors duration-300">
          Siguiente
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm ">
            Mostrando <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{pageSize}</span> de{" "}
            <span className="font-medium">{totalRecords}</span> resultados
          </p>
        </div>

        <div>
          <nav
            aria-label="Pagination"
            className="isolate flex gap-1 -space-x-px rounded"
          >
            <button className="relative inline-flex items-center rounded-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: " ring-1 ring-inset ring-gray-300 focus:outline-offset-0" */}
            <button
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded-md hover:bg-slate-800 dark:hover:bg-slate-100 text-slate-800 hover:text-slate-100 dark:hover:text-slate-800 dark:text-slate-100 transition-colors duration-300"
            >
              1
            </button>
            <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0 rounded-md hover:bg-slate-800 dark:hover:bg-slate-100 text-slate-800 hover:text-slate-100 dark:hover:text-slate-800 dark:text-slate-100 transition-colors duration-300">
              2
            </button>
            <button className="relative hidden items-center px-4 py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0 md:inline-flex rounded-md hover:bg-slate-800 dark:hover:bg-slate-100 text-slate-800 hover:text-slate-100 dark:hover:text-slate-800 dark:text-slate-100 transition-colors duration-300">
              3
            </button>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold  ring-1 ring-gray-300 ring-inset focus:outline-offset-0 rounded-md hover:bg-slate-800 dark:hover:bg-slate-100 text-slate-800 hover:text-slate-100 dark:hover:text-slate-800 dark:text-slate-100 transition-colors duration-300">
              ...
            </span>
            <button className="relative hidden items-center px-4 py-2 text-sm font-semibold  ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0 md:inline-flex rounded-md hover:bg-slate-800 dark:hover:bg-slate-100 text-slate-800 hover:text-slate-100 dark:hover:text-slate-800 dark:text-slate-100 transition-colors duration-300">
              8
            </button>
            <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold  ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0 rounded-md hover:bg-slate-800 dark:hover:bg-slate-100 text-slate-800 hover:text-slate-100 dark:hover:text-slate-800 dark:text-slate-100 transition-colors duration-300">
              9
            </button>
            <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold  ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0 rounded-md hover:bg-slate-800 dark:hover:bg-slate-100 text-slate-800 hover:text-slate-100 dark:hover:text-slate-800 dark:text-slate-100 transition-colors duration-300">
              10
            </button>
            <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
