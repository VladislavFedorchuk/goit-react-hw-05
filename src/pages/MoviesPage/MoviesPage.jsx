import { lazy, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { queryReq } from '../../api-service'
import { toast } from 'react-hot-toast'

const MovieList = lazy(() => import('../../components/MovieList/MovieList'))
const Loader = lazy(() => import('../../components/Loader/Loader'))
const SearchForm = lazy(() => import('../../components/SearchForm/SearchForm'))
const ErrorMessage = lazy(() => import('../../components/ErrorMessage/ErrorMessage'))

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  const query = searchParams.get("query") ?? ""

  useEffect(() => {
    const fetchQueryMovies = async () => {
      if (!query) return
      setLoading(true)
      try {
        const res = await queryReq(query)
        setMovies(res)
      } catch (error) {
        toast.error("Sorry, there is no movie matching your search query!")
      } finally {
        setLoading(false)
      }
    }

    fetchQueryMovies()
  }, [query])

  const handleSearch = (query) => {
    setSearchParams({ query })
  }

  return (
    <main>
      {loading && <Loader />}
      <SearchForm onSearch={handleSearch} />
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  )
}

export default MoviesPage
