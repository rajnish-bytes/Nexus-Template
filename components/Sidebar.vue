<template>
  <aside
    class="fixed h-screen w-60 -translate-x-full overflow-hidden transition-transform sm:translate-x-0 z-20"
  >
    <div class="flex h-full flex-col overflow-y-auto bg-base-200 shadow-lg">
      <!-- Logo -->
      <div class="flex h-16 items-center gap-2 px-4">
        <img class="size-8" src="/images/logo.svg" alt="Logo" />
        <span class="text-lg font-medium">Nexus</span>
      </div>

      <!-- Menu -->
      <div class="grow p-4">
        <ul class="menu gap-1">
          <li class="menu-title">
            <span>Dashboards</span>
          </li>
          <li>
            <NuxtLink
              to="/dashboards/ecommerce"
              class="flex items-center gap-3"
            >
              <span class="iconify lucide--bar-chart-3 size-4"></span>
              E-commerce
            </NuxtLink>
          </li>

          <li class="menu-title mt-4">
            <span>Applications</span>
          </li>
          <li>
            <NuxtLink
              to="/apps/ecommerce/products"
              class="flex items-center gap-3"
            >
              <span class="iconify lucide--shopping-bag size-4"></span> Products
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/apps/ecommerce/customers"
              class="flex items-center gap-3"
            >
              <span class="iconify lucide--users size-4"></span> Customers
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/apps/ecommerce/orders"
              class="flex items-center gap-3"
            >
              <span class="iconify lucide--package size-4"></span> Orders
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/apps/chat" class="flex items-center gap-3">
              <span class="iconify lucide--message-square size-4"></span> Chat
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
