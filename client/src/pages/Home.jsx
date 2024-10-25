import React from 'react'
import {Link} from 'react-router-dom'
import {useState, useEffect, Suspense} from 'react'


const CallToAction = React.lazy(()=> import('./../components/CallToAction.jsx'))
const PostCard = React.lazy(()=> import('./../components/PostCard.jsx'))

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(()=>{
      try {
        const fetchPosts = async () => {
          const res = await fetch('/api/post/getposts')
          const data = await res.json()
          setPosts(data.posts)
        }
        fetchPosts()
      } catch (error) {
        console.log(error.message);
      }
  },[])
  return (
    <>
    <div className="">
      <div className="flex flex-col gap-6 p-20 px-3 max-w-6xl mx-auto">
        <h1 className='text-3xl font-bold lg:text-6xl'> Welcome To My Blog</h1>
        <p className='text-gray-500 text-xs sm:text-lg '> This is a demo project. You can register or sign in with Google. Explore my <strong>MERN</strong> project. 
          Follow my journey in Web Development. Sharing tools, projects and interests alike.</p>
      <Link to ='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>View all posts</Link>
      </div>
      <div className="p-3 w-3/5 mx-auto rounded-lg bg-lime-100 dark:bg-slate-700">
      <Suspense fallback={<div>Loading..</div>}>
        <CallToAction/>
      </Suspense>
      </div>
        <div className="flex flex-col">
          {
            posts && posts.length > 0 && (
              <div className="flex flex-col gap-8 p-3 py-7">
                <h2 className='text-2xl font-semibold text-center mb-4'>Recent Posts</h2>
                <div className="flex flex-wrap gap-4 justify-center">
                 
                  {
                    posts.slice(0,6).map((post=>(
                      <Suspense key={post._id} fallback={<div>Loading..</div>}>
                        <PostCard key={post._id} post={post}/>
                      </Suspense>  
                    ))
                  )}
                </div>
                <Link to ='/search' className='text-lg sm:text-sm text-teal-500 font-bold hover:underline'>View all posts</Link>
              </div>
            )
          }
        </div>
    </div>
    </>
  )
}
