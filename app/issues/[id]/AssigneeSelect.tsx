'use client'
import 'react-loading-skeleton/dist/skeleton.css'
import { Select } from '@radix-ui/themes'
import { Issue, User } from '@prisma/client'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Skeleton from 'react-loading-skeleton'
import toast ,{Toaster} from 'react-hot-toast'
const AssigneeSelect = ({issue} :{issue : Issue}) => {
   const {data : users ,error, isLoading } =useQuery<User[]>({
        queryKey : ['users'],
        queryFn : ()=>axios.get<User[]>('/api/users').then(res=>res.data),
        staleTime : 60*1000 ,
        retry :3
    })
   if(isLoading)
   return <Skeleton>

   </Skeleton>
  if(error)
  return null

   async function assignTo(userId : string | null){
    if(userId===' ')
    userId=null
    let data = {
        assignedToId : userId 
    }

   try {
     await axios.patch(`/api/issues/${issue.id}`,data)
   } catch (error) {
    toast.error("Changes could not be made")
    console.log(error)
   }
  }
  return (
  <>
  <Toaster/>
   <Select.Root defaultValue={issue.assignedToId || " "} onValueChange={(userId)=>{
    assignTo(userId)
   }}>
    <Select.Trigger placeholder='Assign...'/>
    <Select.Content>
        <Select.Group >
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value=' '>Unassigned</Select.Item>
            {
                users?.map((user,index)=>{
                    return <Select.Item key={index} value={user.id}>
                        {user.name}
                        </Select.Item>
                })
            }
           
        </Select.Group>
    </Select.Content>
   </Select.Root>
  </>
  )
}

export default AssigneeSelect