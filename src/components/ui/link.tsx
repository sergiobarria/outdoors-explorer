import { Button, type ButtonProps } from './button';

export interface LinkProps extends ButtonProps {
	href: string;
	children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ href, children, ...rest }) => {
	return (
		<Button {...rest} asChild>
			<a href={href}>{children}</a>
		</Button>
	);
};
