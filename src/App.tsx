import Header from "./components/ui/header";
import { ThemeProvider } from "./components/ui/theme-provider";
import Home from "./pages/home";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <TooltipProvider>
                <Header />
                <Home />
                <Toaster />
            </TooltipProvider>
        </ThemeProvider>
    );
}

export default App;
