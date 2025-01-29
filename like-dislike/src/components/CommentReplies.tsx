import React from 'react';
import { ReplyModel } from '../types/interface.ts'

interface CommentRepliesProps {
    replies?: ReplyModel[];
}

const CommentReplies: React.FC<CommentRepliesProps> = ({ replies = []}) => {
    // Если нет комментариев не отображаем ничего
    if ( !replies || replies.length === 0) return null;
    return (
        <>
            <h2>Комментарии</h2>
            <ul>
                {replies.map((reply: ReplyModel) => (
                    <li
                        key={reply.id}
                        className="border"
                        style={{ listStyle: "none" }}
                    >
                        <div>
                            <p>{reply.text}</p>
                            { reply.img &&  <img src={reply.img} alt="commentPhoto" style={{ width: 200 }} />}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default CommentReplies;