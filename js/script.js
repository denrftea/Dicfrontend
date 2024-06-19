document.addEventListener('DOMContentLoaded', ambilbuku);

function tambahbuku() {
    const judul = document.getElementById('judulbuku').value;
    const penulis = document.getElementById('penulisbuku').value;

    if (judul && penulis) {
        const book = {
            id: +new Date(),
            judul: judul,
            penulis: penulis,
            isCompleted: false
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

function ambilbuku() {
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
        if (book.isCompleted) {
            completeBookshelf.appendChild(bookElement);
        } else {
            incompleteBookshelf.appendChild(bookElement);
        }
    });
}

function createBookElement(book) {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item');
    bookItem.innerHTML = `<span>${book.judul} - ${book.penulis}</span>`;

    const moveButton = document.createElement('button');
    moveButton.textContent = book.isCompleted ? 'Belum Selesai' : 'Selesai';
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
    book.isCompleted = !book.isCompleted;
    saveBooksToStorage(books);
    renderBooks();
}

function deleteBook(bookId) {
    let books = getBooksFromStorage();
    books = books.filter(book => book.id !== bookId);
    saveBooksToStorage(books);
    renderBooks();
}
