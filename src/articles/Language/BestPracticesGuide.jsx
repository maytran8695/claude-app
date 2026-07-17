import React, { useState, useRef, useEffect, useMemo } from "react";

const SECTIONS = [{"kind": "section", "title": "Tóm tắt điều hành", "groups": [{"title": "", "items": [{"type": "callout", "text": "Tài liệu này chắt lọc từ các công trình nền tảng của SLA (Second Language Acquisition) và khoa học nhận thức: Krashen, Long, Swain, Nation, Laufer & Schmitt, Roediger & Karpicke, Bjork, Pan & Rickard, cùng các nghiên cứu chuyên biệt về người Việt học tiếng Anh và tiếng Trung. Mục tiêu: cung cấp cơ sở khoa học VỮNG, rồi rút ra hành động cụ thể, đòn bẩy cao.", "color": "1F3A5F"}, {"type": "note", "text": "Nếu chị chỉ đọc một trang, hãy đọc trang này. Đây là 8 phát hiện có sức nặng bằng chứng lớn nhất, sắp theo mức độ đòn bẩy."}, {"type": "labeled", "label": "1. Input dễ hiểu là nền móng", "text": "ngôn ngữ được tiếp thu chủ yếu qua việc HIỂU input ở mức 95–98% (Krashen; Nation). Dưới ngưỡng đó, não quá tải và không học được.", "color": "0F6E6E"}, {"type": "labeled", "label": "2. Nhớ được là nhờ TRUY XUẤT, không phải đọc lại", "text": "tự nhớ lại (retrieval/active recall) mạnh hơn đọc lại nhiều lần. Roediger & Karpicke (2006): nhóm truy xuất chỉ quên 13% sau 2 ngày, nhóm đọc lại quên tới 56%.", "color": "0F6E6E"}, {"type": "labeled", "label": "3. Giãn cách đánh bại nhồi nhét", "text": "cùng số giờ, chia nhỏ theo ngày (spaced) cho trí nhớ dài hạn vượt trội so với học dồn một lúc (massed). Đây là hiệu ứng vững chắc nhất trong khoa học trí nhớ.", "color": "0F6E6E"}, {"type": "labeled", "label": "4. Khó 'vừa phải' mới tạo học sâu", "text": "desirable difficulties (Bjork): điều kiện học hơi khó — tự tạo câu trả lời, xen kẽ chủ đề, giãn cách — cho kết quả dài hạn tốt hơn dù cảm giác lúc học chậm và khó chịu hơn.", "color": "0F6E6E"}, {"type": "labeled", "label": "5. Nói/viết (output) ép não 'nhận ra lỗ hổng'", "text": "Swain: khi buộc phải tạo ra ngôn ngữ, người học nhận ra mình thiếu gì và tái cấu trúc kiến thức. Chỉ nghe hiểu là chưa đủ để nói giỏi.", "color": "0F6E6E"}, {"type": "labeled", "label": "6. Tương tác + đàm phán nghĩa tăng tốc tiếp thu", "text": "Long: hội thoại thật (hỏi lại, làm rõ, diễn đạt lại) biến input thành intake nhanh hơn học thụ động.", "color": "0F6E6E"}, {"type": "labeled", "label": "7. Từ vựng có NGƯỠNG rõ ràng", "text": "Nation: ~2.000–3.000 word families đủ giao tiếp cơ bản; ~8.000–9.000 để đọc trôi chảy văn bản thật (98% coverage). Đây là mục tiêu định lượng được.", "color": "0F6E6E"}, {"type": "labeled", "label": "8. Cảm xúc là cái van", "text": "Krashen (affective filter) & nghiên cứu WTC: lo lắng cao chặn input biến thành intake; động lực là yếu tố dự báo trực tiếp mạnh nhất cho việc dám giao tiếp.", "color": "0F6E6E"}, {"type": "callout", "text": "Chẩn đoán nhanh cho người Việt: bottleneck lớn nhất thường KHÔNG phải thiếu giờ học, mà là (a) học thụ động thay vì truy xuất chủ động, (b) nhồi nhét thay vì giãn cách, và (c) né output vì lo lắng. Ba đòn bẩy này sửa được ngay mà không tốn thêm giờ.", "color": "9A6A00"}, {"type": "callout", "text": "NGUYÊN TẮC BAO TRÙM: Mọi lý thuyết trong tài liệu này chỉ có giá trị KHI ĐƯỢC THỰC HÀNH. Đọc hiểu 8 nguyên lý không làm bạn giỏi thêm một chút nào — chỉ có việc áp dụng đều đặn, lặp lại, và duy trì bền bỉ qua nhiều tháng mới tạo ra năng lực thật. Kiến thức là bản đồ; thực hành là quãng đường. Không ai đến đích bằng cách ngắm bản đồ.", "color": "9E2A2B"}], "isBP": false}, {"title": "Nguồn tham khảo", "items": [{"type": "note", "text": "Các công trình nền tảng được tổng hợp trong tài liệu này. Chi tiết đầy đủ có thể tra cứu qua tên tác giả + năm."}, {"type": "h3", "text": "Input & Tương tác"}, {"type": "bullet", "text": "Krashen, S. (1982, 1985) — Input Hypothesis, Affective Filter, Monitor Model.", "level": 0}, {"type": "bullet", "text": "Long, M. (1996) — Interaction Hypothesis, negotiation for meaning.", "level": 0}, {"type": "bullet", "text": "Swain, M. (1985, 2005) — Comprehensible Output Hypothesis.", "level": 0}, {"type": "bullet", "text": "VanPatten, B. (1990) — attention & cognitive load in input processing.", "level": 0}, {"type": "h3", "text": "Từ vựng"}, {"type": "bullet", "text": "Nation, I.S.P. (2006) — vocabulary size for reading/listening (8.000–9.000 word families).", "level": 0}, {"type": "bullet", "text": "Laufer, B. & Ravenhorst-Kalovski (2010) — lexical threshold 95%/98%.", "level": 0}, {"type": "bullet", "text": "Schmitt, N. (2008); Cobb, T. (2007) — coverage thresholds & limits of incidental learning.", "level": 0}, {"type": "h3", "text": "Khoa học trí nhớ"}, {"type": "bullet", "text": "Roediger, H. & Karpicke, J. (2006) — testing effect (13% vs 56% forgetting).", "level": 0}, {"type": "bullet", "text": "Karpicke, J. & Blunt (2011, Science) — retrieval > concept mapping.", "level": 0}, {"type": "bullet", "text": "Cepeda et al. (2006); Pan, S. & Rickard (2018) — spacing effect meta-analyses.", "level": 0}, {"type": "bullet", "text": "Bjork, R. (1994); Soderstrom & Bjork (2015) — desirable difficulties; Rowland (2014) — retrieval meta-analysis; Pan et al. (2019) — interleaving.", "level": 0}, {"type": "h3", "text": "Đặc thù người Việt"}, {"type": "bullet", "text": "Nguyen (2007); Bui et al. (2021); Tran & Nguyen (2022) — lỗi phát âm âm cuối tiếng Anh của người Việt.", "level": 0}, {"type": "bullet", "text": "Pelzl et al.; Wu & Hu (2004) — người Việt học thanh điệu tiếng Trung (lợi thế T3; khó T1/T4).", "level": 0}, {"type": "bullet", "text": "MacIntyre et al. (1998) — mô hình WTC; Lee & Hsieh (2019) — động lực & WTC.", "level": 0}, {"type": "note", "text": "Tài liệu tổng hợp mang tính giáo dục, chắt lọc từ các nghiên cứu công khai. Với chi tiết học thuật đầy đủ, nên đọc trực tiếp bản gốc của từng tác giả.", "color": "777777"}], "isBP": false}]}, {"kind": "section", "title": "Nền tảng khoa học", "groups": [{"title": "", "items": [{"type": "p", "text": "Phần này trình bày các lý thuyết và bằng chứng cốt lõi. Mỗi mục nêu: nội dung, bằng chứng, và giới hạn/tranh luận — để chị nắm cơ chế trước khi áp dụng."}], "isBP": false}, {"title": "1. Giả thuyết Input dễ hiểu (Comprehensible Input — Krashen)", "items": [{"type": "h3", "text": "Nội dung"}, {"type": "p", "text": "Krashen (1982, 1985) cho rằng ta tiếp thu ngôn ngữ theo một cách chính: HIỂU được input ở mức hơi cao hơn trình độ hiện tại — công thức nổi tiếng \"i+1\". Việc học quy tắc ngữ pháp một cách có ý thức chỉ đóng vai trò \"màn hình kiểm soát\" (monitor), không tạo ra năng lực nói tự nhiên."}, {"type": "h3", "text": "Bằng chứng & con số"}, {"type": "bullet", "text": "Nghiên cứu SLA cho thấy người học cần hiểu khoảng 90–98% input để học tối ưu; dưới ngưỡng này, tải nhận thức (cognitive load, Sweller 1988) vượt quá khả năng xử lý của bộ nhớ làm việc.", "level": 0}, {"type": "bullet", "text": "VanPatten (1990): khi input quá khó, người học phải chia sự chú ý giữa hiểu nghĩa và phân tích cấu trúc, làm giảm cả hai.", "level": 0}, {"type": "bullet", "text": "So sánh giữa phương pháp dựa trên input và phương pháp dạy ngữ pháp truyền thống: theo tổng hợp của Krashen, nhóm input chưa bao giờ thua.", "level": 0}, {"type": "h3", "text": "Giới hạn & tranh luận (để cân bằng)"}, {"type": "note", "text": "Giới học thuật phê phán rằng chỉ input là KHÔNG ĐỦ. White (1987) và các nhà nghiên cứu tương tác cho rằng người học cũng cần output và phản hồi. Một số phê bình gần đây (neuro-ecological) lập luận rằng tiếp thu ngôn ngữ là quá trình chủ động, phụ thuộc tương tác và trải nghiệm, không chỉ 'tiêu thụ' input thụ động. Kết luận thực dụng: input dễ hiểu là ĐIỀU KIỆN CẦN nhưng chưa đủ — phải kết hợp output + tương tác (mục 3–4)."}], "isBP": false}, {"title": "2. Ngưỡng phủ từ vựng (Vocabulary Coverage — Nation, Laufer)", "items": [{"type": "h3", "text": "Nội dung"}, {"type": "p", "text": "Để hiểu một văn bản mà không bị gián đoạn liên tục bởi từ lạ, người đọc cần biết một tỷ lệ đủ lớn số từ trong văn bản đó (lexical coverage). Nghiên cứu xác định các ngưỡng rất cụ thể."}, {"type": "h3", "text": "Con số then chốt (tiếng Anh, word families)"}, {"type": "labeled", "label": "Giao tiếp cơ bản hằng ngày", "text": "~2.000–3.000 word families", "color": "2E5B94"}, {"type": "labeled", "label": "Đọc hiểu tổng quát (ngưỡng tối thiểu, 95% coverage)", "text": "~4.000–5.000 word families (Laufer & Ravenhorst-Kalovski 2010)", "color": "2E5B94"}, {"type": "labeled", "label": "Đọc trôi chảy văn bản thật, không cần từ điển (98% coverage, tối ưu)", "text": "~8.000–9.000 word families (Nation 2006)", "color": "2E5B94"}, {"type": "labeled", "label": "Nghe hiểu (98% coverage)", "text": "~6.000–7.000 word families — thấp hơn đọc vì khẩu ngữ dùng vốn từ hẹp hơn", "color": "2E5B94"}, {"type": "callout", "text": "Ý nghĩa thực dụng: từ vựng là mục tiêu ĐỊNH LƯỢNG ĐƯỢC. Ưu tiên học theo tần suất — 3.000 từ phổ biến nhất cho coverage ~95%; sau đó mỗi 1.000 từ tiếp theo cho lợi ích giảm dần nhưng vẫn cần cho 98%. Đừng học từ hiếm khi chưa nắm chắc lõi tần suất cao.", "color": "0F6E6E"}, {"type": "note", "text": "Lưu ý: Cobb & Schmitt chỉ ra rằng KHÔNG thể đạt 9.000 từ chỉ nhờ đọc ngẫu nhiên trong thời gian hợp lý, vì tần suất lặp lại của từ trong văn bản thật không đủ. => cần kết hợp học từ chủ đích (SRS) với đọc mở rộng."}], "isBP": false}, {"title": "3. Truy xuất chủ động & Hiệu ứng kiểm tra (Retrieval Practice / Testing Effect)", "items": [{"type": "h3", "text": "Nội dung"}, {"type": "p", "text": "Hành động cố NHỚ LẠI một thông tin (không nhìn đáp án) làm thay đổi và củng cố dấu vết trí nhớ mạnh hơn nhiều so với việc đọc lại thông tin đó. Mỗi lần truy xuất thành công khiến lần sau dễ nhớ hơn (Bjork & Bjork)."}, {"type": "h3", "text": "Bằng chứng & con số"}, {"type": "bullet", "text": "Roediger & Karpicke (2006): sau 2 ngày, nhóm chỉ đọc lại quên 56% những gì từng nhớ; nhóm luyện truy xuất chỉ quên 13%.", "level": 0}, {"type": "bullet", "text": "Karpicke & Blunt (2011, Science): truy xuất thắng cả sơ đồ khái niệm (concept mapping) — kể cả khi bài kiểm tra cuối là vẽ sơ đồ. Lợi ích đến từ chính hành vi nhớ lại, không phải xử lý sâu hơn.", "level": 0}, {"type": "bullet", "text": "Rowland (2014, meta-analysis): hiệu ứng truy xuất mạnh hơn khi tỷ lệ nhớ thành công ban đầu > ~75%. Tức là nên luyện ở mức 'khó nhưng làm được', không phải quá khó.", "level": 0}, {"type": "callout", "text": "Đòn bẩy #1 cho hầu hết người học: THAY 'đọc lại/nghe lại nhiều lần' bằng 'che đáp án và tự nhớ lại'. Cùng thời gian, kết quả dài hạn gấp nhiều lần. Đây là thay đổi rẻ nhất mà lợi ích lớn nhất.", "color": "9A6A00"}], "isBP": false}, {"title": "4. Hiệu ứng giãn cách (Spacing Effect / Distributed Practice)", "items": [{"type": "h3", "text": "Nội dung"}, {"type": "p", "text": "Cùng một lượng ôn tập, nếu TRẢI RA qua nhiều buổi cách nhau (spaced) sẽ cho trí nhớ dài hạn tốt hơn nhiều so với dồn vào một buổi (massed/cramming). Khoảng nghỉ để trí nhớ hơi phai đi rồi ôn lại chính là cơ chế củng cố."}, {"type": "h3", "text": "Bằng chứng & con số"}, {"type": "bullet", "text": "Cepeda và cộng sự (2006): giãn cách tăng khả năng ghi nhớ khoảng 10–30% so với học dồn.", "level": 0}, {"type": "bullet", "text": "Đây là một trong những hiệu ứng vững chắc và lặp lại được nhiều nhất trong toàn bộ nghiên cứu trí nhớ, đúng cho học từ vựng, tên gọi, đoạn văn.", "level": 0}, {"type": "bullet", "text": "Kết hợp 'giãn cách + truy xuất' = spaced retrieval, chính là nguyên lý vận hành của các phần mềm thẻ nhớ như Anki.", "level": 0}, {"type": "labeled", "label": "Quy tắc thực hành", "text": "thay 5 giờ học trong 1 ngày bằng 1 giờ/ngày trong 5 ngày (hoặc 30 phút/ngày trong 10 ngày). Chia nhỏ, đều đặn.", "color": "2E5B94"}], "isBP": false}, {"title": "5. Khó khăn đáng mong đợi (Desirable Difficulties — Bjork)", "items": [{"type": "h3", "text": "Nội dung"}, {"type": "p", "text": "Bjork (1994) chỉ ra nghịch lý: các điều kiện làm việc học CHẬM và KHÓ hơn trong ngắn hạn lại tạo trí nhớ và khả năng chuyển giao tốt hơn dài hạn. 'Hiệu suất lúc học' và 'việc học thật sự' có thể tách rời, thậm chí nghịch nhau."}, {"type": "h3", "text": "Bốn 'khó khăn đáng mong đợi' áp dụng được cho ngôn ngữ"}, {"type": "labeled", "label": "Giãn cách (spacing)", "text": "để trí nhớ hơi phai rồi ôn — mỗi lần khôi phục củng cố mạnh hơn.", "color": "2E6B3E"}, {"type": "labeled", "label": "Xen kẽ (interleaving)", "text": "trộn nhiều loại nội dung (ví dụ trộn thì/cấu trúc khác nhau) buộc não phân biệt — Pan et al. (2019) cho hiệu ứng phân biệt d = 0.67.", "color": "2E6B3E"}, {"type": "labeled", "label": "Tự tạo đáp án (generation effect)", "text": "tự nói/viết ra câu trước khi xem mẫu, mạnh hơn nhiều so với chỉ đọc câu mẫu.", "color": "2E6B3E"}, {"type": "labeled", "label": "Luyện tập biến đổi (varied practice)", "text": "dùng cùng cấu trúc trong nhiều bối cảnh khác nhau thay vì lặp một khuôn.", "color": "2E6B3E"}, {"type": "note", "text": "Cảnh báo của Bjork: KHÔNG phải mọi khó khăn đều tốt. Khó khăn phải thách thức đúng quá trình truy xuất/tái tạo (germane load), không phải khó do rối rắm vô ích (extraneous load). Ví dụ: đoán từ khi hoàn toàn thiếu nền tảng = khó vô ích, không học được gì. Cần đủ nền để vượt qua cái khó đó."}, {"type": "callout", "text": "'Ảo giác trôi chảy' (fluency illusion) là kẻ thù lớn nhất: đọc lại thấy 'quen' nên tưởng đã thuộc, nhưng quen ≠ nhớ được khi cần. Cảm giác dễ khi học thường tỷ lệ NGHỊCH với học sâu. Hãy tin vào phương pháp thấy hơi khó.", "color": "9A6A00"}], "isBP": false}, {"title": "6. Output & Tương tác (Output Hypothesis — Swain; Interaction — Long)", "items": [{"type": "h3", "text": "Nội dung"}, {"type": "p", "text": "Swain (1985): việc TẠO RA ngôn ngữ (nói/viết) ép người học chuyển từ xử lý nghĩa sang xử lý cấu trúc — họ 'nhận ra lỗ hổng' (noticing the gap) giữa điều muốn nói và điều nói được, rồi tái cấu trúc kiến thức. Long (1996): hội thoại thật, đặc biệt là 'đàm phán nghĩa' (negotiation for meaning) khi có hiểu lầm, biến input thành intake hiệu quả nhất."}, {"type": "h3", "text": "Cơ chế 'đàm phán nghĩa' — các nước đi cụ thể"}, {"type": "bullet", "text": "Yêu cầu làm rõ (clarification requests): \"Sorry, what do you mean by...?\"", "level": 0}, {"type": "bullet", "text": "Kiểm tra xác nhận (confirmation checks): \"So you mean...?\"", "level": 0}, {"type": "bullet", "text": "Kiểm tra hiểu (comprehension checks): \"Does that make sense?\"", "level": 0}, {"type": "bullet", "text": "Diễn đạt lại (modified output): tự sửa/nói lại chính xác hơn dựa trên phản hồi.", "level": 0}, {"type": "h3", "text": "Bằng chứng"}, {"type": "bullet", "text": "Mackey & Philp: người học tương tác có đàm phán nghĩa tiến bộ về cấu trúc rõ hơn nhóm chỉ nhận input.", "level": 0}, {"type": "bullet", "text": "Thú vị: một số nghiên cứu (Shehadeh 1999) thấy người học tự sửa NHIỀU HƠN khi nói với người học khác so với người bản xứ — nghĩa là không nhất thiết phải có người bản ngữ mới luyện nói hiệu quả.", "level": 0}, {"type": "callout", "text": "Hệ quả cho người sợ nói: bạn KHÔNG cần người bản xứ để bắt đầu. Nói với AI, với người học khác, hoặc tự nói to (self-talk) đều kích hoạt cơ chế 'nhận ra lỗ hổng'. Điều quan trọng là TẠO RA output, không phải chờ điều kiện hoàn hảo.", "color": "0F6E6E"}], "isBP": false}, {"title": "7. Yếu tố cảm xúc: Bộ lọc cảm xúc & Sự sẵn sàng giao tiếp (Affective Filter & WTC)", "items": [{"type": "h3", "text": "Nội dung"}, {"type": "p", "text": "Krashen (1985) — Affective Filter: cảm xúc tiêu cực (lo lắng, thiếu tự tin, thiếu động lực) hoạt động như một 'bộ lọc' chặn input biến thành intake, dù input có dễ hiểu đến đâu. MacIntyre và cộng sự (1998) — mô hình 'kim tự tháp' Willingness to Communicate (WTC): việc DÁM giao tiếp phụ thuộc nhiều tầng, từ tính cách, trạng thái cảm xúc đến động lực."}, {"type": "h3", "text": "Bằng chứng & con số"}, {"type": "bullet", "text": "Nghiên cứu SEM trên 627 học sinh (Trung Quốc, 2025): lo lắng ngoại ngữ (FLA) dự báo TIÊU CỰC rõ rệt cho sự sẵn sàng giao tiếp (WTC).", "level": 0}, {"type": "bullet", "text": "Lee & Hsieh (2019): ĐỘNG LỰC là yếu tố có ảnh hưởng trực tiếp DƯƠNG mạnh nhất lên WTC — và còn tác động gián tiếp qua việc nuôi cảm xúc tích cực.", "level": 0}, {"type": "bullet", "text": "Nghiên cứu trên sinh viên Đài Loan: động lực cao + lo lắng thấp là điều kiện cần để có WTC mạnh. Anxiety làm trung gian giữa động lực và việc dám nói.", "level": 0}, {"type": "callout", "text": "Hệ quả: hạ 'bộ lọc cảm xúc' là một đòn bẩy thật, không phải lời khuyên sáo rỗng. Môi trường ít rủi ro xã hội (nói với AI, nhóm nhỏ an toàn, ghi âm một mình) làm tăng WTC tức thời, giúp bạn nói nhiều hơn — và nói nhiều hơn chính là cách giỏi lên.", "color": "9A6A00"}], "isBP": false}]}, {"kind": "section", "title": "Chuyển di ngôn ngữ mẹ đẻ", "groups": [{"title": "", "items": [{"type": "p", "text": "Tiếng mẹ đẻ định hình cả điểm mạnh lẫn điểm yếu khi học ngoại ngữ (L1 transfer). Hiểu rõ điều này giúp chị tập trung công sức đúng chỗ thay vì luyện dàn trải."}], "isBP": false}, {"title": "A. Người Việt học TIẾNG ANH — các điểm nghẽn đã được nghiên cứu", "items": [{"type": "h3", "text": "1. Phụ âm cuối (final consonants) — điểm yếu số một"}, {"type": "p", "text": "Tiếng Việt hầu như không có phụ âm cuối bật hơi rõ như tiếng Anh, nên người Việt có xu hướng LƯỢC BỎ hoặc thay thế âm cuối. Nghiên cứu (Nguyen 2007; Bui et al. 2021; Tran & Nguyen 2022) chỉ ra:"}, {"type": "bullet", "text": "Hay lỗi nhất ở các âm cuối /s/, /z/, /ʃ/, /f/, /v/, /t/, /d/, /k/, /g/ — thường bị bỏ hẳn hoặc thay bằng âm gần giống.", "level": 0}, {"type": "bullet", "text": "Cụm phụ âm cuối (consonant clusters) như -sts, -kt, -ld đặc biệt khó vì tiếng Việt không có cấu trúc này.", "level": 0}, {"type": "bullet", "text": "Hệ quả trực tiếp: mất phân biệt số ít/số nhiều, thì quá khứ (-ed), và làm giảm độ dễ nghe (intelligibility).", "level": 0}, {"type": "h3", "text": "2. Cặp âm không tồn tại trong tiếng Việt"}, {"type": "bullet", "text": "/l/ và /r/: dễ lẫn, đôi khi /l/ → /n/ và /r/ → /z/ theo thói quen tiếng Việt.", "level": 0}, {"type": "bullet", "text": "Phân biệt hữu thanh/vô thanh (voiced/voiceless) ít được nhấn trong tiếng Việt nên dễ trộn.", "level": 0}, {"type": "h3", "text": "3. Trọng âm & ngữ điệu (stress & intonation)"}, {"type": "p", "text": "Tiếng Việt là ngôn ngữ thanh điệu theo âm tiết; tiếng Anh là ngôn ngữ trọng âm-nhịp (stress-timed) — nhấn từ quan trọng, lướt từ chức năng. Người Việt hay đọc đều các âm tiết, khiến nghe 'phẳng' và khó bắt nhịp khi nghe người bản xứ nói nhanh."}, {"type": "callout", "text": "Ưu tiên luyện âm cho người Việt (theo thứ tự đòn bẩy): (1) phụ âm cuối + cụm phụ âm cuối, (2) trọng âm câu & nối âm, (3) cặp /l/-/r/ và hữu thanh/vô thanh. Sửa đúng ba nhóm này cải thiện độ dễ nghe nhiều hơn là cố 'nói giọng bản xứ'.", "color": "0F6E6E"}], "isBP": false}, {"title": "B. Người Việt học TIẾNG TRUNG — lợi thế lớn & bẫy tinh vi", "items": [{"type": "h3", "text": "1. Lợi thế: nền thanh điệu sẵn có"}, {"type": "p", "text": "Tiếng Việt có 6 thanh, tiếng Trung phổ thông có 4 thanh + khinh thanh. Vì đã quen phân biệt cao độ (F0), người Việt có lợi thế rõ so với người nói ngôn ngữ phi thanh điệu (như tiếng Anh):"}, {"type": "bullet", "text": "Nghiên cứu (Pelzl et al.; ScienceDirect 2022) cho thấy người Việt nhạy với các thanh có đường nét lên/lượn — nên thanh 3 (thanh lượn xuống-lên) của tiếng Trung ít gây khó cho người Việt hơn so với người học phương Tây.", "level": 0}, {"type": "bullet", "text": "Người nói ngôn ngữ thanh điệu nhạy với ĐƯỜNG NÉT thanh (contour), trong khi người nói ngôn ngữ phi thanh điệu chỉ chú ý cao độ trung bình hay điểm cuối — đây là lợi thế thật của chị.", "level": 0}, {"type": "h3", "text": "2. Lợi thế lớn thứ hai: từ vựng Hán-Việt"}, {"type": "p", "text": "Kho từ Hán-Việt ánh xạ gần như từng hình vị sang chữ Hán: đại học = 大學 (dàxué), ngân hàng = 銀行 (yínháng), bác sĩ = 博士. Với văn bản học thuật/tin tức/tài chính, việc biết Hán-Việt là lợi thế lớn mà người học phương Tây không có — giúp đoán nghĩa và nhớ từ nhanh hơn nhiều."}, {"type": "callout", "text": "Đòn bẩy đặc biệt (với nền tài chính): rất nhiều thuật ngữ tài chính-kinh tế tiếng Trung là từ Hán gốc mà chị đã biết qua Hán-Việt. Học chủ động ánh xạ Hán-Việt ↔ 汉字 sẽ tăng tốc mảng từ vựng chuyên ngành đáng kể. Ví dụ: 投資 đầu tư, 利率 lãi suất, 通貨膨脹 thông (货)膨trướng.", "color": "9A6A00"}, {"type": "h3", "text": "3. Bẫy: 'tự tin sớm' đánh lừa"}, {"type": "p", "text": "Chính vì có lợi thế thanh điệu, người Việt dễ 'tự tin sớm' rồi mắc lỗi ở những điểm khác biệt tinh vi:"}, {"type": "bullet", "text": "Thanh 1 (cao-phẳng) và thanh 4 (cao xuống thấp) lại là nơi người Việt hay SAI NHIỀU NHẤT (Wu & Hu 2004) — vì thanh Việt không có cái nào phẳng-cao kéo dài đúng như thanh 1 tiếng Trung.", "level": 0}, {"type": "bullet", "text": "Biến điệu (tone sandhi): thanh 3 + thanh 3 → thanh 2 + thanh 3; '一' và '不' đổi thanh theo ngữ cảnh. Đây là quy tắc phải học riêng, không suy ra từ tiếng Việt.", "level": 0}, {"type": "bullet", "text": "Thanh tiếng Trung là đường nét cao độ THUẦN, còn thanh Việt dùng cả tắc thanh hầu (glottal stop) và giọng kẹt (creaky) — nên đừng bê nguyên 'cảm giác thanh' tiếng Việt sang.", "level": 0}, {"type": "note", "text": "Kết luận cân bằng: với tiếng Trung, người Việt nên tận dụng tối đa lợi thế thanh điệu + Hán-Việt ở giai đoạn đầu, nhưng chủ động 'phòng bẫy' bằng cách luyện riêng thanh 1, thanh 4, và các quy tắc biến điệu — những điểm mà lợi thế L1 không giúp được."}], "isBP": false}, {"title": "C. Cơ chế chuyển di & vì sao lỗi L1 \"dính\" (Perceptual filter)", "items": [{"type": "p", "text": "Hệ tri giác của người trưởng thành đã được \"điều chỉnh\" theo tiếng mẹ đẻ: nó tự động lọc bỏ những khác biệt âm thanh không có ý nghĩa trong L1. Vì tiếng Việt không phân biệt hữu thanh/vô thanh ở âm cuối, tai người Việt \"không nghe thấy\" khác biệt đó trong tiếng Anh — nên không tự sửa được nếu chỉ nghe thụ động."}, {"type": "labeled", "label": "Hệ quả then chốt", "text": "sản xuất (nói) đúng phụ thuộc vào tri giác (nghe) đúng trước. Nếu tai chưa phân biệt được /s/ vs /z/ cuối từ, miệng gần như không thể phát âm ổn định. Phải huấn luyện TAI trước, rồi miệng theo sau.", "color": "1F3A5F"}, {"type": "labeled", "label": "Bằng chứng", "text": "High Variability Phonetic Training (HVPT) — luyện phân biệt cặp tối thiểu (minimal pairs) từ NHIỀU giọng khác nhau — có hiệu ứng lớn lên tri giác âm L2 (meta-analysis 79 nghiên cứu: g ≈ 0.92), và cải thiện này chuyển một phần sang khả năng nói.", "color": "0F6E6E"}, {"type": "note", "text": "Vì sao \"nghe nhiều tự khắc giỏi\" thất bại với người Việt: nghe thụ động không ép tai phân biệt cái nó đã quen bỏ qua. Cần luyện tri giác CÓ CHỦ ĐÍCH (phân biệt cặp tối thiểu, có phản hồi đúng/sai) thì bộ lọc L1 mới nới ra."}]}, {"title": "D. Tiếng Anh — bản đồ lỗi & bài luyện chuyên sâu", "items": [{"type": "h3", "text": "Nhóm lỗi 1 — Âm cuối (ưu tiên cao nhất)"}, {"type": "bullet", "text": "Cặp tối thiểu luyện tri giác: rice/rise, back/bag, cap/cab, half/have, leaf/leave, seat/seed.", "level": 0}, {"type": "bullet", "text": "Cụm phụ âm cuối: asked /ɑːskt/, texts /teksts/, twelfth, clothes — luyện chậm từng âm rồi tăng tốc.", "level": 0}, {"type": "bullet", "text": "Ràng buộc ngữ pháp phụ thuộc âm cuối: -s số nhiều/ngôi thứ ba, -ed quá khứ. Bỏ âm cuối = mất luôn dấu hiệu ngữ pháp → nghe sai nghĩa.", "level": 0}, {"type": "h3", "text": "Nhóm lỗi 2 — Trọng âm & nhịp"}, {"type": "bullet", "text": "Tiếng Anh dồn nén âm tiết không trọng âm (weak forms): \"to\", \"for\", \"of\", \"and\" đọc lướt /ə/. Người Việt đọc rõ từng từ → mất nhịp stress-timed.", "level": 0}, {"type": "bullet", "text": "Luyện: gạch chân âm tiết nhấn trong câu, vỗ tay theo nhịp trọng âm (không theo số âm tiết).", "level": 0}, {"type": "h3", "text": "Nhóm lỗi 3 — Cặp âm không có trong tiếng Việt"}, {"type": "bullet", "text": "/l/ vs /r/, /θ/ (think) vs /s/, /ð/ (this) vs /d/, /ʃ/ vs /s/, /v/ vs /w/ — luyện cặp tối thiểu có phản hồi.", "level": 0}, {"type": "callout", "text": "Thứ tự đòn bẩy cho người Việt: (1) tri giác + sản xuất âm cuối → (2) trọng âm & weak forms → (3) cặp âm khó. Sửa đúng ba nhóm này nâng độ dễ nghe (intelligibility) hơn nhiều so với cố \"bắt chước giọng bản xứ\".", "color": "0F6E6E"}]}, {"title": "E. Tiếng Trung — khai thác lợi thế & bản đồ bẫy chi tiết", "items": [{"type": "h3", "text": "Lợi thế 1 — Hán-Việt (đòn bẩy từ vựng lớn nhất)"}, {"type": "p", "text": "Kho Hán-Việt ánh xạ gần như từng hình vị sang chữ Hán. Chủ động xây \"cầu\" Hán-Việt ↔ 汉字 biến việc học từ mới thành việc NHẬN RA từ đã biết. Đặc biệt mạnh với văn bản học thuật, tin tức, kinh tế."}, {"type": "bullet", "text": "Ví dụ ánh xạ: 投資 đầu tư, 利率 lãi suất, 股票 cổ phiếu, 銀行 ngân hàng, 經濟 kinh tế, 政策 chính sách, 發展 phát triển.", "level": 0}, {"type": "bullet", "text": "Kỹ thuật: khi gặp từ Trung mới, tự hỏi \"Hán-Việt của nó là gì?\" — nếu đoán ra, từ đó gần như đã thuộc.", "level": 0}, {"type": "h3", "text": "Lợi thế 2 — Nền thanh điệu"}, {"type": "bullet", "text": "Tiếng Việt 6 thanh → tai đã quen phân biệt cao độ (F0). Thanh 3 tiếng Trung (lượn xuống-lên) ít gây khó cho người Việt.", "level": 0}, {"type": "h3", "text": "Bản đồ bẫy — nơi lợi thế L1 KHÔNG giúp"}, {"type": "labeled", "label": "Thanh 1 & Thanh 4", "text": "hai thanh người Việt sai nhiều nhất. Thanh 1 = cao-phẳng-kéo dài (tiếng Việt không có thanh nào phẳng-cao như vậy); Thanh 4 = cao dứt khoát xuống thấp. Luyện riêng, có trực quan hoá cao độ.", "color": "9E2A2B"}, {"type": "labeled", "label": "Biến điệu (tone sandhi)", "text": "3+3 → 2+3; \"一\" đổi thanh theo ngữ cảnh (yī → yí trước thanh 4, yì trước thanh khác); \"不\" bù → bú trước thanh 4. Quy tắc phải học riêng, không suy từ tiếng Việt.", "color": "9E2A2B"}, {"type": "labeled", "label": "Bẫy \"tự tin sớm\"", "text": "lợi thế thanh điệu khiến chủ quan tháng đầu rồi sai ở tháng thứ ba. Thanh Việt dùng tắc thanh hầu + giọng kẹt; thanh Trung là cao độ thuần — đừng bê nguyên \"cảm giác thanh\" sang.", "color": "9E2A2B"}, {"type": "callout", "text": "Chiến lược tiếng Trung cho người Việt: dồn lực vào Hán-Việt (từ vựng) + luyện riêng T1/T4/sandhi (thanh điệu). Đây là hai đòn bẩy mà người học phương Tây không có và không thể sao chép.", "color": "0F6E6E"}]}]}, {"kind": "section", "title": "Nguyên tắc thực hành", "groups": [{"title": "", "items": [{"type": "note", "text": "Mỗi best practice trình bày theo 5 lớp: [Best Practice] → [Cơ chế khoa học] → [Sai lầm hay mắc] → [Hành động] → [Small action đòn bẩy cao]. Áp dụng được cho cả tiếng Anh và tiếng Trung; phần khác biệt riêng từng ngôn ngữ đặt ở Phần IV."}], "isBP": false}, {"title": "BP1 — Ưu tiên Input dễ hiểu, đúng ngưỡng 'i+1'", "items": [{"type": "labeled", "label": "Best practice", "text": "Dành phần lớn thời gian tiếp xúc nội dung mà bạn hiểu được ~90–98% — đủ dễ để theo mạch, đủ mới để học điều tiếp theo.", "color": "1F3A5F"}, {"type": "labeled", "label": "Cơ chế", "text": "Trên ngưỡng này, bộ nhớ làm việc còn dư năng lực để hấp thụ cái mới; dưới ngưỡng, tải nhận thức quá cao, não chỉ 'bơi' chứ không học (Krashen; Sweller; VanPatten).", "color": "0F6E6E"}, {"type": "labeled", "label": "Sai lầm hay mắc", "text": "Lao vào phim/podcast/báo quá khó để 'ngâm cho quen' → hiểu <70%, chán, bỏ cuộc, và học được rất ít.", "color": "9E2A2B"}, {"type": "h3", "text": "Hành động"}, {"type": "bullet", "text": "Chọn tài liệu mà bạn hiểu ~9/10 câu không cần tra. Nếu phải tra >1 từ/câu → hạ cấp độ.", "level": 0}, {"type": "bullet", "text": "Dùng graded readers / graded listening (nội dung phân cấp theo trình độ) ở giai đoạn đầu-giữa.", "level": 0}, {"type": "bullet", "text": "Đọc/nghe MỞ RỘNG (extensive): số lượng lớn, dễ, thoải mái — để tích lũy phơi nhiễm.", "level": 0}, {"type": "labeled", "label": "Small action đòn bẩy cao", "text": "Quy tắc '1 trang – 5 từ lạ': mở một trang bất kỳ, nếu có >5 từ lạ thì tài liệu đang quá khó, đổi ngay.", "color": "2E6B3E"}], "isBP": true}, {"title": "BP2 — Học bằng Truy xuất chủ động, không phải đọc lại", "items": [{"type": "labeled", "label": "Best practice", "text": "Luôn cố NHỚ LẠI (che đáp án) trước khi nhìn; biến mọi buổi ôn thành bài tự kiểm tra.", "color": "1F3A5F"}, {"type": "labeled", "label": "Cơ chế", "text": "Testing effect: hành vi nhớ lại củng cố dấu vết trí nhớ mạnh hơn đọc lại. Roediger & Karpicke: quên 13% (truy xuất) vs 56% (đọc lại) sau 2 ngày.", "color": "0F6E6E"}, {"type": "labeled", "label": "Sai lầm hay mắc", "text": "Đọc lại ghi chú / xem lại flashcard cả hai mặt cùng lúc → tạo 'ảo giác trôi chảy' (thấy quen tưởng thuộc).", "color": "9E2A2B"}, {"type": "h3", "text": "Hành động"}, {"type": "bullet", "text": "Flashcard phải ở dạng hỏi–đáp: nhìn mặt gợi ý, tự tạo đáp án trong đầu/nói ra, rồi mới lật.", "level": 0}, {"type": "bullet", "text": "Sau khi đọc một đoạn, gập lại và tự thuật lại nội dung bằng ngôn ngữ đích (free recall).", "level": 0}, {"type": "bullet", "text": "Ưu tiên dạng 'type-to-answer' hoặc nói ra miệng thay vì chỉ nhận diện (recognition).", "level": 0}, {"type": "labeled", "label": "Small action đòn bẩy cao", "text": "Luật 3 giây: mỗi thẻ, ép bản thân tự trả lời trong 3 giây TRƯỚC khi lật. Nếu chưa nhớ được là tín hiệu cần ôn — đó chính là lúc học.", "color": "2E6B3E"}], "isBP": true}, {"title": "BP3 — Giãn cách thay vì nhồi nhét (Spaced repetition)", "items": [{"type": "labeled", "label": "Best practice", "text": "Chia nhỏ việc ôn thành các buổi ngắn, cách nhau theo ngày; ôn lại đúng lúc trí nhớ sắp phai.", "color": "1F3A5F"}, {"type": "labeled", "label": "Cơ chế", "text": "Spacing effect: khoảng nghỉ để trí nhớ hơi phai rồi khôi phục lại củng cố mạnh hơn. Cepeda et al.: tăng 10–30% ghi nhớ so với học dồn.", "color": "0F6E6E"}, {"type": "labeled", "label": "Sai lầm hay mắc", "text": "Học dồn 3 tiếng cuối tuần rồi cả tuần không đụng → nhớ tốt lúc đó nhưng phai nhanh.", "color": "9E2A2B"}, {"type": "h3", "text": "Hành động"}, {"type": "bullet", "text": "Dùng phần mềm SRS (Anki hoặc tương tự) để tự động lên lịch ôn theo đường cong quên.", "level": 0}, {"type": "bullet", "text": "20–30 phút MỖI NGÀY hiệu quả hơn 3–4 giờ dồn một buổi.", "level": 0}, {"type": "bullet", "text": "Kết hợp giãn cách với truy xuất = 'spaced retrieval', combo mạnh nhất trong khoa học trí nhớ.", "level": 0}, {"type": "labeled", "label": "Small action đòn bẩy cao", "text": "Neo thói quen (habit stacking): gắn 15 phút Anki vào một việc cố định hằng ngày (sau ly cà phê sáng). Đều đặn nhỏ > bùng nổ rồi tắt.", "color": "2E6B3E"}], "isBP": true}, {"title": "BP4 — Chủ động tạo Output sớm (nói/viết)", "items": [{"type": "labeled", "label": "Best practice", "text": "Bắt đầu tạo ngôn ngữ (nói to, viết, tự thuật) từ sớm, không chờ 'đủ giỏi mới nói'.", "color": "1F3A5F"}, {"type": "labeled", "label": "Cơ chế", "text": "Output Hypothesis (Swain): tạo ngôn ngữ ép bạn nhận ra lỗ hổng và tái cấu trúc kiến thức; generation effect (Bjork): tự tạo đáp án nhớ lâu hơn đọc mẫu.", "color": "0F6E6E"}, {"type": "labeled", "label": "Sai lầm hay mắc", "text": "Vô hạn 'chuẩn bị' (học thêm ngữ pháp, thêm từ) mà trì hoãn nói → kỹ năng nói không bao giờ khởi động.", "color": "9E2A2B"}, {"type": "h3", "text": "Hành động"}, {"type": "bullet", "text": "Self-talk: mỗi ngày tự thuật lại việc mình làm bằng ngôn ngữ đích, nói to.", "level": 0}, {"type": "bullet", "text": "Viết nhật ký ngắn 3–5 câu/ngày; ép dùng cấu trúc/từ mới vừa học.", "level": 0}, {"type": "bullet", "text": "Nói với AI hoặc bạn học — không cần người bản xứ (Shehadeh 1999: người học tự sửa nhiều hơn khi nói với người học khác).", "level": 0}, {"type": "labeled", "label": "Small action đòn bẩy cao", "text": "'Một cấu trúc – một câu thật': mỗi khi học một chunk mới, lập tức đặt MỘT câu về đời sống thật của mình bằng chunk đó. Gắn với trải nghiệm cá nhân giúp nhớ sâu.", "color": "2E6B3E"}], "isBP": true}, {"title": "BP5 — Tìm tương tác & đàm phán nghĩa", "items": [{"type": "labeled", "label": "Best practice", "text": "Tạo các tình huống hội thoại thật có phản hồi, đặc biệt khi xảy ra hiểu lầm cần làm rõ.", "color": "1F3A5F"}, {"type": "labeled", "label": "Cơ chế", "text": "Interaction Hypothesis (Long): đàm phán nghĩa (hỏi lại, xác nhận, diễn đạt lại) biến input thành intake nhanh nhất; phản hồi tức thì giúp sửa lỗi.", "color": "0F6E6E"}, {"type": "labeled", "label": "Sai lầm hay mắc", "text": "Chỉ tiêu thụ nội dung một chiều (xem phim, nghe podcast) mà không bao giờ tương tác hai chiều.", "color": "9E2A2B"}, {"type": "h3", "text": "Hành động"}, {"type": "bullet", "text": "Dùng bộ 'nước đi' đàm phán nghĩa: yêu cầu làm rõ, kiểm tra xác nhận, diễn đạt lại.", "level": 0}, {"type": "bullet", "text": "Tham gia nhóm luyện nói, lớp trao đổi ngôn ngữ (language exchange), hoặc hội thoại với AI có sửa lỗi.", "level": 0}, {"type": "bullet", "text": "Sau mỗi hội thoại, ghi lại 1–2 chỗ mình 'bí' rồi tra cách nói đúng — đó là 'lỗ hổng' vừa được phát hiện.", "level": 0}, {"type": "labeled", "label": "Small action đòn bẩy cao", "text": "Ngân hàng câu hỏi làm rõ: thuộc lòng 3 câu ('Could you say that again?', 'What do you mean by X?', 'So you mean...?'). Có sẵn 3 câu này là dám bước vào hội thoại thật.", "color": "2E6B3E"}], "isBP": true}, {"title": "BP6 — Học từ vựng theo tần suất & theo cụm (chunks)", "items": [{"type": "labeled", "label": "Best practice", "text": "Ưu tiên vốn từ tần suất cao trước; học từ trong CỤM/ngữ cảnh, không học từ đơn lẻ trần trụi.", "color": "1F3A5F"}, {"type": "labeled", "label": "Cơ chế", "text": "Ngưỡng coverage (Nation): 3.000 từ ~95%, 8.000–9.000 ~98%. Học theo cụm tận dụng cách não lưu trữ ngôn ngữ theo khối (formulaic language), giúp nói trôi và đúng ngữ pháp tự nhiên.", "color": "0F6E6E"}, {"type": "labeled", "label": "Sai lầm hay mắc", "text": "Học từ hiếm/khó trước khi nắm chắc lõi tần suất cao; học danh sách từ đơn không ngữ cảnh → biết nghĩa nhưng không dùng được.", "color": "9E2A2B"}, {"type": "h3", "text": "Hành động"}, {"type": "bullet", "text": "Bám danh sách tần suất (frequency list) để chọn từ học; đạt vững 3.000 từ đầu rồi mới mở rộng.", "level": 0}, {"type": "bullet", "text": "Lưu từ mới dưới dạng cả câu ví dụ, không phải từ trần; ưu tiên collocation ('make a decision', không chỉ 'decision').", "level": 0}, {"type": "bullet", "text": "Kết hợp học chủ đích (SRS) + đọc mở rộng để gặp lại từ nhiều lần trong ngữ cảnh (Cobb: đọc thôi không đủ lặp lại).", "level": 0}, {"type": "labeled", "label": "Small action đòn bẩy cao", "text": "Quy tắc 'từ → cụm → câu': không bao giờ lưu một từ mới một mình. Luôn lưu kèm 1 collocation và 1 câu thật. Ba lớp này biến từ 'biết' thành 'dùng được'.", "color": "2E6B3E"}], "isBP": true}, {"title": "BP7 — Luyện phát âm có chủ đích (Shadowing + tự ghi âm)", "items": [{"type": "labeled", "label": "Best practice", "text": "Luyện âm tách biệt bằng shadowing (nói đè theo bản xứ) và tự ghi âm để đối chiếu.", "color": "1F3A5F"}, {"type": "labeled", "label": "Cơ chế", "text": "Bắt chước trực tiếp nhịp/trọng âm/ngữ điệu xây 'khuôn vận động' (motor template) cho âm mới; tự ghi âm tạo vòng phản hồi để phát hiện lỗi.", "color": "0F6E6E"}, {"type": "labeled", "label": "Sai lầm hay mắc", "text": "Cho rằng phát âm 'tự khắc đúng' khi nghe nhiều → thực tế lỗi L1 transfer cố hữu không tự sửa nếu không luyện có chủ đích.", "color": "9E2A2B"}, {"type": "h3", "text": "Hành động"}, {"type": "bullet", "text": "Chọn đoạn 30–60 giây của người bản xứ; nghe hiểu rồi nói đè lên (shadow) 5–10 lần cùng một đoạn.", "level": 0}, {"type": "bullet", "text": "Ghi âm chính mình, so với bản gốc, khoanh vùng 1–2 lỗi để sửa có mục tiêu.", "level": 0}, {"type": "bullet", "text": "Gạch chân 2–3 từ nhấn trọng âm trong mỗi câu trước khi nói (chống thói đọc đều của tiếng Việt).", "level": 0}, {"type": "labeled", "label": "Small action đòn bẩy cao", "text": "'Một đoạn – mười lần': chất lượng hơn số lượng. Lặp cùng một đoạn ngắn 10 lần cho tới khi khớp nhịp, hơn là shadow 10 đoạn khác nhau mỗi đoạn 1 lần.", "color": "2E6B3E"}], "isBP": true}, {"title": "BP8 — Xen kẽ & luyện tập biến đổi (Interleaving)", "items": [{"type": "labeled", "label": "Best practice", "text": "Trộn nhiều loại nội dung/kỹ năng trong một buổi thay vì 'khối' một chủ đề duy nhất.", "color": "1F3A5F"}, {"type": "labeled", "label": "Cơ chế", "text": "Interleaving (Bjork; Pan et al. d=0.67): trộn buộc não phân biệt các trường hợp giống nhau, xây khả năng chọn đúng cấu trúc khi cần — điều mà học khối không tạo được.", "color": "0F6E6E"}, {"type": "labeled", "label": "Sai lầm hay mắc", "text": "Học 'khối' (blocking): làm 30 câu cùng một thì liên tiếp → thấy trôi chảy giả tạo, nhưng không biết chọn thì nào khi gặp tình huống thật.", "color": "9E2A2B"}, {"type": "h3", "text": "Hành động"}, {"type": "bullet", "text": "Trong một buổi, trộn 2–3 chủ đề/cấu trúc (ví dụ: thì quá khứ + hiện tại hoàn thành + tương lai) thay vì chỉ một.", "level": 0}, {"type": "bullet", "text": "Trộn kỹ năng: 15 phút từ vựng + 15 phút nghe + 10 phút nói, thay vì một tiếng chỉ một kỹ năng.", "level": 0}, {"type": "note", "text": "Cảnh báo liều lượng (Larsen et al. 2022): kết hợp quá nhiều 'khó khăn' cùng lúc có thể phản tác dụng. Xen kẽ 2–3 loại là đủ; đừng trộn tới mức hỗn loạn."}, {"type": "labeled", "label": "Small action đòn bẩy cao", "text": "Xáo bài: bật chế độ shuffle trong Anki và không nhóm thẻ theo chủ đề. Chỉ một thao tác nhưng ép truy xuất phân biệt mỗi lần.", "color": "2E6B3E"}], "isBP": true}, {"title": "BP9 — Hạ 'bộ lọc cảm xúc' & nuôi động lực (Affective management)", "items": [{"type": "labeled", "label": "Best practice", "text": "Chủ động thiết kế môi trường ít rủi ro xã hội và nuôi động lực bền để dám tạo output đều đặn.", "color": "1F3A5F"}, {"type": "labeled", "label": "Cơ chế", "text": "Affective filter (Krashen): lo lắng chặn intake. WTC research: động lực là yếu tố dự báo trực tiếp mạnh nhất cho việc dám giao tiếp; lo lắng làm trung gian tiêu cực.", "color": "0F6E6E"}, {"type": "labeled", "label": "Sai lầm hay mắc", "text": "Ép mình vào tình huống áp lực cao quá sớm (họp toàn người bản xứ) → lo lắng tăng vọt, né tránh, mất đà.", "color": "9E2A2B"}, {"type": "h3", "text": "Hành động"}, {"type": "bullet", "text": "Bắt đầu ở môi trường an toàn: nói với AI, ghi âm một mình, nhóm nhỏ tin cậy — tăng dần độ khó.", "level": 0}, {"type": "bullet", "text": "Gắn động lực với mục tiêu thật của bạn (ví dụ: đọc báo cáo tài chính tiếng Trung, phỏng vấn quốc tế) để duy trì 'grit'.", "level": 0}, {"type": "bullet", "text": "Chấp nhận lỗi là một phần của quá trình; mỗi lỗi được sửa là một 'lỗ hổng' vừa được lấp.", "level": 0}, {"type": "labeled", "label": "Small action đòn bẩy cao", "text": "Hạ ngưỡng bắt đầu xuống mức 'không thể từ chối': cam kết chỉ 5 phút/ngày. Bắt đầu đều đặn quan trọng hơn thời lượng — đà (momentum) tự kéo bạn học lâu hơn.", "color": "2E6B3E"}], "isBP": true}]}, {"kind": "section", "title": "Lộ trình theo ngôn ngữ", "groups": [{"title": "A. Tiếng Anh cho người Việt — ưu tiên theo đòn bẩy", "items": [{"type": "h3", "text": "Thứ tự tấn công (cao → thấp đòn bẩy)"}, {"type": "labeled", "label": "1. Âm cuối & cụm phụ âm cuối", "text": "điểm yếu số một của người Việt, ảnh hưởng trực tiếp độ dễ nghe. Luyện tối thiểu cặp: -s/-z, -t/-d, -k, -f/-v ở cuối từ; cụm -sts, -kt, -ld.", "color": "2E5B94"}, {"type": "labeled", "label": "2. Trọng âm câu & nối âm", "text": "chống thói đọc đều từng âm tiết. Nhấn nội dung, lướt từ chức năng; luyện linking (turn it off → 'tur-ni-toff').", "color": "2E5B94"}, {"type": "labeled", "label": "3. Chunk & collocation theo tình huống công việc", "text": "trong môi trường công việc, học theo cụm giao tiếp công sở thật hiệu quả hơn học từ đơn.", "color": "2E5B94"}, {"type": "labeled", "label": "4. Vốn từ tần suất → 3.000 rồi 8.000", "text": "đạt 95% coverage trước, rồi mở rộng chuyên ngành tài chính.", "color": "2E5B94"}, {"type": "h3", "text": "Sai lầm đặc thù người Việt cần tránh"}, {"type": "bullet", "text": "Bỏ âm cuối vì tiếng Việt không có — phải luyện có ý thức, không tự sửa được.", "level": 0}, {"type": "bullet", "text": "Học ngữ pháp quá kỹ mà né nói (phổ biến trong môi trường học Việt Nam) → 'biết luật nhưng không nói được'.", "level": 0}, {"type": "bullet", "text": "Nghe thụ động hàng giờ mà không truy xuất/không nói lại → cảm giác tiến bộ nhưng kỹ năng nói giậm chân.", "level": 0}], "isBP": false}, {"title": "B. Tiếng Trung cho người Việt — tận dụng lợi thế, phòng bẫy", "items": [{"type": "h3", "text": "Tận dụng tối đa (lợi thế L1)"}, {"type": "labeled", "label": "Hán-Việt ↔ 汉字", "text": "đòn bẩy lớn nhất: chủ động ánh xạ từ Hán-Việt sang chữ Hán để nhớ từ và đoán nghĩa văn bản học thuật/tài chính. Ví dụ tài chính: 投資 đầu tư, 利率 lãi suất, 股票 cổ phiếu, 銀行 ngân hàng.", "color": "2E5B94"}, {"type": "labeled", "label": "Nền thanh điệu", "text": "đã quen phân biệt cao độ nên học 4 thanh nhanh hơn người phương Tây; thanh 3 (lượn) đặc biệt ít khó với người Việt.", "color": "2E5B94"}, {"type": "h3", "text": "Phòng bẫy (nơi lợi thế L1 KHÔNG giúp)"}, {"type": "labeled", "label": "Thanh 1 & thanh 4", "text": "hai thanh người Việt sai nhiều nhất (Wu & Hu 2004) — luyện riêng: thanh 1 cao-phẳng-kéo dài, thanh 4 cao dứt khoát xuống thấp.", "color": "9E2A2B"}, {"type": "labeled", "label": "Biến điệu (tone sandhi)", "text": "thanh 3+3 → 2+3; '一'/'不' đổi thanh theo ngữ cảnh — quy tắc phải học riêng, không suy từ tiếng Việt.", "color": "9E2A2B"}, {"type": "labeled", "label": "'Tự tin sớm'", "text": "lợi thế thanh điệu khiến dễ chủ quan tháng đầu rồi sai ở tháng thứ ba — duy trì luyện âm có chủ đích, đừng bê nguyên 'cảm giác thanh' tiếng Việt (có tắc thanh hầu, giọng kẹt) sang tiếng Trung (thanh thuần cao độ).", "color": "9E2A2B"}, {"type": "h3", "text": "Công cụ hỗ trợ theo nghiên cứu"}, {"type": "bullet", "text": "Công cụ trực quan hoá thanh điệu (visualization) giúp thấy đường nét cao độ — hữu ích để sửa thanh 1/thanh 4 (nghiên cứu HCMUE 2025).", "level": 0}, {"type": "bullet", "text": "Học chữ Hán theo bộ thủ (radicals) + theo tần suất, kết hợp SRS; ưu tiên 汉字 tần suất cao trước.", "level": 0}], "isBP": false}, {"title": "C. Tiếng Anh — lộ trình 4 giai đoạn (theo ngưỡng năng lực)", "items": [{"type": "labeled", "label": "Giai đoạn 1 — Nền (0 → ~A2/B1)", "text": "Mục tiêu: 2.000–3.000 word families tần suất cao + âm cuối cơ bản. Công cụ: graded readers/listening, SRS từ theo cụm, luyện tri giác cặp tối thiểu âm cuối. Chỉ báo đạt: hiểu ~95% nội dung phân cấp, nói được câu đơn ổn định.", "color": "1F3A5F"}, {"type": "labeled", "label": "Giai đoạn 2 — Trôi chảy chức năng (B1 → B2)", "text": "Mục tiêu: chuyển từ \"biết\" sang \"dùng\" — output hằng ngày, chunk theo tình huống công việc. Trọng âm & weak forms. Chỉ báo: tham gia hội thoại công việc, tự sửa lỗi khi nói.", "color": "1F3A5F"}, {"type": "labeled", "label": "Giai đoạn 3 — Chuyên sâu (B2 → C1)", "text": "Mục tiêu: mở rộng lên 8.000 word families + văn phong viết trang trọng + sắc thái (indirectness, register). Chỉ báo: đọc văn bản thật không cần từ điển, viết email chuẩn mực.", "color": "1F3A5F"}, {"type": "labeled", "label": "Giai đoạn 4 — Tinh luyện (C1+)", "text": "Mục tiêu: phát âm gần bản xứ (HVPT cặp âm khó), thành ngữ/collocation nâng cao, điều chỉnh giọng theo ngữ cảnh. Chỉ báo: được nhìn nhận là giao tiếp \"expert\".", "color": "1F3A5F"}, {"type": "note", "text": "Nguyên tắc chuyển giai đoạn: chỉ lên giai đoạn sau khi CHỈ BÁO ĐẠT được đáp ứng ổn định, không phải theo thời gian. Nhảy cóc → lỗ hổng nền tảng tích tụ."}]}, {"title": "D. Tiếng Trung — lộ trình 4 giai đoạn", "items": [{"type": "labeled", "label": "Giai đoạn 1 — Thanh điệu & pinyin & 300 chữ", "text": "Mục tiêu: nắm chắc 4 thanh (đặc biệt T1/T4) + biến điệu cơ bản + ~300 汉字 tần suất cao. Tận dụng Hán-Việt ngay từ đầu. Chỉ báo: đọc pinyin đúng thanh, nhận diện chữ cơ bản.", "color": "1F3A5F"}, {"type": "labeled", "label": "Giai đoạn 2 — Từ vựng lõi & câu (HSK 3-4)", "text": "Mục tiêu: ~1.200 từ, ngữ pháp cơ bản, output câu đơn. Xây \"cầu\" Hán-Việt ↔ 汉字 có hệ thống. Chỉ báo: hội thoại đời sống, đọc đoạn ngắn.", "color": "1F3A5F"}, {"type": "labeled", "label": "Giai đoạn 3 — Đọc chuyên ngành & văn viết (HSK 5)", "text": "Mục tiêu: khai thác tối đa Hán-Việt cho văn bản học thuật/kinh tế; ~2.500 chữ. Chỉ báo: đọc tin tức/báo cáo, viết đoạn có cấu trúc.", "color": "1F3A5F"}, {"type": "labeled", "label": "Giai đoạn 4 — Tinh luyện (HSK 6+)", "text": "Mục tiêu: thành ngữ (成语), sắc thái ngữ dụng, phát âm & ngữ điệu tự nhiên. Chỉ báo: giao tiếp chuyên nghiệp trôi chảy.", "color": "1F3A5F"}, {"type": "callout", "text": "Đòn bẩy xuyên suốt cho tiếng Trung: mỗi giai đoạn đều gắn Hán-Việt để tăng tốc từ vựng, và luyện riêng thanh điệu (T1/T4/sandhi) để phòng \"tự tin sớm\".", "color": "0F6E6E"}]}, {"title": "E. Học song song hai ngôn ngữ — quản lý giao thoa", "items": [{"type": "p", "text": "Học Anh + Trung cùng lúc có rủi ro giao thoa (interference) nhưng quản lý được nếu tách biệt rõ ràng."}, {"type": "bullet", "text": "Tách buổi/tách khung giờ cho mỗi ngôn ngữ để giảm lẫn lộn — không trộn hai ngôn ngữ trong cùng một khối truy xuất.", "level": 0}, {"type": "bullet", "text": "Tận dụng interleaving TRONG mỗi ngôn ngữ (trộn chủ đề), nhưng KHÔNG interleave giữa hai ngôn ngữ ở giai đoạn đầu.", "level": 0}, {"type": "bullet", "text": "Ưu tiên theo mục tiêu thật: nếu một ngôn ngữ cấp thiết hơn, dồn 60-70% thời lượng cho nó thay vì chia đều máy móc.", "level": 0}, {"type": "note", "text": "Bottleneck khi học đa ngôn ngữ thường là PHƯƠNG PHÁP và tính nhất quán, không phải tổng số giờ. Ít mà đều, tách bạch rõ, thắng nhiều mà loạn."}]}]}, {"kind": "section", "title": "Hệ thống thực hành", "groups": [{"title": "", "items": [{"type": "callout", "text": "Toàn bộ Phần I–IV là LÝ THUYẾT. Phần này biến lý thuyết thành thói quen. Sự thật khó chịu: người đọc hết tài liệu này mà không thực hành sẽ thua người chỉ đọc BP2+BP3 rồi luyện mỗi ngày. Giá trị nằm ở SỰ BỀN BỈ, không ở lượng kiến thức.", "color": "9E2A2B"}, {"type": "note", "text": "Khung mẫu tổng hợp mọi nguyên lý trên thành lịch tuần. Điều chỉnh theo quỹ thời gian của chị; nguyên tắc bất biến: đều đặn + truy xuất + giãn cách + output."}, {"type": "h3", "text": "Nguyên tắc phân bổ"}, {"type": "bullet", "text": "Đều đặn hằng ngày (20–40 phút) > dồn cuối tuần. Spacing quan trọng hơn tổng thời lượng.", "level": 0}, {"type": "bullet", "text": "Mỗi buổi trộn tối thiểu 2 kỹ năng (interleaving): ví dụ SRS từ vựng + shadowing, hoặc nghe + nói lại.", "level": 0}, {"type": "bullet", "text": "Luôn có một khối OUTPUT mỗi ngày (dù chỉ 5 phút self-talk hay 3 câu nhật ký).", "level": 0}, {"type": "h3", "text": "Khung tuần mẫu (mỗi ngày ~30–40 phút)"}, {"type": "labeled", "label": "Hằng ngày (10–15')", "text": "SRS truy xuất (Anki) — từ vựng theo cụm, có ví dụ. Che đáp án, tự trả lời trong 3 giây.", "color": "0F6E6E"}, {"type": "labeled", "label": "Hằng ngày (5')", "text": "Output ngắn: self-talk hoặc 3 câu nhật ký dùng chunk mới.", "color": "0F6E6E"}, {"type": "labeled", "label": "3–4 buổi/tuần (10')", "text": "Shadowing 1 đoạn ngắn, lặp 10 lần, tự ghi âm 1 lần."}, {"type": "labeled", "label": "2–3 buổi/tuần (15')", "text": "Input mở rộng dễ hiểu (graded reader/podcast ~95% hiểu)."}, {"type": "labeled", "label": "1–2 buổi/tuần (20–30')", "text": "Tương tác thật: nói với AI/bạn học, có đàm phán nghĩa; ghi lại 'lỗ hổng' để tra sau."}, {"type": "labeled", "label": "Cuối tuần (15')", "text": "Ôn 'error log' của tuần: các lỗi/lỗ hổng đã gặp, biến thành thẻ SRS mới."}, {"type": "callout", "text": "Vòng lặp cải tiến liên tục: Input dễ hiểu → gặp cụm mới → đưa vào SRS (giãn cách + truy xuất) → ép ra Output → phát hiện lỗ hổng qua tương tác → lỗ hổng thành thẻ mới. Vòng này chạy đều mới là cỗ máy học ngôn ngữ thực thụ.", "color": "1F3A5F"}, {"type": "h3", "text": "3 đòn bẩy cao nhất nếu chị bận (rút gọn tối đa)"}, {"type": "labeled", "label": "Đòn bẩy 1", "text": "Đổi 'đọc/nghe lại' → 'che và tự nhớ lại' (retrieval). Rẻ nhất, lợi nhất.", "color": "9A6A00"}, {"type": "labeled", "label": "Đòn bẩy 2", "text": "15 phút SRS MỖI NGÀY (giãn cách) thay vì dồn cuối tuần.", "color": "9A6A00"}, {"type": "labeled", "label": "Đòn bẩy 3", "text": "5 phút Output mỗi ngày (self-talk/nhật ký) để kích hoạt 'nhận ra lỗ hổng'.", "color": "9A6A00"}], "isBP": false}, {"title": "Nguyên tắc của một hệ thống bền (Sustainable practice design)", "items": [{"type": "labeled", "label": "Nhỏ đến mức không thể từ chối", "text": "đặt ngưỡng tối thiểu cực thấp (5 phút) để không bao giờ đứt chuỗi. Đều đặn tạo ra momentum; đứt chuỗi giết động lực nhanh hơn bất kỳ điều gì.", "color": "2E6B3E"}, {"type": "labeled", "label": "Neo vào thói quen sẵn có", "text": "gắn buổi học vào một mỏ neo cố định hằng ngày (sau cà phê sáng). Thói quen mới bám vào thói quen cũ dễ hơn tạo mới từ đầu.", "color": "2E6B3E"}, {"type": "labeled", "label": "Đo lường tối thiểu", "text": "chỉ theo dõi 2-3 chỉ số quan trọng (chuỗi ngày, số thẻ truy xuất, số phút output). Đo quá nhiều gây nản.", "color": "2E6B3E"}, {"type": "labeled", "label": "Kế hoạch cho ngày tệ", "text": "định sẵn \"phiên bản 2 phút\" cho ngày bận/mệt (chỉ ôn 5 thẻ + nói 1 câu). Giữ chuỗi quan trọng hơn khối lượng.", "color": "2E6B3E"}, {"type": "labeled", "label": "Rà soát hằng tuần", "text": "mỗi tuần 15 phút: xem error log, biến lỗ hổng thành thẻ mới, điều chỉnh trọng tâm tuần sau.", "color": "2E6B3E"}, {"type": "callout", "text": "Đường cong tiến bộ ngôn ngữ không tuyến tính: có những \"cao nguyên\" (plateau) khi cảm giác không tiến. Đây là lúc bỏ cuộc phổ biến nhất — nhưng cũng là lúc não đang củng cố ngầm. Bền bỉ qua plateau là điều phân biệt người thành công.", "color": "9A6A00"}]}]}];

/* ---------- palette: "research notebook", not the default cream/terracotta ---------- */
// Đồng bộ theme với ChunkAtlas_EN.jsx (section Language dùng chung 1 bảng màu)
const INK = "#23231E";
const PAPER = "#F7F6F2";     // warm paper
const PANEL = "#FBFAF6";     // card surface
const RULE = "#E4E1D8";      // hairline
const MUTED = "#6B6558";
const ACCENT = "#2B3A55";    // navy accent (giống ACC của ChunkAtlas)
const LAYER = {
  bp:      { key: "Best practice",        tone: "#1F3A5F", chip: "01" },
  mech:    { key: "Cơ chế khoa học",       tone: "#0F6E6E", chip: "02" },
  pitfall: { key: "Sai lầm hay mắc",       tone: "#9E2A2B", chip: "03" },
  action:  { key: "Hành động",            tone: "#5B4C1E", chip: "04" },
  small:   { key: "Small action đòn bẩy cao", tone: "#2E6B3E", chip: "05" },
};

/* classify a labeled item into a layer bucket */
function layerOf(label) {
  const l = (label || "").toLowerCase();
  if (l.startsWith("best practice")) return "bp";
  if (l.startsWith("cơ chế")) return "mech";
  if (l.startsWith("sai lầm")) return "pitfall";
  if (l.startsWith("small action")) return "small";
  return null;
}

/* Build a normalized best-practice model out of a group's raw items */
function modelBP(group) {
  const layers = { bp: null, mech: null, pitfall: null, small: null };
  const actions = [];
  let inAction = false;
  group.items.forEach((it) => {
    if (it.type === "h3") { inAction = /hành động/i.test(it.text); return; }
    if (it.type === "labeled") {
      const k = layerOf(it.label);
      if (k) { layers[k] = it.text; inAction = false; return; }
    }
    if (it.type === "bullet") { if (inAction || actions.length === 0) actions.push(it.text); else actions.push(it.text); }
    if (it.type === "note") actions.push("⚠ " + it.text);
  });
  return { layers, actions };
}

function splitTitle(t) {
  const m = t.match(/^(BP\d+)\s*[—-]\s*(.*)$/);
  if (m) return { code: m[1], rest: m[2] };
  return { code: "", rest: t };
}

/* ---------- generic rich block renderer for non-BP sections ---------- */
function Block({ b }) {
  if (b.type === "h2") return <h3 className="blk-h2">{b.text}</h3>;
  if (b.type === "h3") return <h4 className="blk-h3">{b.text}</h4>;
  if (b.type === "p") return <p className="blk-p">{b.text}</p>;
  if (b.type === "note") return <div className="blk-note">{b.text}</div>;
  if (b.type === "callout") return <div className="blk-callout">{b.text}</div>;
  if (b.type === "bullet")
    return (
      <div className="blk-bullet" style={{ marginLeft: (b.level || 0) * 18 }}>
        <span className="tick" />
        <span>{b.text}</span>
      </div>
    );
  if (b.type === "labeled")
    return (
      <div className="blk-labeled">
        <span className="lab" style={{ color: "#" + (b.color || "1F3A5F") }}>{b.label}</span>
        <span className="lab-body">{b.text}</span>
      </div>
    );
  return null;
}

/* ---------- the signature: 5-layer anatomy card ---------- */
function AnatomyCard({ group, index, open, onToggle }) {
  const { code, rest } = splitTitle(group.title);
  const { layers, actions } = useMemo(() => modelBP(group), [group]);

  return (
    <article className={"bp-card" + (open ? " open" : "")}>
      <button className="bp-head" onClick={onToggle} aria-expanded={open}>
        <span className="bp-code">{code}</span>
        <span className="bp-title">{rest}</span>
        <span className="bp-chev">{open ? "–" : "+"}</span>
      </button>

      {layers.bp && <p className="bp-oneline">{layers.bp}</p>}

      {open && (
        <div className="bp-body">
          <div className="anatomy">
            {["bp", "mech", "pitfall"].map((k) =>
              layers[k] ? (
                <div className="layer" key={k}>
                  <div className="layer-rail" style={{ background: LAYER[k].tone }} />
                  <div className="layer-content">
                    <div className="layer-key" style={{ color: LAYER[k].tone }}>
                      <span className="layer-chip" style={{ borderColor: LAYER[k].tone, color: LAYER[k].tone }}>{LAYER[k].chip}</span>
                      {LAYER[k].key}
                    </div>
                    <div className="layer-text">{layers[k]}</div>
                  </div>
                </div>
              ) : null
            )}

            {actions.length > 0 && (
              <div className="layer">
                <div className="layer-rail" style={{ background: LAYER.action.tone }} />
                <div className="layer-content">
                  <div className="layer-key" style={{ color: LAYER.action.tone }}>
                    <span className="layer-chip" style={{ borderColor: LAYER.action.tone, color: LAYER.action.tone }}>{LAYER.action.chip}</span>
                    {LAYER.action.key}
                  </div>
                  <ul className="layer-actions">
                    {actions.map((a, i) => {
                      const warn = a.startsWith("⚠");
                      return (
                        <li key={i} className={warn ? "warn" : ""}>
                          {warn ? a.slice(1).trim() : a}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}

            {layers.small && (
              <div className="layer small-hi">
                <div className="layer-rail" style={{ background: LAYER.small.tone }} />
                <div className="layer-content">
                  <div className="layer-key" style={{ color: LAYER.small.tone }}>
                    <span className="layer-chip" style={{ borderColor: LAYER.small.tone, color: LAYER.small.tone }}>{LAYER.small.chip}</span>
                    {LAYER.small.key}
                  </div>
                  <div className="layer-text lever">{layers.small}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

export default function BestPracticesGuide() {
  const [active, setActive] = useState(0);
  const [openBP, setOpenBP] = useState(() => ({ 0: true }));
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    window.__scrollArticleToTop?.();
  }, [active]);

  const section = SECTIONS[active];
  const bpSectionIdx = SECTIONS.findIndex((s) => s.groups.some((g) => g.isBP));

  return (
    <div className="root">
      <style>{CSS}</style>

      <header className="hd">
        <div className="brand">
          <div className="brand-mark">研</div>
          <div>
            <div className="brand-t">FIELD GUIDE</div>
            <div className="brand-s">Học ngoại ngữ theo bằng chứng · Krashen · Long · Swain · Nation · Bjork</div>
          </div>
        </div>
      </header>

      <nav className="crumb-wrap mobile-static">
        <div className="crumb">
          {SECTIONS.map((s, i) => {
            const { label, num } = navLabel(s.title, i);
            return (
              <button
                key={i}
                className={"crumb-pill" + (i === active ? " on" : "")}
                onClick={() => setActive(i)}
              >
                <span className="crumb-n">{num}</span>
                {label}
                {s.groups.some((g) => g.isBP) && <span className="crumb-tag">{s.groups.filter(g=>g.isBP).length}</span>}
              </button>
            );
          })}
        </div>
      </nav>

      <main className="stage" ref={scrollRef}>
        <header className="stage-head">
          <h1 className="stage-title">{cleanTitle(section.title)}</h1>
        </header>

        {active === bpSectionIdx ? (
          <div className="bp-list">
            {leadNote(section) && <div className="bp-lead">{leadNote(section)}</div>}
            {section.groups.filter((g) => g.isBP).map((g, i) => (
              <AnatomyCard
                key={i}
                group={g}
                index={i}
                open={!!openBP[i]}
                onToggle={() => setOpenBP((o) => ({ ...o, [i]: !o[i] }))}
              />
            ))}
          </div>
        ) : (
          <div className="prose">
            {section.groups.map((g, gi) => (
              <section className={"grp" + (g.title === "Nguồn tham khảo" ? " grp-sources" : "")} key={gi}>
                {g.title && <h2 className="grp-title">{g.title}</h2>}
                {g.items.map((b, bi) => (
                  <Block b={b} key={bi} />
                ))}
              </section>
            ))}
          </div>
        )}

        {active < SECTIONS.length - 1 && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 28, paddingTop: 16, borderTop: "1px solid var(--border, #e0e0d8)" }}>
            <button
              onClick={() => setActive(active + 1)}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 15px", borderRadius: 8, border: "1px solid var(--border-strong, #ccc)", background: "transparent", color: "var(--text-primary, #1a1a1a)", fontSize: 13, fontWeight: 500, cursor: "pointer" }}
            >
              Tiếp: {navLabel(SECTIONS[active + 1].title, active + 1).label} →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

/* ---------- helpers for nav / headers ---------- */
function navLabel(title, i) {
  const NAV = {
    "Tóm tắt điều hành": { num: "00", label: "SUMMARY" },
    "Nền tảng khoa học": { num: "01", label: "Nền tảng" },
    "Chuyển di ngôn ngữ mẹ đẻ": { num: "02", label: "Chuyển di L1" },
    "Nguyên tắc thực hành": { num: "03", label: "Nguyên tắc" },
    "Lộ trình theo ngôn ngữ": { num: "04", label: "Lộ trình" },
    "Hệ thống thực hành": { num: "05", label: "Hệ thống" },
  };
  return NAV[title] || { num: String(i).padStart(2, "0"), label: title.slice(0, 24) };
}
function cleanTitle(title) {
  return title;
}
function leadNote(section) {
  const g0 = section.groups[0];
  if (!g0) return null;
  const n = g0.items.find((x) => x.type === "note");
  return n ? n.text : null;
}

const CSS = `
* { box-sizing: border-box; }
.root {
  --ink:${INK}; --paper:${PAPER}; --panel:${PANEL}; --rule:${RULE}; --muted:${MUTED}; --accent:${ACCENT};
  display: flex; flex-direction: column;
  background: var(--paper); color: var(--ink);
  font-family: ui-sans-serif,system-ui,"Segoe UI",Roboto,Arial,sans-serif;
  font-size: 15px; line-height: 1.55;
}

/* header (đồng bộ .hd của ChunkAtlas_EN.jsx) */
.hd { display: flex; align-items: center; gap: 18px; padding: 14px 20px; border-bottom: 1px solid var(--rule); background: #FCFBF8; }
.brand { display: flex; gap: 10px; align-items: center; }
.brand-mark {
  width: 36px; height: 36px; flex-shrink: 0;
  border: 1.5px solid var(--accent); color: var(--accent);
  font-family: Georgia, serif; font-size: 20px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; border-radius: 3px;
}
.brand-t { font-family: Georgia, serif; font-weight: 700; font-size: 15px; letter-spacing: 0.04em; color: var(--ink); }
.brand-s { font-size: 11px; color: var(--muted); margin-top: 1px; }

/* breadcrumb nav (đồng bộ .crumb của ChunkAtlas_EN.jsx) */
.crumb-wrap { position: sticky; top: 0; z-index: 15; background: #FCFBF8; border-bottom: 1px solid var(--rule); }
.crumb { display: flex; gap: 6px; flex-wrap: wrap; padding: 9px 20px; }
.crumb-pill {
  display: flex; align-items: center; gap: 6px;
  border: 1px solid var(--rule); background: #fff; border-radius: 20px;
  padding: 7px 13px; cursor: pointer; font-size: 12.5px; font-weight: 600;
  color: var(--muted); white-space: nowrap; transition: all .12s;
}
.crumb-pill:hover { border-color: var(--accent); color: var(--ink); }
.crumb-pill.on { background: var(--accent); border-color: var(--accent); color: #fff; }
.crumb-n {
  font-family: Georgia, serif; font-weight: 700; font-size: 10.5px;
  width: 16px; height: 16px; border-radius: 3px;
  background: rgba(43,58,85,.12); color: var(--accent);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.crumb-pill.on .crumb-n { background: rgba(255,255,255,.28); color: #fff; }
.crumb-tag {
  font-family: Georgia, serif; font-size: 10px;
  background: rgba(43,58,85,.12); color: var(--accent); border-radius: 9px; padding: 1px 7px; font-weight: 700;
}
.crumb-pill.on .crumb-tag { background: rgba(255,255,255,.28); color: #fff; }

/* stage */
.stage { padding: 24px 40px 80px; }
.stage-head { margin-bottom: 26px; }
.stage-title {
  font-family: Georgia, serif; font-weight: 600; font-size: 33px; line-height: 1.12;
  margin: 0; letter-spacing: -0.01em;
}

/* BP list */
.bp-list { }
.bp-lead {
  font-size: 13.5px; color: var(--muted); font-style: italic; line-height: 1.6;
  border-left: 2px solid var(--accent); padding: 4px 0 4px 14px; margin-bottom: 22px;
}
.bp-card {
  background: var(--panel); border: 1px solid var(--rule); border-radius: 4px;
  margin-bottom: 14px; overflow: hidden;
  transition: box-shadow .2s, border-color .2s;
}
.bp-card.open { border-color: rgba(43,58,85,.35); box-shadow: 0 8px 30px -18px rgba(20,20,10,0.35); }
.bp-head {
  width: 100%; border: none; background: transparent; cursor: pointer;
  display: flex; align-items: baseline; gap: 14px; padding: 17px 20px 6px; text-align: left;
}
.bp-code {
  font-family: Georgia, serif; font-size: 13px; font-weight: 600;
  color: var(--accent); flex-shrink: 0; letter-spacing: 0.04em;
}
.bp-title { flex: 1; font-family: Georgia, serif; font-size: 20px; font-weight: 600; line-height: 1.25; }
.bp-chev { font-family: Georgia, serif; font-size: 20px; color: var(--muted); flex-shrink: 0; }
.bp-oneline { margin: 0; padding: 0 20px 18px 48px; color: var(--muted); font-size: 14px; line-height: 1.55; }

.bp-body { padding: 0 20px 20px; }
.anatomy { display: flex; flex-direction: column; gap: 2px; }
.layer { display: flex; gap: 0; background: #fff; border: 1px solid #ECE6D9; border-bottom: none; }
.layer:last-child { border-bottom: 1px solid #ECE6D9; }
.layer:first-child { border-radius: 3px 3px 0 0; }
.layer:last-child { border-radius: 0 0 3px 3px; }
.layer-rail { width: 4px; flex-shrink: 0; }
.layer-content { padding: 13px 16px 14px; flex: 1; }
.layer-key {
  display: flex; align-items: center; gap: 9px;
  font-family: Georgia, serif; font-size: 11.5px; font-weight: 600;
  letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 7px;
}
.layer-chip {
  font-size: 10px; border: 1px solid; border-radius: 2px; padding: 0px 4px; letter-spacing: 0;
}
.layer-text { font-size: 14px; line-height: 1.58; color: #23272E; }
.layer-text.lever { font-weight: 500; }
.small-hi .layer-content { background: #F4F8F1; }
.layer-actions { margin: 0; padding-left: 2px; list-style: none; display: flex; flex-direction: column; gap: 6px; }
.layer-actions li { position: relative; padding-left: 18px; font-size: 14px; line-height: 1.55; color: #23272E; }
.layer-actions li::before { content: "→"; position: absolute; left: 0; color: #5B4C1E; font-weight: 600; }
.layer-actions li.warn { color: #8a4a12; font-style: italic; }
.layer-actions li.warn::before { content: "⚠"; color: #b5720f; }

/* prose sections */
.prose { }
.grp { margin-bottom: 30px; }
.grp-sources {
  background: var(--panel); border: 1px solid var(--rule); border-radius: 8px;
  padding: 10px 14px; margin-top: 10px;
}
.grp-sources .grp-title { border-bottom: none; margin: 0 0 4px; font-size: 14px; color: var(--muted); }
.grp-sources .blk-h3 { font-size: 11.5px; color: var(--muted); margin: 10px 0 3px; }
.grp-sources .blk-p,
.grp-sources .blk-note,
.grp-sources .blk-bullet,
.grp-sources .blk-labeled { font-size: 11.5px; color: var(--muted); margin-bottom: 4px; }
.grp-sources .blk-labeled .lab,
.grp-sources .blk-labeled .lab-body { color: var(--muted) !important; }
.grp-sources .blk-bullet .tick { background: var(--muted); }
.grp-title {
  font-family: Georgia, serif; font-weight: 600; font-size: 20px;
  margin: 0 0 12px; padding-bottom: 7px; border-bottom: 1px solid var(--rule);
}
.blk-h2 { font-family: Georgia, serif; font-weight: 600; font-size: 18px; margin: 20px 0 8px; }
.blk-h3 { font-family: ui-sans-serif,system-ui,"Segoe UI",Roboto,Arial,sans-serif; font-weight: 600; font-size: 14px; color: var(--accent); margin: 16px 0 6px; letter-spacing: 0.02em; }
.blk-p { margin: 0 0 12px; font-size: 14.5px; line-height: 1.62; color: #2A2E36; }
.blk-note {
  font-size: 13px; color: var(--muted); font-style: italic; line-height: 1.6;
  border-left: 2px solid #B9C2D6; padding: 8px 0 8px 13px; margin: 6px 0 14px;
}
.blk-callout {
  font-size: 14px; line-height: 1.62; color: #2b2b26;
  background: #EEF2E9; border-left: 3px solid #4E7A3E;
  padding: 13px 16px; border-radius: 0 4px 4px 0; margin: 10px 0 16px;
}
.blk-bullet { display: flex; gap: 10px; align-items: flex-start; margin: 0 0 8px; font-size: 14px; line-height: 1.55; }
.blk-bullet .tick { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); margin-top: 8px; flex-shrink: 0; }
.blk-labeled { margin: 0 0 9px; font-size: 14px; line-height: 1.56; }
.blk-labeled .lab { font-weight: 600; }
.blk-labeled .lab-body { color: #2A2E36; }
.blk-labeled .lab::after { content: " — "; color: var(--muted); font-weight: 400; }

@media (max-width: 780px) {
  .hd { padding: 10px 14px; }
  .crumb { padding: 8px 12px; }
  .stage { padding: 20px 18px 60px; }
  .stage-title { font-size: 25px; }
  .bp-title { font-size: 17px; }
  .bp-oneline { padding-left: 20px; }
}

`;
