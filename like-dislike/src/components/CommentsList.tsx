import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateTime } from "luxon";
import LikeDislikeWithIcons from './BittonLikeDislike.tsx'
import { commentsData } from '../data/comments.ts';
import { CommentModel } from '../types/interface.ts'
import photo from '../img/photo.webp'
import CommentReplies from './CommentReplies.tsx';
import '../assets/style/CommentsList.css'

const CommentsList: React.FC = () => {
    const [comments, setComments] = useState<CommentModel[]>(commentsData.data || []);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Эмуляция загрузки данных
        setTimeout(() => {
            try {
                let savedComments = localStorage.getItem('comments');
                if (!savedComments || savedComments === '[]') {
                    // Загружаем комментарии в localStorage
                    savedComments = JSON.stringify(commentsData.data)
                    localStorage.setItem("comments", savedComments);
                }
                setComments(JSON.parse(savedComments));
            } catch (e) {
                setError('Отзывы не загружены');
            }
            setLoading(false);
        }, 2000);
    }, []);

    const handleClickComment = (id: string) => {
        // Переход на страницу с подробностями
        navigate(`/comment/${id}`);
    };

    if (loading) return <div>Загрузка отзывов...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="comments-list">
            <h1>Список отзывов</h1>
            <img src={photo} alt="photo" className="photo" />
            <ul className="comments">
                {comments.map((comment: CommentModel) => (
                    <li
                    key={comment.id}
                    className="comment-item"
                    >
                        <h2 >Отзыв</h2>
                        <div onClick={() => handleClickComment(comment.id)}>
                            <div className="font-bold">{comment.user?.username}</div>
                            <div className="text-gray-500 text-sm">{DateTime.fromISO(comment.createDT).toRelative()}</div>
                            <div>{comment.text}</div>
                        </div>
                        <CommentReplies replies={comment.replies} />
                        <LikeDislikeWithIcons
                            commentId={comment.id}
                            initialLikeData={comment.like} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentsList;
