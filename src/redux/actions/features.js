import { CALL_API } from 'redux-api-middleware';
import appConfig from '../../app-config';

export const FEATURES_FETCH_SUCCESS = 'FEATURES_FETCH_SUCCESS';
export const FEATURES_FETCH_FAILURE = 'FEATURES_FETCH_FAILURE';
export const FEATURES_FETCH_PENDING = 'FEATURES_FETCH_PENDING';

export const FEATURE_SAVE_SUCCESS = 'FEATURE_SAVE_SUCCESS';
export const FEATURE_SAVE_FAILURE = 'FEATURE_SAVE_FAILURE';
export const FEATURE_SAVE_PENDING = 'FEATURE_SAVE_PENDING';
export const FEATURE_DELETE_PENDING = 'FEATURE_DELETE_PENDING';
export const FEATURE_DELETE_SUCCESS = 'FEATURE_DELETE_SUCCESS';
export const FEATURE_DELETE_FAILURE = 'FEATURE_DELETE_FAILURE';

const { api } = appConfig;

export const fetchFeatures = (force = false) => {
    return {
        [CALL_API]: {
            endpoint: `${api.url}/api/features`,
            bailout: ({ features }) => features.loading || ((features.items || []).length && !force),
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api.token}`
            },
            types: [
                {
                    type: FEATURES_FETCH_PENDING,
                    payload: (action) => {
                        return {
                            endpoint: action[CALL_API].endpoint
                        };
                    }
                },
                FEATURES_FETCH_SUCCESS,
                FEATURES_FETCH_FAILURE
            ]
        }
    };
};

export const saveFeature = (feature) => {
    let endpoint = `${api.url}/api/feature`;
    let method = 'POST';

    if (feature.id) {
        endpoint += `?id=${feature.id}`;
        method = 'PUT';
    }

    return {
        [CALL_API]: {
            endpoint,
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api.token}`
            },
            body: JSON.stringify(feature),
            types: [
                {
                    type: FEATURE_SAVE_PENDING,
                    payload: (action) => {
                        return {
                            endpoint: action[CALL_API].endpoint
                        };
                    }
                },
                FEATURE_SAVE_SUCCESS,
                FEATURE_SAVE_FAILURE
            ]
        }
    };
}


export const deleteFeature = (feature) => {
    const endpoint = `${api.url}/api/feature?id=${feature.id}`;
    const method = 'DELETE';

    return {
        [CALL_API]: {
            endpoint,
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api.token}`
            },
            types: [
                {
                    type: FEATURE_DELETE_PENDING,
                    payload: (action) => {
                        return {
                            endpoint: action[CALL_API].endpoint
                        };
                    }
                },
                {
                    type: FEATURE_DELETE_SUCCESS,
                    payload: (action) => {
                        return { feature };
                    }
                },
                FEATURE_DELETE_FAILURE
            ]
        }
    };
}
