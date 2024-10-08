import React from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
////
import { Avatar, Button, Dropdown, DropdownDivider, DropdownItem, Navbar, TextInput } from 'flowbite-react'
import{AiOutlineSearch} from 'react-icons/ai'
import {FaMoon, FaSun} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { signOutSuccess } from '../redux/user/userSlice'
import {useState, useEffect} from 'react'

export default function Header() {
    
    const {currentUser} = useSelector((state)=>state.user)
    const path = useLocation().pathname;
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const {theme} = useSelector((state)=>state.theme)
    const [searchTerm, setSearchTerm] = useState('')
    
   
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl)
        }
    },[location.search])

    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/user/signout',{
                method:'POST',
            })
            const data = await res.json()
            if(!res.ok){
                console.log(data.message);
            }else{
                dispatch(signOutSuccess())
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSearchSubmit = (event) =>{
        event.preventDefault()
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', searchTerm)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }
  return (
    <>
        <Navbar className='border-b-2'>
            <Link to ='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 mr-1 bg-gradient-to-r from-indigo-500 via-purple-500 to bg-red-500 rounded-lg text-white'>GoAsk.Dev</span>John
            </Link>
            
            <form className='flex relative hidden' onSubmit={handleSearchSubmit}>
                <TextInput type='text' 
                placeholder='Search...' 
                className='hidden lg:inline'
                value={searchTerm}
                onChange={(event)=>setSearchTerm(event.target.value)}
                />
                <button onSubmit={handleSearchSubmit}><AiOutlineSearch className='text-xl absolute top-[13px] right-2 hidden lg:inline'/></button>
            </form>
            
            <Button className='w-12 h-10 hidden' color='gray' pill>
                <AiOutlineSearch/>
            </Button>
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
                    {theme === 'light' ? <FaMoon/> : <FaSun/>}
                 
                </Button>
                    {currentUser ? (
                        <Dropdown arrowIcon={false} inline 
                        label={<Avatar alt ='user' 
                        img={currentUser.profilePicture} 
                        rounded/>}>
                            <Dropdown.Header>
                                <span className='block text-sm'>@{currentUser.username}</span>
                                <span className='block text-sm font-medium truncate'>@{currentUser.email}</span>
                            </Dropdown.Header>
                                <Link to ={'/dashboard?tab=profile'}>
                                    <DropdownItem>Profile</DropdownItem>
                                </Link>
                            <DropdownDivider/>
                            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                        </Dropdown>
                    ):
                    (
                    <Link to='/sign-in'>
                        <Button gradientDuoTone ='purpleToBlue' pill>
                            Sign-In
                        </Button>
                    </Link>
                )  
                }
                <Navbar.Toggle/>
            </div>
                <Navbar.Collapse>
                    <Link to='/'>
                        <Navbar.Link active = {path === "/"} as={'div'}>
                            Home
                        </Navbar.Link>     
                    </Link>
                    
                    <Link to='/about'>
                        <Navbar.Link active = {path === "/about"} as={'div'}>
                            About
                        </Navbar.Link>
                    </Link>
                    <Link to='/projects'>
                        <Navbar.Link active = {path === "/projects"} as={'div'}>    
                            Projects
                        </Navbar.Link>
                    </Link>
                </Navbar.Collapse>
        </Navbar>
    </>
  )
}
