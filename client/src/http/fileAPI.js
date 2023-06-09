import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createFile = async (file) => {
    const { data } = await $authHost.post('api/file', { file })
    return data
}

export const fetchOneFile = async (id) => {
    const { data } = await $authHost.get('api/file/' + id)
    return data
}

export const fetchOneFileAsJson = async (id) => {
    const { data } = await $authHost.get('api/file/json/' + id)
    return data
}