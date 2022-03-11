<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leverColor">
        <h2 class="all" @mouseenter="enterShow">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="clickCategoryList">
              <div
                class="item bo"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: categoryId == index }"
              >
                <h3 @mouseenter="getColor(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-categoryId="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入节流阀
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      categoryId: -1,
      show: true,
    };
  },
  mounted() {
    // mapActions('home',['categoryList'])
    // 不是在home页面下的，三级联动统统都默认FALSE
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        // console.log(state);
        return state.home.categoryListObj;
      },
    }),
  },
  methods: {
    // 移入一级联动时触发,throttle节流函数
    getColor: throttle(function (index) {
      this.categoryId = index;
    }, 50),
    // 移出时触发,leverColor放在外面是为了提升性能
    leverColor() {
      this.categoryId = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    enterShow() {
      this.show = true;
    },
    // 处理三级联动用户传参
    clickCategoryList(event) {
      // ①判断用户点击的是否为a标签，通过categoryName判断
      // 获取元素标签
      let element = event.target;
      // console.log(element);
      // 如果带有categoryName属性则为A标签,用dataset属性判断
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
        //判断是否有categoryname属性
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // ②判断是否为一级、二级、三级标签, 通过设置自定义属性categoryId判断
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // ③路由传参
        location.query = query;
        // console.log(query);
        // 如果原先parmas中有参数也顺带传过去
        if(this.$route.params) {
          location.params = this.$route.params
          this.$router.push(location);
          // console.log(this.$route.params);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 开始时的动画
    .sort-enter,
    .sort-leave-to{
      height: 0px;
    }
    // 结束时的动画
    .sort-enter-to,
    .sort-leave{
      height: 500px;
    }
    // 添加过渡
    .sort-enter-active,
    .sort-leave-active{
      transition: all .3s linear;
    }
  }
}
</style>
