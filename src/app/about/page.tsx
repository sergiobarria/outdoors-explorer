import Image from 'next/image';
import { LeafIcon, MountainIcon, UsersIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
	const teamMembers = [
		{
			name: 'Emma Green',
			role: 'Founder & CEO',
			image: '/placeholder-image.jpg',
			bio: 'With over 20 years of experience in eco-tourism, Emma founded Green Adventures to share her passion for sustainable travel.'
		},
		{
			name: 'Michael Rivers',
			role: 'Head of Operations',
			image: '/placeholder-image.jpg',
			bio: 'Michael ensures that every Green Adventure tour runs smoothly while minimizing environmental impact.'
		},
		{
			name: 'Sophia Woods',
			role: 'Lead Naturalist',
			image: '/placeholder-image.jpg',
			bio: "Sophia's extensive knowledge of ecosystems worldwide enriches every tour with fascinating insights."
		}
	];

	return (
		<>
			<section className="w-full bg-black py-12 text-white md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<h1 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
						About Outdoors Explorers
					</h1>
					<p className="max-w-[700px] text-gray-400 md:text-xl">
						Pioneering eco-friendly exploration since 2005, we&apos;re committed to
						showing you the world&apos;s wonders while preserving them for future
						generations.
					</p>
				</div>
			</section>
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<h2 className="mb-8 text-3xl font-bold tracking-tighter sm:text-4xl">
						Our Story
					</h2>
					<div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
						<div>
							<p className="mb-4 text-gray-600">
								Outdoors Explorers was born from a simple idea: that exploring the
								world shouldn&apos;t come at the cost of damaging it. Founded by
								Emma Green in 2005, our company has grown from a small local tour
								operator to a global leader in sustainable tourism.
							</p>
							<p className="mb-4 text-gray-600">
								We&apos;ve taken thousands of adventurers to the far corners of the
								Earth, always with a focus on minimizing our environmental footprint
								and maximizing positive impact on local communities.
							</p>
							<p className="text-gray-600">
								Today, we continue to innovate in eco-friendly travel practices,
								setting new standards for responsible tourism and inspiring a new
								generation of conscious travelers.
							</p>
						</div>
						<div className="relative h-[300px] overflow-hidden rounded-lg">
							<Image
								src="/placeholder-image.jpg"
								alt="Outdoors Explorers team in nature"
								width={600}
								height={400}
								className="absolute inset-0 h-full w-full object-cover"
							/>
						</div>
					</div>
				</div>
			</section>
			<section className="w-full bg-gradient-to-tr from-emerald-600 via-emerald-400 to-lime-200 py-12 text-white md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl">
						Our Mission
					</h2>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						<Card className="bg-white text-black">
							<CardHeader>
								<LeafIcon className="mb-4 h-12 w-12 text-emerald-500" />
								<CardTitle>Preserve Nature</CardTitle>
							</CardHeader>
							<CardContent>
								We strive to minimize our environmental impact and actively
								contribute to conservation efforts in the areas we visit.
							</CardContent>
						</Card>
						<Card className="bg-white text-black">
							<CardHeader>
								<UsersIcon className="mb-4 h-12 w-12 text-emerald-500" />
								<CardTitle>Empower Communities</CardTitle>
							</CardHeader>
							<CardContent>
								We work closely with local communities, ensuring that tourism
								benefits those who call our destinations home.
							</CardContent>
						</Card>
						<Card className="bg-white text-black">
							<CardHeader>
								<MountainIcon className="mb-4 h-12 w-12 text-emerald-500" />
								<CardTitle>Inspire Adventure</CardTitle>
							</CardHeader>
							<CardContent>
								We create unforgettable experiences that connect people with nature
								and inspire a lifelong love for our planet.
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl">
						Meet Our Team
					</h2>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						{teamMembers.map((member, index) => (
							<Card key={index} className="border-2 border-emerald-500">
								<CardHeader>
									<Avatar className="mx-auto mb-4 h-24 w-24">
										<AvatarImage src={member.image} alt={member.name} />
										<AvatarFallback>
											{member.name
												.split(' ')
												.map((n) => n[0])
												.join('')}
										</AvatarFallback>
									</Avatar>
									<CardTitle className="text-center">{member.name}</CardTitle>
									<p className="text-center text-gray-500">{member.role}</p>
								</CardHeader>
								<CardContent>
									<p className="text-center text-gray-600">{member.bio}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
			<section className="w-full bg-black py-12 text-white md:py-24 lg:py-32">
				<div className="container px-4 text-center md:px-6">
					<h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">
						Our Commitment to the Environment
					</h2>
					<p className="mx-auto mb-8 max-w-[700px] text-gray-400 md:text-xl">
						At Outdoors Explorers, sustainability isn&apos;t just a buzzword—it&apos;s
						at the core of everything we do.
					</p>
					<ul className="mx-auto max-w-[700px] space-y-4 text-left">
						<li className="flex items-start">
							<LeafIcon className="mr-2 size-6 flex-shrink-0 text-emerald-500" />
							<span>We offset 150% of the carbon emissions from all our tours.</span>
						</li>
						<li className="flex items-start">
							<LeafIcon className="mr-2 size-6 flex-shrink-0 text-emerald-500" />
							<span>Our tours use only renewable energy sources where possible.</span>
						</li>
						<li className="flex items-start">
							<LeafIcon className="mr-2 size-6 flex-shrink-0 text-emerald-500" />
							<span>
								We&apos;ve eliminated single-use plastics from all our operations.
							</span>
						</li>
						<li className="flex items-start">
							<LeafIcon className="mr-2 size-6 flex-shrink-0 text-emerald-500" />
							<span>
								5% of our profits go directly to environmental conservation
								projects.
							</span>
						</li>
					</ul>
					<Button className="mt-8 bg-emerald-500 text-white hover:bg-emerald-600">
						Learn More About Our Impact
					</Button>
				</div>
			</section>
		</>
	);
}
