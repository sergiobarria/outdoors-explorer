'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const links = [
	{ name: 'Terms of Service', href: '/terms' },
	{ name: 'Privacy Policy', href: '/privacy' }
];

export function Footer() {
	const pathname = usePathname();

	return (
		<footer className="mt-auto flex w-full shrink-0 flex-col items-center gap-2 border-t border-gray-200 px-4 py-6 sm:flex-row md:px-6">
			<p className="text-xs text-gray-500">
				&copy; Outdoors Explorers. Made with{' '}
				<HeartIcon className="inline-block size-4 fill-rose-500 text-rose-500" />.
			</p>

			<nav className="flex gap-4 sm:ml-auto sm:gap-6">
				{links.map(({ name, href }) => (
					<Link
						key={href}
						href={href}
						className={cn(
							'text-xs text-gray-500 underline-offset-4 hover:text-primary hover:underline',
							pathname === href ? 'font-semibold text-primary' : 'text-gray-700'
						)}
					>
						{name}
					</Link>
				))}
			</nav>
		</footer>
	);
}
