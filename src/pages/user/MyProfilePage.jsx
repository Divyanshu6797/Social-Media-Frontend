import React, { useEffect, useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import CurrentUserPost from "@/components/user/CurrentUserPost";
import FollowersComponent from "@/components/user/FollowersComponent";
import axios from "axios";
import { set } from "react-hook-form";

const MyProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [emailID, setEmailID] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [bio, setBio] = useState("");

  const [posts, setPosts] = useState([
    "Post 1: Lorem ipsum dolor sit amet.",
    "Post 2: Consectetur adipiscing elit.",
    "Post 3: Integer molestie lorem at massa.",
  ]);

  const [followers, setFollowers] = useState([
    { name: "Jane Smith", username: "janesmith" },
    { name: "Bob Johnson", username: "bobjohnson" },
    { name: "Alice Brown", username: "alicebrown" },
  ]);

  const fetchUserPosts = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const headers = {
        Authorization: token,
      };
      const response = await axios.get(
        "https://social-media-backend-hq87.onrender.com/api/user/post/userposts",
        {
          headers,
        }
      );

      const posts = await response.data;
      setAllPosts(posts);
      console.log(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const edituserInfo = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const headers = {
        Authorization: token,
      };
      const response = await axios.put(
        "https://social-media-backend-hq87.onrender.com/api/user/editprofile",
        {
          name,
          username,
          emailID,
          phoneNo,
          bio,
        },
        {
          headers,
        }
      );
      console.log("response data error", response.data.error);
      if (response.status == 200) {
        console.log("User data updated successfully");
        
        
      } 
    } catch (error) {
      console.log("Error updating user data:", error);
      
    }
  };

  const findCurrentUserInfo = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const headers = {
        Authorization: token,
      };

      const response = await axios.get(
        "https://social-media-backend-hq87.onrender.com/api/user/fetchcurrentuserinfo",
        {
          headers,
        }
      );
      setCurrentUserId(response.data.user._id);

      const newUser = response.data.user;
      console.log("newUser", newUser);

      const { name, username, emailID, phoneNo, bio } = newUser;
      console.log("user details : ", name, username, emailID, phoneNo, bio);
      setName(name);
      setUsername(username);
      setEmailID(emailID);
      setPhoneNo(phoneNo);
      setBio(bio);
    } catch (error) {
      console.error("Error finding current user info:", error);
    }
  };
  useEffect(() => {
    findCurrentUserInfo();

    fetchUserPosts();
  }, []);

  return (
    <div className="flex flex-col md:flex-row p-5 space-y-5 md:space-y-0 md:space-x-5">
      <div className="w-full md:w-1/2 p-5 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">My Profile</h2>
          <Button
            auto
            flat
            onClick={() => {
              setIsEditing(!isEditing);
              if (isEditing) {
                edituserInfo();
              }
            }}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
        <div className="mt-5">
          <img
            src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto"
          />
          {isEditing ? (
            <>
              <Input
                label="Name"
                fullWidth
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="mt-4"
              />
              <Input
                label="Username"
                fullWidth
                value={username}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                className="mt-4"
              />
              <Input
                label="Email"
                fullWidth
                value={emailID}
                name="email"
                onChange={(e) => setEmailID(e.target.value)}
                className="mt-4"
              />
              <Input
                label="Phone"
                fullWidth
                value={phoneNo}
                name="phone"
                onChange={(e) => setPhoneNo(e.target.value)}
                className="mt-4"
              />
              <Textarea
                label="Bio"
                fullWidth
                value={bio}
                name="bio"
                onChange={(e) => setBio(e.target.value)}
                className="mt-4"
              />
            </>
          ) : (
            <>
              <p className="text-center mt-4 font-semibold">{name}</p>
              <p className="text-center mt-2">@{username}</p>
              <p className="text-center mt-2">{emailID}</p>
              <p className="text-center mt-2">{phoneNo}</p>
              <p className="text-center mt-4">{bio}</p>
            </>
          )}
        </div>

        {/* Followers Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Followers</h3>
          <ul className="mt-4 space-y-2">
            <FollowersComponent />
          </ul>
        </div>
      </div>

      <div className="w-full md:w-1/2 p-5 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold">My Posts</h2>
        <div className="mt-5 space-y-4">
          {allPosts &&
            allPosts.map((post, index) => (
              <CurrentUserPost
              allPosts={allPosts}
              setAllPosts={setAllPosts}
              

                currentUserId={currentUserId}
                post={post}
                key={index}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
