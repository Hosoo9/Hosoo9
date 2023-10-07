import { test, expect } from "vitest"
import { renderTemplate } from "@/lib/template/renderer"

test("render_template", async () => {
  const result = renderTemplate("./simple")

  expect(result.trim()).toBe("Hi Ben!")
})
