import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal, Button } from 'flowbite-react';
import React from 'react'
import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaTimes, FaCheck } from 'react-icons/fa';


export default function DashUsers() {

  const [users, setUsers] = useState([])
  const {currentUser} = useSelector((state)=> state.user)
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [userIdToDelete, setUserIdToDelete] = useState('')

  useEffect(()=>{
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`)
        const data = await res.json()
        if(res.ok){
          setUsers(data.users)
          if(data.users.length < 9){
            setShowMore(false)
          }
        }
        
      } catch (error) {
        console.log(error.message)
      }
    }
      if(currentUser.isAdmin){
        fetchUsers()
      }
  },[currentUser._id])


  const handleShowMore = async() => {
      const startIndex = users.length
      try {
        const res = await fetch(`api/user/getusers?startIndex=${startIndex}`)
        const data = await res.json()
          if(res.ok){
            setUsers((prev)=>[...prev, ...data.user])
            if(data.users.length < 9){
              setShowMore(false)
            }
          }
      } catch (error) {
        
      }
  }

  const handleDeleteUser = async () => {
    try {
      const res = await fetch (`/api/user/delete/${userIdToDelete}`,{
        method:'DELETE',
      })
      const data = await res.json()
      if (res.ok){
        setUsers((prev)=> prev.filter((users)=>users._id !== userIdToDelete))
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
     {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <TableHead>
              <TableHeadCell>Date Created</TableHeadCell>
              <TableHeadCell>User Image</TableHeadCell>
              <TableHeadCell>UserName</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Admin</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            {users.map((user)=>
                          (<TableBody className='divide-y' key={user._id}>
                              <TableRow className='bg-white dark:border-gray-700 dark:bg-slate-800'>
                                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <img src ={user.profilePicture} className='w-10 h-10 object-cover rounded-full'/>
                                </TableCell>
                                <TableCell>
                                    {user.username}
                                </TableCell>
                                <TableCell>
                                    {user.email}
                                </TableCell>
                                <TableCell>
                                    {user.isAdmin ? (<FaCheck className='text-green-500'/>):(<FaTimes className='text-red-500'/>)}
                                </TableCell>
                                <TableCell>
                                  <span  onClick={()=>{
                                    setShowModal(true)
                                    setUserIdToDelete(user._id)
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
        <p>You have no users yet!</p>
      )}
      <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
            <Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure, you want to delete this user?</h3>
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
