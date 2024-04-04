'use client'
import { Button } from '@radix-ui/themes'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Issue } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const MarkAsClosedButton = ({issue} : {issue : Issue}) => {
const [loading,setLoading]=useState(false)
const router=useRouter()
    async function markAsClosed (){
        let data = {
            status : "CLOSED"
        }
        try {
            setLoading(true)
            await axios.patch(`/api/issues/${issue.id}`,data)
            setLoading(false)
            router.refresh()
         
        } catch (error) {
            toast.error("Changes could not be made")
            console.log(error)
        }
        
    }
    
  return (
   <Button color='green' onClick={markAsClosed} disabled={loading}>Mark as Closed</Button>
  )
}

export default MarkAsClosedButton