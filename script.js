const modalHTML = `
<div id="addBookModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Add New Book</h2>
        <form id="addBookForm">
            <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" required>
            </div>
            <div class="form-group">
                <label for="author">Author:</label>
                <input type="text" id="author" name="author" required>
            </div>
            <div class="form-group">
                <label for="pages">Number of Pages:</label>
                <input type="number" id="pages" name="pages" required min="1">
            </div>
            <div class="form-group">
                <label for="readStatus">Read Status:</label>
                <select id="readStatus" name="readStatus">
                    <option value="false">Not Read</option>
                    <option value="true">Read</option>
                </select>
            </div>
            <button type="submit" class="submit-btn">Add Book</button>
        </form>
    </div>
</div>
`;


const grid = document.querySelector(".content");
const myLibrary = [];

// Create and append modal to document
document.body.insertAdjacentHTML('beforeend', modalHTML);

// Get modal elements
const modal = document.getElementById("addBookModal");
const addBookBtn = document.querySelector("#add");
const deleteAllBtn = document.querySelector("#delete-all");
const span = document.getElementsByClassName("close")[0];
const form = document.getElementById("addBookForm");

deleteAllBtn.addEventListener('click', () => {
    // Clear the array
    myLibrary.length = 0;
    // Clear the display
    displayLibrary();
});

// Modal control
addBookBtn.onclick = () => modal.style.display = "block";
span.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newBook = new Book(
        form.title.value,
        form.author.value,
        form.pages.value,
        form.readStatus.value === "true"
    );
    
    addBookToLibrary(newBook);
    form.reset();
    modal.style.display = "none";
});

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

function displayLibrary() {
    grid.innerHTML = '';
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
    
    deleteBtn.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        displayLibrary();
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

// Initialize with sample books if desired
let harryPotter = new Book("Harry Potter", "J.k Rowling", "300", false);
let theOutsiders = new Book("The Outsiders", "S.E. Hinton", "192", true);
addBookToLibrary(harryPotter);
addBookToLibrary(theOutsiders);