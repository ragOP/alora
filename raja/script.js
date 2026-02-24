/**
 * lassi.js – All page scripts (moved from main.html inline)
 * FB pixel, scroll helper, video resolution, spacing fixes, thumbnail state, CTA tracking.
 */

!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1686948372258756');
fbq('track', 'PageView');
fbq('track', 'ViewContent');

function scrollToP4Section() {
    var img = document.querySelector('img[data-cta-scroll-target="p4"]') || document.querySelector('img[src*="p4.png"]');
    if (!img) return;
    var el = img.closest('div[role="presentation"]') || img.parentElement || img;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Resolve relative video URLs to absolute so videos play on live (step videos + testimonial videos)
document.addEventListener('DOMContentLoaded', function() {
    var docUrl = window.location.href;
    function resolve(url) {
        if (!url || url.indexOf('data:') === 0 || url.indexOf('http') === 0) return url;
        try { return new URL(url, docUrl).href; } catch (e) { return url; }
    }
    document.querySelectorAll('video[data-src]').forEach(function(v) {
        var url = v.getAttribute('data-src');
        if (url) {
            url = resolve(url);
            v.setAttribute('data-src', url);
            v.src = url;
        }
        v.querySelectorAll('source[data-src], source[src]').forEach(function(s) {
            var u = s.getAttribute('data-src') || s.getAttribute('src');
            if (u) { u = resolve(u); s.setAttribute('data-src', u); s.setAttribute('src', u); }
        });
        var firstSource = v.querySelector('source[src]');
        if (firstSource && firstSource.getAttribute('src') && !v.getAttribute('src')) v.src = resolve(firstSource.getAttribute('src'));
    });
    document.querySelectorAll('video source[src]').forEach(function(s) {
        var u = s.getAttribute('src');
        if (u) { u = resolve(u); s.setAttribute('src', u); }
    });
});

// Force reduce spacing between "And you're absolutely allowed" and "The Real Problem" - 50% closer
document.addEventListener('DOMContentLoaded', function() {
    const text14 = document.querySelector('[data-id="text-content-14"]');
    if (text14) {
        text14.style.marginBottom = '-15px';
        text14.style.paddingBottom = '0px';
    }

    const text57 = document.querySelector('[data-id="text-content-57"]');
    if (text57) {
        text57.style.marginTop = '-15px';
        text57.style.paddingTop = '0px';
        text57.style.marginBottom = '4px';
    }

    const rowGuCn = document.querySelector('[data-id="guCnZGx1ms"]');
    if (rowGuCn) {
        rowGuCn.style.marginBottom = '-10px';
    }

    const parentRow = document.querySelector('[data-id="goJWKk7H21"]');
    if (parentRow) {
        const children = parentRow.children;
        if (children.length > 0) {
            const lastChild = children[children.length - 1];
            if (lastChild && lastChild.querySelector('[data-id="text-content-57"]')) {
                lastChild.style.marginTop = '-15px';
                lastChild.style.paddingTop = '0px';
            }
        }
    }

    const allElements = document.querySelectorAll('*');
    let foundText14 = false;
    for (let el of allElements) {
        if (el.getAttribute('data-id') === 'text-content-14') {
            foundText14 = true;
        }
        if (foundText14 && el.getAttribute('data-id') === 'text-content-57') {
            break;
        }
        if (foundText14) {
            const mb = window.getComputedStyle(el).marginBottom;
            const mt = window.getComputedStyle(el).marginTop;
            const pt = window.getComputedStyle(el).paddingTop;
            const pb = window.getComputedStyle(el).paddingBottom;
            if (parseInt(mb) > 5) {
                el.style.marginBottom = Math.max(0, parseInt(mb) * 0.5) + 'px';
            }
            if (parseInt(mt) > 5) {
                el.style.marginTop = Math.max(0, parseInt(mt) * 0.5) + 'px';
            }
            if (parseInt(pt) > 5) {
                el.style.paddingTop = Math.max(0, parseInt(pt) * 0.5) + 'px';
            }
            if (parseInt(pb) > 5) {
                el.style.paddingBottom = Math.max(0, parseInt(pb) * 0.5) + 'px';
            }
        }
    }
});

// Unmute reveal videos (1.mp4, 2.mp4, 3.mp4) when user clicks play
document.addEventListener('click', function(e) {
    const embed = e.target.closest('gp-lite-html5-embed');
    if (!embed) return;
    const video = embed.querySelector('video[data-src]');
    if (!video) return;
    video.muted = false;
    video.controls = true;
}, true);

// Hide poster/thumbnail when video is playing so only video shows
function setThumbnailPlayingState(embed, video, thumb) {
    var playing = !video.paused;
    embed.classList.toggle('video-playing', playing);
    video.classList.toggle('is-playing', playing);
    if (thumb) thumb.classList.toggle('gp-thumbnail-hidden', playing);
}
function initHideThumbnailWhenPlaying() {
    document.querySelectorAll('gp-lite-html5-embed').forEach(function(embed) {
        var video = embed.querySelector('video');
        var thumb = embed.querySelector('.gp-thumbnail-video');
        if (!video) return;
        var run = function() { setThumbnailPlayingState(embed, video, thumb); };
        video.addEventListener('playing', run);
        video.addEventListener('pause', run);
        video.addEventListener('ended', run);
        run();
    });
}
function refreshThumbnailState() {
    document.querySelectorAll('gp-lite-html5-embed').forEach(function(embed) {
        var video = embed.querySelector('video');
        var thumb = embed.querySelector('.gp-thumbnail-video');
        if (video && thumb) setThumbnailPlayingState(embed, video, thumb);
    });
}
document.addEventListener('DOMContentLoaded', initHideThumbnailWhenPlaying);
window.addEventListener('load', function() {
    refreshThumbnailState();
    setTimeout(refreshThumbnailState, 300);
    setTimeout(refreshThumbnailState, 800);
});

// Guarantee CTA: optional fbq track on click; link navigates normally to cart URL
document.addEventListener('click', function(e) {
    var cta = e.target && e.target.closest && e.target.closest('a.guarantee-cta-btn');
    if (!cta || cta.getAttribute('href') !== 'https://alorament.com/cart/45733871354017:1') return;
    if (typeof fbq === 'function') {
        fbq('track', 'AddToCart', {
            content_name: 'Alorament Stride Heilungspaket',
            content_ids: ['alorament-stride-healing-package'],
            content_type: 'product'
        });
    }
}, true);
