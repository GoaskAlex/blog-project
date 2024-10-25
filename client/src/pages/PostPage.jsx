import React from 'react'
import { useParams, Link } from 'react-router-dom'
import {useEffect, useState, Suspense} from 'react'
import { Button, Spinner } from 'flowbite-react'



const CallToAction = React.lazy(()=> import('../components/CallToAction'))
const PostCard = React.lazy(()=> import('../components/PostCard'))
const CommentSection = React.lazy(()=> import('../components/CommentSection'))


export default function PostPage() {
  const {postSlug} = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [post, setPost] = useState(null)
  const [recentPosts, setRecentPosts] = useState(null)
 
  useEffect(()=>{
    const fetchPost = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
        const data = await res.json()
        
    
        if(!res.ok){
          setError(true)
          setLoading(false)
          return
        }
        if(res.ok){
          setPost(data.posts[0])
          setLoading(false)
          setError(false)
        }
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchPost()
  },[postSlug])

  useEffect(()=>{
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`)
        const data = await res.json()
        if(res.ok){
          setRecentPosts(data.posts)
        }
      }
      fetchRecentPosts()
    } catch (error) {
      console.log(error.message);
    }
  },[])

  if(loading) return <div className='flex justify-center items-center min-h-screen'><Spinner size='xl'/></div>

  return (
    <>
     <main className='p-3 flex flex-col w-full mx-auto min-h-screen'>
       <h1 className='text-3xl mt-10 p-3 textcenter font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>
       <Link className= 'self-center mt-5' to={`/search?category=${post && post.category}`}>
       <Button className='gray' pill size='xs'>{post && post.category}</Button>
       </Link>
       <div className='self-center w-4/5 h-96 my-5'>
          <img src = {post && post.image} alt= {post && post.title} className='w-full h-full object-cover'/>
       </div>
       <div className=" flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{post && (post.content.length/1000).toFixed(0)} mins read</span>
       </div>
       <div className='p-3 max-w-2xl mx-auto w-full' dangerouslySetInnerHTML={{__html: post && post.content}}></div>
       <div className='max-w-4xl mx-auto w-full'>
        <Suspense fallback={<div>Loading...</div>}>
          <CallToAction/>
        </Suspense>
       </div>
       <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <CommentSection postId={post._id}/>
        </Suspense>
       </div>
       <div className="flex flex-col justify-center items-center mb-5">
          <h1 className='text-xl mt-5 mb-2'>Recent Articles</h1>
          <div className="flex flex-wrap gap-5 mt-5 justify-center ">
            {
              recentPosts && recentPosts.map((post)=>(
                <Suspense fallback={<div>Loading</div>}>
                  <PostCard key={post._id} post={post}/>
                </Suspense>  
              ))
            }
          </div>
       </div>
     </main>
    </>
  )
}
