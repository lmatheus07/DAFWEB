import express from "express";
import { sendEmail  } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/send-test", async (req, res)=> {
    try {
        await sendEmail ({
            to: "luismatheus4002@gmail.com",
            subject: "Test Email",
            text: "This is a test email sent from the Express server.",
            html: "<h1>This is a test email sent from the Express server.</h1>"
        })
        res.status(200).json({ message: "Email enviado com sucesso." });

    } catch (error) {
        res.status(500).json({ message: "Erro ao enviar email." });
    }
});

router.post("send-calculation", async (req, res) => {
    try {
    const { nome, email, resultado } = req.body;
    if (!nome || !email || !resultado) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }
    await sendEmail ({
        to: "luismatheus4002@gmail.com",
        subject: `Simulação de impostos de ${nome}`,
        text: `Olá ${nome}, \n\nSegue o  resultado da sua simulação: \n${resultado}`,
        html: `<h1>Olá ${nome}</h1><p>Segue o  resultado da sua simulação:</p><pre>${resultado}</pre>`
    });
    res.status(200).json({ message: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ error: 'Erro ao enviar email.' });
  }
});

export default router;
