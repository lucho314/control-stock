import { productos } from "@prisma/client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export const Product = ({
  producto,
  login,
}: {
  producto: productos;
  login: boolean;
}) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <Image
        src={
          "https://imgs.search.brave.com/mamDGQSBcmOkymClGv2ip-IF2Dm-0ChMxv2juNC_SgE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuaG90c2FsZS5j/b20uYXIvdXBsb2Fk/cy9vZmZlcnMvMTM0/MDY0LzYwOTJhYTA4/ZWY0ZTMuanBnP3c9/NTAwJmg9Mzc1"
        }
        alt={producto.nombre || ""}
        className="w-full h-40 object-cover mb-4 rounded"
        width={400}
        height={400}
      />
      <h3 className="text-lg font-semibold mb-2">{producto.nombre}</h3>
      <p className="text-gray-600 mb-4">${producto.precio?.toString()}</p>
      <div className="d-flex">
        <Link href={"/products/" + producto.id} className="text-2xl font-bold">
          <Button className="mt-auto m-1">Ver</Button>
        </Link>
        {login && (
          <>
            <Link
              href={"/products/" + producto.id}
              className="text-2xl font-bold"
            >
              <Button className="mt-auto m-1">Actualizar</Button>
            </Link>
            <Link
              href={"/products/" + producto.id}
              className="text-2xl font-bold"
            >
              <Button className="mt-auto m-1" variant={"destructive"}>
                Eliminar
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
