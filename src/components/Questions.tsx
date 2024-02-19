import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserType, QuestionType } from '../types';
import { deleteQuestion } from '../lib/apiWrapper';

type Props = {
    question: QuestionType,
    currentUser: UserType | null
}

export default function Question({ question, currentUser }: Props) {
    const [checkGuess, setCheckGuess] = useState(false)
    const [correctAnswer, setCorrectAnswer] = useState(false)
    const [guess, setGuess] = useState('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGuess(e.target.value)
    }

    const checkAnswer = () => {
        setCheckGuess(true)
        if (question.answer === guess) {
            console.log('Hurray Crushed It!')
            setCorrectAnswer(true)
        } else {
            console.log('What a dum dum')
            setCorrectAnswer(false)
        }
    }

    const navigate = useNavigate();
    const routeChange = () => {
        const path = `/editquestions`;
        navigate(path);
    }

    const handleDelete = async () => {
        const token = localStorage.getItem('token') || '';
        const response = await deleteQuestion(token, question.id.toString());
        if (response.error) {
            console.log(response.error);
        } else {
            console.log(response.data);
        }
    }

    console.log(currentUser?.first_name + ' ' + currentUser?.last_name + '_' + String(currentUser?.user_id).padStart(4, '0'))

    return (
        <Card className='my-3'>
            <Card.Body>
                <Card.Title>{question.question}</Card.Title>

                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Answer"
                        aria-label="Answer"
                        aria-describedby="basic-addon2"
                        onChange={handleChange}
                        value={guess}
                    />
                    <Button variant="secondary" id="button-addon2" onClick={checkAnswer}>
                        Check Answer
                    </Button>
                </InputGroup>

                {checkGuess ? correctAnswer ? <h4>You are correct!</h4> : <h4>You are incorrect.</h4> : null}
                <Card.Subtitle>
                    Posted at {question.dateCreated} by {question.author}
                </Card.Subtitle>
                {currentUser && `${currentUser.first_name} ${currentUser.last_name}_${String(currentUser.user_id).padStart(4, '0')}` === question.author && (
                    <>
                        <Link to={`/editquestions/${question.id}`}>
                            <Button variant='light' className='mt-3' onClick={routeChange}>Edit Question</Button>
                        </Link>
                        <Button variant='danger' className='mt-3 ml-3' onClick={handleDelete}>Delete Question</Button>
                    </>
                )}

            </Card.Body>
        </Card>
    )
}