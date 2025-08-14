"use client";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchStore } from "@/store/searchStore";
import { cn } from "@/lib/utils";
import { IPagination } from "@/lib/types/pagination.type";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight } from "lucide-react";

interface Props {
  pagination: IPagination;
  route: string;
}

const Pagination = ({ pagination, route }: Props) => {
  const { searchValue } = useSearchStore();
  const router = useRouter();

  const goToPage = (p: number) => {
    router.push(
      `/admin/dashboard/${route}?page=${p}&search=${searchValue}&limit=${pagination.limit}`
    );
  };

  const handleLimitChange = (value: string) => {
    const newLimit = parseInt(value);
    router.push(
      `/admin/dashboard/${route}?page=1&search=${searchValue}&limit=${newLimit}`
    );
  };

  const getPageNumbers = () => {
    const total = pagination.totalPages;
    const current = pagination.page;
    const delta = 2;
    const range: (number | string)[] = [];

    for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
      range.push(i);
    }

    if (range[0] !== 1) {
      range.unshift(1);
      if (range[1] !== 2) range.splice(1, 0, "...");
    }
    if (range[range.length - 1] !== total) {
      if (range[range.length - 1] !== total - 1) range.push("...");
      range.push(total);
    }

    return range;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
      {/* Per page selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Per page:</span>
        <Select value={pagination.limit.toString()} onValueChange={handleLimitChange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Limit" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((value) => (
              <SelectItem key={value} value={value.toString()}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pagination buttons */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center gap-1">
          <Button
            disabled={pagination.page === 1}
            onClick={() => goToPage(1)}
            className="px-2 py-1 border rounded disabled:opacity-50 size-8"
            variant="outline"
            size="icon"
          >
            <ChevronsLeft />
          </Button>
          <Button
            disabled={pagination.page === 1}
            onClick={() => goToPage(pagination.page - 1)}
            className="px-2 py-1 border rounded disabled:opacity-50 size-8"
            variant="outline"
            size="icon"
          >
            <ChevronLeftIcon />
          </Button>

          {getPageNumbers().map((p, idx) =>
            p === "..." ? (
              <span key={idx} className="px-2">
                ...
              </span>
            ) : (
              <Button
                key={idx}
                onClick={() => goToPage(p as number)}
                className={cn(
                  "px-3 py-1 border rounded size-8",
                  p === pagination.page ? "bg-primary text-white border-primary" : ""
                )}
                variant="outline"
              >
                {p}
              </Button>
            )
          )}

          <Button
            disabled={pagination.page === pagination.totalPages}
            onClick={() => goToPage(pagination.page + 1)}
            className="px-2 py-1 border rounded disabled:opacity-50 size-8"
            variant="outline"
            size="icon"
          >
            <ChevronRightIcon />
          </Button>
          <Button
            disabled={pagination.page === pagination.totalPages}
            onClick={() => goToPage(pagination.totalPages)}
            className="px-2 py-1 border rounded disabled:opacity-50 size-8"
            variant="outline"
            size="icon"
          >
            <ChevronsRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
