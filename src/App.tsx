import { BrowserRouter, Route, Routes } from "react-router"
import Login from "@/pages/login"
import Register from "@/pages/register"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard/*" element={<DashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
