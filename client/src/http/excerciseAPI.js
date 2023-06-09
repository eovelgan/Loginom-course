import { $authHost } from "./index";

export const fetchOneExcercise = async (id) => {
    const { data } = await $authHost.get('api/excercise/' + id )
    return data
}

export const fetchOneFileAsJson = async (id) => {
    const { data } = await $authHost.get('api/excercise/json/' + id)
    return data
}