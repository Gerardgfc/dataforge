// Funciones para manejar los placeholders
function clearPlaceholder(input) {
    input.dataset.placeholder = input.placeholder;
    input.placeholder = ""; 
}

function restorePlaceholder(input) {
    if (input.value === "") {
        input.placeholder = input.dataset.placeholder; 
    }
}

// Funciones de tu apartado de asesores
function updateFileName() {
    const input = document.getElementById('file-input');
    const label = document.getElementById('selected-file');
    const fileName = input.files.length > 0 ? input.files[0].name : 'Ninguno';
    label.textContent = `Archivos seleccionados: ${fileName}`;
}

document.getElementById('uploadForm').onsubmit = async function(event) {
    event.preventDefault();

    // Ocultar el mensaje de advertencia
    document.getElementById('warning-message').style.display = 'none';

    const formData = new FormData(this);
    const loadingMessage = document.getElementById('loading');
    const dots = document.getElementById('dots');
    const result = document.getElementById('result');

    // Limpiar resultados anteriores
    result.innerHTML = '';
    
    loadingMessage.style.display = 'block';

    let dotCount = 0;
    const dotAnimation = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        dots.textContent = '.'.repeat(dotCount);
    }, 500);

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        clearInterval(dotAnimation);
        loadingMessage.style.display = 'none';

        if (data.output_file) {
            const downloadLink = `<a href="/download/${data.output_file}" download>Descargar resultados</a>`;
            result.innerHTML = downloadLink;
        } else {
            result.innerText = data.error;
        }
    } catch (error) {
        clearInterval(dotAnimation);
        loadingMessage.style.display = 'none';
        result.innerText = 'Error en la conexión. Inténtalo de nuevo.';
        console.error(error);
    }
};

// Funciones de tu apartado de registro de asesores 
function login()  {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value; 

    if (username && password) {
        localStorage.setItem('username', username); 
        window.location.href = 'home_asesores.html'; 
    } else {
        alert("Por favor, introduce tanto el usuario como la contraseña."); 
    }
}


function login_bank()  {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value; 

    if (username && password) {
        localStorage.setItem('username', username); 
        window.location.href = 'templates/cuenta_clientes.html'; 
    } else {
        alert("Por favor, introduce tanto el usuario como la contraseña."); 
    }
}



function logout() {
    localStorage.removeItem('username'); 
    window.location.href = 'inicio_asesores.html';
}
