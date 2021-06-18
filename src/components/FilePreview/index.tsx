import React, { useEffect, useState } from 'react';

type FilePreviewProps = {
	file: File;
	onSelect: () => void;
	active?: boolean;
};

const FilePreview: React.FC<FilePreviewProps> = ({
	file,
	onSelect,
	active,
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
				'w-12 h-12 rounded-md outline-none appearance-none focus:outline-none',
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
		</button>
	);
};

export default FilePreview;
