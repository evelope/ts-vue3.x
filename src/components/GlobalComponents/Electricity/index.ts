import Electricity from './Electricity.vue';

interface VueInterface {
    component(name: string, component: object): void;
}

const Component = {
    install(Vue: VueInterface): any {
        Vue.component(Electricity.name, Electricity);
    },
};
export default Component;
