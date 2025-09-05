// src/pages/api/search.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const query = req.query.q || "";

  // URL pública do Apps Script (exec)
  const sheetUrl =
    "https://script.google.com/macros/s/AKfycbxpVnMSxihQwO_P6gebekRYPwMClL8Pc-1X5vsU4wf-H0yN4pBurOu2D-C5nvvpoHkHnA/exec";

  try {
    // Fetch com redirect: "follow" para garantir que o Apps Script responda corretamente
    const response = await fetch(sheetUrl, { redirect: "follow" });

    if (!response.ok) {
      console.error(
        "Erro na requisição do Apps Script:",
        response.status,
        response.statusText
      );
      return res
        .status(500)
        .json({ error: "Falha ao buscar dados da planilha" });
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("Dados retornados não são um array:", data);
      return res.status(500).json({ error: "Formato de dados inválido" });
    }

    // Filtra resultados se houver query
    const results = query
      ? data.filter((item) =>
          item.nome?.toLowerCase().includes(query.toLowerCase())
        )
      : data;

    // Retorna JSON
    return res.status(200).json(results);
  } catch (error) {
    console.error("Erro interno na API search.js:", error);
    return res.status(500).json({ error: "Erro interno ao buscar dados" });
  }
}
