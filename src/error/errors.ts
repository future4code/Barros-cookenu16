import { CustomError } from './CustomErrors';

export class PleaseInsert extends CustomError{
    constructor(){
        super(422, 'Todas a informações devem ser inseridas.')
    }
}

export class PasswordInvalid extends CustomError{
    constructor(){
        super(422, 'A senha precisa conter no minimo 6 caractéres.')
    }
}

export class EmailInvalid extends CustomError{
    constructor(){
        super(422, 'O formato do email é invalido.')
    }
}

export class UserNotFound extends CustomError{
    constructor(){
        super(404, 'Usuário não encontrado.')
    }
}

export class PasswordWrong extends CustomError{
    constructor(){
        super(404, 'Senha incorreta.')
    }
}

export class IdNotInserted extends CustomError{
    constructor(){
        super(422, 'O id não foi inserido.')
    }
}

export class TokenNotInserted extends CustomError{
    constructor(){
        super(422, 'O token não foi inserido.')
    }
}

export class RecipeNotFound extends CustomError{
    constructor(){
        super(401, 'Receita não encontrada.')
    }
}

export class NotAuthorized extends CustomError{
    constructor(){
        super(404, 'Usuário não autorizado..')
    }
}