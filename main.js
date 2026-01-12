const columns = document.querySelectorAll('.column_cards');
const cards = document.querySelectorAll('.card');

let draggedCard;

//Function dragStart
const dragStart = (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = "move";
}
//Function dragOver
const dragOver = (event) => {
    event.preventDefault(); // Para não bloquear o evento do mouse
}

const dragEnter = ({ target }) => {
    // target.classList.add("column--highlight");
    if(target.classList.contains("column_cards")){
        target.classList.add("column--highlight");
    }
}

const dragLeave = ({ target }) => {
    target.classList.remove("column--highlight");
  
}
const drop = ({ target }) => {
    if(target.classList.contains("column_cards")){
        target.classList.remove("column--highlight");
        target.appendChild(draggedCard); 
    }
}

const creatCard = ({ target }) => {
    if(!target.classList.contains("column_cards")) return; 
     
    const card = document.createElement("section"); 
    card.className = "card";
    card.draggable = true;
    card.contentEditable ="true";

    card.addEventListener("focusout", () => {
        card.contentEditable ="false";

        if(!card.textContent) card.remove();

        // if(!card.textContent.trim()) card.remove();
    })

    card.addEventListener("dragstart", dragStart);

    target.appendChild(card);
    card.focus();


    // alert("double click funcionou!");
    // const card = document.createElement("section");
    // card.classList.add("card");
    // card.setAttribute("draggable", "true");
    // card.textContent = "New Card";
    // event.currentTarget.appendChild(card);
}

//Chamada das functions dragOver, dragEnter, dragLeave e drop em cada column
columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
    column.addEventListener("dblclick", creatCard);
    
})

//Chamada da function dragStart em cada card
cards.forEach((card) => {
    card.addEventListener("dragstart", dragStart);
})