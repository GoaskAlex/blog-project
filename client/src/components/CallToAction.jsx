import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <>
        <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl'>
            <div className="flex-1 flex flex-col justify-center text-center">
                <h2 className='text-2xl'>Need A Web Developer?</h2>
                <p className='text-gray-500 my-2'>Send Me a Email Now</p>
                <Button gradientDuoTone='purpleToPink'> <a href='#' target='_blank' rel='noopener noreferrer'>Learn More</a></Button>
            </div>
            <div className="p-7 flex-1">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2Ftwocaeh0b2p91.gif&f=1&nofb=1&ipt=52c4e0305256927a09067318a63d159f1e4b26d49e881c69d798ac704b85cac6&ipo=images" alt="img"/>
            </div>
        </div>
    </>
  )
}
