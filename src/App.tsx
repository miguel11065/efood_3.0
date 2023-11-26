import { BrowserRouter } from 'react-router-dom'

import { GlobalCss } from './styles'
import Footer from './components/Footer'
import Rotas from './routes'
import { Provider } from 'react-redux'
import { store } from './store'
import Cart from './components/Cart'
import Checkout from './pages/Checkout'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalCss />
        <Rotas />
        <Footer />
        <Cart />
      </BrowserRouter>
    </Provider>
  )
}

export default App
