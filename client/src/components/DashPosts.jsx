import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal, Button } from 'flowbite-react';
import React from 'react'
import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';


export default function DashPosts() {

  const [userPosts, setUserPosts] = useState([])
  const {currentUser} = useSelector((state)=> state.user)
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [postIdToDelete, setPostIdToDelete] = useState('')

  useEffect(()=>{
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json()
        if(res.ok){
          setUserPosts(data.posts)
          if(data.posts.length < 9){
            setShowMore(false)
          }
        }
        
      } catch (error) {
        console.log(error.message)
      }
    }
      if(currentUser.isAdmin){
        fetchPosts()
      }
  },[currentUser._id])

  const handleShowMore = async() => {
      const startIndex = userPosts.length
      try {
        const res = await fetch(`api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
        const data = await res.json()
          if(res.ok){
            setUserPosts((prev)=>[...prev, ...data.posts])
            if(data.posts.length < 9){
              setShowMore(false)
            }
          }
      } catch (error) {
        
      }
  }

  const handleDeletePost = async ()=>{
    setShowModal(false)
    try {
       
        const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
            {method:'DELETE',

            })
            const data = await res.json()
            if(!res.ok){
                console.log(data.message);
            }else{
              setUserPosts((prev)=>
                prev.filter((post)=>post._id !== postIdToDelete)
              )
            }
    } catch (error) {
        console.log(error.message);
    }
}

  return (
    <>
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
     {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <TableHead>
              <TableHeadCell>Date updated</TableHeadCell>
              <TableHeadCell>Post Image</TableHeadCell>
              <TableHeadCell>Post Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
              <TableHeadCell><span>Edit</span></TableHeadCell>
            </TableHead>
            {userPosts.map((post)=>
                          (<TableBody className='divide-y' key={post._id}>
                              <TableRow className='bg-white dark:border-gray-700 dark:bg-slate-800'>
                                <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                  <Link to={`/post/${post.slug}`}><img src ={post.image} className='w-20 h-10 object-cover'/></Link>
                                </TableCell>
                                <TableCell>
                                  <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link>
                                </TableCell>
                                <TableCell>
                                  {post.category}
                                </TableCell>
                                <TableCell>
                                  <span  onClick={()=>{
                                    setShowModal(true)
                                    setPostIdToDelete(post._id)
                                  }} className='font-medium text-red-600 hover:underline'>Delete</span>
                                </TableCell>
                                <TableCell>
                                  <Link className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}><span>Edit</span></Link>
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
        <p>You have no posts yet!</p>
      )}
      <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
            <Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure, you want to delete your post?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color ='failure' onClick={handleDeletePost}>
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
