export interface IFilterButton{
    type: EFilter;
    label: string;
    isActive: boolean;
}

export enum EFilter{
    All,
    Active,
    Completed
}