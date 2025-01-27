'use client';

import { useAppDispatch, useAppSelector } from '@/app/redux/hook';
import { logoutAction } from '@/app/redux/slices/userSlice';
import { useRouter } from 'next/navigation';
import { Menu, MusicIcon } from 'lucide-react';
import { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import Link from 'next/link';
import ThemeButton from './ui/ThemeButton';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {}, []);

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(logoutAction());
    router.refresh();
  };

  return (
    <div className="flex flex-row justify-between p-4 border-b">
      <Link
        className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
        href="#"
      >
        <MusicIcon className="h-6 w-6" />
        <span className="sr-only">TuneTix</span>
      </Link>
      <nav className='flex flex-row gap-4'>
        <ThemeButton/>
        {Boolean(user.userId) ? (
          <div className="md:block hidden">
            <div className="flex items-center gap-4">
              <Link
                // className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                href="/"
              >
                <Button variant="outline">Home</Button>
              </Link>
              {user.role == 'organizer' ? (
                <Link
                  // className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                  href="/organizer-dashboard"
                >
                  <Button variant="outline">Dashboard</Button>
                </Link>
              ) : (
                <Link
                  // className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                  href="/concert"
                >
                  <Button variant="outline">Event</Button>
                </Link>
              )}
              <Link
                // className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                href="/profile"
              >
                <Button variant="outline">Profile</Button>
              </Link>
              <Link
                // className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-red-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                onClick={logout}
                href="#"
              >
                <Button variant="outline">Log Out</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="hidden md:block">
            <div className="flex items-center gap-2">
              <Link
                // className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-red-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                href="/"
              >
                <Button variant="outline">Home</Button>
              </Link>
              <Link
                // className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-red-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                href="/concert"
              >
                <Button variant="outline">Event</Button>
              </Link>
              <Link
                // className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-red-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                href="/login"
              >
                <Button variant="outline">Login</Button>
              </Link>
              <Link
                // className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-red-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                href="/register"
              >
                <Button variant="outline">Register</Button>
              </Link>
            </div>
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="block md:hidden">
            <Button variant="ghost">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/')}>
              Home
            </DropdownMenuItem>
            {Boolean(user.userId) && (
              <>
                {user.role === 'organizer' ? (
                  <DropdownMenuItem
                    onClick={() => router.push('/organizer-dashboard')}
                  >
                    Dashboard
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => router.push('/concert')}>
                    Event
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </>
            )}
            {!Boolean(user.userId) && (
              <>
                <DropdownMenuItem onClick={() => router.push('/concert')}>
                  Event
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/login')}>
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/register')}>
                  Register
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  );
};

export default Navbar;
