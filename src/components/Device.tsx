import { useState, useEffect, useTransition } from "react";
import { RingLoader } from "react-spinners";
import axios, { AxiosResponse } from "axios";

import { Button } from "./ui/button";
import { DeviceRow } from "./auth/device-row";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DeviceForm } from "./auth/device-form";

type IDevice = {
  id: string;
  serialNumber: string;
  status: string;
  type: string;
  image: {
    id: string;
    url: string;
  } | null;
};

export const Device = () => {
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

  const handleFilter = (e: any) => {
    const searchData = e.target.value;
    // const newFilter = values.filter((val) =>
    //   val.NIC.slice(0, searchData.length).includes(searchData)
    // );

    // setFilterData(newFilter);
  };

  useEffect(() => {
    const getData = () => {
      startTransistion(() => {
        authAxios
          .get("/api/device")
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
            Device Details
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
                    Serial Number
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Status
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
                {values
                  ? values.map((value: IDevice) => <DeviceRow value={value} />)
                  : null}
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
            <DialogTitle>Add Device</DialogTitle>
            <DialogDescription>
              Add Device to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          {/* Note Form to ADD */}
          <DeviceForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
