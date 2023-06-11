import { $authHost } from "./index";

export const fetchLectureProgress = async (userId) => {
    const { data } = await $authHost.get('api/user_lecture', {
        params: {
            userId
        }
    } )
    return data
}

export const createLectureProgress = async (lectureId, userId) => {
    const { data } = await $authHost.post('api/user_lecture', { lectureId, userId })
    return data
}