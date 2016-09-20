import { CALL_API } from 'redux-api-middleware';
import appConfig from '../../app-config';

export const FEATURES_STATS_FETCH_SUCCESS = 'FEATURES_STATS_FETCH_SUCCESS';
export const FEATURES_STATS_FETCH_FAILURE = 'FEATURES_STATS_FETCH_FAILURE';
export const FEATURES_STATS_FETCH_PENDING = 'FEATURES_STATS_FETCH_PENDING';

const { api } = appConfig;

export const fetchFeaturesStats = (force = false) => {
    console.log('woop')
    return {
        [CALL_API]: {
            endpoint: `${api.url}/api/features/stats`,
            bailout: ({ featuresStats }) => featuresStats.loading || ((featuresStats.items || []).length && !force),
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api.token}`
            },
            types: [
                {
                    type: FEATURES_STATS_FETCH_PENDING,
                    payload: (action) => {
                        return {
                            endpoint: action[CALL_API].endpoint
                        };
                    }
                },
                FEATURES_STATS_FETCH_SUCCESS,
                FEATURES_STATS_FETCH_FAILURE
            ]
        }
    };
};
