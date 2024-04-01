import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React, { ReactNode } from 'react'

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div>
   
        {
            children
        }
    </div>
  )
}

export default layout