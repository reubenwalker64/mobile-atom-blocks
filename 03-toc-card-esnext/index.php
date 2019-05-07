<?php

/**
 * Plugin Name: Mobile Atom Blocks Article Table of Contents Card EsNext
 * Plugin URI: https://github.com/reubenwalker64/mobile-atom-blocks
 * Description: Mobile Atom Code's Gutenberg Blocks
 * Version: 1.0.0
 * Author: Mobile Atom Code
 *
 * @package mobile-atom-blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
*/
add_action( 'init', 'mobile_atom_blocks_03_esnext_load_textdomain' );

function mobile_atom_blocks_03_esnext_load_textdomain() {
	load_plugin_textdomain( 'mobile-atom-blocks', false, basename( __DIR__ ) . '/languages' );
}

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function mobile_atom_blocks_03_esnext_register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

	wp_register_script(
		'mobile-atom-blocks-03-esnext',
		plugins_url( 'build/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
	);

	wp_register_style(
		'mobile-atom-blocks-03-esnext',
		plugins_url( 'style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	register_block_type( 'mobile-atom-blocks/example-03-toc-card-esnext', array(
		'style' => 'mobile-atom-blocks-03-esnext',
		'editor_script' => 'mobile-atom-blocks-03-esnext',
	) );

  if ( function_exists( 'wp_set_script_translations' ) ) {
    /**
     * May be extended to wp_set_script_translations( 'my-handle', 'my-domain',
     * plugin_dir_path( MY_PLUGIN ) . 'languages' ) ). For details see
     * https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
     */
    wp_set_script_translations( 'mobile-atom-blocks-03-esnext', 'mobile-atom-blocks' );
  }

}
add_action( 'init', 'mobile_atom_blocks_03_esnext_register_block' );
