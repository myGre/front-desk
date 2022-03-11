<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchListObj.categoryName">
              {{ searchListObj.categoryName }}<i @click="remveCategory">×</i>
            </li>
            <!-- keyword的面包屑 -->
            <li class="with-x" v-if="searchListObj.keyword">
              {{ searchListObj.keyword }}<i @click="remveKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchListObj.trademark">
              {{ searchListObj.trademark.split(":")[1]
              }}<i @click="remveTrademark">×</i>
            </li>
            <!-- 平台售卖信息 -->
            <li
              class="with-x"
              v-for="(attr, index) in searchListObj.props"
              :key="index"
            >
              {{ attr.split(":")[1] }}<i @click="remveProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details 详情-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="cutOne('1')">
                  <a
                    >综合
                    <span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"
                    ></span>
                  </a>
                </li>
                <li :class="{ active: isTwo }" @click="cutOne('2')">
                  <a
                    >价格
                    <span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"
                    ></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品展示区 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg"/>
                    </router-link> -->
                    <a @click="goDetail(good.id)">
                      <img :src="good.defaultImg" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- 
            pageNo: 当前页数
            pageSize：每页的数目
            totai: 总页数
            continues: 连续的页数
           -->
          <Pagination
            :pageNo="searchListObj.pageNo"
            :pageSize="searchListObj.pageSize"
            :totai="totai"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      searchListObj: {
        // 一级菜单
        category1Id: "",
        // 二级菜单
        category2Id: "",
        // 三级菜单
        category3Id: "",
        // 菜单名
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序
        order: "2:desc",
        // 第几页
        pageNo: 1,
        // 每页展示多少
        pageSize: 3,
        // 平台的售卖信息
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    // 每次挂载之前重新获取路由信息
    Object.assign(this.searchListObj, this.$route.query, this.$route.params);
  },
  // 挂载完毕时，执行一次
  mounted() {
    this.getSearch();
  },
  computed: {
    ...mapGetters(["goodsList"]),
    ...mapState({ totai: (state) => state.Search.getSearchObj.total }),
    isOne() {
      return this.searchListObj.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchListObj.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchListObj.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchListObj.order.indexOf("desc") != -1;
    },
  },
  methods: {
    open() {
      this.$alert("<strong>还没登录，是否前往登录？</strong>", {
        dangerouslyUseHTMLString: true,
        beforeClose: (action, instance, done) => {
          if (action == "confirm") {
            this.$router.push("/login");
            done()
          } else {
            done();
          }
        },
      });
    },
    // 路由跳往详情页
    goDetail(id) {
      if (this.$store.state.user.token) {
        this.$router.push(`/detail/${id}`);
      } else {
        this.open();
      }
    },
    getSearch() {
      return this.$store.dispatch("getSearch", this.searchListObj);
    },
    // 点X移除对应的菜单名
    remveCategory() {
      // 清空菜单名
      this.searchListObj.categoryName = undefined;
      // 清空所有ID
      this.searchListObj.category1Id = undefined;
      this.searchListObj.category2Id = undefined;
      this.searchListObj.category3Id = undefined;
      // 路由重新刷新
      if (this.$route.params) {
        this.$router.push({
          name: "search",
          params: this.$route.params,
        });
      } else {
        this.$router.push({ name: "search" });
      }
      // 重新发请求
      this.getSearch();
    },
    // 移除关键字
    remveKeyword() {
      // 清空菜单名
      this.searchListObj.keyword = undefined;
      // 清空搜索框，传数据
      this.$bus.$emit("clear");
      // // 路由重新刷新
      if (this.$route.query) {
        this.$router.push({
          name: "search",
          query: this.$route.query,
        });
      } else {
        this.$router.push({ name: "search" });
      }
      // this.$router.push({ name: "search" });
      // 重新发请求
      this.getSearch();
    },
    // 获取品牌的自定义事件
    trademarkInfo(trademark) {
      // console.log(trademark);
      this.searchListObj.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getSearch();
    },
    // 删除品牌
    remveTrademark() {
      // 清空菜单名
      this.searchListObj.trademark = undefined;
      // 重新发请求
      this.getSearch();
    },
    // 获取平台售卖信息的自定义事件
    attrInfo(attr, attrValue) {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // console.log(props);
      // 如果在数组中没有出现过就向服务器发信息
      if (this.searchListObj.props.indexOf(props) == -1) {
        this.searchListObj.props.push(props);
        this.getSearch();
      }
    },
    // 删除平台售卖信息
    remveProps(index) {
      // console.log(index);
      this.searchListObj.props.splice(index, 1);
      this.getSearch();
    },
    // 排序点击切换
    cutOne(flag) {
      let carterFlag = this.searchListObj.order.split(":")[0];
      let carterProt = this.searchListObj.order.split(":")[1];
      let newOrder = "";
      if (flag == carterFlag) {
        newOrder = `${carterFlag}:${carterProt == "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${flag}: desc`;
      }
      this.searchListObj.order = newOrder;
      this.getSearch();
    },
    // 获取分页自定义属性
    getPageNo(page) {
      // console.log(page);
      this.searchListObj.pageNo = page;
      this.getSearch();
    },
  },
  watch: {
    // 监听路由信息
    $route(newVule, old) {
      // 重新获取路由信息
      Object.assign(this.searchListObj, this.$route.query, this.$route.params);
      this.getSearch();
      // 请求结束后，清空ID
      this.searchListObj.category1Id = undefined;
      this.searchListObj.category2Id = undefined;
      this.searchListObj.category3Id = undefined;
      // console.log(this.searchListObj);
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>