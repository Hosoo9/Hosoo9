import { unauthorized } from "@/app/api/helpers"
import { changeState, findOperation } from "@/contexts/operation"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { ZodError, z } from "zod"

// const completeOperationSchema = z.object({
//   contractDate: z.coerce.date(),
//   branchType: z.coerce.number(),
//   supplyType: z.coerce.number(),
//   buildingType: z.coerce.number(),
//   facilityType: z.coerce.number(),
//   signature: z.any(),
// })

const completeOperationSchema = z.object({})

export async function POST(
  request: NextRequest,
  { params }: { params: { code: string } },
) {
  try {
    const user = await getCurrentUser()

    if (
      user === undefined
      // (await enforce(user.id, "operation", "operate")) === false
    ) {
      return unauthorized()
    }

    const operation = await findOperation(params.code)

    if (![3, 5].includes(operation?.status || 0)) {
      return NextResponse.json(
        {
          error: `Current operation status can't be completed, current status is ${operation?.status}`,
        },
        { status: 400 },
      )
    }

    // const formPayload = Object.fromEntries(await request.formData())
    const formPayload = request.body

    const body = completeOperationSchema.parse(formPayload)

    // const signature = body.signature as File

    // await saveFile(operation?.code + "-" + crypto.randomUUID(), signature)

    const updated = await changeState(params.code, 6)
    // const updated = await completeOperation(params.code, {
    //   branchType: body.branchType,
    //   buildingType: body.buildingType,
    //   contractDate: body.contractDate,
    //   facilityType: body.facilityType,
    //   supplyType: body.supplyType,
    // })

    return NextResponse.json(updated, { status: 200 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
