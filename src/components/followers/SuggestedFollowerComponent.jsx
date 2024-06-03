import React, { useState } from 'react';
import { Button, Card, Avatar, Input } from '@nextui-org/react';
import { motion } from 'framer-motion';
import axios from 'axios';
const SuggestedFollowerComponent = ({follower}) => {

    const followUser = async () => {
//         const followedbyId = req.userid;
//   const { individualId } = req.body;
console.log("happening");
        try {
            const token = localStorage.getItem('auth-token');
            const headers = {
                Authorization: token,
            };
            const response = await axios.post('https://social-media-backend-hq87.onrender.com/api/user/follow/followuser', {
                individualId : follower._id
            }, {
                headers,
            });
            console.log("followed user");
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error following user:', error);
        }
    }
  return (
    <motion.div
    key={1}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="w-full"
  >
    <Card className="flex flex-col items-center p-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
      <Avatar src='https://randomuser.me/api/portraits/women/2.jpg' size="lg" className="mb-2" />
      <h4 className="text-lg font-semibold">{follower.name}</h4>
      <p className="text-gray-600 text-sm">{follower.username}</p>
      <Button onClick={followUser} radius="full" className="mt-2 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
Follow
</Button>
     
    </Card>
  </motion.div>
  )
}

export default SuggestedFollowerComponent
