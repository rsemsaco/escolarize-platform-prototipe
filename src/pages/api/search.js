export default async function handler(req, res) {
  const query = req.query.q || "";

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxpVnMSxihQwO_P6gebekRYPwMClL8Pc-1X5vsU4wf-H0yN4pBurOu2D-C5nvvpoHkHnA/exec");
    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Data fetched:", data);

    // filtra se houver query
    const results = query
      ? data.filter(item => item.nome?.toLowerCase().includes(query.toLowerCase()))
      : data;

    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Falha ao buscar dados" });
  }
}
