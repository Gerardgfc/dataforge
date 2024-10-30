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
        const response = await fetch('http://ecs-alb-test-1385040551.us-east-1.elb.amazonaws.com/predict', { 
            method: 'POST',
            body: formData
        });

        const data = await response.blob(); // Cambiado a blob
        const downloadUrl = window.URL.createObjectURL(data); // Crear URL del blob
        const downloadLink = `<a href="${downloadUrl}" download="resultado.csv">Descargar resultados</a>`;
        
        clearInterval(dotAnimation);
        loadingMessage.style.display = 'none';

        result.innerHTML = downloadLink; // Mostrar el enlace de descarga
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
