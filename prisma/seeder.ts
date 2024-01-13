import { usePostSeeder } from "./seeders/post.seeder.ts"

(async function () {

    // all database seeder
    await usePostSeeder()
})()