import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { RootState } from '../../store';
import { setAspectAction } from '../../store/slices/photos';

const ToggleAspect = () => {
	const dispatch = useDispatch();
	const aspect = useSelector((state: RootState) => state.photos.aspect);
	const _15_10 = 15 / 10;
	const _10_15 = 10 / 15;

	return (
		<div className='fixed right-4 bottom-16'>
			<Button
				onClick={() =>
					dispatch(setAspectAction(aspect === _10_15 ? _15_10 : _10_15))
				}
			>
				{aspect === _10_15 ? '10/15' : '15/10'}
			</Button>
		</div>
	);
};

export default ToggleAspect;
