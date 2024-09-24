import React from 'react'
import {Button, Modal, Label, TextInput, Textarea} from 'flowbite-react'
import {useState} from 'react'
import { FaAddressBook, FaPaperPlane } from 'react-icons/fa'
import emailjs from '@emailjs/browser'


export default function About() {
  
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
    <div className='flex gap-4 items-center justify-center h-screen'>
      <div className="flex gap-9 max-w-3xl w-5/6 my-24 py-10 px-10 bg-slate-200 dark:bg-slate-600 rounded border border-teal-400 relative">
        <div className="mb-4 flex flex-col">
            <div className="w-[4.5rem] h-1 bg-slate-400 dark:bg-slate-50 absolute left-[104px] top-10"></div>
            <h1 className="text-4xl font-semibold text-left my-1">I'm John Rodriguez, a Full Stack Web Developer</h1>
            <h2 className='mt-6'>I enjoy building and designing Web Sites. </h2>
            <Button onClick={()=>{setShowModal(true)}} outline gradientDuoTone="purpleToPink" className='mt-14'>Hire Me</Button>
        </div>
          <div className=''>
            <img  className='rounded-lg'src = 'https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/402162401_3538484533029678_2202943475481925851_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=QeHA6Dei4g8Q7kNvgFnaJDd&_nc_ht=scontent-lga3-2.xx&_nc_gid=Ai37FnP_JRJUBGipwzJNopY&oh=00_AYBXELU4vIkwq8hjXgc96c48kogO2gUh9s7MsYJkEyVTPw&oe=66F7B9AD'/>
          </div>
      </div>
     
      <div className="w-[1px] min-h-36 mx-52 bg-gray-300 dark:bg-white"></div>
      <div className="w-40 mr-5 min-w-96">
        <h1 className='text-2xl my-4'> About Me</h1>
        <p className='dark:text-gray-400 '>
        A Web Developer with strong knowledge of web technologies when it comes to the MERN stack and a recent graduate. I took courses at 
        PerScholas to make a career change, with the focus of Software Engineering. I previously worked as a elevator mechanic performing dangerous tasks for 7 years
        however, I wasn't fulfilled in the work and purpose. I've always enjoyed coding in college and knew being in the realm of Web Development is the right fit for me.
        I'm ready to branch out and expand my knowledge and become a great programmer.
        
        </p>
      
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
