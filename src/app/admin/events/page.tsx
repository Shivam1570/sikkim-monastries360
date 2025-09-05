'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { monasteries } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export default function AddEventPage() {
    const { toast } = useToast();
    const [date, setDate] = useState<Date>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get('title');
        // In a real app, this would be a server action that saves to a database.
        console.log({
            title: title,
            date: date,
            description: formData.get('description'),
            monasteryId: formData.get('monasteryId'),
        });
        toast({
            title: "Event Submitted",
            description: `${title} has been added to the calendar (simulation).`
        });
        event.currentTarget.reset();
        setDate(undefined);
    };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
          Add New Cultural Event
        </h1>
        <p className="text-muted-foreground mt-2">
          Fill out the form to add a new event to the calendar.
        </p>
      </div>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="font-headline">Event Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input id="title" name="title" placeholder="e.g., Saga Dawa" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Event Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="monasteryId">Monastery</Label>
              <Select name="monasteryId" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a monastery" />
                </SelectTrigger>
                <SelectContent>
                  {monasteries.map((monastery) => (
                    <SelectItem key={monastery.id} value={monastery.id}>
                      {monastery.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Describe the event..." required />
            </div>
            <Button type="submit">Add Event</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
