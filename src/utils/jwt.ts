import config from "@/config"
import crypto from "crypto"
import jwt from "jsonwebtoken"

export const signJwt = (payload: object, jwtOptions: jwt.SignOptions) => {
  const defaultClaims = {
    jwtid: crypto.randomBytes(16).toString("hex"),
  }

  return jwt.sign(payload, config.jwtSecret, { ...defaultClaims, ...jwtOptions })
}

export const verifyJwt = (token: string, verifyOptions: jwt.VerifyOptions) => {
  return jwt.verify(token, config.jwtSecret, verifyOptions)
}
