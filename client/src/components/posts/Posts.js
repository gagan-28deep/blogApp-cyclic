import React from "react";
import "./posts.css";

import Post from "../post/Post";
const Posts = ({ posts }) => {
  // setInterval(async () => {
  //   const res = await fetch(
  //     `/api/v1/hello`
  //   );
  //   console.log("Hello");
  // }, 10000);
  // return (
  //   <div className="posts">
  //     {posts.map((post) => (
  //       <Post key={post._id} post={post} />
  //     ))}
  //     {/* <Post />
  //     <Post />
  //     <Post />
  //     <Post />
  //     <Post /> */}
  //   </div>
  // );
  return (
    <div className="posts">
      {posts.length > 0
        ? posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })
        : "No Posts Yet..."}
    </div>
  );
};

export default Posts;
