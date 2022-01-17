import { Engine } from '@babylonjs/core/Engines/engine';
import { getSceneModule } from './createScene';

const babylonInit = async (): Promise<void> => {
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.id = 'gameCanvas';
  document.body.appendChild(canvas);

  const createSceneModule = await getSceneModule();

  // Execute the pretasks, if defined
  await Promise.all(createSceneModule.preTasks || []);
  // Generate the BABYLON 3D engine
  const engine = new Engine(canvas, true);

  // Create the scene
  const scene = await createSceneModule.createScene(engine, canvas);

  // Register a render loop to repeatedly render the scene
  engine.runRenderLoop(function () {
    scene.render();
  });

  // Watch for browser/canvas resize events
  window.addEventListener('resize', function () {
    engine.resize();
  });

  document.getElementById('overlay')!.addEventListener('click', function () {
    canvas.requestPointerLock();
    document.getElementById('overlay')!.style.visibility = 'hidden';
  });
};

babylonInit().then(() => {
  // scene started rendering, everything is initialized
  console.log('Scene hat fertig geladen!');
});
