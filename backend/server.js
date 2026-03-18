import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let users = [];

app.get("/", (req, res) => {
  res.send("FUNCIONANDO 🔥");
});

app.post("/register", (req, res) => {
  const user = {
    id: Date.now(),
    email: req.body.email,
    senha: req.body.senha,
    saldo: 100
  };
  users.push(user);
  res.json(user);
});

app.post("/login", (req, res) => {
  const user = users.find(
    u => u.email === req.body.email && u.senha === req.body.senha
  );
  res.json(user || {});
});

app.post("/bet", (req, res) => {
  const user = users.find(u => u.id === req.body.userId);
  const crash = Math.random() * 5 + 1;

  if (req.body.cashout < crash) {
    user.saldo += req.body.valor * req.body.cashout;
  } else {
    user.saldo -= req.body.valor;
  }

  res.json({ saldo: user.saldo, crash });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Rodando 🚀"));
