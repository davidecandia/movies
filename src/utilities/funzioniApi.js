const fetchTopFilms = async () => {
  const apiKey = process.env.REACT_APP_MOVIES;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };

  //const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=it-IT&page=1&sort_by=popularity.desc';
  const url = "https://api.themoviedb.org/3/trending/movie/week?language=it-IT"
  try {
    const response = await fetch(url, options);
    const responseJson = await response.json();
    console.log('risposta api fetchTopFilms', responseJson.results)
    return responseJson.results || [];
  } catch (error) {
    console.error('Error during API request:', error);
    return [];
  }
};

//cerca movies 
const cercaMovies = async (searchTerm) => {
  const apiKey = process.env.REACT_APP_MOVIES;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };


  const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=it-IT`;
  try {
    const response = await fetch(url, options);
    const responseJson = await response.json();
    return responseJson.results || [];
  } catch (error) {
    console.error('Error during API request:', error);
    return [];
  }
};


//top serie
const fetchTopSerie = async () => {
  const apiKey = process.env.REACT_APP_MOVIES;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };
  //const url = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=it-IT&page=1&sort_by=popularity.desc';
  const url = "https://api.themoviedb.org/3/trending/tv/week?language=it-IT"

  try {
    const response = await fetch(url, options);
    const responseJson = await response.json();
    console.log('risposta api file serie', responseJson.results)
    return responseJson.results || [];
  } catch (error) {
    console.error('Error during API request:', error);
    return [];
  }
};
// cerca serie TV 
const cercaSerie = async (searchTerm) => {
  const apiKey = process.env.REACT_APP_MOVIES;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };


  const url = `https://api.themoviedb.org/3/search/tv?query=${searchTerm}&include_adult=false&language=it-IT`;
  try {
    const response = await fetch(url, options);
    const responseJson = await response.json();
    return responseJson.results || [];
  } catch (error) {
    console.error('Error during API request:', error);
    return [];
  }
};

//find by ID film
const cercaID = async ({ movieID }) => {
  const apiKey = process.env.REACT_APP_MOVIES;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };


  const url = `https://api.themoviedb.org/3/movie/${movieID}?language=it-IT`;

  try {
    const response = await fetch(url, options);
    const responseJson = await response.json();
    console.log('find by ID', responseJson)
    return responseJson || [];
  } catch (error) {
    console.error('Error during API request:', error);
    return [];
  }
}


//find by ID  TV 
const cercaIDTV = async ({ movieID }) => {
  const apiKey = process.env.REACT_APP_MOVIES;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };


  const url = `https://api.themoviedb.org/3/tv/${movieID}?language=it-IT`;

  try {
    const response = await fetch(url, options);
    const responseJson = await response.json();
    console.log('find by ID', responseJson)
    return responseJson || [];
  } catch (error) {
    console.error('Error during API request:', error);
    return [];
  }
}

//video movies
const video = async ({ movieID }) => {
  const apiKey = process.env.REACT_APP_MOVIES;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };

  const url = `https://api.themoviedb.org/3/movie/${movieID}/videos?language=it-IT`;
  const urlEn = `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`;
  const urlProvaider = `https://api.themoviedb.org/3/movie/${movieID}/watch/providers`;

  try {
    const response = await fetch(url, options);
    const responseJson = await response.json();
    console.log('video', responseJson)

    const responseEn = await fetch(urlEn, options);
    const responseJsonEn = await responseEn.json();



    const responseProvaider = await fetch(urlProvaider, options);
    const responseJsonProvaider = await responseProvaider.json();


    return { responseJson, responseJsonEn, responseJsonProvaider } || [];
  } catch (error) {
    console.error('Error during API request:', error);
    return {};
  }
}

//video movies tv
const videoTV = async ({ movieID }) => {
  const apiKey = process.env.REACT_APP_MOVIES;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };

  const url = `https://api.themoviedb.org/3/tv/${movieID}/videos?language=it-IT`;
  const urlEn = `https://api.themoviedb.org/3/tv/${movieID}/videos?language=en-US`;
  try {
    const response = await fetch(url, options);
    const responseJson = await response.json();
    console.log('video', responseJson)

    const responseEn = await fetch(urlEn, options);
    const responseJsonEn = await responseEn.json();

    return { responseJson, responseJsonEn } || [];
  } catch (error) {
    console.error('Error during API request:', error);
    return {};
  }
}

//TRENDING People
const peopleApi = async () => {
  const apiKey = process.env.REACT_APP_MOVIES;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };

  const url = `https://api.themoviedb.org/3/trending/person/week?language=it-IT`;
  try {
    const response = await fetch(url, options);
    const responseJson = await response.json();
    console.log('people', responseJson)

    return responseJson.results || [];
  } catch (error) {
    console.error('Error during API request:', error);
    return {};
  }
}

// descrizione people
const descrizionePeople = async ({ peopleID }) => {
  const apiKey = process.env.REACT_APP_MOVIES;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };
  const url = `https://api.themoviedb.org/3/person/${peopleID}?language=it-IT`;
  const urlEn = `https://api.themoviedb.org/3/person/${peopleID}?language=en-US`;
  try {
    const response = await fetch(url, options);
    const responseJson = await response.json();
    console.log('descrizione people', responseJson)

    const responseEn = await fetch(urlEn, options);
    const responseJsonEn = await responseEn.json();

    return { responseJson, responseJsonEn } || [];
  } catch (error) {
    console.error('Error during API request:', error);
    return {};
  }
}

//find by ID similar movies
const similarMovies = async ({ movieID }) => {
  const apiKey = process.env.REACT_APP_MOVIES;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };


  const url = `https://api.themoviedb.org/3/movie/${movieID}/similar`;

  try {
    const response = await fetch(url, options);
    const responseJson = await response.json();
    console.log('find by ID similar', responseJson)
    return responseJson.results || [];
  } catch (error) {
    console.error('Error during API request:', error);
    return [];
  }
}

export { fetchTopFilms, cercaMovies, fetchTopSerie, cercaSerie, cercaID, cercaIDTV, video, videoTV, peopleApi, descrizionePeople, similarMovies };
