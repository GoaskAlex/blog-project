import React from 'react'
import {Button, Modal, Label, TextInput, Textarea} from 'flowbite-react'
import {useState} from 'react'
import { FaAddressBook, FaPaperPlane } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import ReCAPATCHA from 'react-google-recaptcha'

export default function About() {
  
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({})
  const [capVal, setCapVal]= useState(null)

  const sendEmail = (event) =>{
    event.preventDefault()
    emailjs.sendForm('service_jellpve','template_lka1b6g', event.target,'GhaP26R0jf0b84yGb')
    alert('Email sent')
    setShowModal(false)
  }
  return (
    <>
    <div className="">
    <div className='mx-7 my-6 p-4 max-full flex-wrap lg:flex '>
      <div className="m-auto gap-4 w-full max-w-2xl min-w-80 py-10 p-3 bg-slate-200 dark:bg-slate-600 rounded border border-teal-400 relative my-20">
        <div className="mb-4 gap-4 lg:flex">
            <div className="min-w-72 my-auto flex flex-col ">
              <div className="w-[4.5rem] h-1 bg-slate-400 dark:bg-slate-50 absolute left-[80px]"></div>
              <h1 className="text-4xl font-semibold text-left my-1">I'm John Rodriguez</h1>
              <h1 className="text-4xl font-semibold text-left my-1">A Full Stack Web Developer</h1>
              <h2 className='mt-6'>I enjoy building and designing Web Sites. </h2>
            </div>
                <div className='mt-4 max-w-46 w-full'>
                  <img  className='rounded-lg w-64 m-auto'src = 'https://firebasestorage.googleapis.com/v0/b/mernblog-7380c.appspot.com/o/Myself.jpg?alt=media&token=a8331898-f9b0-4b94-859e-b0bb2685c1e0'/>
                </div>
        </div>
              <Button onClick={()=>{setShowModal(true)}} outline gradientDuoTone="purpleToPink" className='mt-14 w-full'>Hire Me</Button>
        </div>
     
      <div className="w-[1px] m-8 bg-gray-300 dark:bg-white"></div>
      <div className="max-w-2xl m-auto flex flex-col gap-2">
        <h1 className='text-2xl mb-4'> About Me</h1>
        <p className='dark:text-gray-400 '>
        A Web Developer with strong knowledge of web technologies when it comes to the MERN stack and a recent graduate. I took courses at 
        PerScholas to make a career change, with the focus of Software Engineering. I previously worked as a elevator mechanic performing dangerous tasks for 7 years
        however, I wasn't fulfilled in the work and purpose. I've always enjoyed coding in college and knew being in the realm of Web Development is the right fit for me.
        I'm ready to branch out and expand my knowledge and become a great programmer.
        
        </p>
        <div className="flex flex-col mt-4 items-center p-2">
            <p>To view more details about me. Feel free to view my Resume</p>
          <div className="flex gap-4 mt-4 items-center">
          <Button disabled={!capVal} outline gradientDuoTone="purpleToPink" className='text-center '>View Resume</Button>
          <ReCAPATCHA onChange={(val) => setCapVal(val)} sitekey="6LfdDF8qAAAAAPpPaCqPjUIF1k3Z4iyqmL2HFYtQ"/>
          </div>
        </div>
        </div> 
        {
          <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md' className=''>
          <Modal.Header>
              <Modal.Body>
                  <div className="flex flex-col gap-4">
                    <div className=" mx-auto flex gap-2">
                      <FaAddressBook className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4'/>
                      <h1 className='mt-2 text-2xl font-semibold'>Hire Me</h1>
                    </div>
                    <form onSubmit={sendEmail} className='flex flex-wrap'>
                      <div className="m-auto">
                        <Label htmlFor='from_name' value='Your Name:'/>
                        <TextInput  required onChange={(event)=> setFormData({...formData, from_name:event.target.value})} type='text' name='from_name' id='from_name' placeholder='Doe'/>
                      </div>
                      <div className="m-auto">
                        <Label htmlFor='email_from' value='Your Email:'/>
                        <TextInput  required onChange={(event)=> setFormData({...formData, email_from:event.target.value})} type='email' name='email_from' id='email_from' placeholder='@email.com'/>
                      </div>
                      <div className="text-center m-auto">
                        <Label htmlFor='message' value='Message:'/>
                        <Textarea required onChange={(value)=>setFormData({...formData, message:value})} className='min-w-60 min-h-24' type='text' name='message' id='message' placeholder='Hello...'/>
                      </div>
                      <div className="flex w-full justify-between mt-6">
                        <Button type='submit'> Submit<FaPaperPlane className='ml-2 my-auto'/></Button>
                        <Button onClick={()=>{setShowModal(false)}}>Cancel</Button>
                      </div>
                    </form>
                  </div>
              </Modal.Body>
          </Modal.Header>
      </Modal>
        }
    </div>
    </div>
    </>
  )
}
