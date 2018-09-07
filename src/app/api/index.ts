import axios from 'axios';

import api, { IApiMethod } from './api';
import createApiMap from './apiUtils';

const apiMap = <IApiMethod>createApiMap(api);

export default { ...apiMap };
