import Like from "../../../../assets/Icons/Like";
import person from "../../../../assets/person.png";
import { ReplierProps } from "../Providers/CommentProvider/types";
import CommentReplyList from "../CommentReplyList";
import { useSingleCommentContext } from "../Providers/SingleCommentProvider/SingleCommentProvider";
import { motion } from "framer-motion";
interface CommentTileProps {
  id: string;
  pointerRef: React.MutableRefObject<HTMLInputElement | null>;
  inputRef: React.MutableRefObject<HTMLDivElement | null>;
  setReplier: React.Dispatch<React.SetStateAction<ReplierProps | null>>;
}

const CommentTile: React.FC<CommentTileProps> = ({
  id,
  pointerRef,
  inputRef,
  setReplier,
}) => {
  const {
    comment,
    like,
    replyList,
    toggleReplies,
    toggleCommentLike,
    handleDeleteComment,
    handleReplies,
    showReplies,
  } = useSingleCommentContext();
  return (
    <div className="flex w-full h-full">
      <div className="w-full h-full">
        <div
          className="flex p-1 justify-between w-full"
          children={
            <div className="flex flex-col">
              <div className="grid grid-cols-[24px_minmax(0,1fr)] items-center xs:grid-cols-[32px_minmax(0,1fr)]">
                <img
                  src={person}
                  alt=""
                  height={36}
                  className="w-8 h-8 p-1 rounded-full object-cover"
                />
                <div
                  className="px-2 text-web-color"
                  children={comment.author?.username ?? ""}
                />
              </div>

              <div className="grid grid-cols-[24px_1fr] w-full xs:grid-cols-[32px_1fr] text-sm text-start justify-self-start relative group">
                <div
                  className="group absolute top-0 left-0 bottom-0 w-6 xs:w-8 flex justify-center items-center z-0 cursor-pointer"
                  aria-hidden="true"
                  onClick={toggleReplies}
                  children={
                    <div className="w-[1px] h-full group-hover:bg-base-300 bg-gray-300" />
                  }
                />
                <div className="contents">
                  <div />
                  <div className="px-2 inline-flex gap-1 w-full">
                    {comment.replyOfComment && (
                      <div
                        className=" font-bold"
                        children={`@${comment.replyOfComment!.author.username}`}
                      />
                    )}

                    <div children={comment.text} />
                  </div>
                </div>
                <div className="contents">
                  <div />
                  <div className="inline-flex px-1">
                    <motion.button
                      className="text-gray-400 text-xs p-1 w-fit inline-flex gap-0.5 items-center "
                      onClick={toggleCommentLike}
                    >
                      <Like size={18} liked={like} />
                      <div children={comment.likes.length} />
                    </motion.button>
                    <button
                      onClick={handleReplies}
                      className=" text-gray-400 text-xs w-fit p-1"
                      children="Reply"
                    />
                    {(comment.author.username ==
                      localStorage?.getItem("username") ??
                      "") && (
                      <button
                        className=" text-gray-400 text-xs w-fit p-1"
                        children="Delete"
                        onClick={handleDeleteComment}
                      />
                    )}
                    {replyList && replyList.length > 0 && (
                      <button
                        onClick={toggleReplies}
                        className=" text-gray-400 text-xs w-fit p-1"
                        children={
                          showReplies
                            ? "Hide replies"
                            : `Show replies (${replyList.length})`
                        }
                      />
                    )}
                  </div>
                </div>
                {showReplies && (
                  <CommentReplyList
                    key={"replylist" + comment.id}
                    {...{
                      setReplier,
                      pointerRef,
                      inputRef,
                      data: comment,
                      replyList
                    }}
                  />
                )}
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default CommentTile;