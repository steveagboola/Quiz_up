import {useState, useEffect} from 'react'
import {getMyQuestions} from '../lib/apiWrapper'
import Question from '../components/Questions'
import { QuestionType, UserType } from '../types'



type UserQuestionsProps = {currentUser:UserType | null}

export default function UserQuestions({currentUser}: UserQuestionsProps) {
    const [questions, setQuestions] = useState<QuestionType[]>([])

    useEffect( () => {
        async function fetchData(){
            const token = localStorage.getItem('token') || ''
            const response = await getMyQuestions(token);
            console.log(response);
            if (response.data){
                const questions = response.data;
                setQuestions(questions)
            }
        }

        fetchData();
    }, [] )

    return (
        <div>{questions.map(q => <Question key={q.id} question = {q} currentUser={currentUser} />)}</div>
    )
}