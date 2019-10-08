//write a function to retrive a blob of json
//make an ajax request! Use the 'fetch' function.
//https://rallycoding.herokuapp.com/api/music_albums

// function fetchAlbums ( ) {
//   fetch('https://rallycoding.herokuapp.com/api/music_albums')
//     .then( res => res.json())
//     .then(json => console.log(json));
// }

//tell the javascript interpreter that this funstion has some async code
async function fetchAlbums ( ) {
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
  const json = await res.json()
  console.log(json);
}

//tell the javascript interpreter that this funstion has some async code
const fetchAlbums = async () => {
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
  const json = await res.json();
  console.log(json);
}



fetchAlbums();
