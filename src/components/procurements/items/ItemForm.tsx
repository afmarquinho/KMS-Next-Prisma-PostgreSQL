"use client";

import { itemStore } from "@/store/ItemStore";
import { CalculatorIcon, RefreshCwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useItem, useProducts } from "@/hooks";
import { productStore } from "@/store/productStore";
import { LoadingSpinner } from "@/components/UI";
import { Button } from "@/components/UI/Button";
import { procurementStore } from "@/store";
import { decimalToNumber } from "@/utils";

type SelectedProductType = {
  Item_prodId: number;
  Item_procId: number;
  Item_unitCost: number;
  Item_qtyOrdered: number;
  Item_totalAmount: number;
};

export const ItemForm = () => {
  const { item, toggleItemModal, clearItem, setItems } = itemStore();
  const { procurementDetails, setProcurementDetails } = procurementStore();
  const { createItem, updateItem } = useItem();
  const [loading, setLoading] = useState<boolean>(false);
  const { getProductList } = useProducts();
  const { setProductList, productList } = productStore();
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [unitCost, setUnitCost] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedProducts, setSelectedProducts] = useState<
    SelectedProductType[]
  >([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleCancel = () => {
    clearItem();
    toggleItemModal();
    setSelectedProduct(null);
    setSelectedProducts([]);
  };

  const handleCalcProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Validar los campos
    if (!selectedProduct || unitCost <= 0 || quantity <= 0) {
      toast.error("Todos los campos son obligatorios y deben ser mayores a 0.");
      return;
    }

    // Buscar el producto seleccionado en el array.
    if (!productList) {
      return toast.error("No se ha cargado la lista de productos.");
    }

    const product = productList.find((p) => p.Prod_name === selectedProduct);

    if (!product) {
      toast.error("Producto no encontrado.");
      return;
    }

    // Crear el nuevo producto en el array.
    if (!procurementDetails) {
      return toast.error("No se ha cargado la lista de productos.");
    }
    const newProduct: SelectedProductType = {
      Item_prodId: product.Prod_id,
      Item_procId: procurementDetails?.Proc_id,
      Item_unitCost: unitCost,
      Item_qtyOrdered: quantity,
      Item_totalAmount: unitCost * quantity,
    };

    if (editIndex !== null) {
      // Editar producto existente en el array.
      const updatedProducts = [...selectedProducts];
      updatedProducts[editIndex] = newProduct;
      setSelectedProducts(updatedProducts);
      setEditIndex(null);
    } else {
      // Verificar si el producto ya está en la lista.
      const existingProduct = selectedProducts.find(
        (p) => p.Item_prodId === product.Prod_id
      );
      if (existingProduct) {
        toast.error(
          "El producto ya fue agregado. Para cambiar la cantidad o el valor unitario, edítelo."
        );
        setSelectedProduct(null);
        setUnitCost(0);
        setQuantity(0);
        setEditIndex(null);
        return;
      }
      // Si se está editando un producto agregado en la BBDD ya no se puede adicionar un prodcutos al array, solo se puede editar 1 elemento.
      if (item) {
        toast.error(
          "No puedes adicionar mas productos ya que estas tratando de editar otro."
        );
        setSelectedProduct(null);
        setUnitCost(0);
        setQuantity(0);
        setEditIndex(null);
        return;
      }
      // Agregar nuevo producto al array antes de enviar a la bbdd.
      setSelectedProducts([...selectedProducts, newProduct]);
    }

    setSelectedProduct(null);
    setUnitCost(0);
    setQuantity(0);
    setEditIndex(null);
  };

  const handleProductList = async () => {
    setLoadingProducts(true);
    try {
      const { ok, data, message } = await getProductList();
      if (ok && data) {
        setProductList(data);
      } else {
        toast.error(message);
      }
    } catch {
      toast.error("Error interno.");
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleEditProduct = (index: number) => {
    const productToEdit = selectedProducts[index];

    if (!productList) {
      return toast.error("No se ha cargado la lista de productos.");
    }

    setSelectedProduct(
      productList.find((p) => p.Prod_id === productToEdit.Item_prodId)
        ?.Prod_name || null
    );
    setUnitCost(productToEdit.Item_unitCost); //para que se llene el formulario
    setQuantity(productToEdit.Item_qtyOrdered); // Para llenar el campo en el formulario
    setEditIndex(index);
  };

  const handleDeleteProduct = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const handleItem = async () => {
    if (!procurementDetails) {
      return toast.error("Debes cargar una compra para agregar productos.");
    }
    if (!selectedProducts || selectedProducts.length === 0) {
      return toast.error("No se han seleccionado productos.");
    }

    setLoading(true);
    if (!item) {
      //* Si Item es Nulo, se crea el Item
      try {
        const { ok, data, message } = await createItem(
          procurementDetails?.Proc_id,
          selectedProducts
        );
        if (ok && data) {
          toast.success("Productos agregados a la orden.");

          const { Item, ...procurement } = data;
          setProcurementDetails(procurement);
          setItems(Item);
          toggleItemModal();
          setSelectedProduct(null);
          setSelectedProducts([]);
          clearItem();
        } else {
          toast.error(message);
        }
      } catch (error) {
        toast.error("Hubo un problema al procesar la solicitud");
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      // ** Si el ítem no es nulo, se edita el item exitente en la bbdd

         try {
        const { ok, data, message } = await updateItem(
          item.Item_procId,
          selectedProducts[0],
          item.Item_id
        );
        if (ok && data) {
          toast.success(message);
          const { Item, ...procurement } = data;
          setProcurementDetails(procurement);
          setItems(Item);
          toggleItemModal();
          setSelectedProduct(null);
          setSelectedProducts([]);
          clearItem();
        } else {
          toast.error(message);
        }
      } catch (error) {
        toast.error("Hubo un problema al procesar la solicitud");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (item) {
      setSelectedProducts([
        {
          Item_prodId: item.Item_prodId,
          Item_procId: item.Item_procId,
          Item_unitCost: decimalToNumber(item.Item_unitCost),
          Item_qtyOrdered: item.Item_qtyOrdered,
          Item_totalAmount: decimalToNumber(item.Item_totalAmount),
        },
      ]);
    }
  }, [item]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 z-20 flex justify-center items-center backdrop-blur-[1px] !m-0">
      <div className="bg-white dark:bg-slate-800 p-5 rounded w-11/12 max-w-[800px] mx-auto max-h-[38rem]">
        <h2 className="text-base font-semibold text-center bg-indigo-900 text-white py-2">
          {item ? "Editar Producto la órden" : "Agregar Producto a la Orden"}
        </h2>

        <div className="flex flex-row-reverse justify-between items-center my-5">
          <Button variant="danger" showIcon={true} onClick={handleCancel}>
            Cancelar
          </Button>

          <Button
            variant="info"
            showIcon={loadingProducts ? false : !productList}
            className="w-36"
            onClick={handleProductList}
          >
            {loadingProducts ? (
              <LoadingSpinner />
            ) : productList ? (
              <>
                <RefreshCwIcon />
                Recargar
              </>
            ) : (
              "Ver Productos"
            )}
          </Button>
        </div>

        {productList && productList.length > 0 && (
          <div className={`flex flex-col md:flex-row gap-2`}>
            <div className={`flex flex-col justify-between gap-5`}>
              <div className={`flex-1 flex flex-col gap-2`}>
                <input
                  type="search"
                  list="products"
                  placeholder="Buscar producto..."
                  value={selectedProduct || ""}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <datalist id="products">
                  {productList.map((p) => (
                    <option key={p.Prod_id} value={p.Prod_name} />
                  ))}
                </datalist>

                <div className={`flex gap-1`}>
                  <label className={`flex flex-col w-1/2 md:w-1/3`}>
                    Cantidad
                    <input
                      type="number"
                      placeholder="Cantidad"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="flex-1 p-2 border rounded"
                    />
                  </label>

                  <label className={`flex flex-col flex-1`}>
                    Costo Unitario
                    <input
                      type="number"
                      placeholder="Costo Unitario"
                      value={unitCost}
                      onChange={(e) => setUnitCost(Number(e.target.value))}
                      className="flex-1 p-2 border rounded"
                    />
                  </label>
                </div>

                {item && selectedProducts.length > 1 ? (
                  <p className={`w-full md:w-60 italic font-medium`}>
                    Solo puedes editar 1 item a la vez.{" "}
                    <span className={`text-red-700 bg-red-300 rounded-lg px-2`}>
                      Elimina
                    </span>{" "}
                    el item que has agregado.
                  </p>
                ) : (
                  <Button
                    type="button"
                    variant="info"
                    showIcon={false}
                    onClick={handleCalcProduct}
                    className={`md:w-full`}
                  >
                    <CalculatorIcon className={`w-5 h-5`} />
                    Calcular
                  </Button>
                )}
              </div>
              {selectedProducts.length > 0 && (
                <Button
                  variant="primary"
                  showIcon={loading ? false : true}
                  onClick={handleItem}
                  className={`w-60 md:w-full`}
                >
                  {loading ? <LoadingSpinner /> : "Cargar Productos a la Órden"}
                </Button>
              )}
            </div>
            {/* Línea divisoaria */}
            <div
              className={`bg-gray-300 w-full h-[1px] md:w-[1px] md:h-40 md:my-auto `}
            />

            <div className="flex-1 overflow-y-auto max-h-[20rem]">
              {/* Mostrar la lista de productos seleccionados */}
              {selectedProducts.length > 0 && productList && (
                <ul className={`space-y-2`}>
                  {selectedProducts.map((product, index) => (
                    <li
                      key={index}
                      className="border p-2 rounded bg-slate-100 dark:bg-slate-950"
                    >
                      <p>
                        Producto:{" "}
                        {
                          productList.find(
                            (p) => p.Prod_id === product.Item_prodId
                          )?.Prod_name
                        }
                      </p>
                      <p>Cantidad: {product.Item_qtyOrdered}</p>
                      <p>Costo Unitario: ${product.Item_unitCost}</p>
                      <p className={`font-medium`}>
                        Total: ${product.Item_totalAmount}
                      </p>
                      <div className={`flex gap-10`}>
                        <button
                          type="button"
                          className="font-medium text-blue-700 bg-blue-200 rounded-lg px-2"
                          onClick={() => handleEditProduct(index)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="font-medium text-red-700 bg-red-300 rounded-lg px-2"
                          onClick={() => handleDeleteProduct(index)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
