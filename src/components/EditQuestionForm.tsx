import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { QuestionType } from '../types';


type QuestionFormProps = {
    handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
    newQuestion: Partial<QuestionType>,
    handleFormSubmit: (e:React.FormEvent) => void,
    handleDeleteClick: () => void;
}

export default function EditQuestionForm({ handleChange, newQuestion, handleFormSubmit, handleDeleteClick }: QuestionFormProps) {
    return (
        <Card className='my-3'>
            <Card.Body>
                <h3 className='text-center'>Edit Question</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Enter Question</Form.Label>
                    <Form.Control name='question' value={newQuestion.question} onChange={handleChange} />
                    <Form.Label>Enter Answer</Form.Label>
                    <Form.Control name='answer' value={newQuestion.answer} onChange={handleChange} />
                    <Button className='mt-3 w-100' variant='danger' type='submit'>Submit Edited Question</Button>
                    <Button variant="danger" onClick={handleDeleteClick}>Delete Question</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}