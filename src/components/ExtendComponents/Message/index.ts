import Vue from 'vue';
import Message from './Message.vue';
const MessageConstructor = Vue.extend(Message);

const removeDom = (target: any) => {
    target.parentNode.removeChild(target);
};
MessageConstructor.prototype.close = function() {
    this.visible = false;
    removeDom(this.$el);
};

const MessageDiv = (options: any): any => {
    const instance = new MessageConstructor({
        el: document.createElement('div'),
        data: options,
    });
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
        instance.timer = setTimeout(() => {
            instance.close();
        }, 3000);
    });
    return instance;
};

export default MessageDiv;

