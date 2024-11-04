import {lazy,Suspense} from 'react'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
const Home = lazy(()=>import('./pages/Home'))
const About = lazy(()=>import('./pages/About'))
const SignIn = lazy(()=>import('./pages/SignIn'))
const SignUp = lazy(()=>import('./pages/SignUp'))
const DashBoard = lazy(()=>import('./pages/DashBoard'))
const Projects = lazy(()=>import('./pages/Projects'))
import Header from './components/Header'
const Footer = lazy(()=>import('./components/Footer'))
const PrivateRoute = lazy(()=>import('./components/PrivateRoute'))
const OnlyAdminPrivateRoute = lazy(()=>import('./components/OnlyAdminPrivateRoute'))
const CreatePost = lazy(()=>import('./pages/CreatePost'))
const UpdatePost = lazy(()=>import('./pages/UpdatePost'))
const PostPage = lazy(()=>import('./pages/PostPage'))
import ScrollToTop from './components/ScrollToTop'
import SearchPage from './pages/SearchPage'
 /////
function App() {

return (
    <>
  <BrowserRouter>
  <ScrollToTop/>
    <Header/>
      <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/sign-in' element={<SignIn/>} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/search' element={<SearchPage/>} />
        <Route element = {<PrivateRoute/>}>
          <Route path='/dashboard' element={<DashBoard/>} />
        </Route>
        <Route element = {<OnlyAdminPrivateRoute/>}>
          <Route path='/create-post' element={<CreatePost/>} />
          <Route path='/update-post/:postId' element={<UpdatePost/>} />
        </Route>
      <Route path='/projects' element={<Projects/>} />
      <Route path='/post/:postSlug' element={<PostPage/>} />
    </Routes>
    <Footer/>
    </Suspense>
  </BrowserRouter>
    </>
  )
}

export default App
