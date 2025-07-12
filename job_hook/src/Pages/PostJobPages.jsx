import React from "react";
import { Divider } from "@mantine/core";
import PostJob from "../PostJob/PostJob";

const PostJobPages = () => {
  return (
    <div className='text-2xl min-h-[90vh] font-semibold bg-mine-shaft-950 font-["poppins"] p-4'>
      <Divider size="sm" mx="md" />
      <PostJob />
      
    </div>
  );
};

export default PostJobPages;
