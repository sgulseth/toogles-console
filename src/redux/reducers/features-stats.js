import { FEATURES_STATS_FETCH_SUCCESS } from '../actions/features-stats'
import { keyBy, omit } from 'lodash';

export default function featuresStats(state = [], action = {}) {
    if (!action.payload) {
        return state;
    }

    switch (action.type) {
        case FEATURES_STATS_FETCH_SUCCESS:
            return action.payload.reduce((map, obj) => {
                map[obj.featureId] = obj.stats;
                return map;
            }, {});
    }

    return state;
}
