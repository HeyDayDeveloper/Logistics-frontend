<script lang="ts" setup></script>

<template>
  <div class="app-container">
    <div class="about-box">
      <h2>技术栈</h2>
      <p>前端:Vue,Pinia,Axios,ElementPlus,Echarts</p>
      <p>
        后端:Kubernetes,Docker,Spring Cloud,JDK 17 (LTS),SpringBoot 3.0.6,Spring Data JPA,Spring Security,MySQL
        8.0,Redis 7.0,Github action
      </p>
      <img src="@/assets/imgs/系统总体功能架构.png" alt="" />
    </div>
    <div class="about-box acknowledgements">
      <h2>致谢</h2>
      <p>
        岁月如梭，光阴匆匆，四载时光匆匆而过，日夜不舍。春去春又来，大学生活即将落下帷幕。一路上，有恩师、好友、至亲陪伴，心中充满不舍，感激之情溢于言表。
      </p>
      <p>
        首先，谨向我尊敬的导师陈敏致以诚挚的谢意和崇高的敬意。2019年，我刚刚开始大学生活，是老师带领我参与各种比赛，给了我发展的空间，指引了我前进的方向。本论文从选题到完成，每一步都是在老师的指导下完成的，倾注了老师大量的心血。在这四年的时光里，与您共同走过的路途中，我不仅领略到知识和研究的魅力，也学会了处世之道。如今即将毕业，我要向您表达我最真挚的感激之情。
      </p>
      <p>
        其次，请允许我向我最爱的家人表示诚挚的谢意，由于我家距离较近，每当换季，总是母亲提前将衣物准备妥当，父亲开车送到学校。在学业与生活上，他们总是对我提供最大程度的支持。感谢父母家人的养育之恩，谢谢你们的理解、信任、期盼，这是我一直前行的动力。
      </p>
      <p>
        然后，对于我的舍友，我想表达我最深切的感谢之情。在这些年里，我们共同分享了寝室的空间，共度了无数的日夜。你们是我在大学生活中最亲密的伙伴，我们一起经历了欢笑、泪水、挑战和成长。感谢你们的包容和支持，无论是在学习上还是生活中，你们总是给予我无私的帮助和理解。我们互相鼓励，互相激励，共同克服了困难和挫折。每当我失落或迷茫时，你们总能给我勇气和力量，让我重新振作起来。
      </p>
      <p>
        特别的，我还想要感谢我喜欢的歌手鹿乃，是她的歌声陪伴着我度过了撰写论文的那一个个日日夜夜。无论是挑灯夜战的疲劳、期限将近的焦虑，都是她的歌声伴我随行。如同春日暖阳，温暖心房；如同清风拂面，舒适自在；如同星空璀璨，引领方向。
      </p>
      <p>
        最后，我想以我的人生箴言作结，它教会了我不要扃牖于生活的苟且，放宽心态，平淡从容地享受生活。它出自洪应明所著《菜根谭》。其为：
      </p>
      <p>“岁月本长，而忙者自促；天地本宽，而鄙者自隘。”</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  font-family: myFont;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .about-box {
    padding: 4rem;
    padding-top: 10rem;
    width: 49%;
    height: 150%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    h2 {
      text-align: center;
    }
    img {
      object-fit: contain;
      width: 100%;
      height: 650px;
    }
    p {
      // font-size: 1rem;
      text-indent: 2em;
    }
  }
  .acknowledgements {
  }
}
</style>
