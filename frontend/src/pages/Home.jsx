import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalculatorForm from "../components/CalculatorForm";
import CompareResult from "../components/CompareResult";
import { compareTaxes } from "../util/tax";

export default function Home() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => navigate("/login");

  function handleCompare(data) {
    const comparison = compareTaxes({
      rendaMensal: data.rendaMensal,
      custosMensais: data.custosMensais,
    });
    setResult({
      ...comparison,
      input: {
        rendaMensal: data.rendaMensal,
        custosMensais: data.custosMensais,
        profissao: data.profissao,
        sendEmail: data.sendEmail,
        emailUser: data.emailUser,   // importante para envio
        emailNAF: data.emailNAF,     // importante para envio
      },
    });
  }

  function handleBack() {
    setResult(null); // limpa resultado e volta ao formulário
  }

  // 👉 Aqui você coloca a função de callback para o CompareResult
  async function handleSendEmailNAF(payload) {
    console.log("Resultado do envio:", payload);
    // aqui você pode tratar o retorno do backend, mostrar alert, etc.
  }

  return (
    <div className="container-fluid min-vh-100 bg-white text-dark">
      {/* Barra superior */}
      <div className="row bg-primary text-light py-3 mb-4">
        <div className="col d-flex justify-content-between align-items-center px-4">
          <div>
            <h5 className="mb-0 fw-bold">DAF - Calculadora Tributária</h5>
            <p className="mb-0 small">Compare PF vs PJ — Simples Nacional</p>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-outline-light btn-sm fw-bold"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Conteúdo central */}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          {!result ? (
            <CalculatorForm onCompare={handleCompare} />
          ) : (
            <CompareResult
              result={result}
              onBack={handleBack}
              onSendEmailNAF={handleSendEmailNAF} // passa para o CompareResult
            />
          )}
        </div>
      </div>
    </div>
  );
}