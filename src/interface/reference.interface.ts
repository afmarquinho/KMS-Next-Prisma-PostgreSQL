import { Product } from "@prisma/client";

export type referenceListType = Product & {
  Category: {
    Cat_name: string;
  };
};