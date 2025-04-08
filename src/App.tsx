
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Preamble from "./pages/Preamble";
import Articles from "./pages/Articles";
import Amendments from "./pages/Amendments";
import About from "./pages/About";
import StudentMode from "./components/StudentMode";
import NotFound from "./pages/NotFound";
import StateConstitution from "./pages/StateConstitution";
import Ministers from "./pages/Ministers";
import ChatBot from "./pages/ChatBot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/preamble" element={<Preamble />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/amendments" element={<Amendments />} />
          <Route path="/about" element={<About />} />
          <Route path="/student-mode" element={<StudentMode />} />
          <Route path="/state-constitution" element={<StateConstitution />} />
          <Route path="/state-constitution/:stateCode" element={<StateConstitution />} />
          <Route path="/ministers" element={<Ministers />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
