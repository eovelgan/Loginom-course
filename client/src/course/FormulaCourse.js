import {makeAutoObservable} from 'mobx'

export default class FormulaCourse {
    constructor() {
        this._formulas=[]
        
        this._selectedFormula={}
        makeAutoObservable(this)
    }
    setFormulas(formulas) {
        this._formulas = formulas
    }
    setSelectedFormula(formula) {
        this._selectedQuestion = formula
    }

    get formulas() {
        return this._formulas
    }
    get selectedFormula() {
        return this._selectedFormula
    }
}