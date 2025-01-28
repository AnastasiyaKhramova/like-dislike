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
    isLike?: boolean | null;
    replies?: ReplyModel[];
}

interface UserModel {
    username: string;
}

interface ReplyModel {
    id: string;
    text: string;
    img?: string;
}