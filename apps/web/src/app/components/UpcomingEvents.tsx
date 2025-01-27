'use client';
import EventCard from '@/components/EventCard';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import useGetEvents from '../hooks/api/event/useGetEvents';
import { appConfig } from '@/utils/config';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const UpcomingEvents = () => {
  const { data: events } = useGetEvents({
    take: 8,
  });
  const router = useRouter();
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background border-2 border-muted">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
          Upcoming Events
        </h2>

        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <div className="container mx-auto grid grid-cols-[repeat(auto-fit,minmax(min(100%,15em),1fr))] w-full gap-4 py-10">
                {events.map((event, index) => {
                  return (
                    <div>

                    <EventCard
                      key={index}
                      title={event.title}
                      description={event.description}
                      category={event.category}
                      price={event.price}
                      booked={`Booked: ${String(event.booked)}`}
                      limit={`Available Seats: ${String(
                        event.limit - event.booked,
                      )}`}
                      startDate={new Date(event.startDate)}
                      endDate={new Date(event.endDate)}
                      time={event.time}
                      imageUrl={appConfig.baseUrl + `/assets${event.thumbnail}`}
                      eventId={event.id}
                      />
                      </div>
                  );
                })}
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        <div className="mx-auto w-full max-w-sm space-y-2">
          <Button onClick={() => router.push('/concert')} className="w-full">
            See More Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
