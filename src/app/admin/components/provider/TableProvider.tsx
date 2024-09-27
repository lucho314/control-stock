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
import { ButtonActionTable } from "./button-accion-table";

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
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {providers.map((prov) => (
          <TableRow key={prov.id}>
            <TableCell className="font-medium">{prov.nombre}</TableCell>
            <TableCell>{prov.telefono}</TableCell>
            <TableCell>{prov.email}</TableCell>
            <TableCell>{prov.direccion}</TableCell>
            <TableCell>
              <ButtonActionTable provider={prov} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
