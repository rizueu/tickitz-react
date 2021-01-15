import { atom } from 'recoil';
import User from '../factory/User';

const DataUser = atom({
    key: 'DataUser',
    default: User
});

export { DataUser };