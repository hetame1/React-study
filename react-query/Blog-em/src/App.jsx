import { useState } from 'react'
import './App.css'
import { Posts } from './Posts'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools} from 'react-query/devtools'

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog Posts</h1>
        <Posts />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
