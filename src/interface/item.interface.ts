import { Item } from "@prisma/client";

export type ItemDetailsType = Item & {
  Category: {
    Cat_name: string;
  };
};
