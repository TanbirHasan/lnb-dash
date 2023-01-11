import { NextResponse } from "next/server"

export default function middleware(req)  {
    //test
    let isVerified = req.cookies.get("token")
    console.log("isVerified ->", isVerified)

    let url = req.url

    console.log("url ->",url)

    // if(!isVerified && url.includes(`${process.env.NEXT_PUBLIC_BASE_URL}/home`) ) {
    //     console.log("exceuting non auth")
    //     return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`)
    // } else 
    if(isVerified && (url.includes("/login") || url.includes("/registration") )){
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/home`)
    }


}
