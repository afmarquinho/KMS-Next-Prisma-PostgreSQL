"use client";

import { LoadingSpinner, Subtitle } from "@/components/UI";
import { useInventory } from "@/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import { ProductsTable } from "./ProductsTable";
import { ChevronRightIcon } from "lucide-react";
import {
  GetCategoryListButton,
  GetSupplierListButton,
} from "@/components/procurements";
import { useCategoryStore, useInventoryStore, useSupplierStore } from "@/store";
import { Pagination } from "./Pagination";

export const InventoryContent = () => {
  const { fetchProducts } = useInventory();
  const { categories } = useCategoryStore();
  const { supplierList } = useSupplierStore();
  const {
    invProducts,
    setInvProducts,
    isExpanded,
    setIsExpanded,
    totalRecords,
    setTotalRecords,
    pageSize,
    setPageSize,
    hasSearched,
    setHasSearched,
  } = useInventoryStore();

  const [loading, setLoading] = useState<boolean>(false);

  // Estados para cada filtro
  const [filters, setFilters] = useState({
    prod_stock: "", // "0" | "1" | ""
    prod_batch: "",
    prod_margin_min: "",
    prod_margin_max: "",
    prod_unit_cost_min: "",
    prod_unit_cost_max: "",
    prod_category: "",
    prod_supplier: "",
    prod_createdAt_min: "",
    prod_createdAt_max: "",
    prod_ref: "",
    prod_name: "",
    prod_procurementEnabled: "", // "0" | "1" | ""
    prod_saleEnabled: "", // "0" | "1" | ""
    prod_page: "1",
    prod_page_size: "20", // Valores: 20, 50, 100
  });

  // Manejar cambios en los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Construir URL dinámica con los filtros
  const getProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const { ok, data, message, total, pageSize } = await fetchProducts(
        params.toString()
      );
      if (ok && data) {
        setInvProducts(data);
        setTotalRecords(total);
        setPageSize(pageSize);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error desconocido:", error);
    } finally {
      setLoading(false);
      setHasSearched();
    }
  };

  return (
    <>
      <Subtitle label="Gestión de Inventario" />
      <div
        className={`p-5 bg-white dark:bg-slate-800 rounded shadow-md transition-all duration-300 transform`}
      >
        <button
          className={`font-medium mt-5 text-blue-900 dark:text-yellow-500 flex gap-2`}
          onClick={() => setIsExpanded()}
        >
          Criterio de Búsqueda
          <span
            className={`transform transition-transform ${
              isExpanded ? "rotate-90" : "rotate-0"
            }`}
          >
            <ChevronRightIcon />
          </span>
        </button>

        {isExpanded && (
          <>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              Filtrar por:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5 w-full max-w-[1200px] mx-auto">
              {/* Estado */}
              <label className="flex flex-col">
                En Stock:
                <select
                  name="prod_stock"
                  value={filters.prod_stock}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                >
                  <option value="">Todos</option>
                  <option value="1">En Stock</option>
                  <option value="0">Agotados</option>
                </select>
              </label>

              {/* Habilitador Compras */}
              <label className="flex flex-col">
                Habiltiados para compras:
                <select
                  name="prod_procurementEnabled"
                  value={filters.prod_procurementEnabled}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                >
                  <option value="">Todos</option>
                  <option value="1">Habilitados</option>
                  <option value="0">Deshabilitados</option>
                </select>
              </label>

              {/* Habilitador Ventas */}
              <label className="flex flex-col">
                Habilitados para ventas:
                <select
                  name="prod_saleEnabled"
                  value={filters.prod_saleEnabled}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                >
                  <option value="">Todos</option>
                  <option value="1">Habilitados</option>
                  <option value="0">Deshabilitados</option>
                </select>
              </label>

              {/* Lote */}
              <label className="flex flex-col">
                Lote:
                <input
                  type="text"
                  name="prod_batch"
                  value={filters.prod_batch}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                />
              </label>

              {/* Margen */}
              <label className="flex flex-col">
                Margen (mín):
                <input
                  type="number"
                  name="prod_margin_min"
                  value={filters.prod_margin_min}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                />
              </label>

              <label className="flex flex-col">
                Margen (máx):
                <input
                  type="number"
                  name="prod_margin_max"
                  value={filters.prod_margin_max}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                />
              </label>

              {/* Costo Unitario */}
              <label className="flex flex-col">
                Costo Unitario (mín):
                <input
                  type="number"
                  name="prod_unit_cost_min"
                  value={filters.prod_unit_cost_min}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                />
              </label>

              <label className="flex flex-col">
                Costo Unitario (máx):
                <input
                  type="number"
                  name="prod_unit_cost_max"
                  value={filters.prod_unit_cost_max}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                />
              </label>

              {/* Categoría */}
              <div>
                <label className="">Categoría:</label>

                <div className={`flex gap-2`}>
                  <GetCategoryListButton />
                  <input
                    type="search"
                    list="categories"
                    name="prod_category"
                    value={filters.prod_category}
                    onChange={handleChange}
                    className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none flex-1"
                  />
                  <datalist id="categories" className={``}>
                    {categories?.map((category) => (
                      <option key={category.Cat_id} value={category.Cat_name} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Proveedor */}
              <div>
                <label className="">Proveedor:</label>
                <div className={`flex gap-2`}>
                  <GetSupplierListButton />
                  <input
                    type="text"
                    list="suppliers"
                    name="prod_supplier"
                    value={filters.prod_supplier}
                    onChange={handleChange}
                    className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none flex-1"
                  />
                  <datalist id="suppliers" className={``}>
                    {supplierList?.map((supp) => (
                      <option key={supp.Supp_name} value={supp.Supp_name} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Edad del producto (rango de fecha) */}
              <label className="flex flex-col">
                Fecha de ingreso (desde):
                <input
                  type="date"
                  name="prod_createdAt_min"
                  value={filters.prod_createdAt_min}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                />
              </label>

              <label className="flex flex-col">
                Fecha de ingreso (hasta):
                <input
                  type="date"
                  name="prod_createdAt_max"
                  value={filters.prod_createdAt_max}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                />
              </label>

              {/* Código */}
              <label className="flex flex-col">
                Código o referencia:
                <input
                  type="text"
                  name="prod_ref"
                  value={filters.prod_ref}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                />
              </label>

              {/* Nombre del producto */}
              <label className="flex flex-col">
                Nombre del producto:
                <input
                  type="text"
                  name="prod_name"
                  value={filters.prod_name}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                />
              </label>

              {/* Paginación */}
              <label className="flex flex-col">
                Productos por página:
                <select
                  name="prod_page_size"
                  value={filters.prod_page_size}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </label>
            </div>
          </>
        )}

        {/* Botón de consulta */}
        <div className={`w-full flex justify-center items-center`}>
          <button
            onClick={getProducts}
            className={`w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-xs shadow-md p-2 border-2 transition-colors duration-300 rounded bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 hover:dark:bg-teal-600 dark:border-slate-300 border-teal-600 text-white`}
          >
            {loading ? <LoadingSpinner /> : "Ver Inventario"}
          </button>
        </div>
      </div>

      {/* Lógica de renderizado basada en el estado */}
      <div className="mt-5 text-center">
        {!hasSearched && (
          <p className="text-slate-700 dark:text-slate-300 italic font-medium my-5">
            Realiza una consulta para ver el inventario.
          </p>
        )}
        {hasSearched && invProducts?.length === 0 && (
          <p className="text-slate-700 dark:text-slate-300 italic font-medium my-5">
            No hay inventario disponible.
          </p>
        )}
        {invProducts && invProducts.length > 0 && (
          <ProductsTable products={invProducts} />
        )}
        {invProducts && invProducts.length > 0 && (
          <Pagination pageSize={pageSize} totalRecords={totalRecords} />
        )}
      </div>
    </>
  );
};
