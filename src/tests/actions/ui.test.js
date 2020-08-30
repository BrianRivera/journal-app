import '@testing-library/jest-dom'
import { setError, removeError, startLoading, finishLoading } from '../../actions/ui'
import { types } from '../../types/types'




describe('Pruebas en ui', () => {

    test('Todas las acciones deben funcionar', () => {

        const action = setError('helpp!!!')

        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'helpp!!!'
        });

        const actionremoveError = removeError();
        const actionstartLoading = startLoading();
        const actionfinishLoading = finishLoading();

        expect(actionremoveError).toEqual({
            type: types.uiERemoveError
        });
        expect(actionstartLoading).toEqual({
            type: types.uiStartLoading
        });
        expect(actionfinishLoading).toEqual({
            type: types.uiFinishLoading
        });

    })


})