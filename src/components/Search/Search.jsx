import './Search.css'
function Search(){
    return(
        <div className='search-wrapper'>
        <input
        id="pokemon-name-search" 
        type="text"
        placeholder="search pokemon....."/>
        </div>
    );
}
export default Search;