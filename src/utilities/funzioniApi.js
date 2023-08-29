const fetchTopFilms = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWE3ZmIyMWYxMTIwOTcyMzIwZTMzODI5YmMxMmJhZiIsInN1YiI6IjY0ZTczMzFmMDZmOTg0MDBlYjVmMWJlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gRRsWsLuNHtuPWTo_eeQH7jMC8lbW-P9AJzb3p9QHbY'
      }
    };
  
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=it-IT&page=1&sort_by=popularity.desc';
    
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

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWE3ZmIyMWYxMTIwOTcyMzIwZTMzODI5YmMxMmJhZiIsInN1YiI6IjY0ZTczMzFmMDZmOTg0MDBlYjVmMWJlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gRRsWsLuNHtuPWTo_eeQH7jMC8lbW-P9AJzb3p9QHbY'
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
    const fetchTopSerie = async() =>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWE3ZmIyMWYxMTIwOTcyMzIwZTMzODI5YmMxMmJhZiIsInN1YiI6IjY0ZTczMzFmMDZmOTg0MDBlYjVmMWJlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gRRsWsLuNHtuPWTo_eeQH7jMC8lbW-P9AJzb3p9QHbY'
            }
          };
          const url = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=it-IT&page=1&sort_by=popularity.desc';
    
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

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWE3ZmIyMWYxMTIwOTcyMzIwZTMzODI5YmMxMmJhZiIsInN1YiI6IjY0ZTczMzFmMDZmOTg0MDBlYjVmMWJlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gRRsWsLuNHtuPWTo_eeQH7jMC8lbW-P9AJzb3p9QHbY'
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

    //find by ID 
    const cercaID = async ({movieID}) => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWE3ZmIyMWYxMTIwOTcyMzIwZTMzODI5YmMxMmJhZiIsInN1YiI6IjY0ZTczMzFmMDZmOTg0MDBlYjVmMWJlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gRRsWsLuNHtuPWTo_eeQH7jMC8lbW-P9AJzb3p9QHbY'
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
        const cercaIDTV = async ({movieID}) => {
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWE3ZmIyMWYxMTIwOTcyMzIwZTMzODI5YmMxMmJhZiIsInN1YiI6IjY0ZTczMzFmMDZmOTg0MDBlYjVmMWJlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gRRsWsLuNHtuPWTo_eeQH7jMC8lbW-P9AJzb3p9QHbY'
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
        const video = async ({movieID}) => {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWE3ZmIyMWYxMTIwOTcyMzIwZTMzODI5YmMxMmJhZiIsInN1YiI6IjY0ZTczMzFmMDZmOTg0MDBlYjVmMWJlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gRRsWsLuNHtuPWTo_eeQH7jMC8lbW-P9AJzb3p9QHbY'
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
        const videoTV = async ({movieID}) => {
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWE3ZmIyMWYxMTIwOTcyMzIwZTMzODI5YmMxMmJhZiIsInN1YiI6IjY0ZTczMzFmMDZmOTg0MDBlYjVmMWJlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gRRsWsLuNHtuPWTo_eeQH7jMC8lbW-P9AJzb3p9QHbY'
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

          

  

  export  { fetchTopFilms, cercaMovies, fetchTopSerie, cercaSerie, cercaID, cercaIDTV, video, videoTV };
  