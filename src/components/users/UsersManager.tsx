import { NewUserButton } from "./NewUserButton";
import { UserListButton } from "./UserListButton";
import { UserViewManager } from "./UserViewManager";

export const UsersManager = () => {
  return (
    <>
      <div className={`flex gap-2`}>
        <UserListButton />
        <NewUserButton />
      </div>
      <UserViewManager />
    </>
  );
};
