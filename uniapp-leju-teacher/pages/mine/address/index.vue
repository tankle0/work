<template>
  <view>
    <view class="content">
      <view class="list">
        <view class="row" v-for="(row,index) in aList" :key="index" @tap="select(row)">
          <view class="left">
            <view class="head">{{row.head}}</view>
          </view>
          <view class="center">
            <view class="name-tel">
              <view class="name">{{row.name}}</view>
              <view class="tel">{{row.tel}}</view>
              <view class="default" v-if="row.isDefault">默认</view>
            </view>
            <view
              class="address"
              v-if="row.address"
            >{{row.address.region.label}} {{row.address.detailed}}</view>
          </view>
          <view class="right">
            <view class="icon edit" @tap.stop="edit(row)">
				<image src="../../../static/icons/edit.png" mode=""></image>
			</view>
          </view>
        </view>
      </view>
    </view>
    <view class="add">
      <view class="btn" @tap="add">
        <view class="icon tianjia"></view>新增地址
      </view>
    </view>
  </view>
</template>
<script>
import addressApi from "@/api/mine/address";
import {checkLogin} from '@/utils/common.js';
export default {
  data() {
    return {
      isSelect: false,
      userId: "",
      aList: []
    };
  },
  onShow() {
	  
  },
  // e.xx 从上个页面通过地址栏传参传过来的参数
  onLoad(e) {
    if (e.type == "select") {
      this.isSelect = true;
    }
	checkLogin(()=>{
		this.getAddressList();
	})
    
  },
  methods: {
    edit(row) {
      uni.setStorage({
        key: "address",
        data: row,
        success() {
          uni.navigateTo({
            url: "edit/index?type=edit"
          });
        }
      });
    },
    add() {
      uni.navigateTo({
        url: "edit/index?type=add"
      });
    },
    select(row) {
      //是否需要返回地址(从订单确认页跳过来选收货地址)
      if (!this.isSelect) {
        return;
      }
	  // 存入ls 再跳转到上一个页面
      uni.setStorage({
        key: "selectAddress",
        data: row,
        success() {
			// console.log('selok')
          uni.navigateBack();
        }
      });
    },
    getAddressList() {
      addressApi
        .addressList({
          userId: this.$store.getters.userId
        })
        .then(res => {
			// 把列表的数据 重新定义格式  返回每一项
          this.aList = res.data.reduce((a, b) => {
			  // '130203,2,1,1'
            var cityCodeExt = b.cityCode.split(",");  // [130203,2,1,1]
			var cityCode = cityCodeExt.shift();  // [2,1,1] ==> 130203
            a.push({
              id: b.id,
              name: b.name,
              head: b.tag,
              tel: b.tel,
              address: {
                region: {
                  label: b.cityStr,
                  cityCode,
                  value: cityCodeExt,
                  detailed: b.cityBak
                }
              },
              isDefault: b.isUse == 1
			});
			return a;
          }, []);
        });
    }
  }
};
</script>

<style lang="scss">
view {
  display: flex;
}
.icon {
  // &.bianji {
  // 	&:before{content:"\e61b";}
  // }
  // &.tianjia {
  // 	&:before{content:"\e81a";}
  // }
}
.add {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 120upx;
  justify-content: center;
  align-items: center;
  .btn {
    box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.4);
    width: 70%;
    height: 80upx;
    border-radius: 80upx;
    background-color: #354E44;
    color: #fff;
    justify-content: center;
    align-items: center;
    .icon {
      height: 80upx;
      color: #fff;
      font-size: 30upx;
      justify-content: center;
      align-items: center;
    }
    font-size: 30upx;
  }
}
.list {
  flex-wrap: wrap;
  .row {
    width: 96%;
    padding: 20upx 2%;
    .left {
      width: 90upx;
      flex-shrink: 0;
      align-items: center;
      .head {
        width: 70upx;
        height: 70upx;
        background: linear-gradient(to right, #ccc, #aaa);
        color: #fff;
        justify-content: center;
        align-items: center;
        border-radius: 60upx;
        font-size: 35upx;
      }
    }
    .center {
      width: 100%;
      flex-wrap: wrap;
      .name-tel {
        width: 100%;
        align-items: baseline;
        .name {
          font-size: 34upx;
        }
        .tel {
          margin-left: 30upx;
          font-size: 24upx;
          color: #777;
        }
        .default {
          font-size: 22upx;

          background-color: #354E44;
          color: #fff;
          padding: 0 18upx;
          border-radius: 24upx;
          margin-left: 20upx;
        }
      }
      .address {
        width: 100%;
        font-size: 24upx;
        align-items: baseline;
        color: #777;
      }
    }
    .right {
      flex-shrink: 0;
      align-items: center;
      margin-left: 20upx;
      .icon {
        justify-content: center;
        align-items: center;
        width: 80upx;
        height: 60upx;
        border-left: solid 1upx #aaa;
        font-size: 40upx;
        color: #777;
		uni-image,image{
			width: 40rpx;
			height: 40rpx;
			opacity: .8;
		}
      }
    }
  }
}
</style>
