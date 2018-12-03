<template>
  <div class="NewForm">
    <ul>
        <li v-for="(item,index) in data" :key="index" :class="[item.box?'fg':'']">
            <template v-if="!item.box">
                <span v-if="item.check_type&&item.check_type.match('required')" class="conent-required">*</span>
                <p v-if="item.name" class="name">{{item.name}}</p>
                <p class="value" @click="item.enter_method?item.enter_method():null">
                    <input :disabled="item.enterShow" v-validate="item.check_type" :type="item.inputType?item.inputType:'text'" v-model="item.value" :placeholder="item.placeholder"/>
                </p>
                <button :disabled="item.button_disabled" @click="item.button_method" v-if="item.right_button">{{item.right_button}}</button>
                <img v-if="item.enterShow" :src="enter_into"/>
            </template>
        </li>
    </ul>
    <div class="submit">
        <mt-button type="primary" @click="submit">确认</mt-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import enter_into from '../../../assets/image/enter_into.png';

// 声明组件*****************
@Component({
  components: {

  }
})
export default class NewForm extends Vue {
  // props
  @Prop({ default:()=>({}) }, Object) 
  private data!: object
  // 属性*****************
  private enter_into: string = enter_into;
 

  // 方法*****************
    private submit(): any{
        return this.$validator.validateAll().then((result: boolean) => {
            if(result){
                this.$emit('submit',this.data);
            }else{
                this['$message']({
                    value:this['errors'].items[0].msg
                })
            }
        });
    }
}
</script>

<style lang="less" scoped>
@import url("../../../assets/less-css/flexible.less");
.NewForm {
    background: #fff;
    .px2rem(margin-bottom,20);
    ul{
        .p(20);
        padding-top:0;
        padding-bottom:0;
        overflow: hidden;
        li{
            position: relative;
            .p(20);
            padding-top: 0;
            padding-bottom: 0;
            box-sizing: border-box;
            .h(82);
            .lh(82);
            .fs(28);
            color: #444444;
            display: flex;
            justify-content: space-between;
            .conent-required{
                color: #ff0000;
                position: absolute;
                left: 0;
            }
            .name{
                .w(160);
            }
            .value{
                flex: 1;
                position: relative;
                .nowrap;
                input{
                    width: 100%;
                    height: 100%;
                    border: none;
                    color: #444444;
                }
            }
            button{
                position: absolute;
                .r(0);
                .px2rem(padding-left,20);
                .px2rem(padding-right,20);
                top: 50%;
                transform: translateY(-50%); 
                background: rgb(56, 163, 240);
                border: none;
                .h(60);
                .fs(26);
                .br(10);
                color: #fff;
                &:active {
                    background: rgb(22, 64, 95);
                }
                &:disabled{
                    background: #DDD;
                    cursor: not-allowed;
                }
            }
            img{
                position: absolute;
                right: 0;
                .w(12);
                top: 50%;
                transform: translateY(-50%);
            }
        }
        li+li{
            border-top: 1px solid #e7e7e7; 
        }
        li.fg{
            .h(20);
            background:#f2f2f2;
            transform:scaleX(1.5);
            border:none;
        }
        li.fg+li{
            border: none;
        }
    }
    .submit{
        .px2rem(padding-top, 50);
        .px2rem(padding-left, 30);
        .px2rem(padding-right, 30);
        background: #f2f2f2;
        display: flex;
        justify-content: center;
        .mint-button{
            width: 100%;
        }
    }
}
</style>
