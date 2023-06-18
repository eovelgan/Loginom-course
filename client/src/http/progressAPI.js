import { $authHost } from "./index";

export const fetchLectureProgress = async (userId) => {
    const { data } = await $authHost.get('api/user/' + userId + '/lecture-progress')
    return data
}

export const fetchExcerciseProgress = async (userId) => {
    const { data } = await $authHost.get('api/user/' + userId + '/excercise-progress')
    return data
}

export const updateLectureProgress = async (lectureId, userId) => {
    if (!lectureId || !userId) return undefined;
    const { data } = await $authHost.get('api/user/' + userId + '/add-lecture-progress/' + lectureId)
    return data
}

export const updateExcerciseProgress = async (excerciseId, userId) => {
    if (!excerciseId || !userId) return undefined;
    const { data } = await $authHost.get('api/user/' + userId + '/add-excercise-progress/' + excerciseId)
    return data
}

export const checkExcercise = async (id, textAnswer, fileAnswer) => {
    const { data } = await $authHost.post('api/excercise/' + id + '/check', { textAnswer: textAnswer, fileAnswer: fileAnswer })
    return data;
}
