import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import { downloadPhotosAction } from '../../store/slices/photos';
import style from './style.module.scss';

const DownloadButton = () => {
	const dispatch = useDispatch();
	return (
		<div className={style.wrapper}>
			<Button onClick={() => dispatch(downloadPhotosAction())}>
				Выгрузить
			</Button>
		</div>
	);
};

export default DownloadButton;
