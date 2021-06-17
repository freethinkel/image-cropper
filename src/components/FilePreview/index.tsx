import React, { useEffect, useState } from 'react';
import style from './style.module.css';

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
			className={[style.wrapper, active && style.active].join(' ')}
			type='button'
			onClick={onSelect}
		>
			<img src={preview} alt={file.name} />
		</button>
	);
};

export default FilePreview;
