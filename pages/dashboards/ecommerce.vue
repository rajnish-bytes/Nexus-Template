<template>
  <div>
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-medium">E-commerce Dashboard</h3>
      <div class="breadcrumbs hidden p-0 text-sm sm:inline">
        <ul>
          <li>Nexus</li>
          <li class="opacity-80">E-commerce</li>
        </ul>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <!-- Dashboard cards -->
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center gap-4">
            <div
              class="bg-primary/10 mask mask-squircle flex size-12 items-center justify-center"
            >
              <span
                class="iconify lucide--shopping-bag text-primary size-6"
              ></span>
            </div>
            <div class="grow">
              <p class="text-base-content/70 text-sm">Total Sales</p>
              <div class="flex items-center gap-2">
                <p class="text-2xl font-semibold">$27,509</p>
                <div class="badge badge-sm badge-success gap-1 font-medium">
                  <span class="iconify lucide--trending-up size-3"></span>
                  +12.5%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional dashboard cards would go here -->
    </div>

    <!-- Rest of dashboard content -->
  </div>
</template>
