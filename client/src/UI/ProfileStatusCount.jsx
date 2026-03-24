import React from 'react'

const ProfileStatusCount = ({count, title}) => {
  return (
    <div>
        <span className='sm:text-xl font-bold text-gray'>{count}</span>
        <span className='text-xs sm:text-sm text-gray-500 ml-1.5'>{title}</span>
    </div>
  )
}

export default ProfileStatusCount