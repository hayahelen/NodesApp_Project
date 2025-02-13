import { cn } from '@/lib/utils';
import { SquareDashedMousePointer } from 'lucide-react';
import Link from 'next/link';

function Logo({
    fontSize = "2xl",
    iconSize = 20
}: {
    fontSize?: string;
    iconSize?: number;
}) {
    return (
        <Link href="/" className={cn(
            "text-2xl font-extrabold flex items-center gap-2",
            fontSize
        )}>
            <div className='rounded-xl bg-emerald-600 p-2'>
                <SquareDashedMousePointer size={iconSize}
                    className='stroke-white' />
            </div>
            <div>
                <span className="text-emerald-600">
                    Nodes
                </span>
                <span className='text-stone-700 dark:text-stone-300'>App</span>
            </div>
        </Link>
    )
}


export default Logo