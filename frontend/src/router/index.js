import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import authRoutes from './auth_routes';
import productosRoutes from './productos_routes';
import categoriasRoutes from './categorias_routes';
import proveedoresRoutes from './proveedores_routes';
import movimientosRoutes from './movimientos_routes';
import usersRoutes from './users_routes';
import rolesRoutes from './roles_routes';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  ...authRoutes,
  ...productosRoutes,
  ...categoriasRoutes,
  ...proveedoresRoutes,
  ...movimientosRoutes,
  ...usersRoutes,
  ...rolesRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore();

  if (to.matched.some(r => r.meta.requiresAuth)) {
    if (!authStore.is_authenticated) {
      return { name: 'Login', query: { error: 'Debe iniciar sesión para acceder' } };
    }
  }

  if (to.matched.some(r => r.meta.roles)) {
    const allowedRoles = to.meta.roles;
    if (!allowedRoles.includes(authStore.rol_user)) {
      return { name: 'Home', query: { accessDenied: 'No tienes permisos para acceder a esta sección' } };
    }
  }
});

export default router;