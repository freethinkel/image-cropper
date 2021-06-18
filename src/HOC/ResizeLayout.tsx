import React from 'react';
import FilePicker from '../components/FilePicker';
import { useDispatch, useSelector } from 'react-redux';
import { addFilesAction } from '../store/slices/photos';
import FileList from './FileList';
import Resizer from './Resizer';
import { RootState } from '../store';
import ResizerPreview from './ResizerPreview';
import DownloadButton from './DownloadButton';
import SelectAspect from './SelectAspect';

const Welcome = () => {
	return (
		<div className='container page mx-auto'>
			<h1 className='text-4xl font-black mb-4'>Загрузите изображения</h1>
			<p>Суда перетащи фотки просто</p>
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
			{hasFiles && <FileList />}
			{hasFiles && <DownloadButton />}
			{hasFiles && <SelectAspect />}
		</FilePicker>
	);
};

export default ResizeLayout;
