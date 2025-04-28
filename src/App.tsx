import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router"
import Loading from "@/components/loading";

const LoginPage = lazy(() => import('@/pages/login'));
const RegisterPage = lazy(() => import('@/pages/register'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const SettingsPage = lazy(() => import('@/pages/settings'));

function App() {

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Loading />} /> */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard/" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )

}

export default App
