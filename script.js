//edit text box appears on top of the text box, if more text boxes
// are created edit text box does nort appear
let zIndexCounter = 0;
let selectedColor = '#ffa500';

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
});

const colorOptions = document.querySelectorAll('.color-option');
colorOptions.forEach(function(option) {
    option.style.backgroundColor = option.getAttribute('data-color');
    option.addEventListener('click', function() {
        selectedColor = this.getAttribute('data-color');
        colorPickerModal.style.display = 'none'; // Close the modal after selecting a color
    });
});

window.onclick = function(event) {
    if (event.target === colorPickerModal) {
        colorPickerModal.style.display = 'none'; // Close the modal if clicked outside of it
    }
}

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

    // Event listener for font select change
    document.getElementById('font-select').addEventListener('change', function() {
        text.style.fontFamily = this.value;
    });

    // Event listener for style select change
    document.getElementById('style-select').addEventListener('change', function() {
        text.style.fontStyle = this.value;
    });
    // for the bold shrift
    document.getElementById('style-select').addEventListener('change', function() {
        const selectedStyle = this.value;
        if (selectedStyle === 'bold') {
            text.style.fontWeight = 'bold';
        } else {
            text.style.fontWeight = 'normal';
            text.style.fontStyle = selectedStyle;
        }
    });

    // Event listener for size select change
    document.getElementById('size-select').addEventListener('change', function() {
        text.style.fontSize = this.value + 'px';
    });

    text.addEventListener('click', function() {
        const dropdownMenus = document.querySelector('.dropdown-menus');
        const rect = text.getBoundingClientRect();
        dropdownMenus.style.top = (rect.top - dropdownMenus.offsetHeight - 10) + 'px';
        dropdownMenus.style.left = (rect.left) + 'px';
        dropdownMenus.classList.remove('hidden');
        event.stopPropagation();
    });

    document.getElementById('whiteboard').appendChild(text);
}

document.getElementById('add-text-btn').addEventListener('click', createText);

document.addEventListener('click', function(event) {
    const dropdownMenus = document.querySelector('.dropdown-menus');
    dropdownMenus.classList.add('hidden');
});

//function to move both a text box and a note by doubleclicking or left clicking
function enableDragging(element) {
    let isDragging = false;
    let offsetX, offsetY;

    function moveElement(event) {
        if (isDragging) {
            const newLeft = event.clientX - offsetX;
            const newTop = event.clientY - offsetY;
            element.style.left = `${newLeft}px`;
            element.style.top = `${newTop}px`;
        }
    }

    element.addEventListener('mousedown', function (event) {
        if (event.button === 0) { 
            isDragging = true;
            offsetX = event.clientX - element.getBoundingClientRect().left;
            offsetY = event.clientY - element.getBoundingClientRect().top;
            document.addEventListener('mousemove', moveElement);
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
        document.removeEventListener('mousemove', moveElement);
    });
}