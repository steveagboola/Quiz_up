export type UserFormDataType = {
    first_name:string,
    last_name:string,
    email:string,
    password:string,
    confirmPass:string

}

export type UserType = {
    admin:null
    created_on:string,
    email: string,
    first_name: string,
    last_name: string,
    password?: string,
    modified_on:string,
    token:string,
    user_id:number,
    username: string
}

export type CategoryType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light'

export type TokenType = {
    token: string,
    tokenExpiration: string
}

export type QuestionFormDataType = {
    question:string,
    answer:string
}

export type QuestionType = {
    id:number,
    question:string,
    answer:string,
    dateCreated:string,
    userId:number,
    author: string,
}