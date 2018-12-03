<template>
  <div class="ChooseAssociated" :class="associatHidden">
    <div class="search-box">
        <div class="search-input">
            <i class="iconfont icon-sousuo"></i>
            <input type="text" placeholder="请输入小区名称..."/>
        </div>
    </div>
    {{inputValue}}
    <ul class="box-list">
        <li @click.prevent.stop="changeInputValue(''+index)" v-for="(item,index) in 20" :key="index">
            <div class="radio-box">
                <mt-radio
                    v-model="inputValue"
                    :options="[''+index]">
                </mt-radio> 
            </div>
            <div class="value-box">
                <p>手动阀手动阀</p>
                <p>阿斯蒂芬啊是大案说法案说法发送</p>
            </div>
        </li>
    </ul>
    <div class="bottom-button" @click="submit">
        确定
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// 声明组件*****************
@Component({
  components: {

  }
})
export default class ChooseAssociated extends Vue {
    // 属性*****************
    private inputValue: string = '0';
    private associatHidden: string = '';

    // 方法*****************
    private changeInputValue(value): void {
        this.inputValue = value;
    }
    private submit(): void {
        this.associatHidden = 'associatHidden';
        const id = setTimeout(()=>{
            this.$parent['associatShow'] = false;
            clearTimeout(id)
        },300)
    }
}
</script>

<style lang="less" scoped>
@import url("../assets/less-css/flexible.less");
.ChooseAssociated {
    animation: right-fide-in 0.3s 1;
    position: fixed;
    overflow-y: scroll; 
    z-index: 10;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    .px2rem(padding-top,13);
    box-sizing: border-box;
    background: #fff;
    &::before{
        content: '';
        position: absolute;
        width: 100%;
        .h(13);
        background: #f2f2f2;
        top: 0;
    }
    .search-box{
        .h(110);
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        .search-input{
            width: 100%;
            .px2rem(margin-left,20);
            .px2rem(margin-right,20);
            .h(58);
            background: #f2f2f2;
            position: relative;
            display: flex;
            align-items: center;
            .br(8);
            i.iconfont{
                position: absolute;
                .fs(28);
                .l(20);
                color: #aaaaaa;
            }
            input{
                .fs(28);
                width: 100%;
                height: 100%;
                border: none;
                background: #f2f2f2;
                .br(8);
                .px2rem(padding-left,68); 
                box-sizing: border-box;
                color: #333333;
            }
        }
    }
    .box-list{
        background: #fff;
        .px2rem(margin-left,20); 
        li{
            display: flex;
            border-bottom: 1px solid #e7e7e7; 
            .radio-box{
                .w(55);
            }
            .value-box{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center; 
                overflow: hidden;
                p{
                    .nowrap;
                }
                p:first-child{
                    .fs(28);
                    color: #333;
                }
                p:last-child{
                    .fs(24);
                    color: #999;
                }
            }
        }
    }
    .bottom-button{
        position: fixed;
        bottom: 0;
        width: 100%;
        .h(88);
        .lh(88);
        .fs(34);
        text-align: center;
        color: #36a3f4;
        border-top: 1px solid #e7e7e7;
        background: #fff;
        box-shadow: 0 0 10px #e7e7e7;
    }
}
.associatHidden {
    animation: right-fide-out 0.3s 1;
}
@keyframes right-fide-in {
    0%{transform: translateX(100%)}
}
@keyframes right-fide-out {
    100%{transform: translateX(100%)}
}
</style>
<style>
    .ChooseAssociated .box-list .mint-radiolist-label{
        transform: translateX(-50%) translateY(-20%);
    }
    .ChooseAssociated .box-list .mint-radio-label{
        display: none;
    }
</style>

