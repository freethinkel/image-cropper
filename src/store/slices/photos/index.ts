import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { createMiddleware, readFileAsDataUrl } from '../../../helpers/helpers';

export type ResizedPhoto = {
	area: {
		width: number;
		height: number;
		x: number;
		y: number;
	};
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
			{
				payload,
			}: { payload: { y?: number; x?: number; width?: number; height: number } }
		) {
			const index = state.selectedPhotoIndex;
			if (state.resizedPhotos[index]) {
				payload.y && (state.resizedPhotos[index].area.y = payload.y);
				payload.x && (state.resizedPhotos[index].area.x = payload.x);
				payload.width &&
					(state.resizedPhotos[index].area.width = payload.width);
				payload.height &&
					(state.resizedPhotos[index].area.height = payload.height);
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
		setTimeout(() => {
			dispatch(
				setResizedPhotosAction(
					images.map((image) => ({
						image: image,
						area: {
							width: image.naturalWidth / 100,
							height: image.naturalHeight / 100,
							y: image.naturalWidth / 100 / 2,
							x: image.naturalHeight / 100 / 2,
						},
					}))
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
