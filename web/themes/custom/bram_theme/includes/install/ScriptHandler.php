<?php

namespace Drupal\bram_theme;

use Composer\Script\Event;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;

class ScriptHandler {

  const THEME_NAME = 'bram_theme';

  public static function createTheme(Event $event) {

    // Get safe createTheme machine name from args.
    $sub_name = self::THEME_NAME;
    $args = $event->getArguments();
    if (!empty($args)) {
      $input = $args[0];
      $strip_chars = preg_replace('/[^a-zA-Z\_\s]*/', '', $input);
      $strip_space = preg_replace('/\s+/', '_', $strip_chars);
      $sub_name = strtolower($strip_space);
    }

    // Copy theme to parent dir.
    $fs = new Filesystem();
    $fs->mirror(getcwd() . '/', '../../custom/' . $sub_name);

    // Rename bram_theme.* files
    $finder = new Finder();
    $finder->files()->name('/' . self::THEME_NAME . '/')->in('../../custom/' . $sub_name);

    foreach ($finder as $file) {
      $location_segments = explode('/', $file->getRealPath());
      $old_filename = array_pop($location_segments);
      $location = implode('/', $location_segments) . '/';

      $new_filename = preg_replace('/' . self::THEME_NAME . '/', $sub_name, $old_filename);

      $fs->rename($file->getRealPath(), $location . $new_filename);
    }

    // Activate theme .info file.
    $finder = new Finder();
    $finder->files()->name('*.ymltmp')->in('../../custom/' . $sub_name);

    foreach ($finder as $file) {
      $location_segments = explode('/', $file->getRealPath());
      $old_filename = array_pop($location_segments);
      $location = implode('/', $location_segments) . '/';

      $new_filename = preg_replace('/ymltmp/', 'yml', $old_filename);

      $fs->rename($file->getRealPath(), $location . $new_filename);
    }

    // Replace bram_theme in file contents.
    $finder = new Finder();
    $finder->files()
      ->contains('/' . self::THEME_NAME . '/')
      ->in('../../custom/' . $sub_name)
      ->exclude(['includes/install'])
      ->notName('composer.json')
      ->notName('*.md');


    foreach ($finder as $file) {
      $old_contents = file_get_contents($file->getRealPath());

      $new_contents = preg_replace('/' . self::THEME_NAME . '/', $sub_name, $old_contents);

      file_put_contents($file->getRealPath(), $new_contents);
    }
  }
}
