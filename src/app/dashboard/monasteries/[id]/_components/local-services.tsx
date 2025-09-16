import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LocalServices() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button asChild className="w-full">
          <Link href="https://www.sikkim.taxi/gangtok-tour-packages" target="_blank" rel="noopener noreferrer">
            Sikkim Taxi Packages
          </Link>
        </Button>
        <Button asChild className="w-full" variant="secondary">
          <Link href="https://www.wizzride.com/sikkim-taxi-booking" target="_blank" rel="noopener noreferrer">
            Book with Wizzride
          </Link>
        </Button>
      </div>
    </div>
  );
}
