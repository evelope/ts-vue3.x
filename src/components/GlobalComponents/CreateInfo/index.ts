import CreateInfo from './CreateInfo.vue';

interface VueInterface {
    component(name: string, component: object): void;
}

const Component = {
    install(Vue: VueInterface): any {
        Vue.component(CreateInfo.name, CreateInfo);
    },
};
export default Component;
