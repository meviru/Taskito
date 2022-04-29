import Vuex from 'vuex';

// Create Vuex data store
const store = new Vuex.Store({
    state: {
        userDetail: {} as any,
    },
    mutations: {
        SET_USER_DETAIL(state, value) {
            state.userDetail = value;
        },
    },
    getters: {
        getUserDetail: state => {
            return state.userDetail;
        },
    },
    actions: {
        ['setUserDetail']({ commit }, value) {
            commit('SET_USER_DETAIL', value);
        },
    }
});
export default store;