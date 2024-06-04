import React, { useEffect, useState } from "react";
import UserHomepagePosting from "@/components/user/UserHomepagePosting";
import UserPost from "@/components/user/UserPost";
// import SocialMediaPost from '@/components/user/SocialMediaPost';
import axios from "axios";

function UserHomepage() {
  const [allPosts, setAllPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const headers = {
        Authorization: token
      };
      const response = await axios.get(
        "https://social-media-backend-hq87.onrender.com/api/user/post/allposts",
        { headers }
      );
      const posts = await response.data;
      setAllPosts(posts);
      console.log(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const findCurrentUser = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const headers = {
        Authorization: token,
      };

      const response = await axios.get('https://social-media-backend-hq87.onrender.com/api/user/getuserid', {
        headers,
      });
      const userId = response.data;
      console.log("userId", userId);
      setCurrentUserId(userId);
    } catch (error) {
      console.error("Error finding current user:", error);
    }
  }

  useEffect(() => {
    findCurrentUser();
    fetchPosts();
    console.log(allPosts);
  }, []);

  const handlePostCreated = (newPost) => {
    setAllPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="max-w-[900px] mx-auto px-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <UserHomepagePosting onPostCreated={handlePostCreated} />
        </div>

        {allPosts && allPosts.map((post) => (
          <div key={post._id} className="col-span-1">
            <UserPost currentUserId={currentUserId} post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserHomepage;
