const fileInput = document.getElementById("file-input");
const grid = document.getElementById("grid");

grid.addEventListener("dblclick", function(event) {
    if (event.target.classList.contains("grid-item")) {
        event.target.remove();
    }
});


fileInput.addEventListener("change", handleFileSelect);

function handleFileSelect() {
    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.addEventListener("load", handleFileLoad);
        reader.readAsDataURL(file);
    }
}

function handleFileLoad(event) {
    const img = new Image();
    img.src = event.target.result;
    img.addEventListener("load", handleImageLoad);
}

function handleImageLoad() {
    const item = document.createElement("div");
    item.classList.add("grid-item");
    item.style.backgroundImage = `url(${this.src})`;
    grid.appendChild(item);
    localStorage.setItem("moodboard", JSON.stringify(grid.innerHTML));
}

if (localStorage.getItem("moodboard")) {
    grid.innerHTML = JSON.parse(localStorage.getItem("moodboard"));
}

const uploadButton = document.getElementById("upload-button");
uploadButton.addEventListener("click", function() {
    fileInput.click();
});

