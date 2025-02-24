import { prisma } from "../lib/db";
import {
  Category,
  Customer,
  Departments,
  Item,
  Procurement,
  Supplier,
  User,
} from "./data";

async function main() {
  try {
    // 1. Eliminar registros en el orden correcto

    // await prisma.inventoryRequests.deleteMany(); // Primero eliminar movimientos de inventario
    // await prisma.stockMovement.deleteMany(); // Primero eliminar movimientos de inventario
    // await prisma.provisionRequest.deleteMany(); // Eliminar solicitudes de provisión
    // await prisma.purchaseNote.deleteMany(); // Eliminar notas de compra
    // await prisma.batchInventory.deleteMany(); // Eliminar lotes de inventario
    // await prisma.product.deleteMany(); // Eliminar productos
    await prisma.item.deleteMany(); // Eliminar ítems de compra
    await prisma.procurement.deleteMany(); // Eliminar compras
    await prisma.category.deleteMany(); // Eliminar categorías
    await prisma.supplier.deleteMany(); // Eliminar proveedores
    await prisma.customer.deleteMany(); // Eliminar clientes
    await prisma.user.deleteMany(); // Eliminar usuarios
    await prisma.departments.deleteMany(); // Eliminar los departamentos

    // // 2. Insertar datos en el orden correcto
    // 2.1 Insertar los usuarios y departamentos
    await prisma.departments.createMany({ data: Departments });
    await prisma.user.createMany({ data: User });

    // 2.2 Insertar los clientes, proveedores y categorías (dependen de User)
    await prisma.customer.createMany({ data: Customer });
    await prisma.supplier.createMany({ data: Supplier });
    await prisma.category.createMany({ data: Category });

    // 2.4 Insertar compras (dependen de proveedores y usuarios)
    await prisma.procurement.createMany({ data: Procurement });

    // 2.5 Insertar los ítems de compra (dependen de compras y productos)
    await prisma.item.createMany({ data: Item });

    // // 2.3 Insertar productos (dependen de ítems de compra)
    // await prisma.product.createMany({ data: Product });

    // // 2.6 Insertar lotes de inventario (dependen de productos)
    // await prisma.batchInventory.createMany({ data: BatchInventory });

    // // 2.7 Insertar las notas de compra (dependen de compras y usuarios)
    // await prisma.purchaseNote.createMany({ data: PurchaseNote });

    // // 2.8 Insertar solicitudes de provisión (dependen de productos y usuarios)
    // await prisma.provisionRequest.createMany({ data: ProvisionRequest });

    // // 2.9 Insertar solicitudes de provisión (dependen de productos y usuarios)
    // await prisma.inventoryRequests.createMany({ data: InventoryRequests });

    // // 2.9 Insertar movimientos de inventario (dependen de lotes de inventario, productos y usuarios)
    // await prisma.stockMovement.createMany({ data: StockMovement });
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
    console.log("Conexion a la bbdd cerrada.");
  }
}

// // Función anónima auto invocada
(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();

// (() => {
//   main()
//     .then(async () => {
//       await prisma.$disconnect();
//     })
//     .catch(async (e) => {
//       console.error(e);
//       await prisma.$disconnect();
//       process.exit(1);
//     });
// })();
