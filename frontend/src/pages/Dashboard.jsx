import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    carregarProdutos();
  }, []);

  function carregarProdutos() {
    axios
      .get("http://localhost:3001/produtos", {
        headers: { Authorization: token }
      })
      .then(res => setProdutos(res.data));
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const totalProdutos = produtos.length;

  const totalQuantidade = produtos.reduce(
    (acc, p) => acc + Number(p.quantidade),
    0
  );

  const maxQuantidade = Math.max(...produtos.map(p => Number(p.quantidade)));
  const minQuantidade = Math.min(...produtos.map(p => Number(p.quantidade)));

  const produtosMaior = produtos
    .filter(p => Number(p.quantidade) === maxQuantidade)
    .map(p => p.nome)
    .join("\n");

  const produtosMenor = produtos
    .filter(p => Number(p.quantidade) === minQuantidade)
    .map(p => p.nome)
    .join("\n");

  const dataLine = {
    labels: produtos.map(p => p.nome),
    datasets: [
      {
        label: "Estoque",
        data: produtos.map(p => p.quantidade),
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.15)",
        tension: 0.4,
        pointRadius: 3
      }
    ]
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Dashboard</h2>

      <div style={styles.cards}>
        <div style={styles.card}>
          <span>Total de Produtos</span>
          <h3>{totalProdutos}</h3>
        </div>

        <div style={styles.card}>
          <span>Quantidade Total</span>
          <h3>{totalQuantidade}</h3>
        </div>
      </div>

      <div style={styles.box}>
        <h3 style={{ fontSize: 14 }}>Estoque de Produtos</h3>
        <Line data={dataLine} />
      </div>

      <div style={styles.cards}>
        <div style={styles.card}>
          <span>Produto(s) em Maior Quantidade</span>
          <h3 style={{ whiteSpace: "pre-line" }}>
            {produtosMaior || "-"}
          </h3>
        </div>

        <div style={styles.card}>
          <span>Produto(s) em Menor Quantidade</span>
          <h3 style={{ whiteSpace: "pre-line" }}>
            {produtosMenor || "-"}
          </h3>
        </div>
      </div>

      <div style={styles.buttons}>
        <button style={styles.btn} onClick={() => navigate("/produtos")}>
          Produtos
        </button>

        <button style={styles.btnDanger} onClick={logout}>
          Sair
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

const styles = {
  container: {
    padding: 20,
    background: "#0f172a",
    minHeight: "100vh",
    color: "white",
    fontFamily: "Arial"
  },

  title: {
    fontSize: 16,
    marginBottom: 15
  },

  cards: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap"
  },

  card: {
    flex: 1,
    minWidth: 140,
    background: "#1e293b",
    padding: 10,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 12
  },

  box: {
    background: "#111827",
    padding: 15,
    borderRadius: 8,
    marginTop: 15
  },

  buttons: {
    marginTop: 25,
    display: "flex",
    justifyContent: "center",
    gap: 12
  },

  btn: {
    background: "#10b981",
    border: "none",
    padding: "8px 12px",
    borderRadius: 6,
    color: "white",
    cursor: "pointer",
    fontSize: 12
  },

  btnDanger: {
    background: "#ef4444",
    border: "none",
    padding: "8px 12px",
    borderRadius: 6,
    color: "white",
    cursor: "pointer",
    fontSize: 12
  }
};