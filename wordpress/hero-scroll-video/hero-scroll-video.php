<?php
/**
 * Plugin Name:       Hero Scroll Video
 * Plugin URI:        https://horizon-properties.example
 * Description:        Premium scroll-driven 3D hero video — scroll position scrubs the video timeline (never autoplays). Add [hero_scroll_video] to any page.
 * Version:           1.0.0
 * Author:            Horizon Properties
 * License:           GPL-2.0-or-later
 * Text Domain:       hero-scroll-video
 *
 * @package HeroScrollVideo
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Shortcode: [hero_scroll_video]
 *
 * Attributes:
 *   desktop_video  URL of the MP4 for screens >= 861px (required)
 *   mobile_video   URL of the lighter MP4 for screens <= 860px (optional, falls back to desktop)
 *   poster         URL of the first-frame JPG shown while loading (recommended)
 *   fallback       URL of a fallback image if the video fails (optional)
 *   kicker         Small label above the title
 *   title          Main headline (HTML allowed, use <br> for line breaks)
 *   subtitle       Supporting paragraph
 *   cta_text       Call-to-action button label (leave empty to hide the button)
 *   cta_url        Call-to-action button link
 *   scroll_height  CSS height of the scroll runway (default: 300vh)
 */
function hsv_shortcode( $atts ) {
	$atts = shortcode_atts(
		array(
			'desktop_video' => '',
			'mobile_video'  => '',
			'poster'        => '',
			'fallback'      => '',
			'kicker'        => 'Prime residential &amp; investment property',
			'title'         => 'Discover Exceptional<br>Homes &amp; Investments',
			'subtitle'      => 'Premium properties in prime locations. Find your dream home or the perfect investment with confidence.',
			'cta_text'      => 'Explore Properties',
			'cta_url'       => '#',
			'scroll_height' => '300vh',
		),
		$atts,
		'hero_scroll_video'
	);

	hsv_enqueue_assets();

	$desktop  = esc_url( $atts['desktop_video'] );
	$mobile   = $atts['mobile_video'] ? esc_url( $atts['mobile_video'] ) : $desktop;
	$poster   = esc_url( $atts['poster'] );
	$fallback = esc_url( $atts['fallback'] );

	$media_style = $poster ? ' style="background-image:url(\'' . $poster . '\')"' : '';
	$height_var  = esc_attr( $atts['scroll_height'] );

	ob_start();
	?>
	<section class="hero-scroll-wrap" style="--hsv-runway:<?php echo $height_var; ?>" aria-labelledby="hero-scroll-title">
		<div class="hero-scroll-viewport" data-status="loading">
			<div class="hero-scroll-media"<?php echo $media_style; ?>>
				<video class="hero-scroll-video"
					data-desktop="<?php echo esc_attr( $desktop ); ?>"
					data-mobile="<?php echo esc_attr( $mobile ); ?>"
					data-fallback="<?php echo esc_attr( $fallback ); ?>"
					<?php echo $poster ? 'poster="' . esc_attr( $poster ) . '"' : ''; ?>
					preload="auto"
					muted
					playsinline
					disablepictureinpicture
					aria-hidden="true"
					tabindex="-1">
				</video>
			</div>

			<span class="hero-scroll-overlay" aria-hidden="true"></span>

			<div class="hero-scroll-content">
				<p class="hero-scroll-kicker"><?php echo wp_kses_post( $atts['kicker'] ); ?></p>
				<h1 id="hero-scroll-title" class="hero-scroll-title"><?php echo wp_kses_post( $atts['title'] ); ?></h1>
				<p class="hero-scroll-subtitle"><?php echo wp_kses_post( $atts['subtitle'] ); ?></p>
				<?php if ( $atts['cta_text'] ) : ?>
					<a class="hero-scroll-cta" href="<?php echo esc_url( $atts['cta_url'] ); ?>">
						<?php echo esc_html( $atts['cta_text'] ); ?>
					</a>
				<?php endif; ?>
			</div>

			<div class="hero-scroll-loader" role="status" aria-live="polite">
				<span class="hero-scroll-loader-label">Preparing the tour</span>
				<span class="hero-scroll-loader-track">
					<span class="hero-scroll-loader-fill"></span>
				</span>
			</div>

			<span class="hero-scroll-fade" aria-hidden="true"></span>
		</div>
	</section>
	<?php
	return ob_get_clean();
}
add_shortcode( 'hero_scroll_video', 'hsv_shortcode' );

/**
 * Enqueue plugin CSS and JS — only called from inside the shortcode,
 * so assets load exclusively on pages that actually use the hero.
 */
function hsv_enqueue_assets() {
	$ver  = '1.0.0';
	$base = plugin_dir_url( __FILE__ );

	wp_enqueue_style(
		'hero-scroll-video-css',
		$base . 'css/hero-scroll.css',
		array(),
		$ver
	);

	wp_enqueue_script(
		'hero-scroll-video-js',
		$base . 'js/hero-scroll.js',
		array(),
		$ver,
		true
	);
}
