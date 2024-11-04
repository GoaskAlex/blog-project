import {Suspense} from 'react'
import React from 'react'
const PagePreview = React.lazy (()=>import('../components/PagePreview'))
const CallToAction = React.lazy(()=> import('../components/CallToAction'))

export default function Projects() {

  
return (
    <>
      <div className='min-h-screen max-w-5xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
        <h1 className='text-6xl font-semibold'>Projects</h1>
        <p> Coding one day at a time. See you soon!!</p>
        <div className="flex flex-wrap gap-6 justify-center ">
        <Suspense fallback={<div>Loading...</div>}>
          <PagePreview title="16-Bitz Game Review Project" image="https://firebasestorage.googleapis.com/v0/b/mernblog-7380c.appspot.com/o/GameReviewProject.png?alt=media&token=9566c805-4d64-4d73-adee-bd5dd93c4e0e" list={['HTML',]} list2={['CSS']} link='https://sba-16bit-site.onrender.com/'/>
          <PagePreview title="Pig Game 2-Player Game Project" image="https://firebasestorage.googleapis.com/v0/b/mernblog-7380c.appspot.com/o/Screenshot%202024-11-03%20165447.png?alt=media&token=33f41478-16d7-414c-aaa6-c4bea1d3bb92"list={['HTML','CSS']} list2={['JavaScript']} link='https://pig-game-z3o3.onrender.com/'/>
          <PagePreview title="Anime Search Project" image="https://firebasestorage.googleapis.com/v0/b/mernblog-7380c.appspot.com/o/AnimeSearchProject.png?alt=media&token=378f94c2-a233-49a1-b219-f3d9e9eb33b7"list={['HTML','REACT',"Express"]} list2={['JavaScript','TailwindCSS',"REST API"]} link='https://verdant-chaja-d962c6.netlify.app/'/>
          <PagePreview title="Otaku:Music Project" image="https://firebasestorage.googleapis.com/v0/b/mernblog-7380c.appspot.com/o/OtakuMusicProject.png?alt=media&token=54bc8956-2840-4d27-9f52-ce0ce6dc9556"list={['HTML','CSS']} list2={['JavaScript','TailwindCSS']} link='https://webesscapstone.onrender.com/'/>
        </Suspense>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <CallToAction/>
        </Suspense>  
      </div>
    </>
  )
}
