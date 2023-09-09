import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {

  const cookies = request.cookies.get('token')?.value

  if(!cookies){
    if(request.nextUrl.pathname.startsWith("/espacio")){
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }else{
    if(request.nextUrl.pathname.includes("login")){
      return NextResponse.redirect(new URL("/espacio", request.url))
    }
  }
}