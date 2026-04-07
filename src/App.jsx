import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Company from "./pages/Company.tsx";
import Equipments from "./pages/Equipments.tsx";
import Constructions from "./pages/Constructions.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import Institucional from "./pages/Institucional.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/equipments" element={<Equipments />} />
          <Route path="/constructions" element={<Constructions />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/institutional" element={<Institucional />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
