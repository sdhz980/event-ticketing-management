import prisma from '@/prisma';

const monthNames = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

export const getOrganizerDataStatisticService = async (id: number) => {
  try {
    const allEvents = await prisma.event.findMany({
      where: {
        userId: id,
      },
    });
    const totalEvents = await prisma.event.count({
      where: {
        userId: id,
        user: {
          role: 'organizer',
        },
      },
      // select: {
      //   _all: true,
      // },
    });
    const averageTicketPrice = await prisma.event.aggregate({
      _avg: {
        price: true,
      },
      where: {
        userId: id,
        user: {
          role: 'organizer',
        },
      },
    });

    const ticketSoldOverall = await prisma.transaction.count({
      where: {
        event: {
          userId: id,
          user: {
            role: 'organizer',
          },
        },
        status: 'success',
      },
    });
    const ticketRevenue = await prisma.transaction.aggregate({
      _sum: {
        total: true,
      },
      where: {
        event: {
          userId: id,
          user: {
            role: 'organizer',
          },
        },
        status: 'success',
      },
    });
    const soldInThisMonth = await prisma.transaction.count({
      where: {
        event: {
          userId: id,
        },
      },
    });

    const chartMonth = await prisma.transaction.findMany({
      where: {
        event: {
          userId: id,
        },
      },
      include: {
        event: true,
      },
    });

    // {
    //   name: 'jan',
    //   data: [
    //     { title: 'Ticket Sales', name: 'sales', value: 12 },
    //     {
    //       title: 'Attendance',
    //       name: 'attendance',
    //       value: 10,
    //     },
    //   ],
    // },

    const objChart: any = {
      jan: {},
      feb: {},
      mar: {},
      apr: {},
      may: {},
      jun: {},
      jul: {},
      aug: {},
      sep: {},
      oct: {},
      nov: {},
      dec: {},
    };
    const chartStatisticData: any = [];
    chartMonth.map((val) => {
      if (
        !objChart[monthNames[val.createdAt.getMonth()]][
          val.event.title.replace(' ', '')
        ]
      )
        return (objChart[monthNames[val.createdAt.getMonth()]][
          val.event.title.replace(' ', '')
        ] = 1);
      objChart[monthNames[val.createdAt.getMonth()]][
        val.event.title.replace(' ', '')
      ] =
        objChart[monthNames[val.createdAt.getMonth()]][
          val.event.title.replace(' ', '')
        ] + 1;
    });
    Object.keys(objChart).map((key) => {
      const tmpObj: any = { name: key, data: [] };
      Object.keys(objChart[key]).map((val) => {
        tmpObj.data.push({ title: val, name: val, value: objChart[key][val] });
      });
      chartStatisticData.push(tmpObj)
    });

    return {
      message: 'Data Found',
      data: {
        totalEvents,
        averageTicketPrice,
        ticketSoldOverall,
        ticketRevenue,
        soldInThisMonth,
        chartStatisticData,
      },
    };
  } catch (err) {
    throw err;
  }
};
