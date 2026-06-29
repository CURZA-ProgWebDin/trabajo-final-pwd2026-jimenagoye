export default [
  { path: '/usuarios', name: 'usuarios', component: () => import('../views/UsersView.vue'), meta: { requiresAuth: true, roles: ['admin'] } }
];