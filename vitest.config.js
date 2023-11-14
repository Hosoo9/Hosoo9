import { defineConfig } from "vitest/config"
import { fileURLToPath, URL } from "url"


process.env.URSULA_DB_URL="sqlserver://localhost:1433;database=ariel_db_test;user=sa;password=Password123;encrypt=True;trustServerCertificate=true"

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
