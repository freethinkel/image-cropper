import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { RootState } from '../../store';
import { DEFAULT_ASPECT, setAspectAction } from '../../store/slices/photos';

const ToggleAspect = () => {
	const dispatch = useDispatch();
	const currentIndex = useSelector(
		(state: RootState) => state.photos.selectedPhotoIndex
	);
	const resized = useSelector((state: RootState) => state.photos.resizedPhotos);
	const currentResize = resized[currentIndex];
	const aspect = currentResize?.aspect || DEFAULT_ASPECT;
	const _15_10 = 15 / 10;
	const _10_15 = 10 / 15;

	return (
		<div className='fixed right-4 bottom-16'>
			<Button
				onClick={() =>
					dispatch(
						setAspectAction({
							aspect: aspect === _10_15 ? _15_10 : _10_15,
							index: currentIndex,
						})
					)
				}
			>
				<div className='flex gap-2'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							d='M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4'
						/>
					</svg>
					{aspect === _10_15 ? '10/15' : '15/10'}
				</div>
			</Button>
		</div>
	);
};

export default ToggleAspect;
