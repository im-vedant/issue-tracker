import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const IssueFormSkeleton = () => {
  return (
    <div className='max-w-xl'>
        <Skeleton height="2rem"/>
        <Skeleton height="15rem"/>
        
    </div>
  )
}

export default IssueFormSkeleton