import { Status } from '@prisma/client';
import { Card, Flex ,Text} from '@radix-ui/themes'
import Link from 'next/link';
import React from 'react'


type IssueSummaryProps = {
    open: number;
    inProgress: number;
    closed: number;
};

const IssueSummary = ({ open, inProgress, closed }: IssueSummaryProps): JSX.Element => {
    const statuses: { label: string; value: number,status : Status }[] = [
        { label: "Open Issues", value: open, status : "OPEN" },
        { label: "In Progress Issues", value: inProgress ,status : "IN_PROGRESS" },
        { label: "Closed Issues", value: closed,status : "CLOSED"  },
    ];

    return (
        <Flex gap='4'>
            {statuses.map((status,index) => (
               <Card key={index}>
                <Flex direction='column' gap='1'>
<Link className='text-sm font-medium ' href={`/issues/list?status=${status.status}`}>{status.label}</Link>
<Text size='5' className='font-bold'>{status.value}</Text>
                </Flex>
               </Card>
            ))}
        </Flex>
    );
};

export default IssueSummary