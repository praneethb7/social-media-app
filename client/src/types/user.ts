export interface User {
  _id: string;
  name: string;
  userName: string;
  email: string;
  password: string;
  profilePic: string;
  bio: string;
  followers: string[];
  following: string[];
  posts: string[];
  reels: string[];
  story: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
