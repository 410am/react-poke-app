import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PokeCard from '../../components/PokeCard';
import AutoComplete from '../../components/AutoComplete';

function MainPage() {

  // 모든 포켓몬 데이터를 가지고 있는 State
  const [allPokemons, setAllpokemons] = useState([]);

  // 실제로 리스트로 보여주는 포켓몬 데이터를 가지고 있는 State
  const [displayedPokemons, setDisplayedPokemons] = useState([]);

  // 한번에 보여주는 포켓몬 수
  const limitNum = 20;
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`;

  const [searchTerm, setSearchTerm] = useState("");
  
  // const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    fetchPokeData();
  }, [])

  // useEffect(() => {
  //   handleSearchInput(debouncedSearchTerm)
  // },[debouncedSearchTerm])

  const filterDisplayedPokemonData = (allPokemonsData, displayedPokemons = []) => {
    const limit = displayedPokemons.length + limitNum;
    //  모든 포켓몬 데이터에서 limitNum 만큼 더 가져오기
    const array = allPokemonsData.filter((pokemon, index) => index + 1 <= limit);
    return array;
  }
  
  const fetchPokeData = async () => {
    try {
      // 1008 포켓몬 데이터 받아오기
      const response = await axios.get(url);
      // 모든 포켓몬 데이터 기억하기
      setAllpokemons(response.data.results);
      // 실제로 화면에 보여줄 포켓몬 리스트 기억하는 state
      setDisplayedPokemons(filterDisplayedPokemonData(response.data.results));
    } catch (error) {
      console.error(error);
    }
  }

  // // 검색창 입력값을 받아 검색결과를 반환해 주는 함수
  // const handleSearchInput = async (searchTerm) => {
  //   if(searchTerm.length > 0) {
  //     try {
  //       const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
  //       const pokemonData = {
  //         url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}`,
  //         name: searchTerm
  //       }
  //       setDisplayedPokemons([pokemonData])
  //     } catch (error) {
  //       setDisplayedPokemons([]);
  //       console.error(error);
  //     }
  //   } else {
  //     fetchPokeData(true);
  //   }
  // }


  return (
    <article className='pt-6'>
      <header className='flex flex-col gap-2 w-full px-4 z-50'>
        <AutoComplete 
          allPokemons={allPokemons}
          setDisplayedPokemons={setDisplayedPokemons}
        />
      </header>
      <section className='pt-6 flex flex-col justify-content items-center overflow-auto z-0'>
        <div className='flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl'>
          {displayedPokemons.length > 0 ?
          (
            displayedPokemons.map(({ url, name }, index) => {
              return(
                <PokeCard key={url} url={url} name={name} />
              )
            })
          ) :
          (
            <h2 className='font-medium text-lg text-slate-900 mb-1'>
              포켓몬이 없습니다
            </h2>
          )}
        </div>
      </section>
      <div className='text-center'>
        {(allPokemons.length > displayedPokemons.length) && (displayedPokemons.length !==1) && (
        <button onClick={() => setDisplayedPokemons(filterDisplayedPokemonData(allPokemons, displayedPokemons))} 
        className='bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white'>
              더보기
        </button>
        )
      }
      </div>
    </article>
  )
}


export default MainPage