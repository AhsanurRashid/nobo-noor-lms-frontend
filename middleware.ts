import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import getUserAction from "@/app/actions/user/getUser.action";

// ✅ Replace with your actual secret
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// 🔐 Function to verify JWT
async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const path = request.nextUrl.pathname;
  const user = await getUserAction();
  const isAdmin = user?.user?.role === "admin" || user?.user?.role === "instructor";

  const isAuth = token && await verifyJWT(token);

  const isAuthPage = path === "/login" || path === "/register" || path === "/forget-password" || path.startsWith("/reset-password");
  const isProtectedPage = path.startsWith("/course") || path.startsWith("/profile");
  const adminOnlyPage = path.startsWith("/admin");

  if (isAuth && isAuthPage) {
    // Already logged in, prevent visiting login/register
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isAuth && isProtectedPage) {
    // Not logged in, protect Protected Pages
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if(!isAdmin && adminOnlyPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }


  return NextResponse.next(); // Allow access
}

export const config = {
  matcher: [
    "/course/:path*",
    "/profile/:path*",
    "/login",
    "/register",
    "/forget-password",
    "/reset-password/:path*",
    "/admin/:path*",
  ],
};