import React from 'react'
import { useParams } from 'react-router-dom';

function TaskDetailsPage() {
    const { taskID } = useParams();
    console.log(taskID)
  return (
    <div>
            <h1>task description for: {taskID}</h1>
            {/* Other content of the new task page */}
        </div>
  )
}

export default TaskDetailsPage