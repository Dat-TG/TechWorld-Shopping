/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV === 'development') globalThis.prisma = prisma;

prisma.$use(async (params, next) => {
    // Check incoming query type
    if (params.model == 'Product') {
        if (params.action == 'delete') {
            // Delete queries
            // Change action to an update
            params.action = 'update';
            params.args['data'] = { deleted: true };
        }
        if (params.action == 'deleteMany') {
            // Delete many queries
            params.action = 'updateMany';
            if (params.args.data != undefined) {
                params.args.data['deleted'] = true;
            } else {
                params.args['data'] = { deleted: true };
            }
        }
        if (params.action == 'findMany') {
            if (params.args.where != undefined) {
                params.args.where['deleted'] = false;
            } else {
                params.args['where'] = { deleted: false };
            }
        }
    }
    return next(params);
});

export default prisma;
