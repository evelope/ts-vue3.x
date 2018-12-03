import LazyLoading from './LazyLoading.vue';

interface VueInterface {
    component(name: string, component: object): void;
}

const Component = {
    install(Vue: VueInterface): any {
        Vue.component(LazyLoading.name, LazyLoading);
    },
};
export default Component;
