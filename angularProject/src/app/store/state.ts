import {  ICommentTopic, IPostTopic } from './topic';
export interface IAppState {
  currentUser: {};
  requestList: IPostTopic[];
  providerList: IPostTopic[];
  comments:ICommentTopic[];

}
