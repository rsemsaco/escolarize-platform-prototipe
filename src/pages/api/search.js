// src/pages/api/search.js
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const query = req.query.q?.toLowerCase() || "";

    // 🔹 Aqui você deve colocar a URL da sua planilha publicada pelo Google Apps Script
    const sheetUrl = "https://script.google.com/macros/s/AKfycbxpVnMSxihQwO_P6gebekRYPwMClL8Pc-1X5vsU4wf-H0yN4pBurOu2D-C5nvvpoHkHnA/exec";

    // Faz a chamada para o Apps Script que retorna os dados da planilha
    const response = await fetch(sheetUrl);
    const data = await response.json();

    // Filtra resultados de acordo com a pesquisa
    const results = data.filter((item) =>
      item.nome?.toLowerCase().includes(query)
    );

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar dados da planilha" });
  }
}
