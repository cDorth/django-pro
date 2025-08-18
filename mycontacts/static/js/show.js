
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const contactsGrid = document.getElementById('contactsGrid');
    const contactCards = document.querySelectorAll('.contact-card');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            contactCards.forEach(function(card) {
                const name = card.getAttribute('data-name');
                const relation = card.getAttribute('data-relation');
                const phone = card.querySelector('.fa-phone').nextElementSibling.textContent.toLowerCase();
                const email = card.querySelector('.fa-envelope').nextElementSibling.textContent.toLowerCase();
                
                const isMatch = name.includes(searchTerm) || 
                               relation.includes(searchTerm) || 
                               phone.includes(searchTerm) || 
                               email.includes(searchTerm);
                
                if (isMatch) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.3s ease-in';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide empty state
            const visibleCards = Array.from(contactCards).filter(card => 
                card.style.display !== 'none'
            );
            
            if (visibleCards.length === 0 && searchTerm !== '') {
                showNoResultsMessage();
            } else {
                hideNoResultsMessage();
            }
        });
    }

    // Auto-hide messages after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert) {
        setTimeout(function() {
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-20px)';
            setTimeout(function() {
                alert.remove();
            }, 300);
        }, 5000);
    });

    // Add smooth animations to contact cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    contactCards.forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    function showNoResultsMessage() {
        hideNoResultsMessage();
        
        const noResultsDiv = document.createElement('div');
        noResultsDiv.id = 'noResultsMessage';
        noResultsDiv.className = 'empty-state';
        noResultsDiv.innerHTML = `
            <i class="fas fa-search"></i>
            <h2>Nenhum contato encontrado</h2>
            <p>Tente ajustar sua busca ou adicione um novo contato</p>
        `;
        
        contactsGrid.parentNode.appendChild(noResultsDiv);
    }

    function hideNoResultsMessage() {
        const existingMessage = document.getElementById('noResultsMessage');
        if (existingMessage) {
            existingMessage.remove();
        }
    }

    // Add confirmation for delete actions
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            const contactName = this.closest('.contact-card').querySelector('h3').textContent;
            if (!confirm(`Tem certeza que deseja excluir o contato "${contactName}"?`)) {
                e.preventDefault();
            }
        });
    });
});

// Add CSS for fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
