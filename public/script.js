document.addEventListener('DOMContentLoaded', function() {
    // Initialize background tiles
    function initBackgroundTiles() {
        const container = document.querySelector('.background-tiles');
        const rows = container.querySelectorAll('.tile-row');
        const tileWidth = 400;
        const gap = 25;
        
        rows.forEach(row => {
            // Calculate tiles needed
            const viewportWidth = window.innerWidth;
            const tilesPerScreen = Math.ceil(viewportWidth / (tileWidth + gap));
            const totalTiles = tilesPerScreen * 2;
            
            // Clear and create tiles
            row.innerHTML = '';
            for (let i = 0; i < totalTiles; i++) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                
                // Add subtle variation
                if (i % 4 === 0) {
                    tile.style.backgroundImage = `
                        radial-gradient(
                            circle at 70% 30%,
                            rgba(255,255,255,0.03) 0%,
                            transparent 60%
                        )
                    `;
                }
                
                row.appendChild(tile);
            }
        });
    }

    // Initialize foreground gallery tiles
    function initGalleryTiles() {
        const container = document.querySelector('.gallery-tiles');
        const tileWidth = 300;
        const gap = 25;
        
        // Calculate tiles needed
        const containerWidth = container.parentElement.clientWidth;
        const tilesPerScreen = Math.ceil(containerWidth / (tileWidth + gap));
        const totalTiles = tilesPerScreen * 2;
        
        // Clear and create tiles
        container.innerHTML = '';
        for (let i = 0; i < totalTiles; i++) {
            const tile = document.createElement('div');
            tile.className = 'gallery-tile';
            
            // Add content or images
            tile.innerHTML = `<div class="tile-content">Artwork ${i+1}</div>`;
            
            container.appendChild(tile);
        }
    }

    // Initialize both tile systems
    initBackgroundTiles();
    initGalleryTiles();

    // Handle window resize
    window.addEventListener('resize', function() {
        initBackgroundTiles();
        initGalleryTiles();
    });

    // ====================================
    // FORM SUBMISSION WITH PHP INTEGRATION
    // ====================================
    const commissionForm = document.getElementById('commissionForm');
    
    if (commissionForm) {
        commissionForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Disable button during submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            try {
                // Collect form data
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value || 'Not provided',
                    size: document.getElementById('size').value,
                    type: document.getElementById('type').value,
                    details: document.getElementById('details').value
                };
                
                // Send to PHP script
                const response = await fetch('send_request.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams(formData)
                });
                
                const result = await response.text();
                
                if (result === 'success') {
                    // Show success message
                    commissionForm.innerHTML = `
                        <div class="form-success">
                            <h3>✓ Request Sent Successfully!</h3>
                            <p>The artist will contact you soon.</p>
                            <a href="index.html" class="back-link">Back to Gallery</a>
                        </div>
                    `;
                } else {
                    throw new Error(result || 'Failed to send request');
                }
            } catch (error) {
                alert('Error: ' + error.message);
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    // ====================================
    // ADDITIONAL INTERACTIONS
    // ====================================
    // Add hover effects to tiles
    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('mouseenter', () => {
            tile.style.transform = 'scale(1.03) translateY(-5px)';
            tile.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
        });
        tile.addEventListener('mouseleave', () => {
            tile.style.transform = '';
            tile.style.boxShadow = '';
        });
    });
});
