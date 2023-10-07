import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
// import { createInstallationAlarmSchema } from "@/contexts/installation_alarm/validation-schema"
import { ZodError } from "zod"
import { unauthorized } from "../helpers"


// export async function GET(request: NextRequest) {
//   const user = await getCurrentUser()

//   if (user === undefined) {
//     return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
//   }

//   const params = schema.parse(Object.fromEntries(request.nextUrl.searchParams))

//   const installationAlarms = await findInstallationAlarms(params)

//   return NextResponse.json(installationAlarms, { status: 200 });
// }

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (user === undefined) {
      return unauthorized()
    }


    // const params = createInstallationAlarmSchema.parse(await request.json())

    // const installationAlarm = await createInstallationAlarm({
    //   ...params,
    //   solicitingCompanyId: user.companyCode,
    //   createdBy: user.id,
    //   status: 1,
    //   type: parseInt(params.type) as InstallationAlarmWorkType,
    //   gasType: parseInt(params.gasType) as GasType,
    //   housingType: parseInt(params.housingType) as HousingType,
    //   phoneNumberType: parseInt(params.phoneNumberType) as PhoneNumberType,
    //   oneOrBulk: parseInt(params.oneOrBulk) as OneOrBulkType,
    // })

    return NextResponse.json({}, { status: 201 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
