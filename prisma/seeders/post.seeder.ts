import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker"

// Parsed model
const { post: Post } = new PrismaClient()

export const usePostSeeder = async () => {

    console.log("running post seeder ...")

    // samples
    const samples = []

    for (let i = 0; i < 100; i++) {
        samples.push({
            title: faker.lorem.lines(2),
            body: faker.lorem.paragraphs(25),
            published: true
        })
    }

    await Post.createMany({
        data: samples
    })
}