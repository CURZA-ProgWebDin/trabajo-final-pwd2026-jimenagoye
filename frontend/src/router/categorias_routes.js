export default [
  {
    path: "/categorias",
    name: "Categorias",
    component: () => import("../views/CategoriasView.vue"),
    meta: { requiresAuth: true, roles: ["admin"] }
  }
]