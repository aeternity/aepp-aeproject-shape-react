import keyPair from './../config/keyPair';
import nodeConfig from './../config/nodeConfig';

const initState = {
    ...keyPair,
    ...nodeConfig,
    aeppUrl: 'http://localhost:8080',
    runningInFrame: false,
    client: null,
    balance: null,
    height: null,
}

const rootReducer = (state = initState, action) => {
    return state;
}

export default rootReducer;