import { Skeleton } from '@/components/ui/skeleton';

export function TourCardSkeleton() {
	return (
		<div className="group flex flex-col space-y-4">
			<div className="relative h-full overflow-hidden rounded-lg">
				<Skeleton className="h-64 w-full rounded-lg object-cover" />
			</div>

			<div className="flex h-full flex-col">
				<div className="mb-4 flex flex-col space-y-2">
					<Skeleton className="h-6 w-3/4 rounded" />
					<Skeleton className="h-4 w-full rounded" />
				</div>

				<div className="mt-auto grid grid-cols-2 gap-3 text-sm">
					<Skeleton className="h-4 w-1/2 rounded" />
					<Skeleton className="h-4 w-1/2 rounded" />
					<Skeleton className="h-4 w-1/2 rounded" />
					<Skeleton className="h-4 w-1/2 rounded" />
				</div>

				<hr className="my-4 border-gray-200" />

				<div className="flex items-center justify-between">
					<Skeleton className="h-6 w-1/4 rounded" />
					<Skeleton className="h-6 w-1/4 rounded" />
				</div>
			</div>
		</div>
	);
}
