import { RouterProvider } from "react-router-dom"
import authRoutes from "./features/auth/AuthRoutes"
import { AuthProvider } from "./features/auth/auth.context"
import { SongContextProvider } from "./features/Home/song.context"
const App = () => {
  return (
    <AuthProvider>
      <SongContextProvider>
      <RouterProvider router={authRoutes} />
      </SongContextProvider>
    </AuthProvider>
  )
}

export default App