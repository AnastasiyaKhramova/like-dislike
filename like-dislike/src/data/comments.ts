import { CommentModelDataResult } from '../types/interface';
import { v4 as uuidv4 } from 'uuid';
import commentPhoto from '../img/i.webp'

export const commentsData: CommentModelDataResult = {
    total: 3,
    data: [
        {
            id: uuidv4(),
            user: { username: 'Анна Харитонова' },
            text: 'Какая милая!!!',
            createDT: '2025-01-20T12:00:00Z',
            replies: [
                {
                    id: uuidv4(),
                    text: 'Полностью согласна!',
                    img: commentPhoto
                }
            ],
            like: { isLike: true, likeCount: 0 }
        },
        {
            id: uuidv4(),
            user: { username: 'Иван Сердюков' },
            text: 'Не плохая, но можно еще постараться',
            createDT: '2025-01-21T15:30:00Z',
            replies: [],
            like: { isLike: true, likeCount: 0 }
        },
        {
            id: uuidv4(),
            user: { username: 'Мария Захарова' },
            text: 'Побольше бы таких картинок',
            createDT: '2025-01-24T00:30:00Z',
            replies: [],
            like: { isLike: true, likeCount: 0 }
        },
    ],
};