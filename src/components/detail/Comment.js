import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentService from '../../services/CommentService';
import Swal from 'sweetalert2';
import './Comment.css';

const Comment = ({ mealId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const currentUser = sessionStorage.getItem('username') || 'Guest';
    const navigate = useNavigate();

    // Hàm để format thời gian
    const formatDate = (dateArray) => {
        if (!Array.isArray(dateArray) || dateArray.length < 3) {
            return "Unknown date";
        }
        const [year, month, day, hour, minute, second] = dateArray;
        const date = new Date(year, month - 1, day, hour, minute, second);
        return isNaN(date.getTime())
            ? "Unknown date"
            : new Intl.DateTimeFormat('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                hour12: true
            }).format(date);
    };

    const alertSuccess = (message) => {  
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500
        });
    };

    const alertError = (message) => {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Error',
            text: message,
            showConfirmButton: true,
        });
    };

    useEffect(() => {
        CommentService.getComments(mealId)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => console.error("Error fetching comments:", error));
    }, [mealId]);
    

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (currentUser === 'Guest') {
            alertError('You need to be logged in to post a comment.');
            return;
        }
        if (newComment.trim() !== '') {
            const newCommentObject = {
                id: null,
                author: currentUser,
                content: newComment,
                created_at: new Date().toISOString(),
                mealId: mealId,
            };
            CommentService.addComment(newCommentObject)
                .then(response => {
                    setComments([...comments, response.data]);
                    setNewComment('');
                    alertSuccess('Comment added successfully!');
                })
                .catch(error => console.error("Error adding comment:", error));
        }
    };

    const handleDeleteComment = (commentId) => {
        CommentService.deleteComment(commentId)
            .then(() => {
                setComments(comments.filter(comment => comment.id !== commentId));
            })
            .catch(error => console.error("Error deleting comment:", error));
    };

    return (
        <div className="comments-section">
            <h3>Comments</h3>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                />
                <button type="submit">Submit</button>
            </form>
            <ul className="comments-list">
                {comments.map((comment) => (
                    <li key={comment.id} className="comment-item">
                        <div className="comment-content">
                            <strong>{comment.author}</strong> - <em>{formatDate(comment.created_at)}</em>
                            <p>{comment.content}</p>
                        </div>
                        {comment.author === currentUser && (
                            <button
                                className="delete-comment-btn"
                                onClick={() => handleDeleteComment(comment.id)}
                            >
                                Delete
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comment;
