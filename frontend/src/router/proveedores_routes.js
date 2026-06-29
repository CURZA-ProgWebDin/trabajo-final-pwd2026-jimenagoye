export default [
  { path: '/proveedores', name: 'proveedores', component: () => import('../views/ProveedoresView.vue'), meta: { requiresAuth: true, roles: ['admin'] } }
];