<template>
    <li class="border-b border-gray-700 pb-8 mb-3">

        <!-- title wrapper -->
        <div class="mb-3">
            <small class="text-gray-400">{{ new Date(post.createdAt).toLocaleDateString("id") }}</small>
            <p class="text-gray-300 text-xl">{{ post.title }}</p>
        </div>

        <!-- body wrapper -->
        <div :class="{ 'h-[4.5rem]': !isReadMore }" class="overflow-hidden">
            <p class="text-gray-300">{{ post.body }}</p>
        </div>

        <!-- read more toggler -->
        <small @click="isReadMore = !isReadMore" class="text-green-500 cursor-pointer">
            {{ isReadMore ? 'Minimize' : 'Read more' }}
        </small>
    </li>
</template>

<script lang="ts" setup>

import type { Post } from '@prisma/client'

// initial
defineProps({
    post: {
        type: Object as () => Post,
        required: true
    }
})

const isReadMore = ref<boolean>(false)

</script>