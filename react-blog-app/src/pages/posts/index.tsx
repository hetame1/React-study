import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PostList from "@/components/PostList";

const PostListPage = () => {
  return (
    <>
      <Header />
      <PostList hasNavigation={false} defaultTab="my" />
      <Footer />
    </>
  );
};

export default PostListPage;
