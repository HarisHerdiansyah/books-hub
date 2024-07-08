import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Button,
  ButtonGroup
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function ListBookCard() {
  const navigate = useNavigate();

  const handleEditNavigate = () => navigate('/book/edit');

  return (
    <Card w='100%' variant='outline'>
      <CardBody>
        <Link to='/book/detail'>
          <Button
            fontSize={22}
            fontWeight='semibold'
            color='#392467'
            mb={4}
            variant='link'
          >
            Negeri 5 Menara
          </Button>
        </Link>
        <Text my={2}>Tahun Terbit: 2013</Text>
        <Text my={2}>Author: Ahmad Fuadi</Text>
        <Text my={2}>Publik: Ya/Tidak</Text>
      </CardBody>
      <CardFooter justify='flex-end'>
        <ButtonGroup>
          <Button
            colorScheme='yellow'
            leftIcon={<FontAwesomeIcon icon={faPencilAlt} />}
            onClick={handleEditNavigate}
          >
            Edit
          </Button>
          <Button
            colorScheme='green'
            leftIcon={<FontAwesomeIcon icon={faCheck} />}
          >
            Selesai
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
