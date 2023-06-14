import { $authHost } from "./index";

export const fetchLecture = async (id) => {
    const { data } = await $authHost.get(
        id ? 'api/lecture/' + id : 'api/lecture/0'
    )
    return data
}