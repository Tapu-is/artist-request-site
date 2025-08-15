// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize background tiles
    function initBackgroundTiles() {
        const container = document.querySelector('.background-tiles');
        if (!container) return;
        
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
                    tile.style.background = 'linear-gradient(135deg, #1c1c1c, #272727)';
                } else if (i % 4 === 1) {
                    tile.style.background = 'linear-gradient(135deg, #1a1a1a, #222222)';
                } else if (i % 4 === 2) {
                    tile.style.background = 'linear-gradient(135deg, #1e1e1e, #292929)';
                }
                
                row.appendChild(tile);
            }
        });
    }

    // Initialize gallery tiles
    function initGalleryTiles() {
        const container = document.querySelector('.gallery-tiles');
        if (!container) return;
        
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
            
            // Add content
            const content = document.createElement('div');
            content.className = 'gallery-tile-content';
            content.textContent = `Artwork ${i+1}`;
            tile.appendChild(content);
            
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

    // Add hover effects to tiles
    function addTileHoverEffects() {
        document.querySelectorAll('.tile, .gallery-tile').forEach(tile => {
            tile.addEventListener('mouseenter', () => {
                tile.style.transform = 'scale(1.05)';
                tile.style.boxShadow = '0 10px 25px rgba(0,0,0,0.6)';
            });
            tile.addEventListener('mouseleave', () => {
                tile.style.transform = '';
                tile.style.boxShadow = '';
            });
        });
    }
    
    addTileHoverEffects();

    // Form submission handling
    const commissionForm = document.getElementById('commissionForm');
    if (commissionForm) {
        commissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Disable button during submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate form submission
            setTimeout(() => {
                alert('Request submitted successfully! The artist will contact you soon.');
                commissionForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        });
    }
});
