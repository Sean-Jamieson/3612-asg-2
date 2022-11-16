


/* url of song api --- https versions hopefully a little later this semester 	*/
const api = 'https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';


 

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
   const confirmation = document.querySelector("#confirmation");
   const confirmationText = document.querySelector("#confirmation-text");
   const duplicate = document.querySelector("#duplicate");
   const blocker = document.querySelector("#blocker");
   const duplicateText = document.querySelector("#duplicate-text");
   const listView = document.querySelector("#list-view-main");
   const songview = document.querySelector("#song-view-main");
   const playlistView = document.querySelector("#playlist-view-main");
   const titleRadio = document.querySelector("#title-radio")
   const playlistRemove = document.querySelector("#playlist-remove")
   const searchCriteria = document.querySelector("#search-criteria");
   const results = document.querySelector("#results");
   const infoList = document.querySelector("#info-list");
   const catagories = document.querySelector("#catagories");
   const playlistPanel = document.querySelector("#playlist-panel");
   const panelButton = document.querySelector("#panel-button");
   const panelField = document.querySelector("#panel-field");
   const panelSelect = document.querySelector("#panel-select")
   const resultList = document.querySelector("#result-list");
   const playlistTitle = document.querySelector("#playlist-title");
   const songCount = document.querySelector("#song-count");
   const avgPopularity = document.querySelector("#avg-popularity");
   const playlistListContent = document.querySelector("#playlist-list ul");
   const playlistContent = document.querySelector("#playlist-content");
   const creditPanel = document.querySelector("#credit-panel");
   let songs = JSON.parse(localStorage.getItem("songList"));
   let playlists = [];
   if(localStorage.getItem("playlists")){
      playlists = JSON.parse(localStorage.getItem("playlists"));
   }
   const labels = [
      'Danceability',
      'Energy',
      'Speechiness',
      'Acousticness',
      'Liveness',
      'Valence',
   ];
   const data = {
      labels: labels,
      datasets: [{
         label:  '',
         pointBackgroundColor: '#E0A370',
         pointBorderColor: 'pointBorderColor',
         backgroundColor: 'rgb(83, 184, 153)',
         borderColor: 'rgb(83, 184, 153)',
         fill: false,
         tension: .3,
         data: [0,0,0,0,0,0],
      }]
   };
   const config = {
      type: 'radar',
      data: data,
      options: {
         scales: {
            r: {
               pointLabels: {
                  color: '#E0A370',
                  font: {
                     size: 15,
                  }
               },
               angleLines: {
                  color: '#E0A370'
               },
               grid:{
                  color: '#E0A370',
               }
            },
          },
      },
   };
   const myChart = new Chart(
      document.getElementById('myChart'),
      config
   );
   Chart.defaults.color = '#E0A370';
   Chart.defaults.font.size = 15;
   Chart.defaults.font.family = 'Kelly Slab';

   renderResults(songs);
   function renderResults(songs){
      resultList.innerHTML="";
      for(let song of songs) {
         const li = document.createElement("li");
         const title = document.createElement("div");
         const artist = document.createElement("div");
         const year = document.createElement("div");
         const genre = document.createElement("div");
         const popularity = document.createElement("div");
         const flexContainer = document.createElement("div");
         const button = document.createElement("button");
         const hr = document.createElement("hr");
         title.textContent = song.title;
         title.classList.add("result-title");
         li.appendChild(title);
         artist.textContent = song.artist.name;
         li.appendChild(artist);
         year.textContent = song.year;
         year.classList.add("centered");
         li.appendChild(year);
         genre.textContent = song.genre.name;
         genre.classList.add("centered");
         li.appendChild(genre);
         popularity.textContent = song.details.popularity;
         popularity.classList.add("centered");
         li.appendChild(popularity);
         flexContainer.classList.add("add-container");
         button.textContent = "Add";
         button.classList.add("result-button");
         flexContainer.appendChild(button);
         li.appendChild(flexContainer);
         li.classList.add("result-item");
         li.dataset.id = song.song_id;
         resultList.appendChild(li);
         resultList.appendChild(hr);
      }
   };
   function populatePlaylists() {
      playlistListContent.innerHTML = "";
      if(playlists[0]!=null){
         for(let playlist of playlists) {
            const li = document.createElement("li");
            const hr = document.createElement("hr");
            li.textContent = playlist.name;
            li.classList.add("playlist-name");
            playlistListContent.appendChild(li);
            playlistListContent.appendChild(hr);
         }
      }
   };
   function populatePlaylist(index) {
      let count = 0;
      let popularitySum = 0
      console.log(playlists);
      playlistContent.innerHTML = "";
      songCount.textContent = "";
      avgPopularity.textContent = "";
      playlistTitle.textContent = "";
      if(playlists[0]!=null){
         playlistContent.dataset.index = index;
         playlistTitle.textContent = playlists[index].name
         for(let songId of playlists[index].songs){
            const match = songs.find(song => song.song_id == songId);
            const li = document.createElement("li");
            const title = document.createElement("div");
            const artist = document.createElement("div");
            const year = document.createElement("div");
            const genre = document.createElement("div");
            const popularity = document.createElement("div");
            const flexContainer = document.createElement("div");
            const button = document.createElement("button");
            const hr = document.createElement("hr");
            title.textContent = match.title;
            title.classList.add("playlist-title")
            li.appendChild(title);
            artist.textContent = match.artist.name;
            li.appendChild(artist);
            year.textContent = match.year
            year.classList.add("centered");
            li.appendChild(year);
            genre.textContent = match.genre.name;
            genre.classList.add("centered");
            li.appendChild(genre);
            popularity.textContent = match.details.popularity;
            popularity.classList.add("centered");
            li.appendChild(popularity);
            flexContainer.classList.add("remove-container");
            button.textContent = "remove";
            button.classList.add("playlist-button");
            flexContainer.appendChild(button);
            li.appendChild(flexContainer);
            li.classList.add("playlist-item");
            li.dataset.id = match.song_id;
            playlistContent.parentElement.dataset.index = index;
            playlistContent.appendChild(li);
            playlistContent.appendChild(hr);
            popularitySum = popularitySum + match.details.popularity;
            count++;
         }
         if(count == 0) {
            avgPopularity.textContent = "";
            playlistTitle.textContent = "";
         } else {
            songCount.textContent = `${count}`;
            let average = popularitySum/count;
            avgPopularity.textContent = `${average.toFixed(1)}`;
         }

      }
   };
   document.querySelector("#credits").addEventListener("click", (e) => {
      creditPanel.classList.remove("hidden");
      setTimeout(() => {
         creditPanel.classList.add("move-in");
      },200);
      creditPanel.classList.remove("move-in");
      blocker.classList.remove("hidden");
   });
   document.querySelector("#exit-credits").addEventListener("click", (e) => {
      creditPanel.classList.add("move-out");
      setTimeout(() => {
         creditPanel.classList.add("hidden");
         blocker.classList.add("hidden");
         creditPanel.classList.remove("move-out");
      }, 200);
   });
   searchCriteria.addEventListener("keypress", (e) =>{
      if(e.key === "Enter") {
         document.querySelector("#search-button").click();
      }
   });
   searchCriteria.addEventListener("click", (e)=>{
      if(e.target.type == "radio"){
         const parent = e.target.parentElement;
         disableAll();
         enable("#" + parent.id);
      }
   });
   document.querySelector("#search-button").addEventListener("click", ()=>{
      const filterInputs = document.querySelectorAll(".active .hook");
      songs = JSON.parse(localStorage.getItem("songList"))
      if(filterInputs[0].value.length > 0 && filterInputs[0].parentElement.id =="title") {
         songs = songs.filter(song => song.title.toString().startsWith(filterInputs[0].value));;
         renderResults(songs);
      } else if (filterInputs[0].value.length > 0 && filterInputs[0].parentElement.id =="artist"){
         songs = songs.filter(song => song.artist.name.toString().startsWith(filterInputs[0].value));
         renderResults(songs);
      } else if (filterInputs[0].value.length > 0 && filterInputs[0].parentElement.id =="genre"){
         songs = songs.filter(song => song.genre.name.toString().startsWith(filterInputs[0].value));
         renderResults(songs);
      } else if (filterInputs[0].value.length > 0 && filterInputs[1].value.length > 0  && filterInputs[0].parentElement.parentElement.id =="year"){  
         songs = songs.filter(song => song.year < filterInputs[0].value && song.year > filterInputs[1].value);
         renderResults(songs);
      } else if (filterInputs[0].value.length > 0 &&filterInputs[0].parentElement.parentElement.id =="year") {
         songs = songs.filter(song => song.year < filterInputs[0].value);
         renderResults(songs);
      } else if (filterInputs[1].value.length > 0  && filterInputs[0].parentElement.parentElement.id =="year") {
         songs = songs.filter(song => song.year > filterInputs[1].value);
         renderResults(songs);
      } else if (filterInputs[0].value.length > 0 && filterInputs[1].value.length > 0  && filterInputs[0].parentElement.parentElement.id =="popularity"){
         songs = songs.filter(song => song.details.popularity < filterInputs[0].value && song.details.popularity > filterInputs[1].value);
         renderResults(songs);
      } else if (filterInputs[0].value.length > 0 && filterInputs[0].parentElement.parentElement.id =="popularity"){
         songs = songs.filter(song => song.details.popularity < filterInputs[0].value );
         renderResults(songs);
      } else if (filterInputs[1].value.length > 0  && filterInputs[0].parentElement.parentElement.id =="popularity"){
         songs = songs.filter(song => song.details.popularity > filterInputs[1].value);
         renderResults(songs);
      }
   });
   document.querySelector("#clear").addEventListener("click", () => {
      songs = JSON.parse(localStorage.getItem("songList"))
      renderResults(songs);
      titleRadio.checked = "checked";
      disableAll();
      enable("#title");
   });
   document.addEventListener("click", (e)=>{
      if(!playlistPanel.contains(e.target) && !e.target.classList.contains("result-button")){
         playlistPanel.classList.add("hidden");
      }
   });
   //playlist panel pop-up event and title navigation to song page
   resultList.addEventListener("click", (e) =>{
      if(e.target.classList.contains("result-button")){
         let x = e.clientX;
         let y = e.clientY;
         panelField.value = "";
         playlistPanel.style.left = `${x-200}px`;
         playlistPanel.style.top = `${y}px`;
         playlistPanel.classList.toggle("hidden");
         playlistPanel.dataset.id = e.target.parentElement.parentElement.dataset.id;
         panelSelect.innerHTML = "<option>-----</option>";
         for(let playlist of playlists){
            const option = document.createElement("option");
            option.textContent = playlist.name
            panelSelect.appendChild(option);
         }
      } else if (e.target.classList.contains("result-title")) {
         const id = e.target.parentElement.dataset.id;
         match = songs.find(song => song.song_id == id);
         listView.classList.toggle("hidden");
         songview.classList.toggle("hidden");
         populateInfo(match);
         populateCatagories(match);
         drawGraph(match);
      }
   });
   document.querySelector("#duplicate-cancel").addEventListener("click", (e)=>{
      duplicate.classList.add("hidden");
      blocker.classList.add("hidden");
   });
   panelSelect.addEventListener("change", (e) =>{
      const songName = songs.find(song => song.song_id == playlistPanel.dataset.id).title
      const playlistMatch = playlists.find(playlist => playlist.name == e.target.value);
      if(playlistMatch.songs.includes(playlistPanel.dataset.id)){
         duplicate.classList.remove("hidden");
         duplicate.classList.remove("move-out");
         blocker.classList.remove("hidden");
         setTimeout(() =>{
            duplicate.classList.add("move-in");
         },200);
         duplicateText.textContent = `"${songName}" is already in "${playlistMatch.name}". Are you Sure?`;
         document.querySelector("#duplicate-ok").addEventListener("click", (e)=>{
            playlistMatch.songs.push(playlistPanel.dataset.id);
            localStorage.setItem("playlists", JSON.stringify(playlists));
            setTimeout(() =>{
               duplicate.classList.add("move-out");
            },100);
            setTimeout(() =>{duplicate.classList.add("hidden")},200);
            duplicate.classList.remove("move-in");
            blocker.classList.add("hidden");
         });
      } else {
         playlistMatch.songs.push(playlistPanel.dataset.id);
         localStorage.setItem("playlists", JSON.stringify(playlists));
         confirmationText.textContent = `Adding "${songName}" to "${playlistMatch.name}.`
         confirmation.classList.remove("hidden");
         setTimeout(() =>{
            confirmation.classList.add("move-in");
         },200);
         confirmation.classList.remove("move-in");
         setTimeout(() =>{
            confirmation.classList.add("move-out");
         },2500);
         confirmation.classList.remove("move-out");
         setTimeout(() =>{confirmation.classList.add("hidden")},2600);
      }       
      playlistPanel.classList.add("hidden");
      
   });
   panelButton.addEventListener("click", (e) =>{
      if(panelField.value){
         if(!duplicatePlaylistCheck(panelField.value)){
            const songName = songs.find(song => song.song_id == playlistPanel.dataset.id).title
            playlists.push({
               name: panelField.value,
               songs: [playlistPanel.dataset.id],
            })
            localStorage.setItem("playlists", JSON.stringify(playlists));
            confirmationText.textContent = `Created "${panelField.value}" with "${songName}."`
            confirmation.classList.remove("hidden");
            setTimeout(() =>{
               confirmation.classList.add("move-in");
            },200);
            confirmation.classList.remove("move-in");
            setTimeout(() =>{
               confirmation.classList.add("move-out");
            },2500);
            confirmation.classList.remove("move-out");
            setTimeout(() =>{confirmation.classList.add("hidden")},2600);
         } else {
            confirmationText.textContent = `"${panelField.value}" Already exists.`
            confirmation.classList.remove("hidden");
            setTimeout(() =>{
               confirmation.classList.add("move-in");
            },200);
            confirmation.classList.remove("move-in");
            setTimeout(() =>{
               confirmation.classList.add("move-out");
            },2500);
            confirmation.classList.remove("move-out");
            setTimeout(() =>{confirmation.classList.add("hidden")},2600);
         }
         playlistPanel.classList.add("hidden");
      }
   });
   function duplicatePlaylistCheck(name){
      for(let i = 0; i < playlists.length; i++) {
         if(playlists[i].name == name){
            return true;
         }
      }
      return false;
   }
   playlistListContent.addEventListener("click", (e) =>{
      if(e.target.classList.contains("playlist-name")){
         for(let i = 0; i < playlists.length; i++) {
            if(playlists[i].name == e.target.textContent){
               populatePlaylist(i);
            }
         }
      }
   });
   playlistRemove.addEventListener("click", (e) =>{
      confirmation.textContent = `The playlist "${playlists[e.target.parentElement.parentElement.parentElement.dataset.index].name}" has been removed`;
      playlists.splice(e.target.parentElement.parentElement.parentElement.dataset.index, 1);
      confirmation.classList.remove("hidden");
      setTimeout(() =>{
         confirmation.classList.add("move-in");
      },200);
      confirmation.classList.remove("move-in");
      setTimeout(() =>{
         confirmation.classList.add("move-out");
      },2500);
      confirmation.classList.remove("move-out");
      setTimeout(() =>{confirmation.classList.add("hidden")},2600);
      localStorage.setItem("playlists", JSON.stringify(playlists));
      populatePlaylists();
      populatePlaylist(0);
   });
   playlistContent.addEventListener("click", (e) =>{
      if(e.target.classList.contains("playlist-button")){
         const index = playlists[e.target.parentElement.parentElement.parentElement.dataset.index].songs.indexOf(e.target.parentElement.parentElement.dataset.id);
         const id = playlists[e.target.parentElement.parentElement.parentElement.dataset.index].songs[index];
         const song = songs.find(song => song.song_id == id);
         confirmation.textContent = `Removed "${song.title}" from "${playlists[e.target.parentElement.parentElement.parentElement.dataset.index].name}"`
         playlists[e.target.parentElement.parentElement.parentElement.dataset.index].songs.splice(index,1);
         confirmation.classList.remove("hidden");
         setTimeout(() =>{
            confirmation.classList.add("move-in");
         },200);
         confirmation.classList.remove("move-in");
         setTimeout(() =>{
            confirmation.classList.add("move-out");
         },2500);
         confirmation.classList.remove("move-out");
         setTimeout(() =>{confirmation.classList.add("hidden")},2600);
         populatePlaylist(e.target.parentElement.parentElement.parentElement.dataset.index);
         localStorage.setItem("playlists", JSON.stringify(playlists));
      } else if (e.target.classList.contains("playlist-title")) {
         const id = e.target.parentElement.dataset.id;
         match = songs.find(song => song.song_id == id);
         playlistView.classList.toggle("hidden");
         songview.classList.toggle("hidden");
         populateInfo(match);
         populateCatagories(match);
         drawGraph(match);
      }
   });
   playlistPanel.addEventListener("keypress", (e) =>{
      if(e.key === "Enter") {
         panelButton.click();
      }
   });
   document.querySelector("#close-song").addEventListener("click", (e) =>{
      listView.classList.toggle("hidden");
      songview.classList.toggle("hidden");
      renderResults(songs);
   });
   document.querySelector("#close-playlist").addEventListener("click", (e) =>{
      playlistView.classList.toggle("hidden");
      listView.classList.toggle("hidden");
      renderResults(songs);
   });
   document.querySelector("#open-playlist").addEventListener("click", (e) =>{
      playlistView.classList.toggle("hidden");
      listView.classList.toggle("hidden");
      populatePlaylists();
      populatePlaylist(0);
   });
   function populateInfo(song){
      const title = document.createElement("div");
      const artist = document.createElement("div");
      const year = document.createElement("div");
      const genre = document.createElement("div");
      const duration = document.createElement("div");
      infoList.innerHTML = "";
      title.textContent = song.title;
      infoList.appendChild(title);
      artist.textContent = song.artist.name;
      infoList.appendChild(artist);
      genre.textContent = song.genre.name;
      infoList.appendChild(genre);
      year.textContent = song.year;
      infoList.appendChild(year);
      duration.textContent = `${Math.floor(song.details.duration/60)}:${song.details.duration%60}`;
      infoList.appendChild(duration);
   };
   function populateCatagories(song) {
      const bpm = document.createElement("div");
      const energy = document.createElement("div");
      const danceability = document.createElement("div");
      const liveness = document.createElement("div");
      const valence = document.createElement("div");
      const acousticness = document.createElement("div");
      const speechiness = document.createElement("div");
      const popularity = document.createElement("div");
      catagories.innerHTML = "";
      bpm.textContent = `Bpm: ${song.details.bpm}`;
      catagories.appendChild(bpm);
      energy.textContent = `Energy: ${song.analytics.energy}`;
      catagories.appendChild(energy);
      danceability.textContent = `Danceability: ${song.analytics.danceability}`;
      catagories.appendChild(danceability);
      liveness.textContent = `Liveness: ${song.analytics.liveness}`;
      catagories.appendChild(liveness);
      valence.textContent = `Valence: ${song.analytics.valence}`;
      catagories.appendChild(valence);
      acousticness.textContent= `Acousticness: ${song.analytics.acousticness}`;
      catagories.appendChild(acousticness);
      speechiness.textContent = `speechiness: ${song.analytics.speechiness}`;
      catagories.appendChild(speechiness);
      popularity.textContent = `Popularity: ${song.details.popularity}`;
      catagories.appendChild(popularity);
   }
   function drawGraph(song) {
      myChart.data.datasets[0].data = [song.analytics.danceability, song.analytics.energy, song.analytics.speechiness, song.analytics.acousticness, song.analytics.liveness, song.analytics.valence];
      myChart.data.datasets[0].label = `${song.title}`;
      myChart.update();
   }
   //filter by heading
   results.addEventListener("click",(e)=>{
      if(e.target.classList.contains("arrow")){
         const parent = e.target.parentElement;
         filterKey = parent.id;
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
   });
   function titleComparison(a,b) {
      if(a.title > b.title ){
         return 1;
      } else if (a.title < b.title ) {
         return -1;
      } else {
         return 0;
      }
   };
   function artistComparison(a,b){
      if(a.artist.name > b.artist.name){
         return 1;
      } else if (a.artist.name < b.artist.name){
         return -1;
      } else {
         return 0;
      }
   };
   function yearComparison(a,b){
      if(a.year > b.year){
         return -1;
      } else if (a.year < b.year) {
         return 1;
      } else {
         return 0;
      }
   };
   function genreComparison(a,b){
      if(a.genre.name > b.genre.name){
         return 1;
      } else if (a.genre.name < b.genre.name){
         return -1;
      } else {
         return 0;
      }
   };
   function popularityComparison(a,b){
      if(a.details.popularity > b.details.popularity){
         return -1;
      } else if (a.details.popularity < b.details.popularity) {
         return 1;
      } else {
         return 0;
      }
   };
   function disableAll() {
      const inputs1 = document.querySelectorAll(".search-label input[type=text]");
      const inputs2 = document.querySelectorAll(".search-label input[type=number]");
      const inputs = [...inputs1].concat([...inputs2]);
      for(let input of inputs){
         input.value = "";
         input.disabled = true;
      }
      const labels = document.querySelectorAll(".search-label");
      for(let label of labels) {
         label.classList.add("inactive");
         label.classList.remove("active");
      }
   };
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
