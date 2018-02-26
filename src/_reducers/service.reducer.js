import { userConstants } from '../_constants';

export function service(state = {}, action) {
  switch (action.type) {
    case userConstants.SERVICE_REQUEST:
        let data = action.data.rows[0].elements[0];
        if (data.distance && data.duration){
            return {
                distance: data.distance.text,
                duration: data.duration.text
            };
        } else {
            return {
                distance: 'Not Found',
                duration: 'Not Found'
            }
        }

    default:
      return state
  }
}