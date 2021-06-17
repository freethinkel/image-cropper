import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilePreview from '../../components/FilePreview';
import { RootState } from '../../store';
import { setPhotoIndexAction } from '../../store/slices/photos';
import style from './style.module.scss';

const FileList = () => {
	const dispatch = useDispatch();
	const photos = useSelector((state: RootState) => state.photos.files);
	const currentIndex = useSelector(
		(state: RootState) => state.photos.selectedPhotoIndex
	);
	const selectPhoto = (index: number) => dispatch(setPhotoIndexAction(index));

	return (
		<>
			<div className={style.wrapper}>
				<div className={style.container}>
					{photos.map((file, index) => (
						<React.Fragment key={file.size}>
							<FilePreview
								active={index === currentIndex}
								file={file}
								onSelect={() => selectPhoto(index)}
							/>
						</React.Fragment>
					))}
				</div>
			</div>
		</>
	);
};

export default FileList;
