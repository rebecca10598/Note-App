//array that will hold all the notes & give each item in notes a property of id
let notes = [
    {
        //id contains unique keys for each item
        id: new Date(),
        title: 'Sample Note',
        body: 'This is a description for our sample note',
        bgColor: 'pink'
    }
]

//takes the tag we want to create and the array of classes we want to assign to the element as arguments
const createElement = (tag, classes = []) =>{
    const element = document.createElement(tag);
    classes.forEach(cl => {   //each class in classes add the class to the element you just created and return element
        element.classList.add(cl);
    })
    return element;
}

//create functions for dynamically creating elements and set values to show a note
//method createNoteView should expect a single note as an argument 
const createNoteView = (note) =>{
    //declare variable called noteDiv. Call createElement method with div and note as class
    const noteDiv = createElement('div', ['note']);
    noteDiv.id = note.id;
    
    const textDiv = createElement('div',['text']);
    textDiv.style.background = note.bgColor;
    
    const titleP = createElement('b',['title']);
    titleP.innerHTML = note.title;

    const bodyP = createElement('p',['body']);
    bodyP.innerHTML = note.body;

    const editButton = createElement('button',['edit']);
    editButton.innerHTML = 'Edit Note';

    const deleteButton = createElement('button',['delete']);
    deleteButton.innerHTML = 'Delete Note';

    textDiv.append(titleP)
    textDiv.append(bodyP)
    noteDiv.append(textDiv)
    noteDiv.append(editButton)
    noteDiv.append(deleteButton)

    editButton.onclick = () => editNote(noteDiv);
    //add an on click event to the delete button and assign it the deleteNote method
    deleteButton.onclick = () => deleteNote(noteDiv);
    return noteDiv;
}

const cancelEdit = (noteDiv) => {
    const titleP = noteDiv.querySelector('b.title');
    titleP.contentEditable = false;

    const bodyP = noteDiv.querySelector('p.body');
    bodyP.contentEditable = false;

    const editButton = noteDiv.querySelector('button.edit');
    editButton.innerHTML = 'Edit Note';

    const deleteButton = noteDiv.querySelector('button.delete');
    deleteButton.innerHTML = 'Delete Note';

    const note = notes.find(note => note.id == noteDiv.id);

    titleP.innerHTML = note.title;
    bodyP.innerHTML = note.body;

    editButton.onclick = () => editNote(noteDiv);
    deleteButton.onclick = () => deleteNote(noteDiv);
}

//method for edit note
const editNote = (noteDiv, editSave = false) => {
    const titleP = noteDiv.querySelector('b.title');
    titleP.contentEditable = true;
    titleP.focus();
    
    const bodyP = noteDiv.querySelector('p.body');
    bodyP.contentEditable = true;

    const editButton= noteDiv.querySelector('Button.edit');
    editButton.innerHTML = 'Save Note';
    editButton.onclick = () => editNote(noteDiv, true);

    const deleteButton = noteDiv.querySelector('button.delete');
    deleteButton.innerHTML = 'Cancel Edit';
    deleteButton.onclick = () => cancelEdit(noteDiv);

    if (editSave) {
        const note = notes.find(note => note.id == noteDiv.id);
        note.title = titleP.innerText.trim();
        note.body = bodyP.innerText.trim();
        deleteButton.innerHTML = 'Delete Note';
        editButton.innerHTML = 'Edit Note';
        titleP.contentEditable = false;
        bodyP.contentEditable = false;
        editButton.onclick = () => editNote (noteDiv);
        deleteButton.onclick = () => deleteNote (noteDiv);
    }
}

//create the functionality for adding a new note by collecting the users input and create a new note view with it
const saveNote = () =>{
    const titleInput = document.querySelector('input#title');
    const bodyInput = document.querySelector('input#body');
    const bgColorInput = document.querySelector('select');
    const id = new Date().getTime();
    const note = {
        id, title: titleInput.value, body: bodyInput.value, bgColor: bgColorInput.value
    }
    const noteDiv = createNoteView(note);
    notesDiv.prepend(noteDiv);
    titleInput.value = '';
    bodyInput.value = '';
    bgColorInput.value = '';
}

//create a new method called 'delete note'
const deleteNote = (noteDiv) =>{
    noteDiv.remove();
    notes = notes.filter(note => note.id != noteDiv.id); //notes.filter where note.id is not equal to noteDiv.
}

//invoke it on the add button by querying the document for the button with a class of add and adding an on click event then setting in the function call to save note
document.querySelector('button.add').onclick = () => saveNote();

const notesDiv = document.querySelector('.notesDiv');
notes.forEach(note =>{
    const noteDiv = createNoteView(note);
    notesDiv.append(noteDiv);
})
