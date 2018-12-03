<template>
  <div class="Yinshiyun">
    <iframe ref="video_player" :src="baseUrl+'yingshi-iframe.html'"></iframe>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

// 声明组件*****************
@Component({
  components: {

  }
})
export default class Yinshiyun extends Vue {
    // 参数*****************
    @Prop({ default: null })
    private data!: object // success成功 loading 等待
    // 属性*****************
    private baseUrl:string = process.env.BASE_URL;
    
    mounted() {
        this.$nextTick(() => {
            this.page_init();
            console.log(this.data);
        })
    };

    private page_init() {
        if (this.$refs.video_player) {
            this.$refs.video_player['setAttribute']('width', this.$el.clientWidth + 'px');
            this.$refs.video_player['setAttribute']('height', this.$el.clientHeight + 'px');
            this.iframe_onload();
        }
    };
    private iframe_onload() {
            this.$refs.video_player['contentWindow'].onload = () => {
            this.$refs.video_player['contentWindow'].video_init(this.data, this);
        }
    };

    // 方法*****************

}
</script>

<style lang="less" scoped>
@import url("../../assets/less-css/flexible.less");
.Yinshiyun {
    margin-left: auto;
    margin-right: auto;
    overflow: hidden; 
    .w(725);
    .h(455);
    .br(9);
    iframe{
        display: block;
        border: none;
    }
}
</style>
