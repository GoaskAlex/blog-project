import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Alert, Button, Textarea} from 'flowbite-react'
import {useState} from 'react'

export default function CommentSection({postId}) {

    const [comment, setComment] = useState('')
    const {currentUser} = useSelector(state => state.user)
    const [commentError, setCommentError] = useState(null)

    const handleSubmit=async (event) => {
        event.preventDefault()
        if (comment.length > 200) {
            return;
          }
          try {
            const res = await fetch('/api/comment/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                content: comment,
                postId,
                userId: currentUser._id,
              }),
            });
            const data = await res.json();
            if (res.ok) {
              setComment('');
              setCommentError(null)
            }
        }catch(error){
                setCommentError(error.message)
            }
        }


  return (
    <>
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentUser ?(
                <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                    <p>Signed in as:</p>
                    <img className='h-10 w-10 object-cover rounded-full' src={currentUser.profilePicture} alt='user'/>
                    <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
                        @{currentUser.username}
                    </Link>
                </div>
            ):(
                <div className="text-sm text-teal-500 my-5">
                    <span className='pr-2'>You must be signed in to comment.</span>
                    <Link to = {'/sign-in'}className='text-lg text-cyan-600 hover:underline'>
                        SignIn
                    </Link>
                </div>
            )}
            {currentUser && (
              <>
                <form className='border border-teal-500 rounded-md p-3'onSubmit={handleSubmit}>
                   <Textarea placeholder='Add a comment' rows={3} maxLength='200' onChange={(event)=> setComment(event.target.value)}value={comment}/>
                   <div className="flex justify-between items-center mt-4">
                    <p className='text-gray-500 text-sm'>{200-comment.length} characters remaining</p>
                    <Button outline gradientDuoTone='purpleToBlue' type='submit'>Submit</Button>
                   </div>
                </form>
                {commentError &&(
                <Alert color='failure' className='mt-5'>
                  {commentError}
                </Alert>
                )}
              </>
            )}
        </div>
    </>
  )
}
