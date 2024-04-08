"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Suspense, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import axios, { AxiosResponse } from "axios";

import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "../ui/checkbox";

export const LoginForm = () => {
  const authAxios = axios.create({
    baseURL: "https://control-nest-backend-production.up.railway.app",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransistion] = useTransition();

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransistion(() => {
      authAxios
        .post("/api/user/login", {
          email: values.email,
          password: values.password,
        })
        .then((response: AxiosResponse) => {
          console.log("Login successful:", response.data);

          if (response.data?.error) {
            form.reset();
            setError(response.data.error);
          }
          if (response.data?.success) {
            form.reset();
            sessionStorage.setItem("token", response.data?.token);
            sessionStorage.setItem("user", JSON.stringify(response.data?.user));

            setSuccess(response.data.success);
          }

          setTimeout(() => {
            navigate("/dashboard");
          }, 500);
        })
        .catch((error) => {
          setError("Something went wrong!");
          console.error("Login error:", error.response?.data || error.message);
        });
    });
  };

  return (
    <Suspense>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row item-center justify-center space-x-2">
                <Checkbox id="remember" defaultChecked />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center justify-center"
                >
                  Remember Me
                </label>
              </div>
              <Button
                size="sm"
                variant="link"
                asChild
                className="px-0 font-normal"
              >
                <Link to="/auth/reset">Forgot password?</Link>
              </Button>
            </div>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="bg-[#512da8] py-2 px-11 uppercase cursor-pointer block mx-auto"
          >
            Login
          </Button>
        </form>
      </Form>
    </Suspense>
  );
};
