import AuthContext from "@/context/AuthContext";
import { db } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType;
}

type TabType = "all" | "my";

export interface PostProps {
  id?: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  email: string;
  updatedAt?: string;
  uid: string;
  category: CategoryType;
}

export type CategoryType = "Frontend" | "Backend" | "Web" | "Native";
export const CATEGORIES: CategoryType[] = [
  "Frontend",
  "Backend",
  "Web",
  "Native",
];

const PostList = ({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) => {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPost = async () => {
    setPosts([]);
    let postsRef = collection(db, "posts");
    let postsQuery;

    if (activeTab === "my") {
      postsQuery = query(
        postsRef,
        orderBy("createdAt", "asc"),
        where("uid", "==", user?.uid)
      );
    } else if (activeTab === "all") {
      postsQuery = query(postsRef, orderBy("createdAt", "asc"));
    } else {
      postsQuery = query(
        postsRef,
        orderBy("createdAt", "asc"),
        where("category", "==", activeTab)
      );
    }

    const datas = await getDocs(postsQuery);

    console.log(datas);

    datas.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  useEffect(() => {
    getPost();
  }, [activeTab]);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));

      toast.success("삭제되었습니다.");
      getPost();
    }
  };

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}
          >
            전체
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation--active" : ""}
          >
            나의 글
          </div>
          {CATEGORIES.map((category) => (
            <div
              key={category}
              role="presentation"
              onClick={() => setActiveTab(category)}
              className={
                activeTab === category ? "post__navigation--active" : ""
              }
            >
              {category}
            </div>
          ))}
        </div>
      )}

      <div className="post__list">
        {posts?.length > 0 ? (
          posts?.map((post) => (
            <div key={post?.id} className="post__box">
              <Link to={`/posts/${post?.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile" />
                  <div className="post__author-name">{post?.email}</div>
                  <div className="post__date">{post?.createdAt}</div>
                </div>

                <div className="post__title">{post?.title}</div>
                <div className="post__text">{post?.summary}</div>
              </Link>

              {post?.email === user?.email && (
                <div className="post__utils-box">
                  <div
                    className="post__delete"
                    role="presentation"
                    onClick={() => handleDelete(post?.id as string)}
                  >
                    {" "}
                    삭제{" "}
                  </div>
                  <Link to={`/posts/edit/${post?.id}`} className="post__edit">
                    수정
                  </Link>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post__empty">게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default PostList;
