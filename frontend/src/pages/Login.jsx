import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  async function entrar() {
    try {
      const res = await axios.post("http://localhost:3001/login", {
        usuario,
        senha,
      });

      if (!res.data.token) {
        setErro("Erro no login");
        return;
      }

      localStorage.setItem("token", `Bearer ${res.data.token}`);
      navigate("/produtos");
    } catch {
      setErro("Usuário ou senha inválidos.");
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Login</h1>

        {erro && <p className="error">{erro}</p>}

        <input
          data-cy="usuario"
          placeholder="Usuário"
          value={usuario}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          onChange={(e) => setUsuario(e.target.value.toLowerCase())}
        />

        <input
          data-cy="senha"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button data-cy="btn-login" className="btn-login" onClick={entrar}>
          Entrar
        </button>
      </div>
    </div>
  );
}