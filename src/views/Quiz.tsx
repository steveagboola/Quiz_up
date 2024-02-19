/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/ban-types */
import { useState, useEffect } from 'react';
import { getAllQuestions } from '../lib/apiWrapper';
import Question from '../components/Questions';
import { QuestionType } from '../types'; 



type Props = {};

export default function Quiz({ }: Props) {
    const [questions, setQuestions] = useState<QuestionType[]>([]); 

    useEffect(() => {
        async function fetchData() {
            const response = await getAllQuestions();
            console.log(response);
            if (response.data) {
                const questionsData: QuestionType[] = response.data; 
                setQuestions(questionsData);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            {questions.map(q => (
                <Question key={q.id} question={q} currentUser={null} /> 
            ))}
        </div>
    );
}
