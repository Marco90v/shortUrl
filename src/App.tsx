import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router"
import Loading from "@/components/loading";

const LoginPage = lazy(() => import('@/pages/login'));
const RegisterPage = lazy(() => import('@/pages/register'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const SettingsPage = lazy(() => import('@/pages/settings'));
const HomePage = lazy(() => import('@/pages/home'));
const RedirectPage = lazy(() => import('@/pages/redirectPages'));

function ProtecterRoutes(){
  const sesion = false;
  return !sesion ? <Navigate to="/" replace /> : <Outlet />
}

function App() {

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/:shortId" element={<RedirectPage />} />
          <Route element={<ProtecterRoutes />}>
            <Route path="dashboard" element={<DashboardPage />} > 
              <Route index element={<HomePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  )

}

export default App
