import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import CadastroTutor from "./pages/cadastroTutor";
import EditarTutor from "./pages/editarTutor";
import ListagemAnimais from "./pages/listarAnimais";
import CadastroAnimal from "./pages/cadastroAnimal";
import EditarAnimal from "./pages/editarAnimal";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/cadastro-tutor" element={<CadastroTutor />} />
        <Route path="/editar-tutor/:id" element={<EditarTutor />} />

        <Route path="/animais" element={<ListagemAnimais />} />
        <Route path="/cadastro-animal" element={<CadastroAnimal />} />
        <Route path="/editar-animal/:id" element={<EditarAnimal />} />

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
