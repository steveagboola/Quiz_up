import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { UserFormDataType, CategoryType } from '../types';
import { createNewUser } from '../lib/apiWrapper';


type SignUpProps = {
    flashMessage: (newMessage:string|null, newCategory:CategoryType|null)=>void
}

export default function SignUp({ flashMessage }: SignUpProps) {

    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState<UserFormDataType>(
        {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmPass: ''
        }
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent): Promise<void> => {
        e.preventDefault();

        const response = await createNewUser(userFormData);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`Congrats you have signed up with the username: ${userFormData?.email}`, 'success');
            navigate('/login');
        }
    }

    const disableSubmit = userFormData.password.length < 5 || userFormData.password !== userFormData.confirmPass

    return (
        <>
            <h1 className='text-center'>Register</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name='first_name' placeholder='Enter First Name' value={userFormData.first_name} onChange={handleInputChange}/>

                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name='last_name' placeholder='Enter Last Name' value={userFormData.last_name} onChange={handleInputChange}/>

                        <Form.Label>Email</Form.Label>
                        <Form.Control name='email' type='email' placeholder='Enter Email Address' value={userFormData.email} onChange={handleInputChange}/>

                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' type='password' placeholder='Enter Password' value={userFormData.password} onChange={handleInputChange}/>

                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control name='confirmPass' type='password' placeholder='Re-Enter Password' value={userFormData.confirmPass} onChange={handleInputChange}/>
                        {disableSubmit && <Form.Text className='text-danger'>Your passwords must be at least 6 characters and match</Form.Text>}

                        <Button type='submit' variant='outline-primary' className='w-100 mt-3' disabled={disableSubmit}>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}