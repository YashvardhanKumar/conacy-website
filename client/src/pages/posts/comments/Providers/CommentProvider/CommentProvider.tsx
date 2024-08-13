import { createContext, useContext, useEffect, useRef, useState } from "react";
import { graphql } from "../../../../../gql";
import { useMutation, useQuery } from "@apollo/client";
import { CommentContextProps, CommentProps } from "./types";
import { Comment, Post } from "../../../../../gql/graphql";
import { CommentPageSkeleton } from "../../../components/Skeleton";
import { useCommentInputContext } from "../CommentInputProvider/CommentInputProvider";

const getPostComments = graphql(/* GraphQL */ `
  query PostComments($pid: ID!) {
    comments(
      where: { commentOfPost: { id: $pid }, indent: 0 }
      options: { sort: { createdAt: DESC, updatedAt: DESC } }
    ) {
      id
    }
    commentsConnection(where: { commentOfPost: { id: $pid } }) {
      totalCount
    }
    posts(where: { id: $pid }) {
      id
      url
      description
      visibility
      createdAt
      updatedAt
      creatorOfPost {
        id
        name
        email
        username
        dob
        createdAt
        updatedAt
      }
    }
  }
`);



const commentSubscription = graphql(/*graphql*/ `
  subscription CommentCreated {
    commentCreated {
      event
      timestamp
      createdComment {
        id
        text
        indent
        parentsOfComment
        createdAt
        updatedAt
      }
    }
  }
`);
const commentDeleteSub = graphql(`
  subscription CommentDeleted {
    commentDeleted {
      event
      timestamp
      deletedComment {
        id
        text
        indent
        parentsOfComment
        createdAt
        updatedAt
      }
    }
  }
`);

const commentReplyMutation = graphql(/*graphql*/ `
  mutation CreateComments(
    $comment: String!
    $indent: Int!
    $parentsOfComment: [ID!]!
    $username: ID!
    $pid: ID!
    $cid: ID
  ) {
    createComments(
      input: {
        text: $comment
        indent: $indent
        parentsOfComment: $parentsOfComment
        author: { connect: { where: { node: { username: $username } } } }
        commentOfPost: { connect: { where: { node: { id: $pid } } } }
        replyOfComment: { connect: { where: { node: { id: $cid } } } }
      }
    ) {
      comments {
        id
      }
    }
  }
`);

const CommentContext = createContext<CommentContextProps | undefined>(
  undefined
);

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error(
      `${useCommentContext.name} must be used within a CommentProvider`
    );
  }
  return context;
};

const CommentProvider: React.FC<CommentProps> = ({ children, params }) => {
  const {inputRef, pointerRef, replier, setReplier} = useCommentInputContext();
  const { data, subscribeToMore } = useQuery(
    getPostComments,
    {
      variables: {
        pid: params?.pid ?? null,
      },
    }
  );
  // const [replier, setReplier] = useState<ReplierProps | null>(null);
  const ccrm = useMutation(commentReplyMutation);
  const [comment, setComment] = useState("");

  const handleCancelReply = () => {
    if (replier?.username.length) {
      setReplier(null);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setComment(e.target.value);

  const handleClick = async () => {
    console.log(comment);

    if (comment.trim().length) {
      console.log({
        username: localStorage.getItem("username") ?? "",
        comment: comment.trim(),
        cid: replier?.cid as string,
        cuser: replier?.username as string,
        pid: params.pid!,
      });
      await ccrm[0]({
        variables: {
          username: localStorage.getItem("username") ?? "",
          comment: comment.trim(),
          pid: params.pid as string,
          cid: replier?.cid ?? null,
          indent: replier?.indent ?? 0,
          parentsOfComment: replier?.parentsOfComment ?? [],
        },
      });
      // }
      setComment("");
      setReplier(null);
    }
  };

  useEffect(() => {
    if (!data) return;
    subscribeToMore({
      document: commentSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const d = subscriptionData.data.commentCreated;
        console.log(d);
        return Object.assign({}, prev, {
          comments: [d, ...prev.comments],
        });
      },
    });
    subscribeToMore({
      document: commentDeleteSub,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newFeedItem = subscriptionData.data.commentDeleted.deletedComment;
        console.log(newFeedItem);
        return Object.assign({}, prev, {
          comments: [...prev.comments.filter((p) => p.id !== newFeedItem.id)],
          commentsConnection: prev.commentsConnection.totalCount - 1,
        });
      },
    });
  }, [data]);
  if (!data) {
    return <CommentPageSkeleton />;
  }
  return (
    <CommentContext.Provider
      value={{
        inputRef,
        pointerRef,
        comments: data.comments as Comment[],
        post: data.posts[0] as Post,
        commentCount: data.commentsConnection.totalCount,
        replier,
        comment,
        ccrm,
        setReplier,
        handleCancelReply,
        handleCommentChange,
        handleClick,
      }}
      children={children}
    />
  );
};
export default CommentProvider;