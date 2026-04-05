// Function to update the ID card based on user input
function updateCard() {
    // Get values from inputs
    const name = document.getElementById('nameInput').value || 'Jane Doe';
    const id = document.getElementById('idInput').value || 'AGRI-001';
    const course = document.getElementById('courseInput').value || 'Agri-Biotechnologist';
    const dob = document.getElementById('dobInput').value || 'Research & Development';
    const blood = document.getElementById('bloodInput').value || '+91 90472 58125';

    // Update ID card elements
    document.getElementById('cardName').textContent = name;
    document.getElementById('cardId').textContent = id;
    document.getElementById('cardCourse').textContent = course;
    document.getElementById('cardDob').textContent = dob.length > 20 ? dob.substring(0, 18) + '...' : dob;
    document.getElementById('cardBlood').textContent = blood;
    
    // Update Barcode (removing spaces for better barcode rendering)
    const barcodeText = id.replace(/\s+/g, '');
    document.getElementById('cardBarcode').textContent = `*${barcodeText}*`;

    // Only update avatar if no custom image is uploaded and it's using the default ui-avatars
    const cardImage = document.getElementById('cardImage');
    if (cardImage.src.includes('ui-avatars.com')) {
        cardImage.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=528B46&color=fff&size=150`;
    }
}

// Function to handle image upload
function loadFile(event) {
    if (event.target.files && event.target.files[0]) {
        const image = document.getElementById('cardImage');
        image.src = URL.createObjectURL(event.target.files[0]);
        // Free up memory when image is loaded
        image.onload = function() {
            URL.revokeObjectURL(image.src); 
        }
    }
}

// Function to download the ID card as an image
function downloadID() {
    const idCard = document.getElementById('idCard');
    
    // Change style slightly for better rendering in canvas if needed
    idCard.style.borderRadius = '0'; 
    
    html2canvas(idCard, {
        scale: 2, // Higher quality
        useCORS: true, // Allow loading external images like from UI-Avatars
        backgroundColor: null // Transparent background around card
    }).then(canvas => {
        // Restore styling
        idCard.style.borderRadius = '15px';
        
        // Create download link
        const link = document.createElement('a');
        const name = document.getElementById('nameInput').value || 'Agribioziz_ID';
        link.download = `ID_Card_${name.replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}
