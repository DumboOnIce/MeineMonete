import { Injectable } from "@angular/core";
import { LocalStorageLoadedDataName } from "../constants";
import { IMoneyFyDataItemDto } from "../models/data-transfer-objects/money-fy-data-item-dto";

@Injectable({
    providedIn: "root",
})
export class LocalStorageService {

    public getMoneyFyData(): IMoneyFyDataItemDto[] {
        return JSON.parse(localStorage.getItem(LocalStorageLoadedDataName) as string) as IMoneyFyDataItemDto[];
    }

    public saveMoneyFyData(data: IMoneyFyDataItemDto[])
    {
        localStorage.setItem(LocalStorageLoadedDataName, JSON.stringify(data));
    }

}
