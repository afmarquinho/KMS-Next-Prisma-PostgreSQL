import { CardGrid } from "@/components";
import { ChartGrid } from "@/components/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KMS - Dashboard",
  description: "Mange your processes eficiently",
};

const DashboardPage = () => {
  return (
    <>
      <CardGrid />
      <ChartGrid />
    </>
  );
};
export default DashboardPage;
