import { $authHost,$host } from "./index";
import jwt_decode from "jwt-decode";

export const createFormula = async (value) => {
    const {data} = await $authHost.post('api/formula', {value})
    return data
}

export const fetchOneFormula = async (id) => {
    const {data} = await $authHost.get('api/formula/'+id)
    return data
}