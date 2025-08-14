import { Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow, } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton"


const TableSkeleton = () => {
  return (
      <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        <Skeleton className="h-12 w-[250px]" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-12 w-[250px]" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-12 w-[250px]" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-12 w-[250px]" />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                        <TableCell>
                            <Skeleton className="h-12 w-[250px]" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-12 w-[250px]" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-12 w-[250px]" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-12 w-[250px]" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>
                        <Skeleton className="h-12 w-full" />
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
  )
}

export default TableSkeleton