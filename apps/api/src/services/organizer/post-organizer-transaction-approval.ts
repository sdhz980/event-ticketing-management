import prisma from '@/prisma';

interface Payload {
  userId: string;
  uuid: string;
  status: string;
}

export const postOrganizerTransactionApprovalService = async (
  body: Payload,
) => {
  try {
    const userOrganizer = await prisma.user.findFirst({
      where: {
        id: Number(body.userId),
        role: 'organizer',
      },
    });

    if (!userOrganizer) throw new Error('Not organizer');

    const transaction = await prisma.transaction.findFirst({
      where: {
        uuid: body.uuid,
      },
      include: {
        transactionDiscount: true,
        transactionUserReward: true,
        transactionUserVoucher: true,
      },
    });

    if (!transaction) throw new Error('Something error with the transaction');

    const updateTransaction = await prisma.$transaction(async (tx) => {
      try {
        const newTransaction = await tx.transaction.update({
          where: {
            id: transaction.id,
          },
          data: {
            status: body.status,
            pointUsed: 0,
          },
        });

        if (body.status == 'cancelled') {
          const updateUserPoint = await tx.user.update({
            where: {
              id: transaction.userId,
            },
            data: {
              points: {
                increment: transaction.pointUsed,
              },
            },
          });

          const voucherUsed = await tx.userVoucher.findFirst({
            where: {
              transactionUserVoucher: {
                every: {
                  transactionId: transaction.id,
                },
              },
            },
            include: {
              voucher: true,
              transactionUserVoucher: true,
            },
          });

          if (voucherUsed) {
            const updateVoucher = await tx.voucher.update({
              where: {
                id: voucherUsed.voucherId,
              },
              data: {
                isClaim: false,
              },
            });
            const updateVoucherHistory = await tx.userVoucher.update({
              where: {
                id: voucherUsed.id,
              },
              data: {
                isUsed: false,
              },
            });
          }
          if (transaction.transactionUserReward.length>1) {
            const rewardUsed = await tx.userReward.findFirst({
              where: {
                id: transaction.transactionUserReward[0].userRewardId,
              },
              include: { reward: true },
            });

            if (rewardUsed) {
              const updateUserRewardHistory = await tx.userReward.update({
                where: {
                  id: rewardUsed.id,
                },
                data: {
                  isUsed: false,
                },
              });
            }
          }
        }
      } catch (error) {
        throw error;
      }
    });

    return { updateTransaction };
  } catch (error) {
    throw error;
  }
};
