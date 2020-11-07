// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

axios
  .get("https://lambda-times-api.herokuapp.com/articles")
  .then((e) => {
    const articles = e.data.articles;
    for (const key in articles) {
      if (articles.hasOwnProperty(key)) {
        articles[key].forEach((e) => {
          const card = Cards(e);
          document.querySelector(".cards-container").appendChild(card);
        });
      }
    }
  })
  .catch((e) => {
    console.warn(e);
  });

const Cards = (props) => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  const card_headlineDiv = document.createElement("div");
  card_headlineDiv.classList.add("headline");
  card_headlineDiv.textContent = props.headline;

  const card_authorDiv = document.createElement("div");
  card_authorDiv.classList.add("author");

  const author_imgContainer = document.createElement("div");
  author_imgContainer.classList.add("img-container");

  const img = document.createElement("img");
  img.src = props.authorPhoto;

  const span = document.createElement("span");
  span.textContent = props.authorName;

  author_imgContainer.appendChild(img);
  card_authorDiv.appendChild(author_imgContainer);
  card_authorDiv.appendChild(span);

  cardDiv.appendChild(card_headlineDiv);
  cardDiv.appendChild(card_authorDiv);

  cardDiv.addEventListener("click", (e) => console.log(props.headline));
  return cardDiv;
};
