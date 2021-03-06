import { useEffect, useState } from 'react';
import { AnyAction, Middleware, Dispatch } from 'redux';
import { ResizedPhoto } from '../store/slices/photos';

type MiddlewareProps<T> = {
	[key: string]: (
		store: {
			state: T;
			dispatch: Dispatch;
		},
		next: Dispatch,
		action: AnyAction
	) => void;
};

export const createMiddleware =
	<T>(actions: MiddlewareProps<T>): Middleware =>
	(store) =>
	(next: Dispatch) =>
	(action: AnyAction) => {
		const selectedAction = actions[action?.type];
		if (action) {
			if (selectedAction) {
				selectedAction(
					{ state: store.getState(), dispatch: store.dispatch },
					next,
					action
				);
				next(action);
			} else {
				next(action);
			}
		}
	};

export const readFileAsDataUrl = async (file: File) => {
	return new Promise((rslv, rjct) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onerror = (err) => {
			rjct(err);
		};
		reader.onload = () => {
			rslv(reader.result);
		};
	});
};

export const usePreview = (file: File) => {
	const [preview, setPreview] = useState('');

	useEffect(() => {
		readFileAsDataUrl(file).then((data) => {
			setPreview(String(data));
		});
	}, [file]);
	return preview;
};

export const nanoDelay = (ms: number) =>
	new Promise((rslv) => setTimeout(rslv, ms));

export const resizePhoto = async (
	file: File,
	resize: ResizedPhoto,
	aspect: number,
	quality = 1
) => {
	// const binary = await readFileAsDataUrl(file);
	var canvas = document.createElement('canvas');
	const image = resize.image;
	const width = image.naturalWidth * quality;
	const height = image.naturalHeight * quality;
	const originalAspect = width / height;

	if (originalAspect < aspect) {
		canvas.width = width * 1;
		canvas.height = width * (1 / aspect);
	} else {
		canvas.width = height * aspect;
		canvas.height = height * 1;
	}

	const ctx = canvas.getContext('2d')!;
	ctx.scale(resize.zoom, resize.zoom);
	ctx.drawImage(
		image,
		-(resize.area.x / 100) * width,
		-(resize.area.y / 100) * height,
		width,
		height
	);

	return canvas.toDataURL(file.type, 90);
};

// export const resizeCrop = (file: File, aspect: number) => {
// 	const image = new Image();
// 	image.src = URL.createObjectURL(file);

// 	const width = (aspect * image.naturalWidth) / image.naturalHeight;

// 	var crop = width === 0 || height === 0;
// 	aspect;
// 	// not resize
// 	if (image.width <= width && height == 0) {
// 		width = image.width;
// 		height = image.height;
// 	}
// 	// resize
// 	if (image.width > width && height == 0) {
// 		height = image.height * (width / image.width);
// 	}

// 	// check scale
// 	var xscale = width / image.width;
// 	var yscale = height / image.height;
// 	var scale = crop ? Math.min(xscale, yscale) : Math.max(xscale, yscale);
// 	// create empty canvas
// 	var canvas = document.createElement('canvas');
// 	canvas.width = width ? width : Math.round(image.width * scale);
// 	canvas.height = height ? height : Math.round(image.height * scale);
// 	canvas.getContext('2d')!.scale(scale, scale);
// 	// crop it top center
// 	canvas
// 		.getContext('2d')
// 		.drawImage(
// 			image,
// 			(image.width * scale - canvas.width) * -0.5,
// 			(image.height * scale - canvas.height) * -0.5
// 		);
// 	return canvas;
// };
