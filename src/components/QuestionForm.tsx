import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { QuestionFormDataType } from '../types';


type QuestionFormProps = {
    handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
    newQuestion: QuestionFormDataType,
    handleFormSubmit: (e:React.FormEvent) => void,
}

export default function QuestionForm({ handleChange, newQuestion, handleFormSubmit }: QuestionFormProps) {
    return (
        <Card className='my-3'>
            <Card.Body>
                <h3 className='text-center'>Create New Question</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Enter Question</Form.Label>
                    <Form.Control name='question' value={newQuestion.question} onChange={handleChange} />
                    <Form.Label>Enter Answer</Form.Label>
                    <Form.Control name='answer' value={newQuestion.answer} onChange={handleChange} />
                    <Button className='mt-3 w-100' variant='danger' type='submit'>Create Question</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}