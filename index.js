(function () {

  // 宣告API組合變數
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const dataPanel = document.querySelector('#data-panel')
  const leftNav = document.getElementById('left-nav')
  const movieGenres =
  {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }
  const movieList = Object.values(movieGenres)

  // ------------------------- API ---------------------------
  //抓取電影API results，並加入data陣列
  axios.get(INDEX_URL)
    .then((response) => {
      data.push(...response.data.results)
      displayDataPicView(data)
    })
    .catch((error) => {
      console.log(error)
    })

  // -------------------- EventListener ----------------------

  leftNav.addEventListener('click', (event) => {
    const filterResults = []
    // 讀取點擊到的字串
    let movieText = event.target.innerText
    console.log(movieText)

    // 找到對應key
    let movieGenreKey = keyValue(movieGenres, movieText)
    console.log(movieGenreKey)

    // 搜尋配對有相同key的電影
    for (let i = 0; i < data.length; i++) {
      if (data[i].genres.indexOf(+movieGenreKey) > -1) {
        filterResults.push(data[i])
      }
    }

    // 搜尋配對沒有相同key的電影，顯示無類別
    if (filterResults.length === 0) {
      alert('Oops! No movie match')
      return
    }

    // 顯示電影內容
    displayDataPicView(filterResults)

  })

  // -------------------- functions----------------------


  // key value database of movieGenres
  function keyValue(item, value) {
    for (let i in item) {
      return Object.keys(item).find(key => item[key] === value);
    }
  }

  //display dataPicView
  function displayDataPicView(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
      <div class = "col-sm-3">
      <div class = "card mb-2">
        <img class ="card-img-top" src= "${POSTER_URL}${item.image}" alt="Card image cap">
        <div class = "card-body movie-item-body">
        <h6 class= "card-title">${item.title}</h6>
         <!-- import movie genres -->
            ${showGenretype(item.genres)}
        </div>   
      </div>
      </div>
      `
    })
    dataPanel.innerHTML = htmlContent
  }


  // display genres in each movie 
  function showGenretype(data) {
    let htmlContent = ''
    for (let i = 0; i < data.length; i++) {
      htmlContent += `
      <span class="badge badge-info">${movieGenres[data[i]]}</span>
    `
    }
    return htmlContent
  }

  movieListNav(movieList)
  // display movie list in left-nav
  function movieListNav(data) {
    // for迴圈新增電影類別清單
    let navHTML = ''
    for (i = 0; i < data.length; i++) {
      navHTML += `
        <a class="nav-link" data-toggle="pill" href = "#" role = "tab" aria - selected="true" id > ${data[i]}</a> `
    }
    leftNav.innerHTML = navHTML
  }


})()