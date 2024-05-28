import { IDocOptions } from './interfaces/doc-options.interface';

export const apiDescription = 'Timer Producer Service';
export const apiTitle = 'Timer Service';

export const healthTags = ['Health'];


export const healthCheck: IDocOptions = {
    tagGroupName: 'Health Check',
    tags: healthTags,
};



export const xTagGroups = [{
    name: healthCheck.tagGroupName,
    tags: healthCheck.tags,
},];
