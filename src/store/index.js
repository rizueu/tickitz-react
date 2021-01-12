import { selector, atom } from 'recoil';

const peekPasswordState = atom({
    key: 'peekPasswordState',
    default: false
});