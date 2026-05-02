import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [editando, setEditando] = useState(null);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    carregar();
  }, []);

  function showMsg(texto) {
    setMsg(texto);
    setTimeout(() => setMsg(""), 2000);
  }

  function carregar() {
    axios
      .get("http://localhost:3001/produtos", {
        headers: { Authorization: token },
      })
      .then((res) => setProdutos(res.data))
      .catch(() => logout());
  }

  function salvar() {
    if (!nome || !quantidade) return;

    if (editando) {
      axios
        .put(
          `http://localhost:3001/produtos/${editando}`,
          { nome, quantidade },
          { headers: { Authorization: token } }
        )
        .then(() => {
          setEditando(null);
          setNome("");
          setQuantidade("");
          carregar();
          showMsg("Produto atualizado com sucesso!");
        });
    } else {
      axios
        .post(
          "http://localhost:3001/produtos",
          { nome, quantidade },
          { headers: { Authorization: token } }
        )
        .then((res) => {
          setProdutos([...produtos, res.data]);
          setNome("");
          setQuantidade("");
          showMsg("Produto cadastrado com sucesso!");
        });
    }
  }

  function editar(p) {
    setEditando(p.id);
    setNome(p.nome);
    setQuantidade(p.quantidade);
    showMsg("Editando produto...");
  }

  function cancelar() {
    setEditando(null);
    setNome("");
    setQuantidade("");
    showMsg("Edição cancelada");
  }

  function excluir(id) {
    const confirmar = window.confirm("Tem certeza que deseja excluir este produto?");
    if (!confirmar) return;

    axios
      .delete(`http://localhost:3001/produtos/${id}`, {
        headers: { Authorization: token },
      })
      .then(() => {
        setProdutos(produtos.filter((p) => p.id !== id));
        showMsg("Produto excluído com sucesso!");
      });
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Produtos</h1>

        {msg && <div style={styles.msg}>{msg}</div>}

        <div style={styles.form}>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
            style={styles.input}
          />
            
          <input
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            placeholder="Quantidade"
            style={styles.input}
            type="number"
          />

          <div style={styles.buttonGroup}>
            <button onClick={salvar} style={styles.button}>
              {editando ? "Atualizar" : "Salvar"}
            </button>

            {editando && (
              <button onClick={cancelar} style={styles.cancel}>
                Cancelar
              </button>
            )}
          </div>
        </div>

        <div style={styles.list}>
          {produtos.map((p) => (
            <div key={p.id} style={styles.item}>
              <span style={styles.text}>
                {p.nome} - {p.quantidade}
              </span>

              <div>
                <button onClick={() => editar(p)} style={styles.edit}>
                  ✏️
                </button>

                <button onClick={() => excluir(p.id)} style={styles.delete}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => navigate("/dashboard")} style={styles.nav}>
          Dashboard
        </button>

        <button onClick={logout} style={styles.logout}>
          Sair
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "#111827",
    padding: 25,
    borderRadius: 12,
    width: 420,
    color: "white",
    border: "1px solid #1f2937",
  },

  title: {
    fontSize: 18,
    marginBottom: 10,
  },

  msg: {
    background: "#1f2937",
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
    fontSize: 12,
    textAlign: "center",
    color: "#22c55e",
  },

  form: {
    display: "flex",
    gap: 8,
    marginBottom: 15,
    flexWrap: "wrap",
  },

  input: {
    flex: 1,
    padding: 6,
    borderRadius: 6,
    border: "none",
    outline: "none",
    fontSize: 12,
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    marginTop: 8,
  },

  button: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
  },

  cancel: {
    background: "#6b7280",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
  },

  list: {
    marginTop: 10,
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: 8,
    background: "#1f2937",
    marginBottom: 6,
    borderRadius: 6,
  },

  text: {
    fontSize: 12,
  },

  edit: {
    background: "#f59e0b",
    border: "none",
    padding: "4px 7px",
    marginRight: 4,
    borderRadius: 5,
    cursor: "pointer",
    fontSize: 11,
  },

  delete: {
    background: "#ef4444",
    border: "none",
    padding: "4px 7px",
    borderRadius: 5,
    cursor: "pointer",
    fontSize: 11,
  },

  nav: {
    marginTop: 12,
    width: "100%",
    background: "#10b981",
    border: "none",
    padding: 8,
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
  },

  logout: {
    marginTop: 8,
    width: "100%",
    background: "#dc2626",
    border: "none",
    padding: 8,
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
  },
};