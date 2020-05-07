import React, { useState } from 'react';
import './styles.scss';

export default function App() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);

  const onChange = (e) => {
    const text = e.target.value;

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${text}`)
      .then((res) => res.json())
      .then((data) => {
        const books = data.items;
        const reducedBooks =
          books &&
          books.map(
            ({
              id,
              volumeInfo: {
                title,
                authors,
                publishedDate,
                imageLinks,
                infoLink,
              },
            }) => ({
              id,
              title,
              authors,
              publishedDate,
              imageURL: imageLinks && imageLinks.thumbnail,
              infoLink,
            })
          );

        setBooks(reducedBooks || []);
      });

    setSearch(e.target.value);
  };

  return (
    <div id="App">
      <h1>Book Search</h1>
      <input
        id="book-search"
        type="text"
        placeholder={'Search...'}
        value={search}
        onChange={onChange}
      />
      {books.length > 0 && (
        <ul id="book-list">
          {books.map(
            ({ id, title, authors, publishedDate, imageURL, infoLink }) => (
              <li key={id} className="book">
                <a href={infoLink} target="_blank">
                  <img src={imageURL} alt={title} />
                </a>
                <div className="book-info">
                  <h2>{title}</h2>
                  {authors && <p>By {authors.join(', ')}</p>}
                  <p>Published: {publishedDate}</p>
                </div>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
