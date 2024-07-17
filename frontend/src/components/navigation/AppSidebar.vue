<script lang="ts" setup>
import { RouterLink } from 'vue-router'

interface NavigationLink {
  iconPath: string
  href: string
  name: string
}

const sidebarLinks: NavigationLink[] = [
  // { iconPath: 'src/assets/icons/sidebar/dashboard.svg', name: 'Dashboard', href: '/' },
  { iconPath: 'src/assets/icons/sidebar/employees.svg', name: 'All Employees', href: '/employees' },
  {
    iconPath: 'src/assets/icons/sidebar/departments.svg',
    name: 'All Departments',
    href: '/departments'
  },
  { iconPath: 'src/assets/icons/sidebar/jobs.svg', name: 'Jobs', href: '/jobs' }
  // {
  //     iconPath: 'src/assets/icons/sidebar/notification.svg',
  //     name: 'Notification',
  //     href: '/notification'
  // }
]

const formatingAltAttribute = (altName: string) => `${altName.toLowerCase()}-icon`
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__wrapper">
      <div class="sidebar__logo">
        <img src="../../assets/logo.svg" alt="app-logo" />
      </div>
      <ul class="sidebar__list">
        <li class="sidebar__list-item" v-for="(link, index) in sidebarLinks" :key="index">
          <RouterLink
            active-class="sidebar__list-link--active"
            class="sidebar__list-link"
            :to="link.href"
            :alt="formatingAltAttribute(link.name)"
          >
            <!-- <img :src="link.iconPath" :alt="formatingAltAttribute(link.name)" /> -->

            {{ link.name }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  max-width: 300px;
  width: 100%;
  padding: 20px;
}

.sidebar__wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
  background-color: var(--sidebar-background);
  min-height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: var(--corner-radius-20);
}

.sidebar__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar__list-item {
  position: relative;
}

.sidebar__list-link {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 13px 10px;
  text-decoration: none;
  font: var(--font-body-1-regular);
  color: var(--sidebar-color-links);
  border-radius: 0px var(--corner-radius-10) var(--corner-radius-10) 0px;
  transition: background-color 0.3s ease;
}

.sidebar__list-link--active,
.sidebar__list-link:hover {
  background-color: var(--color-primary-5);
}

.sidebar__list-link:after {
  content: '';
  position: absolute;
  left: 0;
  width: 3px;
  height: 100%;
  display: flex;
  background-color: transparent;
  transition: background-color 0.3s ease;
  border-radius: var(--corner-radius-10);
}

.sidebar__list-link.sidebar__list-link--active:after {
  background-color: var(--color-primary-500);
}

.sidebar__list-link:hover:after {
  background-color: var(--color-primary-500);
}
</style>
