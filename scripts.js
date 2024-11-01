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
        const response = await fetch('https://3rol73yole.execute-api.us-east-1.amazonaws.com/dev/predict', { 
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json(); // Cambiado a json
        if (data.status === 'success') {
            // Mostrar el enlace de descarga
            const downloadLink = `<a href="${data.download_url}" download="${data.filename}">Descargar resultados</a>`;
            result.innerHTML = downloadLink; // Mostrar el enlace de descarga

            // Redirigir automáticamente después de un breve retraso
            setTimeout(() => {
                window.location.href = data.download_url; 
            }, 2000); // Cambia el tiempo según lo necesites
        } else {
            throw new Error('Error en la respuesta de la API');
        }

        clearInterval(dotAnimation);
        loadingMessage.style.display = 'none';
    } catch (error) {
        clearInterval(dotAnimation);
        loadingMessage.style.display = 'none';
        result.innerText = 'Error en la conexión, de parte del servidor. Inténtalo de nuevo.';
        console.error(error);
    }
};

// Funciones de tu apartado de registro de asesores 
function login()  {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value; 

    if (username && password) {
        localStorage.setItem('username', username); 
        window.location.href = 'templates/asesores_home.html'; 
    } else {
        alert("Por favor, introduce tanto el usuario como la contraseña."); 
    }
}

function logout() {
    localStorage.removeItem('username'); 
    window.location.href = '../index.html';
}
