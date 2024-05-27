'use client';

import useGetEvent from '@/app/hooks/api/event/useGetEvent';
import { appConfig } from '@/utils/config';
import { CalendarRangeIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import ReviewForm from './components/ReviewForm';
import SkeletonBlogDetail from './components/SkeletonEventDetail';
import { format } from 'date-fns';
import CheckoutDialog from '@/components/CheckoutDialog';
import { useAppSelector } from '@/app/redux/hook';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const EventDetail = ({ params }: { params: { id: string } }) => {
  const { role } = useAppSelector((state) => state.user);
  const { event, isLoading } = useGetEvent(Number(params.id));
  const priceFormat = new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    style: 'currency',
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <SkeletonBlogDetail />
      </div>
    );
  }
  if (!event) {
    return notFound();
  }

  return (
    <section className="w-full px-4 py-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl">{event.title}</CardTitle>
          <Label>Category : {event.eventCategory[0].category.title}</Label>
          <Label className="flex items-center space-x-4">
            <Label className="inline-flex items-center space-x-2">
              <CalendarRangeIcon className="h-5 w-5" />
              <span>
                {format(event.startDate, 'dd-MM-yyyy')} -{' '}
                {format(event.endDate, 'dd-MM-yyyy')}
              </span>
            </Label>
            <Label className="inline-flex items-center space-x-2">
              <ClockIcon className="h-5 w-5" />
              <span>{event.time}</span>
            </Label>
          </Label>
          <Label className="inline-flex items-center space-x-2">
            <MapPinIcon className="h-5 w-5" />
            <span className="flex">
              {event.location.address},{event.location.city},
              {event.location.province},{event.location.country}
            </span>
          </Label>
        </CardHeader>
        <CardContent>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  {/* <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    {event.title}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <div className="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                      <CalendarRangeIcon className="h-5 w-5" />
                      <span>
                        {format(event.startDate, 'dd-MM-yyyy')} -{' '}
                        {format(event.endDate, 'dd-MM-yyyy')}
                      </span>
                    </div>
                    <div className="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                      <ClockIcon className="h-5 w-5" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  <div className="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                    <MapPinIcon className="h-5 w-5" />
                    <span className="flex">
                      {event.location.address},{event.location.city},
                      {event.location.province},{event.location.country}
                    </span>
                  </div> */}
                  <img
                    alt="Event"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                    height="550"
                    src={`${appConfig.baseUrl}/assets${event.thumbnail}`}
                    width="550"
                  />

                  <Card>
                    <CardHeader>
                      <CardTitle>Description</CardTitle>
                    </CardHeader>
                    <CardContent className=''>
                      <p className='leading-7 [&:not(:first-child)]:mt-6'>{event.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo amet quis consectetur nulla, eos illo repellendus laudantium. Quos corrupti, molestiae quisquam distinctio neque cupiditate harum quibusdam, at obcaecati animi quaerat? Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ex quas hic, error optio doloribus natus voluptatum modi tenetur, porro fuga ipsa inventore exercitationem, possimus ratione quos! Quas, dolores. Ea! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias sunt, libero odio est molestias incidunt quos velit possimus rem sit modi, nihil quaerat quisquam eaque provident aperiam iusto. Eius, voluptatibus.</p>
                    </CardContent>
                  </Card>
                  {/* <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                {event.location.city}
              </p> */}
                  {/* <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                {event.description}
              </p> */}
                  {/* <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                {priceFormat.format(event.price)}
              </p> */}
                </div>
                {role !== 'organizer' ? (
                  <CheckoutDialog eventData={event} />
                ) : (
                  <Dialog>
                    <DialogTrigger className="w-full">
                      <Button variant="secondary" className="w-full">
                        Checkouts
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Warning</DialogTitle>
                        <Label>You are signed as organizer.</Label>
                      </DialogHeader>
                      <Label className="text-base">
                        As an organizer you are probihited to checkout an event!
                      </Label>
                      <DialogFooter>
                        <DialogClose>
                          <Button>Close</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-md space-y-6 px-4 py-12">
            <div>
              <ReviewForm />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default EventDetail;
