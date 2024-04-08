import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import axios, { AxiosResponse } from "axios";
import { LocationForm } from "./location-form";

type ILocation = {
  id: string;
  name: string;
  address: string;
  phone: string;
};

export const LocationRow = ({ value }: { value: ILocation }) => {
  const token = sessionStorage.getItem("token");
  const authAxios = axios.create({
    baseURL: "https://control-nest-backend-production.up.railway.app",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [isPending, startTransistion] = useTransition();

  const onSubmit = () => {
    startTransistion(() => {
      authAxios
        .delete(`/api/location/${value.id}`)
        .then((response: AxiosResponse) => {
          console.log("Delete successful:", response.data);

          if (response.data?.error) {
            console.error("Delete error:", response.data?.error);
          }
          if (response.data?.success) {
            console.log("Delete Success:", response.data?.success);
            const timer = setTimeout(() => {
              setDeleteOpen(false);
            }, 1000);
            return () => clearTimeout(timer);
          }
        })
        .catch((error) => {
          console.error("Delete error:", error.response?.data || error.message);
        });
    });
  };
  return (
    <tr key={value.id}>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          {value.name}
        </td>
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        {value.address}
      </td>
      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 3L4.5 8.5L2 6"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h2 className="text-sm font-normal">{value.phone}</h2>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        <div className="flex items-center gap-x-2">
          <img
            className="object-cover w-8 h-8 rounded-full"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt=""
          />
          <div>
            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
              Arthur Melo
            </h2>
            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
              authurmelo@example.com
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        Jan 6, 2022
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-2">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <button className="text-emerald-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                Edit
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[512px] rounded-md">
              <DialogHeader>
                <DialogTitle>Update Device</DialogTitle>
                <DialogDescription>
                  Update Devices of your profile here. Click update when
                  you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              {/* Note Form to ADD */}
              <LocationForm
                setOpen={setEditOpen}
                address={value.address}
                id={value.id}
                name={value.name}
                phone={value.phone}
              />
            </DialogContent>
          </Dialog>
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger asChild>
              <button className="text-red-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                Delete
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[512px] rounded-md">
              <DialogHeader>
                <DialogTitle>Delete Device</DialogTitle>
                <DialogDescription>
                  Delete Devices from your profile here. Click update when
                  you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              {/* Note Form to ADD */}
              <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                  <Button
                    disabled={isPending}
                    type="button"
                    variant="secondary"
                    className="bg-emerald-500 text-white hover:bg-emerald-400"
                  >
                    NO
                  </Button>
                </DialogClose>
                <Button
                  disabled={isPending}
                  type="submit"
                  variant="secondary"
                  className="bg-red-600 text-white hover:bg-red-500"
                  onClick={onSubmit}
                >
                  YES
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </td>
    </tr>
  );
};
