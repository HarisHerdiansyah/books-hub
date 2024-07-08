import PropTypes from 'prop-types';
import {
  FormControl,
  Input,
  FormLabel,
  Select,
  Textarea
} from '@chakra-ui/react';

export default function Form({
  type,
  isRequired,
  label,
  id,
  placeholder,
  optData
}) {
  if (type === 'select') {
    return (
      <FormControl isRequired={isRequired}>
        <FormLabel fontSize='xl' htmlFor={id}>
          {label}:
        </FormLabel>
        <Select id={id} placeholder={placeholder}>
          {optData.map((opt) => (
            <option key={opt.label} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <FormControl isRequired={isRequired}>
      <FormLabel fontSize='xl' htmlFor={id}>
        {label}
      </FormLabel>
      {type === 'textarea' ? (
        <Textarea id={id} />
      ) : (
        <Input id={id} type={type} autoComplete='off' />
      )}
    </FormControl>
  );
}

Form.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  id: PropTypes.string.isRequired,
  optData: PropTypes.array
};
