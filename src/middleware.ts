import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { JWT_SECRET } from './app/constants/constants'
import { jwtVerify } from 'jose';


export async function middleware(request: NextRequest) {

  const token = request.cookies.get('token')?.value as string

  const nextUrlMatcher = (next: string) => {
    const nextUrl = request.nextUrl.pathname;
    return nextUrl.startsWith(next)
  }

  const verifiedToken = token && 
  (await jwtVerify(token, new TextEncoder().encode(JWT_SECRET)).catch(() => {}))

  if((nextUrlMatcher('/login') || nextUrlMatcher('/register')) && !verifiedToken){
    return 
  }

  if((nextUrlMatcher('/login') || nextUrlMatcher('/register')) && verifiedToken){
    return NextResponse.redirect(new URL('/espacio', request.url))
  }

  if(!verifiedToken){
    return NextResponse.redirect(new URL('/login', request.url))
  }

}

export const config = {
  matcher: ['/login', '/register', '/espacio/:path*', '/', '/boards']
}
