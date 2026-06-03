/**
 * Custom JavaScript for TechRecruit Theme
 * Handles sticky header, mobile nav drawer, megamenu toggles, and AJAX newsletter form.
 */
(function($) {
    'use strict';

    $(document).ready(function() {

        /* ==========================================
           1. STICKY HEADER SCROLL ANIMATION
           ========================================== */
        var $header = $('#rec-header, .ekit-template-content-header');
        
        function checkScroll() {
            if ($(window).scrollTop() > 30) {
                $header.addClass('is-scrolled');
            } else {
                $header.removeClass('is-scrolled');
            }
        }

        // Run on load and scroll
        checkScroll();
        $(window).on('scroll', checkScroll);


        /* ==========================================
           2. MOBILE HAMBURGER MENU DRAWER
           ========================================== */
        var $toggleBtn = $('#rec-menu-toggle-btn');
        var $navMenu = $('#rec-nav-menu');
        
        $toggleBtn.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $toggleBtn.toggleClass('is-active');
            $navMenu.toggleClass('is-active');
            
            // Prevent body scroll when menu is active on mobile
            if ($navMenu.hasClass('is-active')) {
                $('body').css('overflow', 'hidden');
            } else {
                $('body').css('overflow', '');
            }
        });

        // Close drawer when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('#rec-header').length && $navMenu.hasClass('is-active')) {
                $toggleBtn.removeClass('is-active');
                $navMenu.removeClass('is-active');
                $('body').css('overflow', '');
            }
        });


        /* ==========================================
           3. MOBILE MEGAMENU TOGGLE (CLICK TO SHOW)
           ========================================== */
        // Target both our custom megamenu and ElementsKit's megamenu/submenu items (supporting standard menu dropdown classes)
        $(document).on('click', '.elementskit-megamenu-has > a, .menu-item-has-children > a, .elementskit-has-submenu > a, .rec-nav-item-megamenu > a', function(e) {
            if ($(window).width() <= 1024) {
                var $link = $(this);
                var $parentLi = $link.parent();
                
                // Locate the expandable panel (megamenu or submenu dropdown)
                var $panel = $parentLi.children('.elementskit-megamenu-panel, .elementskit-submenu-panel, .rec-megamenu-panel');
                
                if ($panel.length > 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Collapse any other open panels at the same level for a premium accordion effect
                    $parentLi.siblings().removeClass('ekit-dropdown-open is-open').children('.elementskit-megamenu-panel, .elementskit-submenu-panel, .rec-megamenu-panel').slideUp(300);
                    
                    // Toggle current panel
                    $parentLi.toggleClass('ekit-dropdown-open is-open');
                    $panel.slideToggle(300);
                }
            }
        });


        /* ==========================================
           4. AJAX NEWSLETTER SUBMISSION WITH PREMIUM UX
           ========================================== */
        var $newsletterForm = $('#rec-newsletter-form');
        var $responseMsg = $('#rec-newsletter-response');
        
        $newsletterForm.on('submit', function(e) {
            e.preventDefault();
            
            var emailVal = $('#rec-newsletter-email').val();
            var $submitBtn = $newsletterForm.find('.rec-newsletter-btn');
            
            // Show premium loading state
            $submitBtn.prop('disabled', true).html('Äang xá»­ lÃ½ <i class="fa-solid fa-circle-notch fa-spin"></i>');
            $responseMsg.removeClass('is-success').hide();

            $.ajax({
                url: recruitment_ajax.ajax_url,
                type: 'POST',
                data: {
                    action: 'newsletter_signup',
                    email: emailVal,
                    nonce: recruitment_ajax.nonce
                },
                success: function(response) {
                    if (response.success) {
                        // Success micro-interaction
                        $responseMsg.addClass('is-success')
                                    .text(response.data.message)
                                    .fadeIn(300);
                        
                        // Reset input
                        $('#rec-newsletter-email').val('');
                        
                        // Re-enable button with success icon
                        $submitBtn.prop('disabled', false).html('ÄÄƒng KÃ½ ThÃ nh CÃ´ng <i class="fa-solid fa-circle-check"></i>');
                        
                        // Restore button text after 3 seconds
                        setTimeout(function() {
                            $submitBtn.html('ÄÄƒng KÃ½ Ngay <i class="fa-solid fa-paper-plane"></i>');
                        }, 3000);
                    } else {
                        // Error handling
                        $responseMsg.removeClass('is-success')
                                    .css('color', '#ef4444')
                                    .text(response.data.message)
                                    .fadeIn(300);
                        
                        $submitBtn.prop('disabled', false).html('ÄÄƒng KÃ½ Tháº¥t Báº¡i <i class="fa-solid fa-circle-xmark"></i>');
                        
                        setTimeout(function() {
                            $submitBtn.html('ÄÄƒng KÃ½ Ngay <i class="fa-solid fa-paper-plane"></i>');
                        }, 3000);
                    }
                },
                error: function() {
                    $responseMsg.removeClass('is-success')
                                .css('color', '#ef4444')
                                .text('CÃ³ lá»—i káº¿t ná»‘i xáº£y ra. Vui lÃ²ng thá»­ láº¡i sau.')
                                .fadeIn(300);
                    
                    $submitBtn.prop('disabled', false).html('Thá»­ Láº¡i <i class="fa-solid fa-rotate"></i>');
                }
            });
        });

        /* ==========================================
           5. NATIVE ELEMENTOR SEARCH FORM SUBMISSION (Screenshot 8)
           ========================================== */
        $(document).on('click', '.rec-main-search-card .rec-search-submit a', function(e) {
            e.preventDefault();
            
            var $searchCard = $(this).closest('.rec-main-search-card');
            var keyword = $searchCard.find('input[name="s"]').val();
            var category = $searchCard.find('select[name="category"]').val();
            
            // Build the standard WordPress search query URL
            var searchUrl = '../../../../../?s=' + encodeURIComponent(keyword);
            if (category) {
                searchUrl += '&category=' + encodeURIComponent(category);
            }
            
            // Redirect to search results page
            window.location.href = searchUrl;
        });

        // Also submit form when pressing Enter key in the search input
        $(document).on('keypress', '.rec-main-search-card input[name="s"]', function(e) {
            if (e.which === 13) { // Enter key
                e.preventDefault();
                $(this).closest('.rec-main-search-card').find('.rec-search-submit a').trigger('click');
            }
        });

        /* ==========================================
           6. BULLETPROOF MEGAMENU HOVER WITH DEBOUNCE
           ========================================== */
        // Target both ElementsKit megamenu and our custom fallback megamenu
        var $megaItem = $('.elementskit-navbar-nav > li.elementskit-megamenu-has, .rec-nav-item-megamenu');
        var hoverTimeout;

        $megaItem.on('mouseenter', function() {
            var $this = $(this);
            clearTimeout(hoverTimeout);
            $megaItem.removeClass('ekit-hovered is-hovered');
            $this.addClass($this.hasClass('rec-nav-item-megamenu') ? 'is-hovered' : 'ekit-hovered');
        });

        $megaItem.on('mouseleave', function() {
            var $this = $(this);
            hoverTimeout = setTimeout(function() {
                $this.removeClass('ekit-hovered is-hovered');
            }, 200); // 200ms safe transition bridge
        });

        // Ensure moving inside the megamenu panel keeps the menu active
        $(document).on('mouseenter', '.elementskit-megamenu-panel, .rec-megamenu-panel', function() {
            clearTimeout(hoverTimeout);
            $megaItem.addClass(function() {
                return $(this).hasClass('rec-nav-item-megamenu') ? 'is-hovered' : 'ekit-hovered';
            });
        });

        $(document).on('mouseleave', '.elementskit-megamenu-panel, .rec-megamenu-panel', function() {
            hoverTimeout = setTimeout(function() {
                $megaItem.removeClass('ekit-hovered is-hovered');
            }, 200);
        });

        // Close Megamenu instantly when scrolling down to prevent it from sticking on the screen
        $(window).on('scroll', function() {
            $megaItem.removeClass('ekit-hovered is-hovered');
        });

    });
})(jQuery);



