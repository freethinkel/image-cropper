import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { useDispatch, useSelector } from 'react-redux';
import { usePreview } from '../../helpers/helpers';
import { RootState } from '../../store';
import { setPhotoResizeAction } from '../../store/slices/photos';
import style from './style.module.scss';

const Resizer = () => {
	const dispatch = useDispatch();
	const photoIndex = useSelector(
		(state: RootState) => state.photos.selectedPhotoIndex
	);
	const file = useSelector(
		(state: RootState) => state.photos.files[photoIndex]
	);
	const aspect = useSelector((state: RootState) => state.photos.aspect);

	const [crop, setCrop] = useState({
		x: 0,
		y: 0,
	});

	const [zoom, setZoom] = useState(1);
	const preview = usePreview(file);

	const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
		dispatch(
			setPhotoResizeAction({
				y: croppedArea.y,
				x: croppedArea.x,
				zoom: zoom,
			})
		);
	};

	return (
		<div className={style.wrapper}>
			<div className={style.cropper_wrapper}>
				<Cropper
					classes={{ containerClassName: style.crop_container }}
					image={preview}
					crop={crop}
					zoom={zoom}
					aspect={aspect}
					onCropChange={setCrop}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
				/>
			</div>
		</div>
	);
};

export default Resizer;
