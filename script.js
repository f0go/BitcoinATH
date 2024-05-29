document.addEventListener('DOMContentLoaded', () => {
    const priceElement = document.getElementById('price');
    const dateElement = document.getElementById('date');
    const currentElement = document.getElementById('current');
    const daysElement = document.getElementById('days');
    const percentElement = document.getElementById('percent');
    const investmentInput = document.getElementById('investment');
    const calculateButton = document.getElementById('calculate');
    const investmentResult = document.getElementById('investment-result');

    let athPrice = 0;
    let currentPrice = 0;

    async function fetchprice() {
        try {
            const response = await fetch('https://api.coinpaprika.com/v1/tickers/btc-bitcoin');
            const data = await response.json();
            athPrice = data.quotes.USD.ath_price;
            currentPrice = data.quotes.USD.price;
            const athPriceFormatted = athPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
            const currentPriceFormatted = currentPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

            priceElement.textContent = athPriceFormatted;

            let date = new Date(data.quotes.USD.ath_date);
            let options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            };
            const userLang = navigator.language || navigator.userLanguage;
            let formattedDate = date.toLocaleDateString(userLang, options);

            let now = new Date();
            let difference = now.getTime() - date.getTime();
            let days = Math.floor(difference / (1000 * 60 * 60 * 24));

            dateElement.textContent = `ATH Date: ${formattedDate}`;
            currentElement.textContent = `Current Price: ${currentPriceFormatted}`;
            daysElement.textContent = `Days since ATH: ${days}`;
            percentElement.textContent = `Percent from ATH: ${data.quotes.USD.percent_from_price_ath}%`;
        } catch (error) {
            console.error('Error al obtener el número de la API:', error);
            priceElement.textContent = 'Error';
        }
    }

    function calculateInvestment() {
        const investment = parseFloat(investmentInput.value);
        if (isNaN(investment) || investment <= 0) {
            investmentResult.textContent = 'Please enter a valid investment amount.';
            return;
        }

        const valueAtATH = (investment / currentPrice) * athPrice;
        const valueToday = (investment / currentPrice) * currentPrice;

        investmentResult.innerHTML = `
            <p>Value at ATH: ${valueAtATH.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })}</p>
            <p>Value Today: ${valueToday.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })}</p>
        `;
    }

    calculateButton.addEventListener('click', calculateInvestment);

    fetchprice();
});
