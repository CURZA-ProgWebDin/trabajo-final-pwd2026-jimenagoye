export default [
  {
    path: '/movimientos',
    name: 'movimientos',
    component: () => import('../views/MovimientosView.vue'),
    meta: { requiresAuth: true, roles: ['admin', 'operador'] }
  }
];
