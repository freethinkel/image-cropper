import { useState } from 'react';

type SelectItemValue = any;

type SelectItem = {
	value: SelectItemValue;
	title: string;
};

type SelectProps = {
	placeholder: string;
	value: SelectItemValue;
	items: SelectItem[];
	onSelect: (item: SelectItem) => void;
};

const Select: React.FC<SelectProps> = ({
	placeholder,
	value,
	items,
	onSelect,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className='w-64'>
			<div className='mt-1 relative'>
				<button
					type='button'
					onClick={() => setIsOpen(!isOpen)}
					className='relative w-full bg-white rounded-md shadow-lg pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-400 sm:text-sm'
				>
					<span className='flex items-center'>
						<span className='ml-3 block truncate'>{placeholder}</span>
					</span>
					<span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
						<svg
							className='h-5 w-5 text-gray-400'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							fill='currentColor'
							aria-hidden='true'
						>
							<path
								fill-rule='evenodd'
								d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
								clip-rule='evenodd'
							></path>
						</svg>
					</span>
				</button>
				{isOpen && (
					<div className='absolute mb-1 bottom-full w-full z-10 rounded-md bg-white shadow-lg'>
						<ul
							tabIndex={-1}
							role='listbox'
							aria-labelledby='listbox-label'
							aria-activedescendant='listbox-item-3'
							className='max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
						>
							{items.map((item) => (
								<li
									id='listbox-item-1'
									role='option'
									aria-selected
									key={item.value}
									onClick={() => onSelect(item)}
									className={[
										'cursor-pointer select-none hover:bg-red-400 hover:text-white relative py-2 pl-3 pr-9',
										value !== item.value && 'text-gray-900',
										value === item.value && 'bg-red-400 text-white',
									].join(' ')}
								>
									<div className='flex items-center'>
										<span className='ml-3 block font-normal truncate'>
											{item.title}
										</span>
									</div>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Select;
