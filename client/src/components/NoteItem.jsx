import Card from 'react-bootstrap/Card';
import './NoteItem.css';

const NoteItem = ({ data, clickHandler }) => {
    return (
        <Card onClick={() => clickHandler(data._id)} className='notes-card'>
            <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>{data.text}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default NoteItem;
