import { useDispatch, useSelector } from 'react-redux';
import Select from '../../components/Select';
import { RootState } from '../../store';
import { setAspectAction } from '../../store/slices/photos';
import style from './style.module.scss';

const ITEMS = [
	{
		value: 10 / 15,
		title: '10/15',
	},
	{
		value: 15 / 10,
		title: '15/10',
	},
	{
		value: 3 / 4,
		title: '3/4',
	},
	{
		value: 4 / 3,
		title: '4/3',
	},
	{
		value: 10 / 20,
		title: '10/20',
	},
	{
		value: 20 / 10,
		title: '20/10',
	},
	{
		value: 210 / 297,
		title: 'A4, A3 и тд',
	},
];

const SelectAspect = () => {
	const dispatch = useDispatch();
	const currentIndex = useSelector(
		(state: RootState) => state.photos.selectedPhotoIndex
	);
	const resizedPhotos = useSelector(
		(state: RootState) => state.photos.resizedPhotos
	);
	const currentAspect = resizedPhotos[currentIndex].aspect;
	return (
		<div className={style.wrapper}>
			<Select
				placeholder='Выбери соотношение'
				value={currentAspect}
				items={ITEMS}
				onSelect={(item) => {
					dispatch(setAspectAction(item.value));
				}}
			/>
		</div>
	);
};

export default SelectAspect;
