<template>
  <header
    class="bg-base-100 sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-base-300 px-4 shadow-sm sm:px-6"
  >
    <div class="flex items-center gap-3">
      <button
        class="btn btn-ghost btn-sm btn-square sm:hidden"
        @click="toggleSidebar"
      >
        <span class="iconify lucide--menu size-4"></span>
      </button>

      <div class="relative sm:w-64">
        <label class="input input-sm flex items-center gap-3">
          <span
            class="iconify lucide--search text-base-content/60 size-3.5"
          ></span>
          <input class="grow" placeholder="Search..." type="search" />
        </label>
      </div>
    </div>

    <div class="flex items-center gap-1">
      <!-- Theme toggle -->
      <div class="dropdown dropdown-end">
        <button class="btn btn-ghost btn-sm btn-square">
          <span class="iconify lucide--sun size-4"></span>
        </button>
        <div
          class="dropdown-content bg-base-100 rounded-box z-10 mt-1.5 w-52 p-2 shadow-md"
        >
          <ul class="menu">
            <li><button @click="changeTheme('light')">Light</button></li>
            <li><button @click="changeTheme('dark')">Dark</button></li>
          </ul>
        </div>
      </div>

      <!-- Notifications -->
      <div class="dropdown dropdown-end">
        <button class="btn btn-ghost btn-sm btn-square indicator">
          <span class="iconify lucide--bell size-4"></span>
          <span class="badge indicator-item badge-primary badge-xs"></span>
        </button>
        <!-- Dropdown content here -->
      </div>

      <!-- User dropdown -->
      <div class="dropdown dropdown-end">
        <div class="btn btn-ghost btn-sm btn-circle">
          <img
            class="size-6 rounded-full"
            alt="User Avatar"
            src="/images/avatars/1.png"
          />
        </div>
        <!-- Dropdown content here -->
      </div>
    </div>
  </header>
</template>

<script setup>
const toggleSidebar = () => {
  // Implement sidebar toggle for mobile
  const sidebar = document.querySelector("aside");
  sidebar.classList.toggle("-translate-x-full");
};

const changeTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};
</script>
