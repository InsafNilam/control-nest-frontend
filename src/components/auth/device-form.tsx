"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeviceSchema } from "src/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import { FormError } from "src/components/form-error";
import { FormSuccess } from "src/components/form-success";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios, { AxiosResponse } from "axios";
import { ChevronsRightIcon } from "lucide-react";

type ILocation = {
  id: string;
  name: string;
  address: string;
  phone: string;
};

export const DeviceForm = ({
  image,
  status,
  type,
  id,
  setOpen,
}: {
  image?: File | string;
  status?: string;
  type?: string;
  id?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const token = sessionStorage.getItem("token");
  const [imageURL] = useState<string | null>(
    typeof image === "string" ? image : ""
  );
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);

  const authAxios = axios.create({
    baseURL: "https://control-nest-backend-production.up.railway.app",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const formData = new FormData();

  const form = useForm<z.infer<typeof DeviceSchema>>({
    resolver: zodResolver(DeviceSchema),
    defaultValues: {
      image: image || undefined,
      locationId: "",
      status: status || "",
      type: type || "",
    },
  });

  const file = form.register("image");

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransistion] = useTransition();
  const [values, setValues] = useState([]);

  const onSubmit = (values: z.infer<typeof DeviceSchema>) => {
    setError("");
    setSuccess("");
    startTransistion(() => {
      if (id) {
        if (previewImageURL) {
          formData.append("image", values.image?.[0]); // Add the file
        }

        formData.append("status", values.status);
        formData.append("type", values.type);

        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        authAxios
          .put(`/api/device/${id}`, formData, config)
          .then((response: AxiosResponse) => {
            console.log("Update successful:", response.data);
            if (response.data?.error) {
              console.error("Delete error:", response.data?.error);
            }
            if (response.data?.success) {
              console.log("Delete Success:", response.data?.success);
              const timer = setTimeout(() => {
                setOpen(false);
              }, 1000);
              return () => clearTimeout(timer);
            }
          })
          .catch((error) => {
            console.error(
              "Update error:",
              error.response?.data || error.message
            );
          });
      } else {
        if (values.locationId && values.locationId?.length > 0) {
          if (values.image?.[0]) {
            formData.append("image", values.image?.[0]); // Add the file
          }

          formData.append("locationId", values.locationId); // Add other data
          formData.append("status", values.status);
          formData.append("type", values.type);

          const config = {
            headers: {
              "content-type": "multipart/form-data",
            },
          };

          authAxios
            .post(`/api/device`, formData, config)
            .then((response: AxiosResponse) => {
              console.log("Create successful:", response.data);
              if (response.data?.error) {
                console.error("Create error:", response.data?.error);
                setError(response.data?.error);
              }
              if (response.data?.success) {
                console.log("Create Success:", response.data?.success);
                setSuccess(response.data?.success);
                const timer = setTimeout(() => {
                  setOpen(false);
                }, 1000);
                return () => clearTimeout(timer);
              }
            })
            .catch((error) => {
              console.error(
                "Create error:",
                error.response?.data || error.message
              );
            });
        } else {
          setError("Please Select a Location");
        }
      }
    });
  };

  useEffect(() => {
    const getData = () => {
      startTransistion(() => {
        authAxios
          .get("/api/location")
          .then((response: AxiosResponse) => {
            console.log("Data:", response.data);

            if (response.data?.error) {
              console.error("Fetch error:", response.data?.error);
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full"
        encType="multipart/form-data"
      >
        <div className="space-y-2">
          <div className="flex items-center justify-evenly transition-all">
            <img
              src={
                imageURL
                  ? imageURL
                  : "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png"
              }
              alt="Initial Image"
              className="rounded-full mr-4 w-16 h-16 object-cover"
            />
            {previewImageURL && (
              <>
                <ChevronsRightIcon className="transition duration-300 ease-in-out" />
                <img
                  src={previewImageURL}
                  alt="Selected Image"
                  className="rounded-full mr-4 w-16 h-16 object-cover transition duration-300 ease-in-out"
                />
              </>
            )}
          </div>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl className="p-0">
                  <Input
                    className="p-0"
                    disabled={isPending}
                    {...file}
                    placeholder="Choose an Image"
                    type="file"
                    onChange={(event: any) => {
                      if (event.target?.files?.[0]) {
                        setPreviewImageURL(
                          URL.createObjectURL(event.target.files[0])
                        );
                      } else {
                        setPreviewImageURL(null);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!id && (
            <FormField
              control={form.control}
              name="locationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Location</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {values
                        ? values.map((value: ILocation) => (
                            <SelectItem value={value.id}>
                              {value.name} - {value.id}
                            </SelectItem>
                          ))
                        : null}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"pos"}>POS</SelectItem>
                    <SelectItem value={"kisok"}>KISOK</SelectItem>
                    <SelectItem value={"signage"}>SIGNAGE</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"inactive"}>In Active</SelectItem>
                    <SelectItem value={"active"}>Active</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="w-full flex place-content-end">
          <Button
            disabled={isPending}
            type="submit"
            className="bg-[#512da8] py-2 px-11 uppercase cursor-pointer"
          >
            {id ? "UPDATE" : "ADD"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
