import React from 'react'
import {useEffect, useState} from 'react'
import moment from 'moment' 
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Textarea, Button } from 'flowbite-react';

export default function Comment({comment, onLike, onEdit, onDelete}) {
    const [user, setUser] = useState({})
    const {currentUser} = useSelector((state)=>state.user)
    const [isEditing, setIsEditing] =  useState(false)
    const [editedContent, setEditedContent] = useState(comment.content)
    useEffect(()=>{
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`)
                const data = await res.json()
                if(res.ok){
                    setUser(data)
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getUser()
    },[comment])
    
    const handleEdits = async (params) => {
        try {
            setIsEditing(true)
            setEditedContent(comment.content)
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSave =async () => {

        if (comment.length > 200) {
            return;
          }
          try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                content: editedContent
              }),
            });
            if (res.ok) {
               setIsEditing(false)
               onEdit(comment, editedContent)
            }
        }catch(error){
                setCommentError(error.message)
            }
        }

  return (
    <>
      <div className="flex p-4 border-b dark:border-gray-600 text-sm">
        <div className="flex-shrink-0 mr-3">
            <img className='w-10 h-10 rounded-full bg-gray-200'src = {user.profilePicture} alt={user.username}/>
        </div>
        <div className="flex-1">
            <div className="flex items-center mb-1">
                <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}` : `anonymous user`}</span>
                <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
            </div>
            {
             isEditing ? (
                <>
                <Textarea placeholder='Add a comment' rows={3} maxLength='200' onChange={(event)=> setEditedContent(event.target.value)} value={editedContent}/>
                <div className="flex justify-between items-center mt-4">
                 <p className='text-gray-500 text-sm'>{200 - editedContent.length} characters remaining</p>
                 <div className="flex gap-4 justify-end">
                 <Button onClick={handleSave} gradientDuoTone='purpleToBlue' size='sm' type='button'>Save</Button>
                 <Button onClick={()=>setIsEditing(false)} outline gradientDuoTone='purpleToBlue' size='sm' type='button'>Cancel</Button>
                 </div>
                </div>
                </>
             ):(
            <>
             <p className='text-gray-500 pb-2 dark:text-gray-100'>{comment.content}</p>
                <div className="flex items-start pt-2 text-xs gap-2 border-t dark:border-slate-400 max-w-fit">
                <button className={`text-gray-400 hover:text-blue-500 ${
                    currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'
                    }`} 
                    type='button' onClick={()=>onLike(comment._id)}><FaThumbsUp className='text-sm'/></button>
                    <p className='text-gray-400'>
                        {
                            comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : 'likes')
                        }
                    </p>
                    {
                        currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                            <>
                            <button onClick={handleEdits} type='button' className='text-gray-500 hover:text-blue-500'>Edit</button>
                            <button onClick={()=>onDelete(comment._id)} type='button' className='text-gray-500 hover:text-blue-500'>Delete</button>
                            </>
                        )
                    }
                </div>
             </>)   
            }
            
        </div> 
      </div>
    </>
  )
}
