type TQuestionCategories = {id: number, name: string}[]
export const questionCategories: TQuestionCategories = [
    {id: 9, name: 'general knowledge'},
    {id: 10, name: 'entertainment: books'},
    {id: 11, name: 'entertainment: film'},
    {id: 12, name: 'entertainment: music'},
    {id: 13, name: 'entertainment: musical & theatres' },
    {id: 14, name: 'entertainment: television'},
    {id: 15, name: 'entertainment: video games'},
    {id: 16, name: 'entertainment: board games'},
    {id: 17, name: 'science & nature'},
    {id: 18, name: 'science: computers'},
    {id: 19, name: 'science & mathematics'},
    {id: 20, name: 'mythology'},
    {id: 21, name: 'sports'},
    {id: 22, name: 'geography'},
    {id: 23, name: 'history'},
    {id: 24, name: 'politics'},
    {id: 25, name: 'art'},
    {id: 26, name: 'celebrities'},
    {id: 27, name: 'animals'},
    {id: 28, name: 'vehicles'},
    {id: 29, name: 'entertainment: comics'},
    {id: 30, name: 'science: gadgets'},
    {id: 31, name: 'entertainment: japanese anime & manga'},
    {id: 32, name: 'entertainment: cartoon & animations'},
]

export enum EDifficulty {
    EASY = 'easy', 
    MEDIUM = 'medium', 
    HARD = 'hard'
}
export const difficulties: EDifficulty[] = [EDifficulty.EASY, EDifficulty.MEDIUM, EDifficulty.HARD];

export enum EType  {
    MULTIPLE = 'multiple', 
    BOOLEAN = 'boolean'
} 

export const types: EType[] = [EType.MULTIPLE, EType.BOOLEAN];