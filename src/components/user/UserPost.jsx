import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Tooltip
} from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardFooter,
  Image,
  Button,
  Textarea,
} from "@nextui-org/react";
import { Heart, MessageCircle, Edit, Trash } from "lucide-react";
import * as jwtDecode from 'jwt-decode';
import { EyeIcon } from "../miscellaneous/EyeIcon";
import { DeleteIcon } from "lucide-react";
import { EditIcon } from "../miscellaneous/EditIcon";






export default function UserPost({currentUserId, post }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  
  
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState("");
  const[likesSize, setLikesSize] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  const addCommentToPost = async () => {
    if (commentText.trim() !== "") {
      try {
        const token = localStorage.getItem("auth-token");
        const headers = {
          Authorization: token,
          "Content-Type": "application/json",
        };
        const response = await axios.post(
          "https://social-media-backend-hq87.onrender.com/api/user/comment/addcomment",
          {
            content: commentText,
            postId: post._id,
          },
          { headers }
        );
        const comment = await response.data;
        setComments([
          ...comments,
          { _id: comment._id, commentedBy: comment.user, content: comment.content },
        ]);
        setCommentText("");
        // Fetch comments again to ensure the latest data is displayed
        fetchComments();
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };
  

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const headers = {
        Authorization: token,
        "Content-Type": "application/json",
      };
      const response = await axios.get("https://social-media-backend-hq87.onrender.com/api/user/comment/fetchcomments", {
        params: {
          postId: post._id,
        },
        headers: headers,
      });
      const fetchedComments = await response.data;
      setComments(fetchedComments);
      console.log("fetched comments", fetchedComments)
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleToggleComments = () => {
    setShowComments((prev) => !prev);
  };


  const handleEditComment = (comment) => {
    setEditCommentId(comment._id);
    setEditCommentContent(comment.content);
    onOpen();
  };

  const handleUpdateComment = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const headers = {
        Authorization: token,
        "Content-Type": "application/json",
      };
      await axios.put(
        "https://social-media-backend-hq87.onrender.com/api/user/comment/updatecomment",
        {
          commentId: editCommentId,
          content: editCommentContent,
        },
        { headers }
      );
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === editCommentId
            ? { ...comment, content: editCommentContent }
            : comment
        )
      );
      setEditCommentId(null);
      setEditCommentContent("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const deleteComment = async (commentId) => {
    // Optimistically update the state
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );
  
    try {
      const token = localStorage.getItem("auth-token");
      const headers = {
        Authorization: token,
        "Content-Type": "application/json",
      };
  
      const response = await axios.delete('https://social-media-backend-hq87.onrender.com/api/user/comment/deletecomment', {
        headers,
        data: { commentId },
      });
  
      if (response.status !== 200) {
        // If the delete operation failed, revert the state
        setComments((prevComments) => [
          ...prevComments,
          prevComments.find((comment) => comment._id === commentId)
        ]);
        console.error("Error deleting comment:", response.data.message);
      } else {
        console.log("successfully deleted comment")
      }
    } catch (error) {
      // Revert the state if there was an error
      setComments((prevComments) => [
        ...prevComments,
        prevComments.find((comment) => comment._id === commentId)
      ]);
      console.error("Error deleting comment:", error);
    }
  };

  const fetchLikes = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const headers = {
        Authorization: token,
        "Content-Type": "application/json",
        
      };
      
      const response = await axios.get(
        "https://social-media-backend-hq87.onrender.com/api/user/like/fetchlikesonapost",
        {
          params: {
            postId: post._id,
          },
          headers: headers,
        }
      );
      const fetchedLikes = await response.data;
      setLikesSize(fetchedLikes.length);
      console.log("fetched likes", typeof fetchedLikes.length);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };
  const likePost = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const headers = {
        Authorization: token,
        
      };
      const response = await axios.post(
        "https://social-media-backend-hq87.onrender.com/api/user/like/likeapost",
        {
          postId: post._id,
        },
        { headers }
      );
      const like = await response.data;
      setLikesSize(likesSize + 1);
      setIsLiked(true);
      console.log("like", like);
      fetchLikes();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  }

  const unLikePost = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const headers = {
        Authorization: token,
        
      };
      const response = await axios.delete(
        "https://social-media-backend-hq87.onrender.com/api/user/like/unlikeapost",
        {
          headers,
          data: { postId: post._id },
        }
      );
      const like = await response.data;
      setLikesSize(likesSize - 1);
      setIsLiked(false);
      console.log("unlike", like);
      fetchLikes();
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  
  }

  const findIfPostIsLiked = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const headers = {
        Authorization: token,
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        "https://social-media-backend-hq87.onrender.com/api/user/like/findifapostisliked",
        {
          params: {
            postId: post._id,
          },
          headers: headers,
        }
      );
      const fetchedLike = response.data;
      setIsLiked(fetchedLike.booleanVal);
      console.log("isLiked",isLiked)
      console.log("fetched like", fetchedLike);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  }
  
  useEffect(() => {
    findIfPostIsLiked();
    fetchLikes();
  
    
    fetchComments();
  }, []);

  return (
    <div className="my-4 max-w-[700px]">
      <Card isFooterBlurred className="w-full h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            {post.postedBy}
          </p>
          <h4 className="text-white/90 font-medium text-xl">{post.caption}</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Post background"
          className="z-0 w-full h-full object-cover"
          src={post.imageUrl}   // put here
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 flex justify-between items-center w-full">
          <div className="flex items-center space-x-2">
            <Button
              radius="full"
              size="sm"
              className="flex items-center space-x-1"
              onClick={isLiked ? unLikePost : likePost}
            >
              <Heart
                color={isLiked ? "red" : "white"}
                fill={isLiked ? "red" : "none"}
              />
              <span>{likesSize}</span>
            </Button>
            <Button
              radius="full"
              size="sm"
              className="flex items-center space-x-1"
              onClick={handleToggleComments}
            >
              <MessageCircle />
              <span>{comments.length}</span>
            </Button> {post.caption}
          </div>
        </CardFooter>
      </Card>
      {showComments && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
          <Textarea
            variant="flat"
            label="Add a comment"
            placeholder="Write your comment here..."
            className="mb-4"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button
            radius="full"
            className="bg-blue-500 text-white mb-4"
            onClick={addCommentToPost}
          >
            Comment 
          </Button>
          <div className="space-y-4">
            {comments &&
              comments.map((comment) => (
                <div key={comment._id} className="border-b pb-2">
                  <p>{comment.commentedBy}</p>
                  <p className="font-semibold">{comment.content}</p>  {currentUserId === comment.user && 
                  <div className="flex gap-4 items-center"> 
                    <Button onClick={() => {deleteComment(comment._id)}} color="danger" variant="bordered">
                      Delete 
                    </Button>
                    
                    <Button
                    key = "opaque"
                      onPress={() => handleEditComment(comment)}
                      color="primary"
                    >
                      Edit
                    </Button>
                  </div>
}

                </div>
              ))}
          </div>
        </div>
      )}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Comment
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Update comment"
                    value={editCommentContent}
                    onChange={(e) => setEditCommentContent(e.target.value)}
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={handleUpdateComment}>
                    Update Comment
                  </Button>
                  <Button color="secondary" onPress={onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
