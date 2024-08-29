import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AppAvatarProps {
	image: string;
	fallback: string;
}

export function AppAvatar({ image, fallback }: AppAvatarProps) {
	return (
		<Avatar className="h-full w-full">
			<AvatarImage src={image} alt={fallback} />
			<AvatarFallback className="text-gray-800">{fallback}</AvatarFallback>
		</Avatar>
	);
}
