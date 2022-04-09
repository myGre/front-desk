<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="shop in cartInfoList"
          :key="shop.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="shop.isChecked"
              @change="updateCheckbox(shop, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="shop.imgUrl" />
            <div class="item-msg">
              {{ shop.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ shop.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, shop)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="shop.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value, shop)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, shop)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ shop.skuPrice * shop.skuNum }}.00</span>
          </li>
          <li class="cart-list-con7">
            <el-popconfirm
              confirm-button-text="删除"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              @confirm="confirm(shop)"
            >
              <el-button type="danger" slot="reference">删除</el-button>
            </el-popconfirm>
            <el-button type="success">收藏</el-button>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool" v-if="cartInfoList.length" >
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isArr"
          @change="updateIsArr"
        />
        <span>全选</span>
      </div>
      <div class="option">
          <el-button type="text" @click="deleteCartList(shop)" slot="reference">删除选中的商品</el-button>
        <!-- <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a> -->
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>{{sunNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ summoney }}.00</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// 引入节流阀
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getInfo();
    // console.log(getCart);
  },
  computed: {
    ...mapGetters(["getCart"]),
    cartInfoList() {
      return this.getCart.cartInfoList || [];
    },
    // 全选
    isArr() {
      return this.cartInfoList.every((shop) => shop.isChecked == 1);
    },
    // 总价格
    summoney() {
      let { cartInfoList } = this;
      let sum = 0;
      cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          sum += item.skuPrice * item.skuNum;
        }
      });
      return sum;
    },
    // 共选中的商品数目
    sunNum() {
      let num = 0;
      this.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          num += item.skuNum;
        }
      });
      return num;
    },
  },
  methods: {
    getInfo() {
      return this.$store.dispatch("getCartList");
    },
    //全选按钮状态的改变
    async updateIsArr(event) {
      let isChecked = event.target.checked == true ? "1" : "0";
      try {
        await this.$store.dispatch("updateAllIsChecked", isChecked);
        this.getInfo();
      } catch (error) {
        alert(error.message);
      }
    },
    /* 
      对购物车里的商品进行添加、减少 操作
      type: 代表点击的类型
      disNum：传过去的变量值 -1、1、value
      shop：传过去的ID
    */
    handler: throttle(async function (type, disNum, shop) {
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          // disNum = 1;
          disNum = shop.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // disNum = 1;
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - shop.skuNum;
          }
          break;
      }
      // 派发给服务器
      try {
        // 成功
        await this.$store.dispatch("addShopGood", {
          skuId: shop.skuId,
          skuNum: disNum,
        });
        this.getInfo();
      } catch (error) {
        Promise.reject(new Error("500"));
      }
    }, 1000),
    // 删除某条数据
    async confirm(shop) {
      try {
        // 删除成功
        await this.$store.dispatch("deleteCartList", shop.skuId);
        this.getInfo();
      } catch (error) {
        Promise.reject(new Error("faile"));
      }
    },
    // 选中状态改变
    async updateCheckbox(shop, event) {
      let checked = event.target.checked;
      checked = checked ? 1 : 0;
      console.log(checked);
      // 成功时
      try {
        await this.$store.dispatch("updateCartList", {
          skuId: shop.skuId,
          isChecked: checked,
        });
        this.getInfo();
      } catch (error) {
        Promise.reject(new Error("faile"));
      }
    },
    // 删除选中的商品
    async deleteCartList() {
      try {
        // 成功
        await this.$store.dispatch("deleteCartListAll");
        this.getInfo();
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 10%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 14%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 13%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>