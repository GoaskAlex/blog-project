import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Label, TextInput } from 'flowbite-react'
export default function SignUp() {
  return (
    <>
      <div className='min-h-screen mt-20'>
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
          {/*leftSide*/}
          <div className="flex-1"> 
              <Link to ='/' className='font-bold dark:text-white text-4xl'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to bg-pink-500 rounded-lg text-white'>Gamers</span>Heaven
              </Link>
              <p className='text-sm mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus expedita aspernatur sapiente sint, libero est!</p>
          </div>
          {/*rightSide*/}
          <div className="flex-1">
            <form className='flex flex-col gap-4'>
                <div>
                  <Label value = "Your Username"/>
                  <TextInput type = 'text' placeholder = 'UserName' id = 'username'/>
                </div>
                <div>
                  <Label value = "Your E-mail"/>
                  <TextInput type = 'text' placeholder = 'name@' id = 'email'/>
                </div>
                <div>
                  <Label value = "Your Password"/>
                  <TextInput type = 'text' placeholder = 'Password' id = 'password'/>
                </div>
                <Button gradientDuoTone = 'purpleToPink' type='submit'>Sign-Up</Button>
              </form>
              <div className="flex gap-2 text-sm mt-3">
                <span> Have an account?</span>
                  <Link to = '/sign-in' className='text-blue-500'>Sign-In</Link>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}
