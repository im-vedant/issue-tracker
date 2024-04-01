import React from 'react'
import prisma from '@/prisma/db'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from '../../_components/IssueFormSkeleton'

interface Props {
    params : { id : string}
}
const IssueForm =dynamic(()=>import('../../_components/IssueForm'),{ssr: false, loading: ()=> <IssueFormSkeleton/>})
const EditIssuePage = async({params}: Props) => {
const issueDetails =await prisma.issue.findUnique({where :{id : parseInt(params.id)}})
if(!issueDetails)
notFound()
  return (
   <IssueForm issue={issueDetails}/>
  )
}

export default EditIssuePage