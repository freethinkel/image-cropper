import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { resizePhoto, usePreview } from '../../helpers/helpers';
import { RootState } from '../../store';
import style from './style.module.css';

const ResizerPreview = () => {
	const index = useSelector(
		(state: RootState) => state.photos.selectedPhotoIndex
	);
	const file = useSelector((state: RootState) => state.photos.files)[index];
	const aspect = useSelector((state: RootState) => state.photos.aspect);
	const resized = useSelector((state: RootState) => state.photos.resizedPhotos)[
		index
	];
	const [resizedPreview, setResizedPreview] = useState('');
	useEffect(() => {
		if (file && resized) {
			resizePhoto(file, resized, aspect).then((data) => {
				setResizedPreview(data);
			});
		}
	}, [file, resized]);
	const preview = usePreview(file);
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
