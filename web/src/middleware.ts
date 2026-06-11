import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // i18n only applies to the public site; /admin and /api are excluded
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
