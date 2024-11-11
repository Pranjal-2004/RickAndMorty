import React from 'react'
import Heading from './Components/Heading'
import Page from './Components/Page'
import Footer from './Components/Footer'
import {QueryClient, QueryClientProvider} from 'react-query'

const App = () => {
  const queryClient = new QueryClient()
  return (
    <>
    <Heading />
    <QueryClientProvider client={queryClient}>
      <Page />
    </QueryClientProvider>
    <Footer />
    </>
  )
}

export default App