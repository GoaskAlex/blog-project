import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { Button, TextInput, Alert, Modal, ModalHeader} from 'flowbite-react';
import { useState, useRef } from 'react';
import {getDownloadURL, getStorage, uploadBytesResumable, ref} from 'firebase/storage'
import { app } from './../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateFailure, updateSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutSuccess} from '../redux/user/userSlice';
import {useDispatch} from 'react-redux'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {Link} from 'react-router-dom'

export default function DashProfile() {
    const {currentUser, error, loading} = useSelector((state)=>state.user)
    const[imageFile,setImageFile] = useState(null)
    const [imageFileUrl, setImageFileURL] = useState(null)
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
    const [imageFileUploadError, setImageFileUploadError] = useState(null)
    const [imageFileUploading, setImageFileUploading] = useState (false)
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
    const [updateUserError, setUpdateUserError] = useState(null)
    const[showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({})
    const filePickerRef = useRef();
    const dispatch = useDispatch()

    const handleImageChange= (event)=>{
        const file = (event.target.files[0])
        if(file){
            setImageFile(file);
            setImageFileURL(URL.createObjectURL(file));
        }
    };

    const handleInputChange = (event)=>{
        setFormData({...formData,[event.target.id]: event.target.value})
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        setUpdateUserError(null)
        setUpdateUserSuccess(null)
        
        if(Object.keys(formData).length === 0){
            setUpdateUserError('No Changes Made')
            return;
        }
        if(imageFileUploading){
            setUpdateUserError('Please wait image to upload')
            return;
        }
        try {
            dispatch(updateStart())
            const res = await fetch(`/api/user/update/${currentUser._id}`,{
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const data = await res.json()
            if(!res.ok){
                dispatch(updateFailure(data.message))
                setUpdateUserError(data.message)
            }else{
                dispatch(updateSuccess(data))
                setUpdateUserSuccess("User profile updated Successfully")

            }
        } catch (error) {
            dispatch(updateFailure(error.message))
            setUpdateUserError(error.message)
        }
    }
    const handleSignOut = async () => {
        try {
            const res = await fetch('api/user/signout',{
                method:'POST',
            })
            const data = await res.json()
            if(!res.ok){
                console.log(data.message);
            }else{
                dispatch(signOutSuccess())
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleDeleteUser = async ()=>{
        setShowModal(false)
        try {
            dispatch(deleteUserStart())
            const res = await fetch(`/api/user/delete/${currentUser._id}`,
                {method:'DELETE',

                })
                const data = await res.json()
                if(!res.ok){
                    dispatch(deleteUserFailure(error.message))
                }else{
                    dispatch(deleteUserSuccess(data))
                }
        } catch (error) {
            dispatch(deleteUserFailure(error.message))
        }
    }
    useEffect(()=>{
        if(imageFile){
            uploadImage()
        }
    },[imageFile]);


    const uploadImage = async () =>{
        setImageFileUploading(true)
        setImageFileUploadError(null)
        const storage = getStorage(app)
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage,fileName)
        const uploadTask = uploadBytesResumable(storageRef,imageFile)
        uploadTask.on(
            'state_changed',
            (snapshot) =>{
                const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
                setImageFileUploadProgress(progress.toFixed(0))
            },
            (error) =>{ 
                setImageFileUploadError('Could not upload image (File must be less then 2MB)')
                setImageFileUploadProgress(null)
                setImageFile(null)
                setImageFileURL(null)
                setImageFileUploading(false)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setImageFileURL(downloadURL)
                    setFormData({...formData, profilePicture: downloadURL})
                    setImageFileUploading(false)
                })
            }
        )
    };
  return (
    <>
      <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="text-center my-7 font-semibold text-3xl ">Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} className='hidden'/>
                <div className="relative w-32 h-32 self-center cursor-pointer shadow-md rounded-full" onClick={()=>filePickerRef.current.click()}>
                {imageFileUploadProgress &&(
                    <CircularProgressbar value ={imageFileUploadProgress|| 0} 
                        text={`${imageFileUploadProgress}%`} 
                        strokeWidth={5} 
                        styles={{root:{
                                width:'100%',
                                height:'100%',
                                position:'absolute',
                                top:'0',
                                left:'0'
                                },
                                path:{
                                    stroke:`rgba(62,152,199,${imageFileUploadProgress/100})`,
                                }
                            }}/>
                )}
                    <img src={imageFileUrl || currentUser.profilePicture} alt="" className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover 
                        ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} />
                </div>
                {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>
                }
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleInputChange}/>
            <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleInputChange}/>
            <TextInput type='password' id='password' placeholder='password' onChange={handleInputChange}/>
            <Button type='submit' gradientDuoTone='purpleToBlue' outline disabled={loading || imageFileUploading}>
                {loading ? 'Loading...' : 'Update'}
            </Button>
            {
                currentUser.isAdmin && (
                    <Link to = {'/create-post'}>
                        <Button type = 'button' gradientDuoTone='purpleToPink' className='w-full'>
                            Create a post
                        </Button>
                    </Link>
                )
            }
        </form>
        <div className="text-red-500 flex justify-between mt-5">
            <span onClick={()=>setShowModal(true)} className='cursor-pointer'>Delete Account</span>
            <span onClick={handleSignOut}className='cursor-pointer'>Sign Out</span>
        </div>
        {updateUserSuccess && (
            <Alert color= 'success' className='mt-5'>
                {updateUserSuccess}
            </Alert>
        )}
        {updateUserError && (
            <Alert color ='failure' className ='mt-5'>
                {updateUserError}
            </Alert>
        )}
        {error && (
            <Alert color ='failure' className ='mt-5'>
                {error}
            </Alert>
        )}
        <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
            <Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure, you want to delete your account?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color ='failure' onClick={handleDeleteUser}>
                                Yes, I'm sure
                            </Button>
                            <Button onClick={()=> setShowModal(false)}>
                                No, Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal.Header>
        </Modal>
      </div>
    </>
  )
}
