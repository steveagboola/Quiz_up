import { useState, useEffect } from 'react';
import { getMyQuestions, editQuestion, deleteQuestion } from '../lib/apiWrapper';
import { QuestionType, UserType } from '../types';
import { useParams } from 'react-router-dom';
import EditQuestionForm from '../components/EditQuestionForm';

type EditQuestionsProps = { currentUser: UserType | null };

export default function EditQuestions({currentUser }: EditQuestionsProps) {
    console.log('currentUser', currentUser)
    const [question, setQuestion] = useState<Partial<QuestionType>>({});
    const { questionId } = useParams();

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('token') || '';
            const response = await getMyQuestions(token);
            console.log(response);
            if (response.data) {
                const questions = response.data;
                for (const question of questions) {
                    if (question.id === Number(questionId)) {
                        setQuestion(question);
                    }
                }
            }
        }

        fetchData();
    }, [questionId]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion({ ...question, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token') || '';
        const response = await editQuestion(token, question.id!, question);
        if (response.error) {
            console.log(response.error);
        } else {
            console.log(response.data);
        }
    };

    const handleDeleteQuestion = async () => {
        const token = localStorage.getItem('token') || '';
        

        if (questionId) {
            const response = await deleteQuestion(token, questionId);
            if (response.error) {
                console.log(response.error);
            } else {
                console.log(response.data);
            }
        }
    };


    return (
        <>
            {question ? (
                <EditQuestionForm
                    newQuestion={question}
                    handleChange={handleInputChange}
                    handleFormSubmit={handleFormSubmit}
                    handleDeleteClick={handleDeleteQuestion} 
                />
            ) : (
                <h1>No Questions</h1>
            )}
        </>
    );
}