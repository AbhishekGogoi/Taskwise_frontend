import React from 'react'

function Task({tid}) {
    
    const taskData = {
        "1": {
            "id": 1,
            "content": "Take out the garbage"
        },
        "2": {
            "id": 2,
            "content": "Watch my favorite show"
        },
        "3": {
            "id": 3,
            "content": "Charge my phone"
        },
        "4": {
            "id": 4,
            "content": "Cook dinner"
        }
    };
  return (
    <div>{tid}</div>
  )
}

export default Task