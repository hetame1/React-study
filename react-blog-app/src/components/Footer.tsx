import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <Link to="/posts/new"> 글쓰기 </Link>
      <Link to="/posts"> 게시글 </Link>
      <Link to="/profile"> 프로필 </Link>
  </footer>
  )
}

export default Footer