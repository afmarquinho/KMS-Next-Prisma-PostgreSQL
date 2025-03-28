export const Procurement = Array.from({ length: 30 }, (_, i) => ({
  Proc_desc: `Compra de insumos ${i + 1}`,
  Proc_date: new Date(),
  Proc_totalAmount: (Math.random() * 5000 + 100).toFixed(2), // Valores entre 100 y 5000
  Proc_paymentMethod: ["Efectivo", "Tarjeta", "Transferencia"][Math.floor(Math.random() * 3)],
  Proc_dueDate: new Date(new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 30) + 1)), // Entre 1 y 30 días después
  Proc_close: Math.random() < 0.5, // 50% de probabilidad de estar cerrada
  Proc_processed: Math.random() < 0.5, // 50% de probabilidad de estar procesada
  createdBy: Math.floor(Math.random() * 20) + 1, // Entre 1 y 20
  Proc_suppId: Math.floor(Math.random() * 10) + 1, // ID de proveedor entre 1 y 10
}));
