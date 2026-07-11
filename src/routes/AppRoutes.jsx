import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import ProjectsPage from '../pages/Projects/ProjectsPage'
import About from '../pages/About/About'
import ContactPage from '../pages/Contact/ContactPage'
import Login from '../pages/Admin/Login'
import Dashboard from '../pages/Admin/Dashboard'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Dashboard />} />
    </Routes>
  )
}

export default AppRoutes
