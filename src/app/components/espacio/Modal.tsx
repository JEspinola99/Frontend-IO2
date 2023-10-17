import InputValidated from '@/components/common/inputValidated';
import { useRouter } from 'next/router';
import { InputGroup ,Button, Col,Form,Table, Container ,FormControl, Modal, Row } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import Select from 'react-select'
import { useState } from 'react';

export const CreateTableroModal = (props) => {

    const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const { register, setValue, getValues } = useFormContext()
    
    return (
    <Modal {...props} size="lg" aria-labelledby="example-modal-sizes-title-lg">
     
            <Modal.Header closeButton>
               <Modal.Title id="example-modal-sizes-title-lg">
          Tarea
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
                <Row>
                    <Col>
                        <InputValidated label="Nombre" {...register('nombre', { required: "Nombre es obligatorio" })} />
                    </Col>
                </Row>
               
           </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Save</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
        
    </Modal>
    )
}


