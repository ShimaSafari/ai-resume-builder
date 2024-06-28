import React from 'react'

function Summerypreview({resumeInfo}) {
  return (
    <p className='text-xs'>
        {resumeInfo?.summery}
    </p>
  )
}

export default Summerypreview