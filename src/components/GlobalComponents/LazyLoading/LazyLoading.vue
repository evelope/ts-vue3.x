<template>
    <div class="LazyLoading" :class="{'down':(state===0),'up':(state==1),'refresh':(state===2),touch:touching}" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" :style="data.styles" @scroll="lazyScroll">
        <section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
			<header class="pull-refresh">
				<slot name="pull-refresh">
                    <i class="iconfont" :class="state==2?'icon-jiazai':'icon-xiajiantou'"></i>
					<span class="down-tip">下拉可以刷新</span>
					<span class="up-tip">松开立即刷新</span>
					<span class="refresh-tip">正在更新数据……</span>
				</slot>
			</header>
			<slot></slot>
      <div v-if="data.isLoading" class="loading-title">
          <i v-if="data.loadingTitle && data.loadingTitle.showIcon" :class="'iconfont '+ data.loadingTitle.showIcon"></i>
          <span  v-if="data.loadingTitle && data.loadingTitle.showTitle">{{data.loadingTitle.showTitle}}</span>
      </div>
      <div v-else class="loading-title">
          <span v-if="data.okTitle && data.okTitle.showTitle">{{data.okTitle.showTitle}}</span>
      </div>
		</section>

        <!-- <div class="circle-dev">
            <div class="circle-bg"></div>
            <div class="circle-alt">
                <div class="circle-alt-lft"></div>
                <div class="circle-alt-rht"></div>
            </div>
        </div> -->

    </div>
</template>

<script>
export default {
  name: "LazyLoading",
  props: {
    data: {
      type: Object,
      default() {
        return {
          styles: {}, // 样式
          isLoading: false, // 是否启用懒加载
          loadingTitle: {
            showIcon: "icon-jiazai",
            showTitle: "加载中"
          },
          okTitle: {
            showIcon: "",
            showTitle: "没有更多数据"
          }
        };
      }
    },
    offset: {
      type: Number,
      default: 40 //默认高度
    },
    enableRefresh: {
      type: Boolean,
      default: true
    },
    onRefresh: {
      type: Function,
      default: undefined,
      required: false
    }
  },
  data() {
    return {
      top: 0,
      state: 0,
      startX: 0,
      startY: 0,
      touching: false,
      downFlag: false, //用来显示是否加载中
    };
  },
  methods: {
    lazyScroll(e) {
      let scrollTop = e.target.scrollTop || e.target.scrollTop;
      let offsetHeight = e.target.offsetHeight;
      let scrollHeight = e.target.scrollHeight;
      if (scrollHeight <= scrollTop + offsetHeight && this.data.isLoading) {
        // this.$emit("update:isLoading", false);
        this.$emit("getData");
      }
    },

    touchStart(e) {
      this.startY = e.targetTouches[0].pageY;
      this.startX = e.targetTouches[0].pageX;
      this.startScroll = this.$el.scrollTop || 0;
      this.touching = true; //留着有用，不能删除
    },
    touchMove(e) {
      if (!this.enableRefresh || !this.touching) {
        return;
      }
      let diff = e.targetTouches[0].pageY - this.startY - this.startScroll;
      if (diff > 0) e.preventDefault();
      this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0);
      if (this.state === 2) {
        // in refreshing
        return;
      }
      if (this.top >= this.offset) {
        this.$el.querySelector(".pull-refresh .iconfont").style.transform = 'rotateZ(-180deg)';
        this.state = 1;
      } else {
        this.$el.querySelector(".pull-refresh .iconfont").style.transform = 'rotateZ(0deg)';
        this.state = 0;
      }
    },
    touchEnd(e) {
      if (!this.enableRefresh) {
        return;
      }
      this.touching = false;
      if (this.state === 2) {
        // in refreshing
        this.state = 2;
        this.top = this.offset;
        return;
      }
      if (this.top >= this.offset) {
        // do refresh
        this.$el.querySelector(".inner").style.transitionDuration = "300ms";
        this.refresh();
      } else {
        // cancel refresh
        this.$el.querySelector(".inner").style.transitionDuration = "0ms";
        this.state = 0;
        this.top = 0;
      }
    },
    refresh() {
      this.state = 2;
      this.top = this.offset;
      setTimeout(() => {
        this.onRefresh(this.refreshDone);
      }, 300);
    },
    refreshDone() {
      this.$el.querySelector(".inner").style.transitionDuration = "300ms";
      this.state = 0;
      this.top = 0;
      setTimeout(() => {
        this.$el.querySelector(".inner").style.transitionDuration = "0ms";
      }, 300);
    }
  }
};
</script>

<style scoped>
.LazyLoading {
  height: 100%;
  overflow-y: scroll;
}
.LazyLoading .loading-title {
  display: flex;
  align-items: center;
  font-size: 15px;
  justify-content: center;
  background: #fff;
  height: 35px;
  color: #333;
  border-top: 1px solid #f2f2f2; 
}
.LazyLoading .icon-jiazai {
  animation: icon-rotate 1s infinite linear;
  margin-right: 5px;
}
@keyframes icon-rotate {
  0% {
    transform: rotateZ(-360deg);
  }
}

.LazyLoading .inner {
  width: 100%;
  height: auto;
}

.LazyLoading .inner .pull-refresh {
  position: absolute;
  left: 0;
  top: -35px;
  width: 100%;
  height: 35px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}
.LazyLoading .inner .pull-refresh .iconfont{
    transform: rotateZ(-180deg);
    transition:  transform 0.3s;
}
.down-tip,
.refresh-tip,
.up-tip {
  display: none;
}

.LazyLoading.down .down-tip {
  display: block;
}

.LazyLoading.up .up-tip {
  display: block;
}

.LazyLoading.refresh .refresh-tip {
  display: block;
}



/* .circle-dev {
  width: 30px;
  height: 30px;
  border-radius: 100px;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: calc(50% - 15px);
}
.circle-bg,
.circle-alt {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #ccc;
  position: absolute;
  top: 0;
  left: 0;
}
.circle-alt-lft,
.circle-alt-rht {
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0;
}
.circle-alt-lft {
  left: 0;
  overflow: hidden;
  border-radius: 50% 0 0 50%;
}
.circle-alt-lft:after {
  background: #fff;
  display: block;
  content: "";
  width: 100%;
  height: 100%;
  transform-origin: right center;
  transform: rotate(180deg);
}
.circle-alt-rht {
  right: 0;
  overflow: hidden;
  border-radius: 0 50% 50% 0;
}
.circle-alt-rht:after {
  background: #fff;
  display: block;
  content: "";
  width: 100%;
  height: 100%;
  transform-origin: left center;
  transform: rotate(180deg);
} */
</style>
