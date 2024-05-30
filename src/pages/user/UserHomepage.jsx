import React from 'react';
import UserHomepagePosting from '@/components/user/UserHomepagePosting';
import UserPost from '@/components/user/UserPost';
import SocialMediaPost from '@/components/user/SocialMediaPost';

function UserHomepage() {
  return (
    <div className="max-w-[900px] mx-auto px-8">
      <div className="grid grid-cols-1 gap-4">
        
        <div className="col-span-1">
        <UserHomepagePosting />
          
          <UserPost />
          <UserPost />
          <UserPost />
          <UserPost />
        </div>
      </div>
    </div>
  );
}

export default UserHomepage;
