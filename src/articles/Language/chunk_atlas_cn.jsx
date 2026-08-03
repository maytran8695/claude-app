import React, { useState, useRef, useEffect } from "react";
import { getSubTabFromUrl, syncSubTabToUrl } from "../../utils/subTabUrl";

/* ---------------------------------------------------------------
   TOKENS (đồng bộ phong cách với BestPracticesGuide.jsx / ChunkAtlas_EN.jsx)
--------------------------------------------------------------- */
const INK = "#23231E";
const PAPER = "#F7F6F2";
const PANEL = "#FBFAF6";
const RULE = "#E4E1D8";
const MUTED = "#6B6558";
const ACCENT = "#B4863C";
const HAN_COLOR = "#B3261E";
const PINYIN_COLOR = "#1F7A5C";

const SECTIONS = [
  { label: "Mở đầu & dẫn dắt cuộc họp", num: "1", slug: "mo-dau-cuoc-hop", body: `## Mở đầu & dẫn dắt cuộc họp (开会开场白 — *kāihuì kāichǎngbái*)

Nhóm cụm dùng để bắt đầu một cuộc họp, nêu mục tiêu, dẫn dắt qua các phần, và kết thúc gọn gàng — những gì cần nói ngay trong 2-3 phút đầu và cuối mỗi cuộc họp.

### 1. Bắt đầu cuộc họp (会议开场)
- 大家好，我们开始吧。 — *Dàjiā hǎo, wǒmen kāishǐ ba.* — "Chào mọi người, chúng ta bắt đầu nhé."
- 谢谢大家抽空过来开会。 — *Xièxie dàjiā chōukòng guòlái kāihuì.* — "Cảm ơn mọi người đã dành thời gian đến họp."
- 人都到齐了，我们开始吧。 — *Rén dōu dàoqí le, wǒmen kāishǐ ba.* — "Mọi người đến đủ rồi, chúng ta bắt đầu thôi."
- 我们再等两分钟，等大家都到。 — *Wǒmen zài děng liǎng fēnzhōng, děng dàjiā dōu dào.* — "Chúng ta đợi thêm hai phút, đợi mọi người đến đủ."

### 2. Nêu mục tiêu & chương trình họp (说明会议目的和议程)
- 今天这个会主要是讨论一下... — *Jīntiān zhège huì zhǔyào shì tǎolùn yíxià...* — "Cuộc họp hôm nay chủ yếu là để thảo luận về..."
- 我们先过一下今天的议程。 — *Wǒmen xiān guò yíxià jīntiān de yìchéng.* — "Chúng ta điểm qua chương trình họp hôm nay trước đã."
- 今天主要有三个议题。 — *Jīntiān zhǔyào yǒu sān gè yìtí.* — "Hôm nay chủ yếu có ba vấn đề cần bàn."
- 这次会议的目标是... — *Zhè cì huìyì de mùbiāo shì...* — "Mục tiêu của cuộc họp lần này là..."

### 3. Dẫn vào nội dung chính (进入正题)
- 那我们进入正题吧。 — *Nà wǒmen jìnrù zhèngtí ba.* — "Vậy chúng ta vào nội dung chính luôn nhé."
- 先从这个问题说起。 — *Xiān cóng zhège wèntí shuō qǐ.* — "Bắt đầu từ vấn đề này trước."
- 我先简单介绍一下背景。 — *Wǒ xiān jiǎndān jièshào yíxià bèijǐng.* — "Tôi giới thiệu sơ qua bối cảnh trước."

### 4. Chuyển sang vấn đề tiếp theo (转到下一个话题)
- 接下来我们看一下第二个问题。 — *Jiēxiàlái wǒmen kàn yíxià dì-èr gè wèntí.* — "Tiếp theo chúng ta xem vấn đề thứ hai."
- 那我们继续下一项。 — *Nà wǒmen jìxù xià yí xiàng.* — "Vậy chúng ta tiếp tục mục tiếp theo."
- 关于这个问题先说到这儿，我们看看下一个。 — *Guānyú zhège wèntí xiān shuō dào zhèr, wǒmen kànkan xià yí gè.* — "Vấn đề này tạm nói đến đây, xem tiếp cái tiếp theo."

### 5. Mời người khác phát biểu (请别人发言)
- 我们听听你的看法。 — *Wǒmen tīngting nǐ de kànfǎ.* — "Chúng ta nghe ý kiến của bạn xem."
- 你那边有什么想法？ — *Nǐ nàbiān yǒu shénme xiǎngfǎ?* — "Bên đó bạn có ý kiến gì không?"
- 有没有人要补充一下？ — *Yǒu méiyǒu rén yào bǔchōng yíxià?* — "Có ai muốn bổ sung thêm gì không?"

### 6. Kéo lại trọng tâm khi bàn luận lan man (拉回主题)
- 我们先集中说一下这个问题。 — *Wǒmen xiān jízhōng shuō yíxià zhège wèntí.* — "Chúng ta tập trung vào vấn đề này trước đã."
- 好像有点跑题了，我们回到刚才的话题。 — *Hǎoxiàng yǒudiǎn pǎotí le, wǒmen huídào gāngcái de huàtí.* — "Hình như hơi lạc đề rồi, quay lại chủ đề vừa nãy."
- 这个我们晚点再聊，先说重点。 — *Zhège wǒmen wǎndiǎn zài liáo, xiān shuō zhòngdiǎn.* — "Cái này để lát nữa nói tiếp, giờ nói trọng tâm trước."

### 7. Kết thúc cuộc họp (结束会议)
- 那今天就先到这里。 — *Nà jīntiān jiù xiān dào zhèlǐ.* — "Vậy hôm nay tạm dừng ở đây."
- 我们下次会议再继续讨论。 — *Wǒmen xiàcì huìyì zài jìxù tǎolùn.* — "Chúng ta để cuộc họp lần sau bàn tiếp."
- 谢谢大家，辛苦了。 — *Xièxie dàjiā, xīnkǔ le.* — "Cảm ơn mọi người, vất vả rồi."
- 会议就开到这里，大家散会吧。 — *Huìyì jiù kāi dào zhèlǐ, dàjiā sànhuì ba.* — "Cuộc họp đến đây thôi, mọi người tan họp nhé."` },
  { label: "Giao việc, deadline & báo cáo tiến độ", num: "2", slug: "giao-viec-deadline", body: `## Giao việc, deadline & báo cáo tiến độ (分配任务、截止日期与进度汇报 — *fēnpèi rènwù, jiézhǐ rìqī yǔ jìndù huìbào*)

Nhóm cụm dùng khi giao việc cho đồng nghiệp/cấp dưới, xác nhận thời hạn, cập nhật tiến độ, xin gia hạn và nhắc việc — những câu nói hằng ngày trong công việc văn phòng.

### 1. Giao việc cụ thể (分配任务)
- 这个任务交给你负责。 — *Zhège rènwù jiāo gěi nǐ fùzé.* — "Việc này giao cho bạn phụ trách."
- 你能不能负责一下这部分？ — *Nǐ néng bu néng fùzé yíxià zhè bùfèn?* — "Bạn có thể phụ trách phần này không?"
- 这件事就交给你了。 — *Zhè jiàn shì jiù jiāo gěi nǐ le.* — "Việc này giao cho bạn nhé."
- 麻烦你把这个做完。 — *Máfan nǐ bǎ zhège zuò wán.* — "Phiền bạn làm xong cái này."
- 这个项目由你主导。 — *Zhège xiàngmù yóu nǐ zhǔdǎo.* — "Dự án này do bạn chủ trì."

### 2. Hỏi/xác nhận deadline (确认截止日期)
- 这个什么时候要交？ — *Zhège shénme shíhou yào jiāo?* — "Cái này bao giờ phải nộp?"
- 截止日期是什么时候？ — *Jiézhǐ rìqī shì shénme shíhou?* — "Hạn chót là khi nào?"
- 最晚周五之前交给我。 — *Zuì wǎn zhōuwǔ zhīqián jiāo gěi wǒ.* — "Chậm nhất là trước thứ Sáu nộp cho tôi."
- 我们确认一下时间，行吗？ — *Wǒmen quèrèn yíxià shíjiān, xíng ma?* — "Chúng ta xác nhận lại thời gian nhé, được không?"
- 你觉得这个时间够吗？ — *Nǐ juéde zhège shíjiān gòu ma?* — "Bạn thấy thời gian này có đủ không?"

### 3. Báo cáo tiến độ (汇报进度)
- 目前进展得怎么样了？ — *Mùqián jìnzhǎn de zěnmeyàng le?* — "Hiện giờ tiến độ thế nào rồi?"
- 已经完成大概八成了。 — *Yǐjīng wánchéng dàgài bā chéng le.* — "Đã hoàn thành khoảng tám phần mười rồi."
- 这部分我做完了。 — *Zhè bùfèn wǒ zuò wán le.* — "Phần này tôi làm xong rồi."
- 还剩一点点，快好了。 — *Hái shèng yìdiǎndiǎn, kuài hǎo le.* — "Còn một chút nữa, sắp xong rồi."
- 目前一切都按计划进行。 — *Mùqián yíqiè dōu àn jìhuà jìnxíng.* — "Hiện tại mọi thứ đều theo đúng kế hoạch."

### 4. Xin gia hạn (申请延期)
- 能不能再宽限我两天？ — *Néng bu néng zài kuānxiàn wǒ liǎng tiān?* — "Có thể cho tôi gia hạn thêm hai ngày không?"
- 时间上有点紧，能延一下吗？ — *Shíjiān shàng yǒudiǎn jǐn, néng yán yíxià ma?* — "Thời gian hơi gấp, có thể lùi lại chút không?"
- 我可能没办法按时完成。 — *Wǒ kěnéng méi bànfǎ ànshí wánchéng.* — "Tôi có thể không hoàn thành đúng hạn."
- 方便的话，能不能把截止日期往后推一下？ — *Fāngbiàn dehuà, néng bu néng bǎ jiézhǐ rìqī wǎnghòu tuī yíxià?* — "Nếu tiện, có thể lùi hạn chót lại một chút không?"

### 5. Nhắc việc & follow-up (催办/跟进)
- 那件事进行得怎么样了？ — *Nà jiàn shì jìnxíng de zěnmeyàng le?* — "Việc đó tiến hành đến đâu rồi?"
- 想跟你确认一下那个事情。 — *Xiǎng gēn nǐ quèrèn yíxià nàge shìqing.* — "Muốn xác nhận lại với bạn việc đó."
- 不好意思催一下，那个东西好了吗？ — *Bù hǎoyìsi cuī yíxià, nàge dōngxi hǎo le ma?* — "Xin lỗi giục một chút, cái đó xong chưa?"
- 麻烦尽快给我回复一下。 — *Máfan jǐnkuài gěi wǒ huífù yíxià.* — "Phiền bạn phản hồi lại tôi sớm nhất có thể."

### 6. Xử lý khi trễ deadline (处理延期情况)
- 不好意思，这次可能要晚一点交。 — *Bù hǎoyìsi, zhè cì kěnéng yào wǎn yìdiǎn jiāo.* — "Xin lỗi, lần này có thể phải nộp trễ một chút."
- 抱歉，进度比预期慢了一些。 — *Bàoqiàn, jìndù bǐ yùqī màn le yìxiē.* — "Xin lỗi, tiến độ chậm hơn dự kiến một chút."
- 这个延误是我的责任。 — *Zhège yánwù shì wǒ de zérèn.* — "Sự chậm trễ này là trách nhiệm của tôi."
- 我们尽量把耽误的时间补回来。 — *Wǒmen jǐnliàng bǎ dānwu de shíjiān bǔ huílái.* — "Chúng ta cố gắng bù lại thời gian đã chậm trễ."` },
  { label: "Phản hồi & xử lý bất đồng trong công việc", num: "3", slug: "phan-hoi-bat-dong", body: `## Phản hồi & xử lý bất đồng trong công việc (工作中的反馈与分歧处理 — *gōngzuò zhōng de fǎnkuì yǔ fēnqí chǔlǐ*)

Nhóm cụm dùng để góp ý, phản hồi công việc và xử lý bất đồng quan điểm một cách khéo léo, giữ hoà khí mà vẫn nói rõ vấn đề — đặc biệt quan trọng trong văn hoá công sở coi trọng thể diện.

### 1. Khen trước khi góp ý (先肯定再提建议)
- 整体做得不错，我有几点小建议。 — *Zhěngtǐ zuò de búcuò, wǒ yǒu jǐ diǎn xiǎo jiànyì.* — "Nhìn chung làm khá tốt, tôi có vài góp ý nhỏ."
- 这个方向是对的，只是细节可以再调整一下。 — *Zhège fāngxiàng shì duì de, zhǐshì xìjié kěyǐ zài tiáozhěng yíxià.* — "Hướng này đúng rồi, chỉ là chi tiết có thể điều chỉnh thêm."
- 你这个想法挺好的，我再补充一点。 — *Nǐ zhège xiǎngfǎ tǐng hǎo de, wǒ zài bǔchōng yìdiǎn.* — "Ý tưởng của bạn khá hay, tôi bổ sung thêm một chút."
- 大方向没问题，我们可以再打磨一下。 — *Dà fāngxiàng méi wèntí, wǒmen kěyǐ zài dǎmó yíxià.* — "Hướng lớn không có vấn đề gì, chúng ta có thể mài giũa thêm."

### 2. Chỉ ra vấn đề nhẹ nhàng (委婉指出问题)
- 我有一个地方不太确定，想跟你确认一下。 — *Wǒ yǒu yí gè dìfang bú tài quèdìng, xiǎng gēn nǐ quèrèn yíxià.* — "Có một chỗ tôi không chắc lắm, muốn xác nhận lại với bạn."
- 这里好像有点不太对，你要不要再看看？ — *Zhèlǐ hǎoxiàng yǒudiǎn bú tài duì, nǐ yào bu yào zài kànkan?* — "Chỗ này hình như hơi không ổn, bạn xem lại thử được không?"
- 这部分是不是可以再简单一点？ — *Zhè bùfèn shì bu shì kěyǐ zài jiǎndān yìdiǎn?* — "Phần này có thể làm đơn giản hơn một chút không?"
- 我个人觉得这里稍微有点问题。 — *Wǒ gèrén juéde zhèlǐ shāowēi yǒudiǎn wèntí.* — "Cá nhân tôi thấy chỗ này hơi có vấn đề."

### 3. Đề xuất cách làm khác (提出别的做法)
- 要不我们换个思路试试？ — *Yàobù wǒmen huàn gè sīlù shìshi?* — "Hay là chúng ta thử đổi hướng suy nghĩ xem?"
- 或者我们可以这样做。 — *Huòzhě wǒmen kěyǐ zhèyàng zuò.* — "Hoặc chúng ta có thể làm thế này."
- 我觉得还有一种更好的办法。 — *Wǒ juéde hái yǒu yì zhǒng gèng hǎo de bànfǎ.* — "Tôi nghĩ còn có một cách tốt hơn."
- 不知道这个方案你觉得怎么样。 — *Bù zhīdào zhège fāng'àn nǐ juéde zěnmeyàng.* — "Không biết phương án này bạn thấy sao."

### 4. Không đồng ý nhưng lịch sự (礼貌地不同意)
- 我不太同意这个说法。 — *Wǒ bú tài tóngyì zhège shuōfǎ.* — "Tôi không hoàn toàn đồng ý với ý kiến này."
- 这个我有不同的看法。 — *Zhège wǒ yǒu bùtóng de kànfǎ.* — "Việc này tôi có ý kiến khác."
- 我理解你的意思，不过我担心这样会有风险。 — *Wǒ lǐjiě nǐ de yìsi, búguò wǒ dānxīn zhèyàng huì yǒu fēngxiǎn.* — "Tôi hiểu ý bạn, nhưng tôi lo làm vậy sẽ có rủi ro."
- 这一点我倒是有点保留意见。 — *Zhè yìdiǎn wǒ dàoshi yǒudiǎn bǎoliú yìjiàn.* — "Điểm này tôi có phần bảo lưu ý kiến."

### 5. Xin lỗi khi mình sai (承认错误道歉)
- 这是我的问题，我马上改。 — *Zhè shì wǒ de wèntí, wǒ mǎshàng gǎi.* — "Đây là lỗi của tôi, tôi sửa ngay."
- 不好意思，是我疏忽了。 — *Bù hǎoyìsi, shì wǒ shūhu le.* — "Xin lỗi, là tôi sơ suất."
- 抱歉，这个地方我确实考虑得不够周全。 — *Bàoqiàn, zhège dìfang wǒ quèshí kǎolǜ de bú gòu zhōuquán.* — "Xin lỗi, chỗ này tôi đúng là suy nghĩ chưa thấu đáo."
- 谢谢你指出来，我下次注意。 — *Xièxie nǐ zhǐ chūlái, wǒ xiàcì zhùyì.* — "Cảm ơn bạn đã chỉ ra, lần sau tôi sẽ chú ý."

### 6. Chấp nhận góp ý (接受反馈)
- 你说得有道理，我再改改。 — *Nǐ shuō de yǒu dàolǐ, wǒ zài gǎigai.* — "Bạn nói có lý, tôi sửa lại thêm."
- 谢谢你的建议，我会考虑的。 — *Xièxie nǐ de jiànyì, wǒ huì kǎolǜ de.* — "Cảm ơn góp ý của bạn, tôi sẽ cân nhắc."
- 好，我按你说的调整一下。 — *Hǎo, wǒ àn nǐ shuō de tiáozhěng yíxià.* — "Được, tôi sẽ điều chỉnh theo ý bạn."
- 这个反馈很有用，谢谢。 — *Zhège fǎnkuì hěn yǒuyòng, xièxie.* — "Phản hồi này rất hữu ích, cảm ơn."` },
  { label: "Thương lượng & trao đổi điều khoản", num: "4", slug: "thuong-luong", body: `## Thương lượng & trao đổi điều khoản (谈判与条件协商 — *tánpàn yǔ tiáojiàn xiéshāng*)

Nhóm cụm cơ bản dùng khi thương lượng điều khoản hợp tác, giá cả, hoặc điều kiện công việc — từ lúc đưa ra đề xuất, mặc cả, nhượng bộ, cho đến khi chốt thoả thuận.

### 1. Đưa ra đề xuất (提出方案)
- 我们的想法是这样的。 — *Wǒmen de xiǎngfǎ shì zhèyàng de.* — "Ý tưởng của chúng tôi là như thế này."
- 我先提一个方案，大家看看行不行。 — *Wǒ xiān tí yí gè fāng'àn, dàjiā kànkan xíng bu xíng.* — "Tôi đưa ra một phương án trước, mọi người xem có ổn không."
- 我们希望能在这个价格上合作。 — *Wǒmen xīwàng néng zài zhège jiàgé shàng hézuò.* — "Chúng tôi hy vọng có thể hợp tác với mức giá này."
- 这是我们能接受的条件。 — *Zhè shì wǒmen néng jiēshòu de tiáojiàn.* — "Đây là điều kiện chúng tôi có thể chấp nhận."

### 2. Phản đề xuất & mặc cả (还价/提出条件)
- 这个价格对我们来说有点高。 — *Zhège jiàgé duì wǒmen láishuō yǒudiǎn gāo.* — "Mức giá này với chúng tôi hơi cao."
- 能不能再优惠一点？ — *Néng bu néng zài yōuhuì yìdiǎn?* — "Có thể ưu đãi thêm chút nữa không?"
- 如果数量增加，价格能不能降一点？ — *Rúguǒ shùliàng zēngjiā, jiàgé néng bu néng jiàng yìdiǎn?* — "Nếu tăng số lượng, giá có thể giảm chút không?"
- 我们希望条件能再宽松一些。 — *Wǒmen xīwàng tiáojiàn néng zài kuānsōng yìxiē.* — "Chúng tôi mong điều kiện có thể thoáng hơn một chút."

### 3. Nhượng bộ có điều kiện (有条件的让步)
- 如果你们能加快交货时间，价格上我们可以再谈。 — *Rúguǒ nǐmen néng jiākuài jiāohuò shíjiān, jiàgé shàng wǒmen kěyǐ zài tán.* — "Nếu các bạn đẩy nhanh thời gian giao hàng, giá cả chúng tôi có thể bàn thêm."
- 这样吧，我们各让一步。 — *Zhèyàng ba, wǒmen gè ràng yí bù.* — "Vậy thế này, mỗi bên nhượng bộ một chút."
- 如果你们能接受这个条件，我们可以考虑降价。 — *Rúguǒ nǐmen néng jiēshòu zhège tiáojiàn, wǒmen kěyǐ kǎolǜ jiàngjià.* — "Nếu các bạn chấp nhận điều kiện này, chúng tôi có thể cân nhắc giảm giá."
- 我们可以在这一点上让步，但其他条件不变。 — *Wǒmen kěyǐ zài zhè yì diǎn shàng ràngbù, dàn qítā tiáojiàn bú biàn.* — "Chúng tôi có thể nhượng bộ ở điểm này, nhưng các điều kiện khác giữ nguyên."

### 4. Chốt thoả thuận (达成协议)
- 那就这么定了。 — *Nà jiù zhème dìng le.* — "Vậy thì chốt như vậy nhé."
- 好，我们就按这个条件签吧。 — *Hǎo, wǒmen jiù àn zhège tiáojiàn qiān ba.* — "Được, chúng ta ký theo điều kiện này nhé."
- 这个方案双方都能接受，就这样定下来吧。 — *Zhège fāng'àn shuāngfāng dōu néng jiēshòu, jiù zhèyàng dìng xiàlái ba.* — "Phương án này cả hai bên đều chấp nhận được, chốt như vậy nhé."
- 合作愉快，期待后续。 — *Hézuò yúkuài, qídài hòuxù.* — "Hợp tác vui vẻ, mong chờ những bước tiếp theo."

### 5. Xin thời gian suy nghĩ trước khi quyết (需要时间考虑)
- 这件事我需要再考虑一下。 — *Zhè jiàn shì wǒ xūyào zài kǎolǜ yíxià.* — "Việc này tôi cần suy nghĩ thêm."
- 能不能给我们一点时间讨论一下？ — *Néng bu néng gěi wǒmen yìdiǎn shíjiān tǎolùn yíxià?* — "Có thể cho chúng tôi chút thời gian bàn bạc không?"
- 我们内部商量一下，再给你答复。 — *Wǒmen nèibù shāngliang yíxià, zài gěi nǐ dáfù.* — "Chúng tôi bàn bạc nội bộ rồi trả lời bạn sau."
- 这个先不急着定，我们再研究研究。 — *Zhège xiān bù jízhe dìng, wǒmen zài yánjiu yánjiu.* — "Cái này chưa vội chốt, chúng tôi nghiên cứu thêm."` },
  { label: "Điện thoại, nhắn tin & email công việc", num: "5", slug: "dien-thoai-email", body: `## Điện thoại, nhắn tin & email công việc (工作电话、短信与邮件 — *gōngzuò diànhuà, duǎnxìn yǔ yóujiàn*)

Nhóm cụm dùng trong giao tiếp công việc qua điện thoại, tin nhắn và email — từ cách bắt máy, xin lỗi khi lỡ cuộc gọi, đến cách mở đầu và kết thúc tin nhắn/email sao cho lịch sự, chuyên nghiệp.

### 1. Bắt máy & mở đầu cuộc gọi (接电话/开场白)
- 喂，你好，我是小王。 — *Wéi, nǐ hǎo, wǒ shì Xiǎo Wáng.* — "Alô, xin chào, tôi là Tiểu Vương."
- 您好，请问是张经理吗？ — *Nín hǎo, qǐngwèn shì Zhāng jīnglǐ ma?* — "Xin chào, cho hỏi có phải giám đốc Trương không ạ?"
- 现在方便讲电话吗？ — *Xiànzài fāngbiàn jiǎng diànhuà ma?* — "Bây giờ tiện nói chuyện điện thoại không?"
- 我打电话是想跟您确认一下时间。 — *Wǒ dǎ diànhuà shì xiǎng gēn nín quèrèn yíxià shíjiān.* — "Tôi gọi điện là muốn xác nhận lại thời gian với anh/chị."

### 2. Xin lỗi vì gọi trễ / không nghe máy được (未接电话道歉)
- 不好意思，刚才在开会，没接到电话。 — *Bù hǎoyìsi, gāngcái zài kāihuì, méi jiēdào diànhuà.* — "Xin lỗi, vừa nãy đang họp nên không nghe máy được."
- 抱歉现在才回电话给你。 — *Bàoqiàn xiànzài cái huí diànhuà gěi nǐ.* — "Xin lỗi giờ mới gọi lại cho bạn."
- 不好意思，刚才手机没在身边。 — *Bù hǎoyìsi, gāngcái shǒujī méi zài shēnbiān.* — "Xin lỗi, vừa nãy điện thoại không ở bên người."
- 抱歉让你久等了，现在方便说吗？ — *Bàoqiàn ràng nǐ jiǔ děng le, xiànzài fāngbiàn shuō ma?* — "Xin lỗi để bạn đợi lâu, giờ tiện nói chuyện không?"

### 3. Kết thúc cuộc gọi (结束通话)
- 好，那就这样，先挂了。 — *Hǎo, nà jiù zhèyàng, xiān guà le.* — "Được, vậy nhé, tôi cúp máy trước đây."
- 那我们保持联系。 — *Nà wǒmen bǎochí liánxì.* — "Vậy chúng ta giữ liên lạc nhé."
- 好，没别的事了，谢谢你。 — *Hǎo, méi bié de shì le, xièxie nǐ.* — "Được rồi, không còn việc gì khác, cảm ơn bạn."
- 那先这样，有事再联系。 — *Nà xiān zhèyàng, yǒushì zài liánxì.* — "Vậy tạm thế đã, có việc gì liên lạc sau."

### 4. Mở đầu tin nhắn/email công việc (工作消息/邮件开头)
- 王总，您好，打扰一下。 — *Wáng zǒng, nín hǎo, dǎrǎo yíxià.* — "Chào giám đốc Vương, làm phiền một chút."
- 你好，关于上次说的那个事情。 — *Nǐ hǎo, guānyú shàngcì shuō de nàge shìqing.* — "Chào bạn, về việc đã nói lần trước."
- 您好，冒昧打扰，想跟您确认一件事。 — *Nín hǎo, màomèi dǎrǎo, xiǎng gēn nín quèrèn yí jiàn shì.* — "Xin chào, mạo muội làm phiền, muốn xác nhận với anh/chị một việc."
- 你好，方便的话看一下这封邮件。 — *Nǐ hǎo, fāngbiàn dehuà kàn yíxià zhè fēng yóujiàn.* — "Chào bạn, nếu tiện thì xem qua email này giúp mình."

### 5. Kết thúc tin nhắn/email lịch sự (工作消息/邮件结尾)
- 麻烦您了，谢谢！ — *Máfan nín le, xièxie!* — "Phiền anh/chị rồi, cảm ơn!"
- 如有问题，随时联系我。 — *Rúyǒu wèntí, suíshí liánxì wǒ.* — "Nếu có vấn đề gì, cứ liên hệ tôi bất cứ lúc nào."
- 期待您的回复。 — *Qídài nín de huífù.* — "Mong chờ phản hồi của anh/chị."
- 辛苦了，谢谢配合。 — *Xīnkǔ le, xièxie pèihé.* — "Vất vả rồi, cảm ơn đã phối hợp."

### 6. Xin phản hồi qua tin nhắn (请求回复)
- 方便的话麻烦回复一下。 — *Fāngbiàn dehuà máfan huífù yíxià.* — "Nếu tiện thì phiền bạn phản hồi lại giúp."
- 看到消息麻烦回我一下。 — *Kàndào xiāoxi máfan huí wǒ yíxià.* — "Thấy tin nhắn thì phiền nhắn lại giúp mình."
- 不好意思催一下，方便回复一下吗？ — *Bù hǎoyìsi cuī yíxià, fāngbiàn huífù yíxià ma?* — "Xin lỗi giục một chút, bạn tiện phản hồi không?"
- 收到请回复一下，谢谢。 — *Shōudào qǐng huífù yíxià, xièxie.* — "Nhận được rồi vui lòng phản hồi giúp, cảm ơn."` },
  { label: "Chào hỏi & giới thiệu bản thân", num: "6", slug: "chao-hoi-gioi-thieu", body: `## Chào hỏi & giới thiệu bản thân (打招呼与自我介绍 — *dǎ zhāohu yǔ zìwǒ jièshào*)

Nhóm cụm dùng để chào hỏi, tự giới thiệu và giới thiệu người khác trong các tình huống xã giao hằng ngày — từ gặp lần đầu, gặp lại người quen, đến cách xưng hô sao cho phù hợp với vai vế và mức độ thân thiết, một điểm rất quan trọng trong văn hoá Trung Quốc.

### 1. Chào hỏi thường ngày (日常问候)
- 你好！ — *Nǐ hǎo!* — "Xin chào!"
- 大家好！ — *Dàjiā hǎo!* — "Chào mọi người!"
- 早上好！ — *Zǎoshang hǎo!* — "Chào buổi sáng!"
- 你好，请问... — *Nǐ hǎo, qǐngwèn...* — "Xin chào, cho tôi hỏi..."
- 您好，打扰一下。 — *Nín hǎo, dǎrǎo yíxià.* — "Xin chào, cho tôi làm phiền một chút."

### 2. Chào khi gặp lại (再次见面的问候)
- 好久不见！ — *Hǎojiǔ bú jiàn!* — "Lâu rồi không gặp!"
- 最近怎么样？ — *Zuìjìn zěnmeyàng?* — "Dạo này thế nào?"
- 又见面了。 — *Yòu jiànmiàn le.* — "Lại gặp nhau rồi này."
- 你还是老样子。 — *Nǐ háishi lǎo yàngzi.* — "Cậu vẫn như xưa nhỉ."
- 没想到在这儿遇到你。 — *Méi xiǎngdào zài zhèr yùdào nǐ.* — "Không ngờ lại gặp cậu ở đây."

### 3. Tự giới thiệu bản thân (自我介绍)
- 我先自我介绍一下。 — *Wǒ xiān zìwǒ jièshào yíxià.* — "Để tôi tự giới thiệu một chút."
- 我叫阮氏梅，你可以叫我梅。 — *Wǒ jiào Ruǎn Shì Méi, nǐ kěyǐ jiào wǒ Méi.* — "Tôi tên là Nguyễn Thị Mai, bạn có thể gọi tôi là Mai."
- 我是从越南来的。 — *Wǒ shì cóng Yuènán lái de.* — "Tôi đến từ Việt Nam."
- 我在一家科技公司工作。 — *Wǒ zài yì jiā kējì gōngsī gōngzuò.* — "Tôi làm việc ở một công ty công nghệ."
- 很高兴认识大家。 — *Hěn gāoxìng rènshi dàjiā.* — "Rất vui được quen biết mọi người."

### 4. Giới thiệu người khác (介绍他人)
- 我来介绍一下，这是我同事小李。 — *Wǒ lái jièshào yíxià, zhè shì wǒ tóngshì Xiǎo Lǐ.* — "Để tôi giới thiệu, đây là đồng nghiệp của tôi, Tiểu Lý."
- 这位是我们公司的王经理。 — *Zhè wèi shì wǒmen gōngsī de Wáng jīnglǐ.* — "Đây là giám đốc Vương của công ty chúng tôi."
- 你们俩还没见过面吧？ — *Nǐmen liǎ hái méi jiànguo miàn ba?* — "Hai người chưa gặp nhau nhỉ?"
- 快叫叔叔好。 — *Kuài jiào shūshu hǎo.* — "Mau chào chú đi." (nói khi giới thiệu trẻ con với người lớn tuổi hơn)
- 彼此认识一下。 — *Bǐcǐ rènshi yíxià.* — "Hai bên làm quen với nhau nhé."

### 5. Cách xưng hô / gọi tên phù hợp (称呼方式)
- 您怎么称呼？ — *Nín zěnme chēnghu?* — "Xin hỏi xưng hô với ngài thế nào ạ?"
- 叫我小陈就行。 — *Jiào wǒ Xiǎo Chén jiù xíng.* — "Cứ gọi tôi là Tiểu Trần là được."
- 以后叫我老张吧。 — *Yǐhòu jiào wǒ Lǎo Zhāng ba.* — "Sau này cứ gọi tôi là Lão Trương nhé."
- 陈老师，您好。 — *Chén lǎoshī, nín hǎo.* — "Thầy/Cô Trần, xin chào."
- 张哥，好久不见。 — *Zhāng gē, hǎojiǔ bú jiàn.* — "Anh Trương, lâu rồi không gặp."

### 6. Chào tạm biệt (告别语)
- 再见！ — *Zàijiàn!* — "Tạm biệt!"
- 我先走了。 — *Wǒ xiān zǒu le.* — "Tôi xin phép đi trước."
- 慢走。 — *Màn zǒu.* — "Đi cẩn thận nhé." (nói khi tiễn khách ra về)
- 保持联系。 — *Bǎochí liánxì.* — "Giữ liên lạc nhé."
- 改天再聊。 — *Gǎitiān zài liáo.* — "Hôm khác nói chuyện tiếp nhé."` },
  { label: "Hỏi thăm & xã giao thường ngày (寒暄)", num: "7", slug: "hoi-tham-xa-giao", body: `## Hỏi thăm & xã giao thường ngày (寒暄 — *hánxuān*)

Người Trung Quốc có khái niệm 寒暄 (*hánxuān*) — những câu hỏi thăm mang tính nghi thức xã giao, không nhằm mục đích hỏi thông tin thật sự mà chỉ để thể hiện sự quan tâm và tạo không khí thân thiện trước khi vào chuyện chính. Ví dụ câu "ăn cơm chưa?" hay "đi đâu đấy?" thường chỉ là lời chào, không phải câu hỏi cần trả lời chi tiết — hiểu đúng bản chất này giúp phản xạ tự nhiên hơn khi giao tiếp.

### 1. Hỏi thăm sức khoẻ/công việc theo phép xã giao (寒暄问候)
- 最近身体怎么样？ — *Zuìjìn shēntǐ zěnmeyàng?* — "Dạo này sức khoẻ thế nào?"
- 工作忙不忙？ — *Gōngzuò máng bu máng?* — "Công việc có bận không?"
- 家里人都好吧？ — *Jiālǐ rén dōu hǎo ba?* — "Người nhà đều khoẻ cả chứ?"
- 最近在忙什么呢？ — *Zuìjìn zài máng shénme ne?* — "Dạo này đang bận gì thế?"
- 一切都还顺利吧？ — *Yíqiè dōu hái shùnlì ba?* — "Mọi thứ vẫn suôn sẻ chứ?"

### 2. Chuyện phiếm về thời tiết (聊天气)
- 今天天气真好。 — *Jīntiān tiānqì zhēn hǎo.* — "Hôm nay thời tiết đẹp thật."
- 最近老下雨，真麻烦。 — *Zuìjìn lǎo xiàyǔ, zhēn máfan.* — "Dạo này cứ mưa suốt, phiền thật."
- 外面挺冷的，多穿点儿。 — *Wàimiàn tǐng lěng de, duō chuān diǎnr.* — "Bên ngoài khá lạnh, mặc thêm đồ vào."
- 这几天热得受不了。 — *Zhè jǐ tiān rè de shòubuliǎo.* — "Mấy hôm nay nóng chịu không nổi."

### 3. Câu hỏi mở đầu kiểu "ăn cơm chưa" (「吃了吗」式开场白)
- 吃了吗？ — *Chī le ma?* — "Ăn cơm chưa?" (câu chào xã giao quen thuộc, không nhất thiết hỏi thật)
- 吃了，你呢？ — *Chī le, nǐ ne?* — "Ăn rồi, còn bạn?"
- 上哪儿去啊？ — *Shàng nǎr qù a?* — "Đi đâu đấy?"
- 去买菜啊？ — *Qù mǎi cài a?* — "Đi mua đồ ăn à?"
- 忙着呢吧？ — *Mángzhe ne ba?* — "Đang bận đúng không?"

### 4. Khen ngoại hình/đồ vật một cách xã giao (社交式夸奖)
- 你今天气色不错啊。 — *Nǐ jīntiān qìsè búcuò a.* — "Hôm nay trông cậu tươi tắn thế."
- 这件衣服真好看，在哪儿买的？ — *Zhè jiàn yīfu zhēn hǎokàn, zài nǎr mǎi de?* — "Cái áo này đẹp thật, mua ở đâu vậy?"
- 你怎么一点都没变啊。 — *Nǐ zěnme yìdiǎn dōu méi biàn a.* — "Sao cậu chẳng thay đổi tí nào vậy."
- 你家布置得真温馨。 — *Nǐ jiā bùzhì de zhēn wēnxīn.* — "Nhà bạn trang trí thật ấm cúng."

### 5. Đáp lại câu hỏi thăm hỏi (回应寒暄)
- 还行，凑合过呗。 — *Hái xíng, còuhe guò bei.* — "Cũng tạm ổn, sống qua ngày thôi."
- 老样子，没什么变化。 — *Lǎo yàngzi, méi shénme biànhuà.* — "Vẫn như cũ, chẳng có gì thay đổi."
- 挺好的，谢谢关心。 — *Tǐng hǎo de, xièxie guānxīn.* — "Khá tốt, cảm ơn đã quan tâm."
- 还不是老样子嘛。 — *Hái búshì lǎo yàngzi ma.* — "Thì vẫn vậy thôi mà."` },
  { label: "Mời ăn uống & giao tiếp trên bàn tiệc", num: "8", slug: "moi-an-ban-tiec", body: `## Mời ăn uống & giao tiếp trên bàn tiệc (饭局文化 — *fànjú wénhuà*)

Bàn tiệc (饭局) là nơi diễn ra phần lớn giao tiếp xã hội và công việc thực sự ở Trung Quốc — mời rượu, gắp thức ăn cho khách, giành trả tiền đều là những nghi thức thể hiện sự hiếu khách và giữ thể diện cho nhau, chứ không đơn thuần là ăn uống.

### 1. Mời ăn/mời uống (邀请吃饭喝酒)
- 今天我请客，你想吃什么？ — *Jīntiān wǒ qǐngkè, nǐ xiǎng chī shénme?* — "Hôm nay tôi mời, bạn muốn ăn gì?"
- 改天请你吃饭。 — *Gǎitiān qǐng nǐ chīfàn.* — "Hôm khác tôi mời bạn ăn cơm."
- 一起吃个便饭吧。 — *Yìqǐ chī gè biànfàn ba.* — "Cùng ăn bữa cơm đơn giản nhé."
- 喝点儿什么？啤酒还是白酒？ — *Hē diǎnr shénme? Píjiǔ háishi báijiǔ?* — "Uống gì đó nhé? Bia hay rượu trắng?"
- 一起喝一杯吧。 — *Yìqǐ hē yì bēi ba.* — "Cùng uống một ly nhé."

### 2. Nghi thức chúc rượu (敬酒礼仪)
- 我敬您一杯。 — *Wǒ jìng nín yì bēi.* — "Tôi xin kính ngài một ly."
- 来，我们干一杯！ — *Lái, wǒmen gān yì bēi!* — "Nào, chúng ta cạn một ly!"
- 这杯我先干为敬。 — *Zhè bēi wǒ xiān gān wéi jìng.* — "Ly này tôi xin cạn trước để tỏ lòng kính trọng."
- 感谢大家赏光，我敬大家一杯。 — *Gǎnxiè dàjiā shǎngguāng, wǒ jìng dàjiā yì bēi.* — "Cảm ơn mọi người đã đến, tôi xin mời mọi người một ly."
- 随意，不会喝就随意。 — *Suíyì, bú huì hē jiù suíyì.* — "Tuỳ ý, không uống được thì cứ tuỳ ý thôi."

### 3. Mời gắp thức ăn cho khách (让菜夹菜)
- 别客气，多吃点儿。 — *Bié kèqi, duō chī diǎnr.* — "Đừng khách sáo, ăn thêm chút đi."
- 来，尝尝这个菜。 — *Lái, chángchang zhège cài.* — "Nào, nếm thử món này xem."
- 我给你夹一点儿。 — *Wǒ gěi nǐ jiā yìdiǎnr.* — "Để tôi gắp cho bạn một ít."
- 这个菜很好吃，你多吃点儿。 — *Zhège cài hěn hǎochī, nǐ duō chī diǎnr.* — "Món này ngon lắm, bạn ăn thêm đi."

### 4. Từ chối/nhận đồ ăn lịch sự (礼貌推让与接受)
- 不用了，我吃饱了。 — *Búyòng le, wǒ chībǎo le.* — "Thôi khỏi, tôi no rồi."
- 谢谢，我自己来就行。 — *Xièxie, wǒ zìjǐ lái jiù xíng.* — "Cảm ơn, để tôi tự gắp là được."
- 好，那我就不客气了。 — *Hǎo, nà wǒ jiù bú kèqi le.* — "Được, vậy tôi xin không khách sáo nữa."
- 我随便吃点儿就好，别忙活了。 — *Wǒ suíbiàn chī diǎnr jiù hǎo, bié mánghuo le.* — "Tôi ăn qua loa là được rồi, đừng bận rộn nữa."

### 5. Tranh trả tiền (抢着买单)
- 这顿我来买单。 — *Zhè dùn wǒ lái mǎidān.* — "Bữa này để tôi trả tiền."
- 别抢，这次算我的。 — *Bié qiǎng, zhè cì suàn wǒ de.* — "Đừng tranh, lần này tính là của tôi."
- 下次让你请，这次我来。 — *Xiàcì ràng nǐ qǐng, zhè cì wǒ lái.* — "Lần sau để bạn mời, lần này để tôi."
- 我已经付过了。 — *Wǒ yǐjīng fùguo le.* — "Tôi thanh toán rồi."
- AA制就行，别争了。 — *AA zhì jiù xíng, bié zhēng le.* — "Chia đều là được rồi, đừng tranh nữa."

### 6. Cảm ơn sau bữa ăn (饭后致谢)
- 今天谢谢你请客。 — *Jīntiān xièxie nǐ qǐngkè.* — "Hôm nay cảm ơn bạn đã mời."
- 吃得很开心，谢谢招待。 — *Chī de hěn kāixīn, xièxie zhāodài.* — "Ăn rất vui, cảm ơn đã tiếp đãi."
- 下次一定要让我请。 — *Xiàcì yídìng yào ràng wǒ qǐng.* — "Lần sau nhất định phải để tôi mời."
- 麻烦你了，吃得太好了。 — *Máfan nǐ le, chī de tài hǎo le.* — "Làm phiền bạn rồi, ăn ngon quá."` },
  { label: "Khen ngợi, cảm ơn & khiêm tốn đáp lễ", num: "9", slug: "khen-ngoi-khiem-ton", body: `## Khen ngợi, cảm ơn & khiêm tốn đáp lễ (夸奖、道谢与谦虚回应 — *kuājiǎng, dàoxiè yǔ qiānxū huíyìng*)

Trong văn hoá Trung Quốc, khi được khen, người ta thường không đơn giản nói "cảm ơn" như trong văn hoá phương Tây, mà có xu hướng khiêm tốn hạ thấp bản thân hoặc gạt đi lời khen — kiểu nói như 哪里哪里 hay 过奖了 — để tránh tỏ ra tự mãn và giữ phép lịch sự, thể diện cho cả hai bên. Đây là phản xạ ngôn ngữ cần luyện tập riêng, vì nếu chỉ nói "谢谢" đơn thuần đôi khi sẽ bị coi là hơi tự tin quá mức trong một số ngữ cảnh trang trọng.

### 1. Khen người khác (夸奖别人)
- 你真厉害！ — *Nǐ zhēn lìhai!* — "Bạn giỏi thật đấy!"
- 你做得太好了。 — *Nǐ zuò de tài hǎo le.* — "Bạn làm tốt quá."
- 你中文说得真流利。 — *Nǐ Zhōngwén shuō de zhēn liúlì.* — "Bạn nói tiếng Trung lưu loát thật."
- 你反应真快。 — *Nǐ fǎnyìng zhēn kuài.* — "Bạn phản ứng nhanh thật."
- 有你在，我们放心多了。 — *Yǒu nǐ zài, wǒmen fàngxīn duō le.* — "Có bạn ở đây, chúng tôi yên tâm hơn nhiều."

### 2. Khen đồ vật/món ăn (夸东西夸吃的)
- 这个菜做得真地道。 — *Zhège cài zuò de zhēn dìdao.* — "Món này làm đúng vị thật."
- 你家的茶很香。 — *Nǐ jiā de chá hěn xiāng.* — "Trà nhà bạn thơm quá."
- 这个设计很有创意。 — *Zhège shèjì hěn yǒu chuàngyì.* — "Thiết kế này rất sáng tạo."
- 你写的字真漂亮。 — *Nǐ xiě de zì zhēn piàoliang.* — "Chữ bạn viết đẹp thật."

### 3. Cảm ơn chân thành (真诚道谢)
- 太谢谢你了，真的帮了我大忙。 — *Tài xièxie nǐ le, zhēnde bāngle wǒ dà máng.* — "Cảm ơn bạn nhiều lắm, thật sự giúp tôi rất nhiều."
- 多亏了你，不然我真不知道怎么办。 — *Duōkuī le nǐ, bùrán wǒ zhēn bù zhīdào zěnme bàn.* — "May nhờ có bạn, không thì tôi thật không biết làm sao."
- 这份心意我心领了。 — *Zhè fèn xīnyì wǒ xīnlǐng le.* — "Tấm lòng này tôi xin ghi nhận."
- 辛苦你了，真的很感谢。 — *Xīnkǔ nǐ le, zhēnde hěn gǎnxiè.* — "Bạn vất vả rồi, thật sự rất cảm kích."

### 4. Khiêm tốn đáp lại lời khen (谦虚回应夸奖)
- 哪里哪里，过奖了。 — *Nǎlǐ nǎlǐ, guòjiǎng le.* — "Đâu có đâu có, quá khen rồi."
- 没有没有，还差得远呢。 — *Méiyǒu méiyǒu, hái chà de yuǎn ne.* — "Không có đâu, còn kém xa lắm."
- 哪儿的话，大家都一样。 — *Nǎr de huà, dàjiā dōu yíyàng.* — "Nói gì vậy, ai cũng như nhau cả thôi."
- 这都是应该做的。 — *Zhè dōu shì yīnggāi zuò de.* — "Đây đều là việc nên làm thôi."
- 过奖过奖，我还需要多学习。 — *Guòjiǎng guòjiǎng, wǒ hái xūyào duō xuéxí.* — "Quá khen rồi, tôi vẫn cần học hỏi thêm nhiều."

### 5. Khen ngược lại lịch sự (礼貌地回夸)
- 哪里，你才是真正厉害的那个。 — *Nǎlǐ, nǐ cái shì zhēnzhèng lìhai de nàge.* — "Đâu có, bạn mới là người giỏi thực sự."
- 我是跟你学的。 — *Wǒ shì gēn nǐ xué de.* — "Tôi học được từ bạn đấy."
- 还不是因为有你帮忙。 — *Hái búshì yīnwèi yǒu nǐ bāngmáng.* — "Cũng là nhờ có bạn giúp đỡ thôi."
- 大家一起努力的结果。 — *Dàjiā yìqǐ nǔlì de jiéguǒ.* — "Đây là kết quả mọi người cùng cố gắng."` },
  { label: "Mời mọc, từ chối khéo léo & giữ thể diện", num: "10", slug: "moi-moc-tu-choi-the-dien", body: `## Mời mọc, từ chối khéo léo & giữ thể diện (邀请、婉拒与顾全面子 — *yāoqǐng, wǎnjù yǔ gùquán miànzi*)

Trong văn hoá Trung Quốc, lời mời thường mang tính nghi thức xã giao (客套) nhiều hơn là một yêu cầu bắt buộc phải nhận — người mời có thể mời đi mời lại nhiều lần cho phải phép, còn người được mời cần biết cách từ chối khéo léo mà không khiến đối phương mất mặt (丢面子), hoặc nhận lời một cách tự nhiên khi bị nài nỉ chân thành. Nắm được nhịp điệu "mời — từ chối — nài nỉ — nhận" này là chìa khoá để giao tiếp xã giao suôn sẻ, giữ được 面子 (thể diện) cho cả hai bên.

### 1. Mời qua lại theo phép xã giao (客套邀请)
- 有空一起吃个饭吧。 — *Yǒu kòng yìqǐ chī gè fàn ba.* — "Khi nào rảnh cùng nhau ăn cơm nhé."
- 改天请你吃饭，一定要赏个脸。 — *Gǎitiān qǐng nǐ chīfàn, yídìng yào shǎng gè liǎn.* — "Hôm nào mời bạn ăn cơm, nhất định phải cho tôi cái vinh dự đó nhé."
- 你一定要来啊，不来我可不高兴了。 — *Nǐ yídìng yào lái a, bù lái wǒ kě bù gāoxìng le.* — "Bạn nhất định phải đến đấy, không đến là tôi giận đó."
- 别客气，就跟自己家一样。 — *Bié kèqi, jiù gēn zìjǐ jiā yíyàng.* — "Đừng khách sáo, cứ như ở nhà mình vậy."

### 2. Nhận lời mời (爽快接受邀请)
- 那我就不客气了。 — *Nà wǒ jiù bú kèqi le.* — "Vậy thì tôi không khách sáo nữa nhé."
- 好啊，恭敬不如从命。 — *Hǎo a, gōngjìng bùrú cóngmìng.* — "Được, cung kính không bằng tuân mệnh vậy."
- 那我就却之不恭了。 — *Nà wǒ jiù què zhī bù gōng le.* — "Vậy nếu từ chối thì thất lễ quá, tôi xin nhận."
- 谢谢，那我就叨扰了。 — *Xièxie, nà wǒ jiù tāorǎo le.* — "Cảm ơn, vậy tôi xin làm phiền nhé."

### 3. Từ chối khéo không làm mất mặt (委婉推辞)
- 谢谢你的好意，不过今天真不行。 — *Xièxie nǐ de hǎoyì, búguò jīntiān zhēn bùxíng.* — "Cảm ơn lòng tốt của bạn, nhưng hôm nay thật sự không được."
- 心领了，改天再约吧。 — *Xīnlǐng le, gǎitiān zài yuē ba.* — "Tôi xin nhận tấm lòng, hẹn dịp khác vậy."
- 下次一定，这次真的有点不方便。 — *Xiàcì yídìng, zhè cì zhēnde yǒudiǎn bù fāngbiàn.* — "Lần sau nhất định, lần này thật sự hơi bất tiện."
- 你的心意我领了，饭就不用了。 — *Nǐ de xīnyì wǒ lǐng le, fàn jiù búyòng le.* — "Tấm lòng của bạn tôi nhận rồi, còn bữa ăn thì thôi vậy."

### 4. Khi bị nài nỉ phải nhận (盛情难却)
- 你都这么说了，那我就不好意思再推辞了。 — *Nǐ dōu zhème shuō le, nà wǒ jiù bù hǎoyìsi zài tuīcí le.* — "Bạn đã nói vậy rồi, tôi ngại từ chối tiếp nữa."
- 好吧好吧，盛情难却。 — *Hǎo ba hǎo ba, shèngqíng nánquè.* — "Thôi được rồi, thịnh tình khó từ chối."
- 那真是麻烦你了。 — *Nà zhēnshi máfan nǐ le.* — "Vậy thì thật làm phiền bạn quá."
- 既然你这么说，我就不推辞了。 — *Jìrán nǐ zhème shuō, wǒ jiù bù tuīcí le.* — "Đã bạn nói vậy rồi, tôi không từ chối nữa."

### 5. Mời lại lần sau để giữ hoà khí (改天再约)
- 下次换我请你。 — *Xiàcì huàn wǒ qǐng nǐ.* — "Lần sau đổi lại tôi mời bạn."
- 那这次先这样，下次一定补上。 — *Nà zhè cì xiān zhèyàng, xiàcì yídìng bǔ shàng.* — "Vậy lần này tạm vậy, lần sau nhất định bù lại."
- 改天我再请你吃饭，好好聚一聚。 — *Gǎitiān wǒ zài qǐng nǐ chīfàn, hǎohǎo jù yi jù.* — "Hôm nào tôi mời bạn ăn cơm, tụ họp cho đàng hoàng."

### 6. Giữ thể diện cho người khác (给对方留面子)
- 这个我们私下再谈吧。 — *Zhège wǒmen sīxià zài tán ba.* — "Cái này chúng ta nói riêng sau nhé."
- 没事没事，谁都有不方便的时候。 — *Méishì méishì, shéi dōu yǒu bù fāngbiàn de shíhou.* — "Không sao không sao, ai cũng có lúc bất tiện mà."
- 我理解，你先忙你的。 — *Wǒ lǐjiě, nǐ xiān máng nǐ de.* — "Tôi hiểu mà, bạn cứ lo việc của bạn trước đi."` },
  { label: "Tặng quà & phép lịch sự liên quan", num: "11", slug: "tang-qua-phep-lich-su", body: `## Tặng quà & phép lịch sự liên quan (送礼及相关礼节 — *sònglǐ jí xiāngguān lǐjié*)

Khi tặng quà, người Trung Quốc thường nói giảm nhẹ giá trị món quà ("chút quà nhỏ", "không đáng gì") để tránh tỏ ra phô trương, trong khi người nhận theo phép lịch sự sẽ từ chối một hai lần trước khi nhận, chứ không vồ vập ngay. Phần này gồm những cụm dùng khi tặng, mời nhận, từ chối rồi nhận và cảm ơn quà theo đúng nhịp điệu xã giao đó.

### 1. Tặng quà và nói khiêm tốn về món quà (送礼时的谦辞)
- 一点小意思，不成敬意。 — *Yìdiǎn xiǎo yìsi, bù chéng jìngyì.* — "Chút quà nhỏ, không đáng là bao."
- 没什么特别的，就是个小礼物。 — *Méi shénme tèbié de, jiùshì gè xiǎo lǐwù.* — "Không có gì đặc biệt, chỉ là món quà nhỏ thôi."
- 随便带了点东西，别嫌弃。 — *Suíbiàn dàile diǎn dōngxi, bié xiánqì.* — "Tiện tay mang chút đồ, đừng chê nhé."
- 这个不值什么钱，就是个心意。 — *Zhège bù zhí shénme qián, jiùshì gè xīnyì.* — "Cái này không đáng giá bao nhiêu, chỉ là chút tấm lòng."

### 2. Mời nhận quà (请对方收下)
- 拿着吧，别跟我客气。 — *Ná zhe ba, bié gēn wǒ kèqi.* — "Cầm lấy đi, đừng khách sáo với tôi."
- 你一定要收下，不然我不高兴。 — *Nǐ yídìng yào shōuxià, bùrán wǒ bù gāoxìng.* — "Bạn nhất định phải nhận, không thì tôi không vui đâu."
- 这是我的一点心意，你收下我才安心。 — *Zhè shì wǒ de yìdiǎn xīnyì, nǐ shōuxià wǒ cái ānxīn.* — "Đây là chút tấm lòng của tôi, bạn nhận thì tôi mới yên tâm."

### 3. Từ chối rồi nhận theo phép xã giao (先推辞后收下)
- 哎呀，你太客气了，真不用这样。 — *Āiyā, nǐ tài kèqi le, zhēn búyòng zhèyàng.* — "Ôi, bạn khách sáo quá, thật không cần vậy đâu."
- 这怎么好意思呢，你破费了。 — *Zhè zěnme hǎoyìsi ne, nǐ pòfèi le.* — "Sao lại như vậy được, bạn tốn kém rồi."
- 好吧好吧，那我就不客气收下了，谢谢你。 — *Hǎo ba hǎo ba, nà wǒ jiù bú kèqi shōuxià le, xièxie nǐ.* — "Thôi được, vậy tôi xin nhận không khách sáo nữa, cảm ơn bạn."
- 下次别再这么花钱了，有心意就好。 — *Xiàcì bié zài zhème huāqián le, yǒu xīnyì jiù hǎo.* — "Lần sau đừng tốn tiền như vậy nữa, có tấm lòng là được rồi."

### 4. Cảm ơn khi nhận quà (收到礼物后道谢)
- 谢谢你，太有心了。 — *Xièxie nǐ, tài yǒuxīn le.* — "Cảm ơn bạn, chu đáo quá."
- 你还特意想着我，真是谢谢了。 — *Nǐ hái tèyì xiǎngzhe wǒ, zhēnshi xièxie le.* — "Bạn còn đặc biệt nghĩ đến tôi, thật cảm ơn nhiều."
- 我很喜欢，谢谢你的心意。 — *Wǒ hěn xǐhuan, xièxie nǐ de xīnyì.* — "Tôi rất thích, cảm ơn tấm lòng của bạn."

### 5. Tặng quà dịp lễ/thăm nhà (节日拜访送礼)
- 第一次去你家，带点水果过去。 — *Dì-yī cì qù nǐ jiā, dài diǎn shuǐguǒ guòqù.* — "Lần đầu đến nhà bạn, mang theo ít trái cây."
- 新年快乐，这是给你和家人的一点心意。 — *Xīnnián kuàilè, zhè shì gěi nǐ hé jiārén de yìdiǎn xīnyì.* — "Chúc mừng năm mới, đây là chút tấm lòng dành cho bạn và gia đình."
- 空手来不好意思，就带了点小东西。 — *Kōngshǒu lái bù hǎoyìsi, jiù dàile diǎn xiǎo dōngxi.* — "Đến tay không thì ngại quá, nên mang theo chút đồ nhỏ."

### 6. Phép tắc khi mở quà (拆礼物的礼节)
- 我可以现在打开看看吗？ — *Wǒ kěyǐ xiànzài dǎkāi kànkan ma?* — "Tôi có thể mở ra xem ngay bây giờ không?"
- 那我就不当面拆了，回头再慢慢看。 — *Nà wǒ jiù bù dāngmiàn chāi le, huítóu zài mànmàn kàn.* — "Vậy tôi không mở ngay trước mặt đâu, để lát nữa xem từ từ."
- 哇，这个正是我需要的，你太懂我了。 — *Wa, zhège zhèngshì wǒ xūyào de, nǐ tài dǒng wǒ le.* — "Ôi, cái này đúng là thứ tôi cần, bạn hiểu tôi ghê."` },
  { label: "Hỏi thăm gia đình & tán gẫu đời thường", num: "12", slug: "hoi-tham-gia-dinh-tan-gau", body: `## Hỏi thăm gia đình & tán gẫu đời thường (问候家人与日常闲聊 — *wènhòu jiārén yǔ rìcháng xiánliáo*)

Hỏi thăm gia đình, con cái, cha mẹ là cách người Trung Quốc thể hiện sự quan tâm và tạo thân thiết trong giao tiếp hàng ngày, thường mở đầu hoặc xen giữa cuộc trò chuyện. Phần này gồm các cụm hỏi thăm người thân và tán gẫu đời thường tự nhiên, không quá riêng tư.

### 1. Hỏi thăm gia đình/con cái (问候家人孩子)
- 你家孩子多大了？ — *Nǐ jiā háizi duō dà le?* — "Con của bạn năm nay bao nhiêu tuổi rồi?"
- 孩子上学了吗？ — *Háizi shàngxué le ma?* — "Con bạn đi học chưa?"
- 你爱人最近怎么样？ — *Nǐ àirén zuìjìn zěnmeyàng?* — "Vợ/chồng bạn dạo này thế nào?"
- 一家人都还好吧？ — *Yìjiā rén dōu hái hǎo ba?* — "Cả nhà vẫn khoẻ chứ?"

### 2. Hỏi thăm bố mẹ/người lớn tuổi (问候父母长辈)
- 你父母身体还好吗？ — *Nǐ fùmǔ shēntǐ hái hǎo ma?* — "Bố mẹ bạn sức khoẻ vẫn tốt chứ?"
- 老人家还硬朗吗？ — *Lǎorénjiā hái yìnglǎng ma?* — "Cụ vẫn còn khoẻ mạnh chứ?"
- 有空常回家看看父母。 — *Yǒu kòng cháng huí jiā kànkan fùmǔ.* — "Có thời gian thì thường về thăm bố mẹ nhé."
- 你爸妈退休了吗？ — *Nǐ bà mā tuìxiū le ma?* — "Bố mẹ bạn nghỉ hưu chưa?"

### 3. Tán gẫu về cuối tuần/sở thích (聊周末爱好)
- 周末有什么安排吗？ — *Zhōumò yǒu shénme ānpái ma?* — "Cuối tuần bạn có kế hoạch gì không?"
- 平时喜欢做点什么？ — *Píngshí xǐhuan zuò diǎn shénme?* — "Bình thường bạn thích làm gì?"
- 最近迷上了什么新爱好？ — *Zuìjìn míshàngle shénme xīn àihào?* — "Dạo này bạn mê sở thích mới nào vậy?"
- 我周末一般就在家追剧。 — *Wǒ zhōumò yìbān jiù zài jiā zhuī jù.* — "Cuối tuần tôi thường ở nhà xem phim bộ."

### 4. Chia sẻ chuyện đời thường (聊日常琐事)
- 最近忙什么呢？ — *Zuìjìn máng shénme ne?* — "Dạo này bạn bận gì vậy?"
- 还是老样子，没什么变化。 — *Háishi lǎo yàngzi, méi shénme biànhuà.* — "Vẫn như cũ thôi, không có gì thay đổi."
- 最近搬新家了，还在收拾呢。 — *Zuìjìn bān xīnjiā le, hái zài shōushi ne.* — "Gần đây chuyển nhà mới, vẫn đang dọn dẹp."
- 生活压力挺大的，天天加班。 — *Shēnghuó yālì tǐng dà de, tiāntiān jiābān.* — "Áp lực cuộc sống khá lớn, ngày nào cũng tăng ca."

### 5. Hỏi thăm sức khoẻ người thân (问候亲人健康)
- 听说你妈住院了，现在怎么样了？ — *Tīngshuō nǐ mā zhùyuàn le, xiànzài zěnmeyàng le?* — "Nghe nói mẹ bạn nhập viện, giờ thế nào rồi?"
- 你爸的身体好点了吗？ — *Nǐ bà de shēntǐ hǎo diǎn le ma?* — "Sức khoẻ bố bạn khá hơn chưa?"
- 记得让他们多注意身体。 — *Jìde ràng tāmen duō zhùyì shēntǐ.* — "Nhớ nhắc họ giữ gìn sức khoẻ nhiều hơn nhé."

### 6. Hỏi thăm việc học/công việc của con cái (问孩子的学习工作)
- 孩子学习怎么样？ — *Háizi xuéxí zěnmeyàng?* — "Việc học của con bạn thế nào?"
- 老大今年高考吧？ — *Lǎodà jīnnián gāokǎo ba?* — "Con lớn năm nay thi đại học đúng không?"
- 小的还在上幼儿园吧？ — *Xiǎo de hái zài shàng yòu'éryuán ba?* — "Bé nhỏ vẫn đang học mẫu giáo à?"` },
  { label: "An ủi, chia sẻ & bày tỏ đồng cảm", num: "13", slug: "an-ui-dong-cam", body: `## An ủi, chia sẻ & bày tỏ đồng cảm (安慰、分享与表达同理心 — *ānwèi, fēnxiǎng yǔ biǎodá tónglǐxīn*)

An ủi, chia sẻ và bày tỏ đồng cảm đúng lúc đúng cách giúp duy trì mối quan hệ gần gũi mà không sa vào sáo rỗng hay xâm phạm riêng tư. Phần này gồm các cụm dùng khi ai đó buồn, gặp khó khăn, có chuyện buồn hoặc chuyện vui cần chia sẻ.

### 1. An ủi khi ai đó buồn/căng thẳng (安慰情绪低落的人)
- 别难过了，一切都会好起来的。 — *Bié nánguò le, yíqiè dōu huì hǎo qǐlái de.* — "Đừng buồn nữa, mọi chuyện rồi sẽ ổn thôi."
- 想哭就哭吧，别憋着。 — *Xiǎng kū jiù kū ba, bié biēzhe.* — "Muốn khóc thì cứ khóc đi, đừng kìm nén."
- 有什么烦心事，跟我说说。 — *Yǒu shénme fánxīn shì, gēn wǒ shuōshuo.* — "Có chuyện gì phiền lòng thì kể tôi nghe."
- 别给自己太大压力。 — *Bié gěi zìjǐ tài dà yālì.* — "Đừng tạo áp lực quá lớn cho bản thân."

### 2. Động viên trước việc khó (鼓励面对困难)
- 你一定可以的，加油。 — *Nǐ yídìng kěyǐ de, jiāyóu.* — "Bạn nhất định làm được, cố lên."
- 别怕，有什么事我们一起面对。 — *Bié pà, yǒu shénme shì wǒmen yìqǐ miànduì.* — "Đừng sợ, có chuyện gì thì chúng ta cùng đối mặt."
- 慢慢来，别着急。 — *Mànmàn lái, bié zháojí.* — "Từ từ thôi, đừng vội."
- 相信自己，你比想象中厉害。 — *Xiāngxìn zìjǐ, nǐ bǐ xiǎngxiàng zhōng lìhai.* — "Hãy tin vào bản thân, bạn giỏi hơn bạn nghĩ đấy."

### 3. Chia buồn/thể hiện đồng cảm (表示慰问同情)
- 节哀顺变。 — *Jié'āi shùnbiàn.* — "Xin chia buồn, mong bạn nén đau thương."
- 听到这个消息，我很难过。 — *Tīngdào zhège xiāoxi, wǒ hěn nánguò.* — "Nghe tin này tôi rất buồn."
- 这段时间辛苦你了。 — *Zhè duàn shíjiān xīnkǔ nǐ le.* — "Thời gian này bạn vất vả rồi."
- 我能理解你的感受。 — *Wǒ néng lǐjiě nǐ de gǎnshòu.* — "Tôi hiểu được cảm giác của bạn."

### 4. Chúc mừng tin vui (祝贺好消息)
- 恭喜恭喜，太好了！ — *Gōngxǐ gōngxǐ, tài hǎo le!* — "Chúc mừng chúc mừng, tuyệt quá!"
- 真替你高兴。 — *Zhēn tì nǐ gāoxìng.* — "Thật sự mừng thay cho bạn."
- 太棒了，你付出的努力没有白费。 — *Tài bàng le, nǐ fùchū de nǔlì méiyǒu báifèi.* — "Tuyệt quá, công sức bạn bỏ ra không uổng phí."
- 这是你应得的。 — *Zhè shì nǐ yīng dé de.* — "Đây là điều bạn xứng đáng được nhận."

### 5. Khích lệ cố gắng tiếp (鼓励继续努力)
- 别灰心，下次一定更好。 — *Bié huīxīn, xiàcì yídìng gèng hǎo.* — "Đừng nản lòng, lần sau chắc chắn sẽ tốt hơn."
- 失败是成功之母嘛。 — *Shībài shì chénggōng zhī mǔ ma.* — "Thất bại là mẹ thành công mà."
- 你已经做得很不错了。 — *Nǐ yǐjīng zuò de hěn búcuò le.* — "Bạn đã làm rất tốt rồi đấy."
- 再坚持一下，就快到了。 — *Zài jiānchí yíxià, jiù kuài dào le.* — "Cố gắng thêm chút nữa, sắp đến rồi."

### 6. Phản ứng phù hợp khi nghe tin không vui (得知坏消息时的反应)
- 啊，怎么会这样。 — *À, zěnme huì zhèyàng.* — "Ôi, sao lại thế được."
- 真的假的，这也太突然了。 — *Zhēn de jiǎ de, zhè yě tài tūrán le.* — "Thật hay giả vậy, chuyện này đột ngột quá."
- 需要帮忙的话随时找我。 — *Xūyào bāngmáng dehuà suíshí zhǎo wǒ.* — "Nếu cần giúp gì thì cứ tìm tôi bất cứ lúc nào."` },
  { label: "Mua sắm & trả giá", num: "14", slug: "mua-sam-tra-gia", body: `## Mua sắm & trả giá (购物砍价 — *gòuwù kǎnjià*)

Nhóm cụm dùng khi mua sắm và trả giá — từ hỏi giá, thử đồ, đến mặc cả và thanh toán. Lưu ý: mặc cả (讨价还价) chỉ hợp ở chợ, cửa hàng nhỏ hay quầy vỉa hè; ở siêu thị, trung tâm thương mại hay cửa hàng thương hiệu (giá niêm yết cố định) thì không mặc cả.

### 1. Hỏi giá (问价钱)
- 这个多少钱？ — *Zhège duōshao qián?* — "Cái này bao nhiêu tiền?"
- 这件衣服怎么卖？ — *Zhè jiàn yīfu zěnme mài?* — "Áo này bán thế nào?"
- 一共多少钱？ — *Yígòng duōshao qián?* — "Tổng cộng bao nhiêu tiền?"
- 这个是原价还是打折价？ — *Zhège shì yuánjià háishi dǎzhé jià?* — "Cái này giá gốc hay giá đã giảm?"

### 2. Hỏi thử / xem hàng (问试穿看货)
- 可以试穿一下吗？ — *Kěyǐ shìchuān yíxià ma?* — "Tôi thử được không?"
- 我可以看一下这个吗？ — *Wǒ kěyǐ kàn yíxià zhège ma?* — "Tôi xem cái này được không?"
- 有没有大一点的号？ — *Yǒu méiyǒu dà yìdiǎn de hào?* — "Có size lớn hơn không?"
- 试衣间在哪儿？ — *Shìyījiān zài nǎr?* — "Phòng thử đồ ở đâu?"
- 有别的颜色吗？ — *Yǒu bié de yánsè ma?* — "Có màu khác không?"

### 3. Trả giá / mặc cả (讨价还价)
- 能便宜点吗？ — *Néng piányi diǎn ma?* — "Bớt chút được không?"
- 太贵了，便宜点吧。 — *Tài guì le, piányi diǎn ba.* — "Đắt quá, bớt chút đi."
- 这个价格我接受不了。 — *Zhège jiàgé wǒ jiēshòu bùliǎo.* — "Giá này tôi chịu không nổi."
- 能不能再便宜一点？ — *Néng bu néng zài piányi yìdiǎn?* — "Có thể bớt thêm chút nữa không?"
- 别的地方卖得更便宜。 — *Bié de dìfang mài de gèng piányi.* — "Chỗ khác bán rẻ hơn."

### 4. Xin giảm giá (要求打折优惠)
- 可以打折吗？ — *Kěyǐ dǎzhé ma?* — "Có giảm giá không?"
- 买两件有没有优惠？ — *Mǎi liǎng jiàn yǒu méiyǒu yōuhuì?* — "Mua hai cái có ưu đãi không?"
- 能不能给我抹个零头？ — *Néng bu néng gěi wǒ mǒ ge língtóu?* — "Có thể bớt số lẻ cho tôi không?"
- 老顾客有没有折扣？ — *Lǎo gùkè yǒu méiyǒu zhékòu?* — "Khách quen có giảm giá không?"

### 5. Quyết định mua hay không (决定买不买)
- 我再考虑一下。 — *Wǒ zài kǎolǜ yíxià.* — "Để tôi suy nghĩ thêm."
- 我先看看别的。 — *Wǒ xiān kànkan biéde.* — "Để tôi xem chỗ khác trước đã."
- 就这个吧，我要了。 — *Jiù zhège ba, wǒ yào le.* — "Cái này đi, tôi lấy."
- 那我不要了，谢谢。 — *Nà wǒ bú yào le, xièxie.* — "Vậy thôi tôi không mua nữa, cảm ơn."

### 6. Thanh toán (付款)
- 可以刷卡吗？ — *Kěyǐ shuākǎ ma?* — "Có quẹt thẻ được không?"
- 可以用微信支付吗？ — *Kěyǐ yòng Wēixìn zhīfù ma?* — "Trả bằng WeChat được không?"
- 我要现金付。 — *Wǒ yào xiànjīn fù.* — "Tôi trả tiền mặt."
- 可以开发票吗？ — *Kěyǐ kāi fāpiào ma?* — "Xuất hóa đơn được không?"
- 找您钱。 — *Zhǎo nín qián.* — "Trả lại tiền thừa cho anh/chị." (câu người bán nói khi thối tiền)` },
  { label: "Đi lại, hỏi đường & đặt xe", num: "15", slug: "di-lai-hoi-duong", body: `## Đi lại, hỏi đường & đặt xe (问路打车 — *wènlù dǎchē*)

Nhóm cụm dùng khi hỏi đường, nghe chỉ dẫn, gọi xe công nghệ/taxi và di chuyển bằng phương tiện công cộng — những tình huống thường gặp nhất khi tự đi lại ở Trung Quốc.

### 1. Hỏi đường (问路)
- 请问，去火车站怎么走？ — *Qǐngwèn, qù huǒchēzhàn zěnme zǒu?* — "Xin hỏi, đến ga tàu đi thế nào?"
- 这附近有地铁站吗？ — *Zhè fùjìn yǒu dìtiězhàn ma?* — "Gần đây có ga tàu điện ngầm không?"
- 请问洗手间在哪儿？ — *Qǐngwèn xǐshǒujiān zài nǎr?* — "Xin hỏi nhà vệ sinh ở đâu?"
- 离这儿远不远？ — *Lí zhèr yuǎn bu yuǎn?* — "Từ đây có xa không?"
- 打扰一下，我迷路了。 — *Dǎrǎo yíxià, wǒ mílù le.* — "Làm phiền, tôi bị lạc đường."

### 2. Nghe hiểu chỉ dẫn (听懂指路)
- 一直往前走就到了。 — *Yìzhí wǎng qián zǒu jiù dào le.* — "Cứ đi thẳng là tới."
- 到路口往左拐。 — *Dào lùkǒu wǎng zuǒ guǎi.* — "Đến ngã tư rẽ trái."
- 在第二个红绿灯右转。 — *Zài dì-èr gè hónglǜdēng yòu zhuǎn.* — "Rẽ phải ở đèn giao thông thứ hai."
- 过了那座桥就是了。 — *Guòle nà zuò qiáo jiù shì le.* — "Qua cây cầu đó là tới."
- 就在马路对面。 — *Jiù zài mǎlù duìmiàn.* — "Ngay bên kia đường thôi."

### 3. Gọi taxi / đặt xe công nghệ (打车叫车)
- 帮我叫一辆出租车。 — *Bāng wǒ jiào yí liàng chūzūchē.* — "Gọi giúp tôi một chiếc taxi."
- 我用滴滴打车。 — *Wǒ yòng Dīdī dǎchē.* — "Tôi đặt xe bằng Didi."
- 师傅，这儿能打车吗？ — *Shīfu, zhèr néng dǎchē ma?* — "Bác tài ơi, ở đây bắt xe được không?"
- 您是来接我的吗？ — *Nín shì lái jiē wǒ de ma?* — "Anh là người đến đón tôi phải không?"
- 车已经到了。 — *Chē yǐjīng dào le.* — "Xe đã đến rồi."

### 4. Nói địa điểm cho tài xế (跟司机说地点)
- 师傅，去这个地址。 — *Shīfu, qù zhège dìzhǐ.* — "Bác tài, đến địa chỉ này."
- 麻烦到机场，谢谢。 — *Máfan dào jīchǎng, xièxie.* — "Làm ơn cho tôi ra sân bay, cảm ơn."
- 就在前面停一下就行。 — *Jiù zài qiánmiàn tíng yíxià jiù xíng.* — "Dừng ở phía trước là được."
- 麻烦开慢一点。 — *Máfan kāi màn yìdiǎn.* — "Làm ơn lái chậm một chút."
- 到了，谢谢师傅。 — *Dào le, xièxie shīfu.* — "Tới rồi, cảm ơn bác tài."

### 5. Hỏi thời gian / quãng đường (问时间路程)
- 到那儿大概要多长时间？ — *Dào nàr dàgài yào duō cháng shíjiān?* — "Đến đó khoảng bao lâu?"
- 大概多远？ — *Dàgài duō yuǎn?* — "Khoảng bao xa?"
- 堵车吗？ — *Dǔchē ma?* — "Có tắc đường không?"
- 大概多少钱？ — *Dàgài duōshao qián?* — "Khoảng bao nhiêu tiền?"

### 6. Đi tàu điện ngầm / xe buýt (坐地铁公交)
- 这趟车到不到市中心？ — *Zhè tàng chē dào bu dào shìzhōngxīn?* — "Chuyến xe này có đến trung tâm thành phố không?"
- 我要在哪一站下车？ — *Wǒ yào zài nǎ yí zhàn xiàchē?* — "Tôi phải xuống ở trạm nào?"
- 需要换乘吗？ — *Xūyào huànchéng ma?* — "Có cần chuyển tuyến không?"
- 地铁卡在哪儿充值？ — *Dìtiěkǎ zài nǎr chōngzhí?* — "Nạp tiền thẻ tàu điện ngầm ở đâu?"
- 末班车是几点？ — *Mòbānchē shì jǐ diǎn?* — "Chuyến cuối là mấy giờ?"` },
  { label: "Gọi món & ăn uống ở quán xá", num: "16", slug: "goi-mon-an-uong", body: `## Gọi món & ăn uống ở quán xá (点菜吃饭 — *diǎncài chīfàn*)

Nhóm cụm dùng khi gọi món và ăn uống ở quán ăn, quán cà phê, hàng ăn vỉa hè đời thường — không phải văn phong bàn tiệc trang trọng (phần đó có chủ đề riêng).

### 1. Gọi món (点菜)
- 服务员，点菜！ — *Fúwùyuán, diǎncài!* — "Phục vụ ơi, gọi món!"
- 我要一份炒饭。 — *Wǒ yào yí fèn chǎofàn.* — "Cho tôi một suất cơm rang."
- 来一杯拿铁，谢谢。 — *Lái yì bēi nátiě, xièxie.* — "Cho một ly latte, cảm ơn."
- 我们要两碗面。 — *Wǒmen yào liǎng wǎn miàn.* — "Chúng tôi lấy hai bát mì."
- 先给我们上一壶茶。 — *Xiān gěi wǒmen shàng yì hú chá.* — "Cho chúng tôi một ấm trà trước đã."

### 2. Hỏi về món ăn / nguyên liệu (问菜品食材)
- 这道菜辣不辣？ — *Zhè dào cài là bu là?* — "Món này có cay không?"
- 这个是什么做的？ — *Zhège shì shénme zuò de?* — "Cái này làm từ gì?"
- 有什么招牌菜吗？ — *Yǒu shénme zhāopái cài ma?* — "Có món gì đặc biệt/tủ không?"
- 这个量大不大？ — *Zhège liàng dà bu dà?* — "Suất này nhiều hay ít?"
- 里面放香菜了吗？ — *Lǐmiàn fàng xiāngcài le ma?* — "Trong đó có cho ngò không?"

### 3. Yêu cầu đặc biệt (特殊要求)
- 不要辣，谢谢。 — *Bú yào là, xièxie.* — "Không cay nhé, cảm ơn."
- 少放点糖。 — *Shǎo fàng diǎn táng.* — "Cho ít đường thôi."
- 我对花生过敏。 — *Wǒ duì huāshēng guòmǐn.* — "Tôi bị dị ứng đậu phộng."
- 可以不要香菜吗？ — *Kěyǐ bú yào xiāngcài ma?* — "Không cho ngò được không?"
- 我吃素。 — *Wǒ chī sù.* — "Tôi ăn chay."

### 4. Gọi thêm / đổi món (加菜换菜)
- 再加一份米饭。 — *Zài jiā yí fèn mǐfàn.* — "Thêm một suất cơm nữa."
- 能不能换一下这个菜？ — *Néng bu néng huàn yíxià zhège cài?* — "Đổi món này được không?"
- 这个还没上，可以催一下吗？ — *Zhège hái méi shàng, kěyǐ cuī yíxià ma?* — "Món này chưa lên, giục giúp được không?"
- 我们再加一瓶水。 — *Wǒmen zài jiā yì píng shuǐ.* — "Chúng tôi lấy thêm một chai nước."

### 5. Xin thanh toán (买单)
- 服务员，买单。 — *Fúwùyuán, mǎidān.* — "Phục vụ ơi, tính tiền."
- 一共多少钱？ — *Yígòng duōshao qián?* — "Tổng cộng bao nhiêu tiền?"
- 可以分开付吗？ — *Kěyǐ fēnkāi fù ma?* — "Chia tiền riêng được không?"
- 这顿我请客。 — *Zhè dùn wǒ qǐngkè.* — "Bữa này tôi mời."
- 扫这个码付款。 — *Sǎo zhège mǎ fùkuǎn.* — "Quét mã này để thanh toán."

### 6. Gọi mang đi (打包外带)
- 我要打包带走。 — *Wǒ yào dǎbāo dàizǒu.* — "Tôi muốn gói mang đi."
- 剩下的可以打包吗？ — *Shèngxià de kěyǐ dǎbāo ma?* — "Chỗ còn thừa gói được không?"
- 麻烦多给我一个袋子。 — *Máfan duō gěi wǒ yí ge dàizi.* — "Làm ơn cho tôi thêm một cái túi."
- 我在网上点了外卖。 — *Wǒ zài wǎngshàng diǎnle wàimài.* — "Tôi đặt đồ ăn mang đi trên mạng rồi."` },
  { label: "Kết bạn, hẹn gặp & rủ đi chơi", num: "17", slug: "ket-ban-hen-gap", body: `## Kết bạn, hẹn gặp & rủ đi chơi (交朋友约见面 — *jiāo péngyou yuē jiànmiàn*)

Nhóm cụm dùng khi rủ bạn mới quen đi chơi, hẹn giờ giấc địa điểm, trao đổi WeChat, và xác nhận/đổi lịch hẹn — những câu thường dùng để giữ liên lạc và duy trì mối quan hệ bạn bè mới.

### 1. Rủ đi chơi / làm gì đó (约人出去玩)
- 你周末有空吗？ — *Nǐ zhōumò yǒu kòng ma?* — "Cuối tuần bạn rảnh không?"
- 一起去吃饭怎么样？ — *Yìqǐ qù chīfàn zěnmeyàng?* — "Cùng đi ăn thế nào?"
- 要不要一起去看电影？ — *Yào bu yào yìqǐ qù kàn diànyǐng?* — "Có muốn cùng đi xem phim không?"
- 有空的话一起出来喝一杯。 — *Yǒu kòng dehuà yìqǐ chūlái hē yì bēi.* — "Nếu rảnh thì ra ngoài làm một ly cùng nhau."
- 找个时间聚一下吧。 — *Zhǎo ge shíjiān jù yíxià ba.* — "Tìm lúc nào đó tụ tập đi."

### 2. Đề xuất thời gian địa điểm (提议时间地点)
- 那我们约几点？ — *Nà wǒmen yuē jǐ diǎn?* — "Vậy chúng ta hẹn mấy giờ?"
- 在哪儿见面比较方便？ — *Zài nǎr jiànmiàn bǐjiào fāngbiàn?* — "Gặp ở đâu tiện hơn?"
- 就约在地铁站门口吧。 — *Jiù yuē zài dìtiězhàn ménkǒu ba.* — "Hẹn ngay trước cửa ga tàu điện ngầm đi."
- 下午三点怎么样？ — *Xiàwǔ sān diǎn zěnmeyàng?* — "3 giờ chiều được không?"
- 你定地方吧，我都可以。 — *Nǐ dìng dìfang ba, wǒ dōu kěyǐ.* — "Bạn chọn chỗ đi, tôi sao cũng được."

### 3. Xin / cho thông tin liên lạc (要给联系方式)
- 加个微信吧。 — *Jiā ge Wēixìn ba.* — "Kết bạn WeChat đi."
- 可以扫一下你的微信吗？ — *Kěyǐ sǎo yíxià nǐ de Wēixìn ma?* — "Quét WeChat của bạn được không?"
- 我的微信号是… — *Wǒ de Wēixìnhào shì…* — "Số WeChat của tôi là…"
- 有事微信联系我。 — *Yǒu shì Wēixìn liánxì wǒ.* — "Có việc gì thì nhắn WeChat cho tôi."
- 到时候我加你。 — *Dào shíhou wǒ jiā nǐ.* — "Lúc đó tôi kết bạn với bạn."

### 4. Xác nhận lịch hẹn (确认约会)
- 那就这么说定了。 — *Nà jiù zhème shuōdìng le.* — "Vậy là chốt vậy nhé."
- 到时候别忘了。 — *Dào shíhou bié wàng le.* — "Đến lúc đó đừng quên nhé."
- 我到了给你发消息。 — *Wǒ dàole gěi nǐ fā xiāoxi.* — "Tôi tới nơi sẽ nhắn tin cho bạn."
- 明天见，不见不散。 — *Míngtiān jiàn, bú jiàn bú sàn.* — "Mai gặp nhé, không gặp không về."

### 5. Đổi lịch hẹn (改约)
- 不好意思，我可能要改一下时间。 — *Bù hǎoyìsi, wǒ kěnéng yào gǎi yíxià shíjiān.* — "Xin lỗi, có lẽ tôi phải đổi giờ hẹn."
- 我们能不能改到明天？ — *Wǒmen néng bu néng gǎi dào míngtiān?* — "Chúng ta đổi sang mai được không?"
- 临时有点事，得推迟一下。 — *Línshí yǒudiǎn shì, děi tuīchí yíxià.* — "Đột xuất có việc, phải hoãn lại một chút."
- 那我们改天吧。 — *Nà wǒmen gǎitiān ba.* — "Vậy để hôm khác đi."

### 6. Kết thúc buổi gặp và hẹn lần sau (结束见面约下次)
- 今天玩得很开心。 — *Jīntiān wánr de hěn kāixīn.* — "Hôm nay chơi rất vui."
- 下次再约。 — *Xiàcì zài yuē.* — "Lần sau hẹn tiếp."
- 我们保持联系。 — *Wǒmen bǎochí liánxì.* — "Chúng ta giữ liên lạc nhé."
- 那我先走了，回头聊。 — *Nà wǒ xiān zǒu le, huítóu liáo.* — "Vậy tôi đi trước đây, nói chuyện sau."
- 路上小心，到家发个消息。 — *Lùshang xiǎoxīn, dào jiā fā ge xiāoxi.* — "Đi đường cẩn thận, về đến nhà nhắn tin nhé."` },
  { label: "Câu giờ suy nghĩ khi chưa biết trả lời", num: "18", slug: "cau-gio-suy-nghi", body: `## Câu giờ suy nghĩ khi chưa biết trả lời (争取思考时间 — *zhēngqǔ sīkǎo shíjiān*)

Nhóm cụm dùng để câu giờ, tranh thủ vài giây suy nghĩ trước khi trả lời — từ phản xạ ngắn gọn đến xin hẹn trả lời sau, giúp bạn không bị á khẩu khi bị hỏi bất ngờ giữa cuộc trò chuyện.

### 1. Câu giờ ngắn, phản xạ tức thời (随口拖延)
- 让我想想。 — *Ràng wǒ xiǎngxiǎng.* — "Để tôi nghĩ xem."
- 我想一下。 — *Wǒ xiǎng yíxià.* — "Để tôi nghĩ chút."
- 等一下，我想想。 — *Děng yíxià, wǒ xiǎngxiǎng.* — "Đợi chút, để tôi nghĩ."
- 让我想想看。 — *Ràng wǒ xiǎngxiǎng kàn.* — "Để tôi nghĩ xem sao."

### 2. Xin thêm thời gian suy nghĩ kỹ hơn (需要更多时间)
- 这个问题有点复杂，我需要想一下。 — *Zhège wèntí yǒudiǎn fùzá, wǒ xūyào xiǎng yíxià.* — "Vấn đề này hơi phức tạp, tôi cần suy nghĩ một chút."
- 能不能给我一点时间想一想？ — *Néng bu néng gěi wǒ yìdiǎn shíjiān xiǎng yi xiǎng?* — "Cho tôi chút thời gian suy nghĩ được không?"
- 我需要再考虑一下，晚点回复你。 — *Wǒ xūyào zài kǎolǜ yíxià, wǎndiǎn huífù nǐ.* — "Tôi cần suy nghĩ thêm, lát nữa trả lời bạn."
- 这个我得好好想想再说。 — *Zhège wǒ děi hǎohǎo xiǎngxiǎng zài shuō.* — "Cái này tôi phải suy nghĩ kỹ rồi mới nói được."

### 3. Lấp khoảng lặng bằng từ đệm (填补停顿的口头禅)
- 那个……怎么说呢。 — *Nàge... zěnme shuō ne.* — "Cái đó... nói sao nhỉ."
- 这个嘛…… — *Zhège ma...* — "Cái này thì..."
- 呃，我想想怎么表达。 — *È, wǒ xiǎngxiǎng zěnme biǎodá.* — "Ừm, để tôi nghĩ cách diễn đạt."
- 就是说……那个…… — *Jiùshì shuō... nàge...* — "Tức là... cái đó..."

### 4. Hỏi lại để kéo dài thời gian (反问争取时间)
- 你是说……？ — *Nǐ shì shuō...?* — "Ý bạn là...?"
- 你的意思是……对吗？ — *Nǐ de yìsi shì... duì ma?* — "Ý bạn là... đúng không?"
- 你能再说一下你的问题吗？ — *Nǐ néng zài shuō yíxià nǐ de wèntí ma?* — "Bạn nói lại câu hỏi được không?"
- 你问的是哪方面？ — *Nǐ wèn de shì nǎ fāngmiàn?* — "Bạn hỏi về mặt nào vậy?"

### 5. Thừa nhận cần suy nghĩ thêm, hẹn trả lời sau (容后再答复)
- 这个我现在不太确定，容我想想再答复你。 — *Zhège wǒ xiànzài bú tài quèdìng, róng wǒ xiǎngxiǎng zài dáfù nǐ.* — "Cái này giờ tôi chưa chắc lắm, để tôi nghĩ rồi trả lời bạn sau."
- 我先记下来，想清楚了再跟你说。 — *Wǒ xiān jìxiàlái, xiǎng qīngchu le zài gēn nǐ shuō.* — "Tôi ghi lại trước, nghĩ kỹ rồi nói với bạn sau."
- 这个问题我回去想想，明天答复你。 — *Zhège wèntí wǒ huíqù xiǎngxiǎng, míngtiān dáfù nǐ.* — "Vấn đề này tôi về suy nghĩ, mai trả lời bạn."

### 6. Trì hoãn lịch sự khi bị hỏi bất ngờ (礼貌拖延)
- 这个问题问得好，让我想想怎么回答。 — *Zhège wèntí wèn de hǎo, ràng wǒ xiǎngxiǎng zěnme huídá.* — "Câu hỏi này hay đấy, để tôi nghĩ xem trả lời thế nào."
- 一下子还真不知道怎么说。 — *Yíxiàzi hái zhēn bù zhīdào zěnme shuō.* — "Nhất thời thật sự chưa biết nói sao."
- 你先说别的，这个我再想想。 — *Nǐ xiān shuō biéde, zhège wǒ zài xiǎngxiǎng.* — "Bạn nói cái khác trước đi, cái này để tôi nghĩ thêm."

### 7. Xin phép trả lời sau vì chưa chuẩn bị kỹ (还没想清楚，容后再说)
- 这个我还没想清楚，能不能先跳过？ — *Zhège wǒ hái méi xiǎng qīngchu, néng bu néng xiān tiàoguò?* — "Cái này tôi chưa nghĩ kỹ, có thể bỏ qua trước được không?"
- 这个话题我不太熟，让我先查一下资料。 — *Zhège huàtí wǒ bú tài shú, ràng wǒ xiān chá yíxià zīliào.* — "Chủ đề này tôi không rành lắm, để tôi tra tài liệu đã."
- 我脑子里有点乱，给我几秒钟整理一下思路。 — *Wǒ nǎozi lǐ yǒudiǎn luàn, gěi wǒ jǐ miǎozhōng zhěnglǐ yíxià sīlù.* — "Đầu óc tôi hơi rối, cho tôi vài giây sắp xếp lại suy nghĩ."` },
  { label: "Diễn đạt lại khi bí từ / không nhớ từ chính xác", num: "19", slug: "dien-dat-lai-bi-tu", body: `## Diễn đạt lại khi bí từ (词穷时换个说法 — *cíqióng shí huàn gè shuōfǎ*)

Kỹ năng sống còn khi học ngoại ngữ: khi không nhớ hoặc không biết từ chính xác, vẫn có thể tiếp tục nói trôi chảy bằng cách mô tả, dùng từ chung chung, hoặc nhờ người nghe giúp cung cấp từ.

### 1. Mô tả vòng quanh khi không nhớ từ (绕着说/描述代替)
- 就是那个……用来切菜的东西。 — *Jiùshì nàge... yòng lái qiē cài de dōngxi.* — "Là cái đó... dùng để thái rau ấy."
- 那个东西是圆形的，可以装水。 — *Nàge dōngxi shì yuánxíng de, kěyǐ zhuāng shuǐ.* — "Cái đó hình tròn, có thể đựng nước."
- 就是一种可以让人放松的地方。 — *Jiùshì yì zhǒng kěyǐ ràng rén fàngsōng de dìfang.* — "Là một loại chỗ có thể khiến người ta thư giãn."
- 那个词我忘了，反正就是很快、很急的意思。 — *Nàge cí wǒ wàng le, fǎnzhèng jiùshì hěn kuài, hěn jí de yìsi.* — "Từ đó tôi quên rồi, đại khái nghĩa là rất nhanh, rất gấp."

### 2. Hỏi người nghe từ đó tiếng Trung nói thế nào (请对方帮忙提供词语)
- 这个用中文怎么说？ — *Zhège yòng Zhōngwén zěnme shuō?* — "Cái này tiếng Trung nói thế nào?"
- 那个词我一下想不起来了，你知道吗？ — *Nàge cí wǒ yíxià xiǎng bu qǐlái le, nǐ zhīdào ma?* — "Từ đó tôi nhất thời không nhớ ra, bạn biết không?"
- 帮我想一下这个词怎么说。 — *Bāng wǒ xiǎng yíxià zhège cí zěnme shuō.* — "Giúp tôi nghĩ xem từ này nói thế nào."
- 那个词到嘴边了，就是想不起来。 — *Nàge cí dào zuǐbiān le, jiùshì xiǎng bu qǐlái.* — "Từ đó đã đến đầu lưỡi rồi, mà nghĩ mãi không ra."

### 3. Dùng từ chung chung thay thế (用笼统的词代替)
- 就是那种……东西啦。 — *Jiùshì nà zhǒng... dōngxi la.* — "Là loại... cái đó ấy."
- 反正是差不多的意思。 — *Fǎnzhèng shì chàbuduō de yìsi.* — "Dù sao cũng gần nghĩa như vậy."
- 大概就是这个意思，具体的词我说不上来。 — *Dàgài jiùshì zhège yìsi, jùtǐ de cí wǒ shuō bu shànglái.* — "Đại khái là nghĩa này, từ cụ thể thì tôi không nói ra được."
- 类似……那样的东西。 — *Lèisì... nàyàng de dōngxi.* — "Kiểu như... cái đó."

### 4. Diễn đạt lại câu vừa nói theo cách khác (换一种方式再说一遍)
- 换句话说…… — *Huàn jù huà shuō...* — "Nói cách khác..."
- 我换个方式说吧。 — *Wǒ huàn ge fāngshì shuō ba.* — "Để tôi nói theo cách khác."
- 也就是说…… — *Yě jiùshì shuō...* — "Tức là..."
- 简单来说，就是…… — *Jiǎndān lái shuō, jiùshì...* — "Nói đơn giản thì là..."

### 5. Thừa nhận không biết từ chính xác nhưng vẫn tiếp tục nói (不知道确切的词但继续说)
- 我不知道中文怎么说，但意思大概是这样。 — *Wǒ bù zhīdào Zhōngwén zěnme shuō, dàn yìsi dàgài shì zhèyàng.* — "Tôi không biết tiếng Trung nói thế nào, nhưng ý là đại khái thế này."
- 这个词我不太会说，你懂我意思就行。 — *Zhège cí wǒ bú tài huì shuō, nǐ dǒng wǒ yìsi jiù xíng.* — "Từ này tôi không biết nói lắm, bạn hiểu ý tôi là được."
- 具体的词我说不出来，先这样理解吧。 — *Jùtǐ de cí wǒ shuō bu chūlái, xiān zhèyàng lǐjiě ba.* — "Từ cụ thể tôi không nói ra được, cứ hiểu tạm như vậy đã."

### 6. Dùng ví dụ hoặc so sánh thay cho từ (用例子或比较代替词语)
- 就像……那样的东西。 — *Jiù xiàng... nàyàng de dōngxi.* — "Giống như... cái đó vậy."
- 有点像苹果，但不是苹果。 — *Yǒudiǎn xiàng píngguǒ, dàn bú shì píngguǒ.* — "Hơi giống táo nhưng không phải táo."
- 跟……差不多，但是更小一点。 — *Gēn... chàbuduō, dànshì gèng xiǎo yìdiǎn.* — "Giống... nhưng nhỏ hơn một chút."

### 7. Dùng mô tả kèm cử chỉ (用手势加描述)
- 大概这么大，我不知道叫什么。 — *Dàgài zhème dà, wǒ bù zhīdào jiào shénme.* — "Khoảng chừng này, tôi không biết gọi là gì."
- 长得像这样，你明白吗？ — *Zhǎng de xiàng zhèyàng, nǐ míngbai ma?* — "Trông giống thế này, bạn hiểu không?"
- 就是这种感觉，你懂吗？ — *Jiùshì zhè zhǒng gǎnjué, nǐ dǒng ma?* — "Là cảm giác kiểu này đó, bạn hiểu không?"` },
  { label: "Xin nhắc lại, nói chậm & làm rõ khi không hiểu", num: "20", slug: "xin-nhac-lai-noi-cham", body: `## Xin nhắc lại, nói chậm & làm rõ khi không hiểu (请对方重复、说慢一点、澄清 — *qǐng duìfāng chóngfù, shuō màn yìdiǎn, chéngqīng*)

Nhóm cụm dùng khi nghe không kịp, không rõ hoặc không hiểu — từ xin nhắc lại, xin nói chậm, đến xác nhận lại những gì vừa nghe được, ở cả văn phong thân mật lẫn lịch sự.

### 1. Xin nhắc lại — thân mật (随意请对方重复)
- 啊？你说什么？ — *À? Nǐ shuō shénme?* — "Hả? Bạn nói gì cơ?"
- 再说一遍？ — *Zài shuō yí biàn?* — "Nói lại lần nữa được không?"
- 你刚才说什么？我没听清。 — *Nǐ gāngcái shuō shénme? Wǒ méi tīng qīng.* — "Vừa nãy bạn nói gì? Tôi nghe không rõ."
- 啥？再说一次。 — *Shá? Zài shuō yí cì.* — "Gì cơ? Nói lại lần nữa đi."

### 2. Xin nhắc lại — lịch sự/trang trọng (礼貌请求重复)
- 不好意思，您能再说一遍吗？ — *Bù hǎoyìsi, nín néng zài shuō yí biàn ma?* — "Xin lỗi, anh/chị nói lại lần nữa được không ạ?"
- 抱歉，我没听清楚，麻烦您再讲一次。 — *Bàoqiàn, wǒ méi tīng qīngchu, máfan nín zài jiǎng yí cì.* — "Xin lỗi, tôi nghe chưa rõ, phiền anh/chị nói lại lần nữa."
- 可以麻烦您重复一下吗？ — *Kěyǐ máfan nín chóngfù yíxià ma?* — "Phiền anh/chị nhắc lại được không ạ?"
- 不好意思，您刚才说的是……？ — *Bù hǎoyìsi, nín gāngcái shuō de shì...?* — "Xin lỗi, vừa nãy anh/chị nói là...?"

### 3. Xin nói chậm hơn (请说慢一点)
- 你能说慢一点吗？ — *Nǐ néng shuō màn yìdiǎn ma?* — "Bạn nói chậm hơn một chút được không?"
- 麻烦说慢一点，我听力不太好。 — *Máfan shuō màn yìdiǎn, wǒ tīnglì bú tài hǎo.* — "Phiền nói chậm hơn chút, khả năng nghe của tôi không tốt lắm."
- 可以再慢一点吗？我在学中文。 — *Kěyǐ zài màn yìdiǎn ma? Wǒ zài xué Zhōngwén.* — "Có thể chậm hơn chút nữa không? Tôi đang học tiếng Trung."
- 请您说得慢一些，谢谢。 — *Qǐng nín shuō de màn yìxiē, xièxie.* — "Xin anh/chị nói chậm hơn một chút, cảm ơn."

### 4. Xin viết ra / đánh vần / dùng pinyin (请写下来或拼出来)
- 可以帮我写下来吗？ — *Kěyǐ bāng wǒ xiěxiàlái ma?* — "Có thể giúp tôi viết ra được không?"
- 能不能打字给我看？ — *Néng bu néng dǎzì gěi wǒ kàn?* — "Có thể gõ chữ cho tôi xem được không?"
- 这个字怎么写？可以写给我看看吗？ — *Zhège zì zěnme xiě? Kěyǐ xiě gěi wǒ kànkan ma?* — "Chữ này viết thế nào? Có thể viết ra cho tôi xem không?"
- 能告诉我拼音吗？ — *Néng gàosu wǒ pīnyīn ma?* — "Có thể cho tôi biết pinyin được không?"

### 5. Xác nhận lại điều vừa nghe (确认听到的内容)
- 你的意思是……，对吗？ — *Nǐ de yìsi shì..., duì ma?* — "Ý bạn là..., đúng không?"
- 我理解得对不对，你是说……？ — *Wǒ lǐjiě de duì bu duì, nǐ shì shuō...?* — "Tôi hiểu vậy có đúng không, ý bạn là...?"
- 所以你的意思是……，是这样吗？ — *Suǒyǐ nǐ de yìsi shì..., shì zhèyàng ma?* — "Vậy nghĩa là..., có phải vậy không?"
- 我确认一下，你刚才说的是……？ — *Wǒ quèrèn yíxià, nǐ gāngcái shuō de shì...?* — "Tôi xác nhận lại, vừa nãy bạn nói là...?"

### 6. Thừa nhận chưa nghe rõ / chưa hiểu (承认没听懂)
- 不好意思，我没听懂。 — *Bù hǎoyìsi, wǒ méi tīngdǒng.* — "Xin lỗi, tôi chưa hiểu."
- 这句话我没听明白。 — *Zhè jù huà wǒ méi tīng míngbai.* — "Câu này tôi nghe chưa hiểu."
- 我中文不太好，没完全听懂。 — *Wǒ Zhōngwén bú tài hǎo, méi wánquán tīngdǒng.* — "Tiếng Trung tôi không tốt lắm, chưa hiểu hết."
- 你说得有点快，我跟不上。 — *Nǐ shuō de yǒudiǎn kuài, wǒ gēn bu shàng.* — "Bạn nói hơi nhanh, tôi theo không kịp."

### 7. Xin giải thích bằng cách khác (请换一种方式解释)
- 能不能换一种说法解释一下？ — *Néng bu néng huàn yì zhǒng shuōfǎ jiěshì yíxià?* — "Có thể giải thích theo cách khác được không?"
- 用简单一点的词跟我说可以吗？ — *Yòng jiǎndān yìdiǎn de cí gēn wǒ shuō kěyǐ ma?* — "Dùng từ đơn giản hơn nói với tôi được không?"
- 能举个例子吗？ — *Néng jǔ ge lìzi ma?* — "Có thể cho một ví dụ được không?"
- 可以用英文再解释一遍吗？ — *Kěyǐ yòng Yīngwén zài jiěshì yí biàn ma?* — "Có thể giải thích lại bằng tiếng Anh được không?"` },
];

/* ---------------------------------------------------------------
   MARKDOWN-LITE PARSER — chỉ hỗ trợ đúng tập cú pháp dùng trong tài liệu:
   #/##/### heading, ---, bảng |...|, danh sách -, danh sách 1., **đậm**, *nghiêng*
--------------------------------------------------------------- */
function parseBlocks(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  const isTableRow = (l) => /^\s*\|.*\|\s*$/.test(l);
  const isSeparatorRow = (l) => /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?\s*$/.test(l);
  const isHr = (l) => /^-{3,}$/.test(l.trim());
  const isBullet = (l) => /^-\s+/.test(l);
  const isOrdered = (l) => /^\d+\.\s+/.test(l);
  const isHeading = (l) => /^#{1,4}\s+/.test(l);

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") { i++; continue; }

    if (isHr(line)) { blocks.push({ type: "hr" }); i++; continue; }

    if (isHeading(line)) {
      const m = line.match(/^(#{1,4})\s+(.*)$/);
      blocks.push({ type: "h" + m[1].length, text: m[2] });
      i++; continue;
    }

    if (isTableRow(line)) {
      const rawRows = [];
      while (i < lines.length && isTableRow(lines[i])) {
        if (!isSeparatorRow(lines[i])) {
          const cells = lines[i].trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
          rawRows.push(cells);
        }
        i++;
      }
      blocks.push({ type: "table", header: rawRows[0] || [], rows: rawRows.slice(1) });
      continue;
    }

    if (isBullet(line)) {
      const items = [];
      while (i < lines.length && isBullet(lines[i])) {
        items.push(lines[i].replace(/^-\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (isOrdered(line)) {
      const items = [];
      while (i < lines.length && isOrdered(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    const buf = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !isHr(lines[i]) &&
      !isHeading(lines[i]) &&
      !isTableRow(lines[i]) &&
      !isBullet(lines[i]) &&
      !isOrdered(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    blocks.push({ type: "p", text: buf.join(" ") });
  }
  return blocks;
}

const HAN_RE = /([㐀-䶿一-鿿豈-﫿]+)/;
// Ký tự chỉ xuất hiện trong tiếng Việt, không bao giờ xuất hiện trong pinyin —
// dùng để phân biệt "*ghi chú tiếng Việt in nghiêng*" với "*pinyin*".
const VN_ONLY_RE = /[ăâđêôơưĂÂĐÊÔƠƯảãạẻẽẹỉĩịỏõọủũụỷỹỵẢÃẠẺẼẸỈĨỊỎÕỌỦŨỤỶỸỴ]/;

// Đọc to chữ Hán khi click (Web Speech API — window.speechSynthesis) — chạy
// hoàn toàn trong trình duyệt, không gọi API nào của ứng dụng. Luôn đọc CHỮ
// HÁN (không đọc thẳng chuỗi pinyin) vì giọng zh-CN phát âm chữ Hán chuẩn xác
// hơn nhiều so với đọc thẳng chuỗi Latin. Khi click vào pinyin, dùng chữ Hán
// đi kèm gần nhất (xem lastHan trong renderInline) làm nguồn để đọc.
// QUAN TRỌNG: gọi getVoices() TRỰC TIẾP tại thời điểm click (không cache vào
// biến module) — cache theo module load trước đây có thể bị "kẹt" ở null nếu
// getVoices() trả về mảng rỗng lúc file vừa nạp (voices chưa kịp load) và sự
// kiện voiceschanged không bắn lại (thường gặp khi voices đã có sẵn từ trước
// trong tiến trình trình duyệt, tức là không có gì "thay đổi" để bắn sự kiện).
function pickZhVoice() {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;
  const candidates =
    voices.filter((v) => v.lang === "zh-CN").length > 0
      ? voices.filter((v) => v.lang === "zh-CN")
      : voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith("zh"));
  if (candidates.length === 0) return null;
  // Loại các giọng "novelty" (vui nhộn) của Apple — Eddy/Flo/Grandma/Grandpa/
  // Reed/Rocko/Sandy/Shelley... vốn là giọng hiệu ứng cho tiếng Anh, macOS
  // gần đây mở rộng đa ngôn ngữ nhưng phát âm tiếng Trung không ổn định, hay
  // đọc thiếu âm — ưu tiên giọng tiếng Trung "chính danh" như Tingting/Li-Mu.
  const NOVELTY_NAMES = new Set([
    "Albert", "Bad News", "Bahh", "Bells", "Boing", "Bubbles", "Cellos", "Wobble",
    "Trinoids", "Zarvox", "Jester", "Organ", "Superstar",
    "Eddy", "Flo", "Grandma", "Grandpa", "Reed", "Rocko", "Sandy", "Shelley",
  ]);
  const baseName = (v) => (v.name || "").split(" (")[0].trim();
  const isNovelty = (v) => NOVELTY_NAMES.has(baseName(v));
  const localCandidates = candidates.filter((v) => v.localService === true);
  const pool = localCandidates.length > 0 ? localCandidates : candidates;
  const chosen =
    pool.find((v) => baseName(v) === "Tingting") ||
    pool.find((v) => !isNovelty(v)) ||
    pool[0];
  return chosen;
}
// Giữ tham chiếu utterance đang đọc ở scope module (không phải biến cục bộ
// trong hàm) — tránh bị garbage-collected giữa chừng trên Chrome/macOS. Đồng
// thời gọi pause()/resume() NGAY (đồng bộ) sau speak() — đây là workaround
// được ghi nhận rộng rãi cho lỗi Chrome trên macOS nơi speak() không thực sự
// "chốt" và bắt đầu phát ngay, khiến audio bị cắt mất một đoạn ngẫu nhiên
// (đầu hoặc cuối) thay vì đọc trọn vẹn.
let currentUtterance = null;
function speakChinese(text) {
  if (!text || typeof window === "undefined" || !window.speechSynthesis) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-CN";
  const voice = pickZhVoice();
  if (voice) utter.voice = voice;
  utter.rate = 0.85;
  utter.volume = 1;
  utter.pitch = 1;
  currentUtterance = utter;
  synth.speak(utter);
  synth.pause();
  synth.resume();
}
function extractTrailingHan(text) {
  if (!text) return null;
  const matches = text.match(new RegExp(HAN_RE, "g"));
  return matches ? matches[matches.length - 1] : null;
}

// Tách các đoạn chữ Hán ra khỏi một đoạn text thường, bọc riêng để tô màu +
// cho phép click để nghe phát âm.
function renderHanRuns(text, keyPrefix) {
  if (!HAN_RE.test(text)) return text;
  const parts = text.split(new RegExp(HAN_RE, "g"));
  return parts.map((part, i) =>
    HAN_RE.test(part) ? (
      <span
        className="tv-han tv-speak"
        key={keyPrefix + "-h" + i}
        onClick={() => speakChinese(part)}
        title="Nhấn để nghe phát âm"
      >
        {part}
      </span>
    ) : (
      part
    )
  );
}

// renderInline: dùng cho toàn bộ nội dung THÂN bài (không phải H1) — tô màu
// chữ Hán (đỏ) và pinyin (xanh ngọc), giữ ghi chú tiếng Việt in nghiêng màu xám.
function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  let lastHan = null;
  return parts.map((part, idx) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      const inner = part.slice(2, -2);
      const han = extractTrailingHan(inner);
      if (han) lastHan = han;
      return <strong key={idx}>{renderHanRuns(inner, "b" + idx)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      const inner = part.slice(1, -1);
      const isPinyin = !VN_ONLY_RE.test(inner);
      if (isPinyin) {
        const speakText = lastHan || inner;
        return (
          <em
            className="tv-pinyin tv-speak"
            key={idx}
            onClick={() => speakChinese(speakText)}
            title="Nhấn để nghe phát âm"
          >
            {inner}
          </em>
        );
      }
      return (
        <em className="tv-note" key={idx}>
          {inner}
        </em>
      );
    }
    const han = extractTrailingHan(part);
    if (han) lastHan = han;
    return <React.Fragment key={idx}>{renderHanRuns(part, "p" + idx)}</React.Fragment>;
  });
}

// renderInlinePlain: dùng riêng cho H1 — chỉ xử lý **đậm**/*nghiêng*, KHÔNG tô
// màu chữ Hán/pinyin (tiêu đề đã đủ to/nổi bật, thêm màu sẽ rối mắt).
function renderInlinePlain(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, idx) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      return <em key={idx}>{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function Block({ b }) {
  switch (b.type) {
    case "h1":
      return <h1 className="tv-h1">{renderInlinePlain(b.text)}</h1>;
    case "h2":
      return <h2 className="tv-h2">{renderInline(b.text)}</h2>;
    case "h3":
      return <h3 className="tv-h3">{renderInline(b.text)}</h3>;
    case "h4":
      return <h4 className="tv-h4">{renderInline(b.text)}</h4>;
    case "hr":
      return <hr className="tv-hr" />;
    case "p":
      return <p className="tv-p">{renderInline(b.text)}</p>;
    case "ul":
      return (
        <ul className="tv-ul">
          {b.items.map((it, ii) => (
            <li key={ii}>{renderInline(it)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="tv-ol">
          {b.items.map((it, ii) => (
            <li key={ii}>{renderInline(it)}</li>
          ))}
        </ol>
      );
    case "table": {
      // Bảng "Từ vựng" có cột riêng "Chữ Hán"/"Hán" và "Pinyin" — nội dung 2 cột
      // này là chữ thuần (không có dấu * markdown) nên tô màu theo TÊN CỘT thay
      // vì dựa vào renderInline (chỉ bắt được *…* /Hán lẫn trong câu văn).
      const hanColIdx = b.header.findIndex((h) => /^(chữ )?hán$/i.test(h.trim()));
      const pinyinColIdx = b.header.findIndex((h) => /^pinyin$/i.test(h.trim()));
      return (
        <div className="tv-table-wrap">
          <table className="tv-table">
            <thead>
              <tr>
                {b.header.map((c, ci) => (
                  <th key={ci}>{renderInline(c)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((c, ci) => {
                    if (ci === hanColIdx) {
                      return (
                        <td className="tv-han tv-speak" key={ci} onClick={() => speakChinese(c)} title="Nhấn để nghe phát âm">
                          {c}
                        </td>
                      );
                    }
                    if (ci === pinyinColIdx) {
                      const hanVal = hanColIdx !== -1 ? row[hanColIdx] : null;
                      return (
                        <td className="tv-pinyin tv-speak" key={ci} onClick={() => speakChinese(hanVal || c)} title="Nhấn để nghe phát âm">
                          {c}
                        </td>
                      );
                    }
                    return <td key={ci}>{renderInline(c)}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    default:
      return null;
  }
}

// Nhóm chủ đề theo mảng (Công việc cốt lõi / Kênh giao tiếp / Thiết thực /
// Xã giao / Ứng biến) — dùng cho drawer điều hướng trên mobile. CHỈ liệt kê
// nhãn của những SECTIONS đã thực sự viết — mỗi khi thêm chủ đề mới, cập
// nhật NAV_GROUPS cùng lúc (thêm nhãn vào đúng nhóm), nếu không mobile
// drawer sẽ tham chiếu tới section không tồn tại và crash.
const NAV_GROUPS = [
  { label: "Công việc", labels: [
      "Mở đầu & dẫn dắt cuộc họp",
      "Giao việc, deadline & báo cáo tiến độ",
      "Phản hồi & xử lý bất đồng trong công việc",
      "Thương lượng & trao đổi điều khoản",
      "Điện thoại, nhắn tin & email công việc",
  ]},
  { label: "Xã giao & văn hoá", labels: [
      "Chào hỏi & giới thiệu bản thân",
      "Hỏi thăm & xã giao thường ngày (寒暄)",
      "Mời ăn uống & giao tiếp trên bàn tiệc",
      "Khen ngợi, cảm ơn & khiêm tốn đáp lễ",
      "Mời mọc, từ chối khéo léo & giữ thể diện",
      "Tặng quà & phép lịch sự liên quan",
      "Hỏi thăm gia đình & tán gẫu đời thường",
      "An ủi, chia sẻ & bày tỏ đồng cảm",
  ]},
  { label: "Đời thường thiết thực", labels: [
      "Mua sắm & trả giá",
      "Đi lại, hỏi đường & đặt xe",
      "Gọi món & ăn uống ở quán xá",
      "Kết bạn, hẹn gặp & rủ đi chơi",
  ]},
  { label: "Ứng biến khi bí từ", labels: [
      "Câu giờ suy nghĩ khi chưa biết trả lời",
      "Diễn đạt lại khi bí từ / không nhớ từ chính xác",
      "Xin nhắc lại, nói chậm & làm rõ khi không hiểu",
  ]},
];
const NAV_STANDALONE_LABELS = [];

export default function ChunkAtlasCN() {
  const [active, setActive] = useState(() => {
    const fromUrl = getSubTabFromUrl();
    const idx = SECTIONS.findIndex((s) => s.slug === fromUrl);
    return idx !== -1 ? idx : 0;
  });
  useEffect(() => { syncSubTabToUrl(SECTIONS[active]?.slug); }, [active]);
  const scrollRef = useRef(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({});

  const selectSectionMobile = (idx) => {
    setActive(idx);
    setMobileNavOpen(false);
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    window.__scrollArticleToTop?.();
  }, [active]);

  const blocks = parseBlocks(SECTIONS[active].body);
  const hasPrev = active > 0;
  const hasNext = active < SECTIONS.length - 1;

  return (
    <div className="tv-root">
      <style>{CSS}</style>

      <header className="tv-hd">
        <div className="tv-brand">
          <div className="tv-brand-mark">汉</div>
          <div>
            <div className="tv-brand-t">CHUNK ATLAS · TIẾNG TRUNG</div>
            <div className="tv-brand-s">Cụm từ tiếng Trung thông dụng theo tình huống</div>
          </div>
        </div>
      </header>

      <nav className="tv-crumb-wrap mobile-static">
        <div className="tv-crumb tv-crumb-main">
          {NAV_GROUPS.map((g, gi) => {
            const memberIdxs = g.labels
              .map((lbl) => SECTIONS.findIndex((s) => s.label === lbl))
              .filter((i) => i !== -1);
            if (!memberIdxs.length) return null;
            const isActiveGroup = memberIdxs.includes(active);
            return (
              <button
                key={gi}
                className={"tv-crumb-pill" + (isActiveGroup ? " on" : "")}
                onClick={() => setActive(memberIdxs[0])}
              >
                {g.label}
              </button>
            );
          })}
        </div>
        {(() => {
          const currentGroup = NAV_GROUPS.find((g) => g.labels.includes(SECTIONS[active].label));
          if (!currentGroup || currentGroup.labels.length < 2) return null;
          return (
            <div className="tv-crumb tv-crumb-topic">
              {currentGroup.labels.map((lbl, i) => {
                const idx = SECTIONS.findIndex((s) => s.label === lbl);
                if (idx === -1) return null;
                const s = SECTIONS[idx];
                return (
                  <button
                    key={idx}
                    className={"tv-crumb-pill small" + (idx === active ? " on" : "")}
                    onClick={() => setActive(idx)}
                  >
                    <span className="tv-crumb-c">{i + 1}</span>
                    {s.label}
                  </button>
                );
              })}
            </div>
          );
        })()}
      </nav>

      {/* ===== Mobile-only: thanh "đang xem" gọn + drawer trượt từ trái =====
          Chỉ hiện dưới 768px (xem CSS .tv-mobile-trigger); trên desktop hàng
          pill ngang ở trên vẫn dùng như cũ, không đổi gì. */}
      <button
        className={"tv-mobile-trigger" + (mobileNavOpen ? " open" : "")}
        onClick={() => setMobileNavOpen((v) => !v)}
      >
        <div className="tv-mt-box">
          <div className="tv-mt-text">
            <div className="tv-mt-group">
              {(() => {
                const g = NAV_GROUPS.find((g) => g.labels.includes(SECTIONS[active].label));
                if (g) return g.label;
                if (NAV_STANDALONE_LABELS.includes(SECTIONS[active].label)) return "Lá số mẫu";
                return "";
              })()}
            </div>
            <div className="tv-mt-current">{SECTIONS[active].num} · {SECTIONS[active].label}</div>
          </div>
          <div className="tv-mt-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </div>
        </div>
      </button>

      <div className={"tv-mobile-backdrop" + (mobileNavOpen ? " show" : "")} onClick={() => setMobileNavOpen(false)} />
      <div className={"tv-mobile-drawer" + (mobileNavOpen ? " show" : "")}>
        <div className="tv-md-head">
          <div>
            <div className="tv-md-t1">{SECTIONS.length} tab</div>
            <div className="tv-md-t2">Chọn mục để xem</div>
          </div>
          <button className="tv-md-close" onClick={() => setMobileNavOpen(false)} aria-label="Đóng">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="tv-md-body">
          {NAV_GROUPS.map((g) => {
            const items = g.labels.map((lbl) => ({ idx: SECTIONS.findIndex((s) => s.label === lbl), s: SECTIONS.find((s) => s.label === lbl) }));
            const hasActive = items.some((it) => it.idx === active);
            const isOpen = expandedGroups[g.label] !== undefined ? expandedGroups[g.label] : hasActive;
            return (
              <div key={g.label}>
                <button
                  className={"tv-md-group" + (hasActive ? " has-active" : "")}
                  onClick={() => setExpandedGroups((prev) => ({ ...prev, [g.label]: !isOpen }))}
                >
                  <span className="tv-md-dot" />
                  <span className="tv-md-glabel">{g.label}</span>
                  <span className="tv-md-gcount">{items.length}</span>
                  <span className={"tv-md-chev" + (isOpen ? " open" : "")}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </button>
                <div className={"tv-md-items" + (isOpen ? " open" : "")}>
                  {items.map((it) => (
                    <button
                      key={it.idx}
                      className={"tv-md-item" + (it.idx === active ? " active" : "")}
                      onClick={() => selectSectionMobile(it.idx)}
                    >
                      <span className="tv-md-in">{it.s.num}</span>
                      <span>{it.s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          {NAV_STANDALONE_LABELS.map((lbl) => {
            const idx = SECTIONS.findIndex((s) => s.label === lbl);
            const s = SECTIONS[idx];
            return (
              <button
                key={lbl}
                className={"tv-md-standalone" + (idx === active ? " active" : "")}
                onClick={() => selectSectionMobile(idx)}
              >
                <span className="tv-md-in">{s.num}</span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <main className="tv-stage" ref={scrollRef}>
        <div className="tv-prose">
          {blocks.map((b, i) => (
            <Block b={b} key={i} />
          ))}
        </div>

        {(hasPrev || hasNext) && (
          <div className="tv-nav-wrap">
            {hasPrev ? (
              <button className="tv-nav-btn tv-prev-btn" onClick={() => setActive(active - 1)}>
                {"\u2190 Quay lại: " + SECTIONS[active - 1].label}
              </button>
            ) : <span />}
            {hasNext && (
              <button className="tv-nav-btn tv-next-btn" onClick={() => setActive(active + 1)}>
                {"Tiếp: " + SECTIONS[active + 1].label + " \u2192"}
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

/* ---------------------------------------------------------------
   CSS — phong cách "giấy ấm" đồng bộ với các tab Language khác.
   Lưu ý: App.jsx có style toàn cục ".article-content ul/ol/li/table/th/td"
   dùng !important với specificity (0,1,1) — để không bị ghi đè (gây hiện
   tượng "2 chấm bullet" chồng lên nhau), mọi selector list/table dưới đây
   đều bọc thêm ".tv-root" để nâng specificity lên (0,2,x) và cũng dùng
   !important.
--------------------------------------------------------------- */
const CSS = `
* { box-sizing: border-box; }
.tv-root {
  --ink:${INK}; --paper:${PAPER}; --panel:${PANEL}; --rule:${RULE}; --muted:${MUTED}; --accent:${ACCENT};
  --han:${HAN_COLOR}; --pinyin:${PINYIN_COLOR};
  display: flex; flex-direction: column;
  background: var(--paper); color: var(--ink);
  font-family: ui-sans-serif,system-ui,"Segoe UI",Roboto,Arial,sans-serif;
  font-size: 15px; line-height: 1.55;
}

.tv-hd { display: flex; align-items: center; gap: 18px; padding: 14px 20px; border-bottom: 1px solid var(--rule); background: #FCFBF8; }
.tv-brand { display: flex; gap: 10px; align-items: center; }
.tv-brand-mark {
  width: 36px; height: 36px; flex-shrink: 0;
  border: 1.5px solid var(--accent); color: var(--accent);
  font-family: Georgia, serif; font-size: 20px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; border-radius: 3px;
}
.tv-brand-t { font-family: Georgia, serif; font-weight: 700; font-size: 15px; letter-spacing: 0.04em; color: var(--ink); }
.tv-brand-s { font-size: 11px; color: var(--muted); margin-top: 1px; }

.tv-crumb-wrap { position: sticky; top: 0; z-index: 15; background: #FCFBF8; border-bottom: 1px solid var(--rule); }
.tv-crumb { display: flex; gap: 6px; flex-wrap: wrap; padding: 9px 20px; }
.tv-crumb-pill {
  display: flex; align-items: center; gap: 6px;
  border: 1px solid var(--rule); background: #fff; border-radius: 20px;
  padding: 7px 13px; cursor: pointer; font-size: 12.5px; font-weight: 600;
  color: var(--muted); white-space: nowrap; transition: all .12s;
}
.tv-crumb-pill:hover { border-color: var(--accent); color: var(--ink); }
.tv-crumb-pill.on { background: var(--accent); border-color: var(--accent); color: #fff; }
/* Tổng quan / Phương pháp luận — bo góc vuông hơn để phân biệt với 14 tab sao (bo tròn kiểu pill) */
.tv-crumb-pill.meta { border-radius: 8px; }
.tv-crumb-n {
  font-family: Georgia, serif; font-weight: 700; font-size: 10.5px;
  width: 16px; height: 16px; border-radius: 3px;
  background: rgba(107,79,160,.14); color: var(--accent);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.tv-crumb-pill.on .tv-crumb-n { background: rgba(255,255,255,.28); color: #fff; }

/* Hàng dưới: chủ đề trong nhóm đang chọn — pill nhỏ, nhạt hơn hàng nhóm.
   Số thứ tự ở đây là text thường (không có ô nền vuông) để phân biệt với
   số ở hàng nhóm phía trên — đúng UI của tab Chunk Atlas - EN. */
.tv-crumb-topic { padding-top: 0; padding-bottom: 6px; }
.tv-crumb-pill.small {
  padding: 5px 12px 5px 9px; font-size: 11.5px; border-radius: 16px;
  background: transparent; border-color: transparent; color: #9C9585;
}
.tv-crumb-pill.small:hover { border-color: var(--rule); color: var(--ink); background: #fff; }
.tv-crumb-pill.small.on { background: var(--accent); border-color: var(--accent); color: #fff; }
.tv-crumb-c { font-family: Georgia, serif; font-weight: 700; font-size: 10px; color: #B5AE9E; }
.tv-crumb-pill.small:hover .tv-crumb-c { color: var(--accent); }
.tv-crumb-pill.small.on .tv-crumb-c { color: #fff; }

/* ===== Mobile-only nav: thanh "đang xem" + drawer trượt =====
   17 tab wrap thành nhiều hàng pill trên màn hình hẹp, chiếm hết chỗ trước
   khi thấy nội dung — dưới 768px thay hàng pill bằng 1 thanh gọn + drawer,
   nhóm theo hệ Trung Thiên/Bắc Đẩu/Nam Đẩu (đúng thứ tự SECTIONS). Từ 768px
   trở lên ẩn hết, giữ nguyên hàng pill ngang như cũ. */
.tv-mobile-trigger { display: none; }
.tv-mobile-backdrop, .tv-mobile-drawer { display: none; }

@media (max-width: 767px) {
  .tv-crumb-wrap { display: none !important; }
  .tv-mobile-trigger {
    display: flex; width: 100%; align-items: center; gap: 9px;
    position: sticky; top: 0; z-index: 20;
    background: #FCFBF8; border-bottom: 1px solid var(--rule);
    padding: 9px 14px; border-left: none; border-right: none; border-top: none;
    cursor: pointer; text-align: left;
  }
  .tv-mt-box {
    flex: 1; min-width: 0; display: flex; align-items: center; gap: 9px;
    border: 1px solid var(--rule); border-radius: 10px; padding: 7px 10px; background: #fff;
  }
  .tv-mt-text { flex: 1; min-width: 0; }
  .tv-mt-group {
    font-size: 9.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 2px;
  }
  .tv-mt-current {
    font-size: 12.5px; font-weight: 600; color: var(--ink);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .tv-mt-icon {
    width: 26px; height: 26px; border-radius: 7px; background: rgba(107,79,160,.1);
    color: var(--accent); display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: transform .2s ease;
  }
  .tv-mobile-trigger.open .tv-mt-icon { transform: rotate(90deg); }

  .tv-mobile-backdrop {
    display: block; position: fixed; inset: 0; background: rgba(35,31,26,.42);
    z-index: 198; opacity: 0; pointer-events: none; transition: opacity .2s ease;
  }
  .tv-mobile-backdrop.show { opacity: 1; pointer-events: auto; }

  .tv-mobile-drawer {
    display: block; position: fixed; top: 0; bottom: 0; left: 0; width: 84%; max-width: 300px;
    background: #fff; border-right: 1px solid var(--rule); z-index: 199; overflow-y: auto;
    transform: translateX(-100%); transition: transform .25s cubic-bezier(.32,.72,0,1);
  }
  .tv-mobile-drawer.show { transform: translateX(0); }

  .tv-md-head {
    padding: 14px 14px 12px; border-bottom: 1px solid var(--rule);
    display: flex; align-items: flex-start; justify-content: space-between; gap: 10px;
  }
  .tv-md-t1 { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); }
  .tv-md-t2 { font-family: Georgia, serif; font-size: 14px; font-weight: 600; color: var(--ink); margin-top: 3px; }
  .tv-md-close {
    width: 26px; height: 26px; border-radius: 7px; border: 1px solid var(--rule); background: var(--panel);
    display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--muted);
    flex-shrink: 0;
  }

  .tv-md-body { padding: 6px 0 16px; }

  .tv-md-group {
    width: 100%; display: flex; align-items: center; gap: 9px; padding: 9px 14px;
    background: transparent; border: none; cursor: pointer; text-align: left;
  }
  .tv-md-group.has-active { background: rgba(107,79,160,.06); }
  .tv-md-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
  .tv-md-glabel { flex: 1; font-size: 11.5px; font-weight: 700; color: var(--accent); }
  .tv-md-gcount { font-size: 10px; color: var(--muted); }
  .tv-md-chev { color: var(--muted); flex-shrink: 0; transition: transform .18s ease; display: flex; }
  .tv-md-chev.open { transform: rotate(180deg); }

  .tv-md-items { max-height: 0; overflow: hidden; transition: max-height .22s ease; }
  .tv-md-items.open { max-height: 400px; }

  .tv-md-item {
    width: 100%; display: flex; align-items: center; gap: 8px;
    padding: 7px 14px 7px 30px; background: transparent; border: none; cursor: pointer; text-align: left;
    border-left: 3px solid transparent; font-size: 12px; color: var(--ink); font-weight: 400;
  }
  .tv-md-item.active {
    background: rgba(107,79,160,.08); border-left-color: var(--accent);
    color: var(--accent); font-weight: 600;
  }
  .tv-md-standalone {
    width: 100%; display: flex; align-items: center; gap: 8px; padding: 9px 14px;
    background: transparent; border: none; border-top: 1px solid var(--rule); cursor: pointer;
    text-align: left; font-size: 12px; font-weight: 600; color: var(--ink); margin-top: 4px;
  }
  .tv-md-standalone.active { background: rgba(107,79,160,.08); color: var(--accent); }
  .tv-md-in { font-family: Georgia, serif; font-weight: 700; font-size: 9px; color: var(--muted); width: 16px; flex-shrink: 0; }
  .tv-md-item.active .tv-md-in, .tv-md-standalone.active .tv-md-in { color: var(--accent); }
}

.tv-stage { padding: 24px 40px 80px; }
.tv-prose { max-width: none; width: 100%; }

.tv-h1 { font-family: Georgia, serif; font-weight: 600; font-size: 30px; line-height: 1.18; margin: 6px 0 18px; letter-spacing: -0.01em; }
.tv-h2 { font-family: Georgia, serif; font-weight: 600; font-size: 20px; margin: 26px 0 10px; padding-bottom: 6px; border-bottom: 1px solid var(--rule); }
.tv-h3 { font-family: ui-sans-serif,system-ui,"Segoe UI",Roboto,Arial,sans-serif; font-weight: 600; font-size: 14px; color: var(--accent); margin: 18px 0 6px; letter-spacing: 0.02em; }
.tv-h4 { font-family: ui-sans-serif,system-ui,"Segoe UI",Roboto,Arial,sans-serif; font-weight: 600; font-size: 13px; color: var(--ink); margin: 14px 0 5px; letter-spacing: 0.01em; }
.tv-hr { border: none; border-top: 1px solid var(--rule); margin: 26px 0; }
.tv-p { margin: 0 0 12px; font-size: 14.5px; line-height: 1.65; color: var(--ink); }

/* Chữ Hán (đỏ son), Pinyin (xanh ngọc), ghi chú tiếng Việt in nghiêng (xám) —
   dùng thống nhất ở mọi nơi: đoạn văn, bullet, heading phụ, ô bảng. KHÔNG áp
   dụng cho H1 (xem renderInlinePlain). */
.tv-han { color: var(--han); font-weight: 600; }
.tv-pinyin { color: var(--pinyin); font-style: italic; font-weight: 500; }
.tv-note { color: var(--muted); font-style: italic; }
/* Ghi chú nhỏ đi kèm heading (vd. gợi ý "nhấn để nghe phát âm" cạnh "Từ vựng")
   — thu nhỏ và bỏ đậm để không cạnh tranh thị giác với chính tiêu đề. */
.tv-h2 .tv-note, .tv-h3 .tv-note { font-weight: 400; font-size: 0.6em; }

/* Click để nghe phát âm (Web Speech API, chạy trong trình duyệt) — áp dụng
   cho mọi span/em/td chữ Hán và pinyin. */
.tv-speak { cursor: pointer; border-radius: 3px; transition: background-color .12s; }
.tv-speak:hover { background-color: rgba(179,38,30,.08); text-decoration: underline dotted; text-underline-offset: 2px; }
.tv-speak:active { background-color: rgba(179,38,30,.16); }
td.tv-speak:hover { background-color: rgba(179,38,30,.08) !important; }

.tv-root .tv-ul { list-style: none !important; margin: 0 0 14px !important; padding: 0 !important; display: flex; flex-direction: column; gap: 7px; }
.tv-root .tv-ul li { list-style: none !important; position: relative; padding-left: 16px; margin: 0 !important; font-size: 14px; line-height: 1.58; color: var(--ink); }
.tv-root .tv-ul li::marker { content: "" !important; }
.tv-root .tv-ul li::before { content: ""; position: absolute; left: 0; top: 8px; width: 6px; height: 6px; border-radius: 50%; background: var(--ink); }

.tv-root .tv-ol { list-style: none !important; counter-reset: tv-ol; margin: 0 0 14px !important; padding: 0 !important; display: flex; flex-direction: column; gap: 8px; }
.tv-root .tv-ol li { list-style: none !important; counter-increment: tv-ol; position: relative; padding-left: 26px; margin: 0 !important; font-size: 14px; line-height: 1.6; color: var(--ink); }
.tv-root .tv-ol li::marker { content: "" !important; }
.tv-root .tv-ol li::before {
  content: counter(tv-ol) "."; position: absolute; left: 0; top: 0;
  font-family: Georgia, serif; font-weight: 700; color: var(--ink);
}

.tv-root .tv-table-wrap { overflow-x: auto; margin: 8px 0 20px; border: 1px solid var(--rule); border-radius: 6px; }
.tv-root .tv-table { border-collapse: collapse !important; width: 100% !important; max-width: 100% !important; font-size: 13px !important; margin: 0 !important; border: none !important; border-radius: 0 !important; }
.tv-root .tv-table th, .tv-root .tv-table td { border-bottom: 1px solid var(--rule) !important; border-right: 1px solid var(--rule) !important; padding: 9px 12px !important; text-align: left !important; vertical-align: top !important; line-height: 1.5 !important; color: var(--ink) !important; }
.tv-root .tv-table td.tv-han { color: var(--han) !important; font-weight: 600; }
.tv-root .tv-table td.tv-pinyin { color: var(--pinyin) !important; font-style: italic; font-weight: 500; }
.tv-root .tv-table th:last-child, .tv-root .tv-table td:last-child { border-right: none !important; }
.tv-root .tv-table thead th {
  background: var(--panel) !important; font-family: Georgia, serif !important; font-weight: 600 !important;
  color: var(--ink) !important; white-space: nowrap; text-transform: none !important; font-size: 13px !important; letter-spacing: 0 !important;
}
.tv-root .tv-table tbody tr:last-child td { border-bottom: none !important; }
.tv-root .tv-table tbody tr:hover td { background: rgba(107,79,160,.05) !important; }

.tv-nav-wrap { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--rule); }
.tv-nav-btn { display: flex; align-items: center; gap: 6px; padding: 9px 15px; border-radius: 8px; border: 1px solid #ccc; background: transparent; color: var(--ink); font-size: 13px; font-weight: 500; cursor: pointer; }
.tv-nav-btn:hover { border-color: var(--accent); color: var(--accent); }
.tv-next-btn { margin-left: auto; }

@media (max-width: 780px) {
  .tv-hd { padding: 10px 14px; }
  .tv-crumb { padding: 8px 12px; }
  .tv-stage { padding: 20px 18px 60px; }
  .tv-h1 { font-size: 24px; }
  .tv-table { font-size: 12px; }
  .tv-nav-wrap { flex-direction: column; align-items: stretch; }
  .tv-next-btn { margin-left: 0; }
}
`;
