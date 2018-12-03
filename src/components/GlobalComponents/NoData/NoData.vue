<template>
    <div class="NoData">
        <img src="/image/no_data.png"/>
        <p>{{value}}</p>
    </div>
</template>

<script>
export default {
    name: 'NoData',
    props: {
        value: {
            type: String,
            default(){
                return '暂无数据'
            }
        }
    }
}
</script>


<style lang="less" scoped>
@import url("../../../assets/less-css/flexible.less");
.NoData{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #666;
    padding-bottom: 40%; 
    box-sizing: border-box;
    .fs(30);
    img{
        .w(450);
        .px2rem(margin-bottom,30);
        animation: heart 1s infinite alternate;
    }
    p{
        margin: 0 auto;
        width: 80%;
        text-align: center;
    }
}
@keyframes heart{
    from{transform:translate(0,6px)}
    to{transform:translate(0,0)}
}
</style>
