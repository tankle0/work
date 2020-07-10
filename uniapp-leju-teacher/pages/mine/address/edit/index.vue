<template>
  <view>
    <view class="content">
      <view class="row">
        <view class="nominal">收件人</view>
        <view class="input">
          <input placeholder="请输入收件人姓名" type="text" v-model="name" />
        </view>
      </view>
      <view class="row">
        <view class="nominal">电话号码</view>
        <view class="input">
          <input placeholder="请输入收件人电话号码" type="text" v-model="tel" />
        </view>
      </view>
      <view class="row">
        <view class="nominal">所在地区</view>
        <view class="input" @tap="chooseCity">{{region.label}}</view>
      </view>
      <view class="row">
        <view class="nominal">详细地址</view>
        <view class="input">
          <textarea v-model="detailed" auto-height="true" placeholder="输入详细地址"></textarea>
        </view>
      </view>
      <view class="row">
        <view class="nominal">设置默认地址</view>
        <view class="input switch">
          <switch color="#354E44" :checked="isDefault" @change="isDefaultChange" />
        </view>
      </view>
      <view class="row" v-if="editType=='edit'" @tap="del">
        <view class="del">删除收货地址</view>
      </view>
    </view>
    <view class="save" @tap="save">
      <view class="btn">保存地址</view>
    </view>
    <mpvue-city-picker
      :themeColor="themeColor"
      ref="mpvueCityPicker"
      :pickerValueDefault="cityPickerValue"
      @onCancel="onCancel"
      @onConfirm="onConfirm"
    ></mpvue-city-picker>
  </view>
</template>

<script>
//插件市场:  https://ext.dcloud.net.cn/plugin?id=115  
import mpvueCityPicker from "@/components/mpvue-citypicker/mpvueCityPicker.vue";
import addressApi from "@/api/mine/address.js";
export default {
  name: "AddressEdit",
  components: {
    mpvueCityPicker
  },
  data() {
    return {
      editType: "edit",
      id: "",
      name: "",
      tel: "",
      detailed: "",
      isDefault: false,
      cityPickerValue: [0,0,0],
      themeColor: "#007AFF",
      region: { label: "请点击选择地址", value: [], cityCode: "" },
      address: {}
    };
  },
  methods: {
    onCancel(e) {
      console.log(e);
    },
    chooseCity() {
      this.$refs.mpvueCityPicker.show();
    },
    onConfirm(e) {
	  console.log(e);
      this.region = e;
	  // 预存 一个 values 
      this.cityPickerValue = e.value;
    },
    isDefaultChange(e) {
      this.isDefault = e.detail.value;
    },
    del() {
      uni.showModal({
        title: "删除提示",
        content: "你将删除这个收货地址",
        success: res => {
          if (res.confirm) {
            uni.setStorage({
              key: "delAddress",
              data: { id: this.id },
              success() {
                uni.navigateBack();
              }
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    save() {
      let data = {
        name: this.name,
        tel: this.tel,
        address: { region: this.region, detailed: this.detailed },
        isDefault: this.isDefault
      };
      if (this.editType == "edit") {
        data.id = this.id;
      }
      if (!data.name) {
        uni.showToast({ title: "请输入收件人姓名", icon: "none" });
        return;
      }
      if (!data.tel) {
        uni.showToast({ title: "请输入收件人电话号码", icon: "none" });
        return;
      }
      if (!data.address.detailed) {
        uni.showToast({ title: "请输入收件人详细地址", icon: "none" });
        return;
      }
      if (data.address.region.value.length == 0) {
        uni.showToast({ title: "请选择收件地址", icon: "none" });
        return;
      }
      uni.showLoading({
        title: "正在提交"
      });
      // 构建可提交内容  吧cityCode和value拼接一块
	  // cityCode: "130203"  value: [2,1,1]  ==>  130203,2,1,1
      var cityCodeArr = [];
      cityCodeArr[0] = this.region.cityCode;  // [130203]
      for (var i = 0; i < this.region.value.length; i++) {
        cityCodeArr.push(this.region.value[i]); //[130203,2,1,1]
      }
	  var postData = {
		  userId: this.$store.getters.userId,
          tag: "家",
          name: data.name,
          tel: data.tel,
          cityCode: cityCodeArr.join(),  //[130203,2,1,1].join() => '130203,2,1,1'
		  cityStr: this.region.label, // "北京市-市辖区-东城区"
		  cityBak: this.detailed, // 搜狐大厦101
		  isUse: this.isDefault?1:0 // 是否默认
        }
	  var api = null;
	  // 根据当前数据是否有id 判断是新增操作还是更新操作
	  if(this.id){
		  api = addressApi.addressUpdate;
		  postData.id = this.id;
	  }else{
		  api = addressApi.addressSave;
	  }
      api(postData)
        .then(res => {
			if(res.code == 'S'){
				uni.showToast({
					title:'保存成功!',
					duration:1000
				})
				uni.navigateTo({
					url:'../index'
				})
			}else{
				uni.showToast({
					title: '保存失败!',
					duration:1000
				})
			}
		});
    }
  },
  onLoad(e) {
    //获取传递过来的参数

    this.editType = e.type;
    if (e.type == "edit") {
		// 从本地ls获取所有地址
		var addressObj = uni.getStorageSync("address");
		
		var cityArr = addressObj.address.region.value;
		cityArr = cityArr.map(item=>(item-0));
		this.id = addressObj.id;
		this.name = addressObj.name;
		this.tel = addressObj.tel;
		this.detailed = addressObj.address.region.detailed;
		this.isDefault = addressObj.isDefault;
		this.cityPickerValue = cityArr;
		this.region = addressObj.address.region;
    }
  },
  onBackPress() {
    if (this.$refs.mpvueCityPicker.showPicker) {
      this.$refs.mpvueCityPicker.pickerCancel();
      return true;
    }
  },
  onUnload() {
    if (this.$refs.mpvueCityPicker.showPicker) {
      this.$refs.mpvueCityPicker.pickerCancel();
    }
  }
};
</script>
<style lang="scss">
.save {
  view {
    display: flex;
  }
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 120upx;
  display: flex;
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
.content {
  display: flex;
  flex-wrap: wrap;
  view {
    display: flex;
  }
  .row {
    width: 94%;

    margin: 0 3%;
    border-top: solid 1upx #eee;
    .nominal {
      width: 30%;
      height: 120upx;
      font-weight: 200;
      font-size: 30upx;
      align-items: center;
    }
    .input {
      width: 70%;
      padding: 20upx 0;
      align-items: center;
      font-size: 30upx;
      &.switch {
        justify-content: flex-end;
      }
      .textarea {
        margin: 20upx 0;
        min-height: 120upx;
      }
    }
    .del {
      width: 100%;
      height: 100upx;
      justify-content: center;
      align-items: center;
      font-size: 36upx;
      color: #354E44;
      background-color: rgba(255, 0, 0, 0.05);
      border-bottom: solid 1upx #eee;
    }
  }
}
</style>
