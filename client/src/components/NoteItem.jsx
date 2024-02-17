import Card from 'react-bootstrap/Card';

const NoteItem = ({ data, clickHandler }) => {
    return (
        <Card onClick={() => clickHandler(data._id)}>
            <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>{data.text}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default NoteItem;
