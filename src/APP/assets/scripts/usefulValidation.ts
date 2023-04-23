import { PassComp, EmailComp, UserData, LoginComp } from "../../model"
import moment from "moment"

//Valida entrada de email.
export const validEmail = (email: string): boolean => {
    const isEmail: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return isEmail.test(email);
}

//Valida presença de maiúsculas e minusculas.
export const validCaseSensetive = (password : string): boolean => {
    const isCaseSense: RegExp = /^(?=.*[A-Z])(?=.*[a-z]).+$/i;
    return isCaseSense.test(password);
}

//Valida presença de números.
export const validPresentNumber = (password : string): boolean => {
    const presentNumber : RegExp = /^(?=.*[0-9]).+$/i;
    return presentNumber.test(password);
}

//Valida presença de caracteres especiais (!@#$%&*.^~).
export const validSpecialChar = (password : string): boolean => {
    const presentSpacialChar : RegExp = /^(?=.*[!@#$%&*.^~]).+$/i;
    return presentSpacialChar.test(password);
}

//Valida comprimento minimo e maximo.
export const validLengthPassword = (password : string): boolean => {
    return password.length >= 6 && password.length <= 15;
}

//Valida se é uma senha forte.
export const validPassword = (password: string): boolean => {
    return (validCaseSensetive(password) && 
                validPresentNumber(password) &&
                        validLengthPassword(password))
}

//Valida se senhas conferem e se é forte
export const validFullPassword = ({password, password_comp}:PassComp) =>{
    return validPassword(password) && password == password_comp;
}

//Valida email e confere se é igual a verificaçao
export const validFullEmail = ({email, email_comp}:EmailComp) =>{
    return validEmail(email) && email === email_comp;
}

export const validIdade = (dateNasc: string) => {
    const minAge = moment().subtract(16, 'years');
    const maxAge = moment().subtract(150, 'years');
    const birthDate = moment(dateNasc, 'YYYY-MM-DD');

    return birthDate.isBetween(maxAge, minAge, undefined, '[]');
}

export const validaDadosUsuario = ({CPF, Nome, Sobrenome, Nascimento, Genero}:UserData) => {
    return  Nome && Sobrenome && validIdade(Nascimento) && Genero && CPF;
}

export const validaDadosLogin = ({Email, ValidarEmail, Pass, ValidarPass}:LoginComp) => {
    return validFullEmail({email: Email, email_comp: ValidarEmail}) 
            && validFullPassword({password: Pass, password_comp: ValidarPass})
}