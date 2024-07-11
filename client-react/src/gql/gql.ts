/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreatePosts(\n    $url: String!\n    $description: String!\n    $username: ID!\n    $friend: [RelationType!]!\n  ) {\n    createPosts(\n      input: {\n        url: $url\n        description: $description\n        creatorOfPost: { connect: { where: { node: { username: $username } } } }\n        visibility: $friend\n      }\n    ) {\n      posts {\n        id\n        url\n        description\n        creatorOfPost {\n          id\n          name\n          email\n          username\n          dob\n        }\n      }\n    }\n  }\n": types.CreatePostsDocument,
    "\n      query q1 {\n        users {\n          id\n          email\n          username\n        }\n      }\n    ": types.Q1Document,
    "\n  query Posts2 {\n    posts {\n      id\n    }\n  }\n": types.Posts2Document,
    "\n  subscription PostCreated {\n    postCreated {\n      event\n      timestamp\n      createdPost {\n        id\n        url\n        description\n        visibility\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.PostCreatedDocument,
    "\n  subscription PostUpdated {\n    postUpdated {\n      event\n      timestamp\n      updatedPost {\n        id\n        url\n        description\n        visibility\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.PostUpdatedDocument,
    "\n  query SinglePosts($pid: ID!) {\n    posts(where: { id: $pid }) {\n      id\n      url\n      description\n      creatorOfPost {\n        id\n        name\n        email\n        username\n        dob\n      }\n      likes {\n        id\n        name\n        email\n        username\n        dob\n        createdAt\n        updatedAt\n      }\n      comments {\n        id\n        text\n        author {\n          id\n          name\n          email\n          username\n          dob\n        }\n        replies {\n          id\n        }\n      }\n    }\n  }\n": types.SinglePostsDocument,
    "\n  mutation UnLikeQuery($id: ID!, $username: ID!) {\n    updatePosts(\n      where: { id: $id }\n      update: {\n        likes: { disconnect: { where: { node: { username: $username } } } }\n      }\n    ) {\n      posts {\n        id\n        url\n        description\n        visibility\n        createdAt\n        updatedAt\n        likes {\n          id\n          name\n          email\n          username\n          dob\n          createdAt\n          updatedAt\n        }\n        creatorOfPost {\n          id\n          name\n          email\n          username\n          dob\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  }\n": types.UnLikeQueryDocument,
    "\n  mutation LikeQuery($username: ID!, $id: ID!) {\n    updatePosts(\n      update: {\n        likes: { connect: { where: { node: { username: $username } } } }\n      }\n      where: { id: $id }\n    ) {\n      posts {\n        id\n        url\n        description\n        visibility\n        createdAt\n        updatedAt\n        likes {\n          id\n          name\n          email\n          username\n          dob\n          createdAt\n          updatedAt\n        }\n        creatorOfPost {\n          id\n          name\n          email\n          username\n          dob\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  }\n": types.LikeQueryDocument,
    "\n  query PostComments($pid: ID!) {\n    comments(\n      where: { commentOfPost: { id: $pid }, indent: 0 }\n      options: { sort: { createdAt: DESC, updatedAt: DESC } }\n    ) {\n      id\n    }\n    commentsConnection(where: { commentOfPost: { id: $pid } }) {\n      totalCount\n    }\n    posts(where: { id: $pid }) {\n      id\n      url\n      description\n      visibility\n      createdAt\n      updatedAt\n      creatorOfPost {\n        id\n        name\n        email\n        username\n        dob\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.PostCommentsDocument,
    "\n  subscription CommentCreated {\n    commentCreated {\n      event\n      timestamp\n      createdComment {\n        id\n        text\n        indent\n        parentsOfComment\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.CommentCreatedDocument,
    "\n  subscription CommentDeleted {\n    commentDeleted {\n      event\n      timestamp\n      deletedComment {\n        id\n        text\n        indent\n        parentsOfComment\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.CommentDeletedDocument,
    "\n  mutation CreateComments(\n    $comment: String!\n    $indent: Int!\n    $parentsOfComment: [ID!]!\n    $username: ID!\n    $pid: ID!\n    $cid: ID\n  ) {\n    createComments(\n      input: {\n        text: $comment\n        indent: $indent\n        parentsOfComment: $parentsOfComment\n        author: { connect: { where: { node: { username: $username } } } }\n        commentOfPost: { connect: { where: { node: { id: $pid } } } }\n        replyOfComment: { connect: { where: { node: { id: $cid } } } }\n      }\n    ) {\n      comments {\n        id\n      }\n    }\n  }\n": types.CreateCommentsDocument,
    "\n  query CommentReply($cid: ID!) {\n    comments(where: { id: $cid }) {\n      id\n      text\n      indent\n      parentsOfComment\n      createdAt\n      updatedAt\n      likes {\n        id\n        name\n        email\n        username\n        dob\n        createdAt\n        updatedAt\n      }\n      author {\n        id\n        name\n        email\n        username\n        dob\n        createdAt\n        updatedAt\n      }\n      replies {\n        id\n      }\n    }\n  }\n": types.CommentReplyDocument,
    "\n  mutation LikeComment($username: ID!, $cid: ID!) {\n    updateComments(\n      where: { id: $cid }\n      update: {\n        likes: { connect: { where: { node: { username: $username } } } }\n      }\n    ) {\n      comments {\n        id\n      }\n    }\n  }\n": types.LikeCommentDocument,
    "\n  mutation DeleteComments($cid: ID!) {\n    deleteComments(\n      where: { OR: [{ id: $cid }, { parentsOfComment_INCLUDES: $cid }] }\n    ) {\n      bookmark\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n": types.DeleteCommentsDocument,
    "\n  query SingleComments2($cid: ID!) {\n    comments(where: { id: $cid }) {\n      id\n      text\n      indent\n      parentsOfComment\n      createdAt\n      updatedAt\n      likes {\n        id\n        name\n        email\n        username\n        dob\n        createdAt\n        updatedAt\n      }\n      author {\n        id\n        name\n        email\n        username\n        dob\n        createdAt\n        updatedAt\n      }\n      commentOfPost {\n        id\n        url\n        description\n        visibility\n        createdAt\n        updatedAt\n      }\n      replyOfComment {\n        id\n        text\n        indent\n        createdAt\n        updatedAt\n        author {\n          id\n          name\n          email\n          username\n          dob\n          createdAt\n          updatedAt\n        }\n      }\n      replies {\n        id\n      }\n    }\n  }\n": types.SingleComments2Document,
    "\n  query Comments($cid: ID!) {\n    comments(where: { replyOfComment: { id: $cid } }) {\n      id\n      text\n      indent\n      createdAt\n      updatedAt\n    }\n  }\n": types.CommentsDocument,
    "\n  subscription ReplyCommentRelationshipCreated($uid: ID!) {\n    commentRelationshipCreated(\n      where: { createdRelationship: { replyOfComment: { node: { id: $uid } } } }\n    ) {\n      event\n      timestamp\n      relationshipFieldName\n      comment {\n        id\n        text\n        indent\n        createdAt\n        updatedAt\n      }\n      createdRelationship {\n        replyOfComment {\n          node {\n            id\n            text\n            indent\n            createdAt\n            updatedAt\n          }\n        }\n      }\n    }\n  }\n": types.ReplyCommentRelationshipCreatedDocument,
    "\n      query q4 {\n        users {\n          id\n          email\n          username\n        }\n      }\n    ": types.Q4Document,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePosts(\n    $url: String!\n    $description: String!\n    $username: ID!\n    $friend: [RelationType!]!\n  ) {\n    createPosts(\n      input: {\n        url: $url\n        description: $description\n        creatorOfPost: { connect: { where: { node: { username: $username } } } }\n        visibility: $friend\n      }\n    ) {\n      posts {\n        id\n        url\n        description\n        creatorOfPost {\n          id\n          name\n          email\n          username\n          dob\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePosts(\n    $url: String!\n    $description: String!\n    $username: ID!\n    $friend: [RelationType!]!\n  ) {\n    createPosts(\n      input: {\n        url: $url\n        description: $description\n        creatorOfPost: { connect: { where: { node: { username: $username } } } }\n        visibility: $friend\n      }\n    ) {\n      posts {\n        id\n        url\n        description\n        creatorOfPost {\n          id\n          name\n          email\n          username\n          dob\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query q1 {\n        users {\n          id\n          email\n          username\n        }\n      }\n    "): (typeof documents)["\n      query q1 {\n        users {\n          id\n          email\n          username\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Posts2 {\n    posts {\n      id\n    }\n  }\n"): (typeof documents)["\n  query Posts2 {\n    posts {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription PostCreated {\n    postCreated {\n      event\n      timestamp\n      createdPost {\n        id\n        url\n        description\n        visibility\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription PostCreated {\n    postCreated {\n      event\n      timestamp\n      createdPost {\n        id\n        url\n        description\n        visibility\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription PostUpdated {\n    postUpdated {\n      event\n      timestamp\n      updatedPost {\n        id\n        url\n        description\n        visibility\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription PostUpdated {\n    postUpdated {\n      event\n      timestamp\n      updatedPost {\n        id\n        url\n        description\n        visibility\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SinglePosts($pid: ID!) {\n    posts(where: { id: $pid }) {\n      id\n      url\n      description\n      creatorOfPost {\n        id\n        name\n        email\n        username\n        dob\n      }\n      likes {\n        id\n        name\n        email\n        username\n        dob\n        createdAt\n        updatedAt\n      }\n      comments {\n        id\n        text\n        author {\n          id\n          name\n          email\n          username\n          dob\n        }\n        replies {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SinglePosts($pid: ID!) {\n    posts(where: { id: $pid }) {\n      id\n      url\n      description\n      creatorOfPost {\n        id\n        name\n        email\n        username\n        dob\n      }\n      likes {\n        id\n        name\n        email\n        username\n        dob\n        createdAt\n        updatedAt\n      }\n      comments {\n        id\n        text\n        author {\n          id\n          name\n          email\n          username\n          dob\n        }\n        replies {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UnLikeQuery($id: ID!, $username: ID!) {\n    updatePosts(\n      where: { id: $id }\n      update: {\n        likes: { disconnect: { where: { node: { username: $username } } } }\n      }\n    ) {\n      posts {\n        id\n        url\n        description\n        visibility\n        createdAt\n        updatedAt\n        likes {\n          id\n          name\n          email\n          username\n          dob\n          createdAt\n          updatedAt\n        }\n        creatorOfPost {\n          id\n          name\n          email\n          username\n          dob\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UnLikeQuery($id: ID!, $username: ID!) {\n    updatePosts(\n      where: { id: $id }\n      update: {\n        likes: { disconnect: { where: { node: { username: $username } } } }\n      }\n    ) {\n      posts {\n        id\n        url\n        description\n        visibility\n        createdAt\n        updatedAt\n        likes {\n          id\n          name\n          email\n          username\n          dob\n          createdAt\n          updatedAt\n        }\n        creatorOfPost {\n          id\n          name\n          email\n          username\n          dob\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LikeQuery($username: ID!, $id: ID!) {\n    updatePosts(\n      update: {\n        likes: { connect: { where: { node: { username: $username } } } }\n      }\n      where: { id: $id }\n    ) {\n      posts {\n        id\n        url\n        description\n        visibility\n        createdAt\n        updatedAt\n        likes {\n          id\n          name\n          email\n          username\n          dob\n          createdAt\n          updatedAt\n        }\n        creatorOfPost {\n          id\n          name\n          email\n          username\n          dob\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LikeQuery($username: ID!, $id: ID!) {\n    updatePosts(\n      update: {\n        likes: { connect: { where: { node: { username: $username } } } }\n      }\n      where: { id: $id }\n    ) {\n      posts {\n        id\n        url\n        description\n        visibility\n        createdAt\n        updatedAt\n        likes {\n          id\n          name\n          email\n          username\n          dob\n          createdAt\n          updatedAt\n        }\n        creatorOfPost {\n          id\n          name\n          email\n          username\n          dob\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PostComments($pid: ID!) {\n    comments(\n      where: { commentOfPost: { id: $pid }, indent: 0 }\n      options: { sort: { createdAt: DESC, updatedAt: DESC } }\n    ) {\n      id\n    }\n    commentsConnection(where: { commentOfPost: { id: $pid } }) {\n      totalCount\n    }\n    posts(where: { id: $pid }) {\n      id\n      url\n      description\n      visibility\n      createdAt\n      updatedAt\n      creatorOfPost {\n        id\n        name\n        email\n        username\n        dob\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query PostComments($pid: ID!) {\n    comments(\n      where: { commentOfPost: { id: $pid }, indent: 0 }\n      options: { sort: { createdAt: DESC, updatedAt: DESC } }\n    ) {\n      id\n    }\n    commentsConnection(where: { commentOfPost: { id: $pid } }) {\n      totalCount\n    }\n    posts(where: { id: $pid }) {\n      id\n      url\n      description\n      visibility\n      createdAt\n      updatedAt\n      creatorOfPost {\n        id\n        name\n        email\n        username\n        dob\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription CommentCreated {\n    commentCreated {\n      event\n      timestamp\n      createdComment {\n        id\n        text\n        indent\n        parentsOfComment\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription CommentCreated {\n    commentCreated {\n      event\n      timestamp\n      createdComment {\n        id\n        text\n        indent\n        parentsOfComment\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription CommentDeleted {\n    commentDeleted {\n      event\n      timestamp\n      deletedComment {\n        id\n        text\n        indent\n        parentsOfComment\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription CommentDeleted {\n    commentDeleted {\n      event\n      timestamp\n      deletedComment {\n        id\n        text\n        indent\n        parentsOfComment\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateComments(\n    $comment: String!\n    $indent: Int!\n    $parentsOfComment: [ID!]!\n    $username: ID!\n    $pid: ID!\n    $cid: ID\n  ) {\n    createComments(\n      input: {\n        text: $comment\n        indent: $indent\n        parentsOfComment: $parentsOfComment\n        author: { connect: { where: { node: { username: $username } } } }\n        commentOfPost: { connect: { where: { node: { id: $pid } } } }\n        replyOfComment: { connect: { where: { node: { id: $cid } } } }\n      }\n    ) {\n      comments {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateComments(\n    $comment: String!\n    $indent: Int!\n    $parentsOfComment: [ID!]!\n    $username: ID!\n    $pid: ID!\n    $cid: ID\n  ) {\n    createComments(\n      input: {\n        text: $comment\n        indent: $indent\n        parentsOfComment: $parentsOfComment\n        author: { connect: { where: { node: { username: $username } } } }\n        commentOfPost: { connect: { where: { node: { id: $pid } } } }\n        replyOfComment: { connect: { where: { node: { id: $cid } } } }\n      }\n    ) {\n      comments {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CommentReply($cid: ID!) {\n    comments(where: { id: $cid }) {\n      id\n      text\n      indent\n      parentsOfComment\n      createdAt\n      updatedAt\n      likes {\n        id\n        name\n        email\n        username\n        dob\n        createdAt\n        updatedAt\n      }\n      author {\n        id\n        name\n        email\n        username\n        dob\n        createdAt\n        updatedAt\n      }\n      replies {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query CommentReply($cid: ID!) {\n    comments(where: { id: $cid }) {\n      id\n      text\n      indent\n      parentsOfComment\n      createdAt\n      updatedAt\n      likes {\n        id\n        name\n        email\n        username\n        dob\n        createdAt\n        updatedAt\n      }\n      author {\n        id\n        name\n        email\n        username\n        dob\n        createdAt\n        updatedAt\n      }\n      replies {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LikeComment($username: ID!, $cid: ID!) {\n    updateComments(\n      where: { id: $cid }\n      update: {\n        likes: { connect: { where: { node: { username: $username } } } }\n      }\n    ) {\n      comments {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LikeComment($username: ID!, $cid: ID!) {\n    updateComments(\n      where: { id: $cid }\n      update: {\n        likes: { connect: { where: { node: { username: $username } } } }\n      }\n    ) {\n      comments {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteComments($cid: ID!) {\n    deleteComments(\n      where: { OR: [{ id: $cid }, { parentsOfComment_INCLUDES: $cid }] }\n    ) {\n      bookmark\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteComments($cid: ID!) {\n    deleteComments(\n      where: { OR: [{ id: $cid }, { parentsOfComment_INCLUDES: $cid }] }\n    ) {\n      bookmark\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SingleComments2($cid: ID!) {\n    comments(where: { id: $cid }) {\n      id\n      text\n      indent\n      parentsOfComment\n      createdAt\n      updatedAt\n      likes {\n        id\n        name\n        email\n        username\n        dob\n        createdAt\n        updatedAt\n      }\n      author {\n        id\n        name\n        email\n        username\n        dob\n        createdAt\n        updatedAt\n      }\n      commentOfPost {\n        id\n        url\n        description\n        visibility\n        createdAt\n        updatedAt\n      }\n      replyOfComment {\n        id\n        text\n        indent\n        createdAt\n        updatedAt\n        author {\n          id\n          name\n          email\n          username\n          dob\n          createdAt\n          updatedAt\n        }\n      }\n      replies {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query SingleComments2($cid: ID!) {\n    comments(where: { id: $cid }) {\n      id\n      text\n      indent\n      parentsOfComment\n      createdAt\n      updatedAt\n      likes {\n        id\n        name\n        email\n        username\n        dob\n        createdAt\n        updatedAt\n      }\n      author {\n        id\n        name\n        email\n        username\n        dob\n        createdAt\n        updatedAt\n      }\n      commentOfPost {\n        id\n        url\n        description\n        visibility\n        createdAt\n        updatedAt\n      }\n      replyOfComment {\n        id\n        text\n        indent\n        createdAt\n        updatedAt\n        author {\n          id\n          name\n          email\n          username\n          dob\n          createdAt\n          updatedAt\n        }\n      }\n      replies {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Comments($cid: ID!) {\n    comments(where: { replyOfComment: { id: $cid } }) {\n      id\n      text\n      indent\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Comments($cid: ID!) {\n    comments(where: { replyOfComment: { id: $cid } }) {\n      id\n      text\n      indent\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription ReplyCommentRelationshipCreated($uid: ID!) {\n    commentRelationshipCreated(\n      where: { createdRelationship: { replyOfComment: { node: { id: $uid } } } }\n    ) {\n      event\n      timestamp\n      relationshipFieldName\n      comment {\n        id\n        text\n        indent\n        createdAt\n        updatedAt\n      }\n      createdRelationship {\n        replyOfComment {\n          node {\n            id\n            text\n            indent\n            createdAt\n            updatedAt\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription ReplyCommentRelationshipCreated($uid: ID!) {\n    commentRelationshipCreated(\n      where: { createdRelationship: { replyOfComment: { node: { id: $uid } } } }\n    ) {\n      event\n      timestamp\n      relationshipFieldName\n      comment {\n        id\n        text\n        indent\n        createdAt\n        updatedAt\n      }\n      createdRelationship {\n        replyOfComment {\n          node {\n            id\n            text\n            indent\n            createdAt\n            updatedAt\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query q4 {\n        users {\n          id\n          email\n          username\n        }\n      }\n    "): (typeof documents)["\n      query q4 {\n        users {\n          id\n          email\n          username\n        }\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;