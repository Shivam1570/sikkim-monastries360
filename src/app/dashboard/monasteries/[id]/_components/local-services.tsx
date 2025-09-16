import { Button } from '@/components/ui/button';
import { Car, User, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const services = [
    {
        name: 'Sikkim Taxi',
        url: 'https://www.sikkim.taxi/gangtok-tour-packages',
        type: 'Taxi & Tours'
    },
    {
        name: 'Sikkim Tourism',
        url: 'https://sikkimtourism.gov.in/Public/TravellerEssentials/Travel_Agents',
        type: 'Official Guide List'
    },
    {
        name: 'Wander Nagari',
        url: 'https://www.wandernagari.com/sikkim-taxi-service/',
        type: 'Taxi Service'
    }
];

export default function LocalServices() {
    return (
        <div className="space-y-4">
            <ul className="space-y-3">
                {services.map((service) => (
                    <li key={service.name}>
                        <Button asChild variant="outline" className="w-full justify-between">
                            <Link href={service.url} target="_blank" rel="noopener noreferrer">
                                <div className="flex items-center gap-2">
                                    {service.type.includes('Taxi') ? <Car /> : <User />}
                                    <span>{service.name}</span>
                                </div>
                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            </Link>
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
