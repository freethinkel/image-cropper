import style from './style.module.scss';

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
			<button className={style.btn} type={type} onClick={onClick}>
				{children}
			</button>
		</>
	);
};

export default Button;
