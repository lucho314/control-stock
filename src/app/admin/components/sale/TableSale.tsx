import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ordenes_de_venta as ordenesVenta } from "@prisma/client";

interface Props {
  sales?: ordenesVenta[];
}

export const TableSale = ({ sales }: Props) => {
  return (
    <Table>
      <TableCaption>Lista de proveedores.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Numero</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {sales.map((sale) => ( */}
        <TableRow>
          <TableCell className="font-medium">123213</TableCell>
          <TableCell>27-09-2024</TableCell>
          <TableCell>$2000</TableCell>
          <TableCell>{/* <ButtonActionTable provider={prov} /> */}</TableCell>
        </TableRow>
        {/* ))} */}
      </TableBody>
    </Table>
  );
};
