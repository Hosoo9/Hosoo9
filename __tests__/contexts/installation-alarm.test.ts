// import { afterEach, beforeEach, test, vi, expect, describe } from "vitest"
// import { disconnect, reset } from "../setup-helpers"
// import { POST as createInstallationAlarm } from "@/app/api/installation-alarm/route"
// // import { PUT as updateInstallationAlarm } from "@/app/api/installation_alarm/[code]/route"
// import * as sessionLib from "@/lib/session"
// import factories from "../factories"

// vi.mock("@/lib/session")

// const mockedRequest = { json: vi.fn(), nextUrl: { searchParams: new URLSearchParams() } }

// const getCurrentUserMock = () =>
//   Promise.resolve({ id: "1", role: 1, email: "technician@garudahashira.com" })

// beforeEach(async () => {
//   await reset()
// })

// afterEach(async () => {
//   vi.resetAllMocks()
//   vi.useRealTimers()
//   await disconnect()
// })

// test("createInstallationAlarm", async () => {
//   vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getCurrentUserMock)

//   mockedRequest.json.mockReturnValue({
//     type: "1",
//     applicationDate: new Date().toISOString(),
//     // createdBy: string
//     gasType: "1",
//     postalCode: "1234567",
//     municipality: "Tokyo city",
//     address: "Tokyo street",
//     housingType: "1",
//     buildingNameRoomNumber: "Tokyo building",
//     name: "Tokyo name",
//     phoneNumber: "123456789",
//     phoneNumberType: "1",
//     oneOrBulk: "1",
//     paymentType: "1",
//     contractDate: new Date().toISOString(),
//   })

//   const result = await createInstallationAlarm(mockedRequest as any)

//   expect(result.status).toBe(201)
// })

// test("updateInstallationAlarm", async () => {
//   vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getCurrentUserMock)

//   const user = await factories.userFactory.create()
//   const installationAlarm = await factories.installationAlarmFactory.create({ createdBy: user.id })

//   mockedRequest.json.mockReturnValue({
//     type: "1",
//     applicationDate: new Date().toISOString(),
//     // createdBy: string
//     gasType: "1",
//     postalCode: "1234567",
//     municipality: "Tokyo city",
//     address: "Tokyo street",
//     housingType: "1",
//     buildingNameRoomNumber: "Tokyo building",
//     name: "Tokyo name",
//     phoneNumber: "99",
//     phoneNumberType: "1",
//     oneOrBulk: "1",
//     paymentType: "1",
//     contractDate: new Date().toISOString(),
//   })

//   const result = await updateInstallationAlarm(mockedRequest as any, {
//     params: { code: installationAlarm.code },
//   })

//   expect(result.status).toBe(200)
//   expect((await result.json()).phoneNumber).toBe("99")
// })

// // describe("find installationAlarm", async () => {
// //   beforeEach(async () => {
// //     vi.spyOn(sessionLib, "getCurrentUser").mockImplementation(getCurrentUserMock)

// //     const user = await factories.userFactory.create()
// //     const installationAlarm = await factories.installationAlarmFactory.create({
// //       createdBy: user.id,
// //       address: "some address",
// //       desiredDate: new Date("2023-05-02")
// //     })
// //   })

// //   test("find installationAlarms", async () => {
// //     mockedRequest.nextUrl.searchParams.set("page", "1")
// //     mockedRequest.nextUrl.searchParams.set("limit", "10")

// //     const result = await findInstallationAlarms(mockedRequest as any)

// //     expect(result.status).toBe(200)
// //     const body = await result.json()

// //     expect(body.length).toBe(1)
// //   })

// //   test("address filter", async () => {
// //     mockedRequest.nextUrl.searchParams.set("address", "some")

// //     const result = await findInstallationAlarms(mockedRequest as any)

// //     expect(result.status).toBe(200)
// //     const body = await result.json()

// //     expect(body.length).toBe(1)
// //   })

// //   test("status filter", async () => {
// //     mockedRequest.nextUrl.searchParams.set("status", "1")

// //     const result = await findInstallationAlarms(mockedRequest as any)

// //     expect(result.status).toBe(200)
// //     const body = await result.json()

// //     expect(body.length).toBe(1)
// //   })

// //   test("desiredDate filter", async () => {
// //     mockedRequest.nextUrl.searchParams.set("desiredDate", "2023-05-02")

// //     const result = await findInstallationAlarms(mockedRequest as any)

// //     expect(result.status).toBe(200)
// //     const body = await result.json()

// //     expect(body.length).toBe(1)
// //   })
// // })
