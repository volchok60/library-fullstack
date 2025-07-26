import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../lib/api'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    try {
      const user = await login(username, password)
      console.log('username: ' + user.username)
      localStorage.setItem("username", user.username)
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div>
      <h1 className='text-center m-2'>Login Form</h1>
      <form onSubmit={handleLogin}>
        <div className="grid grid-cols-2 gap-3">
          <label className='sm:text-end'>Username:</label>
          <input 
            type="text" 
            required 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
          />
          
          <label className='sm:text-end'>Password:</label>
          <input 
            type="password" 
            required 
            value={password} 
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className='text-center'>
          <input 
            type="submit" 
            value="Login" 
            className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 m-2 px-2' 
          />
        </div>
      </form>
    </div>
  )
}