<template>
    <main class="mx-auto min-h-screen bg-slate-800 py-12">
        <!-- copywriter -->
        <h1 class="text-center text-green-500 text-4xl mb-6">My Articles</h1>

        <!-- container -->
        <section v-if="article" class="lg:w-10/12 mx-auto px-16">
            <!-- tool: per page option -->
            <section class="mb-6 lg:w-3/12">
                <label for="amounts" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Amount article per page
                </label>
                <select v-model="amountOfArticle" @change="getArticles(article.meta.currentPage)" id="amounts"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choose amount</option>
                    <option value="5">5 article</option>
                    <option value="10">10 article</option>
                    <option value="25">25 article</option>
                    <option value="50">50 article</option>
                    <option value="100">100 article</option>
                    <option value="200">200 article</option>
                </select>

            </section>

            <!-- list article -->
            <ul class="mb-6">
                <template v-for="post in article.items">
                    <List :post="post" />
                </template>
            </ul>

            <!-- pagination -->
            <Pagination @pagination:navigate="getArticles" :meta="article.meta" :items="article.items" />
        </section>

        <!-- loading state -->
        <div v-else class="grid place-items-center">
            <small class="text-gray-400">Please wait ...</small>
        </div>
    </main>
</template>

<script setup lang="ts">

import type { Post } from "@prisma/client"
import type { Paginate } from "./types/paginate.type"

// initial 
const article = ref<Paginate<Post>>()
const amountOfArticle = ref<number>(10)

// handler: get articles
const getArticles = async (page: number = 1) => {

    // fetching resource
    const { data, error } = await useFetch(`/api/article?page=${page}&take=${amountOfArticle.value}`, {
        method: "get",
        watch: false
    })

    // success
    if (data.value) {

        // store 
        article.value = JSON.parse(JSON.stringify(data.value.data.article))

        if (article.value) {

            // updating state
            article.value.meta.take = amountOfArticle.value
        }
    }

    // failed
    if (error.value) alert(error.value.message)

}

//
await getArticles()

</script>