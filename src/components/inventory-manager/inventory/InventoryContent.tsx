"use client";

import { LoadingSpinner, MainButton, Subtitle } from "@/components/UI";
import { useInventory } from "@/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import { ChevronRightIcon, SearchIcon } from "lucide-react";
import {
  GetCategoryListButton,
  GetSupplierListButton,
} from "@/components/procurements";
import { useCategoryStore, useInventoryStore, useSupplierStore } from "@/store";
import { Pagination } from "./Pagination";
import { InventoryListTable } from "./InventoryListTable";

export const InventoryContent = () => {
  const { fetchProducts } = useInventory();
  const { categories } = useCategoryStore();
  const { supplierList } = useSupplierStore();
  const {
    inventoryList,
    setInventoryList,
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
    stock: "", // "0" | "1" | ""
    batch: "",
    margin_min: "",
    margin_max: "",
    unit_cost_min: "",
    unit_cost_max: "",
    category: "",
    supplier: "",
    createdAt_min: "",
    createdAt_max: "",
    ref: "",
    name: "",
    procurementEnabled: "", // "0" | "1" | ""
    saleEnabled: "", // "0" | "1" | ""
    page: "1",
    page_size: "20", // Valores: 20, 50, 100
  });

  // Manejar cambios en los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Construir URL dinámica con los filtros
  const getInventory = async () => {
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
        console.log(data)
        setInventoryList(data);
        setTotalRecords(total);
        setPageSize(pageSize);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error desconocido:", error);
      toast.error("Error desconocido");
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
                  name="stock"
                  value={filters.stock}
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
                  name="procurementEnabled"
                  value={filters.procurementEnabled}
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
                  name="saleEnabled"
                  value={filters.saleEnabled}
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
                  name="batch"
                  value={filters.batch}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                />
              </label>

              {/* Margen */}
              <label className="flex flex-col">
                Margen (mín):
                <input
                  type="number"
                  name="margin_min"
                  value={filters.margin_min}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                />
              </label>

              <label className="flex flex-col">
                Margen (máx):
                <input
                  type="number"
                  name="margin_max"
                  value={filters.margin_max}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                />
              </label>

              {/* Costo Unitario */}
              <label className="flex flex-col">
                Costo Unitario (mín):
                <input
                  type="number"
                  name="unit_cost_min"
                  value={filters.unit_cost_min}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                />
              </label>

              <label className="flex flex-col">
                Costo Unitario (máx):
                <input
                  type="number"
                  name="unit_cost_max"
                  value={filters.unit_cost_max}
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
                    name="category"
                    value={filters.category}
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
                    name="supplier"
                    value={filters.supplier}
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
                  name="createdAt_min"
                  value={filters.createdAt_min}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                />
              </label>

              <label className="flex flex-col">
                Fecha de ingreso (hasta):
                <input
                  type="date"
                  name="createdAt_max"
                  value={filters.createdAt_max}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                />
              </label>

              {/* Código */}
              <label className="flex flex-col">
                Código o referencia:
                <input
                  type="text"
                  name="ref"
                  value={filters.ref}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                />
              </label>

              {/* Nombre del producto */}
              <label className="flex flex-col">
                Nombre del producto:
                <input
                  type="text"
                  name="name"
                  value={filters.name}
                  onChange={handleChange}
                  className="p-2 border rounded bg-transparent dark:bg-slate-700 transition-colors duration-300 focus:ring-2 focus:ring-teal-600 outline-none"
                />
              </label>

              {/* Paginación */}
              <label className="flex flex-col">
                Productos por página:
                <select
                  name="page_size"
                  value={filters.page_size}
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
          <MainButton onClick={getInventory} variant="secondary">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <SearchIcon className={`w-5 h-5`} />
                Ver Inventario
              </>
            )}
          </MainButton>
        </div>
      </div>

      {/* Lógica de renderizado basada en el estado */}
      <div className="mt-5 text-center">
        {!hasSearched && (
          <p className="text-slate-700 dark:text-slate-300 italic font-medium my-5">
            Realiza una consulta para ver el inventario.
          </p>
        )}
        {hasSearched && inventoryList?.length === 0 && (
          <p className="text-slate-700 dark:text-slate-300 italic font-medium my-5">
            No hay inventario disponible.
          </p>
        )}
        {inventoryList && inventoryList.length > 0 && (
          <InventoryListTable products={inventoryList} />
        )}

        {inventoryList && inventoryList.length > 0 && (
          <Pagination pageSize={pageSize} totalRecords={totalRecords} />
        )}
      </div>
    </>
  );
};
