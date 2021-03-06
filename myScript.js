//Refactored Code
const addItemButton = (() => {
    //Cache Dom Elements
    const cacheDom = (()=>{
      let myForm = document.getElementById('myForm'),
      formData = document.getElementById('myform'),
      addItemButton = document.getElementById('addItem'),
      title = document.getElementById('title'),
      author = document.getElementById('author'),
      pages = document.getElementById('pages'),
      read = document.getElementById('read'),
      section_body = document.getElementById('section-body'),
      submitButton = document.getElementById('submit'),
      closeButton = document.getElementById('close')

      return{myForm:myForm,formData:formData,addItemButton:addItemButton,title:title,author:author,pages:pages,read:read,section_body:section_body,submitButton:submitButton,closeButton:closeButton}
    })()

    //Variable Storage
    let myLibrary = [];

    //Bind events
    const bindEvents = () =>{
      cacheDom.addItemButton.addEventListener('click', render.showform);
      cacheDom.formData.addEventListener('submit', newBook)
      cacheDom.closeButton.addEventListener('click', render.hideForm);
    }

    //Function List

    //Getting Parent element
    function getParentNode(element, level=1) { 
      while(level-- > 0) {
          element = element.parentNode;
          if(!element) {
              return null; 
          }
      }
      return element;
    }
    // For Toggle Button Function
    const updateReadStatus = (readStatus) => {
      if(readStatus.target.checked == true){
        libraryReadUpdate(getParentNode(readStatus.target,3).firstChild.nextElementSibling.innerHTML,"read")
      }else{
        libraryReadUpdate(getParentNode(readStatus.target,3).firstChild.nextElementSibling.innerHTML,"not read")
      }
    }
    //Library Read status update
    const libraryReadUpdate = (title,status) =>{
      const item = myLibrary.findIndex(x => x.title === title);
      myLibrary[item].read = status;
    }

    //Display Library
    const libraryDisplay = () =>{
      render.clearSection_Body();
      myLibrary.map(newCard).map(render.addToDom)
    }

    //Remove Item from Library
    const removeItem = (item)=>{
      render.removeCard(item.target.parentElement.parentElement);
      removeBook(item.target.parentElement.firstChild.nextElementSibling.innerHTML)
    }
    //Toggle Button Event Listener
    const listener = (element, listener, task) =>{
      element.addEventListener(listener,task)
    }

    //Function for new card
    const newCard = (book) =>{
      let containerLabel = "Card" + myLibrary.findIndex(x => x.title === book.title),
      cardContainer = newElement({tag:'div', cLass:'cardContainer',id:containerLabel}),
      card = newElement({tag:'div', cLass:'card'}),
      titleHead = newElement({tag:'p',htmlString:'Title'}),
      titleHTML = newElement({tag:'p',htmlString:book.title}),
      authorHead = newElement({tag:'p',htmlString:'Author'}),
      authorHTML = newElement({tag:'p',htmlString:book.author}),
      pagesHead = newElement({tag:'p',htmlString:'Pages'}),
      pagesHTML = newElement({tag:'p',htmlString:book.pages}),
      readHead = newElement({tag:'p',htmlString:'Read'}),
      switchHead = newElement({tag:'div',cLass:'switch-toggle'}),
      sWitch = newElement({tag:'label',cLass:'switch',htmlFor:book.label}),
      checkBox = newElement({tag:'input',id:book.label,name:book.label,type:'checkbox',attribute:['aria-label', 'Toggle Read']}),
      slider = newElement({tag:'span',cLass:'slider round'}),
      buttonRemove = newElement({tag:'button',cLass:'removeItem',htmlString:'Remove Item'});

      //buttonRemove Eventlistener HERE
      listener(buttonRemove, 'click',removeItem);
      if (book.read == 'read') {
        checkBox.checked = true;
      } else {
        checkBox.checked = false;
      };
      //Updating Read status in Library based on slider
      listener(checkBox,'click',updateReadStatus)

      // Read Switch Element
      switchHead.appendChild(sWitch);
      sWitch.appendChild(checkBox);
      sWitch.appendChild(slider);

      // Card Element population
      card.appendChild(titleHead);
      card.appendChild(titleHTML);
      card.appendChild(authorHead);
      card.appendChild(authorHTML);
      card.appendChild(pagesHead);
      card.appendChild(pagesHTML);
      card.appendChild(readHead);
      card.appendChild(switchHead);
      card.appendChild(buttonRemove);

      cardContainer.appendChild(card)

      return cardContainer
    }

    //DOM Element Creation
    const newElement = (item)=>{
      let element = document.createElement(item.tag);
      if(item.cLass){element.classList = item.cLass;}
      if(item.id){element.id = item.id;}
      if(item.htmlString){element.innerHTML = item.htmlString;}
      if(item.htmlFor){element.htmlFor= item.htmlFor;}
      if(item.name){element.name= item.name;}
      if(item.type){element.type= item.type;}
      if(item.attribute){element.setAttribute(item.attribute[0],item.attribute[1]);}
      return element;
    }
    
    //Remove Item from Library
    const removeBook = (book)=>{
      myLibrary.splice(myLibrary.findIndex(x => x.title === book),1)
    }
    
    //New Book
    const newBook = (event)=>{
      let Data = Object.fromEntries(new FormData(cacheDom.formData).entries());
        if(Data.read == undefined) {
          let book = new Book(Data.title, Data.author, parseInt(Data.pages), 'not read');
          book.addBookToLibrary(myLibrary);
          libraryDisplay()
        }else {
          let book = new Book(Data.title, Data.author, Data.pages, 'read');
          book.addBookToLibrary(myLibrary);
          libraryDisplay()
        }
        event.preventDefault();
        render.hideForm();
        render.clearForm();
    }

    //Book Class
    class Book {

      constructor(title,author,pages,read ='not read'){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
      }

      addBookToLibrary(array){
        let label = `Book${myLibrary.length}`,
        book = {
          title: this.title,
          author: this.author,
          pages: this.pages,
          read: this.read,
          bookLabel: label
        }
        array.push(book)
      }

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
        cacheDom.formData.reset()
      }
      const addToDom = (item) =>{
        cacheDom.section_body.appendChild(item);
      }
      const clearSection_Body = () =>{
        while(cacheDom.section_body.firstChild){
          cacheDom.section_body.removeChild(cacheDom.section_body.lastChild);
        }
      }
      const removeCard = (card) =>{
        card.remove()
      }
      
      return {showform:showForm,hideForm:hideForm,clearForm:clearForm,addToDom:addToDom,clearSection_Body:clearSection_Body,removeCard:removeCard}
    })()
    bindEvents()
  })()
