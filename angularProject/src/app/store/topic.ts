export interface IUserTopic {
  _id: number;
  fullname: string;
  email: string;
  password: string;
  role: string;
  active: boolean;
}

export interface IPostTopic {
  _id: number;
  createdAt: string;
  fullname: string;
  content: string;
  type: string;
  city: string;
  ownerId: string;
}

export interface ICommentTopic {
  _id: number;
  createdAt: string;
  fullname: string;
  commentContent: string;
  commentOwnerId: string;
}
