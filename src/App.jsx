import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import './App.css';
import { AuthPrivider } from "./context/AuthProvider";

export const App = () => {
  return (
    <AuthPrivider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthPrivider>  
  )
}
