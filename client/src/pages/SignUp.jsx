import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Label, TextInput, Alert, Spinner } from 'flowbite-react'
import GoogleAuth from '../components/GoogleAuth';


export default function SignUp() {
  {/*States*/}
  const [formData,setFormData] = useState({});
  const [errorMes,setErrorMes] = useState(null);
  const [loading, setLoading] = useState(false);
  {/*Handler sections*/}

  const navigate = useNavigate()

  const handleChange = (event) => {
    setFormData({...formData,[event.target.id]:event.target.value.trim()})
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMes('Please fill out all fields')
    }
    try{
      setLoading(true)
      setErrorMes(null)
      const res = await fetch ('/api/auth/sign-up',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false){
        setLoading(false)
        return setErrorMes('User With That Login Exists')
      }
      if(res.ok){
        navigate('/sign-in')
      }
    }catch(error){
      setErrorMes(error.Message)
      setLoading(false)
    }
  }
  


  return (
    <>
      <div className='min-h-screen mt-20'>
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
          {/*leftSide*/}
          <div className="flex-1"> 
              <Link to ='/' className='font-bold dark:text-white text-4xl'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to bg-pink-500 rounded-lg text-white'>Gamers</span>Heaven
              </Link>
              <p className='text-sm mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus expedita aspernatur sapiente sint, libero est!</p>
          </div>
          {/*rightSide*/}
          <div className="flex-1">
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div>
                  <Label value = "Your Username"/>
                  <TextInput type = 'text' placeholder = 'UserName' id = 'username' onChange={handleChange}/>
                </div>
                <div>
                  <Label value = "Your E-mail"/>
                  <TextInput type = 'email' placeholder = 'name@' id = 'email' onChange={handleChange}/>
                </div>
                <div>
                  <Label value = "Your Password"/>
                  <TextInput type = 'password' placeholder = 'Password' id = 'password' onChange={handleChange}/>
                </div>
                  <Button gradientDuoTone = 'purpleToPink' type='submit' disabled = {loading}>
                    {loading ? (
                    <>  
                      <Spinner size = 'sm'/>
                      <span className = 'pl-3'>Loading...</span>
                    </>
                    ) : 'Sign-Up'
                  }
                  </Button>
                  <GoogleAuth/>
              </form>
              <div className="flex gap-2 text-sm mt-3">
                <span> Have an account?</span>
                  <Link to = '/sign-in' className='text-blue-500'>Sign-In</Link>
              </div>
              {
                errorMes && (
                  <Alert className = 'mt-5' color = 'failure'>
                    {errorMes}
                  </Alert>
                )
              }
          </div>
        </div>
      </div>
    </>
  )
}
