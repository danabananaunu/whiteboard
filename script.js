let zIndexCounter = 0;//the counter for the nr of objects
let selectedColor = '#ffa500'; //the default color for the notes

function createNote() {
    const note = document.createElement('div');
    note.className = 'note';
    note.style.left = `${Math.random()*70}%`;
    note.style.top = `${Math.random()*70}%`;
    note.style.zIndex = zIndexCounter++;
    note.contentEditable = true;
    note.draggable = true;
    note.style.backgroundColor = selectedColor;

    enableDragging(note);

    document.getElementById('whiteboard').appendChild(note);
}

document.getElementById('add-note').addEventListener('click', createNote);

const colorPickerModal = document.getElementById('color-picker-modal');

document.getElementById('color-picker-btn').addEventListener('click', function() {
    colorPickerModal.style.display = 'block';
});//display the colors when the button is clicked

//the color to be changed
const colorOptions = document.querySelectorAll('.color-option');
colorOptions.forEach(function(option) {
    option.style.backgroundColor = option.getAttribute('data-color');
    option.addEventListener('click', function() {
        selectedColor = this.getAttribute('data-color');
        colorPickerModal.style.display = 'none'; 
    });
});

//when clicked outside the box the modal for color disappears
window.onclick = function(event) {
    if (event.target === colorPickerModal) {
        colorPickerModal.style.display = 'none'; 
    }
}
//event listeners for the styling of the text/the menu
document.getElementById('font-select').addEventListener('change', function() {
    const selectedFont = this.value;
    const text = document.querySelector('.selected-text');
    if (text) {
        text.style.fontFamily = selectedFont;
    }
});

document.getElementById('style-select').addEventListener('change', function() {
    const selectedStyle = this.value;
    const text = document.querySelector('.selected-text');
    if (text) {
        text.style.fontStyle = selectedStyle;
        text.style.fontWeight = selectedStyle === 'bold' ? 'bold' : 'normal';
    }
});

document.getElementById('size-select').addEventListener('change', function() {
    const selectedSize = this.value + 'px';
    const text = document.querySelector('.selected-text');
    if (text) {
        text.style.fontSize = selectedSize;
    }
});

function createText() {
    const text = document.createElement('div');
    text.className = 'text';
    text.style.left = `${Math.random() * 70}%`;
    text.style.top = `${Math.random() * 70}%`;
    text.style.zIndex = zIndexCounter++;
    text.contentEditable = true;
    text.draggable = true;
    text.innerText = "Your text here";

    enableDragging(text);

    text.addEventListener('click', function(event) {
        const clickedElement = event.target;//get the lement, its bounding boxb and the menu
        const rect = clickedElement.getBoundingClientRect();
        const dropdownMenus = document.querySelector('.dropdown-menus');
        dropdownMenus.style.top = (rect.top - dropdownMenus.offsetHeight - 50) + 'px';//position of the menu
        dropdownMenus.style.left = (rect.left) + 'px';
        dropdownMenus.style.display = 'block';

        //select current text box and add it
        const selectedText = document.querySelector('.selected-text');
        if (selectedText) {
            selectedText.classList.remove('selected-text');
        }
        text.classList.add('selected-text');
    });

    //when clicked outside of the text box or menu it disappears
    document.addEventListener('click', function(event) {
        const clickedElement = event.target;//get the element and check where it is
        const isInsideDropdownMenu = clickedElement.closest('.dropdown-menus');
        const isTextBox = clickedElement.classList.contains('text') || clickedElement.closest('.text');
        //hide the menu
        if (!isInsideDropdownMenu && !isTextBox) {
            const dropdownMenus = document.querySelector('.dropdown-menus');
            dropdownMenus.style.display = 'none';
        }
    });

    document.getElementById('whiteboard').appendChild(text);
}

document.getElementById('add-text-btn').addEventListener('click', createText);

//function to move both a text box and a note by doubleclicking or left clicking
function enableDragging(element) {
    let isDragging = false;
    let offsetX, offsetY;

    function moveElement(event) { //move the element when dragged
        if (isDragging) {
            const newLeft = event.clientX - offsetX;
            const newTop = event.clientY - offsetY;
            element.style.left = `${newLeft}px`;
            element.style.top = `${newTop}px`;
        }
    }

    element.addEventListener('mousedown', function (event) { //start dragging
        if (event.button === 0) { 
            isDragging = true;
            offsetX = event.clientX - element.getBoundingClientRect().left;
            offsetY = event.clientY - element.getBoundingClientRect().top;
            document.addEventListener('mousemove', moveElement);
        }
    });

    document.addEventListener('mouseup', function () { //stop dragging
        isDragging = false;
        document.removeEventListener('mousemove', moveElement);
    });
}
