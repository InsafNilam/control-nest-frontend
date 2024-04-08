import { Separator } from "../ui/separator";

export const Terms = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-sm text-muted-foreground text-center my-2">
        By continuing, you agree to ForecastX&apos;s{" "}
        <b>Terms of Service, Privacy Policy</b>
      </p>
      <Separator className="w-4/5" />
    </div>
  );
};
