import { Space } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilePreview from '../../components/FilePreview';
import { RootState } from '../../store';
import { setPhotoIndexAction } from '../../store/slices/photos';
import style from './style.module.css';

const FileList = () => {
	const dispatch = useDispatch();
	const photos = useSelector((state: RootState) => state.photos.files);
	const selectPhoto = (index: number) => dispatch(setPhotoIndexAction(index));

	return (
		<div className={style.wrapper}>
			<Space>
				{photos.map((file, index) => (
					<React.Fragment key={file.size}>
						<FilePreview file={file} onSelect={() => selectPhoto(index)} />
					</React.Fragment>
				))}
			</Space>
		</div>
	);
};

export default FileList;
