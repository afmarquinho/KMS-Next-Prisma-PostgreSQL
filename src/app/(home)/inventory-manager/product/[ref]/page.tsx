import { ProcurementAndSupply, ProductHeader, Subtitle } from "@/components";
import { notFound } from "next/navigation";

const ProductPage = async ({
  params,
}: {
  params: {
    ref: string;
  };
}) => {
  const {ref} = await params
   
  if (!ref) {
    return notFound();
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/inventory/product/details/${ref}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  if (!data.ok || !data.data) {
    notFound();
  }
  // Todo: acutlizar que no esté habilitado para compra de manera global en todas los registros
  
  return (
    <>
      <ProductHeader data={data.data} />
      <Subtitle label="Detalle de abastecimientos"/>
      <ProcurementAndSupply productRef={ref} />
    </>
  );
};
export default ProductPage;
