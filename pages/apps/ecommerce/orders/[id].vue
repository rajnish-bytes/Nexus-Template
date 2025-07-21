<template>
  <div>
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-medium">Order Detail</h3>
      <div class="breadcrumbs hidden p-0 text-sm sm:inline">
        <ul>
          <li><NuxtLink to="/dashboards/ecommerce">Nexus</NuxtLink></li>
          <li><NuxtLink to="/apps/ecommerce/orders">Orders</NuxtLink></li>
          <li class="opacity-80">Detail</li>
        </ul>
      </div>
    </div>
    
    <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div class="lg:col-span-8 2xl:col-span-9">
        <div class="card card-border bg-base-100">
          <div class="card-body p-0">
            <div class="px-5 pt-5">
              <div class="flex justify-between">
                <div class="space-x-2">
                  <span class="text-2xl font-medium">#{{ order.id }}</span>
                  <span class="text-base-content/70 hidden text-sm sm:inline">
                    {{ order.date }} at {{ order.time }}
                  </span>
                </div>
                <button class="btn btn-sm btn-outline border-base-300">
                  <span class="iconify lucide--scroll-text size-3.5"></span>
                  Invoice
                </button>
              </div>
            </div>
            
            <div class="mt-5 overflow-auto">
              <table class="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order.items" :key="item.id">
                    <th class="font-medium">{{ item.id }}</th>
                    <td>
                      <div class="flex items-center space-x-3 truncate">
                        <img alt="Product" class="size-10 rounded" :src="item.image" />
                        <div>
                          <p class="font-medium">{{ item.name }}</p>
                          <p class="text-base-content/60 text-xs">#{{ item.code }}</p>
                        </div>
                      </div>
                    </td>
                    <td>{{ item.category }}</td>
                    <td>${{ item.price }}</td>
                    <td>{{ item.quantity }}x</td>
                    <td class="font-medium">${{ item.amount }}</td>
                  </tr>
                  <tr class="font-medium">
                    <td colspan="5" class="text-end">Sub Total</td>
                    <td>${{ order.subtotal }}</td>
                  </tr>
                  <tr class="font-medium">
                    <td colspan="5" class="text-end">Tax</td>
                    <td>+ ${{ order.tax }}</td>
                  </tr>
                  <tr class="text-success font-medium">
                    <td colspan="5" class="text-end">Discount</td>
                    <td class="text-success">- ${{ order.discount }}</td>
                  </tr>
                  <tr class="text-lg">
                    <td colspan="5" class="text-end font-medium">Total</td>
                    <td class="font-semibold">${{ order.total }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div class="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-3">
          <div>
            <div class="card card-border bg-base-100">
              <div class="card-body">
                <p class="bg-base-200 rounded-box px-3 py-2 font-medium">Payment Information</p>
                <div class="mt-3 flex gap-3">
                  <span class="iconify lucide--credit-card size-6"></span>
                  <div class="grow">
                    <p class="font-medium">{{ order.payment.cardNumber }}</p>
                    <p class="text-base-content/80 text-sm">{{ order.payment.expiry }}</p>
                  </div>
                  <div class="badge badge-success badge-sm badge-dash">{{ order.payment.status }}</div>
                </div>
                <div class="mt-2 text-end">
                  <button class="btn btn-primary btn-soft btn-sm">
                    <span class="iconify lucide--arrow-left-right size-4"></span>
                    Transactions
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div class="card card-border bg-base-100">
              <div class="card-body">
                <p class="bg-base-200 rounded-box px-3 py-2 font-medium">Customer Details</p>
                <div class="mt-3 flex items-center gap-3">
                  <img class="bg-base-200 mask mask-squircle size-10 p-0.5" alt="" :src="order.customer.avatar" />
                  <div class="grow">
                    <p class="font-medium">{{ order.customer.name }}</p>
                    <p class="text-base-content/80 text-sm">{{ order.customer.email }}</p>
                  </div>
                </div>
                <div class="mt-2 flex items-center justify-end gap-1">
                  <button aria-label="call a customer" class="btn btn-ghost btn-sm btn-circle">
                    <span class="iconify lucide--phone size-4"></span>
                  </button>
                  <button aria-label="mail to customer" class="btn btn-ghost btn-sm btn-circle">
                    <span class="iconify lucide--mail size-4"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div class="card card-border bg-base-100">
              <div class="card-body">
                <p class="bg-base-200 rounded-box px-3 py-2 font-medium">Delivery Address</p>
                <div class="mt-3 flex gap-3">
                  <span class="iconify lucide--map-pin size-6"></span>
                  <div class="grow">
                    <p class="font-medium">{{ order.address.street }}</p>
                    <p class="text-base-content/80 text-sm">{{ order.address.city }}</p>
                  </div>
                </div>
                <div class="mt-2 text-end">
                  <button class="btn btn-primary btn-soft btn-sm">
                    <span class="iconify lucide--map size-4"></span>
                    View on Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="lg:col-span-4 2xl:col-span-3">
        <div class="card card-border bg-base-100">
          <div class="card-