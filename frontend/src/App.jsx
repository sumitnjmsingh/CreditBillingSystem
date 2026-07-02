import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import AIAnalyzer from "./components/AIAnalyzer";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster />
    </AuthProvider>
  );
}

export default App;