import React, { useEffect, useState } from "react";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { CameraIcon } from "../miscellaneous/CameraIcon";
import axios from "axios";

function UserHomepagePosting({ onPostCreated }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [err, setErr] = useState("");

  const createPost = async () => {
    try {
      const headers = {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTk4ODk1N2U5NjI3ZjJhYjg5YzIzOSIsImlhdCI6MTcxNzE0MzcwMSwiZXhwIjoxNzE3NDAyOTAxfQ.0lW4Vh49apFh_fgInQY7HlPVStKf23te1Aq_0tUfpCU",
      };
      const response = await axios.post(
        "/api/user/post/addpost",
        {
          caption: caption,
          imageUrl: image,
        },
        { headers }
      );
      const post = await response.data;
      onPostCreated(post);
      console.log("post created", post);
    } catch (error) {
      console.error("Error creating post:", error);
      setErr("Error creating post");
    }
  };
  useEffect(() => {}, []);

  return (
    <div className="w-full ml-0 md:ml-0 max-w-[700px] mx-auto px-4 py-8 bg-white rounded-lg shadow-lg">
      <Textarea
        key="flat"
        variant="flat"
        labelPlacement="outside"
        placeholder="What's on your mind?"
        className=""
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <div className="flex items-center justify-between">
        <Button
          variant="flat"
          color="primary"
          size="small"
          onClick={createPost}
          className="flex items-center space-x-2 my-5"
        >
          <CameraIcon />
        </Button>
        <Button
          radius="full"
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white my-5"
          onClick={createPost}
        >
          Post
        </Button>
      </div>
      {err && <p className="text-red-500 text-sm">{err}</p>}
    </div>
  );
}

export default UserHomepagePosting;
