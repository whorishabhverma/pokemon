import { useEffect,useState} from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../../Pokemon/Pokemon";
function PokemonList(){
    
    const [pokemonList,setPokemonList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    const pokedex_url = 'https://pokeapi.co/api/v2/pokemon';

    async function downloadPokemons(){

        const response = await axios.get('pokedex_url');//this downloads 20 pokemons
        
        const pokemonResults = response.data.results;//we get the array of pokemons from results
        //iterating over the array of pokemons ans using their url to create an array of propmises that will download those 20 
        const pokemonResultPromise = pokemonResults.map((pokemon)=>axios.get(pokemon.url));
        
        //passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise);//detailed data of 20 pokemons
        console.log(pokemonData);

        //iterate on each pokemons data
        const pokeListResult = pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data;
            return {
                id:pokemon.id,
                name:pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default:pokemon.sprites,
                 types:pokemon.types
                } 
        });
    console.log(pokeListResult);
    setPokemonList(pokeListResult);
    setIsLoading(false);
    }
    //callback and dependency array expect krta hai
    useEffect(()=>{
        downloadPokemons();
    },[]);
    

    return (
    <div className="pokemon-list-wrapper">
         POKEMON LIST
        {(isLoading) ? 'Loading...' :
        pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id}/>) }
    </div>
    
    )
}
export default PokemonList;