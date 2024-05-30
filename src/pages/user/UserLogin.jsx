import { Input, Button } from "@nextui-org/react";
import 'tailwindcss/tailwind.css'; // Make sure to import Tailwind CSS

function UserLogin() {
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
          />
          <Input
            className="w-72"
            type="password"
            label="Password"
            labelPlacement="inside"
          />
          <Button className="w-72 mt-4" auto>
            Login
          </Button>
          <Button className="w-72 mt-2 bg-red-500 text-white" auto>
            Login with Google
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
