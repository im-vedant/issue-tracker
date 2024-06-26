import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { issueSchema } from "../../validationSchema";
import { getServerSession } from "next-auth";
import AuthOptions from "@/app/auth/authOptions";
export async function POST (req : NextRequest){
   const session =await getServerSession(AuthOptions)
   if(!session)
   return NextResponse.json({},{status : 401})
const body = await req.json()

const validation= issueSchema.safeParse(body)
 if(!validation.success)
 {
    return NextResponse.json(validation.error.errors , {status : 400})
 }

 const newIssue =await prisma.issue.create({
    data :{
        title : body.title,
        description : body.description,
        createdById: session!.user!.email!
    }
 })

 return NextResponse.json( newIssue, { status : 201})

}