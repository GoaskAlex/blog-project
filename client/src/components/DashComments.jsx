import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal, Button } from 'flowbite-react';
import React from 'react'
import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaTimes, FaCheck } from 'react-icons/fa';


export default function DashComments() {

  const [comments, setComments] = useState([])
  const {currentUser} = useSelector((state)=> state.user)
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [commentIdToDelete, setCommentIdToDelete] = useState('')

  useEffect(()=>{
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`)
        const data = await res.json()
        if(res.ok){
          setComments(data.comments)
          if(data.comments.length < 9){
            setShowMore(false)
          }
        }
        
      } catch (error) {
        console.log(error.message)
      }
    }
      if(currentUser.isAdmin){
        fetchComments()
      }
  },[currentUser._id])


  const handleShowMore = async() => {
      const startIndex = comments.length
      try {
        const res = await fetch(`api/comment/getcomments?startIndex=${startIndex}`)
        const data = await res.json()
          if(res.ok){
            setComments((prev)=>[...prev, ...data.comments])
            if(data.comment.length < 9){
              setShowMore(false)
            }
          }
      } catch (error) {
        
      }
  }

  const handleDeleteComments = async () => {
    try {
      const res = await fetch (`/api/comment/deleteComment/${commentIdToDelete}`,{
        method:'DELETE',
      })
      const data = await res.json()
      if (res.ok){
        setComments((prev)=> prev.filter((comments)=>comments._id !== commentIdToDelete))
        setShowModal(false)
      }else{
        console.log(error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
     {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <TableHead>
              <TableHeadCell>Date Updated</TableHeadCell>
              <TableHeadCell>Comment content</TableHeadCell>
              <TableHeadCell>Number of Likes</TableHeadCell>
              <TableHeadCell>PostID</TableHeadCell>
              <TableHeadCell>UserID</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            {comments.map((comment)=>
                          (<TableBody className='divide-y' key={comment._id}>
                              <TableRow className='bg-white dark:border-gray-700 dark:bg-slate-800'>
                                <TableCell>{new Date(comment.updatedAt).toLocaleDateString()}</TableCell>
                                <TableCell className='line-clamp-1'>
                                    {comment.content}
                                </TableCell>
                                <TableCell>
                                    {comment.numberOfLikes}
                                </TableCell>
                                <TableCell>
                                    {comment.postId}
                                </TableCell>
                                <TableCell>
                                    {comment.userId}
                                </TableCell>
                                <TableCell>
                                  <span  onClick={()=>{
                                    setShowModal(true)
                                    setCommentIdToDelete(comment._id)
                                  }} className='font-medium text-red-600 hover:underline'>Delete</span>
                                </TableCell>
                              </TableRow>
                          </TableBody>
                          ))}
          </Table>
          {showMore && (
              <button onClick={handleShowMore} className='w-full text-500 self-center text-sm py-7'>Show More</button>
          )}
        </>
      ) : (
        <p>You have no comments yet!</p>
      )}
      <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
            <Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure, you want to delete this comment?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color ='failure' onClick={handleDeleteComments}>
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
