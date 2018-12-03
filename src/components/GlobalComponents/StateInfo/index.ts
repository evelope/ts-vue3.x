import StateInfo from './StateInfo.vue';

interface VueInterface {
    component(name: string, component: object): void;
}

const Component = {
    install(Vue: VueInterface): any {
        Vue.component(StateInfo.name, StateInfo);
    },
};
export default Component;
