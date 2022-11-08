


/* url of song api --- https versions hopefully a little later this semester 	*/
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

 

/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/
addEventListener("DOMContentLoaded", ()=>{
   if(localStorage.getItem("songList") === null){
      console.log("hitting API");
   fetch(api)
      .then((res) => res.json())
      .then((data) => {
         localStorage.setItem("songList",JSON.stringify(data));
         mainLogic();
      })
   }else {
      console.log("did not hit API")
      mainLogic();
   }
function mainLogic(){
   const searchButton = document.querySelector("#search");
   const search = document.querySelector("#search-criteria");
   const results = document.querySelector("section");
   const songs = JSON.parse(localStorage.getItem("songList"));
   const ul = document.querySelector("section ul");
   renderResults(songs);
   function renderResults(songs){
      ul.innerHTML = `<li><label id="title"><div id="first-cell" class="arrow"></div>Title</label><label id="artist"><div class="arrow remaining-cells"></div>Artist</label><label id="year"><div class="arrow remaining-cells"></div>Year</label><label id="genre"><div class="arrow remaining-cells"></div>Genre</label><label id="popularity"><div class="arrow remaining-cells"></div>Popularity</label></li>`
      for(let song of songs) {
         const li = document.createElement("li");
         const title = document.createElement("div");
         const artist = document.createElement("div");
         const year = document.createElement("div");
         const genre = document.createElement("div");
         const popularity = document.createElement("div");
         const flexContainer = document.createElement("div");
         const button = document.createElement("button");
         title.textContent = song.title;
         li.appendChild(title);
         artist.textContent = song.artist.name;
         li.appendChild(artist);
         year.textContent = song.year;
         li.appendChild(year);
         genre.textContent = song.genre.name;
         li.appendChild(genre);
         popularity.textContent = song.details.popularity;
         li.appendChild(popularity);
         flexContainer.classList.add("button-container");
         button.textContent = "Add";
         flexContainer.appendChild(button);
         li.appendChild(flexContainer);
         li.classList.add("result-item");
         ul.appendChild(li);
      }
   }
   search.addEventListener("click", (e)=>{
      if(e.target.type == "radio"){
         const parent = e.target.parentElement;
         disableAll();
         enable("#" + parent.id);
      }
   });
   searchButton.addEventListener("click", ()=>{
      filterInputs = document.querySelector(".active hook");
      if(filterInput.value.length > 0) {
         songs.filter()//pick up here!!!!
      }
   });
   results.addEventListener("click",(e)=>{
      if(e.target.classList.contains("arrow")){
         const parent = e.target.parentElement;
         filterKey = parent.id;
         console.log(filterKey);
         if(filterKey == "title"){
            songs.sort(titleComparison);
         } else if (filterKey == "artist"){
            songs.sort(artistComparison)
         } else if (filterKey == "year") {
            songs.sort(yearComparison)
         } else if (filterKey == "genre") {
            songs.sort(genreComparison)
         } else if (filterKey == "popularity") {
            songs.sort(popularityComparison)
         }
         renderResults(songs);
      }
   })
   function titleComparison(a,b) {
      if(a.title > b.title ){
         return 1;
      } else if (a.title < b.title ) {
         return -1;
      } else {
         return 0;
      }
   }
   function artistComparison(a,b){
      if(a.artist.name > b.artist.name){
         return 1;
      } else if (a.artist.name < b.artist.name){
         return -1;
      } else {
         return 0;
      }
   }  
   function yearComparison(a,b){
      if(a.year > b.year){
         return -1;
      } else if (a.year < b.year) {
         return 1;
      } else {
         return 0;
      }
   }
   function genreComparison(a,b){
      if(a.genre.name > b.genre.name){
         return 1;
      } else if (a.genre.name < b.genre.name){
         return -1;
      } else {
         return 0;
      }
   }
   function popularityComparison(a,b){
      if(a.details.popularity > b.details.popularity){
         return -1;
      } else if (a.details.popularity < b.details.popularity) {
         return 1;
      } else {
         return 0;
      }
   }
   function disableAll() {
      const inputs1 = document.querySelectorAll(".search-label input[type=text]");
      const inputs2 = document.querySelectorAll(".search-label input[type=number]");
      const inputs = [...inputs1].concat([...inputs2]);
      for(let input of inputs){
         input.disabled = true;
      }
      const labels = document.querySelectorAll(".search-label");
      for(let label of labels) {
         label.classList.add("inactive");
         label.classList.remove("active");
      }
   }
   function enable(selector) {
      const inputs = document.querySelectorAll(selector + " .hook");
      for(let input of inputs) {
         input.disabled = false;
      }
      const label = document.querySelector(selector);
      label.classList.add("active");
      label.classList.remove("inactive");
   }
   }
});