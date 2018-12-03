<template>
    <div id="toast">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i :class="[toastType, 'weui-icon_toast']"></i>
            <p class="weui-toast__content">{{type==='success'?'操作成功':'加载中'}}</p>
        </div>
    </div>
</template>

<script lang="ts">
// weui-loading   weui-icon-success-no-circle
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class Toast extends Vue {
    // 参数*****************
    @Prop({ default: 'success' }) 
    private type!: string // success成功 loading 等待

    // computed
    get toastType(): string {
        switch(this['type']){
            case 'success':
                return 'weui-icon-success-no-circle';
            case 'loading':
                return 'weui-loading';
            case 'warning':
                return 'weui_icon_warn';
            default:
                return 'weui-icon-success-no-circle'
        }
    }
}
</script>
