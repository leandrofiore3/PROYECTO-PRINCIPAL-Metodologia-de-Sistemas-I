import { v4 } from 'uuid';

export const generateUuid = () => {
    const uuidWithDashes = v4();
    const uuidWithoutDashes = uuidWithDashes.replace(/-/g, '');

    return uuidWithoutDashes;
}