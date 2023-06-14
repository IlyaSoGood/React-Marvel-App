import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = `apikey=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset, limit = 9) => {
        const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const _transformCharacter = (char) => {
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
    const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

    const getAllComics = async (offset = 0, limit = 8) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=${limit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
    }



    const _transformComics = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description || "There is no description",
            pageCount: comic.pageCount
            ? `${comic.pageCount} p.`
            : "No information about the number of pages",
            language: comic.textObjects[0]?.language || "en-us",
            price: comic.prices.price ? `${comic.prices.price}` : 'not available',
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
        }
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic, getCharacterByName}
}

export default useMarvelService;