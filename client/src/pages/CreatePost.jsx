import React from 'react'
import { FileInput, Button, Select, TextInput } from 'flowbite-react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



export default function CreatePost() {
const [value, setValue] = useState('')


  return (
    <>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
        <form className='flex flex-col gap-4'>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <TextInput type='text' placeholder='Title' required id= 'title' className='flex-1'/>
                <Select>
                    <option value="uncategorized">Select a Category</option>
                    <option value="javascript">JavaScript</option>
                    <option value="Next.js">Next.JS</option>
                </Select>
            </div>
            <div className="flex gap-4 items-center justify-between border-4 border-teal border-dotted p-3">
                <FileInput type= 'file' accept='image/*'/>
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm'>
                    Upload Image
                </Button>
            </div>
            <ReactQuill theme="snow" value={value} onChange={setValue} placeholder='Write Something....' className='h-72 mb-12' required />
            <Button type='submit' gradientDuoTone='purpleToPink'>
                Publish
            </Button>
        </form>
      </div>
    </>
  )
}
