import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Label, TextInput, Alert, Spinner } from 'flowbite-react'
import SignUp from './SignUp';


export default function SignIn() {
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
    if(!formData.username || !formData.password){
      return setErrorMes('Please fill out all fields')
    }
    try{
      setLoading(true)
      setErrorMes(null)
      const res = await fetch ('/api/auth/sign-in',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false){
        setLoading(false)
        return setErrorMes('Password or Username had failed')
      }
      if(res.ok){
        navigate('/')
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
                  <Label value = "Your Password"/>
                  <TextInput type = 'password' placeholder = '**********' id = 'password' onChange={handleChange}/>
                </div>
                  <Button gradientDuoTone = 'purpleToPink' type='submit' disabled = {loading}>
                    {loading ? (
                    <>  
                      <Spinner size = 'sm'/>
                      <span className = 'pl-3'>Loading...</span>
                    </>
                    ) : 'Sign-In'
                  }
                  </Button>
              </form>
              <div className="flex gap-2 text-sm mt-3">
                <span> Don't Have an account?</span>
                  <Link to = '/sign-up' className='text-blue-500'>Sign-Up</Link>
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
