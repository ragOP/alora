/**
 * aman/script.js – Optimized page scripts (no component loader).
 * FB pixel, scroll helper, video resolution, testimonial play, CTA tracking.
 */
(function() {
  'use strict';

  /* Facebook Pixel */
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

  /* Resolve relative video URLs to absolute */
  function resolveUrl(url, base) {
    if (!url || url.indexOf('data:') === 0 || url.indexOf('http') === 0) return url;
    try { return new URL(url, base).href; } catch (e) { return url; }
  }

  function initVideos() {
    var base = window.location.href;
    document.querySelectorAll('video[src]').forEach(function(v) {
      var u = v.getAttribute('src');
      if (u) v.setAttribute('src', resolveUrl(u, base));
    });
    document.querySelectorAll('video source[src]').forEach(function(s) {
      var u = s.getAttribute('src');
      if (u) s.setAttribute('src', resolveUrl(u, base));
    });
  }

  /* Testimonials proof: play button toggles video */
  function initTestimonialPlay() {
    document.querySelectorAll('.testimonials-proof__play').forEach(function(btn) {
      var media = btn.closest('.testimonials-proof__media');
      var video = media && media.querySelector('.testimonials-proof__video');
      if (!video) return;
      function setPlaying() {
        video.classList.toggle('is-playing', !video.paused);
      }
      video.addEventListener('playing', setPlaying);
      video.addEventListener('pause', setPlaying);
      video.addEventListener('ended', setPlaying);
      btn.addEventListener('click', function() {
        if (video.paused) {
          video.play();
          video.muted = false;
          video.controls = true;
        } else {
          video.pause();
        }
      });
    });
  }

  /* Guarantee CTA: optional fbq track on click */
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initVideos();
      initTestimonialPlay();
    });
  } else {
    initVideos();
    initTestimonialPlay();
  }
})();
