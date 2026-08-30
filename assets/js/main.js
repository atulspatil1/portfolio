(function () {
            var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            var yearEl = document.getElementById("year");
            if (yearEl) yearEl.textContent = String(new Date().getFullYear());

            var revealables = document.querySelectorAll(".reveal");

            // Mobile Menu Toggle
            var toggleBtn = document.querySelector('.mobile-menu-toggle');
            var navLinks = document.getElementById('primary-navigation');
            var iconMenu = document.querySelector('.icon-menu');
            var iconClose = document.querySelector('.icon-close');

            if (toggleBtn && navLinks) {
                toggleBtn.addEventListener('click', function() {
                    var isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
                    toggleBtn.setAttribute('aria-expanded', !isExpanded);
                    navLinks.classList.toggle('active');
                    
                    if (isExpanded) {
                        iconMenu.style.display = 'block';
                        iconClose.style.display = 'none';
                    } else {
                        iconMenu.style.display = 'none';
                        iconClose.style.display = 'block';
                    }
                });

                // Close menu when clicking a link
                var navItems = navLinks.querySelectorAll('a');
                navItems.forEach(function(item) {
                    item.addEventListener('click', function() {
                        toggleBtn.setAttribute('aria-expanded', 'false');
                        navLinks.classList.remove('active');
                        iconMenu.style.display = 'block';
                        iconClose.style.display = 'none';
                    });
                });
            }
            if (reduce || !("IntersectionObserver" in window)) {
                revealables.forEach(function (el) {
                    el.classList.add("is-visible");
                });
            } else {
                var io = new IntersectionObserver(
                    function (entries) {
                        entries.forEach(function (entry) {
                            if (entry.isIntersecting) {
                                entry.target.classList.add("is-visible");
                                io.unobserve(entry.target);
                            }
                        });
                    },
                    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
                );
                revealables.forEach(function (el, i) {
                    el.style.transitionDelay = Math.min(i % 6, 5) * 60 + "ms";
                    io.observe(el);
                });
            }
            // Background Motif Rotation
            var motifs = [
                'black-buti.png',
                'blue-padma.png',
                'red-kamal.png'
            ];
            
            var heroBgEl = document.querySelector('.hero-bg');
            if (heroBgEl) {
                var currentMotifIndex = Math.floor(Math.random() * motifs.length);
                heroBgEl.style.backgroundImage = "url('assets/motifs/" + motifs[currentMotifIndex] + "')";
                
                setInterval(function() {
                    currentMotifIndex = (currentMotifIndex + 1) % motifs.length;
                    heroBgEl.style.backgroundImage = "url('assets/motifs/" + motifs[currentMotifIndex] + "')";
                }, 10000);
            }

        })();