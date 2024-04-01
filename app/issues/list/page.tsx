import React, { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import Link from '@/components/Link'
import prisma from '@/prisma/db'
import { Table } from '@radix-ui/themes'
import IssueStatusBadge from '@/components/IssueStatusBadge'
import IssuePageComponents from '@/components/IssuePageComponents'
import IssueStatusFilter from './IssueStatusFilter'
import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import Pagination from '@/components/Pagination'
import IssueTable from './IssueTable'
import { Metadata } from 'next'
const IssuesPage =async ({searchParams}: {searchParams : {status : Status, orderBy : keyof Issue,page : string}}) => {
  const statuses=Object.values(Status)
  const status=statuses.includes(searchParams.status) ? searchParams.status : undefined
  const page = parseInt(searchParams.page) || 1
  const pageSize=10
  const columns : {
    label : string,
    value : keyof Issue ,
    className ?:string 
   }[]=[{
    label : "Issues",
    value : "title"
   },
   {
    label : "Status",
    value : "status",
    className : "hidden md:table-cell"
   },
   {
    label : "Created",
    value : "createdAt",
    className : "hidden md:table-cell"
  }]
  let orderBy= columns.map(column => column.value).includes(searchParams.orderBy) ? {[searchParams.orderBy] : 'asc'} :undefined
  const issues =await prisma.issue.findMany({
    where :{
      status  
    },
    orderBy,
    skip : (page - 1) * pageSize,
    take : pageSize
})
 const issueCount=await prisma.issue.count({
  where : {
    status
  }
 })
  return (
   <div>
   <Flex direction='row' justify='between'>
    <IssueStatusFilter />
   <IssuePageComponents/>
   </Flex>
  <IssueTable searchParams={searchParams } issues={issues} columns={columns}/>
<Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page}/>
   </div>
   
  )
}

export const dynamic='force-dynamic'
export default IssuesPage

export const metadata :Metadata={
  title : "Issue Tracker - Issue List",
  description : "View all project issues"
}