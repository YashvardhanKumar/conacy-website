import { graphql } from "../../../gql";
import { Navigate, useParams } from "react-router-dom";
import CommentProvider from "./Providers/CommentProvider/CommentProvider";
import { CommentList } from "./components/CommentList";

const CommentsPage = () => {
  const params = useParams();
  if (localStorage?.getItem("isAuthenticated") != "Yes") {
    return <Navigate to={"/"} />;
  } 
  // else if (cntLoading || commentLoading || postLoading) {
  //   return <LoadingLogo />;
  // }
  return (
    <div className="flex md:ml-20 max-md:my-16 justify-center w-screen scroll-m-0 box-border p-2">
      <CommentProvider params={params}>
        <CommentList />
      </CommentProvider>
    </div>
  );
};

export default CommentsPage;