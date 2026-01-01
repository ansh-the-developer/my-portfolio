import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Projects from '../pages/Projects/Projects'
import About from '../pages/About/About'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default AppRoutes
