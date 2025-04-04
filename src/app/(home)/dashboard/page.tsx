
import { CardGrid } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KMS - Dashboard",
  description: "Mange your processes eficiently",
};

const DashboardPage = () => {
  return (
   <CardGrid/>
  );
};
export default DashboardPage;
