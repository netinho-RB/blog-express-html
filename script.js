const apiKey = '872d5bff15e13453565edb516e2faaa5'; // Substitua pelo seu token da ExchangeRatesAPI.io
const usdToBrlDiv = document.getElementById('usd-to-brl');

async function getExchangeRate() {
  try {
    const response = await fetch(
      `https://api.exchangeratesapi.io/latest?base=USD&symbols=BRL&access_key=${apiKey}`
    );
    const data = await response.json();
    const exchangeRate = data.rates?.BRL || 0;
    usdToBrlDiv.innerText = `USD para BRL: ${exchangeRate.toFixed(2)}`;
  } catch (error) {
    console.error('Erro ao obter a cotação do dólar:', error);
    usdToBrlDiv.innerText = 'Erro ao obter a cotação do dólar';
  }
}

getExchangeRate();
