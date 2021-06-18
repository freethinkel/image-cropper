import React, { useState } from 'react';
import DragNDropIcon from '../../assets/images/drag_n_drop.svg';
import style from './style.module.scss';

type DragNDropProps = {
	onFilePick: (files: File[]) => void;
	isFixed?: boolean;
};

const DragNDrop: React.FC<DragNDropProps> = ({
	onFilePick,
	children,
	isFixed,
}) => {
	const [isDropMode, setDropMode] = useState(false);
	return (
		<>
			<div
				className={[
					style.dnd_wrapper,
					isFixed && style.dnd_wrapper__fixed,
					isDropMode && style.dnd_wrapper__active,
				].join(' ')}
				onDragLeave={() => setDropMode(false)}
				onDragEnter={() => setDropMode(true)}
				onDragOver={(event) => {
					event.stopPropagation();
					event.preventDefault();
					setDropMode(true);
				}}
				onDrop={(event) => {
					event.stopPropagation();
					event.preventDefault();
					const files = [...(event.dataTransfer.files || [])].filter(
						(file) => file.type.split('/')[0] === 'image'
					);
					if (files.length) {
						onFilePick(files);
					}
					setDropMode(false);
				}}
			>
				<div
					className={[
						style.dnd_inner,
						isDropMode && style.dnd_inner__active,
					].join(' ')}
				>
					<img src={DragNDropIcon} alt='drag and drop icon' />
					<h3 className='text-xl text-white'>Перетащите файлы сюда</h3>
				</div>
				{children}
			</div>
		</>
	);
};

const FilePicker: React.FC<{ onPickFiles: (files: File[]) => void }> = ({
	children,
	onPickFiles,
}) => {
	return (
		<DragNDrop isFixed onFilePick={onPickFiles}>
			{children}
		</DragNDrop>
	);
};

export default FilePicker;
