import { $authHost,$host } from "./index";
import jwt_decode from "jwt-decode";

export const createQuestion = async (question) => {
    const {data} = await $authHost.post('api/test', {question})
    return data
}

export const fetchQuestions = async () => {
    const {data} = await $authHost.get('api/test')
    return data
}

export const fetchOneQuestion = async (id) => {
    const {data} = await $authHost.get('api/test/'+id)
    return data
}

export const createAnswer = async (answer) => {
    const {data} = await $authHost.post('api/answer', {answer})
    return data
}

export const fetchAnswers = async () => {
    const {data} = await $authHost.get('api/answer')
    return data
}

export const fetchOneAnswer = async (id) => {
    const {data} = await $authHost.get('api/answer/'+id)
    return data
}

export const createResult = async (result,questionId,answerId,userId) => {
    const {data} = await $authHost.post('api/result', {result,questionId,answerId,userId})
    return data
}

export const fetchResults = async (userId) => {
    const {data} = await $authHost.get('api/result',{params: {
        userId}}
        )
    return data
}

export const updateResult = async (result,questionId,answerId,userId) => {
    const {data} = await $authHost.put('api/result/update', {result,questionId,answerId,userId})
    return data
}

export const fetchCountRight = async (userId) => {
    const {data} = await $authHost.get('api/result/count',{params: {
        userId}}
        )
    return data
}