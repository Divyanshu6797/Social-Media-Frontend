import React from 'react';
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

function UserHomepagePosting() {
    const handleImageUpload = () => {
        // Implement your image upload logic here
        console.log('Image upload functionality');
      };
    
  return (
    <div className="w-full ml-0 md:ml-0 max-w-[700px] mx-auto px-4 py-8 bg-white rounded-lg shadow-lg">
       <Textarea
          key="flat"
          variant="flat"
          labelPlacement="outside"
          placeholder="What's on your mind?"
          className=""
        />

        <div className="flex items-center justify-between">
        <Button
          variant="flat"
          color="primary"
          size="small"
          onClick={handleImageUpload}
          className="flex items-center space-x-2 my-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2.293 4.293a1 1 0 0 1 1.414-1.414L10 10.586l5.293-5.293a1 1 0 0 1 1.414 1.414L11.414 12l5.293 5.293a1 1 0 1 1-1.414 1.414L10 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L8.586 12 3.293 6.707a1 1 0 0 1-1.414-1.414z"
            />
          </svg>
          <span>Upload Image</span>
        </Button>
        <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white my-5">
          Post
        </Button>
      </div>
    </div>
  );
}

export default UserHomepagePosting;
