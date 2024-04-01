import IssuePageComponents from '@/components/IssuePageComponents'
import IssueStatusBadge from '@/components/IssueStatusBadge'
import { Table } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const LoadingIssuePage = () => {
    const issues=[1,2,3,4,5]
  return (
    <div>
        <IssuePageComponents/>
        <Table.Root variant='surface'>
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
  
    <Table.Body>
      {
        issues.map((issue,index)=>{
          return   <Table.Row key={index}>
          <Table.RowHeaderCell><Skeleton/>
            <div className='block md:hidden'>
            <Skeleton/>
            </div>
          </Table.RowHeaderCell>
          <Table.Cell className='hidden md:table-cell'><Skeleton/></Table.Cell>
          <Table.Cell className='hidden md:table-cell'><Skeleton/></Table.Cell>
        </Table.Row>
    
        })
      }
    </Table.Body>
  </Table.Root>
    </div>
  )
}

export default LoadingIssuePage