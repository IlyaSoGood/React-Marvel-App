class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = `apikey=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    _baseOffset = 210;

    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset, limit = 9) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=${limit}&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    getRandomInteger = async () => {
        let value = await fetch('https://www.random.org/integers/?num=1&min=-50&max=50&col=1&base=10&format=plain&rnd=new');

        return await value.text();
    }
}

export default MarvelService;