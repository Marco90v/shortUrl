import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router"

const LoginPage = lazy(() => import('@/pages/login'));
const RegisterPage = lazy(() => import('@/pages/register'));

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} /> */}
        </Routes>
      </BrowserRouter>
    </Suspense>
  )

}

export default App
