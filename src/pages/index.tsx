import type { NextPage } from 'next'
import { ChakraProvider } from '@chakra-ui/react'
import { App } from './components/App'

const Home: NextPage = () => {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  )
}

export default Home
