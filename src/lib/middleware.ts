// lib/middleware.js

import { auth } from "@/auth.config";

export const isAdmin = async () => {
  try {
    const session = await auth();

    // Verificamos si la sesión es válida y si el usuario es admin
    if (!session || session.user.role !== "admin") {
      return ["No tienes permisos para realizar esta acción.", null]; // Retornar error y null
    }

    return [null, session.user.id]; // Retornar null como error y el ID del usuario
  } catch (error) {
    console.error("Error al obtener la sesión:", error);
    return ["Error al obtener la sesión.", null]; // Retornar error y null
  }
};
