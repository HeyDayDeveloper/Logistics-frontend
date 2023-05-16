<script lang="ts" setup></script>

<template>
  <div class="app-container">
    <div class="about-box">
      <h2>技术栈</h2>
      <p>前端：Vue,Pinia,Axios,VueRouter,VxeTable,JsMd5,ElementPlus,Echarts,Scss</p>
      <P>后端：Kubernetes,Docker,Spring Cloud,JDK 17 (LTS),SpringBoot 3.0.6,Spring Data JPA,Spring Security,MySQL 8.0,Redis 7.0,Github action</P>
      <img src="@/assets/imgs/系统总体功能架构.png" alt="">
    </div>
    <div class="about-box acknowledgements">
      <h2>致谢</h2>

        <p>  光阴似箭，白驹过隙，四年时光，不舍昼夜，一次次春去春又来，四年大学生
        活已接近尾声。再看校园，已是回忆，有新同学的满脸欣喜;有集体活动时的欢声
        笑语，有学习中的忙里偷闲:有学术创作中的绞尽脑汁:也有没课时的百无聊赖。
        仿佛还没有看清同窗的彼此就又要踏.上新的征程，这一路陪伴我走出象牙塔的有恩
        师、好友、至亲，这一路心有不舍，仍满怀感激。</p>
        <p>  饮其流时思其源，成吾学时念吾师。至此论文完成之际，谨向我尊敬的导师陈
        敏教授致以诚挚的谢意和崇高的敬意。有师如斯，吾之所幸，本论文从选题到完成，
        每一步都是在陈老师的指导下完成的，倾注了老师大量的心血。四年时光，聆听着
        您孜孜不倦的教诲，感受着您严谨进取的治学精神和乐观向上的生活态度，我不仅
        体会到知识与研究的魅力，也学会了为人处世的道理。毕业在即，在此谨向您表示 我最衷心的感谢。</p>
        <p>  何当共剪西窗烛，却话巴山夜雨时。大学期间与我朝夕相处的同学是我值得珍
        惜的宝贵财富，四年来，我们从相遇、相识到相知、相念，短短的岁月却给我留下
        了永不磨灭的美好回忆。忘不了我们一起哭，起笑的日子;忘不了彼此安慰、相
        互鼓励，还有“心有灵犀一点通”的时刻。你们的每一句话，每一个微笑，都值得 我永远珍藏于记忆中!</p>
        <p>  焉得谖草，言树之背，养育之恩，无以为报。在我告别学习生涯之时，请允许
        <p>  我向我最爱的家人表示诚挚的谢意，想到他们，我总是感到温暖而安详。正因有你
        们的鼓励和支持，才有了今天的我，哺育之恩，爱护之情让我永生难忘。</p>
        年年岁岁花相似，岁岁年年人不同。在致谢的最后，我还想要感谢我喜欢的歌
        手鹿乃，是她的歌声陪伴着我度过了撰写论文的那一个个日日夜夜。无论是挑灯夜
        战的疲劳，还是期限将近的焦虑。都是她的歌声伴我随行。如同春日暖阳，温暖心
        房;如同清风拂面，舒适自在;如同星空璀璨，引领方向。</p>
        <p>  书不成字，纸短情长，伏惟珍重。</p>
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
    width: 49%;
    height: 99%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    h2{
      text-align: center;
    }
    img{
      object-fit: contain;
      width: 100%;
      height: 650px;
    }
  }
  .acknowledgements{
    p{
      font-size: 1.2rem;
      text-indent: 2em;
    }
  }
}
</style>
