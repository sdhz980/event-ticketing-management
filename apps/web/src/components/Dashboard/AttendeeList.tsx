'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const AttendeeList = () => {
  return (
    <div className="space-y-4">
      <Button>Back to manage event page</Button>
      <Card>
        <CardHeader>
          <CardTitle>DWP Jogjakarta</CardTitle>
          <CardDescription>
            Jln.Pakualaman,sleman,jogjakarta
            <br />
            24-May-2024
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <Label className="text-xl">Attendee List</Label>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Attendee List</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Username</TableHead>
                <TableHead className="font-bold">Email</TableHead>
                <TableHead className="font-bold">Qty</TableHead>
                <TableHead className="font-bold">Order Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Muksal</TableCell>
                <TableCell>Muksal@email.com</TableCell>
                <TableCell>1</TableCell>
                <TableCell>19-Mei-2024 22:25:12 PM</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              {/* <TableRow className='w-full flex flex-row justify-center items-center'>
                <TableCell className='flex justify-center items-center w-full' colSpan={4}> */}
                  <Button>Back</Button>
                  <Button>Next</Button>
                {/* </TableCell>
              </TableRow> */}
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendeeList;
