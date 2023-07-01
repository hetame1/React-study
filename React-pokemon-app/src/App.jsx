import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [pokemons, setPokemons] = useState([])

  const url = 'https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0'

  useEffect(() => {
    fetchPokeData()
  }, []) 

  const fetchPokeData = async () => {
    try {
      const res = await axios.get(url)
      console.log(res.data.results)
      setPokemons(res.data.results)
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <article className='pt-6'>
      <header className='flex flex-col gap-2 w-full px-4 z-50'>
        Input form
      </header>

      <section className='pt-6 flex flex-col justify-center items-center'>
        
      </section>
    </article>
  )
}

export default App
