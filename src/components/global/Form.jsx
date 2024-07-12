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

  if (type === 'radio-group') {
    return (
      <RadioGroup onChange={onChange} value={value}>
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
      <Radio value={value} onChange={onChange}>
        {label}
      </Radio>
    );
  }

  if (type === 'checkbox') {
    return (
      <Checkbox id={id} value={value} onChange={onChange}>
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
  optData: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  stackDirection: PropTypes.string
};
