import {storeRepository} from "../../../domain/storeRepository";


export const LocalStoreRepository = (): storeRepository => ({
    saveLocalStorage: (key, dataToSave) => {
        localStorage.setItem(key, dataToSave)
    },
    getLocalStorage: (dataToGet) => {
        return localStorage.getItem(dataToGet)
    }
})


