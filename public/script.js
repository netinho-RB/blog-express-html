// Seu arquivo scripts.js
const dataDiv = document.getElementById('data');
const usdToBrlDiv = document.getElementById('usd-to-brl');

async function getExchangeRate() {
  try {
    const response = await fetch('https://api.exchangeratesapi.io/latest?base=USD&symbols=BRL');
    const data = await response.json();
    const exchangeRateBRL = data.rates?.BRL;

    if (exchangeRateBRL) {
      const today = new Date().toISOString().split('T')[0];
      dataDiv.textContent = today;
      usdToBrlDiv.textContent = exchangeRateBRL.toFixed(2);
    } else {
      throw new Error('Cotação do dólar não encontrada');
    }
  } catch (error) {
    console.error('Erro ao obter a cotação do dólar:', error);
    dataDiv.textContent = 'Erro ao obter a cotação do dólar';
    usdToBrlDiv.textContent = 'Erro ao obter a cotação do dólar';
  }
}

getExchangeRate();

const btnAtualizar = document.getElementById('btnAtualizar');
btnAtualizar.addEventListener('click', getExchangeRate);
