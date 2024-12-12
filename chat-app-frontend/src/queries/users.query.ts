import { gql } from "@apollo/client";


export const CREATE_USER = gql`mutation CreateUser($createUserInput: CreateUserInput!){
    createUser(createUserInput: $createUserInput){
        uId
        firstName
        lastName
        emailId
        uniqueId
    }
}`

export const SIGN_IN = gql`
    query SignIn($emailId: String!, $password: String!){
        signIn(emailId: $emailId, password: $password){
            token
        }
    }
`