import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getServerSession } from "next-auth/next"
import createMiddleware from 'next-intl/middleware';
// import { authOptions } from "./app/api/auth/[...nextauth]/route"

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'jp'],
 
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'jp'
});

// This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions)

//     if (session === null) {
//       return NextResponse.redirect(new URL("/api/auth/signin", request.url))
//     } else {
//       console.log(`-------------session---------------`)
//       console.log(session)
//       console.log(`----------------------------`)
//       return NextResponse.next()
//     }
//   } catch (e) {
//     if (e instanceof Error) {
//       console.log(`-------------e---------------`)
//       console.log(e.stack)
//       console.log(`----------------------------`)
//     }
//   }
// }

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
}
