import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { UserType, CategoryType} from '../types';
import { login } from '../lib/apiWrapper';


type LoginProps = {
    flashMessage: (newMessage:string|null, newCategory:CategoryType|null) => void,
    logUserIn: (user: UserType) => void
    isLoggedIn: boolean
}

export default function Login({ flashMessage, logUserIn, isLoggedIn }: LoginProps) {
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn){
            navigate('/')
        }
    })

    const [userFormData, setUserFormData] = useState<Partial<UserType>>({ email: '', password: ''})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent): Promise<void>  => {
        e.preventDefault();

        const response = await login(userFormData.email!, userFormData.password!)
        console.log(response)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            localStorage.setItem('token', response.data?.token as string)
            flashMessage('You have successfully logged in', 'success')
            logUserIn(response.data!);
            navigate('/')
        }
    }


    return (
        <>
            <h1 className='text-center'>Log In</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>

                        <Form.Label>Email</Form.Label>
                        <Form.Control name='email' placeholder='Enter Email' value={userFormData.email} onChange={handleInputChange}/>

                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' type='password' placeholder='Enter Password' value={userFormData.password} onChange={handleInputChange}/>

                        <Button type='submit' variant='outline-primary' className='w-100 mt-3' >Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}