import { Role } from "@prisma/client";

// nextauth.d.ts
declare module "next-auth" {
  interface User {
    role?: Role;
    companyCode?: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}
