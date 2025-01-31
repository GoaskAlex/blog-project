import React from 'react'
import { FileInput, Button, Select, TextInput, Alert } from 'flowbite-react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import { useNavigate } from 'react-router-dom';



export default function CreatePost() {
const [file, setFile] = useState(null)
const [imageUploadProgress, setImageUploadProgress] = useState(null)
const [imageUploadError, setImageUploadError] = useState(null)
const [formData, setFormData] = useState({})
const [publishError, setPublishError]= useState(null)

const navigate = useNavigate()

const handleUpload = async (params) => {
  try {
    if(!file){
      setImageUploadError('Please Select an Image')
      return
    }

    const storage = getStorage(app)
    const fileName = new Date().getTime() + '-' +file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed',
      (snapshot)=>{ const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes)*100
        setImageUploadProgress(progress.toFixed(0))
      },
      (error)=>{
        setImageUploadError('Image upload Failed')
        setImageUploadProgress(null)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageUploadProgress(null)
          setImageUploadError(null)
          setFormData({...formData, image:downloadURL})
        })
      })
      
  } catch (error) {
    setImageUploadError('Image upload Failed')
    setImageUploadProgress(null)
    console.log(error);
  }
}
  const handleSubmit =async (event) => {
    event.preventDefault()
    try {
      const res = await fetch('/api/post/create',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(formData),
      })
      const data = await res.json()
      if(!res.ok){
        setPublishError(data.message)
        return
      }
      if(res.ok){
        setPublishError(null)
        navigate(`/post/${data.slug}`)
      }
    } catch(error){
      setPublishError('Something went wrong')
    }
  }

  
  return (
    <>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <TextInput type='text' placeholder='Title' required id= 'title' className='flex-1' onChange={(event)=> setFormData({...formData, title:event.target.value})}/>
                <Select onChange={(event)=> setFormData({...formData, category:event.target.value})}>
                    <option value="uncategorized">Select a Category</option>
                    <option value="javascript">JavaScript</option>
                    <option value="Next.js">Next.JS</option>
                    <option value="React">React</option>
                    <option value="Html/Css">Html/Css</option>
                </Select>
            </div>
            <div className="flex gap-4 items-center justify-between border-4 border-teal border-dotted p-3">
                <FileInput type= 'file' accept='image/*' onChange={(event)=>setFile(event.target.files[0])}/>
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' onClick={handleUpload} disabled ={imageUploadProgress}>
                   {
                    imageUploadProgress ? (
                        <div className='w-16 h-16'>
                          <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}/>
                        </div>) : ('Upload Image')
                    } 
                </Button>
            </div>
            {
            imageUploadError && (<Alert color = 'failure'>{imageUploadError}</Alert>)
            }
            {
              formData.image && (<img src={formData.image} alt='upload' className='w-full h-72 object-cover'/>)
            }
            <ReactQuill theme="snow" placeholder='Write Something....' className='h-72 mb-12' required 
            onChange={
                (value)=>{
                  setFormData({...formData, content:value})}
                  }/>
            <Button type='submit' gradientDuoTone='purpleToPink'>
                Publish
            </Button>
            {
             publishError && <Alert color='failure' className='mt-5'>
              {publishError}
             </Alert> 
            }
        </form>
      </div>
    </>
  )
}
