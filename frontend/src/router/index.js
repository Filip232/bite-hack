import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '@/store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/users/edit',
    name: 'EditUser',
    component: () => import(/* webpackChunkName: "EditUser" */ '../views/EditUser.vue')
  },
  {
    path: '/users/:id',
    name: 'UserProfile',
    component: () => import(/* webpackChunkName: "UserProfile" */ '../views/UserProfile.vue')
  },
  {
    path: '/products/add',
    name: 'AddProduct',
    component: () => import(/* webpackChunkName: "ProductDetails" */ '../views/AddProduct.vue')
  },
  {
    path: '/products/all/:page',
    name: 'Products',
    component: () => import(/* webpackChunkName: "Products" */ '../views/Products.vue')
  },
  {
    path: '/products/my/:id',
    name: 'MyProducts',
    component: () => import(/* webpackChunkName: "Products" */ '../views/MyProducts.vue')
  },
  {
    path: '/products/:id',
    name: 'ProductDetails',
    component: () => import(/* webpackChunkName: "ProductDetails" */ '../views/ProductDetails.vue')
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if ((to.name === 'UserProfile') && !store.state.user.token) next({ name: 'Login' })
  else next();
});

export default router;
