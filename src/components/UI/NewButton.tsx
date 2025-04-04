"use client";

// import { customerStore, usePurchaseStore, supplierStore } from "@/store";
// import { userStore } from "@/store/userStore";

import {
  ArchiveRestore,
  BaggageClaim,
  PackagePlus,
  UserRoundPlus,
} from "lucide-react";

type Props = {
  name: string;
  module: "users" | "suppliers" | "customers" | "purchases";
};

const icons = {
  users: <UserRoundPlus className={`w-5`} />,
  suppliers: <PackagePlus className={`w-5`} />,
  customers: <BaggageClaim className={`w-5`} />,
  purchases: <ArchiveRestore className={`w-5`} />,
};

export const NewButton = ({ name, module }: Props) => {
  //   const { toggleUsersModal } = userStore();
  //   const { toggleSupplierModal } = supplierStore();
  //   const { toggleCustomerModal } = customerStore();
  //   const { togglePurchaseModal } = usePurchaseStore();

  //   const onNew = () => {
  //     switch (module) {
  //       case "users":
  //         toggleUsersModal();
  //         break;
  //       case "suppliers":
  //         toggleSupplierModal();
  //         break;
  //       case "customers":
  //         toggleCustomerModal();
  //         break;
  //       case "purchases":
  //         togglePurchaseModal();

  //         break;

  //       default:
  //         break;
  //     }
  //   };

  return (
    <button
      className={`bg-white hover:bg-indigo-900 dark:bg-transparent hover:dark:bg-slate-900 border-white dark:border-slate-300 hover:text-slate-200 w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-xs shadow-md p-2 border-2 transition-all duration-300 rounded`}
      //   onClick={onNew}
      onClick={() => {}}
    >
      {icons[module]}
      {name}
    </button>
  );
};
