import { proveedores } from "@prisma/client";

export type Provider = Omit<proveedores, "id" | "activo"> & {
  id?: string;
};
