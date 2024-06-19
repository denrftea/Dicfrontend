document.addEventListener('DOMContentLoaded', loadBooks);

function tambahbuku() {
  const judul = document.getElementById('judul').value;
  const penulis = document.getElementById('penulis').value;
  const tahun = parseInt(document.getElementById('tahun').value, 10);

  if (judul && penulis && tahun) {
      const book = {
        id: +new Date(),
        title: judul,
        author: penulis,
        year: tahun,
        isComplete: false
      };

      const books = getBooksFromStorage();
      books.push(book);
      saveBooksToStorage(books);
      renderBooks();
  }
}


function getBooksFromStorage() {
    return JSON.parse(localStorage.getItem('books')) || [];
}

function saveBooksToStorage(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

function loadBooks() {
    renderBooks();
}

function renderBooks() {
    const incompleteBookshelf = document.getElementById('incompleteBookshelf');
    const completeBookshelf = document.getElementById('completeBookshelf');
    incompleteBookshelf.innerHTML = '';
    completeBookshelf.innerHTML = '';

    const books = getBooksFromStorage();

    books.forEach(book => {
        const bookElement = createBookElement(book);
        if (book.isComplete) {
            completeBookshelf.appendChild(bookElement);
        } else {
            incompleteBookshelf.appendChild(bookElement);
        }
    });
}

function createBookElement(book) {
  const bookItem = document.createElement('div');
  bookItem.classList.add('book-item');
  bookItem.innerHTML = `<span>${book.title} by ${book.author}, ${book.year}</span>`;

  const moveButton = document.createElement('button');
  moveButton.textContent = book.isComplete ? 'Belum Dibaca' : 'Sudah Dibaca';
  moveButton.onclick = () => {
      toggleBookStatus(book.id);
  };
  bookItem.appendChild(moveButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Hapus';
  deleteButton.onclick = () => {
      deleteBook(book.id);
  };
  bookItem.appendChild(deleteButton);

  return bookItem;
}


function toggleBookStatus(bookId) {
    const books = getBooksFromStorage();
    const book = books.find(book => book.id === bookId);
    book.isComplete = !book.isComplete;
    saveBooksToStorage(books);
    renderBooks();
}

function deleteBook(bookId) {
    let books = getBooksFromStorage();
    books = books.filter(book => book.id !== bookId);
    saveBooksToStorage(books);
    renderBooks();
}
