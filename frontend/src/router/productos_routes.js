export default [
  { path: '/productos', name: 'productos', component: () => import('../views/ProductosView.vue'), meta: { requiresAuth: true, roles: ['admin', 'operador'] } }
];