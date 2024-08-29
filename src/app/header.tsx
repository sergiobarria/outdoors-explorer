'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogInIcon, MountainIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const links = [
	// { name: 'Home', href: '/' },
	{ name: 'Tours', href: '/tours' },
	{ name: 'About', href: '/about' },
	{ name: 'Contact', href: '/contact' }
];

export function Header() {
	const pathname = usePathname();

	return (
		<header className="flex h-16 items-center justify-between border-b border-gray-100 px-4 md:px-6">
			<div className="flex items-center gap-10">
				<a href="/" className="flex items-center justify-center">
					<MountainIcon className="size-8 text-primary" />
					<span className="ml-2 text-lg font-semibold">Outdoors Explorers</span>
				</a>

				<nav className="flex gap-4 sm:gap-6">
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
			</div>

			<div>
				<Button asChild size="sm">
					<Link href="/login">
						<LogInIcon className="mr-2 size-4" />
						<span>Login</span>
					</Link>
				</Button>
			</div>
		</header>
	);
}
