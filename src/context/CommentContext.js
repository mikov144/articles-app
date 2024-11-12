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
    setComments(data);
  };

  const createComment = async (articleId, commentData) => {
    const newComment = await apiCreateComment(articleId, commentData);
    setComments((prevComments) => [...prevComments, newComment]);
    return newComment;
  };

  const editComment = async (articleId, commentId, commentData) => {
    await apiEditComment(articleId, commentId, commentData);
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, content: commentData.content } : comment
      )
    );
  };

  const deleteComment = async (articleId, commentId) => {
    await apiDeleteComment(articleId, commentId);
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
  };

  return (
    <CommentContext.Provider
      value={{ comments, fetchComments, createComment, editComment, deleteComment }}
    >
      {children}
    </CommentContext.Provider>
  );
};


