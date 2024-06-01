import React, { useEffect, useState } from 'react';
import { Button, Input, Textarea } from '@nextui-org/react';
import CurrentUserPost from '@/components/user/CurrentUserPost';
import FollowersComponent from '@/components/user/FollowersComponent';
import axios from 'axios';

const MyProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("")
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState({
    image: 'https://nextui-docs-v2.vercel.app/images/album-cover.png',
    bio: 'This is the bio.',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  });

  const [posts, setPosts] = useState([
    'Post 1: Lorem ipsum dolor sit amet.',
    'Post 2: Consectetur adipiscing elit.',
    'Post 3: Integer molestie lorem at massa.',
  ]);

  const [followers, setFollowers] = useState([
    { name: 'Jane Smith', username: 'janesmith' },
    { name: 'Bob Johnson', username: 'bobjohnson' },
    { name: 'Alice Brown', username: 'alicebrown' },
  ]);

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });


  };

  const fetchUserPosts = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const headers = {
        Authorization:
          token
      };
      const response = await axios.get("http://localhost:3000/api/user/post/userposts", {
        
        headers
      });

      
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
    fetchUserPosts();
    console.log(allPosts)
    

  }, []);

  return (
    <div className="flex flex-col md:flex-row p-5 space-y-5 md:space-y-0 md:space-x-5">
      <div className="w-full md:w-1/2 p-5 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">My Profile</h2>
          <Button auto flat onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </div>
        <div className="mt-5">
          <img src="https://nextui-docs-v2.vercel.app/images/album-cover.png" alt="Profile" className="w-32 h-32 rounded-full mx-auto" />
          {isEditing ? (
            <>
              <Input
                label="Name"
                fullWidth
                value={user.name}
                name="name"
                onChange={handleInputChange}
                className="mt-4"
              />
              <Input
                label="Username"
                fullWidth
                value={user.username}
                name="username"
                onChange={handleInputChange}
                className="mt-4"
              />
              <Input
                label="Email"
                fullWidth
                value={user.email}
                name="email"
                onChange={handleInputChange}
                className="mt-4"
              />
              <Input
                label="Phone"
                fullWidth
                value={user.phone}
                name="phone"
                onChange={handleInputChange}
                className="mt-4"
              />
              <Textarea
                label="Bio"
                fullWidth
                value={user.bio}
                name="bio"
                onChange={handleInputChange}
                className="mt-4"
              />
            </>
          ) : (
            <>
              <p className="text-center mt-4 font-semibold">{user.name}</p>
              <p className="text-center mt-2">@{user.username}</p>
              <p className="text-center mt-2">{user.email}</p>
              <p className="text-center mt-2">{user.phone}</p>
              <p className="text-center mt-4">{user.bio}</p>
            </>
          )}
        </div>

        {/* Followers Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Followers</h3>
          <ul className="mt-4 space-y-2">
            
           <FollowersComponent/>
          </ul>
        </div>
      </div>

      <div className="w-full md:w-1/2 p-5 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold">My Posts</h2>
        <div className="mt-5 space-y-4">
          { allPosts && allPosts.map((post, index) => (
            <CurrentUserPost currentUserId ={currentUserId} post = {post} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
