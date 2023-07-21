const usdToBrlDiv = document.getElementById('usd-to-brl');
const usdToUsdDiv = document.getElementById('usd-to-usd');

async function getExchangeRate() {
  try {
    const response = await fetch(
      'https://api.exchangeratesapi.io/latest?base=USD&symbols=BRL'
    );
    const data = await response.json();
    const exchangeRateBRL = data.rates?.BRL || 0;

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayFormatted = yesterday.toISOString().split('T')[0];

    const responseYesterday = await fetch(
      `https://api.exchangeratesapi.io/${yesterdayFormatted}?base=USD&symbols=BRL`
    );
    const dataYesterday = await responseYesterday.json();
    const exchangeRateYesterdayBRL = dataYesterday.rates?.BRL || 0;

    const dailyVariationBRL = exchangeRateBRL - exchangeRateYesterdayBRL;

    usdToBrlDiv.innerHTML = `
      <p>USD para BRL: ${exchangeRateBRL.toFixed(2)}</p>
      <p>Variação Diária em BRL: ${dailyVariationBRL.toFixed(4)}</p>
    `;

    // Mostrar cotação em dólar
    const exchangeRateUSD = 1 / exchangeRateBRL;
    const dailyVariationUSD = 1 / exchangeRateYesterdayBRL - exchangeRateUSD;

    usdToUsdDiv.innerHTML = `
      <p>USD para USD: ${exchangeRateUSD.toFixed(2)}</p>
      <p>Variação Diária em USD: ${dailyVariationUSD.toFixed(4)}</p>
    `;
  } catch (error) {
    console.error('Erro ao obter a cotação do dólar:', error);
    usdToBrlDiv.innerText = 'Erro ao obter a cotação do dólar';
    usdToUsdDiv.innerText = 'Erro ao obter a cotação do dólar';
  }
}

getExchangeRate();
