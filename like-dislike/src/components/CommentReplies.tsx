import React from 'react';
import { ReplyModel } from '../types/interface.ts'
import '../assets/style/CommentReplies.css'

interface CommentRepliesProps {
    replies?: ReplyModel[];
}

const CommentReplies: React.FC<CommentRepliesProps> = ({ replies = []}) => {
    // Если нет комментариев не отображаем ничего
    if ( !replies || replies.length === 0) return null;
    return (
        <div className="comment-replies">
            <h2>Комментарии</h2>
            <ul>
                {replies.map((reply: ReplyModel) => (
                    <li key={reply.id}>
                        <div>
                            <p>{reply.text}</p>
                            {reply.img && <img src={reply.img} alt="commentPhoto" />}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentReplies;