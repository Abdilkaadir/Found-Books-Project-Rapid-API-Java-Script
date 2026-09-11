const search_form = document.querySelector("#search-form");
const search_input = document.querySelector("#search-input");
const book_list = document.querySelector("#book-list");

search_form.addEventListener("submit", async function(e) {   
  e.preventDefault();

  const url = `https://open-library2.p.rapidapi.com/search_title/${search_input.value}`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'dcb38e32a7msh7e7f4e312c9159ep13c211jsnaabfca7049a3',
      'x-rapidapi-host': 'open-library2.p.rapidapi.com',
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    renderBooks(result.books);  // ✅ call renderBooks here
  } catch (error) {
    console.error(error);
  }

});  


function renderBooks(books) {
  book_list.innerHTML = ""; // clear previous results

  books.forEach(book => {
    const hasImage = book.image && book.image !== "Image not available";

    const card = `
      <div class="book-card">
        ${hasImage 
          ? `<img src="${book.image}" alt="${book.title}" />` 
          : `<div class="no-cover">📖</div>`
        }
        <div class="book-info">
          <h3>${book.title}</h3>
          <p>${book.author}</p>
          <a href="${book.url}" target="_blank">View Book →</a>
        </div>
      </div>
    `;

    book_list.innerHTML += card;
  });
}