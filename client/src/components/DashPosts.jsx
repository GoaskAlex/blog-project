import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import React from 'react'
import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


export default function DashPosts() {

  const [userPosts, setUserPosts] = useState([])
  const {currentUser} = useSelector((state)=> state.user)
  const [showMore, setShowMore] = useState(true)

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
                          (<TableBody className='divide-y'>
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
                                  <span className='font-medium text-red-600 hover:underline'>Delete</span>
                                </TableCell>
                                <TableCell>
                                  <Link className='text-teal-500 hover:underline' to={`update-post/${post._id}`}><span>Edit</span></Link>
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
      </div>
    </>
  )
}
