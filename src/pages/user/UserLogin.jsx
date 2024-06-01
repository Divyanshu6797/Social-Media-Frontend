import { Input, Button } from "@nextui-org/react";
import "tailwindcss/tailwind.css"; // Make sure to import Tailwind CSS
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserLogin() {
  
    const [emailID, setEmailID] = useState("");
    const [password, setPassword] = useState("");
    const [errDisplay, seterrDisplay] = useState("");
    const navigate = useNavigate();

    

    const login = async (e) => {
      e.preventDefault();
      const user = { emailID, password };
      try {
        const response = await axios.post("https://social-media-backend-hq87.onrender.com/api/user/login", user);

        if (response.status == 200) {
          const { token } = response.data;
          

          

          console.log("Frontend token:", token);
          localStorage.setItem("auth-token", token);
          

          return navigate("/user/homepage");
        } else {
          console.error("Error:", response);
          // seterrDisplay(response.error);
          
        }
      } catch (error) {
        console.log(error);
        console.error("Error:",error);
        // seterrDisplay(error);
        // setTimeout(() => {
        //   seterrDisplay("");
        // }, 2000);
      }
    };
  ;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border border-gray-300 p-8 rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="flex flex-col gap-4 items-center">
          <Input
            className="w-72"
            type="email"
            label="Email"
            labelPlacement="inside"
            value = {emailID}
            onChange={(e) => setEmailID(e.target.value)}
          />
          <Input
            className="w-72"
            type="password"
            label="Password"
            labelPlacement="inside"
            value = {password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick = {login} className="w-72 mt-4" auto>
            Login
          </Button>
          <Button className="w-72 mt-2 bg-red-500 text-white" auto>
            Login with Google
          </Button>
          
        </form>
        {errDisplay && <p className="text-red-500 text-sm">{errDisplay}</p>}
      </div>
    </div>
  );
}

export default UserLogin;
