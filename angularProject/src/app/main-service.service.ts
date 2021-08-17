import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainServiceService {
  constructor(private http: HttpClient) {}

  // getRequestList(){
  //   return this.http.get('http://localhost:4000/api/v1/posts/requests/Iowa/Fairfield/1');

  // }
  getRequestList(state: any, city: any, page: any) {
    return this.http.get(
      `http://localhost:4000/api/v1/posts/requests/${state}/${city}/${page}`
    );
  }

  // getProviderList(){
  //   return this.http.get('http://localhost:4000/api/v1/posts/providers/Iowa/Fairfield/1');

  // }

  getProviderList(state: any, city: any, page: any) {
    return this.http.get(
`      https://community-backend-angular.herokuapp.com/api/v1/posts/providers/${state}/${city}  
`        );
  }

  getPostDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/v1/posts/${id}`, {
      headers: { Authorization: localStorage.token },
    });
  }

  getUserDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/v1/users/${id}`, {
      headers: { Authorization: localStorage.token },
    });
  }

  login(formBody: any) {
    console.log(formBody)

    return this.http.post(`https://community-backend-angular.herokuapp.com/api/v1/auth/login`,  formBody,{
      headers: { 'Access-Control-Allow-Origin': '*' },
    },);
  }

  signup(formBody: any) {
    return this.http.post(`http://localhost:4000/api/v1/auth/signup`, formBody);
  }

  addPost(formBody: any) {
    return this.http.post(`http://localhost:4000/api/v1/posts`, formBody);
  }

  editPost(formBody: any, id: any) {
    return this.http.put(`http://localhost:4000/api/v1/posts/${id}`, formBody);
  }

  deletePost(id: any) {
    return this.http.delete(`http://localhost:4000/api/v1/posts/${id}`);
  }

  addComment(formBody: any, id: any) {console.log(id); console.log(formBody)
    return this.http.put(
      `https://community-backend-angular.herokuapp.com/api/v1/posts/${id}/comments`,
      formBody
    );
  }

  editComment(formBody: any, id: any, comId: any) {
    return this.http.put(
      `http://localhost:4000/api/v1/posts/${id}/comments/${comId}`,
      formBody
    );
  }

  deleteComment(id: any, comId: any) {
    return this.http.delete(
      `http://localhost:4000/api/v1/posts/${id}/comments/${comId}/delete`
    );
  }

  editUser(formBody: any, id: any) {
    return this.http.put(`http://localhost:4000/api/v1/users/${id}`, formBody);
  }

  //this function is used to capitalize string values such as name, city, state
  capitalization(value: string) {
    const arr = value.toLowerCase().split(' ');
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return (value = arr.join(' '));
  }

  //update post checkIn

  updatePostCheckIn(id: any) {
    return this.http.put(
      `http://localhost:4000/api/v1/posts/checkin/${id}`,
      {}
    );
  }

  //update comment checkIn
  updateCommentCheckIn(id: any, comId: any) {
    return this.http.put(
      `http://localhost:4000/api/v1/posts/checkin/${id}/comments/${comId}`,
      {}
    );
  }

  //update get follow post

  getFollowPost(page: any) {
    return this.http.get(`http://localhost:4000/api/v1/posts/follow/${page}`);
  }

  getNof(list: any) {
    return list.map((post: any) => {
      if (
        post.ownerId == localStorage.userId &&
        post.comments.length == 1 &&
        post.comments[0].commentOwnerId == localStorage.userId
      ) {
        return post;
      } else if (
        post.ownerId == localStorage.userId &&
        post.comments.length > 0 &&
        post.comments[post.comments.length - 1].commentOwnerId !=
          localStorage.userId
      ) {
        if (
          Date.parse(post.comments[post.comments.length - 1].createdAt) >
          Date.parse(post.checkIn)
        ) {
          return { ...post, notification: true };
        }
      } else if (
        post.ownerId != localStorage.userId &&
        post.comments.length > 0
      ) {
        for (let i = 0; i < post.comments.length; i++) {
          if (
            post.comments[i].commentOwnerId == localStorage.userId &&
            post.comments[post.comments.length - 1].commentOwnerId !=
              localStorage.userId
          ) {
            if (
              Date.parse(post.comments[post.comments.length - 1].createdAt) >
              Date.parse(post.comments[i].checkIn)
            ) {
              return { ...post, notification: true };
            } else return post;
          } else return post;
        }
      } else {
        return post;
      }
      return post;
    });
  }
}
