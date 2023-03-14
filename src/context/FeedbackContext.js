
import { v4 as uuidv4} from 'uuid'
import { createContext, useState } from "react"

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This item is from context',
            rating: 10
        },
        {
            id: 2,
            text: 'This item is from context',
            rating: 9
        },
        {
            id: 3,
            text: 'This item is from context',
            rating: 6
        },
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    // Add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4() 
        setFeedback([newFeedback, ...feedback])
    }
    
    // delete Feedback
    const deleteFeedback = (id) => {
        if (window.confirm('Delete this feedback?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
          }
         
    }

    // Update feedback item
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem} : item) )
    }

    // Edit Feedback
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    } 

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}

    </FeedbackContext.Provider>
}

 export default FeedbackContext