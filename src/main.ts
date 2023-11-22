import './style.css'

import { Application } from 'pixi.js';
import { initAssets } from './utils/assets';
import { navigation } from './utils/navigation';
import { TiledBackground } from './ui/TiledBackground';
import { LoadScreen } from './screens/LoadScreen';
import { HomeScreen } from './screens/HomeScreen';
import { GameScreen } from './screens/GameScreen';

/** The PixiJS app Application instance, shared across the project */
export const app = new Application<HTMLCanvasElement>({
  resolution: Math.max(window.devicePixelRatio, 2),
  backgroundColor: 0xffffff,
});

/** Set up a resize function for the app */
function resize() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const minWidth = 375;
  const minHeight = 700;

  // Calculate renderer and canvas sizes based on current dimensions
  const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
  const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
  const scale = scaleX > scaleY ? scaleX : scaleY;
  const width = windowWidth * scale;
  const height = windowHeight * scale;

  // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
  app.renderer.view.style.width = `${windowWidth}px`;
  app.renderer.view.style.height = `${windowHeight}px`;
  window.scrollTo(0, 0);

  // Update renderer and navigation screens dimensions
  app.renderer.resize(width, height);

  // TODO:
  navigation.resize(width, height);
}

/** Fire when document visibility changes - lose or regain focus */
function visibilityChange() {
  if (document.hidden) {
    // sound.pauseAll();
    // navigation.blur();
  } else {
    // sound.resumeAll();
    // navigation.focus();
  }
}

/** Setup app and initialise assets */
async function init() {
  // Add pixi canvas element (app.view) to the document's body
  document.body.appendChild(app.view);

  // Whenever the window resizes, call the 'resize' function
  window.addEventListener('resize', resize);

  // Trigger the first resize
  resize();

  // Add a visibility listener, so the app can pause sounds and screens
  document.addEventListener('visibilitychange', visibilityChange);

  // Setup assets bundles (see assets.ts) and start up loading everything in background
  await initAssets();

  // Add a persisting background shared by all screens
  navigation.setBackground(TiledBackground);

  // Show initial loading screen
  await navigation.showScreen(LoadScreen);

  // Go to one of the screens if a shortcut is present in url params, otherwise go to home screen
  const shortcut = location.hash;
  if (shortcut === '#game') {
    await navigation.showScreen(GameScreen);
  } else {
    await navigation.showScreen(HomeScreen);
  }

}

// Init everything
init();
