import { useQuery, useMutation } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  const { data, isError, isLoading, error } = useQuery(["comments", post.id], () => fetchComments(post.id));

  const deleteMutation = useMutation(() => deletePost(post.id));
  const updateMutation = useMutation(() => updatePost(post.id));
  
  if (isLoading) return <div>Loading...</div>;
  
  if (isError) return (
    <div>
      <h3>Error</h3>
      <p>{error.toString()}</p>
    </div>
  );

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>

      <button onClick={() => deleteMutation.mutate()}>
        Delete
      </button>

      {deleteMutation.isError && <p style={{ color: "red" }}>{deleteMutation.error.toString()}</p>}
      {deleteMutation.isLoading && <p style={{ color: "purple" }}>Deleting this post</p>}
      {deleteMutation.isSuccess && <p style={{ color: "green" }}>Post deleted</p>}  
         
      <button onClick={() => updateMutation.mutate()}>
        Update title
      </button>

      {updateMutation.isError && <p style={{ color: "red" }}>{updateMutation.error.toString()}</p>}
      {updateMutation.isLoading && <p style={{ color: "purple" }}>Updating this post</p>}
      {updateMutation.isSuccess && <p style={{ color: "green" }}>Post updated</p>}

      <p>{post.body}</p>

      <h4>Comments</h4>

      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}

    </>
  );
}
