import IssueStatusBadge from '@/components/IssueStatusBadge'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import NextLink from 'next/link'
import { Issue, Status } from '@prisma/client'

interface Props {
    searchParams :  {status : Status, orderBy : keyof Issue,page : string},
    issues : Issue[],
    columns : {
        label : string,
        value : keyof Issue ,
        className ?:string 
       }[]
}
const IssueTable = ({searchParams,issues, columns} : Props) => {
   
  return (
    <Table.Root variant='surface'>
  <Table.Header>
    <Table.Row>
    
      {
        columns.map((column,index)=>{
          return <Table.ColumnHeaderCell key={index} className={column?.className}>
           <NextLink href={
            {
              query : {
                ...searchParams , orderBy : column.value
              }
            }
           }>{column.label}</NextLink>
           {
            column.value === searchParams.orderBy && <ArrowUpIcon className='inline'/>
           }
          </Table.ColumnHeaderCell>
        })
      }
    </Table.Row>
  </Table.Header>

  <Table.Body>
    {
      issues.map((issue,index)=>{
     
    return  <Table.Row key={index}>
    <Table.RowHeaderCell>
      <Link href={`/issues/${issue.id}`}>{issue.title}
      <div className='block md:hidden'>
       <IssueStatusBadge status={issue.status}/>
      </div></Link>
    </Table.RowHeaderCell>
    <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status}/></Table.Cell>
    <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
  </Table.Row>
      })
    }
  </Table.Body>
</Table.Root>
  )
}

export default IssueTable