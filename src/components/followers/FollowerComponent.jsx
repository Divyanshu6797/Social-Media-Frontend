import React, { useState } from 'react';
import { Button, Card, Avatar, Input } from '@nextui-org/react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { UserIcon } from '../miscellaneous/UserIcon';

const FollowerComponent = ({follower}) => {
    const unfollowUser = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            const headers = {
                Authorization: token,
            };
            const response = await axios.post('https://social-media-backend-hq87.onrender.com/api/user/follow/unfollowuser', {
                individualId : follower.individual._id
            }, {
                headers,
            });
            console.log("unfollowed user");
            console.log('Response:', response.data);
            
        } catch (error) {
            console.error('Error unfollowing user:', error);
            
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
      <h4 className="text-lg font-semibold">{follower.individual.name}</h4>
      <p className="text-gray-600 text-sm">{follower.individual.username}</p>
     
<Button onClick = {unfollowUser} className='mt-2 bg-gradient-to-tr' radius="full" color="danger" variant="bordered" startContent={<UserIcon/>}>
        Unfollow
      </Button> 

     
    </Card>
  </motion.div>
  )
}

export default FollowerComponent
