import React from "react";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { HeartIcon } from "lucide-react";

export default function UserPost({post}) {
  
  
  return (
    <div className="my-4 max-w-[700px] px-8"> 
      <Card
        isFooterBlurred
        className="w-full h-[300px]" 
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            {post.postedBy}
          </p>
          <h4 className="text-white/90 font-medium text-xl">{post.caption}</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src="https://nextui.org/images/card-example-5.jpeg"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <Button radius="full" size="sm">
            <HeartIcon/>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
