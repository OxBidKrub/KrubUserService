import { User } from "../entity/user.entity";
declare const _default: {
    getAllUsers: () => Promise<User[]>;
    getUserByEmail: (email: string) => Promise<User>;
    getUserById: (id: string) => Promise<User>;
    topup: (id: string, amount: any) => Promise<{
        message: string;
        error?: undefined;
    } | {
        error: string;
        message?: undefined;
    }>;
    pay: (payerId: string, payeeId: string, amount: any) => Promise<{
        message: string;
        error?: undefined;
    } | {
        error: string;
        message?: undefined;
    }>;
    createUser: (user: any) => Promise<User[]>;
    updateUser: (id: string, mergeData: object) => Promise<User>;
    deleteUser: (id: string) => Promise<import("typeorm").DeleteResult>;
};
export default _default;
