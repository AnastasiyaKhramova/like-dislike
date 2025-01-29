import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateTime } from "luxon";
import LikeDislikeWithIcons from './BittonLikeDislike.tsx'
import { commentsData } from '../data/comments.ts';
import { CommentModel } from '../types/interface.ts'
import photo from '../img/photo.webp'
import CommentReplies from './CommentReplies.tsx';

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
                const parsedComments = JSON.parse(savedComments);
                setComments(parsedComments);
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

    const handleLikeDislike = (id: string, isLiked: boolean) => {
        setComments(prevComments => prevComments.map(comment => comment.id === id ? { ...comment, isLiked, likeCount: isLiked ? comment.likeCount + 1 : comment.likeCount - 1 } : comment));
        localStorage.setItem('comments', JSON.stringify(comments));
    };

    if (loading) return <div>Загрузка отзывов...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Список отзывов</h1>
            <img src={photo} alt="photo" style={{ width: 200 }} />
            <ul>
                {comments.map((comment: CommentModel) => (
                    <li
                        key={comment.id}
                        className="border p-4 mb-4 cursor-pointer"
                        style={{ listStyle: "none" }}
                    >

                        <div onClick={() => handleClickComment(comment.id)}>
                            <div className="font-bold">{comment.user?.username}</div>
                            <div className="text-gray-500 text-sm">{DateTime.fromISO(comment.createDT).toRelative()}</div>
                            <div>{comment.text}</div>
                        </div>
                        <CommentReplies replies={comment.replies} />
                        <LikeDislikeWithIcons
                            isLiked={comment.like.isLike}
                            likeCount={comment.like.likeCount}
                            onLikeDislike={(newLikeState) => handleLikeDislike(comment.id, newLikeState)} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentsList;
