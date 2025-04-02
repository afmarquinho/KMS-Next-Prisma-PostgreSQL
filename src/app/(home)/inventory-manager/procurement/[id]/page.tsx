import {
  AddNoteForm,
  CommentsSection,
  IncomeTrackingTable,
  ProcurementSummary,
  SectionTitle,
  Subtitle,
} from "@/components";

import { notFound } from "next/navigation";

// interface PageProps {
//   params: Awaited<{ id: string }>;
// }

const InventoryItemsManagementPage = async ({ params }: { params: { id: string } }) => {
  const idInt = parseInt(params.id, 10);



  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/inventory/processed-procurements/${idInt}`,
    {
      cache: "no-store",
    }
  );

  const { ok, data } = await res.json();

  if (!ok || !data) {
    notFound();
  }

  return (
    <>
      <Subtitle label="Detalle de Compra e Ingreso a Inventario" />

      <SectionTitle label="Detalle de Compra" />

      <ProcurementSummary
        id={data.Proc_id}
        desc={data.Proc_desc}
        date={data.Proc_date}
        dueDate={data.Proc_dueDate}
        paymentMethod={data.Proc_paymentMethod}
        close={data.Proc_close}
        totalAmount={data.Proc_totalAmount}
        Supplier={{
          Supp_name: data.Supplier.Supp_name,
          Supp_city: data.Supplier.Supp_city,
          Supp_contactInfo: data.Supplier.Supp_contactInfo,
          Supp_email: data.Supplier.Supp_email,
          Supp_phoneNumber: data.Supplier.Supp_phoneNumber,
        }}
      />

      <SectionTitle label="Control de Ingreso" />

      <IncomeTrackingTable items={data.Item} />

      <SectionTitle label="Anotaciones" />
      <div className="flex flex-col md:flex-row gap-5 w-full mb-5 ps-1">
        <AddNoteForm procId={data.Proc_id} procClose={data.Proc_close} />

        {/* //*Línea divisoria adaptable */}
        <div className="relative">
          <div className="hidden md:block w-[1px] bg-slate-400 h-full mx-auto" />
          <div className="block md:hidden h-[1px] bg-slate-400 w-full my-2" />
        </div>

        {/* //*Sección de comentarios con scroll */}

        <CommentsSection notes={data.ProcurementNote} />
      </div>
    </>
  );
};
export default InventoryItemsManagementPage;
