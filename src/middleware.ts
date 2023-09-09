import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { JWT_SECRET } from './app/constants/constants'
import { jwtVerify } from 'jose';


export async function middleware(request: NextRequest) {

  const token = request.cookies.get('token')?.value as string
  const secret = new TextEncoder().encode(JWT_SECRET);

  const url = request.nextUrl.pathname;

  if (!token && (url != "/login" && url != "/register")) {
    return NextResponse.redirect(new URL("/login", request.url))
  } else if(token && (url != "/login" && url != "/register")){
    try {
      await jwtVerify(token, secret)
      return NextResponse.next()
    } catch {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  } else if(token && (url == "/login" || url == "/register") ) {
    return NextResponse.redirect(new URL("/espacio", request.url))
  } else {
    return NextResponse.next()
  }

}

export const config = { matcher: '/((?!.*\\.).*)' }
