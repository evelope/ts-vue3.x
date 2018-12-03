import NoData from './NoData.vue';

interface VueInterface {
    component(name: string, component: object): void;
}

const Component = {
    install(Vue: VueInterface): any {
        Vue.component(NoData.name, NoData);
    },
};
export default Component;
