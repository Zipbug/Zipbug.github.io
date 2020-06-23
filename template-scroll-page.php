<?php
/**
 *
 * Template Name: Scrolling Page
 *
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Kindig
 */
?>
<!DOCTYPE html>
<!--[if lt IE 7 ]> <html <?php language_attributes(); ?> class="no-js lt-ie10 lt-ie9 lt-ie8 lt-ie7 ie6"> <![endif]-->
<!--[if IE 7 ]>    <html <?php language_attributes(); ?> class="no-js lt-ie10 lt-ie9 lt-ie8 ie7"> <![endif]-->
<!--[if IE 8 ]>    <html <?php language_attributes(); ?> class="no-js lt-ie10 lt-ie9 ie8 > <![endif]-->
<!--[if IE 9 ]>    <html <?php language_attributes(); ?> class="no-js lt-ie10 ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html <?php language_attributes(); ?> class="no-js"> <!--<![endif]-->
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<link href='//fonts.googleapis.com/css?family=Oswald:400,700' rel='stylesheet' type='text/css'>
<link href='//fonts.googleapis.com/css?family=Roboto+Slab:400,700' rel='stylesheet' type='text/css'>

<link rel="icon" href="https://www.kindigit.com/favicon.ico" type="image/x-icon">
<link rel="shortcut icon" href="https://www.kindigit.com/favicon.ico" type="image/x-icon">
<meta name="format-detection" content="telephone=no">
<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/scrollingPage.css">
<?php wp_head(); ?>
<!--[if lte IE 9]>
	<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/ie9.css">
<![endif]-->
<script src="<?php bloginfo('template_directory'); ?>/js/vendor/modernizr-3.3.1-min.js"></script>

</head>

<body <?php body_class(); ?>>
	<!--[if lt IE 7]>
		<p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
	<![endif]-->

	<?php if (kindigit_show_preloader()): ?>
		<div id="loading">
			<div id="loading-images">
				<img src="<?php bloginfo('template_directory'); ?>/images/logo-kindig-white.png" alt="">
				<img id="loading-gif" src="<?php bloginfo('template_directory'); ?>/images/dot_preloader.gif" alt="">
			</div>
		</div>
	<?php endif ?>

	<div id="container" class="<?php echo is_page_template('template-home.php') ? 'homepage' : ''; ?>">
		<header id="header-container">
			<div id="header" class="clearfix">
				<a href="<?php echo home_url(); ?>" id="header-logo" class="sprite hide-text">Kindig It</a>
				<?php
					if ( is_archive() || is_single() || is_page() ) {
				?>
					<h1>
						<?php if ( is_single() ): ?>
							<a href="<?php echo get_post_type_archive_link( get_post_type() ); ?>">
						<?php endif ?>
						<?php if ( is_single() ): ?>
							<?php
								$post_type = get_post_type_object( get_post_type() );
								echo $post_type->labels->name;
							?>
						<?php elseif (is_post_type_archive('gallery') ): ?>
							Gallery
						<?php elseif (is_post_type_archive('faq') ): ?>
							Frequently Asked Questions
						<?php elseif (is_archive() ): ?>
							<?php
								$post_type = get_post_type_object( get_post_type() );
								echo $post_type->labels->name;
							?>
						<?php else: ?>
							<?php the_title(); ?>
						<?php endif ?>
						<?php if ( is_single() ): ?>
							</a>
						<?php endif ?>
					</h1>
				<?php
					}
				?>
				<a href="#" id="hamburger">
					<span></span>
					<span></span>
					<span></span>
				</a>
			</div>
			<?php
				if ( is_archive() && get_post_type() == 'gallery' ) {
			?>
				<div id="filters-container">
					<span id="filters-title" class="show-on-phone">All Builds</span>
					<nav id="filters">
						<a href="<?php echo get_post_type_archive_link( 'gallery' ); ?>" <?php echo !is_tax() && !is_tag() && !is_category() ? 'class="active"' : ''; ?>>All Builds</a>
						<?php
						$taxonomies = array(
						    'car-type'
						);

						$args = array(
						    'orderby'           => 'id',
						    'order'             => 'ASC',
						    'hide_empty'        => false
						);

						$categories = get_terms($taxonomies, $args);
						foreach ($categories as $category) :
							?>
							<?php if ( is_tax() || is_tag() || is_category() ):
							$page = get_queried_object()->term_id;
							$current = $category->term_id;
							?>
								<a href="<?php echo get_term_link( $category ); ?>" <?php echo $page == $current ? 'class="active"' : ''; ?>><?php else: ?><a href="<?php echo get_term_link( $category ); ?>"><?php endif ?><?php echo $category->name; ?></a>
						<?php endforeach; ?>
					</nav>
				</div>
			<?php
				} elseif ( is_single() && get_post_type() == 'gallery' ) {
			?>
				<nav id="gallery-detail-nav-container">
					<div id="gallery-detail-nav">
						<?php

						$prev_post = kindigit_get_adjacent_post($post, true);
						$prev_id = $prev_post->ID;

						$next_post = kindigit_get_adjacent_post($post, false);
						$next_id = $next_post->ID;

						if ( $prev_id ): ?>
							<a href="<?php echo get_permalink($prev_post); ?>" class="prev">
								<span class="nav-arrow"></span>
								<span class="nav-text">Prev</span>
								<span class="nav-arrow"></span>
							</a>
						<?php endif ?>

						<h1 class="car-title"><?php the_title(); ?></h1>

						<?php
						if ( $next_id ): ?>
							<a href="<?php echo get_permalink($next_post); ?>" class="next">
								<span class="nav-arrow"></span>
								<span class="nav-text">Next</span>
								<span class="nav-arrow"></span>
							</a>
						<?php endif; ?>
					</div>
				</nav>
			<?php
				}
			?>
		</header> <!-- End of Header -->
		<section id="main-nav-container">
			<a href="#" class="close-button"></a>
			<div class="vertical-container">
				<div class="vertical-center">
					<nav id="main-nav">
						<?php
						  $menu_name = 'primary';
						  $locations = get_nav_menu_locations();
						  $menu = wp_get_nav_menu_object( $locations[ $menu_name ] );
						  $menuitems = wp_get_nav_menu_items( $menu->term_id, array( 'order' => 'DESC' ) );
						?>
						<ul id="main-links">
							<?php
							    foreach( $menuitems as $item ):
							        $link = $item->url;
							        $title = $item->title;
							        $target = "";

							        if($title == 'Store') {
							        	$target = "_blank";
							        }
						    ?>
							<li>
						        <a href="<?php echo $link; ?>" target="<?php echo $target; ?>">
						            <?php echo $title; ?>
						        </a>
						    </li>
							<?php endforeach; ?>
						</ul>
						<?php
						  $menu_name = 'secondary';
						  $locations = get_nav_menu_locations();
						  $menu = wp_get_nav_menu_object( $locations[ $menu_name ] );
						  $menuitems = wp_get_nav_menu_items( $menu->term_id, array( 'order' => 'DESC' ) );
						?>
						<ul id="sub-links">
							<?php
							    foreach( $menuitems as $item ):
							        $link = $item->url;
							        $title = $item->title;
						    ?>
							<li>
						        <a href="<?php echo $link; ?>">
						            <?php echo $title; ?>
						        </a>
						    </li>
							<?php endforeach; ?>
						</ul>
						<nav class="social-media">
							<?php if(!get_option('general_setting_facebook') == '') : ?>
								<a href="<?php echo get_option('general_setting_facebook'); ?>" target="_blank" class="facebook sprite hide-text"></a>
							<?php endif; ?>
							<?php if(!get_option('general_setting_twitter') == '') : ?>
								<a href="<?php echo get_option('general_setting_twitter'); ?>" target="_blank" class="twitter sprite hide-text"></a>
							<?php endif; ?>
							<?php if(!get_option('general_setting_youtube') == '') : ?>
								<a href="<?php echo get_option('general_setting_youtube'); ?>" target="_blank" class="youtube sprite hide-text"></a>
							<?php endif; ?>
							<?php if(!get_option('general_setting_instagram') == '') : ?>
								<a href="<?php echo get_option('general_setting_instagram'); ?>" target="_blank" class="instagram sprite hide-text"></a>
							<?php endif; ?>
						</nav>
					</nav>
				</div>
			</div>
		</section> <!-- End of Main Nav -->
		<div id="main">
  <div class="loader">
    <img src="<?php bloginfo('template_directory'); ?>/images/logo_black.jpg" alt="Kindigit Logo">
    <div class="spinner">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>
  </div>
  <div class="scrolling-shell">
    <div class="side-crumbs">
      <div class="crumb start-crumb active"><span class="start">Our <span class="bold">process</span></span></div>
      <div class="crumb stage">stage <span class="bold">01</span></div>
      <div class="crumb stage">stage <span class="bold">02</span></div>
      <div class="crumb stage">stage <span class="bold">03</span></div>
      <div class="crumb stage">stage <span class="bold">04</span></div>
      <div class="crumb stage">stage <span class="bold">05</span></div>
      <div class="crumb stage">stage <span class="bold">06</span></div>
      <div class="crumb stage">stage <span class="bold">07</span></div>
    </div>

    <div class="pages">
      <section class="scroll_section">
        <div class="scroll_section__background"></div>
        <div class="scroll_section__text">
          <h2>WHAT MAKES US<div class="thin">Different</div>
          </h2>
          Meticulous attention to detail. That's what makes every car we produce a Bitchin' Ride. From start to finish, we move through every step of our process with painstaking precision.
        </div>
      </section>
      <section class="scroll_section">
        <div class="scroll_section__background"></div>
        <div class="scroll_section__text">
          <h2>The<div class="thin">Vision</div>
          </h2>
          It all starts with brainstorming big ideas. Our customers' four-wheeled fantasies collide with Dave's killer creativity, the sparks fly, and a dream car is ready to come to life. Every build is different-from cool classics to crazy
          customs-but each car is a one-of-a-kind labor of love that could only be made by Kindig-it Design.
        </div>
      <img src="<?php bloginfo('template_directory'); ?>/images/vision_icon.svg" class="mobile-icon" alt="Vision Icon" />
      </section>
      <section class="scroll_section">
        <div class="scroll_section__background"></div>
        <div class="scroll_section__text">
          <h2>The<div class="thin">Design</div>
          </h2>
          During the design stage, our mad genius awakens. Dave sketches out the concept in amazing detail. Body lines, stance, fenders, trim, lighting, glass-each component begins to take shape. With the exterior rendering in place, our team
          starts to breathe life into the vehicle off the paper. The chassis, engine, wiring, and interior move from concept to reality.
        </div>
      <img src="<?php bloginfo('template_directory'); ?>/images/design_icon.svg" class="mobile-icon" alt="Design Icon" />
      </section>
      <section class="scroll_section">
        <div class="scroll_section__background"></div>
        <div class="scroll_section__text">
          <h2>The<div class="thin">Fabrication</div>
          </h2>
          This is where the dirty work is done. We acid dip, media blast, strengthen, repair, replace-whatever's needed to get the framework ready. We'll stretch, widen, chop, or change everything from wheel wells to wiring and engine bays to
          brakes until it's perfect. It ain't sexy, but it's essential.
        </div>
      <img src="<?php bloginfo('template_directory'); ?>/images/fabrication_icon.svg" class="mobile-icon" alt="Fabrication Icon" />
      </section>
      <section class="scroll_section">
        <div class="scroll_section__background"></div>
        <div class="scroll_section__text">
          <h2>The<div class="thin">Body</div>
          </h2>
          Grinding. Polishing. Perfecting. We spend hundreds of hours making sure each vehicle is flawless, from the engine bay to the bumpers. We're talking perfect reflections at a 3/4 angle, without any deviation between panels. Our team then
          creates beautiful, custom colors to paint each vehicle-many of which end up in the Modern Classic paint line.
        </div>
        <img src="<?php bloginfo('template_directory'); ?>/images/body_icon.svg" class="mobile-icon" alt="Body Icon" />
      </section>
      <section class="scroll_section">
        <div class="scroll_section__background"></div>
        <div class="scroll_section__text">
          <h2>The<div class="thin">Engine</div>
          </h2>
          Now it's time to reassemble the chassis with the hardware, transmission, engine, and exhaust-which have all been plated, chromed, or detailed to the theme of the build. We take meticulous effort to make sure wiring is hidden, stereo
          systems are booming, and engines are purring with custom intake manifolds and exhaust headers. Our cars produce anywhere from 300 to 3,000 horsepower, depending on our customers' wants and needs.
        </div>
      <img src="<?php bloginfo('template_directory'); ?>/images/engine_icon.svg" class="mobile-icon" alt="Engine Icon" />
      </section>
      <section class="scroll_section">
        <div class="scroll_section__background"></div>
        <div class="scroll_section__text">
          <h2>The<div class="thin">Interior</div>
          </h2>
          Dave and Justin Stephens (of JS Custom Interiors) have been working together longer than Kindig-it has been in business. Justin is able to transform Dave's renderings into true works of award-winning art, crafting hand-built door panels,
          center consoles, dashboards, leather headliners, and more for our cars. Justin's interior fabrication shop is located in our building, giving us complete control over quality, logistics, and timing.
        </div>
      <img src="<?php bloginfo('template_directory'); ?>/images/interior_icon.svg" class="mobile-icon" alt="Interior Icon" />
      </section>
      <section class="scroll_section">
        <div class="scroll_section__background"></div>
        <div class="scroll_section__text">
          <h2>The<div class="thin">Reveal</div>
          </h2>
          Once we finish a vehicle, we try to keep the final look under wraps until our customers can experience it first-hand. When they see their Kindig-it car for the first time, they're able to take in the art, the stance, the color, the
          smell, the sound, and the excitement all at once. Watching these reactions and seeing the surprise and satisfaction of our customers makes the months of hard work completely worthwhile.
        </div>
      <img src="<?php bloginfo('template_directory'); ?>/images/reveal_icon.svg" class="mobile-icon" alt="Reveal Icon" />
      </section>
			<section class="scroll_section">
				<?php
			  /**
			   * The template for displaying the footer.
			   *
			   * Contains the closing of the #content div and all content after
			   *
			   * @package Kindig
			   */

			  ?>
			  		<?php if ( !is_home() && !is_page( 'privacy-policy' )): ?>
			  			<nav id="cta-buttons" class="clearfix">
			  			<?php if ( is_singular( 'gallery' ) ): ?>
			  				<a href="<?php echo get_post_type_archive_link( 'gallery' ); ?>">
			  					<img src="<?php bloginfo('template_directory'); ?>/images/cta-gallery.jpg" alt="">
			  					<div class="cta-content vertical-container">
			  						<div class="vertical-center">
			  							<p>View Full Gallery</p>
			  						</div>
			  					</div>
			  				</a>
			  				<?php
			  					$next_post = kindigit_get_adjacent_post($post, false);
			  					$img_src = wp_get_attachment_image_src( $cfs->get('next_car_image', $next_post->ID), 'full' );
			  					$img_url = $img_src[0];
			  				?>
			  				<a href="<?php echo get_permalink( $next_post->ID ); ?>">
			  					<img src="<?php echo $img_url; ?>" alt="">
			  					<div class="cta-content vertical-container">
			  						<div class="vertical-center">
			  							<p><span>Next Car</span><?php echo $next_post->post_title; ?></p>
			  						</div>
			  					</div>
			  				</a>
			  			<?php else: ?>
			  				<?php if ( is_post_type_archive( 'calendar' ) ): ?>
			  					<a href="<?php echo home_url( 'show' ); ?>">
			  						<img src="<?php bloginfo('template_directory'); ?>/images/cta-show.jpg" alt="">
			  						<div class="cta-content vertical-container">
			  							<div class="vertical-center">
			  								<p>View Show</p>
			  							</div>
			  						</div>
			  					</a>
			  				<?php endif ?>
			  				<?php if ( is_page( 'contact' ) || is_post_type_archive( 'calendar' ) ) : ?>
			  					<a href="<?php echo home_url( 'team' ); ?>">
			  						<img src="<?php bloginfo('template_directory'); ?>/images/cta-team.jpg" alt="">
			  						<div class="cta-content vertical-container">
			  							<div class="vertical-center">
			  								<p>Meet the Team</p>
			  							</div>
			  						</div>
			  					</a>
			  				<?php endif ?>
			  				<?php if ( !is_post_type_archive( array( 'gallery', 'calendar' ) ) && !is_tax( 'car-type' ) ): ?>
			  					<a href="<?php echo get_post_type_archive_link( 'gallery' ); ?>">
			  						<img src="<?php bloginfo('template_directory'); ?>/images/cta-gallery.jpg" alt="">
			  						<div class="cta-content vertical-container">
			  							<div class="vertical-center">
			  								<p>View Car Gallery</p>
			  							</div>
			  						</div>
			  					</a>
			  				<?php endif ?>
			  				<?php if ( is_page('team') || is_post_type_archive( 'gallery' ) || is_tax( 'car-type' ) ): ?>
			  					<a href="<?php echo home_url( 'show' ); ?>">
			  						<img src="<?php bloginfo('template_directory'); ?>/images/cta-show.jpg" alt="">
			  						<div class="cta-content vertical-container">
			  							<div class="vertical-center">
			  								<p>View Show</p>
			  							</div>
			  						</div>
			  					</a>
			  				<?php endif ?>
			  				<?php if ( !is_page( 'contact' ) && !is_page( 'team' ) && !is_post_type_archive( 'calendar' ) ) : ?>
			  					<a href="//www.kindigitapparel.com">
			  						<img src="<?php bloginfo('template_directory'); ?>/images/cta-shop.jpg" alt="">
			  						<div class="cta-content vertical-container">
			  							<div class="vertical-center">
			  								<p>Shop Apparel</p>
			  							</div>
			  						</div>
			  					</a>
			  				<?php endif ?>
			  			<?php endif ?>
			  			</nav> <!-- End of CTA Buttons -->
			  		<?php endif ?>
			  		<footer id="footer-container">
			  			<div id="footer" class="clearfix">
			  				<a href="http://www.kindigit.com/" id="footer-logo" class="sprite hide-text">Kindigit</a>
			  				<nav class="clearfix">
			  					<?php
			  					  $menu_name = 'footer';
			  					  $locations = get_nav_menu_locations();
			  					  $menu = wp_get_nav_menu_object( $locations[ $menu_name ] );
			  					  $menuitems = wp_get_nav_menu_items( $menu->term_id, array( 'order' => 'DESC' ) );
			  					?>
			  					<ul>
			  						<?php
			  							$f = 1;
			  							foreach( $menuitems as $item ):
			  								$link = $item->url;
			  								$title = $item->title;
			  								$privacyPolicyClass = "";
			  								if( $title == "Privacy Policy" ){
			  									$privacyPolicyClass = ' class="privacy-policy"';
			  								}
			  							?>
			  							<li<?php echo $privacyPolicyClass; ?>><a href="<?php echo $link; ?>"><?php echo $title; ?></a></li>
			  							<?php if ( $f % 4 == 0 && $f < count($menuitems) ): ?>
			  								</ul>
			  								<ul>
			  							<?php endif; ?>
			  						<?php $f++; endforeach; ?>
			  						<li>
			  							<nav class="social-media">
			  								<?php if(!get_option('general_setting_facebook') == '') : ?>
			  									<a href="<?php echo get_option('general_setting_facebook'); ?>" target="_blank" class="facebook sprite hide-text"></a>
			  								<?php endif; ?>
			  								<?php if(!get_option('general_setting_twitter') == '') : ?>
			  									<a href="<?php echo get_option('general_setting_twitter'); ?>" target="_blank" class="twitter sprite hide-text"></a>
			  								<?php endif; ?>
			  								<?php if(!get_option('general_setting_youtube') == '') : ?>
			  									<a href="<?php echo get_option('general_setting_youtube'); ?>" target="_blank" class="youtube sprite hide-text"></a>
			  								<?php endif; ?>
			  								<?php if(!get_option('general_setting_instagram') == '') : ?>
			  									<a href="<?php echo get_option('general_setting_instagram'); ?>" target="_blank" class="instagram sprite hide-text"></a>
			  								<?php endif; ?>
			  							</nav>
			  						</li>
			  					</ul>
			  				</nav>
			  				<p>&copy;<?php echo date('Y'); ?> Kindig It Design. All Rights Reserved.</p>
			  			</div>
			  		</footer> <!-- End of Footer -->
			</section>
    </div>
  </div>
  <div class="icon_menu">
    <span class="icon">
      <img src="<?php bloginfo('template_directory'); ?>/images/vision_icon.svg" alt="Vision Icon" />
    </span>
    <span class="icon inactive">
      <img src="<?php bloginfo('template_directory'); ?>/images/design_icon.svg" alt="Design Icon" />
    </span>
    <span class="icon inactive">
      <img src="<?php bloginfo('template_directory'); ?>/images/fabrication_icon.svg" alt="Fabrication Icon" />
    </span>
    <span class="icon inactive">
      <img src="<?php bloginfo('template_directory'); ?>/images/body_icon.svg" alt="Body Icon" />
    </span>
    <span class="icon inactive">
      <img src="<?php bloginfo('template_directory'); ?>/images/engine_icon.svg" alt="Engine Icon" />
    </span>
    <span class="icon inactive">
      <img src="<?php bloginfo('template_directory'); ?>/images/interior_icon.svg" alt="Interior Icon" />
    </span>
    <span class="icon inactive">
      <img src="<?php bloginfo('template_directory'); ?>/images/reveal_icon.svg" alt="Reveal Icon" />
    </span>
  </div>
  <div class="circle">
    <span class="active-number">01</span>
    <div class="circle-path">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 545.6 545.6">
        <title>circle_path</title>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <circle class="path-bg" cx="272.8" cy="272.3" r="258" />
            <g class="path-point active">
              <circle class="path-stroke" cx="530.8" cy="273.3" r="4.8" />
              <circle class="path-pulse" cx="530.8" cy="273.3" r="13" />
              <circle class="path-inner" cx="530.8" cy="273.3" r="4.8" />
            </g>
            <g class="path-point">
              <circle class="path-stroke" cx="454.88" cy="455.59" r="4.8" />
              <circle class="path-pulse" cx="454.88" cy="455.59" r="0" />
              <circle class="path-inner" cx="454.88" cy="455.59" r="4.8" />
            </g>
            <g class="path-point">
              <circle class="path-stroke" cx="273.3" cy="530.8" r="4.8" />
              <circle class="path-pulse" cx="273.3" cy="530.8" r="0" />
              <circle class="path-inner" cx="273.3" cy="530.8" r="4.8" />
            </g>
            <g class="path-point">
              <circle class="path-stroke" cx="90.72" cy="455.59" r="4.8" />
              <circle class="path-pulse" cx="90.72" cy="455.59" r="0" />
              <circle class="path-inner" cx="90.72" cy="455.59" r="4.8" />
            </g>
            <g class="path-point">
              <circle class="path-stroke" cx="14.8" cy="273.3" r="4.8" />
              <circle class="path-pulse" cx="14.8" cy="273.3" r="0" />
              <circle class="path-inner" cx="14.8" cy="273.3" r="4.8" />
            </g>
            <g class="path-point">
              <circle class="path-stroke" cx="90.01" cy="90.72" r="4.8" />
              <circle class="path-pulse" cx="90.01" cy="90.72" r="0" />
              <circle class="path-inner" cx="90.01" cy="90.72" r="4.8" />
            </g>
            <g class="path-point">
              <circle class="path-stroke" cx="273.3" cy="14.8" r="4.8" />
              <circle class="path-pulse" cx="273.3" cy="14.8" r="0" />
              <circle class="path-inner" cx="273.3" cy="14.8" r="4.8" />
            </g>
            <g class="path-point">
              <circle class="path-stroke" cx="455.59" cy="90.72" r="4.8" />
              <circle class="path-pulse" cx="455.59" cy="90.72" r="0" />
              <circle class="path-inner" cx="455.59" cy="90.72" r="4.8" />
            </g>
            <circle class="path" cx="272.8" cy="272.3" r="258" />
          </g>
        </g>
      </svg>
    </div>
  </div>

  <script src="<?php bloginfo('template_directory'); ?>/js/pxp.js"></script>
</div><!-- /#main -->
  </div><!-- /#container -->

  	<?php wp_footer(); ?>

  <!-- Facebook Pixel Code -->
  <script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '1731764407135197'); // Insert your pixel ID here.
  fbq('track', 'PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=1731764407135197&ev=PageView&noscript=1"
  /></noscript>
  <!-- DO NOT MODIFY -->
  <!-- End Facebook Pixel Code -->
  </body>
  </html>
