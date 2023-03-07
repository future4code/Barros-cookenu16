import {v4} from 'uuid'

export abstract class IdGenerator{
     static ID = ()=>{
        return v4()
    }

}