import { useState, useEffect, useTransition } from "react";
import axios, { AxiosResponse } from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { LocationForm } from "./auth/location-form";
import { LocationRow } from "./auth/location-row";

type ILocation = {
  id: string;
  name: string;
  address: string;
  phone: string;
};

export const Location = () => {
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = useState<boolean>(false);

  const [isLoading, startTransistion] = useTransition();
  const [values, setValues] = useState([]);
  const authAxios = axios.create({
    baseURL: "https://control-nest-backend-production.up.railway.app",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const getData = () => {
      startTransistion(() => {
        authAxios
          .get("/api/location")
          .then((response: AxiosResponse) => {
            console.log("Data:", response.data);

            if (response.data?.error) {
              console.error("Login error:", response.data?.error);
            }
            if (response.data) {
              setValues(response.data);
            }
          })
          .catch((error) => {
            console.error(
              "Fetch error:",
              error.response?.data || error.message
            );
          });
      });
    };
    getData();
  }, []);

  return (
    <div className="py-20 max-w-screen-xl mx-auto">
      <div className="px-3 flex items-center justify-between">
        <div className="flex flex-col items-end justify-end">
          <h1 className="text-start text-4xl font-bold tracking-tight leading-none text-white font-sans">
            Location Details
          </h1>
        </div>
        <div className="bg-gray-900 w-1/2 items-center justify-end flex rounded-full shadow-lg p-2">
          <input
            className="border-none font-bold uppercase rounded-full w-full py-3 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
            type="search"
            placeholder="Search...."
          />
          <div className="bg-white p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full text-gray-700 hover:text-white">
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="pt-2 overflow-x-auto">
        <div className="inline-block min-w-full py-2 align-middle px-3">
          <div className="border border-gray-200 dark:border-gray-700 overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Created By
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {values ? (
                  values.map((value: ILocation) => (
                    <LocationRow value={value} />
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      -
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      -
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
                        <h2 className="text-sm font-normal">-</h2>
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
                            -
                          </h2>
                          <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                            -
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      -
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-x-2">
                        <button className="text-emerald-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                          -
                        </button>
                        <button className="text-red-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                          -
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="px-3 flex items-center justify-end">
            <button className="relative inline-flex items-center justify-center overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
              <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Add
              </span>
            </button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[512px] rounded-md">
          <DialogHeader>
            <DialogTitle>Add Location</DialogTitle>
            <DialogDescription>
              Add Location to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          {/* Note Form to ADD */}
          <LocationForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
