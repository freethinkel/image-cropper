import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { createMiddleware, readFileAsDataUrl } from '../../../helpers/helpers';

export type ResizedPhoto = {
	area: {
		x: number;
		y: number;
	};
	zoom: number;
	image: any;
};

const DEFAULT = {
	files: [] as File[],
	aspect: 10 / 15,
	resizedPhotos: [] as ResizedPhoto[],
	selectedPhotoIndex: 0,
};

const photosSlice = createSlice({
	name: 'photos',
	initialState: DEFAULT,
	reducers: {
		addFilesAction(state, { payload }: { payload: File[] }) {
			state.files = [...state.files, ...payload];
		},
		removeFileAction(state, { payload }: { payload: number }) {
			state.files.splice(payload, 1);
		},
		setResizedPhotosAction(state, { payload }: { payload: ResizedPhoto[] }) {
			state.resizedPhotos = payload;
		},
		setPhotoIndexAction(state, { payload }: { payload: number }) {
			state.selectedPhotoIndex = payload;
		},
		downloadPhotos() {},
		setPhotoResizeAction(
			state,
			{ payload }: { payload: { y: number; x: number; zoom: number } }
		) {
			const index = state.selectedPhotoIndex;
			if (state.resizedPhotos[index]) {
				state.resizedPhotos[index].area.y = payload.y;
				state.resizedPhotos[index].area.x = payload.x;
				state.resizedPhotos[index].zoom = payload.zoom;
			}
		},
	},
});

export const {
	addFilesAction,
	setResizedPhotosAction,
	removeFileAction,
	setPhotoIndexAction,
	setPhotoResizeAction,
	downloadPhotos,
} = photosSlice.actions;

export default photosSlice.reducer;

export const photosMiddleware = createMiddleware<RootState>({
	[addFilesAction.type]: ({ state, dispatch }, next, action) => {
		const images = [...state.photos.files, ...action.payload].map((file) => {
			const image = new Image();
			image.src = URL.createObjectURL(file);
			return image;
		});
		// timeout for hack get size
		setTimeout(async () => {
			dispatch(
				setResizedPhotosAction(
					images.map((image) => {
						const aspect = state.photos.aspect;
						const originalAspect = image.naturalWidth / image.naturalHeight;
						let width = 0;
						let height = 0;
						if (originalAspect < aspect) {
							width = image.naturalWidth * 1;
							height = image.naturalWidth * (1 / aspect);
						} else {
							width = image.naturalHeight * aspect;
							height = image.naturalHeight * 1;
						}
						console.log(width, height, [
							image.naturalWidth,
							image.naturalHeight,
						]);
						return {
							image: image,
							zoom: 1,
							area: {
								y: 50 - (height / image.naturalHeight) * (100 / 2),
								x: 50 - (width / image.naturalWidth) * (100 / 2),
							},
						};
					})
				)
			);
		}, 100);
	},
	[downloadPhotos.type]: ({ state, dispatch }, next, action) => {
		// state.photos.resizedPhotos;
	},
});

export const resizeFile = async (file: File) => {
	const base64 = await readFileAsDataUrl(file);
	return base64;
};

const computeAreaSize = (height: number, width: number, aspect: number) => {
	let _width = width;
	let _height = height;
	if (width / height > aspect) {
		_width = height * aspect;
	} else if (width / height < aspect) {
		// "wide" or square crop
		_height = width / aspect;
	}
	return {
		width: _width,
		height: _height,
	};
};
