import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import { downloadPhotosAction } from '../../store/slices/photos';

const DownloadButton = () => {
	const dispatch = useDispatch();
	return (
		<div className='bottom-3 fixed right-4'>
			<Button onClick={() => dispatch(downloadPhotosAction())}>
				<div className='flex gap-2 text-white'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
						/>
					</svg>
					Выгрузить
				</div>
			</Button>
		</div>
	);
};

export default DownloadButton;
