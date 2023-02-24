import {Credentials} from '@aws-sdk/client-sts';
import {createContext} from 'react';

export const CredentialsContext = createContext<Credentials | undefined>(undefined);
