import style from './style.module.css';

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
		<button className={style.button} type={type} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
