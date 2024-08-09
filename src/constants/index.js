import { createContext } from 'react';
import * as functions from './functions';
import * as utils from './utils';
import PATH from './routes';

const Context = createContext();

export { functions, utils, PATH, Context };
