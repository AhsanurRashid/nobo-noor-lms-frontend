"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const GenerateButton = ({
  children,
  title,
  size
}: {
  children: React.ReactNode;
  title: string;
  size?: "sm" | "md" | "lg";
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus />
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className={cn(size ? `sm:max-w-[${size}]` : "sm:max-w-[425px]", "boxed")}>
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="w-full max-h-[calc(100vh-100px)]">
          {children}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateButton;
