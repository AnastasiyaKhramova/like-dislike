import React, { useState } from 'react';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';


const LikeDislikeWithIcons: React.FC = () => {
    const [liked, setLiked] = useState<boolean | null>(null);
    const [likeCount, setLikeCount] = useState<number>(0);

    const handleLike = () => {
        setLiked(true);
        setLikeCount(prevCount => prevCount + 1);
    }
    const handleDislike = () => {
        setLiked(false);
        setLikeCount(prevCount => prevCount - 1);
    }

    return (
        <div>
            <button onClick={handleLike} style={{ color: liked === true ? 'green' : 'gray' }}>
                <AiFillLike />
            </button>
            <div>{likeCount}</div>
            <button onClick={handleDislike} style={{ color: liked === false ? 'red' : 'gray' }}>
                <AiFillDislike />
            </button >
        </div >
    );
};

export default LikeDislikeWithIcons;