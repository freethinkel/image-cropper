import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilePreview from '../../components/FilePreview';
import { RootState } from '../../store';
import { DEFAULT_ASPECT, setPhotoIndexAction } from '../../store/slices/photos';

const FileList = () => {
	const dispatch = useDispatch();
	const photos = useSelector((state: RootState) => state.photos.files);
	const reszied = useSelector((state: RootState) => state.photos.resizedPhotos);
	const currentIndex = useSelector(
		(state: RootState) => state.photos.selectedPhotoIndex
	);
	const selectPhoto = (index: number) => dispatch(setPhotoIndexAction(index));

	return (
		<>
			<div className='fixed transform -translate-x-1/2 bottom-4 left-1/2'>
				<div className='flex gap-3'>
					{photos.map((file, index) => (
						<React.Fragment key={file.size}>
							<FilePreview
								aspect={
									reszied[index]?.aspect === DEFAULT_ASPECT ? '10/15' : '15/10'
								}
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
