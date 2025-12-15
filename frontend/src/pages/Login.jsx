import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:5000/auth",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.status === 200) {
          navigate("/home");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid bg-white min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h2 className="text-center mb-4 fw-bold">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Entrar
                  </button>
                </div>
                <p className="text-center mb-0">
                  Não tem uma conta?{" "}
                  <Link to="/register" className="fw-bold">
                    Registre-se aqui
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}