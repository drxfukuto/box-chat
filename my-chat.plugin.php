<?php
/*
Plugin Name: My Chat Plugin
Plugin URI: https://example.com/my-chat-plugin
Description: A chat application integrated as a WordPress plugin
Version: 1.0
Author: Kawaki
Author URI: https://example.com
*/

function my_chat_plugin_enqueue_scripts() {
    wp_enqueue_script('my-chat-plugin-js', plugin_dir_url(__FILE__) . 'frontend/script.js', array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'my_chat_plugin_enqueue_scripts');

// Enqueue CSS
function my_chat_plugin_enqueue_styles() {
    wp_enqueue_style('my-chat-plugin-css', plugin_dir_url(__FILE__) . 'frontend/style.css', array(), '1.0', 'all');
}
add_action('wp_enqueue_scripts', 'my_chat_plugin_enqueue_styles');

// Shortcode to display chat interface
function my_chat_plugin_shortcode() {
    ob_start();
    include plugin_dir_path(__FILE__) . 'frontend/index.html';
    return ob_get_clean();
}
add_shortcode('my-chat-plugin', 'my_chat_plugin_shortcode');