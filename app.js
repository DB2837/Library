class Book {
  #title;
  #author;
  #pages;
  #isRead;

  constructor(title, author, pages, isRead) {
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.#isRead = isRead;
  }

  getTitle() {
    return this.#title;
  }
  getAuthor() {
    return this.#author;
  }
  getPages() {
    return this.#pages;
  }
  getIsRead() {
    return this.#isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook);
    }
  }

  removeBook(title, author) {
    this.books = this.books.filter(
      (book) => book.getTitle() !== title || book.getAuthor() !== author
    );
  }

  isInLibrary(title, author) {
    return this.books.some(
      (book) => book.getTitle() === title && book.getAuthor() === author
    );
  }
}

const library = new Library();

const inputTitle = document.querySelector("[data-title]");
const booksContainer = document.querySelector(".books-container");
const libraryBtn = document.querySelector(".library-btn");
const addBookBtn = document.querySelector(".add-book-btn");
const overlay = document.querySelector(".overlay");
const addBookModal = document.querySelector(".add-book-modal");

addBookModal.addEventListener("click", (e) => {
  e.stopPropagation();
});

overlay.addEventListener("click", () => {
  overlay.classList.toggle("displayNone");
  addBookModal.classList.toggle("displayNone");
});

libraryBtn.addEventListener("click", () => {
  overlay.classList.remove("displayNone");
  addBookModal.classList.remove("displayNone");
  clearInputs();
});

addBookBtn.addEventListener("click", () => {
  if (!getInputBook()) return;
  addBookToLibrary(getInputBook());
  overlay.classList.toggle("displayNone");
  addBookModal.classList.toggle("displayNone");
});

function getInputBook() {
  const titleValue = document.querySelector("[data-title]").value;
  const authorValue = document.querySelector("[data-author]").value;
  const pagesValue = document.querySelector("[data-pages]").value;
  const isReadValue = document.querySelector("[data-isRead]").checked;

  if (titleValue == "" || authorValue == "" || pagesValue == "") return;

  const book = new Book(titleValue, authorValue, pagesValue, isReadValue);
  return book;
}

function clearInputs() {
  const titleValue = (document.querySelector("[data-title]").value = "");
  const authorValue = (document.querySelector("[data-author]").value = "");
  const pagesValue = (document.querySelector("[data-pages]").value = "");
  const isReadValue = (document.querySelector("[data-isRead]").checked = false);
}

function addBookToLibrary(book) {
  if (library.isInLibrary(book.getTitle(), book.getAuthor())) return;

  createCard(
    book.getTitle(),
    book.getAuthor(),
    book.getPages(),
    book.getIsRead()
  );

  library.addBook(book);
}

function createCard(title, author, pages, isRead) {
  const div = document.createElement("div");
  div.classList.add("book-card");
  const bookTitle = document.createElement("p");
  bookTitle.innerText = `"${title}"`;
  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = "by " + author;
  const bookPages = document.createElement("p");
  bookPages.innerText = pages + " pages";
  const bookIsRead = document.createElement("button");

  switch (isRead) {
    case true:
      bookIsRead.innerText = "Read";
      bookIsRead.classList.add("isRead");
      break;
    case false:
      bookIsRead.innerText = "Not Read";
      bookIsRead.classList.add("notRead");
      break;
  }

  const removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove";
  removeBtn.className.add = "remove-btn";

  div.appendChild(bookTitle);
  booksContainer.appendChild(div);
  div.appendChild(bookAuthor);
  booksContainer.appendChild(div);
  div.appendChild(bookPages);
  booksContainer.appendChild(div);
  div.appendChild(bookIsRead);
  booksContainer.appendChild(div);
  div.appendChild(removeBtn);
  booksContainer.appendChild(div);

  bookIsRead.addEventListener("click", () => {
    switch (isRead) {
      case true:
        isRead = false;
        bookIsRead.innerText = "Not Read";
        bookIsRead.classList.remove("isRead");
        bookIsRead.classList.toggle("notRead");
        break;
      case false:
        isRead = true;
        bookIsRead.innerText = "Read";
        bookIsRead.classList.remove("notRead");
        bookIsRead.classList.toggle("isRead");
        break;
    }
  });

  removeBtn.addEventListener("click", () => {
    library.removeBook(title, author);
    div.remove();
  });
}
