import DetailsShow from './DetailsShow.vue';

interface VueInterface {
    component(name: string, component: object): void;
}

const Component = {
    install(Vue: VueInterface): any {
        Vue.component(DetailsShow.name, DetailsShow);
    },
};
export default Component;
