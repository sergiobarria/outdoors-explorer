'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MountainIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const links = [
	{ name: 'Home', href: '/' },
	{ name: 'Tours', href: '/tours' },
	{ name: 'About', href: '/about' },
	{ name: 'Contact', href: '/contact' }
];

export function Header() {
	const pathname = usePathname();

	return (
		<header className="flex h-16 items-center border-b border-gray-100 px-4 md:px-6">
			<a href="/" className="flex items-center justify-center">
				<MountainIcon className="size-8 text-primary" />
				<span className="ml-2 text-xl font-semibold">Outdoors Explorers</span>
			</a>

			<nav className="ml-auto flex gap-4 sm:gap-6">
				{links.map(({ name, href }) => (
					<Link
						key={name}
						href={href}
						data-sveltekit-preload-data="hover"
						className={cn(
							'text-sm font-light transition-colors hover:text-primary',
							pathname === href ? 'font-semibold text-primary' : 'text-gray-700'
						)}
					>
						{name}
					</Link>
				))}
			</nav>
		</header>
	);
}
