import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { venta } from "@prisma/client";
import { formatDate } from "@/utils/formatDate";
import { ButtonActionTableSale } from "./ButtonActionTableSale";

interface Props {
  sales?: venta[];
}

export const TableSale = ({ sales }: Props) => {
  return (
    <Table>
      <TableCaption>Lista de ventas.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Numero</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales?.map((sale) => (
          <TableRow key={sale.id}>
            <TableCell className="font-medium">{sale.numeracion}</TableCell>
            <TableCell>{formatDate(sale.fecha)}</TableCell>
            <TableCell>{sale.total}</TableCell>
            <TableCell>
              <ButtonActionTableSale sale={sale} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
