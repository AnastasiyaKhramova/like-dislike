import React, { useState } from 'react';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { LikeDislikeModel } from '../types/interface'

const LikeDislikeWithIcons: React.FC<LikeDislikeModel> = ({ isLiked, likeCount, onLikeDislike }) => {
    const [liked, setLiked] = useState<boolean | null>(isLiked);

    const handleLike = () => {
        if (liked !== true) {
            setLiked(true);
            onLikeDislike(true);
        }
    };

    const handleDislike = () => {
        if (liked !== false) {
            setLiked(false);
            onLikeDislike(false);
        }
    };

    return (
        <div>
            <button onClick={handleLike} style={{ color: liked === true ? 'green' : 'gray' }}>
                <AiFillLike />
            </button>
            <span>{likeCount}</span>
            <button onClick={handleDislike} style={{ color: liked === false ? 'red' : 'gray' }}>
                <AiFillDislike />
            </button>
        </div>
    );
};

export default LikeDislikeWithIcons;