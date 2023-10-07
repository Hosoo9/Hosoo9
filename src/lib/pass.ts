import config from "@/config"
import logger from "@/utils/logger"
import bcrypt from "bcrypt"

export const hashPassword = (plainText: string, saltRounds = 10): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        logger.warn(err)
        reject(err)
      }

      bcrypt.hash(plainText, salt, function (err, hash) {
        if (err) {
          logger.warn(err)
          reject(err)
        } else {
          resolve(hash)
        }
      })
    })
  })
}

export const defaultPassword = async (): Promise<string> => {
  return await hashPassword(config.userDefaultPassword)
}
