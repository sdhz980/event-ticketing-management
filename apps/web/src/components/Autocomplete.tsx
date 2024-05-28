'use client';

import { appConfig } from '@/utils/config';
import { useState } from 'react';
import Asyncselect from 'react-select/async';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import useGetEvents from '@/app/hooks/api/event/useGetEvents';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

interface EventOption {
  value: number;
  label: string;
}

const Autocomplete = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');

  const { data, isLoading } = useGetEvents({ search });

  const loadOptions = (
    inputValue: string,
    callback: (options: EventOption[]) => void,
  ) => {
    try {
      const options = data.map((event) => {
        return {
          label: event.title,
          value: event.id,
        };
      });
      callback(options);
      setSearch(inputValue);
    } catch (error) {
      callback([]);
    }
  };

  const debouncedLoadOptions = debounce(loadOptions, 750);

  return (
    <>
      <div className='w-full max-w-[500px]'>
        <Asyncselect
          placeholder="Search for events"
          loadOptions={debouncedLoadOptions}
          isLoading={isLoading}
          onChange={(event) => {
            router.push(appConfig.baseUrlNext + `/event/${event?.value}`);
          }}
          unstyled={true}
          classNames={{
            control: (e) =>
              cn(
                `rounded-md border`,
                `border-input bg-background px-3 py-1 text-sm font-medium leading-none transition-all duration-300`,
                e.isFocused ? '' : '',
              ),
            indicatorSeparator: () => '',
            dropdownIndicator: () =>
              'text-primary transition transition-all duration-300',
            menu: () =>
              cn(
                'absolute top-0 mt-1 text-sm font-medium leading-none z-10 w-full transition-all duration-300',
                'rounded-md border bg-popover shadow-md overflow-x-hidden',
              ),
            option: () =>
              cn(
                'cursor-default transition-all duration-300',
                'rounded-sm p-3 space-y-4 text-sm font-medium leading-none outline-none',
                'bg-background hover:bg-accent hover:text-accent-foreground w-auto',
              ),
            noOptionsMessage: () => 'p-3',
            loadingMessage: () => 'p-3',
            multiValue: () =>
              'bg-gray-200 px-2 p-1 rounded mr-2 transition-all duration-300',
            input: () => 'text-sm font-medium leading-none overflow-x-hidden',
          }}
        />
      </div>
    </>
  );
};

export default Autocomplete;
