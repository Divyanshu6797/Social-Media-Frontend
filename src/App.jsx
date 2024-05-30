import './App.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"

function App() {
  const [message, setMessage] = useState('')

  const handle = () => {
    axios.get('https://social-media-backend-hq87.onrender.com/api')
    .then((response) => {
      setMessage(response.data.message)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  

  return (
    <>
     <div>
      <Button onClick = {handle} >Click me</Button>
      {message && <h1>{message}</h1>}
    </div>
      
    </>
  )
}

export default App
