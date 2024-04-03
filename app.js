

const textarea = document.querySelector(".note");
const containerNote = document.querySelector(".container-notes");

//buttons
const btnCreate = document.querySelector(".btn-create");


let notes = [];


btnCreate.addEventListener("click", createNote);

// create note
function createNote(e){
   
    
   
   let id = new Date().getTime();  //id creation
      
      
      
     if(textarea.value !== ''){
       
       /* Data verification in localstorage */
       let existingNote = JSON.parse(localStorage.getItem('notes')) || [];
        
       //Add data in localstorage 
       existingNote.push({id: id, text: textarea.value});
       localStorage.setItem('notes', JSON.stringify(existingNote));
       textarea.value = "";
     }


    viewNote();
   
}

// Notes view
function viewNote() {

    containerNote.innerHTML = "";
      
      //Data extration in localstorage
      const getLocalStore = JSON.parse(localStorage.getItem('notes'));
   
   // Component creation IF exists data in localStorage
   if(getLocalStore  && getLocalStore.length > 0) {
      getLocalStore.forEach(note =>{
         
         const container = document.createElement('div');
         container.classList.add('note');
         container.id = note.id;

         const textNote = document.createElement('p');
         textNote.classList.add('text-note');
         textNote.textContent = note.text;

         const containerButton = document.createElement('div');
         containerButton.classList.add('container-buttons');

         //EDIT
         const edit = document.createElement("button");
         edit.classList.add('btn-edit');
         edit.textContent = "Edit";

         edit.addEventListener("click", () => editNote(note.id));
         
         //DELETE
         const button = document.createElement('button');
         button.classList.add('btn', 'btn-delete');
         button.textContent = "Delete";

         button.addEventListener("click", () => deleteNote(note.id)); 

         container.appendChild(textNote);
         container.appendChild(containerButton);
         containerButton.appendChild(button);
         containerButton.appendChild(edit);

         containerNote.appendChild(container); 
      });
   
   }else{
      containerNote.innerHTML = '<p class = "no-note"> No hay notas </p>';
   }
}

//delete note
function deleteNote(id) {
  
  //Data extraction
  const allnote = JSON.parse(localStorage.getItem('notes'));
  const noteIndex = allnote.findIndex(note => note.id === id);

    
      //IF find element. Element is Delete
    if(noteIndex!== -1){
       
       allnote.splice(noteIndex, 1);

       localStorage.setItem('notes', JSON.stringify(allnote));
       viewNote();
    }

    
  
}

function editNote(id) {

   //Data extraction in localStorage
    const allNote = JSON.parse(localStorage.getItem('notes'));
    const noteIndex = allNote.findIndex(note => note.id === id);
    
    if(noteIndex !== -1){
       
       //select note Component and data of localStorage
       const note = document.getElementById(id);
       const noteSelect = allNote[noteIndex];

       const text =  note.querySelector('.text-note');
       const btnEdit = note.querySelector('.btn-edit');

       

      if (btnEdit.textContent === "Edit") {
            
            //Change text button and  note text is editable
            btnEdit.textContent = "Save";
            text.contentEditable = true;

            //Event update data
            btnEdit.addEventListener("click", function saveChanges() {
               
                //insert new text in localStorage
                noteSelect.text = text.textContent;
                localStorage.setItem('notes', JSON.stringify(allNote));
                
                btnEdit.textContent = "Edit";
                text.contentEditable = false;
                
                btnEdit.removeEventListener("click", saveChanges);
            });
        }


     
      
      

   }  

} 

          
   


viewNote();






