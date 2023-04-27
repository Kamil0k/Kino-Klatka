import './FilmsList.css'

import React, { useEffect, useState } from 'react';
import { database } from '../../firebase'
import FilmItem from './FilmItem';

const FilmsList = () => {
    const [films, setFilms] = useState([]);
  
    useEffect(() => {
      const fetchFilms = async () => {
        try {
          const snapshot = await database.ref('films').once('value');
          const filmsData = snapshot.val();
          
          if (filmsData) {
            const filmsArray = Object.keys(filmsData).map((key) => ({
              id: key,
              ...filmsData[key],
            }));
            setFilms(filmsArray);
          }
        } catch (error) {
          console.error('Błąd podczas pobierania filmów:', error);
        }
      };
  
      fetchFilms();
    }, []);
  
    return (
      <div className='films__list'>
        {films.map((film) => (
          <FilmItem key={film.id} film={film}/>
        ))}
      </div>
    );
  };
  
  export default FilmsList;
