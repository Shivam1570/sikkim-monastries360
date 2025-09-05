'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { events, monasteries } from '@/lib/data';
import { isSameDay } from 'date-fns';
import Link from 'next/link';

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedEvents = events.filter(event => date && isSameDay(event.date, date));
  const eventDays = events.map(e => e.date);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
          Cultural Event Calendar
        </h1>
        <p className="text-muted-foreground mt-2">
          Discover upcoming festivals and rituals in Sikkim's monasteries.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="p-0"
                modifiers={{ event: eventDays }}
                modifiersClassNames={{
                  event: 'bg-primary/20 rounded-full',
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card className="min-h-[300px]">
            <CardHeader>
              <CardTitle className="font-headline">
                Events on {date ? date.toLocaleDateString() : 'selected date'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedEvents.length > 0 ? (
                <ul className="space-y-4">
                  {selectedEvents.map((event) => {
                    const monastery = monasteries.find(m => m.id === event.monasteryId);
                    return (
                        <li key={event.id} className="p-4 border rounded-lg bg-background">
                            <h3 className="font-bold text-lg">{event.title}</h3>
                            {monastery && (
                                <Link href={`/dashboard/monasteries/${monastery.id}`} className="text-sm text-primary hover:underline">
                                    at {monastery.name}
                                </Link>
                            )}
                            <p className="text-muted-foreground mt-2">{event.description}</p>
                        </li>
                    )
                })}
                </ul>
              ) : (
                <p className="text-muted-foreground text-center pt-10">No events scheduled for this day.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
