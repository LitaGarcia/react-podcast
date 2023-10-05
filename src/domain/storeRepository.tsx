

export interface storeRepository {

    saveLocalStorage: (key: string, dataToSave: any) => void;
    getLocalStorage: (dataToGet: any) => any;

}