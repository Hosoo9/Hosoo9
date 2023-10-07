import config from "@/config"
import * as fs from "fs"
import { writeFile } from "fs/promises"
import mime from "mime-types"

export const UPLOAD_PATH = config.uploadFilePath

let retryCount = 0

export const saveFile = async (fileName: string, file: File) => {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  try {
    const result = await writeFile(
      UPLOAD_PATH + "/" + fileName + "." + mime.extension(file.type),
      buffer,
    )

    retryCount = 0

    return result
  } catch (e) {
    if (e instanceof Error) {
      if (e instanceof Error && e.message.includes("ENOENT")) {
        // Handle a specific case for this missing file.
        createTmpFolder("ariel")

        if (retryCount < 3) {
          retryCount++
          saveFile(fileName, file)
        }
      } else {
        // Handle other errors if needed
        console.error("Another error occurred:", e.message)
      }
    }
  }
}

const createTmpFolder = (folderName: string) => {
  const folderPath = UPLOAD_PATH

  try {
    // Check if the folder already exists
    if (!fs.existsSync(folderPath)) {
      // If it doesn't exist, create the folder
      fs.mkdirSync(folderPath)
      console.log(
        `Folder '${folderName}' created in the temporary directory: ${folderPath}`,
      )
    } else {
      console.log(
        `Folder '${folderName}' already exists in the temporary directory: ${folderPath}`,
      )
    }
  } catch (error) {
    console.error("Error creating folder:", error)
  }
}
