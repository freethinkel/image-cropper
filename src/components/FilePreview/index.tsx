import React, { useEffect, useState } from 'react';

type FilePreviewProps = {
	file: File;
	onSelect: () => void;
	active?: boolean;
	aspect?: string;
};

const FilePreview: React.FC<FilePreviewProps> = ({
	file,
	onSelect,
	active,
	aspect,
}) => {
	const [preview, setPreview] = useState('');
	useEffect(() => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setPreview(String(reader.result));
		};
	}, [file]);

	return (
		<button
			className={[
				'w-16 h-16 rounded-md outline-none appearance-none focus:outline-none relative',
				active && 'border border-red-400',
			].join(' ')}
			type='button'
			onClick={onSelect}
		>
			<img
				className='w-full h-full object-cover rounded-md'
				src={preview}
				alt={file.name}
			/>
			<div className='absolute bottom-1 right-1 bg-gray-900 bg-opacity-80 text-white rounded-md text-xs px-1'>
				{aspect}
			</div>
		</button>
	);
};

export default FilePreview;
