<template>
  <div>
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-medium">Products</h3>
      <div class="breadcrumbs hidden p-0 text-sm sm:inline">
        <ul>
          <li><NuxtLink to="/dashboards/ecommerce">Nexus</NuxtLink></li>
          <li>Ecommerce</li>
          <li class="opacity-80">Products</li>
        </ul>
      </div>
    </div>

    <div class="mt-6">
      <div class="bg-base-100 card shadow">
        <div class="card-body p-0">
          <div class="flex items-center justify-between px-5 pt-5">
            <div class="inline-flex items-center gap-3">
              <label class="input input-sm">
                <span
                  class="iconify lucide--search text-base-content/80 size-3.5"
                ></span>
                <input
                  class="w-24 sm:w-36"
                  placeholder="Search along products"
                  aria-label="Search products"
                  type="search"
                />
              </label>
              <div class="hidden sm:block">
                <select
                  class="select select-sm w-36"
                  aria-label="Select category"
                >
                  <option value="" disabled selected>Select Category</option>
                  <option>Fashion</option>
                  <option>Daily Need</option>
                  <option>Cosmetic</option>
                  <option>Electronics</option>
                  <option>Food</option>
                </select>
              </div>
            </div>
            <div class="inline-flex items-center gap-3">
              <NuxtLink
                aria-label="Create product link"
                class="btn btn-primary btn-sm max-sm:btn-square"
                to="/apps/ecommerce/products/create"
              >
                <span class="iconify lucide--plus size-4"></span>
                <span class="hidden sm:inline">New Product</span>
              </NuxtLink>
              <div class="dropdown dropdown-bottom dropdown-end">
                <div
                  tabindex="0"
                  role="button"
                  class="btn btn-ghost border-base-300 btn-sm btn-square"
                  aria-label="More option"
                >
                  <span class="iconify lucide--settings-2 size-4"></span>
                </div>
                <div
                  tabindex="0"
                  class="dropdown-content bg-base-100 rounded-box z-1 w-52 shadow"
                >
                  <ul class="menu w-full p-2">
                    <li>
                      <div>
                        <span class="iconify lucide--wand size-4"></span>
                        Bulk Actions
                      </div>
                    </li>
                  </ul>
                  <hr class="border-base-300" />
                  <ul class="menu w-full p-2">
                    <li>
                      <div>
                        <span
                          class="iconify lucide--download-cloud size-4"
                        ></span>
                        Import from Store
                      </div>
                    </li>
                    <li>
                      <div>
                        <span class="iconify lucide--copy-plus size-4"></span>
                        Create from Existing
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 overflow-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>
                    <input
                      aria-label="Check all"
                      class="checkbox checkbox-sm"
                      type="checkbox"
                    />
                  </th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Ratings</th>
                  <th>Orders</th>
                  <th>Stock</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="product in products"
                  :key="product.id"
                  class="hover:bg-base-200/40 cursor-pointer *:text-nowrap"
                >
                  <th>
                    <input
                      aria-label="Single check"
                      class="checkbox checkbox-sm"
                      type="checkbox"
                    />
                  </th>
                  <td>{{ product.id }}</td>
                  <td>
                    <div class="flex items-center space-x-3 truncate">
                      <img
                        alt="Product"
                        class="rounded-box size-10"
                        :src="product.image"
                      />
                      <div>
                        <p class="font-medium">{{ product.name }}</p>
                        <p class="text-base-content/60 text-xs">
                          #{{ product.code }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>{{ product.category }}</td>
                  <td class="text-sm font-medium">${{ product.price }}</td>
                  <td>
                    <div class="flex items-center gap-2">
                      <span
                        :class="`iconify lucide--star ${getRatingColorClass(
                          product.rating
                        )} size-4`"
                      ></span>
                      {{ product.rating }}
                      <span class="text-base-content/60 text-xs"
                        >({{ product.reviews }})</span
                      >
                    </div>
                  </td>
                  <td>{{ product.orders }}</td>
                  <td>
                    <span
                      :class="product.inStock ? 'text-success' : 'text-error'"
                    >
                      {{ product.inStock ? "Available" : "Out of stock" }}
                    </span>
                  </td>
                  <td class="text-sm">{{ product.createdAt }}</td>
                  <td>
                    <div class="inline-flex">
                      <NuxtLink
                        aria-label="Edit product link"
                        class="btn btn-square btn-ghost btn-sm"
                        :to="`/apps/ecommerce/products/edit?id=${product.id}`"
                      >
                        <span
                          class="iconify lucide--pencil text-base-content/80 size-4"
                        ></span>
                      </NuxtLink>
                      <button
                        aria-label="Show product"
                        class="btn btn-square btn-ghost btn-sm"
                      >
                        <span
                          class="iconify lucide--eye text-base-content/80 size-4"
                        ></span>
                      </button>
                      <button
                        aria-label="Delete product"
                        @click="showDeleteModal"
                        class="btn btn-square btn-error btn-outline btn-sm border-transparent"
                      >
                        <span class="iconify lucide--trash size-4"></span>
                      </button>
                    </div>
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

      <!-- Delete Modal -->
      <dialog id="apps_product_delete" class="modal" ref="deleteModal">
        <div class="modal-box">
          <div class="flex items-center justify-between text-lg font-medium">
            Confirm Delete
            <form method="dialog">
              <button
                class="btn btn-sm btn-ghost btn-circle"
                aria-label="Close modal"
              >
                <span class="iconify lucide--x size-4"></span>
              </button>
            </form>
          </div>
          <p class="py-4">
            You are about to delete this product. Would you like to proceed
            further?
          </p>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn btn-ghost btn-sm">No</button>
            </form>
            <form method="dialog">
              <button class="btn btn-sm btn-error">Yes, delete it</button>
            </form>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  </div>
</template>

<script setup>
const deleteModal = ref(null);

// Sample product data
const products = ref([
  {
    id: "1001",
    name: "Men's tracking shoes",
    code: "SHOES",
    category: "Fashion",
    price: "29",
    rating: 4.7,
    reviews: 130,
    orders: 10,
    inStock: true,
    createdAt: "30 Nov 2024",
    image: "/images/apps/ecommerce/products/1.jpg",
  },
  {
    id: "1002",
    name: "Coco body oil",
    code: "COCOOIL",
    category: "Daily Need",
    price: "16",
    rating: 4.2,
    reviews: 547,
    orders: 15,
    inStock: true,
    createdAt: "30 Nov 2024",
    image: "/images/apps/ecommerce/products/2.jpg",
  },
  {
    id: "1003",
    name: "Freeze air",
    code: "FREEAIR",
    category: "Cosmetic",
    price: "32",
    rating: 3.8,
    reviews: 862,
    orders: 25,
    inStock: true,
    createdAt: "30 Jul 2024",
    image: "/images/apps/ecommerce/products/3.jpg",
  },
  {
    id: "1004",
    name: "Men's sports shoes",
    code: "SPORTS",
    category: "Fashion",
    price: "32",
    rating: 2.9,
    reviews: 861,
    orders: 10,
    inStock: false,
    createdAt: "30 Jan 2024",
    image: "/images/apps/ecommerce/products/4.jpg",
  },
  {
    id: "1005",
    name: "Gamepad",
    code: "GAME01",
    category: "Electronics",
    price: "59",
    rating: 4.1,
    reviews: 96,
    orders: 42,
    inStock: true,
    createdAt: "30 Oct 2024",
    image: "/images/apps/ecommerce/products/5.jpg",
  },
]);

// Get class for rating color based on rating value
const getRatingColorClass = (rating) => {
  if (rating >= 4) return "text-success";
  if (rating >= 3) return "text-warning";
  return "text-error";
};

const showDeleteModal = () => {
  deleteModal.value.showModal();
};
</script>
