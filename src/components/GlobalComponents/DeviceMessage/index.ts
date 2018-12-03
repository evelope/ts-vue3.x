import DeviceMessage from './DeviceMessage.vue';

interface VueInterface {
    component(name: string, component: object): void;
}

const Component = {
    install(Vue: VueInterface): any {
        Vue.component(DeviceMessage.name, DeviceMessage);
    },
};
export default Component;
