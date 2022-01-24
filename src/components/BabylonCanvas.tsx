import {
	Engine,
	Scene,
	ArcRotateCamera,
	Vector3,
	HemisphericLight,
	MeshBuilder,
} from '@babylonjs/core';
import React, { useEffect, useRef } from 'react';
import { getSceneModule } from '../babylon/createScene';

import '@babylonjs/loaders';

import 'reflect-metadata';
import { Service } from '../babylon/DI/service';
import DIContainer from '../babylon/DI/container';

const service: Service = DIContainer.resolve<Service>(Service);

console.log(service.getAllNames());

export default function BabylonCanvas(props: any) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvasRef) {
			const canvas = canvasRef.current;

			const engine = new Engine(canvas, true);

			const babylonInit = async (engine: Engine, canvas: HTMLCanvasElement) => {
				const createSceneModule = await getSceneModule();

				// Execute the pretasks, if defined
				await Promise.all(createSceneModule.preTasks || []);

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

				console.log(document.addEventListener);

				document
					.getElementById('overlay')!
					.addEventListener('click', function () {
						canvas.requestPointerLock();
						document.getElementById('overlay')!.style.visibility = 'hidden';
					});

				engine.runRenderLoop(() => {
					scene.render();
				});
			};

			babylonInit(engine, canvas!);
		}
	}, [canvasRef]);

	return <canvas ref={canvasRef} {...props}></canvas>;
}
