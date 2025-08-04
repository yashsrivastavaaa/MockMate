import Agent from '@/components/Agent'
import React from 'react'

const page = () => {
    return (
        <div className='min-h-scree mx-17 max-lg:mx-4 max-sm:mx-4'>
            <h3 className='text-center text-primary-100 mt-5 text-3xl font-semibold mb-8'>Interview Generation</h3>
            <Agent userName='Yash' userId='user1' type='generate' />
        </div>
    )
}

export default page