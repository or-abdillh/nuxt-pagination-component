<template>
    <section>
        <nav aria-label="Page navigation example" class="flex flex-col">
            <!-- Help text -->
            <span class="text-sm text-gray-700 dark:text-gray-400">
                Showing <span class="font-semibold text-gray-900 dark:text-white">
                    {{ meta.take * (meta.currentPage - 1) + 1 }}</span>
                to <span class="font-semibold text-gray-900 dark:text-white">
                    {{ (meta.take * (meta.currentPage - 1)) + items.length }}
                </span> of <span class="font-semibold text-gray-900 dark:text-white">
                    {{ meta.totalCount }}</span> Entries
            </span>

            <ul class="inline-flex -space-x-px text-base h-10 mt-3 flex-wrap">
                <!-- previous -->
                <li>
                    <button :disabled="meta.isFirstPage" @click="emits('pagination:navigate', meta.currentPage - 1)"
                        class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed">
                        Previous
                    </button>
                </li>

                <!-- pages -->
                <template v-for="page in meta.pageCount">
                    <li>
                        <button @click="emits('pagination:navigate', page)" aria-current="page"
                            :class="page === meta.currentPage ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white cursor-not-allowed' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'"
                            class="flex items-center justify-center px-4 h-10 leading-tight">
                            {{ page }}
                        </button>
                    </li>
                </template>

                <!-- next -->
                <li>
                    <button :disabled="meta.isLastPage" @click="emits('pagination:navigate', meta.currentPage + 1)"
                        class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed">
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    </section>
</template>

<script setup lang="ts">

import type { PaginateMeta } from '~/types/paginate.type'

defineProps({
    meta: {
        type: Object as () => PaginateMeta,
        required: true
    },
    items: {
        type: Array,
        default: []
    }
})

const emits = defineEmits(["pagination:navigate"])
</script>