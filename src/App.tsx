import Header from "./components/ui/header";
import Home from "./pages/home";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
    return (
        <TooltipProvider>
            <Header />
            <Home />
            <Toaster />
        </TooltipProvider>
    );
}

export default App;
