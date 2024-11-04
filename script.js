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
  updateContent(book);
}

let harryPotter = new Book("Harry Potter", "J.k Rowling", "300", false);
let theOutsiders = new Book("The Outsiders", "S.E. Hinton", "192", true)
addBookToLibrary(harryPotter);
addBookToLibrary(theOutsiders);

function updateContent(book){
    const container = document.createElement("div");
    container.className = "grid-item";

    const title = document.createElement("div");
    title.textContent = "Title: " + book.title;

    const author = document.createElement("div");
    author.textContent = "Author: " + book.author;

    const pages = document.createElement("div");
    pages.textContent = "Pages: " + book.pages;

    const readStatus = document.createElement("div");
    (book.readStatus) ? readStatus.textContent = "Status: Read" : readStatus.textContent = "Status: Not Read";
    
    const readBtn = document.createElement("button");
    readBtn.className = "readBtn";
    book.readStatus ? readBtn.textContent = "Read" : readBtn.textContent = "Not Read";
    book.readStatus ? readBtn.classList.add("green"): readBtn.classList.add("red");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("red");
    

    container.appendChild(title);
    container.appendChild(author);
    container.appendChild(pages);
    container.appendChild(readStatus);
    container.appendChild(readBtn);
    container.appendChild(deleteBtn);

    grid.appendChild(container);

}