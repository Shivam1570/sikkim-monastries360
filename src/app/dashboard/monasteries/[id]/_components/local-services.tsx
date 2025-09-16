'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type Service = {
    name: string;
    type: 'taxi' | 'guide' | 'hotel';
    contact: string;
    url?: string;
};

interface LocalServicesProps {
    monasteryId: string;
    monasteryName: string;
}

export default function LocalServices({ monasteryId, monasteryName }: LocalServicesProps) {
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState<Service[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const findServices = async () => {
        setLoading(true);
        setError(null);
        setServices(null);
        try {
            const response = await fetch('/api/services/local', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ monasteryId, monasteryName }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch services.');
            }
            setServices(data.services);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const groupServicesByType = (services: Service[]) => {
        return services.reduce((acc, service) => {
            (acc[service.type] = acc[service.type] || []).push(service);
            return acc;
        }, {} as Record<Service['type'], Service[]>);
    };

    const groupedServices = services ? groupServicesByType(services) : {};

    return (
        <div className="space-y-4">
            <Button onClick={findServices} disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Find Local Services
            </Button>

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {services && (
                services.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                        {Object.entries(groupedServices).map(([type, serviceList]) => (
                            <AccordionItem key={type} value={type}>
                                <AccordionTrigger className="capitalize">{type}s</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="space-y-2">
                                        {serviceList.map((service, index) => (
                                            <li key={index} className="text-sm">
                                                <p className="font-semibold">{service.name}</p>
                                                <p className="text-muted-foreground">{service.contact}</p>
                                                {service.url && <a href={service.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Website</a>}
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <p className="text-sm text-muted-foreground text-center">No services found at the moment.</p>
                )
            )}
        </div>
    );
}
