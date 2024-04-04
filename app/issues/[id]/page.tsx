import IssueStatusBadge from '@/components/IssueStatusBadge'
import prisma from '@/prisma/db'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import ReactMarkDown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import AuthOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'
import MarkAsClosedButton from './MarkAsClosedButton'

const fetchUser=cache((issueId : number)=>{
  return  prisma.issue.findUnique({where :{id : issueId}})
})
interface Props{
    params :{ id : string}
}
const IssueDetailPage = async ({params} :Props) => {
  const session = await getServerSession(AuthOptions)
  const issue=await fetchUser(parseInt(params.id))
    const issueDetails= await prisma.issue.findUnique({where :{id : parseInt(params.id)}})
    if(!issueDetails)
    notFound()
  return (
    <Grid columns={{ initial : "1" , sm : "5"}} gap="5">
<Box className='md:col-span-4'>
<Heading>{issueDetails.title}</Heading>

<div className='flex gap-3 my-2 flex-row items-center'>
<IssueStatusBadge status={issueDetails.status}></IssueStatusBadge>
<Text>{issueDetails.createdAt.toDateString()}</Text>
</div>
<Card className='prose mt-4 max-w-full'>
<ReactMarkDown>{issueDetails.description}</ReactMarkDown>
</Card>
</Box>{
  issueDetails.status!=='CLOSED' &&session?.user?.email === issueDetails.createdById && <Box >
   <Flex direction='column' gap='4'>
    <AssigneeSelect issue={issueDetails}/>
   <Button >
        <Pencil2Icon/>
      <Link href={`/issues/edit/${issueDetails.id}`}>Edit Issue</Link>
    </Button>
  <DeleteIssueButton issueDetails={issueDetails}/>
  <MarkAsClosedButton issue={issueDetails}/>
   </Flex>
</Box>}
    </Grid>
  )
}
export async function generateMetadata({params} :Props){
  const issue =await fetchUser(parseInt(params.id))
  return {
    title : issue?.title,
    description : "Details of issue "+issue?.id
  }
}

export default IssueDetailPage