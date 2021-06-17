import React from 'react';
import Title from 'antd/lib/typography/Title';
import FilePicker from '../components/FilePicker';
import { useDispatch, useSelector } from 'react-redux';
import { addFilesAction } from '../store/slices/photos';
import FileList from './FileList';
import Resizer from './Resizer';
import { RootState } from '../store';
import ResizerPreview from './ResizerPreview';

const Welcome = () => {
	return (
		<div className='container page'>
			<Title>Загрузите изображения</Title>
			asd asd asdas dasdas das das d sd asd asd
		</div>
	);
};

const ResizeLayout: React.FC = () => {
	const dispatch = useDispatch();
	const files = useSelector((state: RootState) => state.photos.files);
	const hasFiles = files.length > 0;

	return (
		<FilePicker onPickFiles={(files) => dispatch(addFilesAction(files))}>
			{hasFiles && <ResizerPreview />}
			{hasFiles && <Resizer />}
			{!hasFiles && <Welcome />}
			<FileList />
		</FilePicker>
	);
};

export default ResizeLayout;
