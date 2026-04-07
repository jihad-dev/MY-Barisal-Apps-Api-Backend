import { IPharmacy } from './pharmacy.interface';
import { Pharmacy } from './pharmacy.model';

const createPharmacyIntoDB = async (payload: IPharmacy) => {
    const result = await Pharmacy.create(payload);
    return result;
};

const getAllPharmaciesFromDB = async (query: Record<string, unknown>) => {
    
    let searchTerm = '';
    if (query?.searchTerm) {
        searchTerm = query.searchTerm as string;
    }
    const result = await Pharmacy.find({
        $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { area: { $regex: searchTerm, $options: 'i' } },
        ],
    });

    return result;
};
export const PharmacyServices = {
    createPharmacyIntoDB,
    getAllPharmaciesFromDB
};