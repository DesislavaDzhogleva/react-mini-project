import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/esm/Button';
import styles from './Menu.module.css'; 

export default function MenuItem() {
  return (
    <>
    <div className={styles.menuItemContainer}>
    <Card className={styles.menuItemCard} style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
      <Button variant="primary">Go somewhere</Button>
    </Card>
     <Card className={styles.menuItemCard} style={{ width: '18rem' }}>
     <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
     <Card.Body>
       <Card.Title>Card Title</Card.Title>
       <Card.Text>
         Some quick example text to build on the card title and make up the
         bulk of the card's content.
       </Card.Text>
     </Card.Body>
     <ListGroup variant="flush">
        <ListGroup.Item  className={styles.listItem}>Category</ListGroup.Item>
      </ListGroup>
     <Card.Body>
       <Card.Link href="#">Edit</Card.Link>
       <Card.Link href="#">Delete</Card.Link>
       <Card.Link href="#">Details</Card.Link>
     </Card.Body>
     <Button variant="primary">Go somewhere</Button>
   </Card>
    <Card className={styles.menuItemCard} style={{ width: '18rem' }}>
    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
    </Card.Body>
   
    <Card.Body>
      <Card.Link href="#">Card Link</Card.Link>
      <Card.Link href="#">Another Link</Card.Link>
    </Card.Body>
    <Button variant="primary">Go somewhere</Button>
  </Card>
    </div>
    
  </>
  );
}
