import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { proveedores } from "@prisma/client";

interface Props {
  providers: proveedores[];
}

export const TableProvider = ({ providers }: Props) => {
  return (
    <Table>
      <TableCaption>Lista de proveedores.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Razon Social</TableHead>
          <TableHead>Telefono</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Direccion</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {providers.map((prov) => (
          <TableRow key={prov.id}>
            <TableCell className="font-medium">{prov.nombre}</TableCell>
            <TableCell>{prov.telefono}</TableCell>
            <TableCell>{prov.email}</TableCell>
            <TableCell>{prov.direccion}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
