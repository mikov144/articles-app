// // src/components/CommentSection/CommentSection.js
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
//       created_at: new Date().toISOString(),
//       replies: []
//     };

//     console.log('username: ', commentData);

//     try {
//       const savedComment = await createComment(articleId, commentData);
//       setComments([...comments, savedComment]);
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
//           <Comment key={comment.id} comment={comment} articleId={articleId} onDelete={handleDeleteComment} />
//         ))}
//       </div>
//     </CommentSectionWrapper>
//   );
// };

// export default CommentSection;



// // src/components/CommentSection/Comment.js
// import React, { useState } from 'react';
// import { editComment, deleteComment } from '../../services/articleService';
// import { getCurrentUser } from '../../services/authService';
// import { CommentWrapper } from './comment.styled';
// import TrashBin from '../../icons/delete.png'
// import EditBtn from '../../icons/edit.png'
// import ReplyBtn from '../../icons/reply.png'

// const Comment = ({ comment, articleId, onDelete }) => {
//   const [reply, setReply] = useState('');
//   const [showReplyBox, setShowReplyBox] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedContent, setEditedContent] = useState(comment.content);
//   const username = getCurrentUser();

//   const handleReplyChange = (e) => {
//     setReply(e.target.value);
//   };

//   const handleReplySubmit = async () => {
//     if (!username) {
//       console.error("User is not authenticated");
//       return;
//     }

//     const replyData = {
//       content: reply,
//       author: {
//         username: username
//       },
//       id: `reply-${Date.now()}`
//     };

//     try {
//       const updatedComment = { ...comment, replies: comment.replies || [] };
//       updatedComment.replies.push(replyData);
//       setReply('');
//       setShowReplyBox(false);
//     } catch (error) {
//       console.error('Error creating reply:', error);
//     }
//   };

//   const handleEditChange = (e) => {
//     setEditedContent(e.target.value);
//   };

//   const handleEditSubmit = async () => {
//     try {
//       await editComment(articleId, comment.id, { content: editedContent });
//       comment.content = editedContent;
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error editing comment:', error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteComment(articleId, comment.id);
//       onDelete(comment.id);
//     } catch (error) {
//       console.error('Error deleting comment:', error);
//     }
//   };

//   return (
//     <CommentWrapper>
//       {isEditing ? (
//         <div className='edit-section'>
//           <textarea
//             value={editedContent}
//             onChange={handleEditChange}
//             placeholder="Новый комментарий..."
//             className='edit-input__text'
//           />
//           <button onClick={handleEditSubmit} className='edit__button'>Сохранить</button>
//         </div>
//       ) : (
//         <>
//           <div className='comment-header'>
//             <p className='comment-header__author'>{comment.author ? comment.author.username : 'Anonymous'}</p>
//             <div className='comment__meta'>
//               <span className='comment__date'>{comment.created_at ? new Date(comment.created_at).toLocaleDateString("ru-RU") : 'Дата:'}</span>
//               <button onClick={() => setShowReplyBox(!showReplyBox)} className='comment__button'><img className='comment_button-icon' src={ReplyBtn} alt='' /></button>
//               {comment.author && comment.author.username === username && (
//                 <>
//                   <button onClick={() => setIsEditing(!isEditing)} className='comment__button'><img className='comment_button-icon' src={EditBtn} alt='' /></button>
//                   <button onClick={handleDelete} className='comment__button'><img className='comment_button-icon' src={TrashBin} alt='' /></button>
//                 </>
//               )}
//             </div>
//           </div>
//           <p className='comment__message'>{comment.content}</p>
//         </>
//       )}
//       {showReplyBox && (
//         <div className="reply-input">
//           <textarea
//             value={reply}
//             onChange={handleReplyChange}
//             placeholder="Напишите ответ..."
//             className='reply-input__text'
//           />
//           <button onClick={handleReplySubmit} className='reply-input__button'>Отправить</button>
//         </div>
//       )}
//       <div className="replies">
//         {comment.replies && comment.replies.map((reply) => (
//           <div key={reply.id} className="reply">
//             <p className='reply__author'>{reply.author ? reply.author.username : 'Anonymous'}</p>
//             <span className='reply__date'>{comment.created_at ? new Date(comment.created_at).toLocaleDateString("ru-RU") : 'Дата:'}</span>
//             <p className='reply__message'>{reply.content}</p>
//           </div>
//         ))}
//       </div>
//     </CommentWrapper>
//   );
// };

// export default Comment;