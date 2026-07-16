import { useState } from "react";

const data = [
  // ─── SELF ───────────────────────────────────────────────────────────────────
  {
    tag: "Self", group: "Xử lý cảm xúc bản thân",
    situation: "Nhận tin tức xấu bất ngờ",
    approach: "Không phản ứng tức thì. Dừng lại, thở, nhận diện cảm xúc trước khi nói hoặc hành động.",
    vi: ["Cho mình một chút thời gian để xử lý điều này.", "Mình cần một lúc — mình sẽ quay lại với bạn sau."],
    en: ["I need a moment to take this in.", "Can we pause here? I want to respond properly, not just react."],
    zh: ["我需要一点时间消化这件事。", "先缓一缓——我想认真回应，不想冲动说话。"],
    vi_c: ["Ừ thôi cho mình nghĩ tí đã, tin này hơi choáng.", "Khoan, mình cần một chút — chứ nói ngay giờ này chắc nói bậy mất."],
    en_c: ["Okay, wow. Give me a sec.", "That's a lot. I need a minute before I can actually respond to that."],
    zh_c: ["哇，这个……让我缓一下。", "这消息有点猛，我得消化一下再说。"],
  },
  {
    tag: "Self", group: "Xử lý cảm xúc bản thân",
    situation: "Tức giận trong cuộc tranh luận",
    approach: "Nhận ra cơn giận đang lên và thoát ra trước khi leo thang. Không nói trong trạng thái cao trào.",
    vi: ["Mình đang cảm thấy bực và cần bình tĩnh lại. Có thể nói chuyện này sau không?", "Cho mình 10 phút — mình không muốn nói điều gì mà mình sẽ hối hận."],
    en: ["I'm getting worked up and I don't want to say something I'll regret. Can we pick this up in a bit?", "I need to step away for a few minutes. I'm still in this conversation — just not right now."],
    zh: ["我现在情绪有点激动，不想说出后悔的话。我们能稍后再聊吗？", "让我冷静几分钟，我没有回避这件事，只是现在状态不对。"],
    vi_c: ["Thôi stop, mình bực quá rồi, nói tiếp là mình nói bậy đó.", "Cho mình ra ngoài hít thở cái đã nhé, 10 phút thôi."],
    en_c: ["I'm heated right now, let's just pause before this gets ugly.", "Gimme a few minutes — I don't want to say something stupid."],
    zh_c: ["我现在火大，先停一下，不然等会儿说错话。", "给我几分钟冷静冷静，我不想说出让自己后悔的话。"],
  },
  {
    tag: "Self", group: "Xử lý cảm xúc bản thân",
    situation: "Thất bại hoặc mắc sai lầm nghiêm trọng",
    approach: "Thừa nhận sai lầm mà không tự trừng phạt. Phân tích, rút bài học, tiến về phía trước.",
    vi: ["Mình đã sai ở điểm này. Lần sau mình sẽ làm khác đi.", "Đây là bài học đắt, nhưng mình học được nhiều từ nó."],
    en: ["I got that wrong. Here's what I should've done differently, and here's what I'm changing going forward.", "That didn't go the way I wanted. I'm not going to beat myself up — I'm going to figure out what I missed."],
    zh: ["这件事我确实做错了。我已经想清楚下次该怎么改。", "搞砸了也没关系，关键是弄清楚哪里出了问题，下次不再犯。"],
    vi_c: ["Ừ thôi, hỏng rồi, mình sai. Ngồi ngẫm lại xem sai chỗ nào để lần sau khỏi dính nữa.", "Thôi kệ, coi như học phí. Không tự đánh mình nữa, move on thôi."],
    en_c: ["Yeah, I messed that up. Okay, lesson learned — moving on.", "Ugh, that sucked. But sitting here feeling bad about it isn't gonna help anything."],
    zh_c: ["行吧，这次搞砸了。总结一下哪里出了问题，下次别再犯。", "唉，失败就失败了。一直自责没用，想想怎么改就好了。"],
  },
  {
    tag: "Self", group: "Xử lý cảm xúc bản thân",
    situation: "Cảm thấy ghen tị với thành công của người khác",
    approach: "Không phủ nhận cảm giác ghen tị — dùng nó như la bàn để hiểu mình thực sự muốn gì.",
    vi: ["Mình thấy ghen — và điều đó cho mình biết mình cũng muốn điều tương tự. Vậy mình đang làm gì để đến đó?", "Thành công của họ không làm giảm khả năng của mình."],
    en: ["Honestly, I'm a little jealous — and I think that's useful information about what I actually want.", "Good for them. And separately — what am I doing to get there myself?"],
    zh: ["说实话，我有点嫉妒——但这让我意识到这也是我真正想要的东西。", "他们做得好，跟我无关。问题是：我自己在朝这个方向努力了吗？"],
    vi_c: ["Thôi thừa nhận đi, mình ghen tị thật. Mà thôi, ghen thì làm gì được, thà lo cho bản thân.", "Nhìn nó thành công mình vừa mừng vừa chua lòng thật sự 😅 Thôi kệ, focus vào việc của mình đi."],
    en_c: ["Not gonna lie, I'm lowkey jealous. But okay — what am I actually doing about what I want?", "Good for them, genuinely. Also… ugh. Okay, back to my own lane."],
    zh_c: ["说实话，有点酸。但我也知道，酸有什么用，还是得看看自己在干嘛。", "真的替他们高兴……也真的有点羡慕。好了，管好自己的事吧。"],
  },
  {
    tag: "Self", group: "Xử lý cảm xúc bản thân",
    situation: "Cảm thấy trống rỗng, mất phương hướng dù không có biến cố rõ ràng",
    approach: "Không cố lấp đầy bằng hoạt động. Ngồi yên với cảm giác đó và tự hỏi nó đang muốn nói gì.",
    vi: ["Mình đang cảm thấy rỗng. Và mình muốn hiểu tại sao thay vì chỉ thoát ra khỏi cảm giác đó.", "Có điều gì mình đang phớt lờ mà cảm xúc này đang cố nhắc mình không?"],
    en: ["Something feels off and I can't quite name it. Instead of just staying busy, I want to actually sit with it and figure out what's going on.", "I feel kind of empty lately — and I don't think the answer is just doing more stuff."],
    zh: ["我最近心里空空的，但不知道为什么。我想搞清楚，而不是用忙碌来逃避。", "有些东西不太对，但我说不清楚是什么。我需要安静下来好好想想。"],
    vi_c: ["Không biết sao dạo này cứ thấy trống trống, chả có gì sai mà vẫn thấy... lạ.", "Kiểu mọi thứ vẫn ổn nhưng mình vẫn không thấy ổn ấy. Kỳ lạ thật."],
    en_c: ["Idk, I just feel kind of… blah lately. Nothing's wrong exactly, it's just off.", "Everything's technically fine but I feel weirdly empty. I don't even know how to explain it."],
    zh_c: ["最近就是感觉空空的，也没什么具体的事，就是不对劲。", "什么都好好的，但就是有点没劲。也不知道怎么形容。"],
  },
  {
    tag: "Self", group: "Xử lý cảm xúc bản thân",
    situation: "Bị kéo vào vòng xoáy suy nghĩ tiêu cực lặp đi lặp lại",
    approach: "Nhận ra đây là pattern suy nghĩ, không phải sự thật. Đặt tên cho nó, tạo khoảng cách.",
    vi: ["Mình đang ở trong vòng lặp quen thuộc — cái giọng nói đó không phải sự thật, chỉ là thói quen.", "Câu chuyện mình đang kể cho chính mình là gì? Và bằng chứng thực sự là gì?"],
    en: ["I notice I'm spiraling. This thought's been here before and it wasn't true then either.", "I'm telling myself a story right now. Let me check — is any of this actually real?"],
    zh: ["我发现自己又陷进去了。这个想法以前就有过，那时候是假的，现在也未必是真的。", "我现在是在给自己讲一个故事。停一下——这些是真实发生的吗？"],
    vi_c: ["Oke mình đang overthink rồi, cái não này lại bày trò rồi.", "Stop, mình đang spin out. Hít thở đi, cái này không có thật đâu."],
    en_c: ["Okay brain, we're not doing this again. I know this spiral.", "I'm spiraling — noted. Not gonna feed it tonight."],
    zh_c: ["好了好了，又开始钻牛角尖了，大脑你停一下。", "我知道自己又在转圈了。深呼吸，这些想法不是真的。"],
  },
  {
    tag: "Self", group: "Tự nhận thức sâu",
    situation: "Nhận ra mình đang phản ứng thái quá so với tình huống thực tế",
    approach: "Không bào chữa, không tự chê bai. Truy ngược lại — phản ứng này thường đến từ vết thương cũ, không phải hiện tại.",
    vi: ["Mình đang phản ứng mạnh hơn tình huống đòi hỏi. Điều này đang trigger gì trong mình?", "Phần này của mình đang phản ứng — không phải toàn bộ mình."],
    en: ["My reaction is way bigger than the situation warrants. Something older got triggered here.", "I'm not actually that upset about what just happened — I'm upset about something this reminded me of."],
    zh: ["我的反应有点过激了。这件事触动了我内心某个更深的东西。", "我现在的情绪，不完全是因为眼前这件事。是它让我想起了别的什么。"],
    vi_c: ["Ủa sao mình bực dữ vậy? Chuyện nhỏ mà. Chắc nó chạm vào cái gì đó khác rồi.", "Mình đang overreact. Okay, thở đi, chuyện không đến mức này đâu."],
    en_c: ["Wait, why am I this upset? This is not that big of a deal.", "I'm way too in my feelings about this. Something else is going on."],
    zh_c: ["等等，我怎么反应这么大？这件事没这么严重吧。", "我好像有点过激了。是有什么别的事触动了我？"],
  },
  {
    tag: "Self", group: "Tự nhận thức sâu",
    situation: "Nhận ra mình đang chiều lòng người khác để tránh xung đột",
    approach: "Dừng lại và tự hỏi: mình đang đồng ý vì thực sự muốn, hay vì sợ bị không thích?",
    vi: ["Mình đã nói có, nhưng thật ra mình không ổn với điều đó. Mình cần sửa lại.", "Mình đang đồng ý để tránh làm bạn khó chịu — nhưng điều đó không công bằng với cả hai."],
    en: ["I said yes, but I didn't mean it. Let me be honest about what I can actually do.", "I keep agreeing to things I don't want to do. That's on me — I need to start being straight with people."],
    zh: ["我答应了，但其实我不太想做。我需要重新跟你说清楚。", "我老是为了不让别人不开心而答应事情，这样对谁都不好。我得开始说实话。"],
    vi_c: ["Ừ thôi mình nói thật, mình gật đầu lúc đó cho xong chứ không thực sự muốn làm đâu.", "Kiểu mình cứ hay nói có cho người ta vui, nhưng mà không hay lắm. Thôi lần này nói thật vậy."],
    en_c: ["Okay honestly? I said yes because I didn't want to deal with the awkwardness. But that's not actually a yes.", "I have a really bad habit of agreeing to stuff and then regretting it. I'm trying to do better."],
    zh_c: ["说实话，我当时说好是因为不想弄得尴尬，但我真的不太想做。", "我老是答应然后后悔，这个毛病得改。这次我还是说真话吧。"],
  },
  {
    tag: "Self", group: "Tự nhận thức sâu",
    situation: "Nhận ra mình đang phán xét người khác vì họ phản chiếu điều mình chưa chấp nhận ở bản thân",
    approach: "Dùng phán xét như tấm gương. Điều mình ghét ở họ — mình có dạng nào của điều đó không?",
    vi: ["Mình đang phán xét họ rất mạnh. Điều đó thường có nghĩa là có gì đó mình cần nhìn lại trong chính mình.", "Phản ứng của mình với người này dữ dội hơn bình thường. Mình tự hỏi điều đó đang phản chiếu gì."],
    en: ["The fact that this person bothers me so much is worth paying attention to. What is it about them that I don't want to see in myself?", "Strong reactions are data. Why does this bother me more than it should?"],
    zh: ["这个人让我这么烦，是有原因的。我是不是在他身上看到了自己不想承认的地方？", "反应太强烈，说明有东西值得深究。为什么这件事让我这么在意？"],
    vi_c: ["Sao mình ghét người đó dữ vậy ta? Cần phải ngẫm lại chút xíu.", "Ừ nhỉ, mình cứ chê người ta làm vậy, mà mình có làm vậy không nhỉ? 🤔"],
    en_c: ["Why do I find this person so annoying? That's probably on me somehow.", "Okay the fact that this is getting to me this much… that says more about me than them."],
    zh_c: ["我怎么这么烦这个人？可能是因为他让我想到了我自己某个地方。", "这件事能让我这么在意……说明问题可能在我这边，不在他。"],
  },
  {
    tag: "Self", group: "Tự nhận thức sâu",
    situation: "Nhận ra mình đang kể câu chuyện nạn nhân về cuộc đời mình",
    approach: "Không phủ nhận khó khăn thực sự — nhưng tìm lại quyền tự quyết trong những phạm vi có thể.",
    vi: ["Hoàn cảnh này thật sự khó. Và mình vẫn có những lựa chọn dù nhỏ. Mình đang chọn gì?", "Mình đang kể câu chuyện này như thể mình không có quyền năng gì. Điều đó có đúng không?"],
    en: ["Things are genuinely hard. And I still have choices inside of that. What am I actually choosing?", "I've been telling the story of why nothing works. What's the story where I have some agency?"],
    zh: ["事情确实很难。但在这种情况下，我还是有选择的。我在选什么？", "我一直在讲为什么什么都不行的故事。如果换一个视角，我能做什么？"],
    vi_c: ["Thôi, mình cũng hay tự thương bản thân hơi nhiều. Khó thật, nhưng không phải mình không làm được gì.", "Mình kể chuyện này cho mọi người nghe nhiều quá rồi. Thôi xem mình có thể làm gì đi."],
    en_c: ["Okay I've been playing the victim a little bit. Things are hard but I'm not completely helpless here.", "I keep telling this story like nothing is in my control. That's not actually true."],
    zh_c: ["好了，我承认我有点一直在把自己当受害者。事情很难，但我也不是完全没有选择。", "我一直在讲这个'什么都没用'的故事，但其实真的是这样吗？"],
  },
  {
    tag: "Self", group: "Mâu thuẫn nội tâm phức tạp",
    situation: "Yêu thương ai đó nhưng nhận ra mối quan hệ này đang làm hại mình",
    approach: "Tình cảm và quyết định là hai thứ độc lập. Không cần phủ nhận tình cảm để biện hộ cho việc rời đi.",
    vi: ["Mình thương bạn — điều đó là thật. Nhưng mình cũng nhận ra cách chúng ta ở bên nhau đang làm mình mất đi một phần của chính mình.", "Mình có thể quan tâm đến bạn và đồng thời cũng cần bước ra khỏi đây."],
    en: ["I care about you — that's real. And this relationship is costing me more than I can keep paying.", "Loving someone and choosing to leave aren't contradictions. Both can be true at the same time."],
    zh: ["我是真的在乎你。但我也意识到，我们在一起的方式让我慢慢失去了自己。", "爱一个人和选择离开，并不矛盾。两件事可以同时是真的。"],
    vi_c: ["Mình vẫn thương, nhưng ở gần nhau kiểu này mình thấy mình cứ mất dần. Khó lắm nhưng phải nói thật.", "Mình thương bạn thiệt. Nhưng mà ở tiếp thì mình không ổn nữa rồi."],
    en_c: ["I still care about you, that hasn't changed. But this isn't working for me anymore.", "It's not that I don't love you. It's that being in this is slowly wrecking me."],
    zh_c: ["我还是在乎你，这没变。只是这段关系让我越来越消耗不起了。", "不是不爱你。是待在这里，我感觉自己在慢慢垮掉。"],
  },
  {
    tag: "Self", group: "Mâu thuẫn nội tâm phức tạp",
    situation: "Cảm thấy nhẹ nhõm khi ai đó gặp bất hạnh — dù mình không muốn cảm thấy như vậy",
    approach: "Không phủ nhận hoặc tự ghê tởm cảm xúc. Cảm xúc không có nghĩa là ý định — hãy tò mò với nó.",
    vi: ["Mình đang cảm thấy điều mà mình không tự hào. Nhưng thay vì ép nó biến mất, mình muốn hiểu tại sao nó ở đây.", "Cảm xúc này đang kể một câu chuyện về điều gì đó chưa được chữa lành."],
    en: ["I feel something I'm not proud of right now. Instead of pushing it away, I want to understand what it's about.", "Having a feeling doesn't make me a bad person. It makes me someone who still has some healing to do."],
    zh: ["我现在的感觉让我不太舒服，但我不想压下去——我想弄清楚它在说什么。", "有这种感觉不代表我是坏人，只是说明有些东西还没有真正放下。"],
    vi_c: ["Ừ thôi thừa nhận đi, mình thấy nhẹ một chút khi nghe tin đó. Không tự hào, nhưng mà thật.", "Mình không nên thấy vậy, nhưng mà thấy thật. Thôi ngồi ngẫm xem mình còn giận gì không ta."],
    en_c: ["I'm not proud of it, but I felt relieved when I heard that. I should probably look at that.", "That's a pretty ugly feeling I just had. I'm not gonna pretend I didn't feel it."],
    zh_c: ["说起来不太好意思，但听到这个消息我确实松了口气。我得想想这说明什么。", "我刚才那个感觉挺难看的。但我不想假装没有。"],
  },
  {
    tag: "Self", group: "Mâu thuẫn nội tâm phức tạp",
    situation: "Cảm thấy mệt mỏi khi phải liên tục là người 'mạnh mẽ' cho người khác nương tựa",
    approach: "Cho phép bản thân cần được đỡ mà không coi đó là yếu đuối hay phản bội người đang tin tưởng mình.",
    vi: ["Mình đã là chỗ dựa cho mọi người từ rất lâu. Và bây giờ mình cũng cần ai đó đỡ mình một chút.", "Mình không thể tiếp tục cho từ một cái ly rỗng."],
    en: ["I've been holding things together for everyone else and I'm running on empty. I need some support too.", "I'm allowed to not be fine. I've been the strong one for a long time — I'm tired."],
    zh: ["我一直是大家依赖的那个人，但我自己也快撑不住了。我也需要有人支撑一下。", "我可以不坚强。我已经撑了很久了，我累了。"],
    vi_c: ["Mình ổn mà nhưng thật ra không ổn lắm. Mình cũng cần được ai đó hỏi thăm đôi khi chứ.", "Cứ làm chỗ dựa cho người khác hoài, ai dựa cho mình đây? Mệt thật."],
    en_c: ["I'm always the person everyone leans on. Who do I get to lean on?", "I'm tired of being the strong one. I'm allowed to not be okay too."],
    zh_c: ["我老是那个让别人靠的人，那我靠谁去？", "总是装坚强，其实我也很累的。我也可以不好的。"],
  },
  {
    tag: "Self", group: "Mâu thuẫn nội tâm phức tạp",
    situation: "Biết điều đúng đắn cần làm nhưng liên tục trì hoãn vì sợ hãi",
    approach: "Đặt tên chính xác cho điều mình sợ. Trì hoãn thường là sợ hậu quả, không phải thiếu quyết tâm.",
    vi: ["Mình biết mình cần làm gì. Vậy thứ đang giữ mình lại là gì cụ thể? Mình sợ điều gì nhất nếu thực sự làm điều đó?", "Sự trì hoãn của mình không phải vì thiếu quyết tâm — đó là sợ hãi mặc quần áo của sự chuẩn bị."],
    en: ["I know what I need to do. So what exactly am I afraid of? Let me name it instead of just stalling.", "I keep saying I'm 'getting ready.' But at some point, staying comfortable became the goal."],
    zh: ["我知道该做什么，但一直在拖。我到底在怕什么？把它说清楚。", "我一直告诉自己在'准备'，但其实不过是在拖延。舒适区成了目的地。"],
    vi_c: ["Mình biết phải làm gì mà cứ không làm. Sợ thật, nhưng sợ cái gì thì chưa dám nhìn thẳng vào.", "Thôi đừng pretend nữa, mình đang trốn tránh rõ ràng rồi."],
    en_c: ["I know what I need to do, I'm just scared. There, I said it.", "I've been 'about to' do this for like three months. That's just fear with extra steps."],
    zh_c: ["我知道该做什么，我就是怕。说出来就是这样。", "我已经'快要'做这件事做了好几个月了。这就是在逃避，换了个说法而已。"],
  },

  // ─── COMMUNICATION ──────────────────────────────────────────────────────────
  {
    tag: "Communication", group: "Giao tiếp & lắng nghe",
    situation: "Người khác đang tâm sự vấn đề của họ",
    approach: "Lắng nghe để hiểu, không phải để đưa ra giải pháp. Xác nhận cảm xúc trước, giải pháp sau nếu được hỏi.",
    vi: ["Nghe có vẻ thật sự khó khăn.", "Bạn muốn mình lắng nghe hay muốn có gợi ý gì không?"],
    en: ["That sounds really hard. I'm not going to jump to advice — I just want to hear you.", "Do you want me to just listen, or are you looking for ideas?"],
    zh: ["听起来真的很难受。我不急着给建议，我只是想听你说。", "你现在是想让我听着，还是想一起想想怎么办？"],
    vi_c: ["Trời, nghe mà xót. Thôi kể đi, mình nghe đây.", "Bạn cần mình ngồi nghe hay cần mình giúp nghĩ hướng xử lý?"],
    en_c: ["Oof, that's rough. I'm here, keep going.", "You want me to just listen or actually help you figure stuff out?"],
    zh_c: ["哎，听着真的挺难受的。说吧，我在听。", "你是想让我听着就好，还是想一起想想怎么办？"],
  },
  {
    tag: "Communication", group: "Giao tiếp & lắng nghe",
    situation: "Bị ngắt lời hoặc không được lắng nghe",
    approach: "Không tỏ ra bực bội công khai. Nhẹ nhàng nhưng rõ ràng giữ lại quyền nói của mình.",
    vi: ["Mình muốn kết thúc ý này trước rồi sẽ nghe bạn.", "Bạn có thể để mình nói xong không?"],
    en: ["Let me just finish this thought.", "Sorry — I wasn't done yet. Give me one more second."],
    zh: ["等我把这句话说完。", "不好意思，我还没说完——再给我一点时间。"],
    vi_c: ["Ê, để mình nói xong cái đã!", "Khoan khoan, mình chưa nói xong mà 😄"],
    en_c: ["Hey, I wasn't done!", "Hang on, let me finish — I'll hand it over in two seconds."],
    zh_c: ["哎，我还没说完呢！", "等等等等，让我说完，马上就好。"],
  },
  {
    tag: "Communication", group: "Giao tiếp & lắng nghe",
    situation: "Nhận ra người kia đang nói một điều nhưng thực sự muốn nói điều khác",
    approach: "Nhẹ nhàng phản chiếu lại những gì ẩn dưới bề mặt — cho họ không gian để nói thật hơn nếu muốn.",
    vi: ["Mình nghe bạn nói điều đó, nhưng mình có cảm giác có điều gì đó khác đang ở phía sau. Mình có nhầm không?", "Bạn thật sự ổn không?"],
    en: ["I hear what you're saying — but I get the sense there's something else going on. Am I reading that wrong?", "You seem fine, but you don't seem fine. What's actually up?"],
    zh: ["我听到你说的了，但我感觉背后还有什么。我理解错了吗？", "你说还好，但感觉不太对。你到底怎么了？"],
    vi_c: ["Bạn ổn không? Nhìn có vẻ không ổn lắm đó.", "Mình có cảm giác bạn đang muốn nói cái gì khác. Nói thật đi, không sao đâu."],
    en_c: ["Hey, you sure you're okay? You don't seem like yourself.", "What are you actually trying to say? Just say it, I can handle it."],
    zh_c: ["你真的没事吗？感觉怪怪的。", "你是不是想说别的？直说吧，我能接受的。"],
  },
  {
    tag: "Communication", group: "Giao tiếp & lắng nghe",
    situation: "Người đối diện im lặng sau khi mình nói điều gì đó",
    approach: "Không vội lấp đầy sự im lặng. Cho họ không gian xử lý.",
    vi: ["Mình sẽ để bạn nghĩ về điều đó. Không cần phải trả lời ngay.", "(Im lặng cùng — không chen vào.)"],
    en: ["Take your time. I'm not in a rush.", "(Sit with the silence — don't fill it.)"],
    zh: ["慢慢想，不着急。", "（保持沉默——不要急着打破它。）"],
    vi_c: ["Thôi cứ từ từ, mình đợi được.", "(Không cần phải lấp đầy khoảng lặng đó — ngồi yên đó thôi.)"],
    en_c: ["No rush. Take all the time you need.", "(Just be there. Don't scramble to fill the quiet.)"],
    zh_c: ["不用急，我等你。", "（就在那里陪着就好，不用急着开口。）"],
  },
  {
    tag: "Communication", group: "Đọc & phản hồi cảm xúc",
    situation: "Nhận ra ai đó đang căng thẳng dù họ không nói",
    approach: "Không hỏi dồn. Mở ra không gian nhẹ nhàng để họ có thể nói nếu muốn.",
    vi: ["Bạn có vẻ có nhiều thứ đang diễn ra. Mình ở đây nếu bạn muốn nói chuyện.", "Không cần phải ổn nếu không ổn."],
    en: ["You seem like you've got a lot going on. No pressure — but I'm here if you want to talk.", "You don't have to pretend everything's fine around me."],
    zh: ["你好像有很多事情在心上。不用勉强，如果想聊，我在。", "在我面前不用装没事，真的。"],
    vi_c: ["Nhìn thấy bạn dạo này có gì đó không ổn. Muốn kể không?", "Ê, mày ổn không? Nhìn kiểu không ổn lắm á."],
    en_c: ["Hey, you okay? You seem a bit off today.", "Something going on? You don't have to tell me, but I'm here if you want."],
    zh_c: ["哎，你还好吗？感觉你最近不太对劲。", "有什么事吗？不想说也没关系，但我在这儿。"],
  },
  {
    tag: "Communication", group: "Đọc & phản hồi cảm xúc",
    situation: "Khen ngợi ai đó một cách thực sự có ý nghĩa",
    approach: "Không khen chung chung. Cụ thể về hành động, nêu tác động, thể hiện rằng mình đã thực sự chú ý.",
    vi: ["Cách bạn xử lý tình huống đó thật sự rất ấn tượng, đặc biệt là khi bạn...", "Mình không biết bạn có nhận ra không, nhưng điều bạn làm hôm đó đã giúp mình rất nhiều."],
    en: ["I want to call out something specific — the way you handled that moment was really impressive.", "I don't know if you realize this, but what you did that day made a real difference for me."],
    zh: ["我想专门说一件事——你在那个时候的处理方式真的让我印象深刻。", "你可能没意识到，但你那天做的事对我影响很大。"],
    vi_c: ["Bạn làm điều đó ngầu thật đó, không phải ai cũng làm được vậy.", "Mình muốn nói thật là cái đó bạn làm hôm qua — mình ấn tượng thật sự, không khen xã giao đâu."],
    en_c: ["Okay I need to say — that thing you did? Actually impressive.", "Not just saying this to be nice — you handled that really well."],
    zh_c: ["说真的，你那件事做得真的挺厉害的，不是随便谁都能做到。", "我不是在敷衍你——你昨天那件事，我是真的觉得很佩服。"],
  },
  {
    tag: "Communication", group: "Đọc & phản hồi cảm xúc",
    situation: "Ai đó đang hành xử tệ, nhưng mình nhận ra họ đang đau",
    approach: "Tách biệt: nêu rõ hành vi không ổn VÀ hỏi về điều đằng sau.",
    vi: ["Cách bạn nói điều đó làm mình khó chịu. Nhưng mình cũng cảm nhận được bạn đang không ổn. Cả hai điều đó đều có thể đúng cùng lúc.", "Mình sẽ nói về những gì bạn vừa làm — nhưng trước tiên: bạn ổn không?"],
    en: ["That landed badly and I'm going to want to talk about it. But first — are you okay? Because something feels off.", "The way you just spoke to me isn't okay. And I can also see you're not doing well. Both things are true."],
    zh: ["你刚才那样说话让我很不舒服，这个我们之后要谈。但我先问你：你还好吗？好像有什么不对。", "你刚才的方式不对，这个我们要说清楚。但我也看出来你状态不好。这两件事都是真的。"],
    vi_c: ["Bạn vừa nói vậy nghe không ổn lắm, nhưng mà bạn đang ổn không vậy? Nhìn thấy có gì đó không bình thường.", "Ê, cái đó mình cần nói lại sau nha. Nhưng trước tiên — mày có chuyện gì không?"],
    en_c: ["Hey, that wasn't cool. Also — what's going on with you? You don't seem like yourself.", "We're gonna talk about what you just said. But are you okay first?"],
    zh_c: ["你刚才那样说话不太好，这个得说一下。但你还好吗？感觉有点不对劲。", "你刚才的话我们得聊聊。不过先说——你怎么了？"],
  },

  // ─── CONFLICT ───────────────────────────────────────────────────────────────
  {
    tag: "Conflict", group: "Xử lý xung đột",
    situation: "Bị chỉ trích hoặc bị công kích cá nhân",
    approach: "Tách bạch nội dung phê bình ra khỏi cách truyền đạt. Phản hồi phần nội dung.",
    vi: ["Có thể cách nói của bạn khiến mình phòng thủ, nhưng mình muốn nghe thực sự bạn đang nói gì.", "Bạn có thể nói cụ thể hơn về điểm nào không?"],
    en: ["The way that came out made me defensive — but I do want to hear the actual point you're making.", "Can you tell me specifically what you think I did wrong? I'd rather hear it directly than guess."],
    zh: ["你说话的方式让我有点防御，但我真的想听你想表达什么。", "你能具体说说你觉得我哪里做错了吗？我宁愿直接听，而不是去猜。"],
    vi_c: ["Ừ nghe cay đó, nhưng thôi, bạn muốn nói gì thì nói thẳng đi cho mình hiểu.", "Nói vậy mình hơi chột dạ, nhưng mà bạn có thể nói rõ hơn không?"],
    en_c: ["Okay that stung a little. But what are you actually trying to say?", "I'll be honest, that hit weird. Can you say it differently so I can actually hear it?"],
    zh_c: ["那话听着有点刺，不过你想说什么，直接说吧，我听着。", "说实话，那话让我有点不舒服。但你能换种方式说吗？这样我才能真的听进去。"],
  },
  {
    tag: "Conflict", group: "Xử lý xung đột",
    situation: "Bất đồng quan điểm với người có quyền lực hơn",
    approach: "Không né tránh, không đối đầu cứng nhắc. Dùng câu hỏi thay vì khẳng định.",
    vi: ["Mình tôn trọng quan điểm đó. Mình có thể chia sẻ một góc nhìn khác không?", "Mình tự hỏi liệu có thể xem xét thêm yếu tố... không?"],
    en: ["I hear you, and I want to flag something I'm seeing differently — is this a good time?", "I want to push back a little, respectfully. Can I share what I'm noticing?"],
    zh: ["我理解你的意思，但我看到了一个不一样的地方——现在方便说吗？", "我想礼貌地提出一点不同看法，可以吗？"],
    vi_c: ["Mình hiểu ý sếp/anh/chị, nhưng mình có một góc nhìn hơi khác, nói ra được không ạ?", "Cho mình hỏi thêm một chút, mình đang thắc mắc về phần..."],
    en_c: ["I get where you're coming from — can I throw out a different angle real quick?", "Just to make sure I'm not missing something — can I ask about this part?"],
    zh_c: ["我理解你的想法，能让我说一个不同的角度吗？", "我想确认一下我没漏掉什么——我能问一下这部分吗？"],
  },
  {
    tag: "Conflict", group: "Xử lý xung đột",
    situation: "Xung đột tái diễn dù đã giải quyết nhiều lần",
    approach: "Thoát ra khỏi nội dung cụ thể, nói thẳng về pattern đang xảy ra.",
    vi: ["Mình nhận ra chúng ta đã có cuộc trò chuyện này nhiều lần. Vấn đề thật sự không phải là... mà là điều gì đó sâu hơn.", "Mình không muốn tiếp tục giải quyết triệu chứng. Bạn nghĩ gốc rễ thật sự là gì?"],
    en: ["We keep having this same fight. I don't think it's really about what we're arguing about.", "Something underneath keeps coming back up. Can we talk about what's actually going on between us?"],
    zh: ["我们一直在重复同样的争吵。我觉得真正的问题不是这件事本身。", "有什么东西一直没被解决。我们能谈谈真正的问题是什么吗？"],
    vi_c: ["Mình thấy mình với bạn cứ cãi vụ này hoài. Có vẻ không phải do chuyện đó đâu nhỉ?", "Ủa sao mình cứ đụng chuyện này mãi vậy? Có cái gì đó sâu hơn mà mình chưa nói ra không?"],
    en_c: ["We've had this exact argument before. Like, multiple times. Something bigger is going on.", "Why does this keep coming up? We never actually fix it."],
    zh_c: ["这个架我们不是第一次吵了。感觉不是这件事的问题，是有什么更深的东西。", "为什么这件事一直反复？我们好像从来没真正解决过。"],
  },
  {
    tag: "Conflict", group: "Xử lý xung đột",
    situation: "Ai đó đang nổi giận, to tiếng với mình",
    approach: "Không đáp lại bằng giọng ngang hoặc to hơn. Hạ nhiệt bằng cách giảm âm lượng, làm chậm nhịp điệu.",
    vi: ["Mình thấy bạn đang rất bực bội. Mình muốn nghe bạn — nhưng khi giọng điệu như này mình khó lắng nghe được.", "Mình không đi đâu cả. Mình vẫn ở đây — nhưng cần cả hai đều bình tĩnh hơn."],
    en: ["I can see you're really frustrated. I want to hear you out — but not like this. Can we bring it down a notch?", "I'm not going anywhere. I'm right here. But I can't really listen when things are this heated."],
    zh: ["我看到你很烦，我想听你说——但这样的方式我真的听不进去。我们能不能先冷静一下？", "我没有要跑。我在这里。但这么激动，我们两个都没法好好说话。"],
    vi_c: ["Ê, hạ giọng xuống đi bạn ơi, mình muốn nghe bạn nhưng kiểu này khó nghe lắm.", "Bình tĩnh lại đi, mình không trốn đâu, nhưng phải nói chuyện bình thường được mới giải quyết được."],
    en_c: ["Hey, lower your voice — I want to work through this but not like this.", "I'm still here, I'm not going anywhere. Just calm down a bit so we can actually talk."],
    zh_c: ["声音小一点好吗，我想听你说，但这样我真的没法听进去。", "我没有要走。但你先冷静一下，我们才能好好谈。"],
  },
  {
    tag: "Conflict", group: "Xử lý xung đột",
    situation: "Ai đó trong nhóm liên tục ngắt lời hoặc lấn át người khác",
    approach: "Không đối đầu công khai. Điều chỉnh khéo léo, sau đó nói riêng.",
    vi: ["(Trong cuộc họp) Bạn... mình thấy bạn có điều muốn nói từ nãy — bạn nghĩ gì về điểm này?", "(Sau đó, riêng tư) Mình muốn chia sẻ điều mình quan sát được. Bạn có muốn nghe không?"],
    en: ["(In the meeting) Hey, you've been quiet — what's your take on this?", "(Privately, after) I noticed something in that meeting I wanted to share with you. Got a minute?"],
    zh: ["（会议中）你刚才一直没说话——你对这个怎么看？", "（会后，私下）我注意到刚才开会时有件事想和你说。方便吗？"],
    vi_c: ["(Họp) Bạn A ơi, mình muốn nghe ý kiến của bạn về điểm này.", "(Sau) Bạn có 5 phút không? Mình muốn nói chuyện riêng một chút."],
    en_c: ["(Meeting) Hey A, what do you think about this part?", "(After) Hey, you got a sec? I wanted to mention something I noticed in there."],
    zh_c: ["（会议中）A，这部分你觉得怎么样？", "（会后）有空吗？我想私下聊一件事。"],
  },

  // ─── WORK ───────────────────────────────────────────────────────────────────
  {
    tag: "Work", group: "Môi trường công sở",
    situation: "Nhận feedback tiêu cực từ sếp",
    approach: "Không phòng thủ. Xác nhận rằng đã nghe, hỏi thêm để hiểu cụ thể.",
    vi: ["Cảm ơn đã cho mình biết. Anh/chị có thể nói cụ thể hơn về phần... để mình cải thiện đúng chỗ không?", "Mình ghi nhận điều này. Anh/chị mong muốn mình thay đổi theo hướng nào?"],
    en: ["Thanks for telling me directly. Can you help me understand which part missed the mark?", "I appreciate this — can you give me a specific example so I know exactly what to improve?"],
    zh: ["谢谢你直接告诉我。你能帮我说说具体哪里没做好吗？", "我记住了。你能举个具体的例子吗？这样我知道往哪个方向改。"],
    vi_c: ["Oke, mình ghi nhận. Sếp có thể nói cụ thể hơn phần nào chưa ổn không ạ?", "Cảm ơn sếp đã nói thẳng. Vậy sếp muốn mình điều chỉnh theo hướng nào?"],
    en_c: ["Got it. Can you be more specific about which part didn't work?", "Okay, noted. What would you have wanted to see instead?"],
    zh_c: ["好的，我记下了。能具体说说哪里没做好吗？", "明白了，那你觉得应该怎么做会更好？"],
  },
  {
    tag: "Work", group: "Môi trường công sở",
    situation: "Đồng nghiệp nhận công của mình",
    approach: "Không phản ứng cảm xúc trước mọi người. Tìm thời điểm riêng tư để nói thẳng thắn.",
    vi: ["Mình muốn nói chuyện với bạn về dự án đó. Mình cảm thấy đóng góp của mình chưa được nhắc đến.", "Mình không nghĩ bạn cố ý, nhưng mình muốn được ghi nhận cho phần việc mà mình đã làm."],
    en: ["Hey, can we talk about the presentation yesterday? I felt like my part in that got a bit lost.", "I don't think you meant to, but my contribution kind of got left out. I'd like to address that."],
    zh: ["嘿，我们能聊聊昨天的演示吗？我觉得我的部分被忽略了。", "我觉得你不是故意的，但我的贡献没有被提到。我想把这件事说清楚。"],
    vi_c: ["Ê, mình nói thật nghen, hôm qua phần đó là mình làm nhưng sao không thấy nhắc đến mình vậy?", "Không biết có phải vô tình không, nhưng mà mình cần nói: phần đó mình có đóng góp đó."],
    en_c: ["Hey, not trying to make it weird, but that was partly my work that you presented.", "Can we chat real quick? I felt like my contribution got kind of glossed over."],
    zh_c: ["嘿，我不是要搞得尴尬，但那部分也是我做的，但好像没提到我。", "能聊两句吗？我感觉我的那部分被略过去了。"],
  },
  {
    tag: "Work", group: "Môi trường công sở",
    situation: "Bị giao việc quá nhiều / không khả thi",
    approach: "Trình bày thực trạng và đề xuất lựa chọn, không nói 'có' rồi không làm được.",
    vi: ["Mình muốn làm tốt cả hai. Với timeline hiện tại, bạn muốn mình ưu tiên cái nào trước?", "Mình có thể xử lý được nếu deadline của A được dời lại. Điều đó có khả thi không?"],
    en: ["I want to do both of these well — help me understand which one takes priority.", "I can make this work, but something has to give. Which deadline is more flexible?"],
    zh: ["我想把两件事都做好——如果只能先专注一件，你希望我优先哪个？", "我可以搞定，但需要有一个让步。哪个截止日期更有弹性？"],
    vi_c: ["Mình muốn làm hết thật nhưng với deadline này thì không kịp đâu. Cái nào ưu tiên hơn ạ?", "Sếp ơi, cái này với cái kia cùng deadline thì mình không cover được. Có thể dời cái nào không ạ?"],
    en_c: ["I want to say yes to both but I'd be lying — which one actually matters more right now?", "These two deadlines clash. Something has to move — which one?"],
    zh_c: ["我想说两个都能做，但那是在撒谎。这两个哪个更重要？", "这两个截止日期撞上了，有一个得往后移——哪个？"],
  },
  {
    tag: "Work", group: "Môi trường công sở",
    situation: "Cho người khác feedback tiêu cực mà không làm tổn thương họ",
    approach: "Tập trung vào hành vi cụ thể, không phán xét con người. Hỏi ý kiến họ trước.",
    vi: ["Mình muốn chia sẻ điều này vì mình nghĩ bạn có thể làm tốt hơn nữa.", "Đây không phải chỉ trích — mình đang nói vì mình tin vào khả năng của bạn."],
    en: ["I want to share something because I think you're capable of more — is that okay?", "This is coming from a good place. In that meeting, specifically when [X] happened — here's what I noticed."],
    zh: ["我想说一件事，因为我觉得你还可以做得更好——你愿意听吗？", "我是出于好意说这个。在那次会议上，具体是[X]那个地方——我注意到了一些情况。"],
    vi_c: ["Mình muốn nói thật với bạn một chút, không phải chê mà là muốn bạn tốt hơn. Nghe được không?", "Bạn ơi, mình có nhận xét về cái hôm qua, nói thật nghen không giận không?"],
    en_c: ["Can I give you some honest feedback? Promise it's coming from a good place.", "Not trying to call you out, but I noticed something I think is worth mentioning."],
    zh_c: ["我能给你说点真实的反馈吗？是出于好意的那种。", "不是要批评你，只是有件事我觉得值得提一下。"],
  },
  {
    tag: "Work", group: "Môi trường công sở",
    situation: "Đồng nghiệp liên tục than vãn, trút bực bội lên mình",
    approach: "Đồng cảm trong giới hạn. Không trở thành thùng rác cảm xúc, nhẹ nhàng chuyển hướng sang hành động.",
    vi: ["Mình nghe bạn và mình hiểu điều đó mệt mỏi. Bạn muốn tiếp tục xả không, hay mình thử nghĩ xem có thể làm gì không?", "Mình muốn hỗ trợ bạn — nhưng mình cũng nhận ra cuộc trò chuyện này đang ảnh hưởng đến cả hai."],
    en: ["I hear you, I really do. Do you need to just vent, or would it help to think through what you can actually do?", "I want to support you, but I'm also noticing this conversation is draining us both."],
    zh: ["我听到了，真的。你现在是需要发泄一下，还是想想有什么能做的？", "我想帮你，但我也发现这段对话在消耗我们两个。"],
    vi_c: ["Mình nghe, mình hiểu, thiệt. Nhưng mà nếu bạn muốn mình giúp nghĩ cách xử lý thì mình làm, còn xả tiếp thì mình cũng ở đây thôi.", "Bạn xả được rồi chưa? Nếu rồi thì mình thử nghĩ cách giải quyết không?"],
    en_c: ["I hear you — but honestly, this has been going on for a while. Do you actually want to fix it?", "I'm with you, but we keep going in circles. Want to figure out what to actually do?"],
    zh_c: ["我一直在听，但感觉我们一直在绕圈子。你想不想想想怎么真正解决？", "我支持你，但聊到现在我们两个都挺累的。要不要想想能做什么？"],
  },
  {
    tag: "Work", group: "Nghề nghiệp & tổ chức nâng cao",
    situation: "Phát hiện cấp trên hành xử phi đạo đức, nhưng lên tiếng có thể ảnh hưởng đến sự nghiệp",
    approach: "Không hành động trong cảm xúc. Thu thập bằng chứng, đánh giá rủi ro, quyết định dựa trên giá trị.",
    vi: ["Trước khi mình quyết định làm gì, mình cần hiểu rõ: điều mình đang thấy là gì chính xác, và mình sẵn sàng chấp nhận rủi ro nào.", "Mình không thể kiểm soát hậu quả. Nhưng mình có thể kiểm soát việc mình có thể nhìn vào gương mỗi sáng hay không."],
    en: ["Before I do anything, I need to be clear on what I actually saw and what I'm willing to risk.", "I can't control what happens after. But I can control whether I can live with myself."],
    zh: ["在做任何事之前，我需要搞清楚：我到底看到了什么，能证明什么，我能承受什么风险。", "我控制不了后果。但我能控制自己能不能坦然面对镜子里的自己。"],
    vi_c: ["Mình thấy chuyện này sai rõ ràng. Nhưng trước khi làm gì mình cần nghĩ xem mình dám đi tới đâu.", "Phức tạp lắm, nhưng mình không thể làm lơ mãi được."],
    en_c: ["This is clearly wrong. The question is just how far I'm willing to go.", "I can't just keep looking the other way on this."],
    zh_c: ["这件事明显不对，问题是我愿意走到哪一步。", "我不能一直假装没看到。"],
  },
  {
    tag: "Work", group: "Nghề nghiệp & tổ chức nâng cao",
    situation: "Bị loại khỏi dự án quan trọng mà không có giải thích rõ ràng",
    approach: "Yêu cầu cuộc trò chuyện thẳng thắn, nghe kể cả khi khó.",
    vi: ["Mình muốn hiểu quyết định này. Không phải để tranh luận, mà để học được gì đó.", "Bạn có thể giúp mình hiểu góc nhìn từ phía bạn không?"],
    en: ["I'd really like to understand this decision. Not to push back — just to learn what I'm missing.", "Can you help me understand what went into this? I want to hear it even if it's hard."],
    zh: ["我想了解这个决定是怎么来的。不是要反驳，只是想搞清楚我哪里不足。", "你能帮我理解这背后的考虑吗？就算不好听我也想知道。"],
    vi_c: ["Mình muốn hỏi thẳng, tại sao mình không được vào dự án đó? Mình cần biết để cải thiện.", "Sếp có thể nói thật với mình không, mình thiếu gì ở đây?"],
    en_c: ["I'm not going to pretend I'm not bummed. Can you tell me what actually happened?", "I'd rather hear the real reason than make up stories about it."],
    zh_c: ["我不会假装没事。能告诉我真正的原因是什么吗？", "我宁愿听真实的原因，也不想自己瞎猜。"],
  },
  {
    tag: "Work", group: "Nghề nghiệp & tổ chức nâng cao",
    situation: "Là người duy nhất nhìn ra vấn đề — nhưng mọi người đang đi theo hướng sai",
    approach: "Trình bày quan sát (không phải kết luận), đặt câu hỏi mở.",
    vi: ["Mình muốn chia sẻ điều mình đang thắc mắc — không phải vì mình chắc mình đúng, mà vì mình nghĩ nó đáng để xem xét thêm.", "Mình thấy một rủi ro tiềm tàng mà chúng ta chưa nói đến. Mình có thể nêu ra không?"],
    en: ["I want to raise something before we move forward — not because I think I'm right, but because I think it's worth a look.", "Can I flag a potential risk I'm seeing? I'd rather bring it up and be wrong than stay quiet."],
    zh: ["在往前推进之前，我想提一件事——不是说我一定对，只是觉得值得看一眼。", "我想提一个我看到的潜在风险。宁可说出来是错的，也不想沉默。"],
    vi_c: ["Khoan đã mọi người ơi, mình thấy có gì đó hơi sai sai. Có thể để mình nói không?", "Mình có thể hỏi một câu ngu không? Mình thấy có điểm này chưa ổn..."],
    en_c: ["Wait, can I just flag something before we commit to this?", "Am I the only one who sees this being a problem? Let me just put it out there."],
    zh_c: ["等等，在我们确定之前，我能说一件事吗？", "就我一个人觉得这里有问题吗？我说出来，你们帮我看看。"],
  },
  {
    tag: "Work", group: "Nghề nghiệp & tổ chức nâng cao",
    situation: "Phải sa thải ai đó đang cố gắng hết sức nhưng không đủ năng lực",
    approach: "Trung thực về lý do thật sự, ghi nhận những gì họ đã đóng góp.",
    vi: ["Đây là một trong những cuộc trò chuyện khó nhất mình phải có. Mình muốn nói thẳng với bạn, vì bạn xứng đáng được biết lý do thật sự.", "Bạn đã cố gắng thật sự. Vấn đề là sự phù hợp của vai trò — không phản ánh giá trị của bạn như một con người."],
    en: ["This is one of the hardest conversations I have to have. You deserve the real reason, not a softened version.", "Your effort has been genuine — I want you to know that. This is about fit for the role, not about who you are."],
    zh: ["这是我必须进行的最难的谈话之一。你值得听到真实的原因，而不是一个被包装过的版本。", "你真的很努力，我想让你知道这一点。这是关于岗位匹配的问题，和你这个人的价值无关。"],
    vi_c: ["Mình không muốn nói vòng vo. Mình cần nói thẳng với bạn và mình biết nó khó nghe.", "Bạn làm việc rất nghiêm túc, mình trân trọng điều đó. Nhưng quyết định này mình phải đưa ra."],
    en_c: ["I'm not going to dress this up. This is a hard conversation and you deserve honesty.", "You worked hard, genuinely. This is a fit issue, not a you issue."],
    zh_c: ["我不想绕弯子。这是一次很难的谈话，你应该听到真实的原因。", "你真的很努力，这我承认。问题不在你这个人，是岗位不合适。"],
  },
  {
    tag: "Work", group: "Nghề nghiệp & tổ chức nâng cao",
    situation: "Nhận ra mình đang burnout nhưng không muốn thừa nhận với tổ chức",
    approach: "Bắt đầu bằng cuộc trò chuyện thành thật với chính mình trước.",
    vi: ["Mình cần thành thật với chính mình trước: mình đang ở đâu thật sự?", "Mình không thể tiếp tục giả vờ với bản thân rằng mọi thứ ổn."],
    en: ["Before I figure out what to say to anyone else, I need to be honest with myself about how bad this actually is.", "I've been telling myself I'm fine. I'm not fine. And I need to start from there."],
    zh: ["在想怎么跟别人说之前，我得先对自己诚实：我现在到底有多糟？", "我一直告诉自己还好。但我不好。得从这里开始。"],
    vi_c: ["Thôi thừa nhận đi, mình mệt thật rồi. Không phải mệt bình thường nữa rồi.", "Mình cứ nói 'ổn' nhưng thật ra không ổn được lâu rồi."],
    en_c: ["Okay, I'm burned out. Like, actually burned out. I need to stop pretending otherwise.", "I've been running on fumes for months. That needs to change."],
    zh_c: ["好了，我承认，我真的到极限了，不是普通的累。", "我撑了好几个月了，不能再装没事了。"],
  },
  {
    tag: "Work", group: "Động lực quyền lực & thao túng",
    situation: "Nhận ra mình đang ở trong một nhóm có văn hóa toxic nhưng mọi người xem đó là bình thường",
    approach: "Từ chối tham gia vào các hành vi cụ thể, thiết lập vi-ranh giới.",
    vi: ["Mình sẽ không tham gia vào cuộc trò chuyện đó — không phải vì mình phán xét ai, mà vì nó không phù hợp với cách mình muốn đối xử với người khác.", "Mình nhận thấy điều này đang được xem là bình thường ở đây. Nhưng với mình, nó không ổn."],
    en: ["I'm going to sit this one out. It's not about judging anyone — it's just not something I want to participate in.", "I know this is pretty normal around here. It's just not something I'm comfortable with."],
    zh: ["这件事我不参与了。不是要评判谁，只是我不想做这种事。", "我知道这在这里很常见，但我自己不太能接受。"],
    vi_c: ["Thôi mình không tham gia vụ đó đâu. Không nói xấu gì ai đâu, chỉ là không phải kiểu của mình.", "Mình biết ở đây hay làm vậy, nhưng mình hơi uncomfortable với kiểu đó."],
    en_c: ["I'm gonna skip this one, not really my thing.", "Yeah I know everyone does it here, but it's just not my vibe."],
    zh_c: ["这个我不参与，不是我那种风格。", "我知道大家都这样，但这种事我不太自在。"],
  },

  // ─── RELATIONSHIPS ──────────────────────────────────────────────────────────
  {
    tag: "Relationships", group: "Quan hệ cá nhân",
    situation: "Người thân / bạn bè đang buồn hoặc khóc",
    approach: "Không cố sửa cảm xúc của họ. Chỉ đơn giản là ở đó.",
    vi: ["Mình ở đây với bạn.", "Bạn không cần phải ổn. Mình hiểu."],
    en: ["I'm right here. You don't have to explain anything.", "You don't have to hold it together right now. I've got you."],
    zh: ["我就在这。你不用解释什么。", "你现在不用撑着。有我在。"],
    vi_c: ["Thôi cứ khóc đi, không sao đâu, mình ngồi đây với bạn.", "Kể mình nghe đi, hay không muốn kể thì cứ để mình ngồi cạnh cũng được."],
    en_c: ["Hey, it's okay. Just cry. I'm right here.", "You don't have to say anything. I'll just stay."],
    zh_c: ["没事的，哭就哭吧，我陪着你。", "不用说什么，我就在这陪着你。"],
  },
  {
    tag: "Relationships", group: "Quan hệ cá nhân",
    situation: "Cần đặt giới hạn với người thân thiết",
    approach: "Rõ ràng về giới hạn mà không cần xin lỗi hoặc giải thích quá nhiều.",
    vi: ["Mình hiểu bạn không có ý xấu, nhưng khi... xảy ra, mình cảm thấy... Mình cần bạn...", "Mình trân trọng mối quan hệ này, vì vậy mình muốn nói thẳng."],
    en: ["I care about us, which is why I need to be honest — when [X] happens, I can't show up the way I want to.", "This isn't about blame. I just need [X] to change, or I'm going to keep pulling back."],
    zh: ["我在乎我们之间的关系，所以我得说实话——每次[X]发生，我就很难好好相处。", "我不是要怪谁。我只是需要[X]改变，不然我会越来越疏远。"],
    vi_c: ["Mình nói thật nha, khi bạn làm vậy mình không thoải mái. Mình cần bạn đừng làm vậy nữa.", "Mình vẫn quý bạn, nhưng cái này mình cần bạn dừng lại."],
    en_c: ["Hey, I need to tell you something. When you do [X], it actually bothers me more than I've let on.", "I still care about you but I need this to stop — it's been affecting me."],
    zh_c: ["说真的，你这样做的时候我真的不舒服，希望你能改一下。", "我还是在乎你，但这件事我需要你停下来，它真的影响到我了。"],
  },
  {
    tag: "Relationships", group: "Quan hệ cá nhân",
    situation: "Bạn bè nhờ ý kiến về một quyết định mà mình cho là sai",
    approach: "Chia sẻ lo ngại một lần, nhẹ nhàng, rồi tôn trọng quyết định của họ.",
    vi: ["Mình muốn nói thật với bạn vì mình quan tâm — mình có một vài lo ngại. Bạn có muốn nghe không?", "Mình đã nói điều mình nghĩ. Quyết định là của bạn và mình sẽ tôn trọng nó."],
    en: ["You asked, so I'll be honest — I have some concerns. Do you want to hear them?", "I've said what I think. Whatever you decide, I'm in your corner."],
    zh: ["你问了，我就直说——我有一些顾虑。你想听吗？", "我说了我的想法。不管你怎么决定，我都支持你。"],
    vi_c: ["Bạn hỏi thật thì mình nói thật nha, mình thấy hơi lo về cái này. Bạn có muốn nghe không?", "Mình nói thật rồi đó. Còn quyết định là của bạn, mình support bạn thôi."],
    en_c: ["You want my actual opinion? Okay, I'm a little worried about this.", "I said my piece. It's your call — I'm still here either way."],
    zh_c: ["你问我真实想法？好，我有点担心这件事。", "我说了我的看法，最后怎么决定是你的事，我支持你。"],
  },
  {
    tag: "Relationships", group: "Quan hệ cá nhân",
    situation: "Phát hiện người thân nói dối mình",
    approach: "Không đối đầu trong cơn giận. Nêu sự kiện cụ thể, không quy chụp.",
    vi: ["Mình nhận ra điều này khác với những gì bạn nói trước đó. Mình muốn hiểu chuyện gì đang xảy ra.", "Mình không muốn giả định. Bạn có thể giải thích cho mình không?"],
    en: ["Something doesn't add up between what you told me and what I found out. I'm not here to accuse — I just want to understand.", "I could be missing something. But I need you to help me make sense of this."],
    zh: ["你之前说的和我后来知道的对不上。我不是来兴师问罪的，我只是想搞清楚。", "也许我漏了什么。但我需要你帮我理解这件事。"],
    vi_c: ["Ê bạn, mình nghe được chuyện khác với cái bạn kể. Mình không muốn nghĩ xấu, nhưng giải thích cho mình hiểu được không?", "Có sự không khớp ở đây. Nói thật với mình đi."],
    en_c: ["Hey, something's not adding up. I'm not trying to start something — I just want to know what actually happened.", "Just be straight with me. What's going on?"],
    zh_c: ["嘿，这件事有些地方对不上。我不是要找你麻烦，只是想知道到底发生了什么。", "直接告诉我吧，到底怎么回事？"],
  },
  {
    tag: "Relationships", group: "Quan hệ cá nhân",
    situation: "Mối quan hệ trở nên xa cách dần mà không có lý do rõ ràng",
    approach: "Chủ động đặt tên cho điều đang xảy ra, không phán xét, không chờ người kia lên tiếng trước.",
    vi: ["Mình nhận ra gần đây chúng ta ít liên lạc hơn. Có điều gì không ổn giữa hai mình không?", "Mình miss bạn. Mình không muốn để thời gian làm mọi thứ trở nên ngại ngùng hơn."],
    en: ["I've noticed we've kind of drifted. I don't want to let that just become the new normal. Is everything okay with us?", "I miss you. And I didn't want to keep waiting for the right moment to say it."],
    zh: ["我发现我们最近联系少了很多。我不想让这变成常态。我们之间还好吗？", "我有点想你了。不想一直等到合适的时机才说。"],
    vi_c: ["Mày ơi mình thấy hai đứa mình ít nói chuyện hẳn đi. Có chuyện gì không hay tại mình bận quá rồi không nhận ra?", "Miss mày ghê. Thôi hẹn nhau đi chơi đi, lâu rồi không gặp."],
    en_c: ["Hey, feels like we've been ships passing lately. Everything good?", "I miss you. Can we actually hang soon?"],
    zh_c: ["嘿，感觉我们最近各走各的。你还好吗？", "我想你了。我们找个时间见一下吧，好久没见了。"],
  },
  {
    tag: "Relationships", group: "Ranh giới trong yêu thương",
    situation: "Phải nói với ai đó điều họ cần nghe nhưng không muốn nghe — và mình biết có thể mất đi mối quan hệ đó",
    approach: "Nói vì mình tôn trọng họ đủ để không tiếp tục im lặng.",
    vi: ["Mình sắp nói điều này không phải vì mình muốn làm bạn đau, mà vì mình quan tâm đến bạn đủ để không tiếp tục giả vờ.", "Mình biết điều này có thể làm thay đổi mọi thứ. Nhưng mình sẽ không tôn trọng bạn nếu tiếp tục im lặng."],
    en: ["I'm saying this because I care about you too much to keep pretending. It may cost us something — and I'm saying it anyway.", "You might not want to hear this. I'd rather lose you over honesty than keep you with a lie."],
    zh: ["我说这话，是因为我太在乎你，不想再假装没事。也许这会让我们付出代价——但我还是要说。", "你可能不想听。但比起用谎言维持这段关系，我宁愿因为说实话而失去你。"],
    vi_c: ["Mình phải nói thật với bạn dù biết bạn không muốn nghe. Vì mình quan tâm bạn.", "Câu này có thể làm bạn giận mình. Nhưng mà nói thật còn hơn giả vờ."],
    en_c: ["I have to be honest with you even if it's not what you want to hear. Because I care.", "This might piss you off. But I'd rather deal with that than keep lying by omission."],
    zh_c: ["我必须跟你说实话，就算你不想听。因为我在乎你。", "这可能会让你生气。但比起继续沉默，我宁愿面对这个后果。"],
  },
  {
    tag: "Relationships", group: "Ranh giới trong yêu thương",
    situation: "Người thân đang tự hủy hoại bản thân và từ chối giúp đỡ",
    approach: "Nói rõ lo ngại một lần bằng ngôn ngữ tình cảm, thiết lập ranh giới về những gì mình có thể và không thể làm.",
    vi: ["Mình sẽ không tiếp tục im lặng khi đang xem bạn tự làm hại mình. Mình nói vì mình yêu thương bạn.", "Mình không thể thay đổi lựa chọn của bạn. Nhưng mình cần bạn biết những gì mình có thể và không thể tiếp tục làm."],
    en: ["I love you, and I can't keep watching this happen without saying something. So I'm saying it.", "I can't make your choices for you. But I need to be honest about what I'm able to keep doing and what I'm not."],
    zh: ["我爱你，我没办法一直看着你这样却什么都不说。所以我现在说了。", "我没办法替你做决定。但我需要告诉你，我能继续做什么，不能继续做什么。"],
    vi_c: ["Mình không thể ngồi nhìn bạn làm vậy với bản thân mà không nói gì. Mình nói vì mình thương bạn thiệt sự.", "Mình không ép bạn được, nhưng mình cần bạn biết mình đang lo đến mức nào."],
    en_c: ["I can't just watch this and say nothing. I love you too much for that.", "I'm not going to force you to do anything. But I need you to know how worried I am."],
    zh_c: ["我没办法就这么看着你这样，什么都不说。我太在乎你了。", "我不能替你做决定，但我需要你知道我有多担心你。"],
  },
  {
    tag: "Relationships", group: "Ranh giới trong yêu thương",
    situation: "Bị người thân dùng tình cảm để thao túng — và mình biết nếu từ chối sẽ bị tội lỗi hóa",
    approach: "Phân tách: 'mình cảm thấy tội lỗi' ≠ 'mình có lỗi'. Giữ ranh giới ngay cả khi cảm thấy tội lỗi.",
    vi: ["Mình hiểu điều này làm bạn buồn. Và mình vẫn cần giữ quyết định của mình.", "Mình đang cảm thấy tội lỗi ngay lúc này — và mình cũng nhận ra cảm giác đó không có nghĩa là mình đang làm điều sai."],
    en: ["I know this hurts you. And I'm still holding this boundary. Both of those things are true at the same time.", "I feel guilty right now. I also know that feeling guilty doesn't mean I'm doing something wrong."],
    zh: ["我知道这让你难受。但我仍然要坚持这个决定。这两件事可以同时为真。", "我现在感到愧疚。但我也知道，有愧疚感不等于我做了错事。"],
    vi_c: ["Mình biết bạn buồn. Mình cũng không thoải mái lắm. Nhưng mình vẫn cần giữ quyết định này.", "Mình đang cảm thấy tội ghê, nhưng mà cảm thấy tội không có nghĩa là mình sai."],
    en_c: ["I know this is hard for you. I feel bad too. I'm still not changing my answer.", "I feel guilty, yeah. That doesn't mean I'm wrong though."],
    zh_c: ["我知道这对你来说很难。我也不好受。但我的决定不会变。", "我感到愧疚，是真的。但愧疚感不等于我做错了。"],
  },
  {
    tag: "Relationships", group: "Ranh giới trong yêu thương",
    situation: "Yêu cầu ai đó thay đổi hành vi — biết rằng nếu họ không thay đổi, mình sẽ phải rời đi",
    approach: "Nói rõ về nhu cầu và hậu quả như thực tế — không phải đe dọa.",
    vi: ["Mình cần nói thẳng: khi... tiếp tục xảy ra, mình không thể ở trong mối quan hệ này như bây giờ. Đây không phải lời đe dọa — đây là giới hạn thật sự của mình.", "Mình nói điều này vì mình muốn chúng ta có cơ hội thay đổi."],
    en: ["I need to be straight with you: if [X] keeps happening, I won't be able to stay in this the same way. I'm not saying this to scare you — this is just where I'm at.", "I'm telling you this because I want us to have a real shot at fixing it."],
    zh: ["我需要直说：如果[X]继续发生，我没办法继续这段关系。这不是威胁——这就是我现在的处境。", "我告诉你这些，是因为我希望我们真的有机会改变。"],
    vi_c: ["Mình nói thật nha, nếu cái này tiếp tục xảy ra thì mình không biết mình có thể ở lại không. Không phải dọa, mình đang nói thật.", "Mình muốn chúng ta sửa được cái này. Nên mình nói thẳng."],
    en_c: ["I need you to hear this — if things don't change, I won't be able to keep doing this. Not a threat, just real.", "I'm telling you because I want this to work. But it has to actually change."],
    zh_c: ["我需要你认真听：如果情况不改变，我真的撑不下去了。不是威胁，就是实话。", "我说这些是因为我希望我们能好。但事情真的得改变。"],
  },
  {
    tag: "Relationships", group: "Động lực quyền lực & thao túng",
    situation: "Nhận ra mình đang bị thao túng cảm xúc — nhưng người kia không nhận ra họ đang làm vậy",
    approach: "Đặt tên cho hành vi cụ thể, không gán nhãn nhân cách, nêu rõ tác động lên mình.",
    vi: ["Khi bạn nói... mình cảm thấy bị đẩy vào góc buộc phải chọn. Mình không chắc bạn có ý định đó — nhưng đó là điều mình đang trải qua.", "Pattern mình đang thấy là... và nó khiến mình khó tin tưởng vào cuộc trò chuyện này."],
    en: ["When you say things like that, I end up feeling cornered — I don't think that's your intention, but that's what happens for me.", "I've noticed a pattern in how we talk about this, and it's making it hard for me to feel safe being honest."],
    zh: ["每次你那样说话，我都感觉被逼到了墙角——我不觉得你是故意的，但这就是我的感受。", "我注意到我们谈到这件事时有一种模式，让我很难放心地说真话。"],
    vi_c: ["Bạn có thể không nhận ra, nhưng khi nói vậy mình cảm thấy bị dồn vào góc tường ấy.", "Mình cảm thấy mỗi lần mình nói không là lại có gì đó xảy ra. Nói chuyện này khó khăn hơn mình muốn."],
    en_c: ["You might not realize it, but when you do that, I end up feeling trapped.", "Every time I say no, something like this happens. It's making it hard to be open with you."],
    zh_c: ["你可能没意识到，但你那样做的时候，我感觉被困住了。", "每次我说不，就会发生这种事。这让我很难对你坦诚。"],
  },
  {
    tag: "Relationships", group: "Động lực quyền lực & thao túng",
    situation: "Bị dùng im lặng (silent treatment) như công cụ trừng phạt",
    approach: "Không cầu xin, không leo thang. Đặt tên cho hành vi, giữ bình tĩnh.",
    vi: ["Mình nhận ra bạn đang không nói chuyện với mình. Khi bạn sẵn sàng nói, mình ở đây — nhưng mình sẽ không tiếp tục đoán hoặc xin lỗi khi mình không biết mình đã làm gì.", "Im lặng không giải quyết được vấn đề. Mình muốn nói chuyện — khi bạn sẵn sàng."],
    en: ["I see that you're not talking to me right now. Whenever you're ready to talk, I'm here — but I'm not going to keep guessing or apologizing in the dark.", "Silence doesn't resolve this. I want to talk when you're ready — but I'm not going to chase."],
    zh: ["我看到你现在不跟我说话。你准备好的时候我在——但我不会继续猜测或者在不知道自己做了什么的情况下道歉。", "沉默解决不了我们之间的问题。你准备好了随时可以聊——但我不会去追着你。"],
    vi_c: ["Mình thấy bạn đang không nói chuyện với mình. Khi nào bạn muốn nói thì mình đây, nhưng mình không xin lỗi lung tung khi không biết mình làm gì sai.", "Mình không đuổi theo bạn được. Sẵn sàng thì nói chuyện."],
    en_c: ["I notice you've gone silent. I'm here when you're ready — but I'm not going to beg.", "Okay, I'll give you space. But we do need to talk eventually."],
    zh_c: ["我看到你在冷处理。你准备好了我在——但我不会去求你。", "我给你空间。但我们最终还是得谈一谈。"],
  },
  {
    tag: "Relationships", group: "Động lực quyền lực & thao túng",
    situation: "Người khác liên tục dùng câu 'mình chỉ đang nói thật' để nói những điều tàn nhẫn",
    approach: "Phân biệt giữa thẳng thắn và thiếu tôn trọng.",
    vi: ["Mình đánh giá cao sự thẳng thắn. Nhưng mình nghĩ có sự khác biệt giữa nói thật và nói theo cách gây tổn thương.", "Thẳng thắn và thiếu tế nhị không phải là một."],
    en: ["I appreciate honesty — and I think there's a difference between being honest and being unkind. That landed as unkind.", "Being blunt and being cruel aren't the same thing. What you said may have been true — but the way you said it wasn't okay."],
    zh: ["我很欣赏直接，但我觉得直接和伤害人是两回事。那句话让我感觉很受伤。", "坦率和刻薄不是一回事。你说的话也许是真的，但你说的方式不对。"],
    vi_c: ["'Nói thật' không có nghĩa là nói theo kiểu đó được đâu bạn ơi.", "Thật thì oke, nhưng nói thật theo kiểu đó thì khác chuyện rồi."],
    en_c: ["Just because something is true doesn't mean you get to say it like that.", "'I'm just being honest' isn't a pass to be mean about it."],
    zh_c: ["说真话没问题，但不是什么话都能那样说出口的。", "'我只是说实话'不是刻薄的理由。"],
  },

  // ─── MENTAL ─────────────────────────────────────────────────────────────────
  {
    tag: "Mental", group: "Mất mát & chữa lành",
    situation: "Đồng hành với ai đó đang đau buồn (mất người thân, chia tay, thất bại lớn)",
    approach: "Không cố an ủi hay tìm mặt tích cực ngay. Chỉ cần có mặt và thừa nhận sự mất mát là thật.",
    vi: ["Mình rất tiếc. Điều này thật sự rất đau.", "Mình không có từ nào đủ. Mình chỉ muốn bạn biết mình ở đây."],
    en: ["I'm so sorry. There's nothing I can say to make this better, so I'm just going to be here.", "You don't have to be strong right now. I've got you."],
    zh: ["我很遗憾。我没有什么话能让这件事好受一点，所以我就陪着你。", "你现在不用坚强。我在这。"],
    vi_c: ["Mình không biết nói gì, nhưng mình ở đây với bạn.", "Thôi cứ khóc đi, mình ngồi đây. Không cần phải làm gì hết."],
    en_c: ["I don't know what to say. I'm just here.", "Take all the time you need. I'm not going anywhere."],
    zh_c: ["我不知道说什么好，就是想陪着你。", "你慢慢来，我哪儿也不去。"],
  },
  {
    tag: "Mental", group: "Mất mát & chữa lành",
    situation: "Bản thân đang đau buồn và người khác cứ nói 'cần phải vượt qua đi'",
    approach: "Không buộc bản thân phải hồi phục theo timeline của người khác.",
    vi: ["Mình đang trong quá trình của mình. Điều đó không có lịch trình.", "Mình không cần phải ổn nhanh hơn để người khác cảm thấy dễ chịu hơn."],
    en: ["I'm going through it at my own pace. Grief doesn't run on a schedule.", "I don't need to be over this faster so that other people feel comfortable."],
    zh: ["我在按自己的节奏走这段路。悲伤没有时间表。", "我不需要为了让别人舒服而假装更快走出来。"],
    vi_c: ["Mình chưa ổn được, và mình chưa cần ổn ngay bây giờ.", "Không ai set deadline cho chuyện này được hết nha."],
    en_c: ["I'm not over it yet and that's okay. There's no deadline on this.", "I'll move on when I move on. Let me do it at my own pace."],
    zh_c: ["我还没好，这没什么问题。这种事没有时间表。", "我会走出来的，但要按我自己的节奏。"],
  },
  {
    tag: "Mental", group: "Mất mát & chữa lành",
    situation: "Tha thứ cho ai đó đã làm tổn thương mình — không phải vì họ xứng đáng",
    approach: "Tha thứ là buông bỏ gánh nặng để mình được tự do, không phải để họ thoát tội.",
    vi: ["Mình không tha thứ vì điều họ làm là đúng. Mình tha thứ để mình không còn phải mang điều đó theo.", "Tha thứ không có nghĩa là mình phải giữ họ trong cuộc sống của mình."],
    en: ["Forgiving you isn't about saying what you did was okay. It's about not letting it keep taking up space in me.", "I can forgive you and still choose not to have you in my life."],
    zh: ["原谅你不是说你做的是对的。而是不让这件事继续占据我的内心。", "我可以原谅你，同时也选择你不在我的生活里。"],
    vi_c: ["Mình không tha vì bạn đúng. Mình tha vì mình không muốn mang cái này mãi nữa.", "Tha thứ không có nghĩa là mình phải tiếp tục chịu đựng bạn đâu nhé."],
    en_c: ["I'm not forgiving you because what you did was fine. I'm doing it for myself.", "Forgiving you doesn't mean I want you back in my life."],
    zh_c: ["我原谅你不是因为你没错，而是因为我不想继续背着这件事。", "原谅你不等于我还想跟你有关系。"],
  },
  {
    tag: "Mental", group: "Mất mát & chữa lành",
    situation: "Ai đó xin lỗi nhưng mình chưa sẵn sàng tha thứ",
    approach: "Không giả vờ ổn để làm người kia cảm thấy dễ chịu. Trung thực về trạng thái của mình.",
    vi: ["Mình nghe thấy lời xin lỗi của bạn. Và mình cần thời gian để xử lý. Điều đó không có nghĩa là mình không bao giờ tha thứ — chỉ là chưa phải bây giờ.", "Mình chỉ chưa ở chỗ có thể nói 'không sao' ngay lúc này."],
    en: ["I hear your apology. I'm not ready to say it's okay yet — and that's where I'm at right now.", "Thank you for saying that. I need more time. I'm not withholding it forever, I just can't get there today."],
    zh: ["我听到你道歉了。我还没准备好说没关系——这就是我现在的状态。", "谢谢你说这些。我需要多一点时间。我不是要永远不原谅，只是今天还做不到。"],
    vi_c: ["Mình nghe bạn xin lỗi rồi. Nhưng mình cần thêm thời gian để xử lý, chưa ổn được ngay.", "Cảm ơn vì đã nói. Mình chưa sẵn sàng nói 'không sao' được — mình cần thêm thời gian."],
    en_c: ["I hear you. I'm just not there yet.", "Thanks for the apology. I need a little more time before I can say we're good."],
    zh_c: ["我听到了，只是我还没准备好说没事。", "谢谢你道歉，但我需要多一点时间才能真正释怀。"],
  },
  {
    tag: "Mental", group: "Mất mát & chữa lành",
    situation: "Đối mặt với một phần của quá khứ mình đã né tránh từ lâu",
    approach: "Tiếp cận từng phần, với sự tự trắc ẩn.",
    vi: ["Mình đã tránh điều này vì nó quá đau. Hôm nay mình có thể nhìn vào một phần nhỏ thôi.", "Nếu người bạn thân nhất của mình đang trải qua điều này, mình sẽ nói gì với họ? Mình cần nói điều đó với chính mình."],
    en: ["I've been avoiding this because it's too much to look at all at once. Today I'll just look at one piece of it.", "What would I say to my closest friend in this situation? I need to say that to myself."],
    zh: ["我一直在回避这件事，因为一次面对太多了。今天就看一小部分。", "如果我最好的朋友经历这件事，我会对他们说什么？我需要对自己说那些话。"],
    vi_c: ["Thôi, cứ nhìn vào từng phần nhỏ thôi, không cần giải quyết hết ngay.", "Mình sẽ không judge bản thân vì chuyện này. Mình cũng cần được nhẹ nhàng với chính mình."],
    en_c: ["I'll just take a small look at this today. Not the whole thing.", "I need to stop being so hard on myself about this."],
    zh_c: ["今天就看一小部分，不用一下子面对所有的。", "我得对自己温柔一点，不能再这么苛责自己了。"],
  },
  {
    tag: "Mental", group: "Bản sắc & áp lực xã hội",
    situation: "Bị áp lực phải thay đổi bản thân để 'phù hợp hơn' trong môi trường mới",
    approach: "Phân biệt giữa thích nghi có ý thức và xói mòn bản sắc.",
    vi: ["Mình có thể học cách hoạt động hiệu quả trong môi trường này mà không cần từ bỏ những điều mình tin là quan trọng.", "Mình sẵn sàng thay đổi cách mình giao tiếp — nhưng không sẵn sàng thay đổi điều mình đứng cho."],
    en: ["I can learn to operate in this environment without giving up the things that actually matter to me.", "I'll adapt my style. I won't change what I stand for."],
    zh: ["我可以学习怎么在这个环境里运作，而不用放弃对我真正重要的东西。", "我可以调整我的风格，但不会改变我的立场。"],
    vi_c: ["Mình có thể thích nghi với chỗ này, nhưng không phải đến mức thay đổi luôn con người mình.", "Học cách hòa nhập được, nhưng mà đánh mất bản thân thì không được."],
    en_c: ["I can fit in here without losing myself.", "I'll adjust, but I'm not changing who I am."],
    zh_c: ["我可以融入，但不是彻底变成另一个人。", "我可以适应，但不会改变我是谁。"],
  },
  {
    tag: "Mental", group: "Bản sắc & áp lực xã hội",
    situation: "Nhận ra mình đang sống theo kịch bản của người khác viết cho mình",
    approach: "Tạo không gian tĩnh lặng để nghe giọng nói bên trong — không phải giọng nói của kỳ vọng.",
    vi: ["Câu hỏi mình cần hỏi không phải 'mình nên làm gì' — mà là 'nếu không ai quan tâm và không có hậu quả, mình sẽ chọn gì?'", "Mình đã sống rất giỏi theo những gì được kỳ vọng. Bây giờ mình cần bắt đầu tò mò về điều mình thực sự muốn."],
    en: ["The question isn't 'what should I do?' It's 'if no one had an opinion and there were no consequences, what would I actually choose?'", "I've gotten very good at living up to expectations. I have no idea what I actually want. That's where I need to start."],
    zh: ["问题不是'我应该做什么'，而是'如果没人有意见、没有后果，我真正会选什么？'", "我很擅长活在别人的期待里。但我不知道自己真正想要什么——这才是我需要搞清楚的起点。"],
    vi_c: ["Mình làm giỏi những gì người khác muốn. Nhưng mình muốn gì thì mình cũng chưa biết nữa.", "Nếu không ai nhìn, không ai phán xét — mình sẽ chọn gì?"],
    en_c: ["I've been so focused on what I'm supposed to do that I forgot to figure out what I actually want.", "If there were no expectations and no judgment, what would I actually choose?"],
    zh_c: ["我一直在做'应该做'的事，都忘了自己真正想要什么了。", "如果没有期待、没有评判，我真的会选什么？"],
  },
  {
    tag: "Mental", group: "Bản sắc & áp lực xã hội",
    situation: "Quan điểm của mình thay đổi đáng kể và người quen cũ không chấp nhận 'phiên bản mới'",
    approach: "Không xin lỗi vì sự thay đổi, không phòng thủ.",
    vi: ["Mình đã thay đổi — không phải vì mình đã sai trước đó, mà vì mình đã học được nhiều hơn.", "Mình không đòi bạn phải đồng ý — mình chỉ cần bạn chấp nhận rằng đây là mình bây giờ."],
    en: ["I've changed. That's not a betrayal of who I was — it's just what learning looks like.", "I'm not asking you to agree with me. I'm just asking you to accept that this is who I am now."],
    zh: ["我变了。这不是对过去那个我的背叛——这就是成长的样子。", "我不要求你赞同我。我只是希望你能接受，这就是现在的我。"],
    vi_c: ["Mình đã thay đổi, và mình không xin lỗi vì điều đó.", "Mình khác rồi, và đó không phải chuyện xấu."],
    en_c: ["I've changed and I'm not apologizing for it.", "This is who I am now. Take it or leave it."],
    zh_c: ["我变了，我不会为此道歉。", "这就是现在的我，接不接受是你的事。"],
  },
  {
    tag: "Mental", group: "Tự nhận thức sâu",
    situation: "Nhận ra mình đang cố gắng kiểm soát người khác vì lo lắng",
    approach: "Thừa nhận sự kiểm soát đến từ sợ hãi. Tách biệt lo lắng của mình ra khỏi quyền tự chủ của người kia.",
    vi: ["Mình đang lo lắng và đang cố kiểm soát tình huống để cảm thấy an toàn hơn. Đó là của mình — không phải trách nhiệm của bạn.", "Mình cần dừng lại và tin tưởng bạn hơn."],
    en: ["I realize I'm trying to control this situation because I'm scared. That's my issue — not something you need to manage for me.", "I'm going to back off. I've been making my anxiety your problem, and that's not fair."],
    zh: ["我意识到我是因为害怕才想掌控这件事。这是我的问题，不需要你来替我管。", "我会退一步。我一直在把我的焦虑变成你的负担，这样不公平。"],
    vi_c: ["Mình cần thả ra, mình đang kiểm soát quá mức vì mình đang lo thôi.", "Okay, mình đang lo. Nhưng mà lo thì không có nghĩa là mình được kiểm soát bạn."],
    en_c: ["I need to back off. I'm controlling because I'm anxious, not because you need me to.", "My anxiety is not your problem to manage. I'm going to work on that."],
    zh_c: ["我得放手了。我是因为焦虑才想控制，不是因为你真的需要我管。", "我的焦虑不应该变成你的负担，我得自己处理好。"],
  },
  {
    tag: "Mental", group: "Mâu thuẫn nội tâm phức tạp",
    situation: "Nhận ra mình đã sai nhưng phần tự ái không muốn thừa nhận",
    approach: "Chọn hành động dựa trên giá trị, không phải tự ái.",
    vi: ["Có một phần mình đang phòng thủ rất mạnh. Và đằng sau đó, mình biết thật sự chuyện gì đang xảy ra.", "Tự ái của mình đang la hét. Nhưng phần còn lại biết mình cần làm gì."],
    en: ["Part of me is fighting hard not to admit this. But underneath that, I know exactly what happened.", "My ego is very loud right now. My conscience is louder."],
    zh: ["我内心有一部分在拼命抵抗，不想承认。但在那之下，我清楚地知道发生了什么。", "我的自尊现在很吵。但我的良知更大声。"],
    vi_c: ["Cái tôi của mình đang cố bào chữa lắm. Nhưng mà mình biết mình sai rồi.", "Thôi, swallow the pride đi, mình đã sai thật."],
    en_c: ["My ego is doing somersaults trying to avoid this. But yeah, I was wrong.", "Okay, pride aside — I messed up."],
    zh_c: ["我的自尊在拼命找借口，但我心里清楚，我确实错了。", "好了，把自尊放一边——我搞错了。"],
  },
  {
    tag: "Mental", group: "Mâu thuẫn nội tâm phức tạp",
    situation: "Muốn giúp ai đó nhưng nhận ra 'giúp đỡ' của mình thực ra đang phục vụ nhu cầu của chính mình",
    approach: "Tự hỏi thành thật: mình đang giúp vì họ cần, hay vì mình cần được cần đến?",
    vi: ["Mình muốn giúp bạn. Nhưng mình cũng cần kiểm tra lại: mình đang làm điều này vì bạn, hay vì mình?", "Trước khi mình tiếp tục, mình muốn hỏi bạn: bạn có thực sự cần mình vào đây không?"],
    en: ["I want to help. But I need to check myself — am I doing this for you, or because I need to feel useful?", "Before I jump in, do you actually want my help here? Or am I inserting myself because I'm uncomfortable watching?"],
    zh: ["我想帮你。但我需要先问问自己——我这样做是为了你，还是因为我需要感觉自己有用？", "在我介入之前，你真的需要我帮忙吗？还是我只是因为看着难受所以想进来？"],
    vi_c: ["Mình muốn giúp, nhưng mình cần tự hỏi: cái này vì bạn hay vì mình cần được cần đến?", "Bạn có cần mình giúp không, hay mình đang tự nhảy vào vì mình uncomfortable khi đứng nhìn?"],
    en_c: ["Honestly, am I helping because you need it or because I need to feel needed?", "Do you actually want my help or am I just inserting myself?"],
    zh_c: ["说实话，我是因为你需要才帮，还是因为我自己需要被需要？", "你真的需要我帮吗？还是我只是自己跳进来的？"],
  },
];

const TAGS = ["All", "Self", "Communication", "Conflict", "Work", "Relationships", "Mental"];

const tagColors = {
  Self:          { bg: "#EEF2FF", text: "#4F46E5", border: "#C7D2FE" },
  Communication: { bg: "#F0FDF4", text: "#16A34A", border: "#BBF7D0" },
  Conflict:      { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  Work:          { bg: "#FDF4FF", text: "#7E22CE", border: "#E9D5FF" },
  Relationships: { bg: "#FFF1F2", text: "#BE123C", border: "#FECDD3" },
  Mental:        { bg: "#F0F9FF", text: "#0369A1", border: "#BAE6FD" },
};

// Single language column: formal phrases then a divider then casual phrases
const LangCol = ({ formal, casual, borderColor, bgColor, textColor }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    {formal.map((p, i) => (
      <div key={i} style={{
        fontSize: 12, color: textColor, lineHeight: 1.6,
        borderLeft: `3px solid ${borderColor}`, background: bgColor,
        padding: "6px 10px", borderRadius: "0 6px 6px 0", fontStyle: "italic",
      }}>"{p}"</div>
    ))}
    <div style={{ borderTop: "1px dashed #E5E7EB", margin: "1px 0" }} />
    {casual.map((p, i) => (
      <div key={i} style={{
        fontSize: 12, color: "#52525B", lineHeight: 1.6,
        borderLeft: "3px solid #CBD5E1", background: "#F8FAFC",
        padding: "6px 10px", borderRadius: "0 6px 6px 0",
      }}>"{p}"</div>
    ))}
  </div>
);

export default function EQTable() {
  const [activeTag, setActiveTag] = useState("All");
  const filtered = activeTag === "All" ? data : data.filter(d => d.tag === activeTag);

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#F8F9FB", minHeight: "100vh", padding: "24px 16px" }}>

      {/* Header */}
      <div style={{ maxWidth: 1500, margin: "0 auto 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>🧠</span>
          <h1 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: "#111827" }}>High-EQ Response Guide</h1>
        </div>
        <p style={{ margin: "0 0 14px", color: "#6B7280", fontSize: 12.5 }}>
          {data.length} situations · 🇻🇳 Vietnamese · 🇬🇧 English · 🇨🇳 中文
          <span style={{ marginLeft: 10, padding: "2px 8px", background: "#F1F5F9", borderRadius: 8, fontSize: 11, color: "#64748B" }}>Italic = High-EQ · Plain = Casual/Thân</span>
        </p>

        {/* Tag filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {TAGS.map(tag => {
            const c = tagColors[tag];
            const isActive = activeTag === tag;
            const count = tag === "All" ? data.length : data.filter(d => d.tag === tag).length;
            return (
              <button key={tag} onClick={() => setActiveTag(tag)} style={{
                padding: "5px 12px", borderRadius: 20, cursor: "pointer", fontSize: 12,
                fontWeight: isActive ? 700 : 500,
                border: isActive ? `1.5px solid ${c?.border || "#D1D5DB"}` : "1.5px solid #E5E7EB",
                background: isActive ? (c?.bg || "#F3F4F6") : "#fff",
                color: isActive ? (c?.text || "#374151") : "#6B7280",
                transition: "all 0.15s", display: "flex", alignItems: "center", gap: 5,
              }}>
                {tag}
                <span style={{ fontSize: 9.5, fontWeight: 700, borderRadius: 10, padding: "0 5px",
                  background: isActive ? (c?.border || "#E5E7EB") : "#F3F4F6",
                  color: isActive ? (c?.text || "#6B7280") : "#9CA3AF" }}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div style={{ maxWidth: 1500, margin: "0 auto" }}>
        {/* Column headers */}
        <div style={{ display: "grid", gridTemplateColumns: "200px 190px 1fr 1fr 1fr", gap: "0 12px", padding: "5px 14px", marginBottom: 4 }}>
          {["Tình huống", "Cách xử lý", "🇻🇳 Sample Việt", "🇬🇧 Sample EN", "🇨🇳 Sample 中文"].map((h, i) => (
            <span key={i} style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</span>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map((row, idx) => {
            const c = tagColors[row.tag] || { bg: "#F9FAFB", text: "#6B7280", border: "#E5E7EB" };
            return (
              <div key={idx} style={{
                background: "#fff", borderRadius: 12,
                border: "1px solid #E5E7EB", borderLeft: `3px solid ${c.border}`,
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "200px 190px 1fr 1fr 1fr", gap: "0 12px", padding: "13px 14px", alignItems: "start" }}>

                  {/* Situation */}
                  <div>
                    <span style={{
                      display: "inline-block", fontSize: 9, fontWeight: 700,
                      color: c.text, background: c.bg, border: `1px solid ${c.border}`,
                      padding: "2px 7px", borderRadius: 7, marginBottom: 6,
                      textTransform: "uppercase", letterSpacing: "0.04em",
                    }}>{row.tag} · {row.group}</span>
                    <p style={{ margin: 0, fontSize: 12.5, fontWeight: 600, color: "#111827", lineHeight: 1.45 }}>{row.situation}</p>
                  </div>

                  {/* Approach */}
                  <p style={{ margin: 0, fontSize: 11.5, color: "#4B5563", lineHeight: 1.7 }}>{row.approach}</p>

                  {/* VI */}
                  <LangCol formal={row.vi} casual={row.vi_c} borderColor="#DC2626" bgColor="#FFF5F5" textColor="#1F2937" />
                  {/* EN */}
                  <LangCol formal={row.en} casual={row.en_c} borderColor="#1D4ED8" bgColor="#EFF6FF" textColor="#1E3A5F" />
                  {/* ZH */}
                  <LangCol formal={row.zh} casual={row.zh_c} borderColor="#B91C1C" bgColor="#FEF2F2" textColor="#7F1D1D" />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", color: "#D1D5DB", fontSize: 11, marginTop: 16 }}>
          {filtered.length} / {data.length} situations
        </div>
      </div>
    </div>
  );
}
