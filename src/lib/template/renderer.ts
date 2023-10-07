import { Eta } from "eta"
import path from "path"
import logger from "@/utils/logger"

const eta = new Eta({ views: path.resolve(process.cwd(), "src/lib/template/templates") })

export const renderTemplate = (template: string, data: object = {}) => {
  const result = eta.render(template, data)

  logger.debug({ event: "render-template", data: result })

  return result
}
