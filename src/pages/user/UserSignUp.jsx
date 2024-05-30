import { Input, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import 'tailwindcss/tailwind.css'; // Make sure to import Tailwind CSS

function UserSignUp() {
  return(
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="border border-gray-300 p-8 rounded-lg shadow-lg bg-white">
    <h1 className="text-2xl font-bold mb-6 text-center">Create new account</h1>
    <form className="flex flex-col gap-4 items-center">
    <Input
        className="w-72"
        type="text"
        label="username"
        labelPlacement="inside"
      />
    <Input
        className="w-72"
        type="email"
        label="Email"
        labelPlacement="inside"
      />
      <Input
        className="w-72"
        type="password"
        label="Password"
        labelPlacement="inside"
      />
      <Input
        className="w-72"
        type="password"
        label="Confirm Password"
        labelPlacement="inside"
      />
      
      <Button className="w-72 mt-4" auto>
        Sign Up
      </Button>
      <Button className="w-72 mt-2 bg-red-500 text-white" auto>
        Sign up with Google
      </Button>
      <Link color = "green">Forgot password</Link>
    </form>
  </div>
</div>
  )
}

export default UserSignUp
