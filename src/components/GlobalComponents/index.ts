import DeviceMessage from './DeviceMessage/DeviceMessage.vue';
import DetailsShow from './DetailsShow/DetailsShow.vue';
import NewForm from './NewForm/NewForm.vue';
import CreateInfo from './CreateInfo/CreateInfo.vue';
import StateInfo from './StateInfo/StateInfo.vue';
import LazyLoading from './LazyLoading/LazyLoading.vue';
import NoData from './NoData/NoData.vue';
import Electricity from './Electricity/Electricity.vue';


// 扩展组件
import Message from '../ExtendComponents/Message/index';


(DeviceMessage as any).namee = 'DeviceMessage';
(DetailsShow as any).namee = 'DetailsShow';
(NewForm as any).namee = 'NewForm';
(CreateInfo as any).namee = 'CreateInfo';
(StateInfo as any).namee = 'StateInfo';
(LazyLoading as any).namee = 'LazyLoading';
(NoData as any).namee = 'NoData';
(Electricity as any).namee = 'Electricity';


const components = [
    DeviceMessage,
    DetailsShow,
    NewForm,
    CreateInfo,
    StateInfo,
    LazyLoading,
    NoData,
    Electricity
];
interface VueInterface {
    prototype: any;
    component(name: string, component: object): void;
}

// 添加install方法
const GlobalComponents = {
    install(Vue: VueInterface) {
        components.forEach((component: any): void => {
            Vue.component(component.namee, component);
        });
        Vue.prototype.$message = Message;
    },
};

export default GlobalComponents;
