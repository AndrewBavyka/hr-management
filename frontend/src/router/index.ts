import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import AllEmployeesView from '@/views/employees/AllEmployeesView.vue'
import AddEmployeesView from '@/views/employees/AddEmployeesView.vue'
import AllDepartmentsView from '@/views/departments/AllDepartmentsView.vue'
import AddDepartmentsView from '@/views/departments/AddDepartmentsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/employees',
      name: 'All Employee',
      component: AllEmployeesView
    },
    {
      path: '/employees/new',
      name: 'Add New Employee',
      component: AddEmployeesView
    },
    {
      path: '/departments/',
      name: 'All Departments',
      component: AllDepartmentsView
    },
    {
      path: '/departments/new',
      name: 'Add New Departments',
      component: AddDepartmentsView
    },
  ]
})

export default router
