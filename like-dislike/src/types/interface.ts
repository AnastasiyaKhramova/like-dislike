export interface CommentModelDataResult {
    total?: number;
    data?: CommentModel[];
}

export interface CommentModel {
    id: string;
    createDT?: string;
    updateDT?: string;
    user?: UserModel;
    userGuid?: string;
    text?: string | null;
    replies?: ReplyModel[];
    like: LikeDislikeModel;
}

interface UserModel {
    username: string;
}

export interface ReplyModel {
    id: string;
    text: string;
    img?: string | null;
}
export interface LikeDislikeModel {
    isLike: boolean | null;
    likeCount: number;
}