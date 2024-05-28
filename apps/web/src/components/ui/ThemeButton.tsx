'use client';
import { light } from '@mui/material/styles/createPalette';
import React, { useEffect, useState } from 'react';
import { Button } from './button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

const getTheme = async () => {
  try {
    const theme = localStorage.getItem('theme');
    return theme ? theme : 'light';
  } catch (error) {
    localStorage.setItem('theme', 'light');
  }
};

const ThemeButton = () => {
  const [userTheme, setUserTheme] = useState<'light' | 'dark' | string>(
    'light',
  );
  const { setTheme } = useTheme();
  useEffect(() => {
    const theme = getTheme().then((values) => {
      setUserTheme(values ? values : 'light');
    });
  }, []);
  return (
    <>
      <Button
        onClick={() => {
          setUserTheme(userTheme == 'light' ? 'dark' : 'light');
          setTheme(userTheme);
        }}
        variant="default"
        size="icon"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  );
};

export default ThemeButton;
