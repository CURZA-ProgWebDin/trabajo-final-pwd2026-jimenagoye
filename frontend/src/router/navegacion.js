export const navegacion = [
  {
    path: "/productos/gestion",
    name: "Gestión de Productos",
    icon: "box-seam",
    rol_access: ["admin"],
  },
  {
    path: "/proveedores",
    name: "Proveedores",
    icon: "truck",
    rol_access: ["admin"],
  },
  {
    path: "/productos",
    name: "Listado de Stock",
    icon: "list-ul",
    rol_access: ["admin", "operador"],
  },
  {
    path: "/movimientos",
    name: "Mis Movimientos",
    icon: "arrow-left-right",
    rol_access: ["admin", "operador"],
  },
  {
    path: "/movimientos/registrar",
    name: "Registrar Movimiento",
    icon: "plus-circle",
    rol_access: ["admin", "operador"],
  },
];