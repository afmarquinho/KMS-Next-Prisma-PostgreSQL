"use client";

// import { useCustomerStore, usePurchaseStore, useSupplierStore } from "@/store";
// import { useUserStore } from "@/store/userStore";

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
  //   const { toggleUsersModal } = useUserStore();
  //   const { toggleSupplierModal } = useSupplierStore();
  //   const { toggleCustomerModal } = useCustomerStore();
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
      className={`bg-white backdrop:w-36 md:w-40 md:px-0 h-10 flex justify-center items-center gap-1 text-xs shadow-md p-2 border-2 transition-all duration-300 rounded dark:border-slate-300 border-white dark:bg-blue-800 hover:bg-gray-300 hover:dark:bg-slate-900 dark:bg-transparent`}
      //   onClick={onNew}
      onClick={() => {}}
    >
      {icons[module]}
      {name}
    </button>
  );
};
