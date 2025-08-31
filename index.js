const axios = require('axios');

async function getShortestCatFact() {
    try {
        const firstPageResponse = await axios.get('https://catfact.ninja/facts');
        const { total, per_page } = firstPageResponse.data;

        const lastPage = Math.ceil(total / per_page);

        const lastPageResponse = await axios.get('https://catfact.ninja/facts', {
            params: { page: lastPage }
        });

        const facts = lastPageResponse.data.data;
        const shortestFact = facts.reduce((shortest, current) =>
                current.length < shortest.length ? current : shortest
            , { length: Infinity });

        console.log('Самый короткий факт с последней страницы:');
        console.log(shortestFact.fact);

    } catch (error) {
        console.error('Ошибка при получении данных:', error.message);
    }
}

getShortestCatFact();