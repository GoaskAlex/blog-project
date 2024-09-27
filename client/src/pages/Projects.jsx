import React from 'react'
import CallToAction from './../components/CallToAction';
export default function Projects() {
  return (
    <>
      <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
        <h1 className='text-3xl font-semibold'>Projects Coming Soon</h1>
        <p>Got any suggestions? Or recommendations send me an Email. Coding one day at a time. 
          See You Soon!!
        </p>
          <CallToAction/>
      </div>
    </>
  )
}
