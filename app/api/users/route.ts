import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
export  async function GET(req : NextRequest){
    cookies()
   const users=await  prisma.user.findMany(
        {
            orderBy : {name : 'asc'}
        }
    )
    return NextResponse.json(users)
}