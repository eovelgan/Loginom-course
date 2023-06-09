import { makeAutoObservable } from 'mobx'

export default class QuestionCourse {
    constructor() {
        this._questions = []

        this._selectedQuestion = {}
        makeAutoObservable(this)
    }
    setQuestions(questions) {
        this._questions = questions
    }
    setSelectedQuestion(question) {
        this._selectedQuestion = question
    }

    get countQuestions() {
        return this._questions.length
    }
    get questions() {
        return this._questions
    }
    get selectedQuestion() {
        return this._selectedQuestion
    }
}