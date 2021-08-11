monStockage = sessionStorage;


async function add_best_movie(url_best_movie) {
  fetch(url_best_movie)
  .then(function(res) {
    if(res.ok){
      return res.json();
    }
  })
  .then(function(value) {
    let section_the_movie_div_title = document.querySelector("#the_movie .movie h3");
    let section_the_movie_div_resume = document.querySelector("#the_movie .movie h4");
    let section_the_movie_div_button_movie = document.querySelector("#the_movie .movie button");
    let section_the_movie_div_note = document.querySelector("#the_movie p.note");
    let section_the_movie_img = document.querySelector("#the_movie div.img_movie p");
    let url_image = value.image_url;
    section_the_movie_img.innerHTML = "<img src=" + url_image + " alt="+ String(value.title) + " title="+String(value.title) + "/> <br/> "
    section_the_movie_div_title.innerHTML = value.title;
    section_the_movie_div_button_movie.classList.remove("hidden");
    section_the_movie_div_resume.innerHTML = "Résume du film : "
    section_the_movie_div_note.innerHTML = "Note du film : " + value.imdb_score
    let section_the_movie_div_description_p = document.querySelector("#the_movie p.long_description");
    section_the_movie_div_description_p.innerHTML = "<p> "+ String(value.long_description) + "</p>"; 
  })
}

async function extract_8_best_movies() {
  fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
  .then(function(res) {if(res.ok){return res.json()}})
  .then(function(value) {
    monStockage.setItem("1_best_movies", value.results[0].url+"####"+value.results[0].imdb_score+"####"+value.results[0].votes);
    monStockage.setItem("2_best_movies", value.results[1].url+"####"+value.results[1].imdb_score+"####"+value.results[1].votes);
    monStockage.setItem("3_best_movies", value.results[2].url+"####"+value.results[2].imdb_score+"####"+value.results[2].votes);
    monStockage.setItem("4_best_movies", value.results[3].url+"####"+value.results[3].imdb_score+"####"+value.results[3].votes);
    monStockage.setItem("5_best_movies", value.results[4].url+"####"+value.results[4].imdb_score+"####"+value.results[4].votes);
    fetch(value.next)
    .then(function(res) {if(res.ok){return res.json()}})
    .then(function(value) {
      monStockage.setItem("6_best_movies", value.results[0].url+"####"+value.results[0].imdb_score+"####"+value.results[0].votes);
      monStockage.setItem("7_best_movies", value.results[1].url+"####"+value.results[1].imdb_score+"####"+value.results[1].votes);
      monStockage.setItem("8_best_movies", value.results[2].url+"####"+value.results[2].imdb_score+"####"+value.results[2].votes);
  });
  });
};

async function add_movie_into_carroussel(carroussel, url_movie){
  fetch(String(url_movie))
  .then(function(res) {
    if (res.ok) {return res.json();}})
  .then(function(value) {
    let movie = document.createElement("div");
    let movie_img = document.createElement("div");
    movie_img.innerHTML = "<img src="+value.image_url+"/>";
    //let movie_title = document.createElement("h3");
    //movie_title.innerHTML = value.title;
    //movie.appendChild(movie_title);
    movie.appendChild(movie_img);
    carroussel.appendChild(movie);
  })
};

async function remove_movies_into_carroussel(carroussel) {
  let movie1 = document.querySelector("section#best_movies .carroussel div");
  carroussel.removeChild(movie1)
  let movie2 = document.querySelector("section#best_movies .carroussel div");
  carroussel.removeChild(movie2)
  let movie3 = document.querySelector("section#best_movies .carroussel div");
  carroussel.removeChild(movie3)
  let movie4 = document.querySelector("section#best_movies .carroussel div");
  carroussel.removeChild(movie4)
};

async function add_best__other_movies(best_movies_url, i) {
  let carroussel_best_movies = document.querySelector("section#best_movies .carroussel");
  carroussel_best_movies.classList.add("row");
  add_movie_into_carroussel(carroussel_best_movies, best_movies_url[i])
  add_movie_into_carroussel(carroussel_best_movies, best_movies_url[i+1])
  add_movie_into_carroussel(carroussel_best_movies, best_movies_url[i+2])
  add_movie_into_carroussel(carroussel_best_movies, best_movies_url[i+3]) 
};

async function search_best_movie_score_vote (best_movies_url) {
  let movies_score = new Map();
  let movies_vote = new Map();
  movies_score.set(best_movies_url[0].split("####")[0], best_movies_url[0].split("####")[1]);
  movies_vote.set(best_movies_url[0].split("####")[0], best_movies_url[0].split("####")[2]);
  movies_score.set(best_movies_url[1].split("####")[0], best_movies_url[1].split("####")[1]);
  movies_vote.set(best_movies_url[1].split("####")[0], best_movies_url[1].split("####")[2]);
  movies_score.set(best_movies_url[2].split("####")[0], best_movies_url[2].split("####")[1]);
  movies_vote.set(best_movies_url[2].split("####")[0], best_movies_url[2].split("####")[2]);
  movies_score.set(best_movies_url[3].split("####")[0], best_movies_url[3].split("####")[1]);
  movies_vote.set(best_movies_url[3].split("####")[0], best_movies_url[3].split("####")[2]);
  movies_score.set(best_movies_url[4].split("####")[0], best_movies_url[4].split("####")[1]);
  movies_vote.set(best_movies_url[4].split("####")[0], best_movies_url[4].split("####")[2]);
  movies_score.set(best_movies_url[5].split("####")[0], best_movies_url[5].split("####")[1]);
  movies_vote.set(best_movies_url[5].split("####")[0], best_movies_url[5].split("####")[2]);
  movies_score.set(best_movies_url[6].split("####")[0], best_movies_url[6].split("####")[1]);
  movies_vote.set(best_movies_url[6].split("####")[0],best_movies_url[6].split("####")[2]);
  movies_score.set(best_movies_url[7].split("####")[0],best_movies_url[7].split("####")[1]);
  movies_vote.set(best_movies_url[7].split("####")[0],best_movies_url[7].split("####")[2]);
    
  let liste_score = []
  for (let [key, value] of movies_score) {
    liste_score.push(value);
  }
  liste_score.sort()
  let best_score = liste_score[liste_score.length-1]
  let liste_best_movies = []
  for (let [key, value] of movies_score) {
    if (value == best_score) {
      liste_best_movies.push(key)}
  }
  let liste_votes_movies = []
  for (let movie of liste_best_movies) {
    for (let [key, value] of movies_vote) {
      if (movie == key) {
        liste_votes_movies.push(value)
      }
    }
  }
  liste_votes_movies.sort()
  let url_best_movie
  let best_vote = liste_votes_movies[liste_votes_movies.length-1]
  for (let [key, value] of movies_vote) {
    if (value == best_vote) {
      url_best_movie = key
    }
  }
  return url_best_movie
};
async function remove_the_best_movie_from_list (best_movies_url, url_best_movie) {
  i=0
  for (let element of best_movies_url) {
    if ((element.split("####")[0]) == url_best_movie) {
      
      best_movies_url.splice(i, 1)
    } else {
      i +=1
    }
  }
  return best_movies_url
};
async function carroussel_7_elements() {
  extract_7_best_movies()
  i=0
  let carroussel_best_movies = document.querySelector("section#best_movies .carroussel");


  add_best_movie(best_movies_url, i)
  let left_carroussel_best_movies = document.querySelector("section#best_movies svg.btn_carroussel_left")
  left_carroussel_best_movies.addEventListener("click", function(event){
    i-1
    remove_movies_into_carroussel(carroussel_best_movies)
    add_best_movie(best_movies_url, i)
  } )
  let right_carroussel_best_movies = document.querySelector("section#best_movies svg.btn_carroussel_right")
  right_carroussel_best_movies.addEventListener("click", function(event){
    i+1
    remove_movies_into_carroussel(carroussel_best_movies)
    add_best_movie(best_movies_url, i)
  } )
};

function addActionModalMovie (divMainModal, divModal, btnModal, btnExit, url_movie) {
  fetch(url_movie)
  .then(function(res) {
    if(res.ok){
      return res.json();
    }
  })
  .then(function(value) {
    let div_modal_left = document.createElement("div");
    let div_modal_right= document.createElement("div");
    let title_best_movie = document.querySelector("#modal_the_movie .modal-content h2");
    title_best_movie.innerHTML = value.title;
    divModal.appendChild(div_modal_left);
    let actors_movie = ""
    for (let actor of value.actors) {actors_movie += actor + ", "};
    let info_left = "<ul><li>Genres : " + value.genres +
     "</li>" + "<li>Date published : " + value.date_published + "</li>"
    + "<li>Rated : " + value.rated + "</li>"
    + "<li>Score Imdb : " + value.imdb + "</li>"
    + "<li>Directors : " + value.directors + "</li>"
    + "<li>Actors : " + actors_movie +"</li>"
    + "<li>Duration : " + value.duration +"</li>"
    + "<li>Countries : " + value.countries +"</li>"
    + "<li>Reviews from critics : " + value.reviews_from_critics +"</li>"
    + "<li>Description : " + value.long_description + "</li>"
    +"</ul>";
    div_modal_left.innerHTML = info_left;
    divModal.appendChild(div_modal_right);
    img_movie = document.createElement('div');
    img_movie.innerHTML = "<img src="+value.image_url+"/>";
    div_modal_right.appendChild(img_movie);
    
  });
  btnModal.addEventListener('click', function(event) {
    divModal.style.display = "block"
  });
  btnExit.addEventListener('click', function(event) {
    divModal.style.display = "none"
  });
  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener('click', function(event) {
    if (event.target == divMainModal) {
      divModal.style.display = "none";}
  });

};
//carroussel_7_elements()

async function manageBestMovie () {
  await extract_8_best_movies()
  let best_movies_url = [monStockage.getItem("1_best_movies"),
  monStockage.getItem("2_best_movies"),
  monStockage.getItem("3_best_movies"),
  monStockage.getItem("4_best_movies"),
  monStockage.getItem("5_best_movies"),
  monStockage.getItem("6_best_movies"),
  monStockage.getItem("7_best_movies"),
  monStockage.getItem("8_best_movies")];
  let url_best_movie = await search_best_movie_score_vote(best_movies_url);
  add_best_movie(url_best_movie);
  best_movies_url = await remove_the_best_movie_from_list(best_movies_url, url_best_movie);
  let divMainModalBestMovie = document.querySelector("#modal_the_movie .modal-content");
  console.log(divMainModalBestMovie)
  let div_modal_best_movie = document.querySelector("#modal_the_movie .include-modal");
  let btn_modal_best_movie = document.querySelector("#the_movie .movie button");
  let btn_close_modal_best_movie = document.querySelector("#the_movie .btn_close")
  addActionModalMovie(divMainModalBestMovie, div_modal_best_movie,btn_modal_best_movie,btn_close_modal_best_movie, url_best_movie);
  return url_best_movie,best_movies_url
}

async function main () {
  best_movies_url = await manageBestMovie();
  i=0
  add_best__other_movies(best_movies_url, i);
}

main()