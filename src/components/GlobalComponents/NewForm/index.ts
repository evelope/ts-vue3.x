import NewForm from './NewForm.vue';

interface VueInterface {
    component(name: string, component: object): void;
}

const Component = {
    install(Vue: VueInterface): any {
        Vue.component(NewForm.name, NewForm);
    },
};
export default Component;
