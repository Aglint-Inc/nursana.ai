'use-client'

import React from 'react'

import IncompleteProfile from './_common/components/IncompleteProfile'
import WaitingForMatch from './_common/components/WaitingForMatch'

function Jobs() {
  return (
    <div className='flex flex-col gap-10'>
        <IncompleteProfile/>
        <WaitingForMatch/>
    </div>
  )
}

export default Jobs