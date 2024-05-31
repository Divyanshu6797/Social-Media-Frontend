import React, { useEffect, useState } from "react";
import UserHomepagePosting from "@/components/user/UserHomepagePosting";
import UserPost from "@/components/user/UserPost";
// import SocialMediaPost from '@/components/user/SocialMediaPost';
import axios from "axios";

function UserHomepage() {
  const [allPosts, setAllPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("")
  const fetchPosts = async () => {
    try {
      const headers = {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NThjMmNiZGE4YjNjNzA1ODgyYWEzYiIsImlhdCI6MTcxNzEyODY0NiwiZXhwIjoxNzE3Mzg3ODQ2fQ.lxsJ-NQLAfpn2XGMijTeLgUlpFYS1TZ5kOwxGQk_j3Y",
      };
      const response = await axios.get(
        "/api/user/post/allposts",
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

      const response = await axios.get('/api/user/getuserid', {
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
      <div className="grid grid-cols-1 gap-4">
        <div className="col-span-1">
          <UserHomepagePosting onPostCreated={handlePostCreated}/>

          {allPosts && allPosts.map((post) => (
            <UserPost currentUserId = {currentUserId} key={post._id} post={post} />
          ))
        }

         
        </div>
      </div>
    </div>
  );
}

export default UserHomepage;
