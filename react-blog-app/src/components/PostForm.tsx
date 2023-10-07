import AuthContext from "@/context/AuthContext";
import { db } from "@/firebase";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PostProps } from "./PostList";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState<PostProps | null>(null);
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

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

  useEffect(() => {
    if (params?.id) {
      getPost(params?.id);
    }
  }, [params?.id]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSummary(post.summary);
      setContent(post.content);
    }
  }, [post]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "title") {
      setTitle(value);
    } else if (name === "summary") {
      setSummary(value);
    } else if (name === "content") {
      setContent(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (post && post.id) {
        // post 데이터 수정
        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
          title,
          summary,
          content,
          updatedAt: new Date()?.toLocaleDateString(),
        });

        toast.success("게시글이 수정되었습니다.");
        navigate(`/posts/${post.id}`);
      } else {
        await addDoc(collection(db, "posts"), {
          title,
          summary,
          content,
          createdAt: new Date()?.toLocaleDateString(),
          email: user?.email,
          uid: user?.uid,
        });

        toast.success("게시글이 작성되었습니다.");
        navigate("/");
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e.code);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="form">
        <div className="form__block">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={title}
            onChange={onChange}
          />
        </div>

        <div className="form__block">
          <label htmlFor="summary">요약</label>
          <input
            type="text"
            name="summary"
            id="summary"
            required
            value={summary}
            onChange={onChange}
          />
        </div>

        <div className="form__block">
          <label htmlFor="content">내용</label>
          <textarea
            name="content"
            id="content"
            required
            value={content}
            onChange={onChange}
          />
        </div>

        <div className="form__block">
          <input
            type="submit"
            value={post ? "수정" : "작성"}
            className="form__btn--submit"
          />
        </div>
      </form>
    </>
  );
};

export default PostForm;
