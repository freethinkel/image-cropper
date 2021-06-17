import React, { useState } from 'react';
import { message, Space } from 'antd';
import style from './style.module.css';
import { Typography } from 'antd';
import DragNDropIcon from '../../assets/images/drag_n_drop.svg';
const { Title } = Typography;

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
		<div
			className={[
				style.grag_n_drop_wrapper,
				isFixed && style.grag_n_drop_wrapper__fixed,
				isDropMode && style.grag_n_drop_wrapper__active,
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
				const files = [...(event.dataTransfer.files || [])];
				if (files.length) {
					onFilePick(files);
				}
				setDropMode(false);
			}}
		>
			<Space
				direction='vertical'
				align='center'
				size='middle'
				className={[
					style.drag_n_grop_inner,
					isDropMode && style.drag_n_grop_inner__active,
				].join(' ')}
			>
				<img src={DragNDropIcon} alt='drag and drop icon' />
				<Title level={3}>Перетащите файлы сюда</Title>
			</Space>
			{children}
		</div>
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
