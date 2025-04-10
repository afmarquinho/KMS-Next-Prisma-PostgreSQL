 "use client";

 import {
   RefreshCcw,
   SlidersHorizontalIcon,
   UserSearchIcon,
 } from "lucide-react";
 import { useState } from "react";
 import { LoadingSpinner } from "../UI/LoadingSpinner";
 import { userStore } from "@/store";
 import { useUsers } from "@/hooks";
 import { toast } from "react-toastify";
 import { MainButton } from "../UI";

 export const GetUsersButton = () => {
   const { users, setUsers } = userStore();
   const [loading, setLoading] = useState<boolean>(false);
   const { getAllUsers } = useUsers();

   const handleGetUsers = async () => {
     setLoading(true);

     try {

       const { ok, data, message } = await getAllUsers();

       if (ok && data) {
         setUsers(data);
       } else {
         toast.error(message);
       }
     } catch (error) {
       console.error("Error de red:", error);
     } finally {
       setLoading(false);
     }
   };

   return (
     <div className={`flex gap-5`}>
       <button
         className={`hover:bg-slate-300 dark:hover:bg-slate-800 p-2 rounded`}
       >
         <SlidersHorizontalIcon className={`w-5`} />
       </button>
       <MainButton
         variant="tertiary"
         onClick={handleGetUsers}
         disabled={loading || users?.length === 0}
       >
         {loading ? (
           <LoadingSpinner />
         ) : (
           <>
             {!users ? (
               <UserSearchIcon className={`w-5`} />
             ) : users.length > 1 ? (
               <RefreshCcw className={`w-5`} />
             ) : (
               <UserSearchIcon className={`w-5`} />
             )}
             {!users
               ? "Ver Usuarios"
               : users.length > 1
               ? "Resfrescar"
               : "Ver Usuarios"}
           </>
         )}
       </MainButton>
     </div>
   );
 };

