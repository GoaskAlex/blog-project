import React from 'react'
import {Link} from 'react-router-dom'
import CallToAction from './../components/CallToAction';
import {useState, useEffect} from 'react'
import PostCard from './../components/PostCard';
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
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className='text-3xl font-bold lg:text-6xl'> Welcome To my Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam 
        quis temporibus rerum quam architecto eos fuga. Minus iure 
        repellat vero possimus eveniet laudantium, quidem est eius tenetur nostrum hic perspiciatis?</p>
      <Link to ='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>View all posts</Link>
      </div>
      <div className="p-3 bg-lime-100 dark:bg-slate-700">
        <CallToAction/>
      </div>
        <div className="flex flex-col">
          {
            posts && posts.length > 0 && (
              <div className="flex flex-col gap-8 p-3 py-7">
                <h2 className='text-2xl font-semibold text-center mb-4'>Recent Posts</h2>
                <div className="flex flex-wrap gap-4 justify-center">
                  {
                    posts.map((post=>(
                        <PostCard key={post._id} post={post}/>
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
