import { Input, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useNavigate} from 'react-router-dom';
import 'tailwindcss/tailwind.css'; // Make sure to import Tailwind CSS
import { useState } from "react";
import axios from "axios";

function UserSignUp() {


  
  const[name, setName] = useState('')
  const[username, setUsername] = useState('')
  const[emailID, setemailID] = useState('')
  const[password, setPassword] = useState('')
  const[confirmPassword, setConfirmPassword] = useState('')
  const[err, setErr] = useState('')
  const [currentUserId, setCurrentUserId] = useState("")
  const navigate = useNavigate();


  const signup = async () => {
    if (password !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }
    try {
      const response =await axios.post("/api/user/signup", {
        name,
        username,
        emailID,
        password,
      });
      console.log("response data error", response.data.error)
      if(response.status == 200) {
        console.log("User signed up");
        const json = response.data;
        const {token} = json;
        console.log("Token:", token)
        localStorage.setItem("auth-token", token);
        return navigate('/user/homepage')

      }
      else {
        setErr(response.data.error);
        console.log("response data error", response.data.error)
        console.log("Error :", reponse.data.error);
      }
    } catch (error) {
      
      setErr("Error signing up");
      console.log("Error signing up:", error);
    }
  }
  return(
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="border border-gray-300 p-8 rounded-lg shadow-lg bg-white">
    <h1 className="text-2xl font-bold mb-6 text-center">Create new account</h1>
    <form className="flex flex-col gap-4 items-center">
    <Input
        className="w-72"
        type="text"
        label="name"
        labelPlacement="inside"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    <Input
        className="w-72"
        type="text"
        label="choose a unique username"
        labelPlacement="inside"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        
      />
    <Input
        className="w-72"
        type="email"
        label="Email"
        labelPlacement="inside"
        value={emailID}
        onChange={(e) => setemailID(e.target.value)}
      />
      <Input
        className="w-72"
        type="password"
        label="Password"
        labelPlacement="inside"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        className="w-72"
        type="password"
        label="Confirm Password"
        labelPlacement="inside"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      
      <Button onClick={signup} className="w-72 mt-4" auto>
        Sign Up
      </Button>
      <Button className="w-72 mt-2 bg-red-500 text-white" auto>
        Sign up with Google
      </Button>
      <Link color = "green">Forgot password</Link>
      {err && <p className="text-red-500 text-sm">{err}</p>}
    </form>
  </div>
</div>
  )
}

export default UserSignUp
