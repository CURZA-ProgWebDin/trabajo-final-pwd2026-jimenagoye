export default [
  { path: '/roles', name: 'roles', component: () => import('../views/RolesView.vue'), meta: { requiresAuth: true, roles: ['admin'] } }
];