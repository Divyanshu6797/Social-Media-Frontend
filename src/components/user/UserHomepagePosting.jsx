import React, { useEffect, useState } from "react";
import { Textarea } from "@nextui-org/react";
import { Button, Input } from "@nextui-org/react";
import { CameraIcon } from "../miscellaneous/CameraIcon";
import axios from "axios";

function UserHomepagePosting({ onPostCreated }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [err, setErr] = useState("");

  const uploadImage = async (e) => {
    if (image == null) {
      console.log("No image");
      alert("No image");
    } else {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "Socialapp");
      data.append("cloud_name", "dzclpwy78");

      await fetch("https://api.cloudinary.com/v1_1/dzclpwy78/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setImage(data.url);
        });
    }
  };

  const createPost = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const headers = {
        Authorization: token,
      };
      uploadImage();
      console.log("image", image)
      const response = await axios.post(
        "https://social-media-backend-hq87.onrender.com/api/user/post/addpost",
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
    <div className="w-full ml-0 md:ml-0 max-w-[700px] mx-auto px-8 py-8 bg-white rounded-lg shadow-lg">
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
          type="file"
          className="flex items-center space-x-2 my-5"
        >
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />

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
