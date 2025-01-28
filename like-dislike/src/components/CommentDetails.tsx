import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LikeDislikeWithIcons from './BittonLikeDislike.tsx'
import { DateTime } from "luxon";
import { CommentModel } from '../types/interface.ts';
import { commentsData } from '../data/comments.ts';
import { v4 as uuidv4 } from 'uuid';

export interface ReplyModel {
    id: string;
    text: string,
    img?: string
}

const CommentDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [comment, setComment] = useState<CommentModel | null>(null);
    const [newComment, setNewComment] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Эмуляция загрузки данных по ID
    useEffect(() => {
        if (id) {
            setTimeout(() => {
                const foundComment = commentsData.data?.find((c) => c.id === id);
                if (foundComment) {
                    setComment(foundComment);
                } else {
                    setError('Комментарий не найден');
                }
                setLoading(false);
            }, 1000);
        } else {
            setError('Некорректный ID комментария');
            setLoading(false);
        }
    }, [id]);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Эмуляция отправки данных
        if (!newComment) {
            setError('Комментарий не может быть пустым');
            return;
        }
        // Создаем объект нового комментария
        const newReply = {
            id: uuidv4(),
            text: newComment,
            img: image ? URL.createObjectURL(image) : null, // Если есть изображение, создаем URL
        };

        setTimeout(() => {
            if (comment) {
                setComment({
                    ...comment,
                    replies: [...(comment.replies || []), newReply],
                });

                // очищаем поле ввода и картинку
                setNewComment('');
                setImage(null);
                navigate('/');
            }
        }, 2000);
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <button onClick={() => navigate('/')} className="mb-4 bg-gray-300 p-2">Назад</button>
            {comment ? (
                <div className="p-4">
                    <div className="font-bold">{comment.user?.username}</div>
                    <div>{DateTime.fromISO(comment.createDT).toRelative()}</div>
                    <div>{comment.text}</div>
                    <LikeDislikeWithIcons />

                    <h2>Добавить новый комментарий</h2>
                        <input
                            type="file"
                            onChange={(e) => e.target.files && setImage(e.target.files[0])}
                        />
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full mt-2 p-2 border"
                        placeholder="Напишите Ваш комментарий"
                    />
                    <button onClick={handleCommentSubmit} className="mt-2 bg-blue-500 text-white p-2">
                        Добавить комментариий
                    </button>
                </div>
            ) : (
                <div>Loading comment details...</div>
            )}
        </div>
    );
};

export default CommentDetail;
