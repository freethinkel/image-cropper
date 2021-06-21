import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { nanoDelay, resizePhoto } from '../../helpers/helpers';
import { RootState } from '../../store';
import { DEFAULT_ASPECT } from '../../store/slices/photos';
import style from './style.module.css';

const ResizerPreview = () => {
	const index = useSelector(
		(state: RootState) => state.photos.selectedPhotoIndex
	);
	const file = useSelector((state: RootState) => state.photos.files)[index];
	const resized = useSelector((state: RootState) => state.photos.resizedPhotos)[
		index
	];
	const [resizedPreview, setResizedPreview] = useState('');
	useEffect(() => {
		if (file && resized) {
			const aspect = resized?.aspect || DEFAULT_ASPECT;
			nanoDelay(200).then(() =>
				resizePhoto(file, resized, aspect, 0.1).then((data) => {
					setResizedPreview(data);
				})
			);
		}
	}, [file, resized]);
	if (!resized) {
		return null;
	}
	return (
		<div className={style.wrapper}>
			<img
				src={resizedPreview}
				alt=''
				style={{
					width: 100,
				}}
			/>
		</div>
	);
};

export default ResizerPreview;
