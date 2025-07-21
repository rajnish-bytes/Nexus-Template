<template>
  <div
    role="navigation"
    aria-label="Navbar"
    class="flex items-center justify-between px-3"
    id="layout-topbar">
    <!-- Left side items: Menu toggle, Search -->
    <div class="inline-flex items-center gap-3">
      <label
        class="btn btn-square btn-ghost btn-sm"
        aria-label="Leftmenu toggle"
        :for="sidebarToggleId">
        <span class="iconify lucide--menu size-5"></span>
      </label>
      <button
        @click="openSearchModal"
        class="btn btn-outline btn-sm btn-ghost border-base-300 text-base-content/70 hidden h-9 w-48 justify-start gap-2 !text-sm md:flex">
        <span class="iconify lucide--search size-4"></span>
        <span>Search</span>
      </button>
      <button
        @click="openSearchModal"
        class="btn btn-outline btn-sm btn-square btn-ghost border-base-300 text-base-content/70 flex size-9 md:hidden"
        aria-label="Search">
        <span class="iconify lucide--search size-4"></span>
      </button>
      
      <!-- Search Modal -->
      <dialog ref="searchModalRef" id="topbar-search-modal" class="modal p-0">
        <div class="modal-box p-0">
          <div
            class="input border-base-300 w-full rounded-none border-0 border-b focus:!outline-0 active:!outline-0">
            <span class="iconify lucide--search text-base-content/60 size-4.5"></span>
            <input class="grow" placeholder="Search" aria-label="Search" type="search" v-model="searchQuery" />
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost" aria-label="Close">
                <span class="iconify lucide--x text-base-content/80 size-4"></span>
              </button>
            </form>
          </div>
          
          <!-- Search Actions -->
          <ul class="menu w-full pt-0">
            <li class="menu-title">Actions</li>
            <li v-for="(action, index) in searchActions" :key="`action-${index}`">
              <div @click="handleAction(action)">
                <span :class="`iconify ${action.icon} size-4.5`"></span>
                <p class="grow text-sm">{{ action.label }}</p>
              </div>
            </li>
          </ul>
          
          <hr class="border-base-300 h-px" />
          
          <!-- Quick Links -->
          <ul class="menu w-full pt-0">
            <li class="menu-title">Quick Links</li>
            <li v-for="(link, index) in quickLinks" :key="`link-${index}`">
              <div @click="navigateTo(link.path)">
                <span :class="`iconify ${link.icon} size-4.5`"></span>
                <p class="grow text-sm">{{ link.label }}</p>
              </div>
            </li>
          </ul>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
    
    <!-- Right side items: Theme toggle, Settings, Notifications, Profile -->
    <div class="inline-flex items-center gap-1.5">
      <!-- Theme Dropdown -->
      <div class="dropdown dropdown-center">
        <div
          tabindex="0"
          role="button"
          class="btn btn-sm btn-circle btn-ghost"
          aria-label="Theme toggle">
          <span
            class="iconify lucide--sun hidden size-4 size-4.5 group-data-[theme=light]/html:inline"></span>
          <span
            class="iconify lucide--moon hidden size-4 size-4.5 group-data-[theme=dark]/html:inline"></span>
          <span
            class="iconify lucide--monitor hidden size-4 size-4.5 group-[:not([data-theme])]/html:inline"></span>
          <span
            class="iconify lucide--palette hidden size-4 size-4.5 group-data-[theme=contrast]/html:inline group-data-[theme=dim]/html:inline group-data-[theme=material]/html:inline"></span>
        </div>
        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box z-1 mt-2 w-36 space-y-0.5 p-1 shadow-sm">
          <li v-for="theme in themes" :key="theme.value">
            <div
              :class="`${theme.activeClass} flex gap-2`"
              @click="setTheme(theme.value)">
              <span :class="`iconify ${theme.icon} size-4.5`"></span>
              <span class="font-medium">{{ theme.label }}</span>
            </div>
          </li>
        </ul>
      </div>
      
      <!-- Settings Button -->
      <label :for="rightbarDrawerId" class="btn btn-circle btn-ghost btn-sm drawer-button">
        <span class="iconify lucide--settings-2 size-4.5"></span>
      </label>
      
      <!-- Notifications Dropdown -->
      <div class="dropdown dropdown-bottom sm:dropdown-end max-sm:dropdown-center">
        <div
          tabindex="0"
          role="button"
          class="btn btn-circle btn-ghost btn-sm"
          aria-label="Notifications">
          <span class="iconify lucide--bell size-4.5"></span>
        </div>
        <div
          tabindex="0"
          class="dropdown-content bg-base-100 rounded-box card card-compact mt-5 w-60 p-2 shadow sm:w-84">
          <div class="flex items-center justify-between px-2">
            <p class="text-base font-medium">Notification</p>
            <button tabindex="0" class="btn btn-sm btn-circle btn-ghost" aria-label="Close">
              <span class="iconify lucide--x size-4"></span>
            </button>
          </div>
          
          <!-- Today Notifications -->
          <div class="flex items-center justify-center">
            <div class="badge badge-sm badge-primary badge-soft">Today</div>
          </div>
          <div class="mt-2">
            <div
              v-for="(notification, index) in todayNotifications"
              :key="`today-${index}`"
              class="rounded-box hover:bg-base-200 flex cursor-pointer gap-3 px-2 py-1.5 transition-all"
              @click="handleNotification(notification)">
              <img
                class="bg-base-200 mask mask-squircle size-10 p-0.5"
                :alt="notification.senderName"
                :src="notification.avatar" />
              <div class="grow">
                <p class="text-sm leading-tight">{{ notification.message }}</p>
                <p class="text-base-content/60 text-end text-xs leading-tight">{{ notification.time }}</p>
              </div>
            </div>
          </div>
          
          <!-- Previous Notifications -->
          <div class="mt-2 flex items-center justify-center">
            <div class="badge badge-sm">Previous</div>
          </div>
          <div class="mt-2">
            <div
              v-for="(notification, index) in previousNotifications"
              :key="`prev-${index}`"
              class="rounded-box hover:bg-base-200 flex cursor-pointer gap-3 px-2 py-1.5 transition-all"
              @click="handleNotification(notification)">
              <img
                class="bg-base-200 mask mask-squircle size-10 p-0.5"
                :alt="notification.senderName"
                :src="notification.avatar" />
              <div class="grow">
                <p class="text-sm leading-tight">{{ notification.message }}</p>
                <p class="text-base-content/60 text-end text-xs leading-tight">{{ notification.time }}</p>
              </div>
            </div>
          </div>
          
          <!-- Notification Actions -->
          <hr class="border-base-300 -mx-2 mt-2" />
          <div class="flex items-center justify-between pt-2">
            <button class="btn btn-sm btn-ghost" @click="markAllAsRead">Mark as read</button>
            <button class="btn btn-sm btn-soft btn-primary" @click="viewAllNotifications">View All</button>
          </div>
        </div>
      </div>
      
      <!-- User Profile Dropdown -->
      <div class="dropdown dropdown-bottom dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost rounded-btn px-1.5">
          <div class="flex items-center gap-2">
            <div class="avatar">
              <div class="bg-base-200 mask mask-squircle w-8">
                <img :alt="user.name" :src="user.avatar" />
              </div>
            </div>
            <div class="-space-y-0.5 text-start">
              <p class="text-sm">{{ user.firstName }}</p>
              <p class="text-base-content/60 text-xs">Profile</p>
            </div>
          </div>
        </div>
        <div class="dropdown-content bg-base-100 rounded-box mt-4 w-44 shadow" tabindex="0">
          <ul class="menu w-full p-2">
            <li v-for="(item, index) in profileMenuItems" :key="`profile-${index}`">
              <NuxtLink :to="item.path">
                <span :class="`iconify ${item.icon} size-4`"></span>
                <span>{{ item.label }}</span>
              </NuxtLink>
            </li>
          </ul>
          <hr class="border-base-300" />
          <ul class="menu w-full p-2">
            <li>
              <div @click="switchAccount">
                <span class="iconify lucide--arrow-left-right size-4"></span>
                <span>Switch Account</span>
              </div>
            </li>
            <li>
              <NuxtLink class="text-error hover:bg-error/10" to="/auth/login" @click="logout">
                <span class="iconify lucide--log-out size-4"></span>
                <span>Logout</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Topbar Component
 * 
 * @component
 * @description Main navigation bar displayed at the top of the application.
 * Contains search functionality, theme selection, notifications and user profile menu.
 */

import { ref } from 'vue';

interface NotificationType {
  id: string;
  message: string;
  time: string;
  avatar: string;
  senderName: string;
  read: boolean;
}

interface UserType {
  id: string;
  name: string;
  firstName: string;
  avatar: string;
  email: string;
}

interface ThemeType {
  value: string;
  label: string;
  icon: string;
  activeClass: string;
}

interface MenuItem {
  label: string;
  path: string;
  icon: string;
}

/**
 * Props for the Topbar component
 */
const props = defineProps({
  /** ID for sidebar toggle checkbox */
  sidebarToggleId: {
    type: String,
    default: 'layout-sidebar-toggle-trigger'
  },
  /** ID for rightbar drawer */
  rightbarDrawerId: {
    type: String,
    default: 'layout-rightbar-drawer'
  }
});

// Refs
const searchModalRef = ref<HTMLDialogElement | null>(null);
const searchQuery = ref('');

// User data
const user = ref<UserType>({
  id: '1',
  name: 'Denish N',
  firstName: 'Denish',
  avatar: '/images/avatars/1.png',
  email: 'denish@example.com'
});

// Theme options
const themes: ThemeType[] = [
  {
    value: 'light',
    label: 'Light',
    icon: 'lucide--sun',
    activeClass: 'group-data-[theme=light]/html:bg-base-200'
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: 'lucide--moon',
    activeClass: 'group-data-[theme=dark]/html:bg-base-200'
  },
  {
    value: 'system',
    label: 'System',
    icon: 'lucide--monitor',
    activeClass: 'group-[:not([data-theme])]/html:bg-base-200'
  }
];

// Search actions
const searchActions = [
  { label: 'Create a new folder', icon: 'lucide--folder-plus', action: 'createFolder' },
  { label: 'Upload new document', icon: 'lucide--file-plus', action: 'uploadDocument' },
  { label: 'Invite to project', icon: 'lucide--user-plus', action: 'inviteUser' }
];

// Quick links
const quickLinks = [
  { label: 'File Manager', icon: 'lucide--folders', path: '/apps-file-manager' },
  { label: 'Profile', icon: 'lucide--user', path: '/pages-settings' },
  { label: 'Dashboard', icon: 'lucide--layout-dashboard', path: '/dashboards-ecommerce' },
  { label: 'Support', icon: 'lucide--help-circle', path: '/pages-get-help' },
  { label: 'Keyboard Shortcuts', icon: 'lucide--keyboard', path: '#' }
];

// Profile menu items
const profileMenuItems: MenuItem[] = [
  { label: 'My Profile', icon: 'lucide--user', path: '/pages-settings' },
  { label: 'Settings', icon: 'lucide--settings', path: '/pages-settings' },
  { label: 'Help', icon: 'lucide--help-circle', path: '/pages-get-help' }
];

// Today's notifications
const todayNotifications = ref<NotificationType[]>([
  {
    id: '1',
    message: 'Customer has requested a return for item',
    time: '1 Hour ago',
    avatar: '/images/avatars/4.png',
    senderName: 'User 4',
    read: false
  },
  {
    id: '2',
    message: 'A new review has been submitted for product',
    time: '1 Hour ago',
    avatar: '/images/avatars/5.png',
    senderName: 'User 5',
    read: false
  }
]);

// Previous notifications
const previousNotifications = ref<NotificationType[]>([
  {
    id: '3',
    message: 'Prepare for the upcoming weekend promotion',
    time: '2 Days ago',
    avatar: '/images/avatars/1.png',
    senderName: 'User 1',
    read: true
  },
  {
    id: '4',
    message: "Product 'ABC123' is running low in stock.",
    time: '3 Days ago',
    avatar: '/images/avatars/2.png',
    senderName: 'User 2',
    read: true
  },
  {
    id: '5',
    message: 'Payment received for Order ID: #67890',
    time: 'Week ago',
    avatar: '/images/avatars/3.png',
    senderName: 'User 3',
    read: true
  }
]);

/**
 * Opens the search modal
 */
const openSearchModal = () => {
  searchModalRef.value?.showModal();
};

/**
 * Sets the theme
 * @param {string} theme - Theme to set
 */
const setTheme = (theme: string) => {
  if (theme === 'system') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  // Save to localStorage for persistence
  localStorage.setItem('theme', theme);
};

/**
 * Handle search action clicks
 * @param {Object} action - The action object
 */
const handleAction = (action: any) => {
  console.log('Action clicked:', action.action);
  searchModalRef.value?.close();
  // Implement action handling logic
};

/**
 * Navigate to the specified path
 * @param {string} path - Path to navigate to
 */
const navigateTo = (path: string) => {
  // Using programmatic navigation
  console.log('Navigating to:', path);
  searchModalRef.value?.close();
  // Implement navigation logic
};

/**
 * Handle notification click
 * @param {NotificationType} notification - The notification that was clicked
 */
const handleNotification = (notification: NotificationType) => {
  console.log('Notification clicked:', notification.id);
  notification.read = true;
};

/**
 * Mark all notifications as read
 */
const markAllAsRead = () => {
  todayNotifications.value.forEach(notification => {
    notification.read = true;
  });
  previousNotifications.value.forEach(notification => {
    notification.read = true;
  });
};

/**
 * View all notifications
 */
const viewAllNotifications = () => {
  console.log('View all notifications clicked');
  // Implement navigate to notifications page
};

/**
 * Switch user account
 */
const switchAccount = () => {
  console.log('Switch account clicked');
  // Implement account switching logic
};

/**
 * Logout the current user
 */
const logout = () => {
  console.log('Logout clicked');
  // Implement logout logic
};
</script>
