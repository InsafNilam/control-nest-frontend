import { cn } from "../../lib/utils";

interface HeaderProps {
  label: string;
  className?: string;
}

export const Header = ({ label, className }: HeaderProps) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-y-2 items-center justify-center mb-2",
        className
      )}
    >
      <h1 className={cn("text-3xl font-semibold text-center")}>{label}</h1>
      <p className="text-muted-foreground text-sm">
        Enter your credentials to access your account
      </p>
    </div>
  );
};
