import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { AuthPage } from '@/pages/AuthPage'
import { HomePage } from '@/pages/HomePage'
import { MapPage } from '@/pages/MapPage'
import { ProjectFormPage } from '@/pages/ProjectFormPage'
import { ProjectsPage } from '@/pages/ProjectsPage'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/login"
        element={<AuthPage />}
      />

      <Route
        path="/signup"
        element={<AuthPage signup />}
      />

      <Route
        path="/projects"
        element={<ProjectsPage />}
      />

      <Route
        path="/projects/new"
        element={<ProjectFormPage />}
      />

      <Route
        path="/projects/:id/edit"
        element={<ProjectFormPage editing />}
      />

      <Route
        path="/projects/:id"
        element={<MapPage />}
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  )
}