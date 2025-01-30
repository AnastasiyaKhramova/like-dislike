import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, replace } from 'react-router-dom';
import LikeDislikeWithIcons from './BittonLikeDislike.tsx'
import { DateTime } from "luxon";
import { CommentModel, ReplyModel } from '../types/interface.ts';
import { commentsData } from '../data/comments.ts';
import { v4 as uuidv4 } from 'uuid';
import CommentReplies from './CommentReplies.tsx';
import '../assets/style/CommentDetail.css'

const CommentDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [comment, setComment] = useState<CommentModel | null>(null);
    const [comments, setComments] = useState<CommentModel[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Эмуляция загрузки данных по ID
    useEffect(() => {
        setTimeout(() => {
            // Получаем данные из localStorage
            const savedComments = localStorage.getItem('comments');
            const commentsList = savedComments ? JSON.parse(savedComments) : commentsData.data;
            const foundComment = commentsList.find((c: CommentModel) => c.id === id);

            if (foundComment) {
                setComment(foundComment);
                setComments(commentsList);
            } else {
                setError('Комментарий не найден');
            }
            setLoading(false);
        }, 1000);
    }, [id]);

    // Сохранияем комментарии
    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Эмуляция отправки данных
        if (!newComment) {
            setError('Комментарий не может быть пустым');
            return;
        }
        // Создаем объект нового комментария
        const newReply: ReplyModel = {
            id: uuidv4(),
            text: newComment,
            img: image ? URL.createObjectURL(image) : null, // Если есть изображение, создаем URL
        };

        setTimeout(() => {
                // Обновляем локальное состояние комментариев
            const updateComments = comments.map((c) =>
                c.id === id
                    ? { ...c, replies: [...c.replies, newReply], like: { likeCount: c.like.likeCount, isLike: c.like.isLike } } : c);
                    localStorage.setItem('comments', JSON.stringify(updateComments));
                    
                    // Обновляем глобальное состояние комментариев
                    const updateComment = updateComments.find(c => c.id === id);
                    if (updateComment) {
                        setComment(updateComment)
                    }
                    setComments(updateComments);

                // очищаем поле ввода и картинку
                setNewComment('');
                setImage(null);
                navigate('/');
        }, 2000);
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <button onClick={() => navigate('/')} className="mb-4 bg-gray-300 p-2">Назад</button>
            {comment ? (
                <div className="comment-detail p-4">
                    <div className="font-bold">{comment.user?.username}</div>
                    <div>{DateTime.fromISO(comment.createDT).toRelative()}</div>
                    <div>{comment.text}</div>
                    <LikeDislikeWithIcons
                        commentId={comment.id}
                        initialLikeData={comment.like} />
                    
                    <CommentReplies replies={comment.replies || []} />

                    <h2>Добавить новый комментарий</h2>
                    <input
                        type="file"
                        onChange={(e) => e.target.files && setImage(e.target.files[0])}
                        className="file-input"
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
        </>
    );
};

export default CommentDetail;
