import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/actions/auth.action'
import React from 'react'

const page = async () => {

    const name = await getCurrentUser();
    return (
        <div className='min-h-scree mx-17 max-lg:mx-4 max-sm:mx-4'>
            <h3 className='text-center text-primary-100 mt-5 text-3xl font-semibold mb-8'>MockMate Interview . . .</h3>
            <Agent userName={name?.name!} />
        </div>
    )
}

export default page