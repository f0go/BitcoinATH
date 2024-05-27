document.addEventListener('DOMContentLoaded', () => {
    const priceElement = document.getElementById('price');
    const dateElement = document.getElementById('date');
    const currentElement = document.getElementById('current');
    const daysElement = document.getElementById('days');
    const percentElement = document.getElementById('percent');
    async function fetchprice() {
        try {
            const response = await fetch('https://api.coinpaprika.com/v1/tickers/btc-bitcoin');
            const data = await response.json();
            priceElement.textContent = "$" + Math.round(data.quotes.USD.ath_price);

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
            let formattedDate = date.toLocaleDateString(userLang, options)

            let now = new Date()
            let difference = now.getTime() - date.getTime();
            let days = Math.floor(difference / (1000 * 60 * 60 * 24))

            dateElement.textContent = `ATH Date: ${formattedDate}`
            currentElement.textContent = `Current Price: $${Math.round(data.quotes.USD.price)}`
            daysElement.textContent = `Days since ATH: ${days}`
            percentElement.textContent = `Percent from ATH: ${data.quotes.USD.percent_from_price_ath}%`
        } catch (error) {
            console.error('Error al obtener el número de la API:', error);
            priceElement.textContent = 'Error';
        }
    }
    fetchprice();
});


