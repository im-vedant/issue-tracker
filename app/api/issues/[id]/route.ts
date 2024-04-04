import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { issueSchema, patchIssueSchema } from "@/app/validationSchema";
import AuthOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
export async function PATCH (req : NextRequest, {params} : {params : {id : string}}){
   
    const session =await getServerSession(AuthOptions)
    if(!session)
    return NextResponse.json({},{status : 401})

const body = await req.json()
const validation= patchIssueSchema.safeParse(body)
 if(!validation.success)
 {
    return NextResponse.json(validation.error.errors , {status : 400})
 }
if(body.assignedToId){
   const user =await  prisma.user.findUnique({
        where :{
            id : body.assignedToId ,
        }
    })
    if(!user)
    return NextResponse.json({error : "Invalid User"},{ status : 400})   
}
 const issue =await prisma.issue.findUnique({
    where : {
        id : parseInt(params.id)
    }
 })
if(!issue)
return NextResponse.json({error : "Invalid Issue"},{ status : 404})
const updatedIssue=await prisma.issue.update({
    where : {
        id : issue.id
    },
    data : {
        title : body.title,
        description : body.description,
        assignedToId : body.assignedToId,
        status : body.status
    }
})
 return NextResponse.json( updatedIssue, { status : 201})

}
export async function DELETE (req : NextRequest, {params} : {params : {id : string}}){
    const session =await getServerSession(AuthOptions)
    if(!session)
    return NextResponse.json({},{status : 401})
     const issue =await prisma.issue.findUnique({
        where : {
            id : parseInt(params.id)
        }
     })
    if(!issue)
    return NextResponse.json({error : "Invalid Issue"},{ status : 404})
    
    await prisma.issue.delete({
        where : {
            id : issue.id
        }
    })
     return NextResponse.json( { status : 200})
    
    }