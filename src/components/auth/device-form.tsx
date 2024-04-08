"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
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

export const DeviceForm = ({
  image,
  status,
  type,
  id,
  setOpen,
}: {
  image?: string;
  status?: string;
  type?: string;
  id?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const token = sessionStorage.getItem("token");
  const authAxios = axios.create({
    baseURL: "https://control-nest-backend-production.up.railway.app",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const form = useForm<z.infer<typeof DeviceSchema>>({
    resolver: zodResolver(DeviceSchema),
    defaultValues: {
      status: status || "",
      type: type || "",
    },
  });

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransistion] = useTransition();

  const onSubmit = (values: z.infer<typeof DeviceSchema>) => {
    setError("");
    setSuccess("");
    startTransistion(() => {
      if (id) {
        authAxios
          .put(`/api/device/${id}`, { ...values })
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
        authAxios
          .post(`/api/device/${id}`, { ...values })
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
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="space-y-2">
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
