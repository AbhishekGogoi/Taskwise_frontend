import React from 'react'
import { useParams } from 'react-router-dom';

function NewTaskPage() {
    const { id } = useParams();

    return (
        <div>
            <h1>New Task Page for Project ID: {id}</h1>
            {/* Other content of the new task page */}
        </div>
    );

}

export default NewTaskPage