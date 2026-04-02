// fire-service.service.ts
import FireService from './fire-service.model';
import { IFireService } from './fire-service.interface';
import AppError from '../../errors/AppError';

const getAllFireServices = async (query: Record<string, unknown>) => {
    const { type, area, search } = query;
    const filter: Record<string, unknown> = {
        isDeleted: false,
        status: 'active',
    };

    if (type) filter.type = type;
    if (area) filter.area = area;

    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { area: { $regex: search, $options: 'i' } },
        ];
    }

    return await FireService.find(filter).sort({ createdAt: -1 });
};



const createFireService = async (payload: IFireService) => {
    const isExist = await FireService.findOne({
        name: payload.name,
        isDeleted: false,
    });
    if (isExist) {
        throw new AppError(409, `'${payload.name}' ইতিমধ্যে আছে।`);
    }
    return await FireService.create(payload);
};


const deleteFireService = async (id: string) => {
    const result = await FireService.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
    if (!result) throw new AppError(404, 'তথ্য পাওয়া যায়নি।');
    return result;
};

export const FireServiceService = {
    getAllFireServices,
    createFireService,
    deleteFireService,
};