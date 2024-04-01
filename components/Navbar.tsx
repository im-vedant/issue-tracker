'use client'
import { usePathname } from "next/navigation"
import Link from "next/link"
import {AiFillBug} from 'react-icons/ai'
import { useSession } from "next-auth/react"
import {Avatar, Box, Container, DropdownMenu, Text} from '@radix-ui/themes'
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
const Navbar = () => {
   
  
  return (
  <nav className="border-b mb-5" >
    <Container>
        <div  className="flex flex-row justify-between space-x-6  px-5 h-14 items-center">

    <NavLinks/>
    <Box>
       <AuthStatus/>  
    </Box>
        </div>

    </Container>
  </nav>
  )
}

const NavLinks=()=>{
    const currentPath=usePathname()
    console.log(currentPath)
    const links=[
        {
            label : 'Dashboard', href : '/'
        },
        {
            label : 'Issues', href : '/issues/list'
        }
    ]
    return <div className="flex flex-row  items-center space-x-4">
    <Link href='/'><AiFillBug/></Link>
    <ul className="flex flex-row space-x-6">
        {
            links.map((item, index)=>{
                return <li key={index}>
                <Link href={item.href} className={` ${ currentPath===item.href ? ' text-zinc-900':'text-zinc-500'} hover:text-zinc-800 transition-colors`}>{item.label}</Link>
            </li>
            })
        }
       
    </ul>
    </div>
}
const AuthStatus=()=>{
    const {status, data : session}=useSession()
    if(status==='loading')
    return <Skeleton width="3rem"></Skeleton>
    if(status==='unauthenticated')
    return   <Link href={'/api/auth/signin'} className="transition-colors hover:text-zinc-800 text-zinc-500">Log in</Link>
    return  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
        <Avatar referrerPolicy="no-referrer" className="cursor-pointer" src={session!.user!.image!} fallback='?' size='2' radius="full"/>                    
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        <DropdownMenu.Label>
            <Text size='2'>
            {
                session!.user?.email
            }
            </Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
        <Link href={'/api/auth/signout'}>Log out</Link>
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>

}

export default Navbar