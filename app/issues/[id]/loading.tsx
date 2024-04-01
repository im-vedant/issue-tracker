import IssueStatusBadge from '@/components/IssueStatusBadge'
import { Heading, Card,Text } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const LoadingIssueDetailsPage = () => {
  return (
    <div className='max-w-xl'>
        <Skeleton />

<div className='flex gap-3 my-2 flex-row items-center'>
<Skeleton  width="5rem"/>
<Skeleton width="8rem"/>
</div>
<Card className='prose mt-4'>

    <Skeleton count={3}/>

</Card>
    </div>
  )
}

export default LoadingIssueDetailsPage