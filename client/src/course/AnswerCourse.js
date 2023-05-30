import {makeAutoObservable} from 'mobx'

export default class AnswerCourse {
    constructor() {
        this._answers=[]

        this._selectedAnswer={}
        makeAutoObservable(this)
    }

    setAnswers(answers) {
        this._answers = answers
    }

    setSelectedAnswer(answer) {
        this._selectedAnswer = answer
    }

    get answers() {
        return this._answers
    }

    get selectedAnswer() {
        return this._selectedAnswer
    }
}