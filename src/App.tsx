import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router"
import { useShallow } from "zustand/shallow";
import { useAuthStore } from "@/store/auth";
import { PRIVATE, PUBLIC, RUTES } from "@/utils/const";
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

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          {/* Rutas publicas LOGIN y REGISTER */}
          <Route element={<ProtecterRoutes rutesProtecter={PUBLIC} />} >
            <Route path={RUTES.LOGIN} element={<LoginPage />} />
            <Route path={RUTES.REGISTER} element={<RegisterPage />} />
          </Route>

          {/* Rutas privadasm DASHBOARD y SETTINGS */}
          <Route element={<ProtecterRoutes rutesProtecter={PRIVATE} />} >
            <Route path={RUTES.DASHBOARD} element={<DashboardPage />} > 
              <Route index element={<HomePage />} />
              <Route path={RUTES.SETTINGS} element={<SettingsPage />} />
            </Route>
          </Route>
          
          {/* Ruta de enlaces cortos, redirecciona a la pagina de destino */}
          <Route path={RUTES.REDIRECT} element={<RedirectPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
