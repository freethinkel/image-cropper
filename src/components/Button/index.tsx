type ButtonProps = {
	onClick: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
};

const Button: React.FC<ButtonProps> = ({
	onClick,
	type = 'button',
	children,
}) => {
	return (
		<>
			<button
				className='px-4 text-white bg-red-400 rounded-md h-10 flex items-center justify-center outline-none focus:outline-none'
				type={type}
				onClick={onClick}
			>
				{children}
			</button>
		</>
	);
};

export default Button;
