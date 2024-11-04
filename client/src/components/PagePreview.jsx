
import React from 'react'


export default function PagePreview({title,image,list=[],list2=[],link}) {

return (
    <>
      
            <div className="text-center flex flex-col border rounded-br-lg rounded-tl-lg w-2/5 p-5">
                <h1 className='pb-2'>{title}</h1>
                <h2 className=' pb-2 text-blue-500 hover:text-blue-300'><a className='visited:text-slate-500' href={link}>Preview Page Here</a></h2>
                <div className="">
                    <img src={image}/>
                </div>
                <div className="flex flex-col">
                        <h1 className='border-b'>Languages Used</h1>
                    <div className="flex w-full justify-around mt-1" >
                        <div className="">
                            <ol>
                                {list.map((item,index)=>(
                                    <li key={index}>{item}</li>   
                                    ))}
                            </ol>
                        </div>
                        <div className="">
                            <ol>
                                {list2.map((item,index)=>(
                                <li key={index}>{item}</li>
                                ))}   
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
    </>
)
}
