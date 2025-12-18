import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { AppRoutes } from "./routes/AppRoutes";
import { FirstAccessCheck } from "./components/FirstAccessCheck";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <FirstAccessCheck>
          <AppRoutes />
        </FirstAccessCheck>
      </BrowserRouter>
    </AuthProvider>
  );
}
