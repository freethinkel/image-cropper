import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { createMiddleware, resizePhoto } from '../../../helpers/helpers';
import JSZip from 'jszip';
import { Dispatch } from 'react';

export const DEFAULT_ASPECT = 10 / 15;

export type ResizedPhoto = {
	area: {
		x: number;
		y: number;
	};
	aspect: number;
	zoom: number;
	image: any;
};

const DEFAULT = {
	files: [] as File[],
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
		downloadPhotosAction(state) {},
		setAspectAction(
			state,
			{ payload }: { payload: { aspect: number; index: number } }
		) {
			const { aspect, index } = payload;
			state.resizedPhotos[index].aspect = aspect;
		},
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
	downloadPhotosAction,
	setAspectAction,
} = photosSlice.actions;

export default photosSlice.reducer;

export const photosMiddleware = createMiddleware<RootState>({
	[addFilesAction.type]: ({ state, dispatch }, next, action) => {
		updatePhotoSizes({
			dispatch,
			state,
			files: [...state.photos.files, ...(action.payload as File[])],
		});
	},
	[setAspectAction.type]: ({ state, dispatch }, next, action) => {
		let _state = {
			...state,
			photos: {
				...state.photos,
				resizedPhotos: state.photos.resizedPhotos.map((rs, i) =>
					action.payload.index === i
						? { ...rs, aspect: action.payload.aspect }
						: rs
				),
			},
		};
		updatePhotoSizes({
			dispatch,
			state: _state,
			files: [...state.photos.files],
		});
	},
	[downloadPhotosAction.type]: ({ state, dispatch }, next, action) => {
		const zip = new JSZip();
		var img = zip.folder('images')!;
		Promise.all(
			state.photos.resizedPhotos.map(async (_, i) => {
				const file = state.photos.files[i];
				const resize = state.photos.resizedPhotos[i];
				const content = String(
					await resizePhoto(file, resize, resize.aspect)
				).split('base64,')[1];
				img.file(file.name, content, { base64: true });
			})
		).then((_) => {
			console.log(img);
			zip.generateAsync({ type: 'base64' }).then(function (content) {
				// see FileSaver.js
				const link = document.createElement('a');
				link.setAttribute('download', 'cropped.zip');
				link.setAttribute('href', 'data:application/zip;base64,' + content);
				link.click();
			});
		});
	},
});

const updatePhotoSizes = ({
	dispatch,
	state,
	files,
}: {
	dispatch: Dispatch<AnyAction>;
	state: RootState;
	files: File[];
}) => {
	const images = [...files].map((file) => {
		const image = new Image();
		image.src = URL.createObjectURL(file);
		return image;
	});
	setTimeout(async () => {
		dispatch(
			setResizedPhotosAction(
				images.map((image, i) => {
					const originalAspect = image.naturalWidth / image.naturalHeight;
					const aspect =
						state.photos.resizedPhotos[i]?.aspect || DEFAULT_ASPECT;
					let width = 0;
					let height = 0;
					if (originalAspect < aspect) {
						width = image.naturalWidth * 1;
						height = image.naturalWidth * (1 / aspect);
					} else {
						width = image.naturalHeight * aspect;
						height = image.naturalHeight * 1;
					}
					console.log(width, height, [image.naturalWidth, image.naturalHeight]);
					return {
						image,
						zoom: 1,
						aspect,
						area: {
							y: 50 - (height / image.naturalHeight) * (100 / 2),
							x: 50 - (width / image.naturalWidth) * (100 / 2),
						},
					};
				})
			)
		);
	}, 200);
};
