import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router"
import { useShallow } from "zustand/shallow";
import { useAuthStore } from "@/store/auth";
import { PRIVATE, PUBLIC } from "@/utils/const";
import Loading from "@/components/loading";

const LoginPage = lazy(() => import('@/pages/login'));
const RegisterPage = lazy(() => import('@/pages/register'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const SettingsPage = lazy(() => import('@/pages/settings'));
const HomePage = lazy(() => import('@/pages/home'));
const RedirectPage = lazy(() => import('@/pages/redirectPages'));

interface typeProtecterRoutes{
  rutesProtecter:'public' | 'private'
}

function ProtecterRoutes({rutesProtecter}:typeProtecterRoutes){
  const {user} = useAuthStore(
    useShallow( (state => ({
      user: state.user,
    })))
  )
  if(rutesProtecter === PUBLIC) return !user ? <Outlet /> : <Navigate to="/dashboard" replace />
  return !user ? <Navigate to="/" replace /> : <Outlet />
}

// function ValidateUser(){
//   const {user} = useAuthStore(
//     useShallow( (state => ({
//       user: state.user,
//     })))
//   )
//   return !user ? <Outlet /> : <Navigate to="/dashboard" replace />
// }

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/:shortId" element={<RedirectPage />} />
          <Route element={<ProtecterRoutes rutesProtecter={PUBLIC} />} >
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<ProtecterRoutes rutesProtecter={PRIVATE} />} >
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
