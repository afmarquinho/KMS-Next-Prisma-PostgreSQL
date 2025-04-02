"use client";

import { MainButton } from "@/components/UI";
import { useState } from "react";
import { ReferenceManager } from "../reference/ReferenceManager";
import { ProvisionRequest } from "../reference/ProvisionRequest";
import { CategoryContent } from "../reference/CategoryContent";

export const ReferenceContent = () => {
  const [manager, setManager] = useState<boolean>(true);
  const [category, setCategory] = useState<boolean>(false);
  const [requests, setRequests] = useState<boolean>(false);

  const handleManager = () => {
    setManager(true);
    setCategory(false);
    setRequests(false);
  };
  const handleCategory = () => {
    setManager(false);
    setCategory(true);
    setRequests(false);
  };
  const handleRequests = () => {
    setManager(false);
    setCategory(false);
    setRequests(true);
  };

  return (
    <>
      <div className={`flex gap-2`}>
        <MainButton
          variant="secondary"
          className={`${
            !manager
              ? "bg-white text-slate-800 dark:bg-transparent dark:text-slate-200 hover:bg-gray-300 dark:hover:bg-slate-900"
              : "text-white dark:bg-slate-500"
          }`}
          onClick={handleManager}
        >
          Administrar
        </MainButton>
        <MainButton
          variant="secondary"
          className={`${
            !category
              ? "bg-white text-slate-800 dark:bg-transparent dark:text-slate-200 hover:bg-gray-300 dark:hover:bg-slate-900"
              : "text-white dark:bg-slate-500"
          }`}
          onClick={handleCategory}
        >
          Categorías
        </MainButton>
        <MainButton
          variant="secondary"
          className={`${
            !requests
              ? "bg-white text-slate-800 dark:bg-transparent dark:text-slate-200 hover:bg-gray-300 dark:hover:bg-slate-900"
              : "text-white dark:bg-slate-500"
          }`}
          onClick={handleRequests}
        >
          Solicitudes
        </MainButton>
      </div>
      {manager ? (
        <ReferenceManager />
      ) : category ? (
        <CategoryContent />
      ) : requests ? (
        <ProvisionRequest />
      ) : (
        <></>
      )}
    </>
  );
};
