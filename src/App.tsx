import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Container from 'react-bootstrap/Container';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Quiz from './views/Quiz';
import AlertMessage from './components/AlertMessage';
import { CategoryType, UserType } from './types';
import UserQuestions from './views/UserQuestion';
import EditQuestions from './views/EditQuestions';

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);

    const [message, setMessage] = useState<string | null>(null)
    const [category, setCategory] = useState<CategoryType | null>(null)

    const logUserIn = (user: UserType) => {
        setIsLoggedIn(true);
        setLoggedInUser(user)
    }

    const logUserOut = () => {
        setIsLoggedIn(false);
        setLoggedInUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExp');
        flashMessage("You have logged out", "primary");
    }

    const flashMessage = (newMessage: string | null, newCategory: CategoryType | null) => {
        setMessage(newMessage);
        setCategory(newCategory);
    }

    return (
        <div>
            <Navigation isLoggedIn={isLoggedIn} handleClick={logUserOut} />
            <Container>
                {message && <AlertMessage message={message} category={category} flashMessage={flashMessage} />}
                <Routes>
                    <Route path='/' element={<Home isLoggedIn={isLoggedIn} currentUser={loggedInUser} />} />
                    <Route path='/login' element={<Login flashMessage={flashMessage} logUserIn={logUserIn} isLoggedIn={isLoggedIn} />} />
                    <Route path='/signup' element={<SignUp flashMessage={flashMessage} />} />
                    <Route path='/quiz' element={<Quiz />} />
                    <Route path='/userquestions' element={<UserQuestions currentUser={loggedInUser} />} />
                    <Route path='/editquestions/:questionId' element={<EditQuestions currentUser={loggedInUser} />} />
                </Routes>

            </Container>
        </div>
    )
}