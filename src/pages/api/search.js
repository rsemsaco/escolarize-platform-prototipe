// src/pages/api/search.js
export default async function handler(req, res) {
  const query = req.query.q || "";

  // URL do seu Google Apps Script (exec)
  const sheetUrl = "https://script.google.com/macros/s/SEU_SCRIPT_ID/exec";

  try {
    // Fetch para a planilha
    const response = await fetch(sheetUrl);

    if (!response.ok) {
      console.error("Erro na requisição do Apps Script:", response.status, response.statusText);
      return res.status(500).json({ error: "Falha ao buscar dados da planilha" });
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("Dados retornados não são um array:", data);
      return res.status(500).json({ error: "Formato de dados inválido" });
    }

    // Filtra resultados com base na query
    const results = query
      ? data.filter(item => item.nome?.toLowerCase().includes(query.toLowerCase()))
      : data;

    return res.status(200).json(results);
  } catch (error) {
    console.error("Erro interno na API search.js:", error);
    return res.status(500).json({ error: "Erro interno ao buscar dados" });
  }
}
