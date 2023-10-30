import { getKeycloak } from '../../../components/misc/Helpers'
import { useState } from 'react';
import MessageModel from '../../../models/MessageModel';
import { config } from '../../../Constants'
import { bearerAuth } from '../../../components/misc/Helpers'

export const PostNewMessage = () => {
    
    const  keycloak = getKeycloak()
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    async function submitNewQuestion() {
        const url = `${config.url.API_BASE_URL}/book/messages/secure/add/message`;
        if (keycloak.authenticated && title !== '' && question !== '') {
            const messageRequestModel: MessageModel = new MessageModel(title, question);
            const requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: bearerAuth(keycloak),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageRequestModel)
            };

            const submitNewQuestionResponse = await fetch(url, requestOptions);
            if (!submitNewQuestionResponse.ok) {
                throw new Error('Something went wrong!');
            }

            setTitle('');
            setQuestion('');
            setDisplayWarning(false);
            setDisplaySuccess(true);
        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }
    
    return (
        <div className='card mt-3'>
            <div className='card-header'>
                Ask question to Luv 2 Read Admin
            </div>
            <div className='card-body'>
                <form method='POST'>
                    {displayWarning && 
                        <div className='alert alert-danger' role='alert'>
                            All fields must be filled out
                        </div>
                    }
                    {displaySuccess && 
                        <div className='alert alert-success' role='alert'>
                            Question added successfully
                        </div>
                    }
                    <div className='mb-3'>
                        <label className='form-label'>
                            Title
                        </label>
                        <input type='text' className='form-control' id='exampleFormControlInput1' 
                            placeholder='Title' onChange={e => setTitle(e.target.value)} value={title}/>
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>
                            Question
                        </label>
                        <textarea className='form-control' id='exampleFormControlTextarea1' 
                            rows={3} onChange={e => setQuestion(e.target.value)} value={question}>
                        </textarea>
                    </div>
                    <div>
                        <button type='button' className='btn btn-primary mt-3' onClick={submitNewQuestion}>
                            Submit Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}