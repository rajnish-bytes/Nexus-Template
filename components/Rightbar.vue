<template>
  <aside
    class="fixed right-0 top-0 h-screen w-80 translate-x-full overflow-hidden transition-transform sm:w-96"
  >
    <div class="flex h-full flex-col overflow-y-auto bg-base-100 shadow-lg">
      <div
        class="flex h-16 items-center justify-between border-b border-base-300 px-4"
      >
        <h3 class="text-base font-medium">Settings</h3>
        <button class="btn btn-ghost btn-sm btn-square" @click="closeRightbar">
          <span class="iconify lucide--x size-4"></span>
        </button>
      </div>

      <div class="p-4">
        <!-- Rightbar content -->
      </div>
    </div>
  </aside>
</template>

<script setup>
const closeRightbar = () => {
  // Implement rightbar close functionality
  const rightbar = document.querySelector('aside[class*="right-0"]');
  rightbar.classList.add("translate-x-full");
};
</script>
