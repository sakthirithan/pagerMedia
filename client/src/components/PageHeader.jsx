import React from 'react'

const PageHeader = ({title = "Title", desc="Description"}) => {
  return (
    <div className='mb-8 '>
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>{title}</h1>
          <p className='text-slate-600'>{desc}</p>
        </div>
  )
}

export default PageHeader