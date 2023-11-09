import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Pratos from './pages/Pratos'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/restaurante/:id" element={<Pratos />} />
  </Routes>
)

export default Rotas
