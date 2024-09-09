document.addEventListener('DOMContentLoaded', () => {
    const addTitle = document.getElementById('note-title');
    const addText = document.getElementById('note-text');
    const addNoteButtons = document.getElementById('submit-button');
    const notesDiv = document.getElementById('notes');

   
    function addNotes(event) {
        event.preventDefault();
        let notes = localStorage.getItem('notes');
        if (notes === null) {
            notes = [];
        } else {
            notes = JSON.parse(notes);
        }

        if (addTitle.value.trim() === '' && addText.value.trim() === '') {
            alert("Please add the notes");
            return;
        }

        const noteObj = {
            title: addTitle.value,
            note: addText.value
        };

        notes.push(noteObj);
        localStorage.setItem('notes', JSON.stringify(notes));
        showNotes();
        addTitle.value = '';  
        addText.value = '';   
    }

    
    addNoteButtons.addEventListener('click', addNotes);

   
    showNotes();
});


function showNotes() {
    const notesDiv = document.getElementById('notes');
    let notesHtml = '';
    let notes = localStorage.getItem('notes');

    if (notes === null) {
        notesDiv.innerHTML = '<p>No notes yet!</p>';
        return;
    } else {
        notes = JSON.parse(notes);
    }

    for (let i = 0; i < notes.length; i++) {
        notesHtml += `
            <div class="note">
                <h3>${notes[i].title}</h3>
                <p>${notes[i].note}</p>
                <button type="button" class="form-close-button" data-id="${i}" onclick="deleteNote(${i})">Delete</button>
            </div>
        `;
    }

    notesDiv.innerHTML = notesHtml;
}


function deleteNote(noteId) {
    let notes = JSON.parse(localStorage.getItem('notes'));
    notes.splice(noteId, 1);  
    localStorage.setItem('notes', JSON.stringify(notes)); 
    showNotes();  
}