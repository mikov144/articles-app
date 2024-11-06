// src/components/CommentSection/CommentSection.js
import React, { useEffect, useState } from 'react';
import { fetchCommentsByArticleId, createComment } from '../../services/articleService';
import { getCurrentUser } from '../../services/authService';
import Comment from './Comment';
import { CommentSectionWrapper } from './commentSection.styled';

const CommentSection = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const username = getCurrentUser();

  useEffect(() => {
    const getComments = async () => {
      try {
        const data = await fetchCommentsByArticleId(articleId);
        const commentsWithReplies = data.map(comment => ({
          ...comment,
          replies: comment.replies || []
        }));
        setComments(commentsWithReplies);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    getComments();
  }, [articleId]);

  const handleAddComment = async () => {
    if (!username) {
      console.error("User is not authenticated");
      return;
    }

    const commentData = {
      content: newComment,
      author: {
        username: username
      },
      replies: []
    };

    try {
      const savedComment = await createComment(articleId, commentData);
      const newCommentWithId = { ...savedComment, id: `comment-${Date.now()}`, author: { username } };
      setComments([...comments, newCommentWithId]); // Use backend-provided ID and ensure the username is correct
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <CommentSectionWrapper>
      <h2 className='comment-section__title'>Комментарии:</h2>
      <div className="comment-section__input">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Оставить комментарий..."
          className="comment-section__input-text"
        />
        <button onClick={handleAddComment} className="comment-section__input-button">Отправить</button>
      </div>
      <div className="comment-section__list">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onDelete={handleDeleteComment} />
        ))}
      </div>
    </CommentSectionWrapper>
  );
};

export default CommentSection;




// src/components/CommentSection/CommentSection.js
// import React, { useEffect, useState } from 'react';
// import { fetchCommentsByArticleId, createComment } from '../../services/articleService';
// import { getCurrentUser } from '../../services/authService';
// import Comment from './Comment';
// import { CommentSectionWrapper } from './commentSection.styled';

// const CommentSection = ({ articleId }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const username = getCurrentUser();

//   useEffect(() => {
//     const getComments = async () => {
//       try {
//         const data = await fetchCommentsByArticleId(articleId);
//         const commentsWithReplies = data.map(comment => ({
//           ...comment,
//           replies: comment.replies || []
//         }));
//         setComments(commentsWithReplies);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };
//     getComments();
//   }, [articleId]);

//   const handleAddComment = async () => {
//     if (!username) {
//       console.error("User is not authenticated");
//       return;
//     }

//     const commentData = {
//       content: newComment,
//       author: {
//         username: username
//       },
//       replies: []
//     };

//     try {
//       const savedComment = await createComment(articleId, commentData);
//       setComments([...comments, savedComment]); // Use backend-provided ID
//       setNewComment('');
//     } catch (error) {
//       console.error('Error creating comment:', error);
//     }
//   };

//   const handleDeleteComment = (commentId) => {
//     setComments(comments.filter(comment => comment.id !== commentId));
//   };

//   return (
//     <CommentSectionWrapper>
//       <h2 className='comment-section__title'>Комментарии:</h2>
//       <div className="comment-section__input">
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Оставить комментарий..."
//           className="comment-section__input-text"
//         />
//         <button onClick={handleAddComment} className="comment-section__input-button">Отправить</button>
//       </div>
//       <div className="comment-section__list">
//         {comments.map((comment) => (
//           <Comment key={comment.id} comment={comment} onDelete={handleDeleteComment} />
//         ))}
//       </div>
//     </CommentSectionWrapper>
//   );
// };

// export default CommentSection;