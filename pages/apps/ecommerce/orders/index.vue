<template>
  <div>
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-medium">Orders</h3>
      <div class="breadcrumbs hidden p-0 text-sm sm:inline">
        <ul>
          <li><NuxtLink to="/dashboards/ecommerce">Nexus</NuxtLink></li>
          <li>Ecommerce</li>
          <li class="opacity-80">Orders</li>
        </ul>
      </div>
    </div>

    <div class="mt-6">
      <div class="card bg-base-100 mt-5 shadow">
        <div class="card-body p-0">
          <div class="flex items-center justify-between px-5 pt-5">
            <div class="inline-flex items-center gap-3">
              <label class="input input-sm">
                <span
                  class="iconify lucide--search text-base-content/80 size-3.5"
                ></span>
                <input
                  class="w-24 sm:w-36"
                  placeholder="Search along orders"
                  aria-label="Search orders"
                  type="search"
                />
              </label>
              <div class="hidden sm:block">
                <select class="select select-sm w-36" aria-label="Category">
                  <option value="" disabled selected>Select Category</option>
                  <option>Fashion</option>
                  <option>Daily Need</option>
                  <option>Cosmetic</option>
                  <option>Electronics</option>
                  <option>Food</option>
                </select>
              </div>
            </div>
            <NuxtLink class="btn btn-sm btn-primary" to="/dashboards/ecommerce">
              <span class="iconify lucide--monitor-dot size-4"></span>
              <span class="hidden sm:inline">Dashboard</span>
            </NuxtLink>
          </div>

          <div class="mt-4 overflow-auto">
            <table class="table">
              <thead>
                <tr>
                  <th class="px-6">
                    <input
                      aria-label="Check all"
                      class="checkbox checkbox-sm"
                      type="checkbox"
                    />
                  </th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Customer</th>
                  <th>Price</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Ordered At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="order in orders"
                  :key="order.id"
                  class="hover:bg-base-200/40 cursor-pointer *:text-nowrap"
                >
                  <th class="px-6">
                    <input
                      :aria-label="`Select order ${order.id}`"
                      class="checkbox checkbox-sm"
                      type="checkbox"
                    />
                  </th>
                  <td class="font-medium">{{ order.id }}</td>
                  <td>{{ order.items }}</td>
                  <td>{{ order.customer }}</td>
                  <td class="text-sm font-medium">${{ order.price }}</td>
                  <td>
                    <div
                      :class="`badge badge-soft ${
                        order.isPaid ? 'badge-success' : 'badge-error'
                      }`"
                    >
                      {{ order.isPaid ? "Paid" : "Pending" }}
                    </div>
                  </td>
                  <td class="text-sm">{{ order.status }}</td>
                  <td class="text-sm">{{ order.date }}</td>
                  <td>
                    <NuxtLink
                      :aria-label="`View order ${order.id}`"
                      :to="`/apps/ecommerce/orders/${order.id}`"
                    >
                      <button
                        :aria-label="`View order ${order.id}`"
                        class="btn btn-square btn-ghost btn-sm"
                      >
                        <span
                          class="iconify lucide--eye text-base-content/80 size-4"
                        ></span>
                      </button>
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex items-center justify-between p-6">
            <div
              class="text-base-content/80 hover:text-base-content flex gap-2 text-sm"
            >
              <span class="hidden sm:inline">Per page</span>
              <select class="select select-xs w-18" aria-label="Per page">
                <option value="10">10</option>
                <option value="20" selected>20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <span class="text-base-content/80 hidden text-sm lg:inline">
              Showing
              <span class="text-base-content font-medium">1 to 20</span>
              of 457 items
            </span>
            <div class="inline-flex items-center gap-1">
              <button
                class="btn btn-circle sm:btn-sm btn-xs btn-ghost"
                aria-label="Prev"
              >
                <span class="iconify lucide--chevron-left"></span>
              </button>
              <button class="btn btn-primary btn-circle sm:btn-sm btn-xs">
                1
              </button>
              <button class="btn btn-ghost btn-circle sm:btn-sm btn-xs">
                2
              </button>
              <button class="btn btn-ghost btn-circle sm:btn-sm btn-xs">
                3
              </button>
              <button
                class="btn btn-circle sm:btn-sm btn-xs btn-ghost"
                aria-label="Next"
              >
                <span class="iconify lucide--chevron-right"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Sample order data
const orders = ref([
  {
    id: "#21001",
    items: "5 Items",
    customer: "Emily Johnson",
    price: "342",
    isPaid: true,
    status: "Ordered",
    date: "29 May 2024",
  },
  {
    id: "#21002",
    items: "3 Items",
    customer: "Alex Thompson",
    price: "578",
    isPaid: true,
    status: "Accepted",
    date: "29 Sep 2023",
  },
  {
    id: "#21003",
    items: "6 Items",
    customer: "Sarah Davis",
    price: "215",
    isPaid: false,
    status: "On the Way",
    date: "29 Jan 2024",
  },
  {
    id: "#21004",
    items: "2 Items",
    customer: "Michael Wilson",
    price: "769",
    isPaid: false,
    status: "Delivered",
    date: "29 Jul 2023",
  },
  {
    id: "#21005",
    items: "7 Items",
    customer: "Jessica Miller",
    price: "431",
    isPaid: true,
    status: "Accepted",
    date: "29 Apr 2024",
  },
  {
    id: "#21006",
    items: "1 Items",
    customer: "Brian Anderson",
    price: "622",
    isPaid: true,
    status: "Ordered",
    date: "29 Nov 2023",
  },
  {
    id: "#21007",
    items: "4 Items",
    customer: "Olivia Smith",
    price: "894",
    isPaid: false,
    status: "On the way",
    date: "29 Mar 2024",
  },
  {
    id: "#21008",
    items: "7 Items",
    customer: "Daniel Robinson",
    price: "156",
    isPaid: true,
    status: "Delivered",
    date: "29 Oct 2023",
  },
  {
    id: "#21009",
    items: "1 Items",
    customer: "Emma Garcia",
    price: "497",
    isPaid: false,
    status: "Ordered",
    date: "29 Jun 2024",
  },
  {
    id: "#21010",
    items: "3 Items",
    customer: "Christopher Baker",
    price: "783",
    isPaid: true,
    status: "Accepted",
    date: "29 Dec 2023",
  },
]);
</script>
