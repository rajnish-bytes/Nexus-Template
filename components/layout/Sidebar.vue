<template>
  <div>
    <input
      type="checkbox"
      :id="toggleId"
      class="hidden"
      aria-label="Toggle layout sidebar" />

    <div id="layout-sidebar">
      <!-- Logo -->
      <NuxtLink class="flex min-h-16 items-center justify-center" :to="logoLink">
        <img alt="logo-dark" class="hidden h-5.5 dark: