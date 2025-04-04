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
          variant={manager ? "secondary" : "tertiary"}
          className={`${
            !manager ? "hover:bg-gray-300 dark:hover:bg-slate-900" : ""
          }`}
          onClick={handleManager}
        >
          Administrar
        </MainButton>
        <MainButton
         variant={category ? "secondary" : "tertiary"}
         className={`${
           !category ? "hover:bg-gray-300 dark:hover:bg-slate-900" : ""
         }`}
          onClick={handleCategory}
        >
          Categorías
        </MainButton>
        <MainButton
          variant={requests? "secondary" : "tertiary"}
          className={`${
            !requests ? "hover:bg-gray-300 dark:hover:bg-slate-900" : ""
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
