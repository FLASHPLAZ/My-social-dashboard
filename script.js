const uploadArea = document.querySelector('.upload-area');
const uploadBtn = document.querySelector('.upload-btn');
const fileInput = document.querySelector('.file-input');
const resultLink = document.querySelector('.result-link');

const apiKey = 'a4e43f506a869b0dbecbd8411adb7bc0';

if (uploadBtn && fileInput && uploadArea) {
    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadImage(file);
        }
    });

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#059669';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#10b981';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#10b981';
        const file = e.dataTransfer.files[0];
        if (file) {
            uploadImage(file);
        }
    });
}


function uploadImage(file) {
    if (!apiKey) {
        alert('API key is missing. Please configure the API key in script.js');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    return fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            if(resultLink) {
                resultLink.value = data.data.url;
            }
            return data.data.url;
        } else {
            alert('Image upload failed. Please try again.');
            throw new Error('Image upload failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during the upload. Please try again.');
        throw error;
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { uploadImage };
}