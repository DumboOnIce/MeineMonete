import { Injectable } from "@angular/core";
import { localStorageLoadedDataName } from "../consants";
import { IMoneyFyDataItemDto } from "../models/data-transfer-objects/money-fy-data-item-dto";

@Injectable({
    providedIn: "root",
})
export class LocalStorageService {

    public getMoneyFyData(): IMoneyFyDataItemDto[] {
        return JSON.parse(localStorage.getItem(localStorageLoadedDataName) as string) as IMoneyFyDataItemDto[];
    }
    
    public saveMoneyFyData(data: IMoneyFyDataItemDto[])
    {
        localStorage.setItem(localStorageLoadedDataName, JSON.stringify(data));
    }
    
}