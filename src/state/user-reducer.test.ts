import {userReducer} from './user-reducer';

test('user reducer should increment only age', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };

    const endState = userReducer(startState, { type: 'INCREMENT-AGE' })

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'} )

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)

});

test('user reducer shold change name of user', () => {

    const startState = {name: 'Slava', age: 14, childrenCount: 0}

    const newName = 'Grand Slava'

    const endState = userReducer(startState, {type: 'CHANGE-NAME', payload: newName})

    expect(endState.name).toBe(newName)

})

