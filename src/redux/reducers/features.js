import { FEATURES_FETCH_SUCCESS, FEATURE_SAVE_SUCCESS, FEATURE_DELETE_SUCCESS } from '../actions/features'
import { keyBy, omit } from 'lodash';

export default function features(state = [], action = {}) {
    if (!action.payload) {
        return state;
    }

    switch (action.type) {
        case FEATURES_FETCH_SUCCESS:
            return keyBy(action.payload, 'id');

        case FEATURE_SAVE_SUCCESS:
            return Object.assign({}, state, {
                [action.payload.id]: action.payload
            });

        case FEATURE_DELETE_SUCCESS:
            return omit(state, [action.payload.feature.id]);
    }

    return state;
}
