import React, { useState } from 'react';
import axios from 'axios';
import Chart from './components/Chart';
import Chart2 from './components/Chart2';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

function App() {
    const [result, setResult] = useState();
  

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const response = await axios.post('http://localhost:3001/upload', formData);
        const tab = response.data.response.entities

       
        const count = tab.reduce((acc, entity) => {
            acc[entity.entityId] = (acc[entity.entityId] || 0) + 1;
            return acc;
        }, {});

        
        const entitiesWithCount = tab.map((entity) => {
            return {
                ...entity,
                count: count[entity.entityId]
            };
        });

        setResult(entitiesWithCount);
        // console.log(entitiesWithCount);

    };
    // console.log(result);
    return (
        <div className='bg-light'>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 p-4" controlId="form">
                    <Form.Label>Choose TXT file</Form.Label>
                    <Form.Control type="file" name="file" />
                    <Form.Text className="">

                    </Form.Text>
                </Form.Group>

                <Button className='ms-4' variant="outline-primary" type="submit">
                    Submit
                </Button>
            </Form>

            {result && (
                <div className='ms-4 mt-4 mb-4'>
                    <div className='mb-4'>
                        <h2 className="">frekvence slov</h2>
                    </div>
                    <div>
                        <Chart result={result} />
                    </div>
                </div>
            )}

            {result && (
                <div className='ms-4 mt-8 mb-4'>
                    <div className='mb-4'>
                        <h2 className="">frekvence typů</h2>
                    </div>
                    <div>
                        <Chart2 result={result} />
                    </div>
                </div>
            )}


            {result && (
                <ul>
                    <h2 className="">Frekvence slov a typů v textu</h2>
                    {result.map((entity) => (
                        <li key={entity.id}>
                            <h3 className="text-secondary">Solvo: </h3>
                            <h3 className="text-primary">{entity.entityId}</h3>
                            {entity.type && <h3 className="text-secondary">Typ slova:</h3>}
                            {entity.type && <p className="text-primary">{entity.type}</p>}
                            {entity.count > 1 && <p>Slovo se opakuje {entity.count} krát</p>}
                        </li>
                    ))}
                </ul>
            )}
           

        </div>
    );
}

export default App;
