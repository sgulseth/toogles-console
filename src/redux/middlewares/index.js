import { apiMiddleware } from 'redux-api-middleware';

export default function getMiddlewares() {
    return [apiMiddleware];
}
