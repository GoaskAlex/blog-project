import { Button, Modal, Label, TextInput, Textarea} from 'flowbite-react'
import React from 'react'
import { FaAddressBook, FaPaperPlane } from 'react-icons/fa';
import emailjs  from '@emailjs/browser';
import {useState} from 'react'

export default function CallToAction() {

  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({})

  const sendEmail = (event) =>{
    event.preventDefault()
    emailjs.sendForm('service_jellpve','template_lka1b6g', event.target,'GhaP26R0jf0b84yGb')
    alert('Email sent')
    setShowModal(false)
  }

  return (
    <>
        <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl'>
            <div className="flex-1 flex flex-col justify-center text-center">
                <h2 className='text-2xl'>Need A Web Developer?</h2>
                <p className='text-gray-500 my-2'>Send Me a Message Below</p>
                 <Button onClick={()=>{setShowModal(true)}} outline gradientDuoTone="purpleToPink" className='mt-4'>Contact Me</Button>
            </div>
            <div className="p-7 flex-1">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2Ftwocaeh0b2p91.gif&f=1&nofb=1&ipt=52c4e0305256927a09067318a63d159f1e4b26d49e881c69d798ac704b85cac6&ipo=images" alt="img"/>
            </div>
            
              {
                <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
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
                            <div className="text-center">
                              <Label htmlFor='message' value='Message:'/>
                              <Textarea required onChange={(value)=>setFormData({...formData, message:value})} className='w-80 h-40' type='text' name='message' id='message' placeholder='Hello...'/>
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
    </>
  )
}
