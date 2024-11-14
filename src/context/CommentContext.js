// src/contexts/CommentContext.js
import React, { createContext, useContext, useState } from 'react';
import {
  fetchCommentsByArticleId,
  createComment as apiCreateComment,
  editComment as apiEditComment,
  deleteComment as apiDeleteComment,
} from '../services/articleService';

const CommentContext = createContext();

export const useComments = () => useContext(CommentContext);

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async (articleId) => {
    const data = await fetchCommentsByArticleId(articleId);
    // Ensure each comment has a replies array
    const commentsWithReplies = data.map(comment => ({
      ...comment,
      replies: comment.replies || []
    }));
    setComments(commentsWithReplies);
  };

  const createComment = async (articleId, commentData) => {
    const newComment = await apiCreateComment(articleId, commentData);
    newComment.replies = newComment.replies || []; // Ensure replies array is initialized
    setComments((prevComments) => [...prevComments, newComment]);
    return newComment;
  };

  const editComment = async (articleId, commentId, commentData) => {
    await apiEditComment(articleId, commentId, commentData);
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, content: commentData.content, replies: comment.replies || [] } : comment
      )
    );
  };

  const deleteComment = async (articleId, commentId) => {
    await apiDeleteComment(articleId, commentId);
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
  };

  const addReply = (commentId, reply) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...(comment.replies || []), reply] }
          : comment
      )
    );
  };

  return (
    <CommentContext.Provider
      value={{ comments, fetchComments, createComment, editComment, deleteComment, addReply }}
    >
      {children}
    </CommentContext.Provider>
  );
};

