import "dotenv/config"
import { prisma } from "./lib/prisma"

async function main() {
    await prisma.$connect()

    console.log("Successfully connected to Neon PostgresSQL!")

    await prisma.$disconnect()
}

main().catch(error => {
    console.error("Database connection failed: ", error)
    process.exit(1)
})