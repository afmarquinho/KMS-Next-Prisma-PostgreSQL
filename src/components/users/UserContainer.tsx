"use client";

import { userStore } from "@/store";
import { NewUserButton } from "./NewUserButton";
import { UserListButton } from "./UserListButton";
import { UserViewManager } from "./UserViewManager";
import { UserDetails } from "./UserDetails";

export const UserContainer = () => {
  const { userDetails } = userStore();

  
  return (
    <>
      {userDetails ? (
        <UserDetails />
      ) : (
        <>
          <div className={`flex gap-2`}>
            <UserListButton />
            <NewUserButton />
          </div>
          <UserViewManager />
        </>
      )}
    </>
  );
};
