import { IDocOptions } from './interfaces/doc-options.interface';

export const apiDescription = 'Timer Producer Service';
export const apiTitle = 'Timer Service';

export const healthTags = ['Health'];

export const timerTags = ['Timer'];


export const healthCheck: IDocOptions = {
    tagGroupName: 'Health Check',
    tags: healthTags,
};

export const timer: IDocOptions = {
    tagGroupName: 'Timer',
    tags: timerTags,
};



export const xTagGroups = [
    {
        name: healthCheck.tagGroupName,
        tags: healthCheck.tags,
    },
    {
        name: timer.tagGroupName,
        tags: timer.tags,
    }
];
