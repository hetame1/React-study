import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostProps } from "./PostList";
import { db } from "@/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import Loader from "./Loader";
import { toast } from "react-toastify";

const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);

  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      setPost({
        id: docSnap.id,
        ...(docSnap.data() as PostProps),
      });
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "posts", post.id));

      toast.success("삭제되었습니다.");
      navigate("/");
    }
  };

  useEffect(() => {
    if (params?.id) {
      getPost(params?.id);
    }
  }, [params?.id]);

  return (
    <>
      <div className="post__detail">
        {post ? (
          <div className="post__box">
            <div className="post__title">{post?.title}</div>

            <div className="post__profile-box">
              <div className="post__profile" />
              <div className="post__author-name">{post?.email}</div>
              <div className="post__date">{post?.createdAt}</div>
            </div>

            <div className="post__utils-box">
              {post.category && (
                <div className="post__category">{post?.category}</div>
              )}
              <div
                className="post__delete"
                role="presentaion"
                onClick={handleDelete}
              >
                {" "}
                삭제{" "}
              </div>
              <div className="post__edit">
                <Link to={`/posts/edit/${post?.id}`}>수정</Link>
              </div>
            </div>

            <div className="post__text post__text--pre-wrap">
              {post?.content}
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default PostDetail;
