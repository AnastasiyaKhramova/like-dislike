import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateTime } from "luxon";
import LikeDislikeWithIcons from './BittonLikeDislike.tsx'
import { commentsData } from '../data/comments.ts';
import { CommentModel } from '../types/interface.ts'
import photo from '../img/photo.webp'

const CommentsList: React.FC = () => {
    const [comments, setComments] = useState<CommentModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Эмуляция загрузки данных
        setTimeout(() => {
            try {
                setComments(commentsData.data || []);
                setLoading(false);
            } catch (e) {
                setError('Комментарии не загружены');
                setLoading(false);
            }
        }, 2000);
    }, []);

    const handleClickComment = (id: string) => {
        // Переход на страницу с подробностями
        navigate(`/comment/${id}`);
    };

    return (
        <div>
            {loading && <div>Загрузка комментариев...</div>}
            {error && <div>{error}</div>}
            <h1>Список отзывов</h1>
            <img src={photo} alt="photo" style={{width: 200}} />
            <ul>
                {comments.map((comment) => (
                    <li
                        key={comment.id}
                        className="border p-4 mb-4 cursor-pointer"
                        onClick={() => handleClickComment(comment.id)}
                        style={{listStyle:"none"}}
                    >
                        <div className="font-bold">{comment.user?.username}</div>
                        <div className="text-gray-500 text-sm">{DateTime.fromISO(comment.createDT).toRelative()}</div>
                        <div>{comment.text}</div>
                        <LikeDislikeWithIcons />
                        <h3>Комментарии</h3>
                        <div>
                            <p>{comment.replies?.text}</p>
                            <img src={comment.replies?.img} alt="commentPhoto" style={{width: 200}}  />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentsList;
