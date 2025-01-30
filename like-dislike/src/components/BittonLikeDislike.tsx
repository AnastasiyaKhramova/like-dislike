import React, { useState, useEffect } from 'react';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { LikeDislikeModel } from '../types/interface'
import '../assets/style/LikeDislikeWithIcons.css'

interface LikeDislikeProps {
    commentId: string;
    initialLikeData: LikeDislikeModel;
}

const LikeDislikeWithIcons: React.FC<LikeDislikeProps> = ({ commentId, initialLikeData }) => {
    const [liked, setLiked] = useState<boolean | null>(initialLikeData.isLike);
    const [likeCount, setLikeCount] = useState<number>(initialLikeData.likeCount);


    useEffect(() => {
        setLiked(initialLikeData.isLike);
        setLikeCount(initialLikeData.likeCount);
    }, [initialLikeData]);


    const handleLike = () => {
        if (liked === true) {
            // Если лайк уже поставлен, увеличиваем счетчик
            setLikeCount((prev) => prev + 1);
        } else {
            // Если лайк не был поставлен, ставим лайк и увеличиваем счетчик
            setLiked(true);
            setLikeCount((prev) => prev + 1);
        }
    };

    const handleDislike = () => {
        if (liked === false) {
            // Если дизлайк уже поставлен, уменьшаем счетчик
            setLikeCount((prev) => prev - 1);
        } else {
            // Если дизлайк не был поставлен, ставим дизлайк и уменьшаем счетчик
            setLiked(false);
            setLikeCount((prev) => prev - 1);
        }
    };

    const updateLocalStorage = () => {
        const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
        const updatedComments = storedComments.map((c: any) =>
            c.id === commentId ? { ...c, like: { isLike: liked, likeCount } } : c
        );
        localStorage.setItem('comments', JSON.stringify(updatedComments));
    };

    // Восстановление состояния лайков/дизлайков при изменении
    useEffect(() => {
        updateLocalStorage();
    }, [liked, likeCount]);
    
    return (
        <div className="like-dislike-buttons">
            <button onClick={handleLike} style={{ color: liked === true ? 'rgb(120, 220, 120)' : 'gray' }}>
                <AiFillLike />
            </button>
            <span>{likeCount}</span>
            <button onClick={handleDislike} style={{ color: liked === false ? 'rgb(231, 86, 86)' : 'gray' }}>
                <AiFillDislike />
            </button>
        </div>
    );
};

export default LikeDislikeWithIcons;