import React, { useEffect, useState } from 'react';
import { Button, Card, Avatar, Input } from '@nextui-org/react';
import { motion } from 'framer-motion';
import axios from 'axios';

import FollowerComponent from '@/components/followers/FollowerComponent';
import SuggestedFollowerComponent from '@/components/followers/SuggestedFollowerComponent';
import { set } from 'react-hook-form';

const FollowersPage = () => {
  const [suggestedFollowers, setSuggestedFollowers] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  

  const fetchSuggestedFollowers = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };
      const response = await axios.get('https://social-media-backend-hq87.onrender.com/api/user/follow/fetchsuggestedfollowers', {
        headers,
      });
      const followerSuggestions = await response.data;
      setSuggestedFollowers(followerSuggestions);
    } catch (error) {
      console.error('Error fetching suggested followers:', error);
    }
  };

 
  const fetchUserFollowers = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };
      const response = await axios.get('https://social-media-backend-hq87.onrender.com/api/user/follow/fetchfollowers', {
        headers,
      });
      const userFollowers = response.data;
      console.log('User Followers:', userFollowers);
      setUserFollowers(userFollowers);
    } catch (error) {
      console.error('Error fetching user followers:', error);
    }
  };

  useEffect(() => {
    fetchSuggestedFollowers();
    fetchUserFollowers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Followers Suggestions</h1>
      <div className="mb-6 flex justify-center">
    
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* Left half: Suggested Followers */}
        <div className="w-full">
          <h2 className="text-2xl font-bold text-center mb-4">Suggested Followers</h2>
          <Input clearable underlined placeholder="Search Suggested Followers..." className="mb-4" />
          <div className="grid grid-cols-3 gap-4">
            {suggestedFollowers && suggestedFollowers.map((follower) => (
              <SuggestedFollowerComponent key={follower._id} follower={follower} />
            ))}
          </div>
        </div>
        {/* Right half: User Followers */}
        <div className="w-full">
          <h2 className="text-2xl font-bold text-center mb-4">Your Followers</h2>
          <Input clearable underlined placeholder="Search Your Followers..." className="mb-4" />
          <div className="grid grid-cols-3 gap-4">
            {userFollowers.map((follower) => (
              <FollowerComponent key={follower._id} follower={follower} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowersPage;
