/* ==================================================================
   Hero Scroll Video — vanilla JS scroll-scrub engine
   No jQuery, no framework. Scroll position maps 0→1 onto the video
   timeline; the video is only ever *seeked*, never played.
   ================================================================== */
(function () {
	'use strict';

	var SMOOTHING = 0.28;       // lerp factor per animation frame
	var SNAP = 0.0012;          // progress delta below which we snap to target
	var MIN_SEEK = 0.012;       // seconds — ignore sub-frame scrubs
	var COPY_FADE_END = 0.45;   // progress at which hero copy is fully faded
	var READY_TIMEOUT = 12000;  // ms — reveal anyway if buffering stalls

	function clamp01(v) {
		return v < 0 ? 0 : v > 1 ? 1 : v;
	}

	function initHero(wrap) {
		var viewport = wrap.querySelector('.hero-scroll-viewport');
		var video = wrap.querySelector('.hero-scroll-video');
		var content = wrap.querySelector('.hero-scroll-content');
		var loader = wrap.querySelector('.hero-scroll-loader');
		var loaderFill = wrap.querySelector('.hero-scroll-loader-fill');
		var loaderLabel = wrap.querySelector('.hero-scroll-loader-label');

		if (!video || !viewport) return;

		/* ---- reduced motion: skip the scrub, show static poster ---- */
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			wrap.classList.add('hero-scroll-static');
			if (loader) loader.style.display = 'none';
			return;
		}

		/* ---- pick the right source for this viewport ---- */
		var isMobile = window.matchMedia('(max-width: 860px)').matches;
		var src = isMobile
			? (video.getAttribute('data-mobile') || video.getAttribute('data-desktop'))
			: video.getAttribute('data-desktop');
		if (!src) return;

		var duration = 0;
		var target = 0;
		var current = 0;
		var written = -1;
		var ready = false;
		var frame = null;
		var lastBuffered = -1;

		/* ---- helpers ---- */

		function readProgress() {
			var rect = wrap.getBoundingClientRect();
			var span = Math.max(1, rect.height - window.innerHeight);
			return clamp01(-rect.top / span);
		}

		function readBuffered() {
			if (!video.duration) return 0;
			var ranges = video.buffered;
			var end = 0;
			for (var i = 0; i < ranges.length; i++) {
				if (ranges.start(i) <= 0.05) end = Math.max(end, ranges.end(i));
			}
			return clamp01(end / video.duration);
		}

		function paintCopy(progress) {
			if (!content) return;
			var visibility = clamp01(1 - progress / COPY_FADE_END);
			content.style.opacity = visibility.toFixed(3);
			content.style.transform =
				'translate3d(0,' + (-30 * (1 - visibility)).toFixed(2) + 'px,0)';
			content.style.pointerEvents = visibility < 0.06 ? 'none' : '';
		}

		function seek(progress) {
			if (!ready || !duration) return;
			var time = progress * duration;
			if (Math.abs(time - written) < MIN_SEEK) return;
			written = time;
			video.currentTime = time;
		}

		/* ---- animation loop ---- */

		function tick() {
			frame = null;
			current += (target - current) * SMOOTHING;
			if (Math.abs(target - current) < SNAP) current = target;
			seek(current);
			paintCopy(current);
			if (current !== target) frame = requestAnimationFrame(tick);
		}

		function schedule() {
			if (frame === null) frame = requestAnimationFrame(tick);
		}

		function onScroll() {
			target = readProgress();
			schedule();
		}

		/* ---- video readiness ---- */

		function updateBuffer() {
			var value = readBuffered();
			if (value - lastBuffered >= 0.02 || value === 1) {
				lastBuffered = value;
				if (loaderFill) loaderFill.style.transform = 'scaleX(' + value + ')';
			}
		}

		function markReady() {
			if (ready) return;
			ready = true;
			viewport.setAttribute('data-status', 'ready');
			if (loader) loader.classList.add('hero-scroll-loader-done');
			if (loaderLabel) loaderLabel.textContent = '';
			current = target;
			written = -1;
			schedule();
		}

		function onMeta() {
			duration = video.duration || 0;
			onScroll();
			updateBuffer();
		}

		function onBuffered() {
			updateBuffer();
			if (video.readyState >= 3) markReady();
		}

		function onError() {
			viewport.setAttribute('data-status', 'error');
			wrap.classList.add('hero-scroll-static');
			if (loader) loader.style.display = 'none';
			var fallback = video.getAttribute('data-fallback');
			if (fallback) {
				var img = document.createElement('img');
				img.className = 'hero-scroll-fallback-img';
				img.src = fallback;
				img.alt = '';
				if (video.parentNode) video.parentNode.replaceChild(img, video);
			}
		}

		/* ---- load + listen ---- */

		video.src = src;
		video.load();

		video.addEventListener('loadedmetadata', onMeta);
		video.addEventListener('loadeddata', onMeta);
		video.addEventListener('canplay', onBuffered);
		video.addEventListener('canplaythrough', onBuffered);
		video.addEventListener('progress', onBuffered);
		video.addEventListener('error', onError);

		if (video.readyState >= 1) onMeta();
		if (video.readyState >= 3) markReady();

		var readyTimer = window.setTimeout(function () {
			if (video.readyState >= 1) markReady();
		}, READY_TIMEOUT);

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		window.addEventListener('orientationchange', onScroll);

		frame = requestAnimationFrame(function () {
			frame = null;
			onScroll();
		});
	}

	/* ---- init all heroes on the page ---- */

	function initAll() {
		var wraps = document.querySelectorAll('.hero-scroll-wrap');
		for (var i = 0; i < wraps.length; i++) {
			initHero(wraps[i]);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initAll);
	} else {
		initAll();
	}
})();
