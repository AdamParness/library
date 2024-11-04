const grid = document.querySelector(".content");
const myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayLibrary(); 
}

let harryPotter = new Book("Harry Potter", "J.k Rowling", "300", false);
let theOutsiders = new Book("The Outsiders", "S.E. Hinton", "192", true)
addBookToLibrary(harryPotter);
addBookToLibrary(theOutsiders);


function displayLibrary() {
    // Clear the current display
    grid.innerHTML = '';
    
    // Display each book with its current index
    myLibrary.forEach((book, index) => {
        createBookCard(book, index);
    });
}

function createBookCard(book, index) {
    const container = document.createElement("div");
    container.className = "grid-item";

    const title = document.createElement("div");
    title.textContent = "Title: " + book.title;

    const author = document.createElement("div");
    author.textContent = "Author: " + book.author;

    const pages = document.createElement("div");
    pages.textContent = "Pages: " + book.pages;

    const readStatus = document.createElement("div");
    updateReadStatus(book, readStatus);
    
    const readBtn = document.createElement("button");
    readBtn.className = "readBtn";
    updateReadButton(book, readBtn);

    readBtn.addEventListener('click', () => {
        book.readStatus = !book.readStatus;
        updateReadStatus(book, readStatus);
        updateReadButton(book, readBtn);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("red");
    deleteBtn.textContent = "Delete";
    
    // Delete functionality using the current index
    deleteBtn.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        displayLibrary(); // Refresh the display to show updated library
    });

    container.appendChild(title);
    container.appendChild(author);
    container.appendChild(pages);
    container.appendChild(readStatus);
    container.appendChild(readBtn);
    container.appendChild(deleteBtn);

    grid.appendChild(container);
}

function updateReadStatus(book, readStatusElement) {
    readStatusElement.textContent = book.readStatus ? "Status: Read" : "Status: Not Read";
}

function updateReadButton(book, buttonElement) {
    buttonElement.textContent = book.readStatus ? "Read" : "Not Read";
    buttonElement.classList.remove(book.readStatus ? "red" : "green");
    buttonElement.classList.add(book.readStatus ? "green" : "red");
}