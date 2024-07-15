import PropTypes from 'prop-types';
import {
  FormControl,
  Input,
  FormLabel,
  Select,
  Textarea,
  RadioGroup,
  Radio,
  Stack,
  Checkbox
} from '@chakra-ui/react';

export default function Form({
  type,
  isRequired,
  label,
  id,
  name,
  placeholder,
  optData,
  value,
  onChange,
  stackDirection,
  ...props
}) {
  if (type === 'select') {
    return (
      <FormControl isRequired={isRequired}>
        <FormLabel fontSize='xl' htmlFor={id}>
          {label}:
        </FormLabel>
        <Select
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        >
          {optData.map((opt) => (
            <option key={opt.label} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      </FormControl>
    );
  }

  if (type === 'radio-group') {
    return (
      <RadioGroup onChange={onChange} value={value} id={id} name={name}>
        <Stack direction={stackDirection}>
          {optData.map((opt) => (
            <Radio value={opt.value} key={opt.label}>
              {opt.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    );
  }

  if (type === 'radio') {
    return (
      <Radio value={value} onChange={onChange} id={id} name={name}>
        {label}
      </Radio>
    );
  }

  if (type === 'checkbox') {
    return (
      <Checkbox id={id} onChange={onChange} {...props}>
        {label}
      </Checkbox>
    );
  }

  return (
    <FormControl isRequired={isRequired} {...props}>
      <FormLabel fontSize='xl' htmlFor={id}>
        {label}
      </FormLabel>
      {type === 'textarea' ? (
        <Textarea id={id} onChange={onChange} value={value} />
      ) : (
        <Input
          id={id}
          type={type}
          onChange={onChange}
          value={value}
          autoComplete='off'
          variant='flushed'
        />
      )}
    </FormControl>
  );
}

Form.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  optData: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  stackDirection: PropTypes.string
};
