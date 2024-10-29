// src/components/CommentSection.js
import React, { useEffect, useState } from 'react';
import { fetchCommentsByArticleId } from '../services/articleService';
import Comment from './Comment';

const CommentSection = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const getComments = async () => {
      try {
        const data = await fetchCommentsByArticleId(articleId);
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    getComments();
  }, [articleId]);

  const handleAddComment = () => {
    const comment = {
      id: comments.length + 1,
      content: newComment,
      author: {
        username: 'current_user' // Replace with actual current user
      },
      replies: []
    };
    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      <div className="comment-input">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Post</button>
      </div>
      <div className="comments-list">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
