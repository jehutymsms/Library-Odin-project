// Variable Storage
let myLibrary = [];
let bookCount = myLibrary.length

// Book Object Main
function Book (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        return (`"${title} by ${author}, ${pages} pages, ${read}"`)
    }
}



function addBookToLibrary(title, author, pages, read){

    let book = new Book (title, author, pages, read); 
    myLibrary.push(book);

}


const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', "not read");


myLibrary.push(theHobbit);

addBookToLibrary('Star Wars', 'George Lucas', '300', 'read')
addBookToLibrary('Enders Game', 'JJ Abraham', '500', 'read')
addBookToLibrary('Donkey Kong', 'Nintendo', '200', 'not read')
addBookToLibrary('Fragon Ball Z', 'Vegeta', '100', 'not read')
