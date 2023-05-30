import {makeAutoObservable} from 'mobx'

export default class ResultCourse {
    constructor() {
        this._results=[]

        this._rightResults=0
        this._selectedResult={}
        makeAutoObservable(this)
    }

    setRightResults(rightResults) {
        this._rightResults = rightResults
    }

    setResults(results) {
        this._results = results
    }

    setSelectedResult(results) {
        this._selectedResult = results
    }

    get results() {
        return this._results
    }
    get rightResults() {
        return this._rightResults
    }
    get selectedResult() {
        return this._selectedResult
    }
}