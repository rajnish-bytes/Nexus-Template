<template>
  <div class="size-full" id="layout-main">
    <div class="flex">
      <Sidebar />

      <div class="flex h-screen min-w-0 grow flex-col overflow-auto">
        <Topbar />

        <!--  Start: Layout - Content -->
        <div id="layout-content">
          <slot />
        </div>
        <!--  End: Layout - Content -->
      </div>
    </div>

    <Rightbar />
  </div>
</template>

<script setup>
// Default layout with sidebar, topbar, and rightbar
</script>
