// Variable Storage
let myLibrary = new Array();
let body = document.querySelector('#section-body');

// Book Object Main
function Book(title, author, pages, read, label) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.label = label

  this.info = function () {
    return (`${label} is ${title} by ${author}, ${pages} pages, ${read}`)
  }
}

const updateLibrary = () => {
  if (localStorage.getItem('Library') === null) {
    localStorage.setItem('Library', JSON.stringify(myLibrary));
  }
  else {
    localStorage.removeItem('Library');
    localStorage.setItem('Library', JSON.stringify(myLibrary));
  }
}

function addBookToLibrary(title, author, pages, read) {
  let label = "Book" + myLibrary.length

  let book = new Book(title, author, pages, read, label);
  myLibrary.push(book);
  newCard(title, author, pages, label, read);
  updateLibrary();
}

// Add Item button display form
function openForm() {
  document.getElementById("myForm").style.display = "flex";
  document.getElementById("myForm").scrollIntoView({ behavior: 'smooth' })

}

// Close button remove form
function closeForm() {
  document.querySelector("form").reset();
  document.getElementById("myForm").style.display = "none";
}

// Remove Item Function
const removeI = (any) => {
  any.addEventListener('click', (e) => {
    e.currentTarget.parentElement.parentElement.remove();
    updateLibrary();
  })

}

// Changes the Items "Read" Attribute to match toggle
const showChecked = (x) => {
  const index = myLibrary.map(e => e.label).indexOf(x.id);
  if (x.checked) {
    myLibrary[index].read = 'read';
    updateLibrary();
  } else {
    myLibrary[index].read = 'not read';
    updateLibrary();
  }
}

// For Toggle Button Function
const listener = (any) => {
  any.addEventListener('click', () => {
    showChecked(any)


  })
}

// Function to make new card
const newCard = (title, author, pages, label, read = false) => {
  let containerLabel = "Card" + myLibrary.length;

  let cardC = document.createElement('div');
  cardC.classList = 'cardContainer';
  cardC.id = containerLabel;
  let card = document.createElement('div');
  card.classList = 'card';
  let title1 = document.createElement('p');
  title1.innerHTML += 'Title';
  let titleT = document.createElement('p');
  titleT.innerHTML += title;
  let author1 = document.createElement('p');
  author1.innerHTML += 'Author';
  let authorT = document.createElement('p');
  authorT.innerHTML += author;
  let pages1 = document.createElement('p');
  pages1.innerHTML += 'Pages';
  let pagesT = document.createElement('p');
  pagesT.innerHTML += pages;
  let read1 = document.createElement('p');
  read1.innerHTML += 'Read';
  let switchT = document.createElement('div');
  switchT.classList = 'switch-toggle';
  let sWitch = document.createElement('label');
  sWitch.classList = 'switch';
  sWitch.htmlFor = label;
  let checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.id = label;
  checkBox.name = label;
  checkBox.setAttribute('aria-label', 'Toggle Read');
  listener(checkBox);
  if (read == 'read') {
    checkBox.checked = true;
  } else {
    checkBox.checked = false;
  }

  let slider = document.createElement('span');
  slider.classList = 'slider round';

  let buttonRemove = document.createElement('button');
  buttonRemove.classList = 'removeItem';
  buttonRemove.onclick = 'removeItem()';
  buttonRemove.innerHTML = 'Remove Item';
  removeI(buttonRemove)

  switchT.appendChild(sWitch);
  sWitch.appendChild(checkBox);
  sWitch.appendChild(slider);

  card.appendChild(title1);
  card.appendChild(titleT);
  card.appendChild(author1);
  card.appendChild(authorT);
  card.appendChild(pages1);
  card.appendChild(pagesT);
  card.appendChild(read1);
  card.appendChild(switchT);
  card.appendChild(buttonRemove);

  cardC.appendChild(card);
  body.appendChild(cardC);


}

// Get Form data after Submit is hit
document.querySelector('form').addEventListener('submit', (e) => {
  const data = Object.fromEntries(new FormData(e.target).entries());

  if (data.read == undefined) {
    addBookToLibrary(data.title, data.author, data.pages, 'not read');
  } else {
    addBookToLibrary(data.title, data.author, data.pages, 'read');
  }
  closeForm();
  e.preventDefault();
});


//Refactored Code
const addItemButton = () => {
    //Cache Dom Elements
    const cacheDom = (()=>{
      let myForm = document.getElementById('myForm'),
      addItemButton = document.getElementById('addItem'),
      title = document.getElementById('title'),
      author = document.getElementById('author'),
      pages = document.getElementById('pages'),
      read = document.getElementById('read'),
      submitButton = document.getElementById('submit'),
      closeButton = document.getElementById('close')

      return{myForm:myForm,addItemButton:addItemButton,title:title,author:author,pages:pages,read:read,submitButton:submitButton,closeButton:closeButton}
    })()

    //Bind events

    //Function List

    //Remove Item from Library
    const removeItem = ()=>{

    }
    //Toggle Button Function
    const listener = (any) =>{

    }

    //Function for new card
    const newCard = () =>{

    }
    //Render DOM
    const render = (()=>{
      const showForm = ()=>{
        cacheDom.myForm.style.display = 'flex';
        cacheDom.myForm.scrollIntoView({ behavior: 'smooth' })
      } 
      const hideForm = ()=>{
        cacheDom.myForm.style.display = 'none';
      }
      const clearForm = ()=>{
        cacheDom.myForm.reset()
      }

      return {showform:showForm,hideForm:hideForm,clearForm:clearForm}
    })()
  }
