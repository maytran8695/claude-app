import { useState, useEffect } from "react";
import { getSubTabFromUrl, syncSubTabToUrl } from "../../utils/subTabUrl";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, AreaChart, Area, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell, Legend
} from "recharts";

/* ==================== TRUNG QUỐC (CN) ==================== */
const CN_C = {
  bg:"#FAF9F6", panel:"#FFFFFF", card:"#FFFFFF", card2:"#F3F6FB",
  border:"#E3E7EE", text:"#5B6472", bright:"#161A20", dim:"#8B93A0",
  muted:"#6B7280", gold:"#A9791E", red:"#B8433D", green:"#1F8F5C",
  blue:"#2568B3", purple:"#6D4FC4", orange:"#C36A2E", teal:"#1A8F8F",
};

const CN_GDP_DATA = [
  {y:"1978",g:11.7},{y:"1985",g:13.5},{y:"1990",g:3.8},{y:"1995",g:11.0},
  {y:"2000",g:8.4},{y:"2005",g:11.4},{y:"2008",g:9.6},{y:"2010",g:10.6},
  {y:"2012",g:7.9},{y:"2015",g:6.9},{y:"2018",g:6.6},{y:"2019",g:6.0},
  {y:"2020",g:2.3},{y:"2021",g:8.4},{y:"2022",g:3.0},{y:"2023",g:5.2},
];
const CN_DEBT_DATA = [
  {y:"2000",gov:20,corp:80,hh:20},{y:"2005",gov:28,corp:95,hh:30},
  {y:"2008",gov:28,corp:90,hh:28},{y:"2010",gov:37,corp:115,hh:38},
  {y:"2013",gov:42,corp:140,hh:46},{y:"2016",gov:48,corp:158,hh:58},
  {y:"2019",gov:52,corp:165,hh:64},{y:"2021",gov:50,corp:168,hh:63},
  {y:"2024",gov:55,corp:185,hh:70},
];
const CN_BIRTH_DATA = [
  {y:"1965",r:37.9},{y:"1970",r:33.4},{y:"1975",r:23.0},{y:"1980",r:18.2},
  {y:"1985",r:21.0},{y:"1990",r:21.1},{y:"1995",r:17.1},{y:"2000",r:14.0},
  {y:"2005",r:12.4},{y:"2010",r:11.9},{y:"2015",r:12.1},{y:"2018",r:10.9},
  {y:"2021",r:7.5},{y:"2022",r:6.8},{y:"2023",r:6.4},
];
const CN_PTI_DATA = [
  {city:"Thâm Quyến",v:50},{city:"Bắc Kinh",v:45},{city:"Thượng Hải",v:42},
  {city:"Hà Nội",v:22},{city:"London",v:15},{city:"Tokyo",v:14},{city:"New York",v:12},
];
const CN_LGFV_DATA = [
  {p:"Quý Châu",d:520},{p:"Vân Nam",d:430},{p:"Thiên Tân",d:390},
  {p:"Nội Mông",d:350},{p:"Trùng Khánh",d:320},{p:"Hắc LJ",d:290},{p:"Q.Đông",d:85},
];
const CN_MFG_PIE = [
  {n:"Trung Quốc",v:28.7},{n:"Mỹ",v:16.8},{n:"Nhật",v:7.5},
  {n:"Đức",v:5.3},{n:"Hàn Quốc",v:3.1},{n:"Ấn Độ",v:3.0},{n:"Khác",v:35.6},
];
const CN_RISK_RADAR = [
  {s:"Bất động sản",v:82},{s:"LGFV",v:85},{s:"Nhân khẩu",v:80},
  {s:"Niềm tin",v:78},{s:"Nợ DN",v:75},{s:"Địa CT",v:72},
  {s:"Chip/Tech",v:70},{s:"Shadow Bank",v:68},
];
const CN_DEPENDENCY = [
  {y:"2020",r:17.8},{y:"2025",r:20.1},{y:"2030",r:23.8},{y:"2035",r:28.2},
  {y:"2040",r:33.1},{y:"2045",r:38.4},{y:"2050",r:43.6},
];
const CN_PIE_COLORS = [CN_C.red,CN_C.blue,CN_C.gold,CN_C.green,CN_C.purple,CN_C.orange,CN_C.dim];

const CN_TT = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  return (
    <div style={{background:CN_C.panel,border:`1px solid ${CN_C.border}`,borderRadius:6,padding:"8px 12px"}}>
      <div style={{color:CN_C.gold,fontSize:11,fontWeight:700,marginBottom:4}}>{label}</div>
      {payload.map((p,i)=>(
        <div key={i} style={{color:p.color||CN_C.bright,fontSize:12}}>
          {p.name}: <span style={{fontFamily:"monospace",fontWeight:700}}>{typeof p.value==="number"?p.value.toFixed(1):p.value}</span>
        </div>
      ))}
    </div>
  );
};

const CN_Card = ({children,style={}}) => (
  <div style={{background:CN_C.card,border:`1px solid ${CN_C.border}`,borderRadius:8,padding:20,...style}}>{children}</div>
);
const CN_STitle = ({children,color=CN_C.gold}) => (
  <div style={{color,fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",
    marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
    <div style={{width:14,height:2,background:color,borderRadius:1,flexShrink:0}}/>{children}
  </div>
);
const CN_T = ({children}) => (
  <p style={{color:CN_C.text,fontSize:13.5,lineHeight:1.75,margin:"5px 0"}}>{children}</p>
);
const CN_B = ({children}) => <span style={{color:CN_C.bright,fontWeight:600}}>{children}</span>;
const CN_HL = ({children,c=CN_C.gold}) => <span style={{color:c,fontWeight:600}}>{children}</span>;
const CN_Metric = ({label,value,sub,color=CN_C.blue,warn}) => (
  <div style={{background:CN_C.card,border:`1px solid ${CN_C.border}`,borderRadius:8,
    padding:"14px 16px",borderTop:`3px solid ${color}`}}>
    <div style={{color:CN_C.muted,fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>{label}</div>
    <div style={{color,fontSize:22,fontWeight:700,fontFamily:"monospace",letterSpacing:"-0.02em"}}>{value}</div>
    {sub&&<div style={{color:CN_C.dim,fontSize:11,marginTop:3}}>{sub}</div>}
    {warn&&<div style={{color:CN_C.red,fontSize:10,marginTop:2,fontWeight:700}}>{warn}</div>}
  </div>
);
const CN_Badge = ({level}) => {
  const m={"Rất Cao":"#B8222C",Cao:CN_C.red,"Trung Bình":CN_C.gold,Thấp:CN_C.green};
  const c=m[level]||CN_C.gold;
  return <span style={{background:c+"20",color:c,border:`1px solid ${c}40`,
    borderRadius:4,padding:"2px 8px",fontSize:10,fontWeight:700}}>{level}</span>;
};
const CN_Grid = ({cols=2,gap=16,children}) => (
  <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap}}>{children}</div>
);
const CN_TL = ({events}) => (
  <div style={{position:"relative",paddingLeft:22}}>
    <div style={{position:"absolute",left:7,top:4,bottom:4,width:1.5,background:CN_C.border}}/>
    {events.map((e,i)=>(
      <div key={i} style={{marginBottom:14,position:"relative"}}>
        <div style={{position:"absolute",left:-18,top:4,width:9,height:9,borderRadius:"50%",
          background:e.color||CN_C.gold,boxShadow:`0 0 6px ${e.color||CN_C.gold}60`}}/>
        <div style={{color:e.color||CN_C.gold,fontSize:10,fontWeight:700,letterSpacing:"0.06em"}}>{e.year}</div>
        <div style={{color:CN_C.bright,fontSize:13,fontWeight:600,marginTop:1}}>{e.title}</div>
        <div style={{color:CN_C.text,fontSize:12,lineHeight:1.6,marginTop:2}}>{e.desc}</div>
      </div>
    ))}
  </div>
);

function CN_TabDashboard() {
  return (
    <div>
      <div style={{marginBottom:20,padding:"16px 20px",background:CN_C.panel,borderRadius:8,
        border:`1px solid ${CN_C.border}`,borderLeft:`4px solid ${CN_C.gold}`}}>
        <div style={{color:CN_C.gold,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>LUẬN ĐIỂM CỐT LÕI</div>
        <p style={{color:CN_C.bright,fontSize:14,lineHeight:1.75,margin:0}}>
          Trung Quốc không đang "sụp đổ" — nhưng <CN_HL>mô hình tăng trưởng cũ đã cạn kiệt</CN_HL>. Ba chuyển đổi khó khăn xảy ra đồng thời:{" "}
          <CN_HL c={CN_C.blue}>tái cơ cấu kinh tế</CN_HL>, <CN_HL c={CN_C.red}>khủng hoảng nhân khẩu không thể đảo ngược</CN_HL>, và{" "}
          <CN_HL c={CN_C.orange}>điều chỉnh địa chính trị</CN_HL> từ công xưởng được chào đón sang đối thủ chiến lược bị kiềm chế —
          dưới một hệ thống thiếu cơ chế tự điều chỉnh.
        </p>
      </div>
      <CN_Grid cols={3} gap={12} style={{marginBottom:16}}>
        <CN_Metric label="Tổng Nợ / GDP" value="~310%" sub="Tăng từ 140% năm 2008" color={CN_C.red} warn="↑ Ngưỡng rủi ro cao"/>
        <CN_Metric label="Tăng Trưởng GDP 2023" value="5.2%" sub="Vs đỉnh 10.6% năm 2010" color={CN_C.blue}/>
        <CN_Metric label="Tỷ Lệ Sinh (TFR) 2023" value="1.09" sub="Cần 2.1 để dân số ổn định" color={CN_C.orange} warn="↓ Thấp hơn cả Nhật Bản"/>
        <CN_Metric label="Thất Nghiệp Thanh Niên" value="21.3%" sub="Đỉnh 6/2023 — rồi ngừng báo cáo" color={CN_C.red}/>
        <CN_Metric label="Nợ LGFV Ước Tính" value="$7–9T" sub="Phần lớn ngoài bảng ngân sách" color={CN_C.purple}/>
        <CN_Metric label="Gini Coefficient" value="~0.48" sub="Cao hơn Mỹ (0.41), Châu Âu (0.30)" color={CN_C.gold}/>
      </CN_Grid>
      <CN_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <CN_Card>
          <CN_STitle>Tăng Trưởng GDP 1978–2023 (%)</CN_STitle>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={CN_GDP_DATA} margin={{top:5,right:10,bottom:5,left:-20}}>
              <defs>
                <linearGradient id="gG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CN_C.blue} stopOpacity={0.35}/>
                  <stop offset="95%" stopColor={CN_C.blue} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="y" tick={{fill:CN_C.dim,fontSize:9}} axisLine={{stroke:CN_C.border}} tickLine={false}/>
              <YAxis tick={{fill:CN_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <Tooltip content={<CN_TT/>}/>
              <Area type="monotone" dataKey="g" stroke={CN_C.blue} fill="url(#gG)" strokeWidth={2} name="GDP %"/>
            </AreaChart>
          </ResponsiveContainer>
        </CN_Card>
        <CN_Card>
          <CN_STitle>Radar Rủi Ro Hệ Thống (0–100)</CN_STitle>
          <ResponsiveContainer width="100%" height={210}>
            <RadarChart data={CN_RISK_RADAR} margin={{top:5,right:25,bottom:5,left:25}}>
              <PolarGrid stroke={CN_C.border}/>
              <PolarAngleAxis dataKey="s" tick={{fill:CN_C.dim,fontSize:9}}/>
              <PolarRadiusAxis angle={90} domain={[0,100]} tick={{fill:CN_C.dim,fontSize:8}}/>
              <Radar dataKey="v" stroke={CN_C.red} fill={CN_C.red} fillOpacity={0.22} strokeWidth={1.5} name="Rủi Ro"/>
            </RadarChart>
          </ResponsiveContainer>
        </CN_Card>
      </CN_Grid>
      <CN_Card style={{marginBottom:16}}>
        <CN_STitle>Tổng Nợ Theo Thành Phần / GDP (%) — 2000 đến 2024</CN_STitle>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={CN_DEBT_DATA} margin={{top:5,right:10,bottom:5,left:-10}}>
            <XAxis dataKey="y" tick={{fill:CN_C.dim,fontSize:10}} axisLine={{stroke:CN_C.border}} tickLine={false}/>
            <YAxis tick={{fill:CN_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip content={<CN_TT/>}/>
            <Legend wrapperStyle={{color:CN_C.dim,fontSize:11}}/>
            <Bar dataKey="gov" stackId="a" fill={CN_C.blue} name="Chính phủ"/>
            <Bar dataKey="corp" stackId="a" fill={CN_C.red} name="Doanh nghiệp"/>
            <Bar dataKey="hh" stackId="a" fill={CN_C.gold} name="Hộ gia đình"/>
          </BarChart>
        </ResponsiveContainer>
      </CN_Card>
      <CN_Grid cols={3} gap={12}>
        {[
          {n:"Kịch Bản 1",t:"Soft Landing + Cải Cách",p:"20–25%",c:CN_C.green,
            d:"Rebalance thành công sang tiêu dùng nội địa. Tăng trưởng 3–4% nhưng bền vững. Đòi hỏi cải cách thể chế sâu — mâu thuẫn với mô hình tập trung quyền lực của Xi."},
          {n:"Kịch Bản 2 — CƠ SỞ",t:"Japanification",p:"50–55%",c:CN_C.gold,
            d:"Stagnation kéo dài như Nhật 1990s. Tăng trưởng 2–3%, deflation dai dẳng, nợ quản lý bằng gia hạn. Khác Nhật: Trung Quốc 'già trước khi giàu' và thiếu đệm dân chủ."},
          {n:"Kịch Bản 3",t:"Hard Landing",p:"20–25%",c:CN_C.red,
            d:"Cú sốc ngoại sinh kích hoạt khủng hoảng hệ thống: leo thang Đài Loan + trừng phạt toàn diện, bank run nhiều ngân hàng địa phương, LGFV vỡ đồng loạt."},
        ].map((s,i)=>(
          <div key={i} style={{background:CN_C.card,border:`1px solid ${CN_C.border}`,borderRadius:8,
            padding:16,borderTop:`3px solid ${s.c}`}}>
            <div style={{color:CN_C.muted,fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase"}}>{s.n}</div>
            <div style={{color:s.c,fontSize:13,fontWeight:700,margin:"4px 0"}}>{s.t}</div>
            <div style={{color:s.c,fontSize:20,fontWeight:700,fontFamily:"monospace",marginBottom:8}}>{s.p}</div>
            <div style={{color:CN_C.text,fontSize:12,lineHeight:1.65}}>{s.d}</div>
          </div>
        ))}
      </CN_Grid>
    </div>
  );
}

function CN_TabGrowth() {
  return (
    <div>
      <CN_Card style={{marginBottom:16,borderLeft:`4px solid ${CN_C.gold}`}}>
        <CN_STitle>Financial Repression — Áp Bức Tài Chính Có Chủ Đích</CN_STitle>
        <CN_T>Đây là nền tảng ít được nói đến nhất nhưng quan trọng nhất. Suốt 3 thập kỷ, PBOC duy trì <CN_B>lãi suất tiền gửi thấp hơn lạm phát thực tế</CN_B> — tức là <CN_HL>lãi suất thực âm</CN_HL>. Đây không phải lỗi chính sách — đây là thiết kế có chủ đích. Michael Pettis (Peking University) gọi đây là "financial repression at scale."</CN_T>
        <div style={{margin:"12px 0",padding:16,background:CN_C.card2,borderRadius:8,border:`1px solid ${CN_C.border}`}}>
          <div style={{color:CN_C.gold,fontSize:10,fontWeight:700,marginBottom:10,letterSpacing:"0.08em"}}>CƠ CHẾ HOẠT ĐỘNG:</div>
          {[
            {n:"01",t:"Lãi suất tiết kiệm giữ thấp hơn lạm phát → lãi suất thực âm",c:CN_C.red},
            {n:"02",t:"Người dân vẫn phải gửi tiết kiệm vì thiếu mạng an sinh (y tế, hưu trí yếu)",c:CN_C.orange},
            {n:"03",t:"Ngân hàng nhà nước huy động nguồn vốn khổng lồ với chi phí rẻ",c:CN_C.gold},
            {n:"04",t:"Vốn rẻ đổ vào SOE và chính quyền địa phương → đầu tư hạ tầng + sản xuất → GDP tăng",c:CN_C.blue},
            {n:"05",t:"Phần chênh lệch lãi suất = khoản trợ cấp ẩn từ hộ gia đình sang nhà nước: 2–4% GDP/năm × 30 năm",c:CN_C.green},
          ].map(s=>(
            <div key={s.n} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
              <div style={{color:s.c,fontWeight:700,fontFamily:"monospace",fontSize:11,minWidth:22}}>{s.n}</div>
              <div style={{color:CN_C.text,fontSize:12.5,lineHeight:1.65}}>→ {s.t}</div>
            </div>
          ))}
        </div>
        <CN_T><CN_B>Tỷ lệ tiêu dùng nội địa/GDP của Trung Quốc (~37–38%)</CN_B> — thấp nhất thế giới so với các nền kinh tế tương đương. Đây là kết quả trực tiếp của financial repression: người dân tạo ra GDP nhưng không được hưởng phần tương xứng.</CN_T>
      </CN_Card>
      <CN_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <CN_Card>
          <CN_STitle color={CN_C.blue}>Hukou System — Kiểm Soát Lao Động Có Hệ Thống</CN_STitle>
          <CN_T>Hộ khẩu chia dân số thành hai tầng công dân. Người di cư <CN_B>không có hukou đô thị</CN_B> = không được hưởng giáo dục công cho con, bảo hiểm y tế đầy đủ, quyền mua nhà tại thành phố.</CN_T>
          {[
            {l:"Lao động nhập cư",v:"280–300 triệu",c:CN_C.blue},
            {l:"Không có công đoàn thực chất",v:"Dễ sa thải, không bồi thường",c:CN_C.red},
            {l:"Khi suy thoái → tự 'biến' về nông thôn",v:"Thống kê thất nghiệp đẹp hơn thực tế",c:CN_C.gold},
            {l:"Thất nghiệp TN đỉnh 6/2023",v:"21.3% — rồi ngừng báo cáo 4 tháng",c:CN_C.red},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",
              padding:"8px 0",borderBottom:`1px solid ${CN_C.border}30`}}>
              <span style={{color:CN_C.text,fontSize:12,flex:1}}>{r.l}</span>
              <span style={{color:r.c,fontSize:11,fontWeight:700,textAlign:"right",maxWidth:"45%",marginLeft:8}}>{r.v}</span>
            </div>
          ))}
        </CN_Card>
        <CN_Card>
          <CN_STitle color={CN_C.orange}>Hệ Thống Đất Đai — Vòng Tròn Tài Chính Ẩn</CN_STitle>
          <CN_T>Theo Hiến pháp, <CN_B>toàn bộ đất đai thuộc sở hữu nhà nước</CN_B>. Người dân chỉ có quyền sử dụng 70 năm (nhà ở) hoặc 50 năm (thương mại). Đây là nền tảng của toàn bộ mô hình tài chính địa phương.</CN_T>
          <div style={{margin:"10px 0",padding:12,background:`${CN_C.orange}10`,borderRadius:6,border:`1px solid ${CN_C.orange}25`}}>
            <div style={{color:CN_C.orange,fontSize:10,fontWeight:700,marginBottom:6}}>VÒNG TRÒN ĐẤT → NỢ → TĂNG TRƯỞNG:</div>
            <div style={{color:CN_C.text,fontSize:12,lineHeight:1.8}}>
              Thu hồi đất nông thôn (giá đền bù thấp) → Chuyển đổi thành đất đô thị → Đấu giá cho developer (giá cao 10–100x) → Nguồn thu địa phương → Trả nợ LGFV → Vay thêm → Xây hạ tầng → Giá đất tăng → Lặp lại
            </div>
          </div>
          <CN_T>Tổng giá trị đất đai Trung Quốc ước tính <CN_HL>~200–250% GDP</CN_HL> — tỷ lệ cao nhất trong lịch sử bất kỳ nền kinh tế lớn nào. Khi tài sản này giảm giá, <CN_B>toàn bộ cấu trúc tài chính bị ảnh hưởng đồng loạt</CN_B>.</CN_T>
        </CN_Card>
      </CN_Grid>
      <CN_Card style={{marginBottom:16}}>
        <CN_STitle color={CN_C.green}>Tại Sao Tăng Trưởng Thần Tốc Rồi Chậm Lại?</CN_STitle>
        <CN_Grid cols={2} gap={20}>
          <div>
            <div style={{color:CN_C.green,fontSize:10,fontWeight:700,marginBottom:10,letterSpacing:"0.08em"}}>4 LỰC ĐẨY HỘI TỤ 1980–2010</div>
            {[
              {t:"Demographic Dividend",d:"Dân số trẻ đông, tỷ lệ phụ thuộc thấp → tiết kiệm cao, lao động dồi dào rẻ"},
              {t:"Catch-up Effect",d:"Bắt đầu từ mức thấp → nhập khẩu công nghệ sẵn có → năng suất tăng nhanh mà không cần R&D"},
              {t:"WTO 2001 + Toàn Cầu Hóa",d:"Hàng trăm triệu lao động giá rẻ kết nối trực tiếp vào chuỗi cung ứng toàn cầu"},
              {t:"Đô Thị Hóa Quy Mô Lớn",d:"Di cư nông thôn → thành thị → năng suất cá nhân tăng vọt → tiêu dùng nội địa tăng"},
            ].map((item,i)=>(
              <div key={i} style={{marginBottom:10,paddingLeft:12,borderLeft:`2px solid ${CN_C.green}`}}>
                <div style={{color:CN_C.green,fontSize:12,fontWeight:700}}>{item.t}</div>
                <div style={{color:CN_C.text,fontSize:12,lineHeight:1.65}}>{item.d}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{color:CN_C.red,fontSize:10,fontWeight:700,marginBottom:10,letterSpacing:"0.08em"}}>TẤT CẢ ĐÃ CẠN KIỆT / ĐẢO CHIỀU SAU 2012</div>
            {[
              {t:"Nhân khẩu đảo chiều",d:"Lực lượng lao động đạt đỉnh 2011. Dân số giảm từ 2022. Tỷ lệ sinh 1.09 TFR"},
              {t:"Catch-up gap thu hẹp",d:"Bị Mỹ chặn chip cao cấp. Khó nhập công nghệ hơn. Khoảng cách năng suất hẹp lại"},
              {t:"Toàn cầu hóa đảo chiều",d:"Chiến tranh thương mại, China+1 strategy, reshoring về Mỹ-EU-Nhật"},
              {t:"Đô thị hóa bão hòa",d:"Đã đạt ~65–66%. Giá nhà quá cao hạn chế di cư thêm. Ghost cities tồn tại"},
            ].map((item,i)=>(
              <div key={i} style={{marginBottom:10,paddingLeft:12,borderLeft:`2px solid ${CN_C.red}`}}>
                <div style={{color:CN_C.red,fontSize:12,fontWeight:700}}>{item.t}</div>
                <div style={{color:CN_C.text,fontSize:12,lineHeight:1.65}}>{item.d}</div>
              </div>
            ))}
          </div>
        </CN_Grid>
        <div style={{marginTop:12,padding:12,background:`${CN_C.gold}10`,borderRadius:6,border:`1px solid ${CN_C.gold}25`}}>
          <span style={{color:CN_C.gold,fontWeight:700,fontSize:13}}>ICOR (Incremental Capital-Output Ratio): </span>
          <span style={{color:CN_C.text,fontSize:13}}>Từ 3–4 (thập niên 2000s) → 6–8+ (2020s). Cần ngày càng nhiều vốn để tạo ra 1 đồng GDP mới. Dấu hiệu cổ điển của nền kinh tế đang cạn kiệt mô hình tăng trưởng cũ và chưa tìm được mô hình mới.</span>
        </div>
      </CN_Card>
      <CN_Grid cols={2} gap={16}>
        <CN_Card>
          <CN_STitle color={CN_C.purple}>Dual Circulation — Chiến Lược Vòng Kép (2020)</CN_STitle>
          <CN_T>Phản ứng của Xi Jinping trước decoupling của Mỹ: <CN_B>"Internal circulation"</CN_B> (tiêu dùng nội địa làm động cơ chính) + <CN_B>"External circulation"</CN_B> (xuất khẩu làm phụ trợ).</CN_T>
          <div style={{padding:12,background:`${CN_C.red}08`,borderRadius:6,border:`1px solid ${CN_C.red}20`,marginTop:8}}>
            <div style={{color:CN_C.red,fontSize:10,fontWeight:700,marginBottom:6}}>VẤN ĐỀ CỐT LÕI:</div>
            <CN_T>Internal circulation đòi hỏi đúng những cải cách Xi không muốn thực hiện: redistribution of wealth, giảm vai trò SOE, tăng độc lập tư pháp, mở rộng an sinh xã hội. Không làm được → cầu nội địa mãi yếu → phụ thuộc xuất khẩu → mâu thuẫn với decoupling.</CN_T>
          </div>
        </CN_Card>
        <CN_Card>
          <CN_STitle color={CN_C.teal}>"New Quality Productive Forces" (2024)</CN_STitle>
          <CN_T>Khái niệm Xi Jinping đưa ra — tập trung vào công nghệ cao, AI, EV, năng lượng mới làm động lực tăng trưởng mới. Được truyền thông nhà nước đẩy mạnh từ đầu 2024.</CN_T>
          <div style={{padding:12,background:`${CN_C.teal}10`,borderRadius:6,border:`1px solid ${CN_C.teal}25`,marginTop:8}}>
            <div style={{color:CN_C.teal,fontSize:10,fontWeight:700,marginBottom:6}}>ĐÁNH GIÁ THỰC TẾ:</div>
            <CN_T>Về bản chất vẫn là mô hình đầu tư-xuất khẩu cũ nhưng với nhãn "high-tech" mới. Overcapacity EV và solar đang gây căng thẳng thương mại toàn cầu — cùng cơ chế với overcapacity thép thập niên 2010s. <CN_B>Chưa giải quyết được vấn đề cầu nội địa yếu.</CN_B></CN_T>
          </div>
        </CN_Card>
      </CN_Grid>
    </div>
  );
}

function CN_TabFinance() {
  return (
    <div>
      <CN_Card style={{marginBottom:16}}>
        <CN_STitle color={CN_C.orange}>Shadow Banking — Cỗ Máy Tài Chính Song Song</CN_STitle>
        <CN_T>Shadow banking Trung Quốc không giống phương Tây. Nó xuất hiện vì nhu cầu thực: <CN_B>SOE và chính quyền địa phương đã chiếm hết tín dụng ngân hàng chính thức</CN_B> → doanh nghiệp tư nhân vừa và nhỏ không tiếp cận được vốn → shadow banking lấp đầy khoảng trống.</CN_T>
        <CN_Grid cols={2} gap={12} style={{marginTop:12}}>
          {[
            {tier:"Tầng 1",t:"Wealth Management Products (WMP)",c:CN_C.red,
              d:"Ngân hàng bán sản phẩm hứa lợi suất 5–8%, cao hơn tiết kiệm thông thường. Đầu tư vào BĐS, LGFV bond. Đỉnh 2017: ~$4 nghìn tỷ. Người mua ngầm hiểu có bảo lãnh ngân hàng — pháp lý thì không."},
            {tier:"Tầng 2",t:"Trust Companies (68 công ty)",c:CN_C.orange,
              d:"Quản lý ~$3 nghìn tỷ. Huy động tiền từ nhà đầu tư giàu, đổ vào BĐS và hạ tầng. Zhongrong International Trust vỡ nợ 8/2023 — không thanh toán được cho hàng nghìn nhà đầu tư."},
            {tier:"Tầng 3",t:"P2P Lending (đã bị xóa sổ 2020–21)",c:CN_C.gold,
              d:"Từng có 6,000+ nền tảng, tổng dư nợ ~$200 tỷ. Sau vụ Ezubao lừa 900,000 nhà đầu tư ($7.6 tỷ), chính phủ xóa sổ gần 100% ngành. Nhà đầu tư mất trắng hàng chục tỷ USD."},
            {tier:"Tầng 4",t:"Underground Banking",c:CN_C.purple,
              d:"Chuyển tiền ngầm qua mạng lưới tiệm vàng, cửa hàng đổi tiền, kết nối HK–đại lục. Ước tính hàng trăm tỷ USD/năm, phục vụ cả hợp pháp (tránh kiểm soát vốn) lẫn phi pháp."},
          ].map((item,i)=>(
            <div key={i} style={{background:CN_C.card2,border:`1px solid ${item.c}30`,borderRadius:8,
              padding:14,borderLeft:`3px solid ${item.c}`}}>
              <div style={{color:item.c,fontSize:9,fontWeight:700,letterSpacing:"0.1em"}}>{item.tier}</div>
              <div style={{color:CN_C.bright,fontSize:13,fontWeight:600,margin:"4px 0"}}>{item.t}</div>
              <div style={{color:CN_C.text,fontSize:12,lineHeight:1.65}}>{item.d}</div>
            </div>
          ))}
        </CN_Grid>
      </CN_Card>
      <CN_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <CN_Card>
          <CN_STitle color={CN_C.blue}>PBOC — Bốn Bức Tường Ràng Buộc</CN_STitle>
          {[
            {w:"Tường 1",t:"Kiểm soát vốn",c:CN_C.red,
              d:"Không thể tự do hóa tài khoản vốn vì dòng vốn sẽ chảy ra ồ ạt. 2015–2016: dự trữ giảm từ $4T xuống $3T trong 18 tháng khi kiểm soát lỏng hơn."},
            {w:"Tường 2",t:"Tỷ giá NDT",c:CN_C.orange,
              d:"NDT không phải đồng tiền dự trữ thực sự. Tăng giá → xuất khẩu mất cạnh tranh. Giảm giá → nhập khẩu lạm phát, dòng vốn chảy ra. Can thiệp liên tục."},
            {w:"Tường 3",t:"Lãi suất",c:CN_C.gold,
              d:"Hạ lãi suất kích thích → vốn chảy ra (nhất là khi Fed tăng lãi suất). Giữ cao → nghẹt thở doanh nghiệp đang gánh nợ lớn."},
            {w:"Tường 4",t:"Deflation / Giảm Phát",c:CN_C.purple,
              d:"CPI dưới 0 nhiều tháng 2023–2024 trong khi thế giới vật lộn lạm phát. Deflation nguy hiểm: kích thích hoãn tiêu dùng chờ giá xuống thêm → vòng xoáy Nhật Bản."},
          ].map((item,i)=>(
            <div key={i} style={{marginBottom:12,paddingLeft:12,borderLeft:`2px solid ${item.c}`}}>
              <div style={{color:item.c,fontSize:11,fontWeight:700}}>{item.w}: {item.t}</div>
              <div style={{color:CN_C.text,fontSize:12,lineHeight:1.65}}>{item.d}</div>
            </div>
          ))}
        </CN_Card>
        <CN_Card>
          <CN_STitle color={CN_C.teal}>Cấu Trúc Ngân Hàng & Nợ Xấu Ẩn</CN_STitle>
          {[
            {l:"Big 6 (ICBC, CCB, ABC, BOC, BOCOM, Postal)",v:"~40% tài sản hệ thống",c:CN_C.blue},
            {l:"City & Rural Commercial Banks",v:"Vùng rủi ro cao nhất",c:CN_C.red},
            {l:"NPL báo cáo chính thức",v:"~1.6–1.8%",c:CN_C.gold},
            {l:"NPL ước tính thực tế (Nomura/IMF)",v:"Gấp 3–5x báo cáo",c:CN_C.red},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",
              padding:"8px 0",borderBottom:`1px solid ${CN_C.border}30`}}>
              <span style={{color:CN_C.text,fontSize:12,flex:1}}>{r.l}</span>
              <span style={{color:r.c,fontSize:12,fontWeight:700,textAlign:"right",marginLeft:8}}>{r.v}</span>
            </div>
          ))}
          <div style={{marginTop:12,padding:10,background:`${CN_C.red}10`,borderRadius:6,border:`1px solid ${CN_C.red}25`}}>
            <div style={{color:CN_C.red,fontSize:10,fontWeight:700,marginBottom:6}}>NPL XẤU ĐƯỢC ẨN QUA:</div>
            <div style={{color:CN_C.text,fontSize:12,lineHeight:1.7}}>
              • Evergreening: gia hạn nợ liên tục thay vì ghi nhận xấu<br/>
              • Chuyển nợ vào SPV ngoài bảng cân đối<br/>
              • Ngân hàng địa phương nhỏ mua nợ xấu của nhau<br/>
              • Henan 2022: 6 ngân hàng đóng băng $1.5B tiền gửi của 400,000 người
            </div>
          </div>
          <CN_T><CN_HL>Tại sao chưa sụp đổ?</CN_HL> Nhà nước vừa là chủ sở hữu vừa là người bảo lãnh cuối cùng. Đây là hệ thống phân phối nguồn lực chính trị qua hình thức ngân hàng — không phải hệ thống thị trường.</CN_T>
        </CN_Card>
      </CN_Grid>
      <CN_Card>
        <CN_STitle color={CN_C.purple}>Thị Trường A-Share & RMB Quốc Tế Hóa — Hai Thất Bại Âm Thầm</CN_STitle>
        <CN_Grid cols={2} gap={16}>
          <div>
            <div style={{color:CN_C.purple,fontSize:10,fontWeight:700,marginBottom:8,letterSpacing:"0.08em"}}>THỊ TRƯỜNG A-SHARE — NGẮT KẾT NỐI VỚI KINH TẾ</div>
            <CN_T><CN_HL c={CN_C.purple}>Nghịch lý lớn nhất:</CN_HL> Shanghai Composite 2024 gần bằng mức 2007 (!) — trong khi GDP tăng 3–4 lần. Đây không phải thị trường phản ánh kinh tế — mà là <CN_B>công cụ huy động vốn cho SOE</CN_B>.</CN_T>
            {[
              {l:"Nhà đầu tư cá nhân",v:"80%+ khối lượng giao dịch"},
              {l:"'National Team' can thiệp 2015",v:"Mua $300B+ cổ phiếu"},
              {l:"Circuit breakers 1/2016",v:"Thất bại thảm hại, gây panic"},
              {l:"Sector ban EdTech 7/2021",v:"$100B+ giá trị biến mất trong vài ngày"},
            ].map((r,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${CN_C.border}25`}}>
                <span style={{color:CN_C.text,fontSize:12}}>{r.l}</span>
                <span style={{color:CN_C.purple,fontSize:12,fontWeight:700}}>{r.v}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{color:CN_C.teal,fontSize:10,fontWeight:700,marginBottom:8,letterSpacing:"0.08em"}}>RMB QUỐC TẾ HÓA — THAM VỌNG CHƯA THÀNH</div>
            {[
              {l:"RMB trong SWIFT toàn cầu",v:"~2.5%",c:CN_C.red},
              {l:"USD trong SWIFT toàn cầu",v:"~47%",c:CN_C.green},
              {l:"CIPS (SWIFT thay thế TQ)",v:"100+ quốc gia, volume nhỏ",c:CN_C.gold},
              {l:"Saudi yuan oil deal",v:"Biểu tượng, không hệ thống",c:CN_C.dim},
              {l:"Digital Yuan (e-CNY)",v:"Công cụ giám sát, không QT",c:CN_C.orange},
            ].map((r,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${CN_C.border}25`}}>
                <span style={{color:CN_C.text,fontSize:12}}>{r.l}</span>
                <span style={{color:r.c||CN_C.teal,fontSize:12,fontWeight:700}}>{r.v}</span>
              </div>
            ))}
            <div style={{marginTop:10,padding:10,background:`${CN_C.red}10`,borderRadius:6,border:`1px solid ${CN_C.red}20`}}>
              <div style={{color:CN_C.text,fontSize:12,lineHeight:1.7}}>Điều kiện reserve currency: <span style={{color:CN_C.red}}>rule of law + thị trường mở + kiểm soát vốn tự do</span> — cả ba đều mâu thuẫn với mô hình CCP.</div>
            </div>
          </div>
        </CN_Grid>
      </CN_Card>
    </div>
  );
}

function CN_TabRealEstate() {
  return (
    <div>
      <CN_Grid cols={4} gap={12} style={{marginBottom:16}}>
        <CN_Metric label="BĐS + Liên Quan / GDP" value="25–30%" sub="Lớn nhất trong lịch sử kinh tế hiện đại" color={CN_C.red}/>
        <CN_Metric label="Tài Sản HGĐ trong BĐS" value="70–80%" sub="Mỹ chỉ ~30%" color={CN_C.orange}/>
        <CN_Metric label="Căn Hộ Bỏ Trống" value="65–80M" sub="Ghost cities — đô thị ma" color={CN_C.red}/>
        <CN_Metric label="Nhà Đã Bán Chưa Xây" value="~20M căn" sub='"Rotten buildings" 烂尾楼' color={CN_C.red} warn="Rủi ro rất cao"/>
      </CN_Grid>
      <CN_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <CN_Card>
          <CN_STitle>Price-to-Income (PTI) — Số Năm Lương Để Mua Nhà</CN_STitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={CN_PTI_DATA} layout="vertical" margin={{top:5,right:30,bottom:5,left:10}}>
              <XAxis type="number" tick={{fill:CN_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis type="category" dataKey="city" tick={{fill:CN_C.text,fontSize:11}} axisLine={false} tickLine={false} width={75}/>
              <Tooltip content={<CN_TT/>}/>
              <Bar dataKey="v" name="PTI (năm)" radius={[0,4,4,0]}>
                {CN_PTI_DATA.map((_,i)=>(
                  <Cell key={i} fill={CN_PTI_DATA[i].v>30?CN_C.red:CN_PTI_DATA[i].v>20?CN_C.orange:CN_C.green}/>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{color:CN_C.dim,fontSize:11,marginTop:4}}>* Đỏ = khủng hoảng | Cam = căng thẳng | Xanh = bình thường</div>
        </CN_Card>
        <CN_Card>
          <CN_STitle color={CN_C.red}>Timeline Khủng Hoảng BĐS</CN_STitle>
          <CN_TL events={[
            {year:"2017",title:'"Nhà để ở, không để đầu cơ"',color:CN_C.blue,desc:"Xi tuyên bố định hướng — bắt đầu chuỗi thắt chặt chính sách"},
            {year:"8/2020",title:"Three Red Lines",color:CN_C.orange,desc:"Siết tín dụng developer theo 3 chỉ tiêu tài chính chặt chẽ"},
            {year:"12/2021",title:"Evergrande vỡ nợ kỹ thuật",color:CN_C.red,desc:"Nợ $300B+. Kéo theo Country Garden, Sunac, Shimao và hàng chục developer khác"},
            {year:"7/2022",title:"Mortgage Boycott — 90+ thành phố",color:CN_C.red,desc:"Người mua đồng loạt ngừng trả góp. Phong trào bất tuân tài chính đầu tiên của TQ"},
            {year:"2023",title:"Doanh số giảm 35–40% vs đỉnh 2021",color:CN_C.orange,desc:"Chính phủ bắt đầu mua nhà tồn kho trực tiếp để chống deflation spiral"},
            {year:"11/2024",title:"Gói 6 nghìn tỷ CNY",color:CN_C.gold,desc:"Hoán đổi nợ ẩn sang nợ chính thức. Kéo dài vấn đề, chưa giải quyết root cause"},
          ]}/>
        </CN_Card>
      </CN_Grid>
      <CN_Card style={{marginBottom:16}}>
        <CN_STitle color={CN_C.orange}>Pre-Sale Model — Bom Hẹn Giờ Kiến Trúc Tài Chính</CN_STitle>
        <CN_T>Mô hình bán nhà trước khi xây chiếm <CN_B>~85–90% doanh số nhà mới</CN_B> Trung Quốc. Tạo ra cấu trúc tài chính Ponzi hợp pháp:</CN_T>
        <div style={{margin:"10px 0",padding:14,background:CN_C.card2,borderRadius:8,display:"flex",flexWrap:"wrap",gap:6,alignItems:"center"}}>
          {["Người mua trả 100% tiền","→","Developer dùng mua đất mới","→","Thế chấp đất vay ngân hàng","→","Mua thêm đất","→","Vòng lặp Ponzi hợp pháp"].map((s,i)=>(
            <span key={i} style={{color:s==="→"?CN_C.dim:s.includes("Ponzi")?CN_C.red:CN_C.text,fontSize:12.5,fontWeight:s.includes("Ponzi")?700:400}}>{s}</span>
          ))}
        </div>
        <CN_T>Evergrande ở đỉnh: <CN_B>1,300+ dự án</CN_B> đồng thời tại <CN_B>280+ thành phố</CN_B>. Khi doanh số giảm → không có tiền mới → không xây được nhà đã bán → người mua mất tiền nhưng vẫn trả góp ngân hàng.</CN_T>
        <div style={{marginTop:10,padding:12,background:`${CN_C.red}08`,borderRadius:6,border:`1px solid ${CN_C.red}20`}}>
          <CN_HL c={CN_C.red}>"Mortgage Boycott" 7/2022:</CN_HL><span style={{color:CN_C.text,fontSize:13}}> Người mua tại 90+ thành phố đồng loạt tuyên bố ngừng trả góp cho đến khi nhà hoàn thiện. Đây là lần đầu tiên Trung Quốc có phong trào bất tuân dân sự tài chính có tổ chức. Lan ra hàng trăm dự án. Tín hiệu quan trọng về sự xói mòn niềm tin.</span>
        </div>
      </CN_Card>
      <CN_Card>
        <CN_STitle color={CN_C.purple}>Tại Sao Chính Phủ Không Cứu Như 2008–2015?</CN_STitle>
        <CN_Grid cols={2} gap={12}>
          {[
            {n:"Quy mô quá lớn",d:"Tổng nợ developer $500–700B+ (chỉ tính chính thức). Cứu toàn bộ tạo moral hazard vô cùng lớn và đòi hỏi lượng tiền khổng lồ — không khả thi về chính trị."},
            {n:"Chính sách chủ động từ 2017",d:'"Nhà để ở, không đầu cơ" và Ba Red Lines là thực thi chủ ý — muốn tái phân bổ vốn khỏi BĐS vào sản xuất công nghệ cao.'},
            {n:"Giới hạn tài khóa trung ương",d:"Không muốn nhận nợ LGFV và developer vào bảng cân đối của mình — mất dư địa tài khóa cho khủng hoảng tương lai."},
            {n:"Thực tế chính trị",d:"Cứu developer là cứu tầng lớp tư bản địa ốc — không phù hợp với narrative Common Prosperity. Để phá sản có chọn lọc là phù hợp nghị trình chính trị."},
          ].map((item,i)=>(
            <div key={i} style={{padding:12,background:CN_C.card2,borderRadius:6,border:`1px solid ${CN_C.border}`}}>
              <div style={{color:CN_C.purple,fontSize:12,fontWeight:700,marginBottom:5}}>{item.n}</div>
              <div style={{color:CN_C.text,fontSize:12,lineHeight:1.65}}>{item.d}</div>
            </div>
          ))}
        </CN_Grid>
        <div style={{marginTop:12,padding:12,background:`${CN_C.blue}08`,borderRadius:6,border:`1px solid ${CN_C.blue}20`}}>
          <CN_HL c={CN_C.blue}>Chiến lược hiện tại — "Controlled Demolition": </CN_HL>
          <span style={{color:CN_C.text,fontSize:13}}>Để thị trường xuống có kiểm soát, cứu dự án (bảo vệ người mua nhà) nhưng không cứu developer. Đúng về lý thuyết. Cực kỳ khó thực thi trong thực tế.</span>
        </div>
      </CN_Card>
      <CN_Card style={{marginTop:16}}>
        <CN_STitle color={CN_C.red}>Evergrande — Giải Phẫu Một Vụ Sụp Đổ Chính Trị-Tài Chính</CN_STitle>
        <CN_T>Nợ Evergrande lên tới <CN_B>$287-304 tỷ</CN_B> huy động từ mọi nguồn: vay 128 ngân hàng (~$87 tỷ), phát hành trái phiếu, vay quỹ, vay nhà cung cấp, vay khách hàng (~$200 tỷ) — thậm chí ép cả nhân viên phải cho công ty vay để nhận thưởng. <CN_HL c={CN_C.red}>66% nguồn vốn là ngắn hạn</CN_HL> trong khi đầu tư dàn trải cả nghìn dự án dài hạn — mất cân đối kỳ hạn kinh điển.</CN_T>
        <CN_Grid cols={2} gap={12} style={{marginTop:10}}>
          <div style={{padding:12,background:CN_C.card2,borderRadius:6}}>
            <div style={{color:CN_C.orange,fontSize:10,fontWeight:700,marginBottom:6}}>ĐẦU TƯ NGOÀI NGÀNH THẤT BẠI</div>
            <div style={{color:CN_C.text,fontSize:12,lineHeight:1.7}}>
              Hàng chục tỷ USD đổ vào xe điện, dịch vụ internet, truyền thông, công viên giải trí, nước khoáng, thực phẩm, và cả một câu lạc bộ bóng đá — không mang lại dòng tiền hiệu quả, làm trầm trọng thêm khủng hoảng thanh khoản.
            </div>
          </div>
          <div style={{padding:12,background:`${CN_C.purple}08`,borderRadius:6,border:`1px solid ${CN_C.purple}20`}}>
            <div style={{color:CN_C.purple,fontSize:10,fontWeight:700,marginBottom:6}}>MẤT BẢO TRỢ CHÍNH TRỊ</div>
            <div style={{color:CN_C.text,fontSize:12,lineHeight:1.7}}>
              Chủ tịch Hứa Gia Ấn từng có quan hệ mật thiết với cựu Phó Chủ tịch nước Tăng Khánh Hồng, sau đó là gia đình cựu Thủ tướng Ôn Gia Bảo. Nhưng từ 2013, cả hai nhân vật bảo trợ đều rời quyền lực — dưới thời Tập, Evergrande trở thành "rơi rớt của thế lực cũ", mất hoàn toàn lá chắn chính trị.
            </div>
          </div>
        </CN_Grid>
        <div style={{marginTop:10,padding:12,background:`${CN_C.gold}08`,borderRadius:6,border:`1px solid ${CN_C.gold}20`}}>
          <span style={{color:CN_C.gold,fontWeight:700}}>Tại sao Bắc Kinh để Evergrande sụp: </span>
          <span style={{color:CN_C.text,fontSize:12.5}}>Với quy mô "chỉ" ~2% GDP và không bị đòn bẩy qua các công cụ chứng khoán hóa phái sinh (khác Subprime Mortgage 2008 của Mỹ), rủi ro hệ thống được coi là có thể kiểm soát. Xử lý Evergrande đồng thời phục vụ 3 mục tiêu: (1) "cú tát và xô nước lạnh" hạ nhiệt thị trường BĐS đang cuồng loạn, (2) khẳng định quyền lực tuyệt đối trước thềm Đại hội Đảng, (3) dẹp bỏ tàn dư ảnh hưởng chính trị cũ mà không gây bất ổn xã hội diện rộng.</span>
        </div>
      </CN_Card>
    </div>
  );
}

function CN_TabDebt() {
  return (
    <div>
      <CN_Card style={{marginBottom:16}}>
        <CN_STitle>Tổng Nợ Theo Thành Phần / GDP (%)</CN_STitle>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={CN_DEBT_DATA} margin={{top:5,right:10,bottom:5,left:-10}}>
            <defs>
              {[{id:"gv",c:CN_C.blue},{id:"cp",c:CN_C.red},{id:"hh",c:CN_C.gold}].map(g=>(
                <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={g.c} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={g.c} stopOpacity={0.05}/>
                </linearGradient>
              ))}
            </defs>
            <XAxis dataKey="y" tick={{fill:CN_C.dim,fontSize:10}} axisLine={{stroke:CN_C.border}} tickLine={false}/>
            <YAxis tick={{fill:CN_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip content={<CN_TT/>}/>
            <Legend wrapperStyle={{color:CN_C.dim,fontSize:11,paddingTop:8}}/>
            <Area type="monotone" dataKey="gov" stackId="1" stroke={CN_C.blue} fill="url(#gv)" name="Chính phủ" strokeWidth={1.5}/>
            <Area type="monotone" dataKey="corp" stackId="1" stroke={CN_C.red} fill="url(#cp)" name="Doanh nghiệp" strokeWidth={1.5}/>
            <Area type="monotone" dataKey="hh" stackId="1" stroke={CN_C.gold} fill="url(#hh)" name="Hộ gia đình" strokeWidth={1.5}/>
          </AreaChart>
        </ResponsiveContainer>
      </CN_Card>
      <CN_Grid cols={3} gap={12} style={{marginBottom:16}}>
        {[
          {t:"Tầng 1 — Corporate Debt",v:"~160% GDP",c:CN_C.red,
            d:"SOE vay với ngầm định nhà nước bảo lãnh → không có kỷ luật thị trường. SOE kiểm soát ~30% GDP nhưng chiếm ~60% tín dụng. ROE chỉ 3–4% vs tư nhân 8–10%."},
          {t:"Tầng 2 — LGFV / Nợ Ẩn",v:"$7–9 Nghìn Tỷ",c:CN_C.orange,
            d:"Phần lớn không nằm trong bảng ngân sách chính thức. Luật cũ cấm địa phương vay trực tiếp → lập LGFV vay thay. Nguồn thu từ bán đất giảm 30–40% → khủng hoảng thanh khoản địa phương."},
          {t:"Tầng 3 — Household Debt",v:"~64% GDP",c:CN_C.gold,
            d:"Tăng từ ~30% (2010) lên ~64% (2024). Vay nhiều để mua nhà — nay nhà giảm giá, vừa mất tài sản vừa còn nợ. Negative wealth effect kìm hãm tiêu dùng nhiều năm."},
        ].map((s,i)=>(
          <div key={i} style={{background:CN_C.card,border:`1px solid ${CN_C.border}`,borderRadius:8,
            padding:16,borderTop:`3px solid ${s.c}`}}>
            <div style={{color:CN_C.muted,fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>{s.t}</div>
            <div style={{color:s.c,fontSize:22,fontWeight:700,fontFamily:"monospace",marginBottom:8}}>{s.v}</div>
            <div style={{color:CN_C.text,fontSize:12,lineHeight:1.65}}>{s.d}</div>
          </div>
        ))}
      </CN_Grid>
      <CN_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <CN_Card>
          <CN_STitle color={CN_C.orange}>Nợ LGFV / Thu Ngân Sách Địa Phương (%) — Phân Tỉnh</CN_STitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={CN_LGFV_DATA} layout="vertical" margin={{top:5,right:30,bottom:5,left:10}}>
              <XAxis type="number" tick={{fill:CN_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis type="category" dataKey="p" tick={{fill:CN_C.text,fontSize:11}} axisLine={false} tickLine={false} width={65}/>
              <Tooltip content={<CN_TT/>}/>
              <Bar dataKey="d" name="Nợ/Thu NS (%)" radius={[0,4,4,0]}>
                {CN_LGFV_DATA.map((_,i)=>(
                  <Cell key={i} fill={CN_LGFV_DATA[i].d>400?CN_C.red:CN_LGFV_DATA[i].d>250?CN_C.orange:CN_C.green}/>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{color:CN_C.dim,fontSize:11,marginTop:4}}>* Quý Châu 2023: đề nghị trung ương cứu trợ công khai — lần đầu tiên trong lịch sử</div>
        </CN_Card>
        <CN_Card>
          <CN_STitle color={CN_C.purple}>Vòng Xoáy Nợ — Long-Term Debt Cycle</CN_STitle>
          <div style={{padding:12,background:CN_C.card2,borderRadius:8,marginBottom:10}}>
            <div style={{color:CN_C.purple,fontSize:10,fontWeight:700,marginBottom:8}}>VÒNG LẶP CHẾT:</div>
            {["Chính phủ kích thích → tín dụng tăng mạnh","Đầu tư vào tài sản phi hiệu quả (hạ tầng dư, BĐS)","Tăng trưởng giảm → cần kích thích thêm","Nợ tăng → ICOR tệ hơn → diminishing returns","Lặp lại với nợ cao hơn, hiệu quả thấp hơn"].map((s,i)=>(
              <div key={i} style={{display:"flex",gap:8,marginBottom:6,alignItems:"center"}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:CN_C.purple,flexShrink:0}}/>
                <div style={{color:CN_C.text,fontSize:12}}>{s}</div>
              </div>
            ))}
          </div>
          <CN_T><CN_HL c={CN_C.purple}>Liquidity Trap:</CN_HL> Tiền PBOC tạo ra ngồi trong dự trữ ngân hàng — không được cho vay vì cả doanh nghiệp lẫn người tiêu dùng đều không muốn vay. Giống Nhật Bản 1990s.</CN_T>
          <CN_T><CN_HL c={CN_C.gold}>Trust Deficit:</CN_HL> Kích thích không hoạt động khi niềm tin vào tương lai bị phá vỡ. Doanh nghiệp cắt đầu tư (rủi ro chính sách cao). Người dân tiết kiệm nhiều hơn (tài sản BĐS giảm + bất ổn việc làm). <CN_B>Paradox of thrift ở quy mô quốc gia.</CN_B></CN_T>
        </CN_Card>
      </CN_Grid>
      <CN_Card>
        <CN_STitle color={CN_C.blue}>SOE Reform — Tại Sao Zombie Doanh Nghiệp Không Thể Bị Đóng Cửa</CN_STitle>
        <CN_Grid cols={2} gap={16}>
          <div>
            <CN_T>Xi Jinping đã <CN_B>đảo ngược xu hướng SOE reform</CN_B> — thêm đảng ủy vào toàn bộ doanh nghiệp lớn kể cả tư nhân, tăng vai trò SOE trong "an ninh quốc gia."</CN_T>
            {["SOE thuê 70+ triệu người — đóng cửa = thất nghiệp hàng loạt = bất ổn chính trị","Ngân hàng bị chỉ thị ngầm buộc phải evergreen khoản vay SOE","SOE là công cụ thực hiện chính sách nhà nước — giảm giá, đầu tư chiến lược","Ban lãnh đạo SOE là cán bộ Đảng muốn thăng tiến — không có động lực hiệu quả thị trường"].map((s,i)=>(
              <div key={i} style={{display:"flex",gap:8,marginBottom:7}}>
                <span style={{color:CN_C.blue}}>▸</span>
                <span style={{color:CN_C.text,fontSize:12,lineHeight:1.6}}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{padding:14,background:`${CN_C.blue}08`,borderRadius:8,border:`1px solid ${CN_C.blue}20`}}>
            <div style={{color:CN_C.blue,fontSize:10,fontWeight:700,marginBottom:8}}>SOE vs TƯ NHÂN (2024):</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 80px 80px",gap:4,marginBottom:6}}>
              <div style={{color:CN_C.dim,fontSize:10}}></div>
              <div style={{color:CN_C.red,fontSize:10,fontWeight:700,textAlign:"center"}}>SOE</div>
              <div style={{color:CN_C.green,fontSize:10,fontWeight:700,textAlign:"center"}}>TƯ NHÂN</div>
            </div>
            {[
              {l:"ROE",s:"3–4%",p:"8–10%"},
              {l:"% tín dụng nhận",s:"~60%",p:"~40%"},
              {l:"% GDP đóng góp",s:"~30%",p:"~60%"},
              {l:"Việc làm",s:"70M+",p:"Đa số"},
              {l:"Innovation output",s:"Thấp",p:"Cao hơn"},
            ].map((r,i)=>(
              <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 80px 80px",gap:4,padding:"6px 0",borderBottom:`1px solid ${CN_C.border}20`}}>
                <span style={{color:CN_C.text,fontSize:12}}>{r.l}</span>
                <span style={{color:CN_C.red,fontSize:12,fontFamily:"monospace",textAlign:"center"}}>{r.s}</span>
                <span style={{color:CN_C.green,fontSize:12,fontFamily:"monospace",textAlign:"center"}}>{r.p}</span>
              </div>
            ))}
          </div>
        </CN_Grid>
      </CN_Card>
    </div>
  );
}

function CN_TabMfg() {
  return (
    <div>
      <CN_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <CN_Card>
          <CN_STitle>Thị Phần Sản Xuất Toàn Cầu 2024</CN_STitle>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={CN_MFG_PIE} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                dataKey="v" nameKey="n" paddingAngle={2}>
                {CN_MFG_PIE.map((_,i)=><Cell key={i} fill={CN_PIE_COLORS[i]}/>)}
              </Pie>
              <Tooltip formatter={(v,n)=>[`${v}%`,n]}/>
              <Legend wrapperStyle={{color:CN_C.text,fontSize:11}}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{textAlign:"center",color:CN_C.dim,fontSize:11,marginTop:-4}}>
            Trung Quốc ≈ Mỹ + Đức + Nhật + Hàn Quốc cộng lại
          </div>
        </CN_Card>
        <CN_Card>
          <CN_STitle color={CN_C.gold}>Made in China 2025 — Thực Tế 2024</CN_STitle>
          {[
            {s:"EV & Pin",r:"✓ Vượt kỳ vọng",c:CN_C.green,d:"BYD vượt Tesla Q4/2023. CATL: 37% pin EV toàn cầu"},
            {s:"Solar & Wind",r:"✓ Thống lĩnh",c:CN_C.green,d:"~80% sản lượng pin mặt trời. >50% đơn tàu biển mới"},
            {s:"Drone Thương Mại",r:"✓ Độc chiếm",c:CN_C.green,d:"DJI: 70–80% thị phần toàn cầu"},
            {s:"AI Ứng Dụng",r:"~ Cạnh tranh",c:CN_C.gold,d:"Mạnh ứng dụng, yếu foundation models do thiếu chip"},
            {s:"Robot Công Nghiệp",r:"~ Một Nửa",c:CN_C.gold,d:"Giỏi số lượng, yếu độ chính xác cao cấp"},
            {s:"Hàng Không (C919)",r:"✗ Còn phụ thuộc",c:CN_C.orange,d:"Ra đời nhưng 100% phụ thuộc động cơ CFM/phương Tây"},
            {s:"Chip tiên tiến <7nm",r:"✗ Thất bại rõ",c:CN_C.red,d:"SMIC 7nm: chi phí cao, yield thấp, không scale được"},
            {s:"Thiết bị bán dẫn",r:"✗ Chưa có",c:CN_C.red,d:"EUV lithography bị ASML/Hà Lan chặn hoàn toàn"},
          ].map((item,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",
              padding:"6px 0",borderBottom:`1px solid ${CN_C.border}25`}}>
              <div>
                <div style={{color:CN_C.bright,fontSize:12,fontWeight:600}}>{item.s}</div>
                <div style={{color:CN_C.dim,fontSize:11}}>{item.d}</div>
              </div>
              <span style={{color:item.c,fontSize:11,fontWeight:700,whiteSpace:"nowrap",marginLeft:8}}>{item.r}</span>
            </div>
          ))}
        </CN_Card>
      </CN_Grid>
      <CN_Card style={{marginBottom:16}}>
        <CN_STitle color={CN_C.red}>Chip War — Điểm Yếu Cốt Tử Không Thể Giải Quyết Nhanh</CN_STitle>
        <CN_T>Lệnh hạn chế chip của Mỹ (2019, leo thang 2022–2023) là <CN_B>đòn chiến lược quan trọng nhất nhắm vào Trung Quốc</CN_B>. Chip tiên tiến là hạ tầng của AI, quân sự hiện đại, và toàn bộ công nghệ thế hệ tiếp theo.</CN_T>
        <CN_Grid cols={2} gap={16}>
          <div>
            <CN_TL events={[
              {year:"2019",title:"Huawei vào Entity List",color:CN_C.red,desc:"Cấm chip tiên tiến và phần mềm — đánh sụp mảng điện thoại cao cấp"},
              {year:"10/2022",title:"Quy định chip toàn diện",color:CN_C.red,desc:"Cấm A100/H100 chips, cấm công dân Mỹ làm cho công ty chip TQ"},
              {year:"2023",title:"ASML Hà Lan + Nhật tham gia",color:CN_C.orange,desc:"Cấm EUV lithography + 23 loại thiết bị Nhật. Gần đóng cửa hoàn toàn"},
              {year:"8/2023",title:"Huawei Mate 60 Pro",color:CN_C.gold,desc:"Chip 7nm SMIC — thành tựu kỹ thuật nhưng không thể scale"},
              {year:"2024",title:"Big Fund Phase 3: $47 tỷ",color:CN_C.blue,desc:"Tiền không mua được 30 năm ecosystem công nghệ bán dẫn"},
            ]}/>
          </div>
          <div>
            <div style={{padding:14,background:`${CN_C.red}08`,borderRadius:8,border:`1px solid ${CN_C.red}25`,marginBottom:12}}>
              <div style={{color:CN_C.red,fontSize:10,fontWeight:700,marginBottom:8}}>TẠI SAO KHÔNG THỂ CATCH UP NHANH:</div>
              {["Semiconductor manufacturing cần 30+ năm ecosystem tích lũy","Process development không thể bỏ qua thế hệ — phải tuần tự","ASML EUV: 100,000+ components từ 5,000+ suppliers toàn cầu","TSMC có 40 năm kinh nghiệm tập thể — không mua được","Yield rates: chênh lệch chi phí 3–5x khi yield SMIC thấp hơn"].map((s,i)=>(
                <div key={i} style={{display:"flex",gap:6,marginBottom:5}}>
                  <span style={{color:CN_C.red}}>▸</span>
                  <span style={{color:CN_C.text,fontSize:12,lineHeight:1.5}}>{s}</span>
                </div>
              ))}
            </div>
            <div style={{padding:14,background:`${CN_C.purple}10`,borderRadius:8,border:`1px solid ${CN_C.purple}30`}}>
              <div style={{color:CN_C.purple,fontSize:10,fontWeight:700,marginBottom:6}}>SILICON SHIELD — ĐÀI LOAN:</div>
              <div style={{color:CN_C.text,fontSize:12,lineHeight:1.7}}>
                TSMC chiếm <CN_HL c={CN_C.purple}>~90%</CN_HL> chip tiên tiến (&lt;5nm) toàn cầu. Nếu Trung Quốc kiểm soát Đài Loan → tiếp cận TSMC → đảo lộn toàn bộ cán cân công nghệ toàn cầu. Chips Act Mỹ và EU Chips Act là chuẩn bị cho kịch bản này.
              </div>
            </div>
          </div>
        </CN_Grid>
        <CN_T style={{marginTop:10}}><CN_B>Chuỗi cung ứng hoàn chỉnh — Lợi thế không thể copy ngắn hạn:</CN_B> Không nơi nào trên thế giới có mật độ chuỗi cung ứng tương đương Trung Quốc. Sản xuất một iPhone cần linh kiện từ hàng trăm nhà cung cấp trong bán kính 200km. <CN_HL>"China +1" thực tế:</CN_HL> Lắp ráp cuối chuyển đi (VN, Ấn Độ, Mexico) — nhưng linh kiện quan trọng vẫn đến từ Trung Quốc.</CN_T>
      </CN_Card>
    </div>
  );
}

function CN_TabDemo() {
  return (
    <div>
      <CN_Grid cols={4} gap={12} style={{marginBottom:16}}>
        <CN_Metric label="TFR 2023" value="1.09" sub="Cần 2.1 để dân số ổn định" color={CN_C.red} warn="Thấp hơn cả Nhật Bản"/>
        <CN_Metric label="Dân Số" value="Giảm 2022" sub="Sớm hơn mọi dự báo" color={CN_C.orange}/>
        <CN_Metric label="Người Già 65+ năm 2050" value="~30%" sub="Từ 14% năm 2022" color={CN_C.red}/>
        <CN_Metric label="Chênh Lệch Nam/Nữ" value="30–40M" sub="Đàn ông không tìm được vợ" color={CN_C.gold}/>
      </CN_Grid>
      <CN_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <CN_Card>
          <CN_STitle>Tỷ Lệ Sinh (‰) — Chính Sách Một Con & Hậu Quả</CN_STitle>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={CN_BIRTH_DATA} margin={{top:5,right:10,bottom:5,left:-20}}>
              <defs>
                <linearGradient id="bG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CN_C.orange} stopOpacity={0.35}/>
                  <stop offset="95%" stopColor={CN_C.orange} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="y" tick={{fill:CN_C.dim,fontSize:9}} axisLine={{stroke:CN_C.border}} tickLine={false}/>
              <YAxis tick={{fill:CN_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <Tooltip content={<CN_TT/>}/>
              <Area type="monotone" dataKey="r" stroke={CN_C.orange} fill="url(#bG)" strokeWidth={2} name="Tỷ lệ sinh ‰"/>
            </AreaChart>
          </ResponsiveContainer>
          <div style={{display:"flex",gap:8,marginTop:8}}>
            {[{y:"1980",l:"Bắt đầu Một Con",c:CN_C.red},{y:"2015",l:"Cho phép 2 con",c:CN_C.gold},{y:"2023",l:"6.4‰ — thấp kỷ lục",c:CN_C.red}].map((e,i)=>(
              <div key={i} style={{flex:1,padding:"6px 8px",background:`${e.c}15`,borderRadius:4,border:`1px solid ${e.c}30`}}>
                <div style={{color:e.c,fontSize:9,fontWeight:700}}>{e.y}</div>
                <div style={{color:CN_C.text,fontSize:10}}>{e.l}</div>
              </div>
            ))}
          </div>
        </CN_Card>
        <CN_Card>
          <CN_STitle color={CN_C.red}>Tỷ Lệ Phụ Thuộc Người Già (%) — Dự Báo 2020–2050</CN_STitle>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={CN_DEPENDENCY} margin={{top:5,right:10,bottom:5,left:-20}}>
              <defs>
                <linearGradient id="dG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CN_C.red} stopOpacity={0.35}/>
                  <stop offset="95%" stopColor={CN_C.red} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="y" tick={{fill:CN_C.dim,fontSize:10}} axisLine={{stroke:CN_C.border}} tickLine={false}/>
              <YAxis tick={{fill:CN_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <Tooltip content={<CN_TT/>}/>
              <Area type="monotone" dataKey="r" stroke={CN_C.red} fill="url(#dG)" strokeWidth={2} name="Tỷ lệ phụ thuộc %"/>
            </AreaChart>
          </ResponsiveContainer>
          <div style={{color:CN_C.dim,fontSize:11,marginTop:4}}>2020: ~5 lao động/1 người hưu trí → 2050: ~1.6 lao động/1 người hưu trí</div>
        </CN_Card>
      </CN_Grid>
      <CN_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <CN_Card>
          <CN_STitle color={CN_C.purple}>Lying Flat (躺平) & Involution (内卷) — Khủng Hoảng Thế Hệ</CN_STitle>
          <CN_T><CN_B>Lying flat (躺平):</CN_B> Từ chối tham gia cuộc đua 996 (9am–9pm, 6 ngày/tuần), từ chối kết hôn, sinh con, tiêu dùng tối thiểu. Không phải lười biếng — mà là <CN_HL>phản ứng duy lý trước một hệ thống bất công.</CN_HL></CN_T>
          <CN_T><CN_B>Involution (内卷):</CN_B> Cạnh tranh leo thang trong hệ thống zero-sum — điểm thi đại học, việc làm, nhà ở — mà tổng phần thưởng không tăng. Cạnh tranh khốc liệt hơn nhưng outcome tổng thể không tốt hơn. Bước tự nhiên tiếp theo: nếu cạnh tranh vô nghĩa → nằm xuống.</CN_T>
          <CN_T><CN_B>Let it rot (摆烂):</CN_B> Phiên bản cực đoan — không chỉ từ chối cạnh tranh mà còn từ chối cả việc duy trì. Gen Z Trung Quốc đang mất niềm tin vào "giấc mơ Trung Quốc" ở mức sâu hơn bất kỳ thế hệ trước nào.</CN_T>
          <div style={{padding:10,background:`${CN_C.purple}10`,borderRadius:6,border:`1px solid ${CN_C.purple}25`,marginTop:6}}>
            <span style={{color:CN_C.purple,fontWeight:700}}>Hệ quả kinh tế: </span>
            <span style={{color:CN_C.text,fontSize:12}}>Thế hệ không muốn tiêu dùng, không muốn vay mua nhà, không muốn sinh con — chính là thế hệ không thể kéo kinh tế tiêu dùng nội địa tăng trưởng dù nhà nước muốn.</span>
          </div>
        </CN_Card>
        <CN_Card>
          <CN_STitle color={CN_C.orange}>Toán Học Hưu Trí — Khủng Hoảng Không Thể Tránh</CN_STitle>
          <CN_T>Quỹ hưu trí quốc gia dự báo <CN_B>cạn kiệt 2035</CN_B> theo một số nghiên cứu học thuật Trung Quốc (bị kiểm duyệt sau khi công bố). Đây là toán học — không phải ý kiến.</CN_T>
          {[
            {l:"Người LĐ/người hưu 2020",v:"~5 : 1",c:CN_C.green},
            {l:"Người LĐ/người hưu 2050",v:"~1.6 : 1",c:CN_C.red},
            {l:"Tuổi hưu chính thức (nam/nữ)",v:"60 / 50–55 tuổi",c:CN_C.text},
            {l:"Chi tiêu hưu trí/GDP năm 2050",v:"~16–20%",c:CN_C.red},
            {l:"Giải pháp hiện tại",v:"Tăng tuổi hưu — gặp phản đối mạnh",c:CN_C.gold},
            {l:"Nhập cư — lựa chọn có không?",v:"Không khả thi: 92% Han, rào cản ngôn ngữ",c:CN_C.dim},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${CN_C.border}25`}}>
              <span style={{color:CN_C.text,fontSize:12}}>{r.l}</span>
              <span style={{color:r.c,fontSize:12,fontWeight:700,textAlign:"right",marginLeft:8}}>{r.v}</span>
            </div>
          ))}
        </CN_Card>
      </CN_Grid>
    </div>
  );
}

function CN_TabCCP() {
  return (
    <div>
      <CN_Card style={{marginBottom:16,borderLeft:`4px solid ${CN_C.red}`}}>
        <CN_STitle color={CN_C.red}>Khế Ước Ngầm — CCP, Tăng Trưởng, Và Quyền Lực</CN_STitle>
        <CN_T>CCP duy trì quyền lực bằng cách cung cấp <CN_B>tăng trưởng kinh tế và sự ổn định</CN_B>. Người dân chấp nhận thiếu tự do chính trị đổi lấy cải thiện mức sống. <CN_HL>Khi tăng trưởng chậm lại, khế ước này lung lay.</CN_HL> Đây là áp lực ngầm lớn nhất mà Xi Jinping đang phải đối mặt.</CN_T>
        <CN_Grid cols={3} gap={12} style={{marginTop:12}}>
          {[
            {t:"Đảng Ủy Trong Mọi DN",c:CN_C.red,d:"Kể cả tư nhân lớn — quyết định chiến lược song song với ban giám đốc. Alibaba, Tencent, BYD đều có Đảng ủy nội bộ."},
            {t:"Kiểm Soát Hệ Thống Tín Dụng",c:CN_C.orange,d:"Nhà nước kiểm soát hệ thống ngân hàng → kiểm soát dòng vốn → kiểm soát ai sống ai chết trong kinh doanh."},
            {t:"Regulation Bất Ngờ",c:CN_C.gold,d:"Didi, Alibaba, EdTech 2021 → nhắc nhở tư nhân: tồn tại là ân sủng của Đảng, không phải quyền lợi thị trường."},
          ].map((item,i)=>(
            <div key={i} style={{padding:14,background:CN_C.card2,borderRadius:8,border:`1px solid ${item.c}30`,borderTop:`3px solid ${item.c}`}}>
              <div style={{color:item.c,fontSize:11,fontWeight:700,marginBottom:6}}>{item.t}</div>
              <div style={{color:CN_C.text,fontSize:12,lineHeight:1.65}}>{item.d}</div>
            </div>
          ))}
        </CN_Grid>
      </CN_Card>
      <CN_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <CN_Card>
          <CN_STitle color={CN_C.orange}>Common Prosperity — Tác Động Kinh Tế Thực Sự</CN_STitle>
          <CN_T>Chiến dịch 2021 — chuỗi trấn áp tư nhân mang tính lịch sử. Không chỉ "phân phối lại" — mà là <CN_B>tái khẳng định quyền kiểm soát của Đảng với khu vực tư nhân</CN_B>.</CN_T>
          <CN_TL events={[
            {year:"11/2020",title:"IPO Ant Group $35B bị hủy",color:CN_C.red,desc:"Jack Ma chỉ trích ngân hàng nhà nước → IPO lớn nhất lịch sử bị dừng 48 giờ trước ngày ra mắt"},
            {year:"4/2021",title:"Alibaba bị phạt $18.2 tỷ",color:CN_C.red,desc:"Antitrust lớn nhất lịch sử TQ. Tín hiệu rõ ràng với toàn bộ tư nhân lớn"},
            {year:"7/2021",title:"EdTech bị xóa sổ trong 1 tuần",color:CN_C.red,desc:"Toàn ngành gia sư tư thục bị cấm hoạt động vì lợi nhuận. $100B+ biến mất"},
            {year:"7/2021",title:"Didi bị buộc delist NYSE",color:CN_C.orange,desc:"Ngay sau khi IPO. FDI nước ngoài sụt giảm mạnh sau đây"},
            {year:"2021–22",title:'"Third Distribution" — Áp lực đóng góp',color:CN_C.gold,desc:"Alibaba cam kết $15.5B, Tencent $7.7B, Pinduoduo $7.4B — 'tự nguyện'"},
          ]}/>
        </CN_Card>
        <CN_Card>
          <CN_STitle color={CN_C.purple}>Xi Jinping & Tập Trung Quyền Lực — Hệ Quả Kinh Tế</CN_STitle>
          <CN_T>2012–nay: tháo dỡ có hệ thống lãnh đạo tập thể. Li Keqiang — người hiểu kinh tế thị trường, tác giả chỉ số Li Keqiang — bị gạt sang lề. <CN_B>Mất đi chuyên môn kỹ trị.</CN_B></CN_T>
          <CN_T><CN_B>"No bad news" culture:</CN_B> Cán bộ địa phương sợ báo cáo số liệu xấu → chính sách trung ương không có thông tin chính xác → sai lầm khó phát hiện và sửa chữa. Zero-COVID kéo dài hơn kinh tế đòi hỏi là ví dụ điển hình.</CN_T>
          <div style={{padding:12,background:`${CN_C.purple}10`,borderRadius:6,border:`1px solid ${CN_C.purple}25`,margin:"10px 0"}}>
            <div style={{color:CN_C.purple,fontSize:10,fontWeight:700,marginBottom:6}}>MÂU THUẪN KHÔNG GIẢI ĐƯỢC:</div>
            <div style={{color:CN_C.text,fontSize:12.5,lineHeight:1.8}}>
              CCP cần <CN_HL c={CN_C.green}>đổi mới sáng tạo</CN_HL> để thoát bẫy thu nhập trung bình<br/>
              Nhưng innovation cần <CN_HL c={CN_C.blue}>tự do tư duy + chấp nhận thất bại + thông tin tự do</CN_HL><br/>
              Những thứ này đối lập với <CN_HL c={CN_C.red}>kiểm soát chính trị tập trung</CN_HL><br/>
              Kết quả: giỏi <CN_HL c={CN_C.gold}>sao chép & tối ưu</CN_HL> hơn là <CN_HL c={CN_C.red}>phá vỡ sáng tạo</CN_HL>
            </div>
          </div>
          <CN_T><CN_B>Trust Deficit — Tại sao kích thích 2023–2024 không hoạt động:</CN_B> Doanh nghiệp cắt đầu tư dù lãi suất thấp (rủi ro chính sách quy định bất ngờ quá cao). Người dân tiết kiệm nhiều hơn dù được khuyến khích tiêu. <CN_HL>Paradox of thrift ở quy mô quốc gia.</CN_HL></CN_T>
        </CN_Card>
      </CN_Grid>
      <CN_Card>
        <CN_STitle color={CN_C.teal}>Bất Bình Đẳng & Bẫy Thu Nhập Trung Bình</CN_STitle>
        <CN_Grid cols={2} gap={16}>
          <div>
            <CN_T>Trung Quốc có <CN_B>hệ số Gini ~0.47–0.50</CN_B> — trong số các nước bất bình đẳng nhất thế giới, cao hơn Mỹ (~0.41) và cao hơn nhiều so với Châu Âu (~0.25–0.30). Nghịch lý lớn của nhà nước tự xưng là cộng sản.</CN_T>
            {[
              {l:"10% giàu nhất kiểm soát",v:"~67% tổng tài sản quốc gia"},
              {l:"Thu nhập đô thị/nông thôn",v:"Gấp 2.5 lần (đỉnh 3.5x năm 2009)"},
              {l:"GDP/người hiện tại",v:"~$12,500–13,000"},
              {l:"Ngưỡng thu nhập cao (WB)",v:">$14,000 — sắp chạm nhưng chưa tới"},
            ].map((r,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${CN_C.border}25`}}>
                <span style={{color:CN_C.text,fontSize:12}}>{r.l}</span>
                <span style={{color:CN_C.teal,fontSize:12,fontWeight:700}}>{r.v}</span>
              </div>
            ))}
          </div>
          <div style={{padding:14,background:`${CN_C.gold}08`,borderRadius:8,border:`1px solid ${CN_C.gold}25`}}>
            <div style={{color:CN_C.gold,fontSize:10,fontWeight:700,marginBottom:8}}>BẪY THU NHẬP TRUNG BÌNH:</div>
            <CN_T>GDP bình quân đầu người ~$12,500–13,000 (2024). Để vào nhóm thu nhập cao (&gt;$14,000 — ngưỡng World Bank) cần cải cách thể chế sâu. Nhưng chính những cải cách đó lại <CN_B>đe dọa kiểm soát của CCP</CN_B>.</CN_T>
            <CN_T>Bất bình đẳng cao → người giàu tiết kiệm/đưa tiền ra nước ngoài → tiêu dùng nội địa yếu → phụ thuộc xuất khẩu → dễ tổn thương trước căng thẳng thương mại. Vòng luẩn quẩn không lối ra.</CN_T>
          </div>
        </CN_Grid>
      </CN_Card>
      <CN_Card style={{marginTop:16}}>
        <CN_STitle color={CN_C.red}>Sáu Mục Tiêu Của Tập Trước Nhiệm Kỳ 3 (từ 2021)</CN_STitle>
        <CN_T>Trước Đại hội Đảng lần 20, các động thái của Tập Cận Bình từ 2021 đều phục vụ một chuỗi mục tiêu nhất quán nhằm củng cố quyền lực cá nhân tuyệt đối — không chỉ dừng ở kinh tế:</CN_T>
        <CN_Grid cols={3} gap={10} style={{marginTop:10}}>
          {[
            {n:"1",t:"Giữ thành quả Zero-COVID",d:"Biến thành công chống dịch thành biểu tượng quyền lực cá nhân — lý giải vì sao chính sách kéo dài hơn kinh tế thực sự cần.",c:CN_C.blue},
            {n:"2",t:"Common Prosperity",d:'"Cùng giàu" — không "cướp của người giàu" mà ép các đại gia "tự nguyện" chia sẻ của cải qua áp lực chính trị ngầm.',c:CN_C.gold},
            {n:"3",t:"Làm chủ công nghệ lõi & Big Data",d:"Không để Big Data dân cư nằm ngoài tầm kiểm soát nhà nước — đẩy mạnh e-CNY, siết các đại gia công nghệ.",c:CN_C.purple},
            {n:"4",t:"Xây dựng văn hóa mới",d:'"Phong sát" nghệ sĩ, cấm idol phi giới tính, đưa "Tư tưởng Tập Cận Bình" vào giáo dục bắt buộc.',c:CN_C.orange},
            {n:"5",t:"Tái cơ cấu ngân hàng (thận trọng)",d:"Nhận thức rủi ro hệ thống rất lớn nhưng chưa dám động vào cốt lõi (quản trị-điều hành) vì sợ gây đổ vỡ dây chuyền.",c:CN_C.teal},
            {n:"6",t:"Xử lý Evergrande làm gương",d:"Không cứu để răn đe toàn ngành BĐS, đồng thời dẹp tàn dư ảnh hưởng chính trị của phe cũ.",c:CN_C.red},
          ].map(item=>(
            <div key={item.n} style={{padding:12,background:CN_C.card2,borderRadius:6,border:`1px solid ${item.c}30`,borderTop:`3px solid ${item.c}`}}>
              <div style={{color:item.c,fontSize:9,fontWeight:700,letterSpacing:"0.08em"}}>MỤC TIÊU {item.n}</div>
              <div style={{color:CN_C.bright,fontSize:12,fontWeight:700,margin:"4px 0"}}>{item.t}</div>
              <div style={{color:CN_C.text,fontSize:11.5,lineHeight:1.55}}>{item.d}</div>
            </div>
          ))}
        </CN_Grid>
        <div style={{marginTop:12,padding:12,background:`${CN_C.gold}08`,borderRadius:6,border:`1px solid ${CN_C.gold}20`}}>
          <span style={{color:CN_C.gold,fontWeight:700}}>Tầm nhìn 2035-2050: </span>
          <span style={{color:CN_C.text,fontSize:12.5}}>Sáu đặc điểm xã hội-kinh tế Tập muốn xây dựng: Đảng lãnh đạo toàn diện mọi lĩnh vực; của cải phân chia "công bằng" theo cách nhà nước định đoạt; tư tưởng do nhà nước dẫn dắt; DNNN giữ vai trò chủ đạo các lĩnh vực chiến lược; doanh nghiệp tư nhân chỉ là "mũi nhọn" thử nghiệm nhưng bị kiểm soát chặt khi lớn mạnh; SME được tạo điều kiện phát triển trong khuôn khổ.</span>
        </div>
      </CN_Card>
      <CN_Card style={{marginTop:16}}>
        <CN_STitle color={CN_C.steel||CN_C.dim}>Vụ "Doing Business" — Minh Chứng Thao Túng Định Chế Quốc Tế</CN_STitle>
        <CN_T>Năm 2021, Ngân hàng Thế giới (WB) tuyên bố <CN_B>ngừng vĩnh viễn</CN_B> báo cáo "Doing Business" — bảng xếp hạng môi trường kinh doanh có ảnh hưởng bậc nhất toàn cầu, sau một cuộc điều tra nội bộ gây chấn động.</CN_T>
        <div style={{padding:12,background:CN_C.card2,borderRadius:6,marginTop:8}}>
          <div style={{color:CN_C.red,fontSize:10,fontWeight:700,marginBottom:6}}>PHÁT HIỆN ĐIỀU TRA (công ty luật WilmerHale):</div>
          <div style={{color:CN_C.text,fontSize:12,lineHeight:1.7}}>
            • Xếp hạng Doing Business 2018 của Trung Quốc bị "nâng đỡ không trong sáng" — từ vị trí đáng lẽ 85 lên còn 78<br/>
            • Chủ tịch WB khi đó yêu cầu thay đổi phương pháp luận theo hướng có lợi cho Trung Quốc<br/>
            • Nhà kinh tế trưởng WB — người từng đoạt giải Nobel Kinh tế cùng năm — đã từ chức để phản đối
          </div>
        </div>
        <CN_T style={{marginTop:8}}><CN_HL c={CN_C.gold}>Ý nghĩa:</CN_HL> Sự việc cho thấy ngay cả các định chế quốc tế uy tín cao cũng có thể chịu sức ép chính trị từ các cường quốc lớn — một lời nhắc rằng số liệu và xếp hạng quốc tế về môi trường kinh doanh Trung Quốc cần được đọc với sự thận trọng nhất định, không chỉ riêng với GDP hay số liệu nội bộ.</CN_T>
      </CN_Card>
    </div>
  );
}

function CN_TabGeo() {
  return (
    <div>
      <CN_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <CN_Card>
          <CN_STitle color={CN_C.blue}>Belt & Road Initiative — Tham Vọng Và Thực Tế</CN_STitle>
          <CN_Grid cols={2} gap={10} style={{marginBottom:12}}>
            {[
              {l:"Thành Tựu Thật",c:CN_C.green,items:["Hàng trăm tỷ USD hạ tầng thực chất tại ĐPT","Mở rộng influence địa chính trị đáng kể","Nhiều nước ĐPT có hạ tầng không ai khác xây"]},
              {l:"Vấn Đề Thật",c:CN_C.red,items:["Sri Lanka mất cảng Hambantota 99 năm","Zambia, Pakistan, Ethiopia: đàm phán tái nợ","Quan hệ công chúng xấu tại nhiều thị trường"]},
            ].map((g,i)=>(
              <div key={i} style={{padding:10,background:`${g.c}08`,borderRadius:6,border:`1px solid ${g.c}25`}}>
                <div style={{color:g.c,fontSize:10,fontWeight:700,marginBottom:6}}>{g.l}</div>
                {g.items.map((item,j)=>(
                  <div key={j} style={{color:CN_C.text,fontSize:11,marginBottom:4}}>• {item}</div>
                ))}
              </div>
            ))}
          </CN_Grid>
          <CN_T><CN_B>Thay đổi từ 2020:</CN_B> Cho vay BRI mới giảm từ <CN_HL>$75 tỷ (2016)</CN_HL> xuống <CN_HL>$10–20 tỷ (2021–2023)</CN_HL>. Chiến lược chuyển từ cho vay sang đầu tư trực tiếp và xuất khẩu hàng hóa (đặc biệt EV, solar).</CN_T>
        </CN_Card>
        <CN_Card>
          <CN_STitle color={CN_C.teal}>Decoupling — Phân Tách Có Chọn Lọc</CN_STitle>
          {[
            {l:"Thị phần TQ trong nhập khẩu Mỹ",v:"21% → 13.9%",n:"2018 → 2023",c:CN_C.red},
            {l:"Mexico vượt TQ (nhập khẩu Mỹ)",v:"2023",n:"Lần đầu tiên trong lịch sử",c:CN_C.orange},
            {l:"Xuất khẩu TQ toàn cầu 2023",v:"$3.38T",n:"Vẫn cao kỷ lục lịch sử",c:CN_C.green},
            {l:"FDI phương Tây vào TQ",v:"Giảm mạnh",n:"Đặc biệt từ 2021",c:CN_C.red},
            {l:"Thương mại EU–TQ",v:"Vẫn cao",n:"Decoupling rất chậm",c:CN_C.gold},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"8px 0",borderBottom:`1px solid ${CN_C.border}25`}}>
              <div style={{flex:1}}>
                <div style={{color:CN_C.text,fontSize:12}}>{r.l}</div>
                <div style={{color:CN_C.dim,fontSize:10}}>{r.n}</div>
              </div>
              <span style={{color:r.c,fontSize:13,fontWeight:700,marginLeft:8}}>{r.v}</span>
            </div>
          ))}
          <CN_T style={{marginTop:8}}><CN_HL>Thực tế:</CN_HL> Phân tách chiến lược (chip, AI, quân sự) trong khi thương mại thông thường tiếp tục. "China+1" thường chỉ chuyển lắp ráp cuối — linh kiện quan trọng vẫn từ TQ.</CN_T>
        </CN_Card>
      </CN_Grid>
      <CN_Card style={{marginBottom:16}}>
        <CN_STitle color={CN_C.red}>Kịch Bản Đài Loan — Rủi Ro Hệ Thống Toàn Cầu</CN_STitle>
        <CN_T>Đài Loan không chỉ là vấn đề chính trị — đây là <CN_B>rủi ro kinh tế hệ thống toàn cầu</CN_B>. TSMC sản xuất ~90% chip tiên tiến (&lt;5nm) của thế giới.</CN_T>
        <CN_Grid cols={3} gap={12}>
          {[
            {s:"Kịch Bản A: Phong Tỏa",c:CN_C.orange,items:["Gián đoạn chip toàn cầu ngay lập tức","Thiệt hại $2.5T+/năm cho kinh tế toàn cầu","Lệnh trừng phạt kinh tế toàn diện nhằm vào TQ","Tương đương cắt TQ khỏi SWIFT"]},
            {s:"Kịch Bản CN_B: Thống Nhất Hòa Bình",c:CN_C.gold,items:["TQ tiếp cận TSMC và chip tiên tiến","Đảo lộn toàn bộ cán cân công nghệ thế giới","Phương Tây đẩy nhanh nearshoring chip","Chips Act Mỹ/EU là chuẩn bị cho kịch bản này"]},
            {s:"Kịch Bản CN_C: Xung Đột Quân Sự",c:CN_C.red,items:["Phá hủy/ngừng TSMC — gián đoạn chưa từng có","TQ bị loại khỏi hệ thống tài chính quốc tế","Thập kỷ đau đớn cho cả hai phía","Chi phí kinh tế vượt mọi tính toán"]},
          ].map((s,i)=>(
            <div key={i} style={{padding:14,background:CN_C.card2,borderRadius:8,border:`1px solid ${s.c}30`,borderTop:`3px solid ${s.c}`}}>
              <div style={{color:s.c,fontSize:11,fontWeight:700,marginBottom:8}}>{s.s}</div>
              {s.items.map((item,j)=>(
                <div key={j} style={{display:"flex",gap:6,marginBottom:5}}>
                  <span style={{color:s.c}}>▸</span>
                  <span style={{color:CN_C.text,fontSize:11,lineHeight:1.5}}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </CN_Grid>
      </CN_Card>
      <CN_Card>
        <CN_STitle color={CN_C.orange}>An Ninh Năng Lượng & Vũ Khí Kinh Tế</CN_STitle>
        <CN_Grid cols={2} gap={16}>
          <div>
            <CN_T>Trung Quốc nhập khẩu <CN_B>70–75% nhu cầu dầu mỏ</CN_B>. <CN_HL>Malacca Strait Dilemma:</CN_HL> 80% dầu đi qua eo biển Malacca — nút thắt mà Mỹ và đồng minh có thể chặn trong xung đột.</CN_T>
            {[
              {l:"Than trong điện lực",v:"56%",c:CN_C.red,n:"Mâu thuẫn cam kết carbon neutral 2060"},
              {l:"Than mới phê duyệt 2022–23",v:"150 GW",c:CN_C.orange,n:"Bù đắp thiếu điện ngắn hạn"},
              {l:"Solar — #1 thế giới",v:"Lắp đặt mới/năm",c:CN_C.green,n:"Lắp đặt nhiều nhất"},
              {l:"Wind — #1 thế giới",v:"Tổng công suất",c:CN_C.green,n:""},
              {l:"EV penetration 2023",v:">30%",c:CN_C.blue,n:"Doanh số xe mới tại TQ"},
            ].map((r,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${CN_C.border}25`}}>
                <div>
                  <div style={{color:CN_C.text,fontSize:12}}>{r.l}</div>
                  {r.n&&<div style={{color:CN_C.dim,fontSize:10}}>{r.n}</div>}
                </div>
                <span style={{color:r.c,fontSize:13,fontWeight:700}}>{r.v}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{padding:12,background:`${CN_C.orange}08`,borderRadius:8,border:`1px solid ${CN_C.orange}25`,marginBottom:12}}>
              <div style={{color:CN_C.orange,fontSize:10,fontWeight:700,marginBottom:6}}>VŨ KHÍ KINH TẾ ĐÃ DÙNG VÀ KẾT QUẢ:</div>
              {[
                {c:"Australia 2020",d:"Cấm than, rượu vang, đại mạch → TQ thiệt hại nhiều hơn khi phải tìm nhà cung cấp đắt hơn"},
                {c:"Lithuania 2021",d:"Cấm vận sau vụ Đài Loan → EU đoàn kết phản ứng. TQ phải nhượng bộ một phần"},
                {c:"Hàn Quốc 2017",d:"Hạn chế du lịch sau THAAD → ảnh hưởng ngược lên TQ nhiều hơn dự kiến"},
              ].map((item,i)=>(
                <div key={i} style={{marginBottom:8,paddingLeft:10,borderLeft:`2px solid ${CN_C.orange}`}}>
                  <div style={{color:CN_C.orange,fontSize:11,fontWeight:700}}>{item.c}</div>
                  <div style={{color:CN_C.text,fontSize:11,lineHeight:1.5}}>{item.d}</div>
                </div>
              ))}
            </div>
            <div style={{padding:12,background:`${CN_C.blue}08`,borderRadius:8,border:`1px solid ${CN_C.blue}20`}}>
              <div style={{color:CN_C.blue,fontSize:10,fontWeight:700,marginBottom:6}}>CAPITAL FLIGHT — VỐN RỜI TRUNG QUỐC:</div>
              <div style={{color:CN_C.text,fontSize:12,lineHeight:1.7}}>
                • 2015–2016: <CN_HL c={CN_C.red}>~$1 nghìn tỷ</CN_HL> rời TQ trong 18 tháng<br/>
                • Underground banking qua HK, invoice manipulation<br/>
                • Mua BĐS nước ngoài qua con cái du học<br/>
                • <CN_HL c={CN_C.red}>10,000+ HNWI/năm di cư</CN_HL> kể từ 2019<br/>
                • Crypto/stablecoin dù bị cấm vẫn diễn ra
              </div>
            </div>
          </div>
        </CN_Grid>
      </CN_Card>
    </div>
  );
}

function CN_TabRisks() {
  return (
    <div>
      <CN_Card style={{marginBottom:16}}>
        <CN_STitle color={CN_C.gold}>Nhật Bản 1990 vs Trung Quốc 2024 — Analogy Đúng Và Sai</CN_STitle>
        <CN_Grid cols={2} gap={16}>
          <div>
            <div style={{color:CN_C.gold,fontSize:10,fontWeight:700,marginBottom:10,letterSpacing:"0.06em"}}>ĐIỂM GIỐNG NHAU:</div>
            {["Bong bóng BĐS khổng lồ sau tăng trưởng thần tốc","Mô hình tăng trưởng đầu tư + xuất khẩu phụ thuộc","Nợ doanh nghiệp lớn, hiệu quả đầu tư giảm","Già hóa dân số và tỷ lệ sinh thấp","Hệ thống ngân hàng ôm nhiều nợ xấu ẩn"].map((s,i)=>(
              <div key={i} style={{display:"flex",gap:6,marginBottom:6}}>
                <span style={{color:CN_C.gold}}>≈</span>
                <span style={{color:CN_C.text,fontSize:12,lineHeight:1.6}}>{s}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{color:CN_C.red,fontSize:10,fontWeight:700,marginBottom:10,letterSpacing:"0.06em"}}>ĐIỂM KHÁC — TRUNG QUỐC TỆ HƠN:</div>
            {[
              {jp:"GDP/người $30,000 — đã giàu trước",cn:"GDP/người $12,500 — già trước khi giàu"},
              {jp:"Dân chủ: cơ chế tự điều chỉnh linh hoạt",cn:"Độc đảng: khó nhận lỗi và sửa chính sách"},
              {jp:"Khủng hoảng tài chính thuần túy",cn:"+ chip war + địa chính trị + nhân khẩu"},
              {jp:"Mỹ là đồng minh giúp ổn định",cn:"Mỹ là đối thủ chiến lược chủ động kiềm chế"},
            ].map((r,i)=>(
              <div key={i} style={{marginBottom:8,padding:8,background:CN_C.card2,borderRadius:6}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                  <div><div style={{color:CN_C.green,fontSize:9,fontWeight:700}}>NHẬT 1990</div><div style={{color:CN_C.text,fontSize:11,lineHeight:1.5}}>{r.jp}</div></div>
                  <div><div style={{color:CN_C.red,fontSize:9,fontWeight:700}}>TRUNG QUỐC 2024</div><div style={{color:CN_C.text,fontSize:11,lineHeight:1.5}}>{r.cn}</div></div>
                </div>
              </div>
            ))}
          </div>
        </CN_Grid>
        <div style={{marginTop:12,padding:12,background:`${CN_C.red}08`,borderRadius:6,border:`1px solid ${CN_C.red}20`}}>
          <CN_HL c={CN_C.red}>Kết luận: </CN_HL>
          <span style={{color:CN_C.text,fontSize:13}}>Trung Quốc đang trong tình huống tiềm năng tệ hơn Nhật Bản 1990 trên nhiều chiều — đặc biệt là "già trước khi giàu" và thiếu cơ chế điều chỉnh dân chủ. Nhật mất 20 năm nhưng vẫn duy trì xã hội ổn định và đã giàu sẵn. Trung Quốc không có cả hai điều kiện đó.</span>
        </div>
      </CN_Card>
      <CN_Grid cols={3} gap={12} style={{marginBottom:16}}>
        {[
          {n:"Kịch Bản 1",t:"Soft Landing + Cải Cách",p:"20–25%",c:CN_C.green,
            ck:["Mở rộng an sinh xã hội thực chất","Cải cách SOE (giảm ưu đãi)","Tự do hóa tài chính có kiểm soát","Chấp nhận tăng trưởng chậm 3–4%"],
            ob:["Đòi hỏi cải cách chính trị đi kèm","Mâu thuẫn với tập trung quyền lực","Mất mạng lưới an toàn cán bộ","Chưa có tiền lệ ở quy mô này"]},
          {n:"Kịch Bản 2 — CƠ SỞ",t:"Japanification",p:"50–55%",c:CN_C.gold,
            ck:["Tăng trưởng 2–3%/năm","Deflation dai dẳng","Nợ 'quản lý' bằng gia hạn","Bất bình đẳng tiếp tục tăng"],
            ob:["Thiếu cơ chế dân chủ xử lý bất mãn","'Già trước khi giàu' — khác Nhật","Áp lực chip war và địa chính trị","Thế hệ trẻ mất niềm tin hệ thống"]},
          {n:"Kịch Bản 3",t:"Hard Landing",p:"20–25%",c:CN_C.red,
            ck:["Cú sốc ngoại sinh lớn","Khủng hoảng nhiều ngân hàng địa phương","LGFV vỡ đồng loạt","Leo thang Đài Loan + trừng phạt"],
            ob:["Nhà nước có $3.2T dự trữ ngoại hối","Kiểm soát vốn ngăn bank run kiểu thông thường","Sẵn sàng bơm tiền vô hạn","Ít khả năng trong ngắn hạn"]},
        ].map((s,i)=>(
          <CN_Card key={i} style={{borderTop:`3px solid ${s.c}`}}>
            <div style={{color:CN_C.muted,fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase"}}>{s.n}</div>
            <div style={{color:s.c,fontSize:13,fontWeight:700,margin:"4px 0"}}>{s.t}</div>
            <div style={{color:s.c,fontSize:20,fontWeight:700,fontFamily:"monospace",marginBottom:12}}>{s.p}</div>
            <div style={{marginBottom:10}}>
              <div style={{color:CN_C.green,fontSize:9,fontWeight:700,marginBottom:4,letterSpacing:"0.06em"}}>ĐIỀU KIỆN / DẤU HIỆU:</div>
              {s.ck.map((c,j)=><div key={j} style={{color:CN_C.text,fontSize:11,marginBottom:3}}>• {c}</div>)}
            </div>
            <div>
              <div style={{color:CN_C.red,fontSize:9,fontWeight:700,marginBottom:4,letterSpacing:"0.06em"}}>RÀO CẢN / PHẢN LUẬN:</div>
              {s.ob.map((o,j)=><div key={j} style={{color:CN_C.text,fontSize:11,marginBottom:3}}>• {o}</div>)}
            </div>
          </CN_Card>
        ))}
      </CN_Grid>
      <CN_Card>
        <CN_STitle color={CN_C.teal}>Ma Trận Đánh Giá Tổng Thể</CN_STitle>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr>
                {["Chiều","Điểm Mạnh","Điểm Yếu","Đánh Giá Rủi Ro"].map((h,i)=>(
                  <th key={i} style={{color:CN_C.gold,fontSize:10,fontWeight:700,padding:"8px 10px",
                    textAlign:"left",borderBottom:`1px solid ${CN_C.border}`,letterSpacing:"0.05em",background:CN_C.card2}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {d:"Sản Xuất",s:"Chuỗi cung ứng hoàn chỉnh, EV, pin, tàu biển",w:"Overcapacity, chiến tranh thương mại ngày càng rộng",r:"Trung Bình"},
                {d:"Tài Chính",s:"Nhà nước kiểm soát được khủng hoảng trong ngắn hạn",w:"Nợ ẩn khổng lồ, hiệu quả vốn thấp, LGFV",r:"Cao"},
                {d:"Nhân Khẩu",s:"Dân số lớn tuyệt đối, tiềm năng tăng năng suất",w:"Già hóa nhanh, tỷ lệ sinh thấp kỷ lục, mất cân bằng giới",r:"Rất Cao"},
                {d:"Chính Trị",s:"Ra quyết định nhanh, có thể lập kế hoạch dài hạn",w:"Thiếu phản hồi thị trường, khó sửa sai, tham nhũng",r:"Cao"},
                {d:"Công Nghệ",s:"AI ứng dụng, EV, năng lượng tái tạo, drone",w:"Bị chặn chip cao cấp, thiếu đột phá sáng tạo căn bản",r:"Cao"},
                {d:"Tiêu Dùng",s:"Tầng lớp trung lưu khổng lồ, tiềm năng lớn",w:"Niềm tin thấp, tài sản BĐS giảm, tiết kiệm quá mức",r:"Rất Cao"},
                {d:"Địa Chính Trị",s:"BRI, ảnh hưởng ĐNÁ và châu Phi, dự trữ ngoại hối",w:"Đối đầu Mỹ-Trung, chip war, Đài Loan, decoupling",r:"Cao"},
                {d:"Môi Trường",s:"#1 thế giới lắp đặt solar/wind mới hàng năm",w:"Than 56% điện lực, đất nông nghiệp nhiễm kim loại nặng",r:"Trung Bình"},
              ].map((r,i)=>(
                <tr key={i} style={{background:i%2===0?CN_C.card:CN_C.card2}}>
                  <td style={{color:CN_C.bright,fontWeight:700,padding:"9px 10px",fontSize:12,borderBottom:`1px solid ${CN_C.border}20`}}>{r.d}</td>
                  <td style={{color:CN_C.green,padding:"9px 10px",fontSize:12,borderBottom:`1px solid ${CN_C.border}20`,lineHeight:1.5}}>{r.s}</td>
                  <td style={{color:CN_C.text,padding:"9px 10px",fontSize:12,borderBottom:`1px solid ${CN_C.border}20`,lineHeight:1.5}}>{r.w}</td>
                  <td style={{padding:"9px 10px",borderBottom:`1px solid ${CN_C.border}20`}}><CN_Badge level={r.r}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{marginTop:16,padding:16,background:`${CN_C.gold}08`,borderRadius:8,border:`1px solid ${CN_C.gold}25`}}>
          <div style={{color:CN_C.gold,fontSize:11,fontWeight:700,marginBottom:8}}>KẾT LUẬN CUỐI CÙNG:</div>
          <div style={{color:CN_C.text,fontSize:13.5,lineHeight:1.85}}>
            Để hiểu Trung Quốc, cần bỏ qua hai cực đoan: <CN_HL c={CN_C.red}>"China Collapse"</CN_HL> (sai nhiều lần trong 30 năm — nhà nước có công cụ và quyết tâm ngăn khủng hoảng hệ thống) và <CN_HL c={CN_C.blue}>"China Dominance"</CN_HL> (bỏ qua toàn bộ vấn đề cơ cấu). Trung Quốc là nền kinh tế cực kỳ năng động đang đối mặt với <CN_HL>ba quá trình chuyển đổi khó khăn đồng thời</CN_HL> — dưới một hệ thống <CN_HL c={CN_C.red}>thiếu cơ chế phản hồi và tự điều chỉnh</CN_HL> mà các nền dân chủ có. Thập kỷ tới sẽ là <CN_HL c={CN_C.orange}>quản lý suy giảm tốc độ</CN_HL> — không phải khủng hoảng đột ngột, nhưng cũng không phải thần tốc của 40 năm trước. Và kết quả của bài kiểm tra đó sẽ định hình trật tự kinh tế toàn cầu trong thế kỷ 21.
          </div>
        </div>
      </CN_Card>
    </div>
  );
}

function CN_TabExpert() {
  return (
    <div>
      <div style={{marginBottom:20,padding:"16px 20px",background:CN_C.panel,borderRadius:8,
        border:`1px solid ${CN_C.border}`,borderLeft:`4px solid ${CN_C.gold}`}}>
        <div style={{color:CN_C.gold,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>GÓC CHUYÊN GIA — TỔNG HỢP QUAN ĐIỂM VỀ TRUNG QUỐC</div>
        <p style={{color:CN_C.bright,fontSize:14,lineHeight:1.75,margin:0}}>
          Tổng hợp các đoạn phân tích <CN_HL>đặc thù cho Trung Quốc</CN_HL> rút ra từ nhiều bài viết vĩ mô khác nhau (2021–2025) của cùng một tác giả —
          không phải một bài duy nhất, mà là các mảnh ghép rải rác trong nhiều bài về nợ Mỹ, ngoại giao, Trung Đông và ESG.
        </p>
        <div style={{color:CN_C.dim,fontSize:11,marginTop:8,fontStyle:"italic"}}>
          * Tóm tắt quan điểm cá nhân của tác giả các bài viết, trình bày để đối chiếu góc nhìn — không phải nhận định của phân tích chính trong các tab khác.
        </div>
      </div>

      <CN_Card style={{marginBottom:16}}>
        <CN_STitle>"Sân Bay Dự Phòng" — Chiến Lược Giảm Phụ Thuộc USD Của Trung Quốc</CN_STitle>
        <CN_T>Từ bài "Nợ Có Làm CP Mỹ Sụp Đổ Không?" (05/2025): tác giả phân tích tại sao TQ <CN_B>không dùng trái phiếu Mỹ làm vũ khí tài chính</CN_B> dù sở hữu lượng lớn — và chiến lược thực sự đang theo đuổi.</CN_T>
        <div style={{margin:"10px 0",padding:14,background:CN_C.card2,borderRadius:8,border:`1px solid ${CN_C.border}`}}>
          {[
            {n:"01",t:"Bán ào ạt TPCP Mỹ làm giá giảm mạnh → tự gây thiệt hại cho chính TQ trước tiên",c:CN_C.red},
            {n:"02",t:"Tỷ trọng nắm giữ chỉ 2.4% — không đủ lớn để làm sập thị trường trái phiếu Mỹ",c:CN_C.orange},
            {n:"03",t:"Bán tháo giảm giá còn có lợi cho Mỹ: Mỹ có thể mua lại nợ chính mình với giá rẻ hơn",c:CN_C.gold},
            {n:"04",t:"Nhưng nắm giữ nhiều USD lại dễ thành 'con tin' của USD — như trường hợp Nga đang chịu",c:CN_C.purple},
          ].map(s=>(
            <div key={s.n} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
              <div style={{color:s.c,fontWeight:700,fontFamily:"monospace",fontSize:11,minWidth:22}}>{s.n}</div>
              <div style={{color:CN_C.text,fontSize:12.5,lineHeight:1.65}}>→ {s.t}</div>
            </div>
          ))}
        </div>
        <CN_T><CN_HL c={CN_C.gold}>Kết luận của tác giả:</CN_HL> "Sách lược triệt để là tìm sân bay dự phòng bên cạnh USD — đây là cách Trung Quốc đang làm." Trên thực tế TQ đã <CN_B>giảm 1/3 vị thế nắm giữ trái phiếu Kho bạc Mỹ trong 10 năm</CN_B> (từ đỉnh ~$1.3 nghìn tỷ năm 2013) mà không gây hỗn loạn thị trường — một quá trình rút lui có kiểm soát, âm thầm, khác hẳn kịch bản "bán tháo gây sập" mà nhiều người lo ngại.</CN_T>
      </CN_Card>

      <CN_Card style={{marginBottom:16}}>
        <CN_STitle color={CN_C.red}>Cảnh Báo Của Rubio Về Trung Quốc (Góc Nhìn Từ Washington, 02/2025)</CN_STitle>
        <CN_T>Từ phỏng vấn Ngoại trưởng Marco Rubio — góc nhìn trực tiếp từ phía hoạch định chính sách Mỹ về mức độ đe dọa kinh tế mà Trung Quốc gây ra, đáng chú ý vì tính cụ thể hiếm có trong phát biểu chính thức:</CN_T>
        <CN_Grid cols={2} gap={12} style={{marginTop:10}}>
          <div style={{padding:12,background:`${CN_C.red}08`,borderRadius:6,border:`1px solid ${CN_C.red}20`}}>
            <div style={{color:CN_C.red,fontSize:10,fontWeight:700,marginBottom:6}}>PHỤ THUỘC CHUỖI CUNG ỨNG</div>
            <CN_T style={{margin:0}}>Rubio: TQ kiểm soát khai thác <CN_B>lẫn tinh chế</CN_B> khoáng sản quan trọng (nhôm, cobalt, đất hiếm) — và <CN_HL c={CN_C.red}>hơn 80% thành phần hoạt chất dược phẩm gốc tại Mỹ được sản xuất tại TQ</CN_HL>. Nếu TQ cắt nguồn, Mỹ "sẽ gặp rất nhiều rắc rối".</CN_T>
          </div>
          <div style={{padding:12,background:`${CN_C.orange}08`,borderRadius:6,border:`1px solid ${CN_C.orange}20`}}>
            <div style={{color:CN_C.orange,fontSize:10,fontWeight:700,marginBottom:6}}>HẠ TẦNG LƯỠNG DỤNG</div>
            <CN_T style={{margin:0}}>Rubio cáo buộc TQ có thể biến cảng/cơ sở dân sự (Panama, tiềm năng Greenland) thành <CN_B>căn cứ quân sự kép</CN_B> khi xung đột xảy ra — "mọi công ty hoạt động từ Trung Quốc hoặc Hong Kong đều do chính phủ TQ kiểm soát, không tự chủ".</CN_T>
          </div>
        </CN_Grid>
        <CN_T style={{marginTop:8}}><CN_HL c={CN_C.gold}>Nhận định của Rubio về khung thời gian:</CN_HL> Ban đầu ước tính TQ cần "10 năm" để đạt đòn bẩy kiểm soát kinh tế Mỹ qua chuỗi cung ứng — nhưng tự điều chỉnh lại: "có thể không phải 10 năm, có thể 5 năm."</CN_T>
      </CN_Card>

      <CN_Card style={{marginBottom:16}}>
        <CN_STitle color={CN_C.orange}>Ngoại Giao Năng Lượng Trung Quốc-Ả Rập — Case Study Cụ Thể (04/2023)</CN_STitle>
        <CN_T>Từ bài "Tản Mạn T3": minh họa chi tiết cách Trung Quốc tận dụng lo ngại Green Transformation của phương Tây để lôi kéo các nước OPEC+ về phía mình, với dữ kiện cụ thể hiếm khi được nêu:</CN_T>
        <CN_TL events={[
          {year:"2023",title:"CEO Saudi Aramco thăm Trung Quốc",color:CN_C.gold,desc:"Được mời nghỉ tại biệt thự số 18 Điếu Ngư Đài — nơi TQ chỉ tiếp đón nguyên thủ quốc gia hàng đầu, không dành cho khách du lịch"},
          {year:"2023",title:"Aramco mua 10% cổ phần Rongsheng Petrochemical",color:CN_C.orange,desc:"Giá ~$3.6 tỷ, kèm cam kết cung cấp 480,000 thùng dầu/ngày cho nhà máy lọc dầu tại Chiết Giang"},
          {year:"2023",title:"Thỏa thuận với China North Industries Group",color:CN_C.red,desc:"Nhà sản xuất vũ khí lớn nhất TQ — Aramco mua 30% cổ phần khu liên hợp lọc hóa dầu tại Liêu Ninh, đổi lại cung cấp tới 70% nguyên liệu dầu thô (210,000 thùng/ngày)"},
        ]}/>
        <CN_T style={{marginTop:8}}><CN_HL c={CN_C.orange}>Động cơ của Saudi Arabia:</CN_HL> Lo ngại Nga, Iran, và gần đây cả Iraq đang trở thành nhà cung cấp dầu lớn nhất cho TQ — Saudi "sốt ruột" giữ thị phần bằng đầu tư sâu vào hạ nguồn (downstream) tại chính Trung Quốc.</CN_T>
      </CN_Card>

      <CN_Card style={{marginBottom:16}}>
        <CN_STitle color={CN_C.purple}>"Cộng Đồng Nhân Loại Chung Vận Mệnh" — Triết Lý Trật Tự Thế Giới Mới Của TQ</CN_STitle>
        <CN_T>Từ bài "Thông Cáo Chung Nga-Trung" (02/2022): khái niệm do Hồ Cẩm Đào khởi xướng (~2005-2007), được Tập Cận Bình nhắc lại làm kim chỉ nam — xây dựng trên 3 trụ cột song song, không chỉ kinh tế:</CN_T>
        <CN_Grid cols={3} gap={10} style={{marginTop:10}}>
          {[
            {t:"Kinh Tế",d:"'Một vành đai, một con đường' (BRI) thay thế vai trò dẫn dắt toàn cầu hóa của Mỹ",c:CN_C.blue},
            {t:"Văn Hóa",d:"Viện Khổng Tử lan tỏa 'giá trị Trung Quốc mới', nêu cao 'tôn trọng và hài hòa sự khác biệt'",c:CN_C.gold},
            {t:"Chính Trị-Xã Hội",d:"Không áp điều kiện chính trị (minh bạch, chống tham nhũng) lên đối tác vay vốn — khác hẳn mô hình phương Tây",c:CN_C.green},
          ].map((item,i)=>(
            <div key={i} style={{padding:12,background:CN_C.card2,borderRadius:6,border:`1px solid ${item.c}30`,borderTop:`3px solid ${item.c}`}}>
              <div style={{color:item.c,fontSize:11,fontWeight:700,marginBottom:6}}>{item.t}</div>
              <div style={{color:CN_C.text,fontSize:11.5,lineHeight:1.6}}>{item.d}</div>
            </div>
          ))}
        </CN_Grid>
        <div style={{marginTop:10,padding:12,background:`${CN_C.purple}08`,borderRadius:6,border:`1px solid ${CN_C.purple}20`}}>
          <span style={{color:CN_C.purple,fontWeight:700}}>Chi tiết đáng chú ý: </span>
          <span style={{color:CN_C.text,fontSize:12.5}}>Trước khi rời Moscow sau cuộc gặp Putin (02/2022), Tập Cận Bình được dẫn lời nói: <em>"Đó là một phần của thay đổi trăm năm có một và chúng ta sẽ cùng nhau thúc đẩy điều đó"</em> (百年变局) — cụm từ "bách niên biến cục" ám chỉ một sự dịch chuyển trật tự thế giới ở quy mô thế kỷ, không phải điều chỉnh ngắn hạn.</span>
        </div>
      </CN_Card>

      <CN_Card>
        <CN_STitle color={CN_C.teal}>ESG/Chuyển Đổi Xanh Như Công Cụ Kép Nhắm Vào Trung Quốc (05/2022)</CN_STitle>
        <CN_T>Một góc nhìn gây tranh cãi từ bài "Chuyển Đổi Xanh, ESG và Lạm Phát": tác giả cho rằng đà thúc đẩy ESG/Green Transformation toàn cầu — dù có động cơ môi trường thật — <CN_B>cũng đồng thời phục vụ mục tiêu địa chính trị kép</CN_B> nhắm vào cả Nga và Trung Quốc.</CN_T>
        <div style={{padding:12,background:`${CN_C.teal}08`,borderRadius:6,border:`1px solid ${CN_C.teal}20`,marginTop:8}}>
          <span style={{color:CN_C.teal,fontWeight:700}}>Lập luận với Trung Quốc: </span>
          <span style={{color:CN_C.text,fontSize:12.5}}>TQ chấp nhận hạ tiêu chuẩn môi trường để tăng trưởng nhanh trong nhiều thập kỷ — trong Top 10 nước thải CO2 nhiều nhất, TQ chiếm ~11,500 megaton/năm, <CN_HL c={CN_C.teal}>gần bằng Mỹ + EU + Ấn Độ + Nga cộng lại</CN_HL> (theo EU Emission Database). Ép TQ cam kết carbon neutral 2050 tại COP26 đồng nghĩa ép giảm tốc động cơ tăng trưởng cũ của chính TQ.</span>
        </div>
        <CN_T style={{marginTop:8}}>Tác giả tự nhận là "tín đồ ủng hộ chuyển đổi Xanh không cực đoan" — không phủ nhận giá trị môi trường của ESG, chỉ lưu ý thêm chiều kích chính trị thường bị bỏ qua khi phân tích tác động của xu hướng này lên các nền kinh tế phụ thuộc tài nguyên/công nghiệp nặng như Trung Quốc.</CN_T>
      </CN_Card>
    </div>
  );
}

const CN_TABS = [
  {id:0,label:"Dashboard",icon:"📊"},
  {id:1,label:"Mô Hình Tăng Trưởng",icon:"📈"},
  {id:2,label:"Hệ Thống Tài Chính",icon:"🏦"},
  {id:3,label:"Bất Động Sản",icon:"🏗️"},
  {id:4,label:"Debt & LGFV",icon:"💸"},
  {id:5,label:"Sản Xuất & Chip",icon:"🏭"},
  {id:6,label:"Nhân Khẩu Học",icon:"👥"},
  {id:7,label:"CCP & Kinh Tế",icon:"🔴"},
  {id:8,label:"Địa Chính Trị",icon:"🌏"},
  {id:9,label:"Rủi Ro & Kịch Bản",icon:"⚠️"},
  {id:10,label:"Góc Chuyên Gia",icon:"🎓"},
];

const CN_CONTENT = [
  <CN_TabDashboard/>,<CN_TabGrowth/>,<CN_TabFinance/>,<CN_TabRealEstate/>,
  <CN_TabDebt/>,<CN_TabMfg/>,<CN_TabDemo/>,<CN_TabCCP/>,<CN_TabGeo/>,<CN_TabRisks/>,<CN_TabExpert/>,
];

/* ==================== MỸ (US) ==================== */
const US_C = {
  bg:"#FAF9F6", panel:"#FFFFFF", card:"#FFFFFF", card2:"#F2F5FA",
  border:"#E2E6EE", text:"#5B6472", bright:"#161A20", dim:"#8B93A0",
  muted:"#6B7280", navy:"#2A4E8C", red:"#B8443F", green:"#238F5E",
  blue:"#2A6BB8", purple:"#7255C9", orange:"#C46E30", gold:"#A9821E",
};

const US_DEBT_GDP = [
  {y:"1980",v:31},{y:"1990",v:53},{y:"2000",v:55},{y:"2008",v:67},
  {y:"2012",v:99},{y:"2016",v:105},{y:"2020",v:126},{y:"2022",v:118},
  {y:"2024",v:122},
];
const US_GDP_GROWTH = [
  {y:"2015",g:2.9},{y:"2016",g:1.7},{y:"2017",g:2.3},{y:"2018",g:3.0},
  {y:"2019",g:2.5},{y:"2020",g:-2.2},{y:"2021",g:5.8},{y:"2022",g:1.9},
  {y:"2023",g:2.5},{y:"2024",g:2.8},
];
const US_GINI_COMPARE = [
  {c:"Mỹ",v:41.3},{c:"Anh",v:35.1},{c:"Pháp",v:31.6},{c:"Đức",v:31.9},
  {c:"Nhật",v:32.9},{c:"Canada",v:33.3},{c:"Na Uy",v:27.6},
];
const US_RESERVE_PIE = [
  {n:"USD",v:58},{n:"EUR",v:20},{n:"JPY",v:5.7},{n:"GBP",v:4.9},
  {n:"CNY",v:2.3},{n:"Khác",v:9.1},
];
const US_RISK_RADAR = [
  {s:"Nợ Liên Bang",v:75},{s:"Phân Cực CT",v:80},{s:"Bất Bình Đẳng",v:65},
  {s:"Y Tế/Chi Phí",v:70},{s:"Hạ Tầng",v:55},{s:"Địa CT (TQ)",v:60},
  {s:"Fed/Lạm Phát",v:50},{s:"Thâm Hụt TM",v:58},
];
const US_SECTOR_GDP = [
  {s:"Dịch Vụ",v:77},{s:"Sản Xuất",v:11},{s:"Xây Dựng",v:4},
  {s:"Nông Nghiệp",v:1},{s:"Khai Khoáng",v:2},{s:"Khác",v:5},
];
const US_RATE_HIKE = [
  {m:"1/22",r:0.25},{m:"5/22",r:1.0},{m:"7/22",r:2.5},{m:"11/22",r:4.0},
  {m:"2/23",r:4.75},{m:"7/23",r:5.5},{m:"9/24",r:4.75},{m:"1/25",r:4.5},
];
const US_HEALTHCARE_COMPARE = [
  {c:"Mỹ",v:16.9},{c:"Đức",v:12.7},{c:"Pháp",v:12.1},{c:"Nhật",v:11.5},
  {c:"Anh",v:11.3},{c:"Hàn Quốc",v:9.7},
];
const US_PIE_COLORS=[US_C.navy,US_C.gold,US_C.red,US_C.green,US_C.purple,US_C.dim];

const US_TT = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  return (
    <div style={{background:US_C.panel,border:`1px solid ${US_C.border}`,borderRadius:6,padding:"8px 12px"}}>
      <div style={{color:US_C.gold,fontSize:11,fontWeight:700,marginBottom:4}}>{label}</div>
      {payload.map((p,i)=>(
        <div key={i} style={{color:p.color||US_C.bright,fontSize:12}}>
          {p.name}: <span style={{fontFamily:"monospace",fontWeight:700}}>{typeof p.value==="number"?p.value.toFixed(1):p.value}</span>
        </div>
      ))}
    </div>
  );
};
const US_Card = ({children,style={}}) => (
  <div style={{background:US_C.card,border:`1px solid ${US_C.border}`,borderRadius:8,padding:20,...style}}>{children}</div>
);
const US_STitle = ({children,color=US_C.gold}) => (
  <div style={{color,fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",
    marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
    <div style={{width:14,height:2,background:color,borderRadius:1,flexShrink:0}}/>{children}
  </div>
);
const US_T = ({children,style}) => <p style={{color:US_C.text,fontSize:13.5,lineHeight:1.75,margin:"5px 0",...style}}>{children}</p>;
const US_B = ({children}) => <span style={{color:US_C.bright,fontWeight:600}}>{children}</span>;
const US_HL = ({children,c=US_C.gold}) => <span style={{color:c,fontWeight:600}}>{children}</span>;
const US_Metric = ({label,value,sub,color=US_C.blue,warn}) => (
  <div style={{background:US_C.card,border:`1px solid ${US_C.border}`,borderRadius:8,
    padding:"14px 16px",borderTop:`3px solid ${color}`}}>
    <div style={{color:US_C.muted,fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>{label}</div>
    <div style={{color,fontSize:22,fontWeight:700,fontFamily:"monospace",letterSpacing:"-0.02em"}}>{value}</div>
    {sub&&<div style={{color:US_C.dim,fontSize:11,marginTop:3}}>{sub}</div>}
    {warn&&<div style={{color:US_C.red,fontSize:10,marginTop:2,fontWeight:700}}>{warn}</div>}
  </div>
);
const US_Badge = ({level}) => {
  const m={"Rất Cao":"#B8222C",Cao:US_C.red,"Trung Bình":US_C.gold,Thấp:US_C.green};
  const c=m[level]||US_C.gold;
  return <span style={{background:c+"20",color:c,border:`1px solid ${c}40`,
    borderRadius:4,padding:"2px 8px",fontSize:10,fontWeight:700}}>{level}</span>;
};
const US_Grid = ({cols=2,gap=16,children,style}) => (
  <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap,...style}}>{children}</div>
);
const US_TL = ({events}) => (
  <div style={{position:"relative",paddingLeft:22}}>
    <div style={{position:"absolute",left:7,top:4,bottom:4,width:1.5,background:US_C.border}}/>
    {events.map((e,i)=>(
      <div key={i} style={{marginBottom:14,position:"relative"}}>
        <div style={{position:"absolute",left:-18,top:4,width:9,height:9,borderRadius:"50%",
          background:e.color||US_C.gold,boxShadow:`0 0 6px ${e.color||US_C.gold}60`}}/>
        <div style={{color:e.color||US_C.gold,fontSize:10,fontWeight:700,letterSpacing:"0.06em"}}>{e.year}</div>
        <div style={{color:US_C.bright,fontSize:13,fontWeight:600,marginTop:1}}>{e.title}</div>
        <div style={{color:US_C.text,fontSize:12,lineHeight:1.6,marginTop:2}}>{e.desc}</div>
      </div>
    ))}
  </div>
);

function US_TabDashboard() {
  return (
    <div>
      <div style={{marginBottom:20,padding:"16px 20px",background:US_C.panel,borderRadius:8,
        border:`1px solid ${US_C.border}`,borderLeft:`4px solid ${US_C.gold}`}}>
        <div style={{color:US_C.gold,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>LUẬN ĐIỂM CỐT LÕI</div>
        <p style={{color:US_C.bright,fontSize:14,lineHeight:1.75,margin:0}}>
          Mỹ vận hành mô hình kinh tế độc nhất dựa trên <US_HL c={US_C.navy}>đặc quyền đồng đô la dự trữ toàn cầu</US_HL>,
          thị trường vốn sâu nhất và hệ sinh thái đổi mới sáng tạo không đối thủ. Nhưng đang tích lũy{" "}
          <US_HL c={US_C.red}>rủi ro cấu trúc dài hạn</US_HL>: nợ liên bang phình to, phân cực chính trị làm tê liệt hoạch định
          chính sách, và bất bình đẳng ngày càng sâu — trong khi vẫn giữ vị thế siêu cường kinh tế-công nghệ số 1 thế giới.
        </p>
      </div>
      <US_Grid cols={3} gap={12} style={{marginBottom:16}}>
        <US_Metric label="Nợ Liên Bang / GDP" value="~122%" sub="Từ 55% năm 2000" color={US_C.red} warn="↑ Không có dấu hiệu chậm lại"/>
        <US_Metric label="Tăng Trưởng GDP 2024" value="2.8%" sub="Vượt kỳ vọng hầu hết dự báo" color={US_C.blue}/>
        <US_Metric label="Tỷ Trọng USD Dự Trữ TC" value="58%" sub="Giảm nhẹ từ ~70% năm 2000" color={US_C.gold}/>
        <US_Metric label="Chi Phí Trả Lãi Nợ 2024" value=">Chi QP" sub="Lần đầu vượt quốc phòng" color={US_C.red}/>
        <US_Metric label="Vốn Hóa TTCK" value="~$50T+" sub="Gần 50% vốn hóa toàn cầu" color={US_C.green}/>
        <US_Metric label="Gini Coefficient" value="0.41" sub="Cao nhất G7" color={US_C.orange}/>
      </US_Grid>
      <US_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <US_Card>
          <US_STitle>Tăng Trưởng GDP Thực 2015–2024 (%)</US_STitle>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={US_GDP_GROWTH} margin={{top:5,right:10,bottom:5,left:-20}}>
              <defs>
                <linearGradient id="gG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={US_C.blue} stopOpacity={0.35}/>
                  <stop offset="95%" stopColor={US_C.blue} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="y" tick={{fill:US_C.dim,fontSize:10}} axisLine={{stroke:US_C.border}} tickLine={false}/>
              <YAxis tick={{fill:US_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <Tooltip content={<US_TT/>}/>
              <Area type="monotone" dataKey="g" stroke={US_C.blue} fill="url(#gG)" strokeWidth={2} name="GDP %"/>
            </AreaChart>
          </ResponsiveContainer>
        </US_Card>
        <US_Card>
          <US_STitle>Radar Rủi Ro Cấu Trúc (0–100)</US_STitle>
          <ResponsiveContainer width="100%" height={210}>
            <RadarChart data={US_RISK_RADAR} margin={{top:5,right:25,bottom:5,left:25}}>
              <PolarGrid stroke={US_C.border}/>
              <PolarAngleAxis dataKey="s" tick={{fill:US_C.dim,fontSize:9}}/>
              <PolarRadiusAxis angle={90} domain={[0,100]} tick={{fill:US_C.dim,fontSize:8}}/>
              <Radar dataKey="v" stroke={US_C.red} fill={US_C.red} fillOpacity={0.22} strokeWidth={1.5} name="Rủi Ro"/>
            </RadarChart>
          </ResponsiveContainer>
        </US_Card>
      </US_Grid>
      <US_Card style={{marginBottom:16}}>
        <US_STitle color={US_C.navy}>Nợ Liên Bang / GDP (%) — 1980 đến 2024</US_STitle>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={US_DEBT_GDP} margin={{top:5,right:10,bottom:5,left:-10}}>
            <defs>
              <linearGradient id="dbG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={US_C.red} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={US_C.red} stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="y" tick={{fill:US_C.dim,fontSize:10}} axisLine={{stroke:US_C.border}} tickLine={false}/>
            <YAxis tick={{fill:US_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip content={<US_TT/>}/>
            <Area type="monotone" dataKey="v" stroke={US_C.red} fill="url(#dbG)" strokeWidth={2} name="Nợ/GDP %"/>
          </AreaChart>
        </ResponsiveContainer>
      </US_Card>
      <US_Grid cols={3} gap={12}>
        {[
          {n:"Kịch Bản 1",t:"Soft Landing Kéo Dài",p:"40–45%",c:US_C.green,
            d:"Fed hạ lãi suất từ từ, lạm phát ổn định ~2%, tăng trưởng 2-2.5%/năm. Đô la giữ vị thế dự trữ. Nợ tăng nhưng thị trường vẫn hấp thụ được."},
          {n:"Kịch Bản 2 — CƠ SỞ",t:"Muddle Through / Phân Cực Kéo Dài",p:"35–40%",c:US_C.gold,
            d:"Chính trị bế tắc lặp lại (debt ceiling, shutdown), chi tiêu tăng không kiểm soát, nợ tiếp tục phình nhưng chưa khủng hoảng. Bất bình đẳng gia tăng."},
          {n:"Kịch Bản 3",t:"Fiscal/Dollar Crisis",p:"15–20%",c:US_C.red,
            d:"Niềm tin vào đô la và trái phiếu Mỹ suy giảm mạnh, lãi suất trái phiếu tăng vọt, khủng hoảng nợ công buộc điều chỉnh đau đớn."},
        ].map((s,i)=>(
          <div key={i} style={{background:US_C.card,border:`1px solid ${US_C.border}`,borderRadius:8,
            padding:16,borderTop:`3px solid ${s.c}`}}>
            <div style={{color:US_C.muted,fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase"}}>{s.n}</div>
            <div style={{color:s.c,fontSize:13,fontWeight:700,margin:"4px 0"}}>{s.t}</div>
            <div style={{color:s.c,fontSize:20,fontWeight:700,fontFamily:"monospace",marginBottom:8}}>{s.p}</div>
            <div style={{color:US_C.text,fontSize:12,lineHeight:1.65}}>{s.d}</div>
          </div>
        ))}
      </US_Grid>
    </div>
  );
}

function US_TabModel() {
  return (
    <div>
      <US_Card style={{marginBottom:16,borderLeft:`4px solid ${US_C.navy}`}}>
        <US_STitle color={US_C.navy}>Đặc Quyền Đồng Đô La — "Exorbitant Privilege"</US_STitle>
        <US_T>Cụm từ do Bộ trưởng Tài chính Pháp Valéry Giscard d'Estaing đặt ra thập niên 1960. Vì USD là <US_B>đồng tiền dự trữ toàn cầu</US_B>, Mỹ có khả năng vay nợ bằng chính đồng tiền của mình với lãi suất thấp hơn bất kỳ quốc gia nào khác — một lợi thế cấu trúc không nước nào khác có được ở quy mô này.</US_T>
        <div style={{margin:"12px 0",padding:16,background:US_C.card2,borderRadius:8,border:`1px solid ${US_C.border}`}}>
          <div style={{color:US_C.navy,fontSize:10,fontWeight:700,marginBottom:10,letterSpacing:"0.08em"}}>CƠ CHẾ HOẠT ĐỘNG:</div>
          {[
            {n:"01",t:"Các nước cần USD để giao dịch dầu, hàng hóa, thanh toán quốc tế",c:US_C.blue},
            {n:"02",t:"Ngân hàng trung ương toàn cầu giữ USD làm dự trữ (~58% tổng dự trữ)",c:US_C.navy},
            {n:"03",t:"Nhu cầu USD liên tục → nhu cầu trái phiếu Mỹ liên tục → lãi suất vay thấp",c:US_C.gold},
            {n:"04",t:"Mỹ có thể chạy thâm hụt kép (ngân sách + thương mại) trong nhiều thập kỷ",c:US_C.orange},
            {n:"05",t:"Về bản chất: thế giới 'cho Mỹ vay' liên tục để giữ hệ thống thanh toán vận hành",c:US_C.red},
          ].map(s=>(
            <div key={s.n} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
              <div style={{color:s.c,fontWeight:700,fontFamily:"monospace",fontSize:11,minWidth:22}}>{s.n}</div>
              <div style={{color:US_C.text,fontSize:12.5,lineHeight:1.65}}>→ {s.t}</div>
            </div>
          ))}
        </div>
        <US_T><US_HL>Giới hạn của đặc quyền:</US_HL> Không phải vô hạn. Nếu niềm tin vào đồng đô la và khả năng trả nợ của Mỹ suy giảm đáng kể, chi phí vay sẽ tăng nhanh — đây là rủi ro dài hạn thực sự, không phải giả định lý thuyết.</US_T>
      </US_Card>
      <US_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <US_Card>
          <US_STitle color={US_C.gold}>Thị Phần Đồng Tiền Dự Trữ Toàn Cầu</US_STitle>
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie data={US_RESERVE_PIE} cx="50%" cy="50%" innerRadius={50} outerRadius={85}
                dataKey="v" nameKey="n" paddingAngle={2}>
                {US_RESERVE_PIE.map((_,i)=><Cell key={i} fill={US_PIE_COLORS[i]}/>)}
              </Pie>
              <Tooltip formatter={(v,n)=>[`${v}%`,n]}/>
              <Legend wrapperStyle={{color:US_C.text,fontSize:11}}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{color:US_C.dim,fontSize:11,marginTop:-4,textAlign:"center"}}>USD giảm nhẹ từ ~70% (2000) — chưa có đối thủ thay thế thực sự</div>
        </US_Card>
        <US_Card>
          <US_STitle color={US_C.blue}>Twin Deficits — Nợ Đôi Cấu Trúc</US_STitle>
          <US_T>Mỹ duy trì đồng thời <US_B>thâm hụt ngân sách (~6–7% GDP)</US_B> và <US_B>thâm hụt thương mại (~3–4% GDP)</US_B> liên tục nhiều thập kỷ — điều lý thuyết kinh tế cổ điển cho là không bền vững.</US_T>
          <div style={{padding:12,background:`${US_C.blue}10`,borderRadius:6,border:`1px solid ${US_C.blue}25`,marginTop:8}}>
            <div style={{color:US_C.blue,fontSize:10,fontWeight:700,marginBottom:6}}>TẠI SAO CHƯA SỤP ĐỔ:</div>
            <US_T style={{margin:0}}>Vốn toàn cầu chảy vào trái phiếu Mỹ vì tính an toàn (safe haven) và tính thanh khoản cao nhất thế giới. Đây là vòng lặp tự củng cố — nhưng phụ thuộc hoàn toàn vào niềm tin duy trì.</US_T>
          </div>
          <US_T><US_HL c={US_C.orange}>Cấu trúc GDP theo ngành:</US_HL> Dịch vụ chiếm 77%, sản xuất chỉ 11% — phản ánh quá trình "hậu công nghiệp hóa" kéo dài từ 1980s, đánh đổi việc làm chế tạo lấy hiệu quả tài chính-dịch vụ.</US_T>
        </US_Card>
      </US_Grid>
      <US_Card>
        <US_STitle color={US_C.purple}>Financialization — "Tài Chính Hóa" Nền Kinh Tế</US_STitle>
        <US_T>Từ 1980s, tỷ trọng ngành tài chính trong GDP và lợi nhuận doanh nghiệp tăng vượt trội so với sản xuất thực. Nhiều nhà kinh tế (bao gồm cả trong Fed) tranh luận đây rút ruột nguồn lực khỏi đầu tư sản xuất dài hạn để phục vụ lợi nhuận tài chính ngắn hạn.</US_T>
        <US_Grid cols={2} gap={12} style={{marginTop:10}}>
          <div style={{padding:12,background:US_C.card2,borderRadius:6}}>
            <div style={{color:US_C.green,fontSize:10,fontWeight:700,marginBottom:6}}>LỢI ÍCH</div>
            <div style={{color:US_C.text,fontSize:12,lineHeight:1.7}}>
              • Thị trường vốn sâu nhất → huy động vốn dễ nhất thế giới<br/>
              • Định giá tài sản hiệu quả, thanh khoản cao<br/>
              • Trung tâm tài chính toàn cầu (Wall Street) tạo việc làm cao cấp
            </div>
          </div>
          <div style={{padding:12,background:US_C.card2,borderRadius:6}}>
            <div style={{color:US_C.red,fontSize:10,fontWeight:700,marginBottom:6}}>RỦI RO</div>
            <div style={{color:US_C.text,fontSize:12,lineHeight:1.7}}>
              • Buyback cổ phiếu thay vì đầu tư R&D/nhà máy<br/>
              • Bất bình đẳng giữa "Wall Street" và lao động thực<br/>
              • Rủi ro hệ thống khi tài chính quá lớn (2008 là ví dụ)
            </div>
          </div>
        </US_Grid>
      </US_Card>
      <US_Card style={{marginTop:16}}>
        <US_STitle color={US_C.navy}>Khung Phân Tích Ngoại Giao — "Rubio Doctrine" (2025)</US_STitle>
        <US_T>Ngoại trưởng Marco Rubio (2025) trình bày một khung phân tích cho thấy hành vi kinh tế đối ngoại của Mỹ được quyết định bởi <US_B>3 chiều lợi ích quốc gia</US_B> — công cụ hữu ích để dự đoán Mỹ sẽ can thiệp/quan tâm đến quốc gia hay khu vực nào:</US_T>
        <US_Grid cols={3} gap={12} style={{marginTop:10}}>
          {[
            {t:"Thể Chế",d:"Quốc gia đó có vận hành phù hợp với trật tự quốc tế Mỹ muốn duy trì hay không.",c:US_C.blue},
            {t:"Vị Trí Địa Lý",d:"Vai trò trong các hành lang kinh tế-quân sự chiến lược toàn cầu (kênh đào, eo biển, Bắc Cực...).",c:US_C.gold},
            {t:"Tài Nguyên",d:"Đặc biệt năng lượng và khoáng sản quan trọng trong chuỗi cung ứng công nghệ-quốc phòng.",c:US_C.orange},
          ].map((item,i)=>(
            <div key={i} style={{padding:12,background:US_C.card2,borderRadius:6,border:`1px solid ${item.c}30`,borderTop:`3px solid ${item.c}`}}>
              <div style={{color:item.c,fontSize:12,fontWeight:700,marginBottom:6}}>{item.t}</div>
              <div style={{color:US_C.text,fontSize:12,lineHeight:1.6}}>{item.d}</div>
            </div>
          ))}
        </US_Grid>
        <US_T style={{marginTop:10}}><US_HL c={US_C.navy}>Điểm nhấn về Trung Quốc:</US_HL> Rubio cảnh báo TQ kiểm soát khoáng sản quan trọng (đất hiếm, cobalt) và ~80% thành phần hoạt chất dược phẩm Mỹ sử dụng — nếu TQ cắt nguồn cung, Mỹ "sẽ gặp rất nhiều rắc rối" vì đã từ bỏ năng lực công nghiệp nội địa cho những lĩnh vực này. Ước tính đòn bẩy này có thể đủ mạnh trong <US_B>5 năm</US_B>, không phải 10 năm như dự đoán trước đó.</US_T>
        <div style={{marginTop:10,padding:12,background:`${US_C.red}08`,borderRadius:6,border:`1px solid ${US_C.red}20`}}>
          <span style={{color:US_C.red,fontWeight:700}}>Ứng dụng thực tế: </span>
          <span style={{color:US_C.text,fontSize:12.5}}>Khung 3 chiều này lý giải các động thái Mỹ với Panama (kênh đào — vị trí), Greenland (Bắc Cực — vị trí + tài nguyên), và áp lực thuế quan với Mexico/Canada (thương mại mất cân bằng — chiều thể chế/kinh tế) trong cùng giai đoạn.</span>
        </div>
      </US_Card>
    </div>
  );
}

function US_TabBanking() {
  return (
    <div>
      <US_Card style={{marginBottom:16}}>
        <US_STitle color={US_C.navy}>Fed — Chu Kỳ Tăng Lãi Suất Nhanh Nhất 40 Năm</US_STitle>
        <US_T>Để chống lạm phát post-COVID (đỉnh 9.1% giữa 2022), Fed tăng lãi suất từ gần 0% lên <US_B>5.5%</US_B> trong vòng 16 tháng — tốc độ nhanh nhất kể từ thập niên 1980s dưới thời Paul Volcker.</US_T>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={US_RATE_HIKE} margin={{top:5,right:20,bottom:5,left:-10}}>
            <XAxis dataKey="m" tick={{fill:US_C.dim,fontSize:10}} axisLine={{stroke:US_C.border}} tickLine={false}/>
            <YAxis tick={{fill:US_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip content={<US_TT/>}/>
            <Line type="stepAfter" dataKey="r" stroke={US_C.navy} strokeWidth={2.5} dot={{fill:US_C.navy,r:3}} name="Fed Funds Rate %"/>
          </LineChart>
        </ResponsiveContainer>
        <US_T><US_HL c={US_C.red}>Hệ quả:</US_HL> Duration mismatch tại ngân hàng khu vực (nắm giữ trái phiếu dài hạn lãi suất thấp khi lãi suất thị trường tăng nhanh) → khủng hoảng SVB, Signature Bank, First Republic (3/2023) — vụ sụp đổ ngân hàng lớn thứ hai trong lịch sử Mỹ.</US_T>
      </US_Card>
      <US_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <US_Card>
          <US_STitle color={US_C.red}>Khủng Hoảng SVB 2023 — Bài Học Chưa Cũ</US_STitle>
          <US_TL events={[
            {year:"3/8/23",title:"SVB thông báo bán lỗ $1.8B trái phiếu",color:US_C.orange,desc:"Cần tăng vốn để bù thanh khoản — signal đầu tiên gây hoảng loạn"},
            {year:"3/9/23",title:"Bank run kỹ thuật số — $42B rút trong 1 ngày",color:US_C.red,desc:"Tốc độ rút tiền nhanh nhất lịch sử nhờ mobile banking + Twitter panic"},
            {year:"3/10/23",title:"FDIC tiếp quản SVB",color:US_C.red,desc:"Ngân hàng sụp đổ lớn thứ 2 trong lịch sử Mỹ (sau WaMu 2008)"},
            {year:"3/12/23",title:"Fed công bố Bank Term Funding Program",color:US_C.blue,desc:"Bơm thanh khoản khẩn cấp ngăn lan truyền hệ thống"},
            {year:"5/2023",title:"First Republic Bank sụp đổ",color:US_C.red,desc:"Được JPMorgan mua lại — vụ sụp đổ ngân hàng lớn nhất kể từ 2008"},
          ]}/>
        </US_Card>
        <US_Card>
          <US_STitle color={US_C.gold}>Thị Trường Vốn — Lợi Thế Không Đối Thủ</US_STitle>
          {[
            {l:"Vốn hóa TTCK Mỹ",v:"~$50 nghìn tỷ+",c:US_C.green},
            {l:"% vốn hóa toàn cầu",v:"~45–50%",c:US_C.blue},
            {l:"Vốn đầu tư VC hàng năm",v:"~$170B+",c:US_C.purple},
            {l:"Số công ty niêm yết lớn nhất TG",v:"7/10 (Magnificent 7)",c:US_C.gold},
            {l:"IPO & huy động vốn tư nhân",v:"Dễ nhất & lớn nhất thế giới",c:US_C.navy},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${US_C.border}30`}}>
              <span style={{color:US_C.text,fontSize:12}}>{r.l}</span>
              <span style={{color:r.c,fontSize:12,fontWeight:700,textAlign:"right"}}>{r.v}</span>
            </div>
          ))}
          <US_T style={{marginTop:8}}>Đây là lợi thế cấu trúc quan trọng nhất của Mỹ trong đổi mới sáng tạo: startup có thể tiếp cận vốn rủi ro dễ hơn bất kỳ đâu trên thế giới, tạo động lực cho toàn bộ hệ sinh thái công nghệ.</US_T>
        </US_Card>
      </US_Grid>
      <US_Card>
        <US_STitle color={US_C.orange}>Dodd-Frank & Quy Định Sau 2008 — Đủ Chưa?</US_STitle>
        <US_T>Sau khủng hoảng tài chính 2008, Dodd-Frank Act (2010) tăng vốn dự trữ bắt buộc, thiết lập stress test hàng năm cho ngân hàng lớn, tạo CFPB bảo vệ người tiêu dùng. Nhưng <US_B>ngân hàng khu vực dưới $250B tài sản được miễn nhiều quy định nghiêm ngặt</US_B> (nới lỏng 2018) — chính là nhóm gặp khủng hoảng 2023.</US_T>
        <div style={{padding:12,background:`${US_C.orange}10`,borderRadius:6,border:`1px solid ${US_C.orange}25`,marginTop:8}}>
          <span style={{color:US_C.orange,fontWeight:700}}>Bài học chưa được giải quyết: </span>
          <span style={{color:US_C.text,fontSize:12.5}}>Quy định tập trung vào ngân hàng "too big to fail" nhưng bỏ qua rủi ro tích lũy ở nhóm ngân hàng khu vực vừa — nơi vẫn có thể gây hoảng loạn hệ thống khi bank run kỹ thuật số diễn ra trong vài giờ.</span>
        </div>
      </US_Card>
    </div>
  );
}

function US_TabDebt() {
  return (
    <div>
      <US_Grid cols={4} gap={12} style={{marginBottom:16}}>
        <US_Metric label="Nợ Liên Bang" value="$35T+" sub="~122% GDP" color={US_C.red}/>
        <US_Metric label="Chi Phí Trả Lãi/Năm" value="$1T+" sub="Vượt chi quốc phòng 2024" color={US_C.red} warn="Lần đầu trong lịch sử"/>
        <US_Metric label="Thâm Hụt Ngân Sách" value="~6-7% GDP" sub="Cao bất thường ngoài khủng hoảng" color={US_C.orange}/>
        <US_Metric label="Debt Ceiling Crises" value="Lặp lại" sub="2011, 2013, 2021, 2023" color={US_C.gold}/>
      </US_Grid>
      <US_Card style={{marginBottom:16}}>
        <US_STitle color={US_C.red}>Nợ Liên Bang / GDP (%) — 1980 đến 2024</US_STitle>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={US_DEBT_GDP} margin={{top:5,right:10,bottom:5,left:-10}}>
            <defs>
              <linearGradient id="dG2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={US_C.red} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={US_C.red} stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="y" tick={{fill:US_C.dim,fontSize:10}} axisLine={{stroke:US_C.border}} tickLine={false}/>
            <YAxis tick={{fill:US_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip content={<US_TT/>}/>
            <Area type="monotone" dataKey="v" stroke={US_C.red} fill="url(#dG2)" strokeWidth={2} name="Nợ/GDP %"/>
          </AreaChart>
        </ResponsiveContainer>
      </US_Card>
      <US_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <US_Card>
          <US_STitle color={US_C.orange}>Debt Ceiling — Vũ Khí Chính Trị Nội Bộ</US_STitle>
          <US_T>Trần nợ (debt ceiling) là cơ chế độc nhất của Mỹ — Quốc hội phải bỏ phiếu cho phép chính phủ vay thêm để trả các khoản đã chi tiêu (không phải chi tiêu mới). Trở thành <US_B>công cụ đấu tranh chính trị lặp lại</US_B> giữa hai đảng.</US_T>
          <US_TL events={[
            {year:"2011",title:"Khủng hoảng trần nợ đầu tiên",color:US_C.orange,desc:"S&P hạ tín nhiệm Mỹ từ AAA xuống AA+ lần đầu tiên trong lịch sử"},
            {year:"2013",title:"Government shutdown 16 ngày",color:US_C.red,desc:"Bế tắc Obamacare + trần nợ gây đóng cửa chính phủ"},
            {year:"2021",title:"Căng thẳng trần nợ giữa Biden-McConnell",color:US_C.gold,desc:"Giải quyết vào giờ cuối, tránh vỡ nợ kỹ thuật"},
            {year:"2023",title:"Khủng hoảng trần nợ McCarthy-Biden",color:US_C.red,desc:"Giải quyết 2 ngày trước hạn vỡ nợ ước tính — Fitch hạ tín nhiệm sau đó"},
          ]}/>
        </US_Card>
        <US_Card>
          <US_STitle color={US_C.purple}>Ai Đang Giữ Nợ Mỹ?</US_STitle>
          {[
            {l:"Công chúng Mỹ (cá nhân + quỹ)",v:"~75%",c:US_C.blue},
            {l:"Chính phủ nước ngoài",v:"~25%",c:US_C.gold},
            {l:"— Nhật Bản (lớn nhất)",v:"~$1.1T",c:US_C.text},
            {l:"— Trung Quốc (giảm mạnh từ đỉnh)",v:"~$780B",c:US_C.orange},
            {l:"— Anh, các nước khác",v:"Phần còn lại",c:US_C.dim},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${US_C.border}25`}}>
              <span style={{color:US_C.text,fontSize:12}}>{r.l}</span>
              <span style={{color:r.c,fontSize:12,fontWeight:700}}>{r.v}</span>
            </div>
          ))}
          <US_T style={{marginTop:8}}><US_HL c={US_C.orange}>Trung Quốc đang giảm nắm giữ trái phiếu Mỹ</US_HL> đáng kể từ đỉnh ~$1.3T (2013) — một phần chiến lược giảm phụ thuộc lẫn nhau về tài chính giữa hai siêu cường.</US_T>
        </US_Card>
      </US_Grid>
      <US_Card>
        <US_STitle color={US_C.gold}>Bền Vững Tài Khóa Dài Hạn — Đồng Hồ Đang Chạy?</US_STitle>
        <US_T>CBO (Congressional Budget Office) dự báo nợ/GDP sẽ vượt <US_B>166% vào 2054</US_B> nếu chính sách hiện tại không đổi — chủ yếu do chi phí Social Security, Medicare tăng khi dân số già hóa, và lãi suất nợ ngày càng lớn (nợ chồng lãi).</US_T>
        <div style={{padding:12,background:`${US_C.red}08`,borderRadius:6,border:`1px solid ${US_C.red}20`,marginTop:8}}>
          <span style={{color:US_C.red,fontWeight:700}}>Khác biệt cơ bản với Trung Quốc/Nhật: </span>
          <span style={{color:US_C.text,fontSize:12.5}}>Mỹ vay bằng đồng tiền của chính mình, được thị trường toàn cầu tự nguyện mua nhờ vị thế dự trữ — nhưng "đặc quyền" này không vô hạn nếu niềm tin suy giảm đáng kể hoặc lãi suất buộc phải giữ cao lâu dài.</span>
        </div>
      </US_Card>
      <US_Card style={{marginTop:16}}>
        <US_STitle color={US_C.blue}>Bóc Tách Chủ Nợ — Ai Thực Sự Có Thể "Đòi" Mỹ Trả Nợ?</US_STitle>
        <US_T>Phân tích chi tiết cơ cấu chủ nợ (dựa trên số liệu ~$34.4 ngàn tỷ nợ liên bang) cho thấy phần lớn nợ Mỹ có <US_B>rủi ro mất thanh khoản gần như bằng 0</US_B> — vì bản chất từng nhóm chủ nợ khiến việc "đòi nợ ồ ạt" gần như không khả thi.</US_T>
        <div style={{overflowX:"auto",marginTop:10}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr>
                {["Nhóm Chủ Nợ","% Tổng Nợ","Lý Do Rủi Ro Thấp"].map((h,i)=>(
                  <th key={i} style={{color:US_C.gold,fontSize:10,fontWeight:700,padding:"8px 10px",
                    textAlign:"left",borderBottom:`1px solid ${US_C.border}`,background:US_C.card2}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {g:"Nợ liên chính phủ (An sinh XH, Medicare...)",p:"21%",r:"Chính phủ không thể tự đòi nợ chính mình"},
                {g:"Cục Dự trữ Liên bang (Fed)",p:"15%",r:"CP có đủ công cụ cơ cấu, gia hạn khoản vay Fed"},
                {g:"Quỹ hưu trí, bảo hiểm, tổ chức tài chính",p:"20%",r:"Luật buộc nắm giữ TPCP vì lý do an toàn — gần như bắt buộc"},
                {g:"Chính quyền địa phương/bang",p:"5%",r:"Tương tự nợ liên chính phủ — không tự đòi được"},
                {g:"Nhà đầu tư nội địa khác",p:"16%",r:"Chủ nợ phân tán, nhu cầu nắm giữ luôn tồn tại"},
                {g:"Đồng minh nước ngoài (Nhật, Anh, EU...)",p:"~15-18%",r:"Công cụ tài chính-chính trị đủ mạnh để không bán tháo"},
                {g:"Nước ngoài có thể mâu thuẫn lợi ích",p:"~5-8%",r:"Quy mô nhỏ, tác động không đáng kể lên thị trường"},
              ].map((r,i)=>(
                <tr key={i} style={{background:i%2===0?US_C.card:US_C.card2}}>
                  <td style={{color:US_C.bright,padding:"8px 10px",fontSize:12,borderBottom:`1px solid ${US_C.border}20`}}>{r.g}</td>
                  <td style={{color:US_C.blue,fontWeight:700,padding:"8px 10px",fontSize:12,borderBottom:`1px solid ${US_C.border}20`}}>{r.p}</td>
                  <td style={{color:US_C.text,padding:"8px 10px",fontSize:11.5,borderBottom:`1px solid ${US_C.border}20`,lineHeight:1.5}}>{r.r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{marginTop:10,padding:12,background:`${US_C.green}08`,borderRadius:6,border:`1px solid ${US_C.green}20`}}>
          <span style={{color:US_C.green,fontWeight:700}}>Kết luận: </span>
          <span style={{color:US_C.text,fontSize:12.5}}><US_HL c={US_C.green}>92-95% nợ Mỹ</US_HL> có rủi ro gây mất thanh khoản từ rất thấp đến gần bằng 0 — chỉ khoảng 5-8% thuộc nhóm quốc gia có thể có mâu thuẫn lợi ích, và quy mô này quá nhỏ để gây khủng hoảng hệ thống.</span>
        </div>
      </US_Card>
      <US_Card style={{marginTop:16}}>
        <US_STitle color={US_C.purple}>Mô Hình "Doanh Nghiệp Nước Mỹ" — Zombie Company Đặc Biệt</US_STitle>
        <US_T>Một cách ví von sắc bén: nếu coi nước Mỹ như một doanh nghiệp, Tổng thống là CEO đứng đầu Ban điều hành, thì bức tranh tài chính như sau (ước tính):</US_T>
        <US_Grid cols={3} gap={12} style={{marginTop:10}}>
          <US_Metric label="Tổng Tài Sản Ước Tính" value="~$200T" sub="Hộ gia đình $150T + tài nguyên $45T" color={US_C.green}/>
          <US_Metric label="Vốn Chủ Sở Hữu" value="~$165.6T" sub="Tài sản trừ nợ $34.4T" color={US_C.blue}/>
          <US_Metric label="Thâm Hụt NS/Năm" value="~$1.7-1.8T" sub="Liên tục từ 1990, chưa dừng" color={US_C.red}/>
        </US_Grid>
        <US_T style={{marginTop:10}}><US_HL c={US_C.purple}>Doanh nghiệp Mỹ là "zombie company" điển hình</US_HL> — sống bằng vay nợ liên tục, chi nhiều hơn thu mỗi năm. Nhưng khác biệt căn bản với mọi zombie company khác trên thế giới: <US_B>Mỹ sở hữu và in ra được chính đồng tiền dự trữ toàn cầu</US_B>. Nợ của "con zombie" này, nhờ vậy, trở thành nợ mà cả thế giới muốn nắm giữ — chứ không phải gánh nặng bị chủ nợ truy đòi như các zombie company hay quốc gia zombie khác (vốn "cắt nợ là tắt thở").</US_T>
        <div style={{marginTop:10,padding:12,background:`${US_C.gold}08`,borderRadius:6,border:`1px solid ${US_C.gold}20`}}>
          <span style={{color:US_C.gold,fontWeight:700}}>Nhận định: </span>
          <span style={{color:US_C.text,fontSize:12.5}}>Với US_B/S vững, vị thế dẫn đầu thương mại-công nghệ-vốn, sức mạnh quân sự số 1 và khả năng in tiền không giới hạn, thị trường coi Mỹ là "con nợ USD tốt nhất thế giới". Rủi ro đáng kể duy nhất không phải là khả năng chi trả mà là <US_HL c={US_C.gold}>rủi ro chính trị</US_HL> — Mỹ chỉ không trả nợ khi không muốn trả, không phải vì không thể trả.</span>
        </div>
      </US_Card>
    </div>
  );
}

function US_TabInequality() {
  return (
    <div>
      <US_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <US_Card>
          <US_STitle>Gini Coefficient So Sánh G7+ (2023)</US_STitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={US_GINI_COMPARE} margin={{top:5,right:10,bottom:5,left:-10}}>
              <XAxis dataKey="c" tick={{fill:US_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:US_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <Tooltip content={<US_TT/>}/>
              <Bar dataKey="v" name="Gini x100" radius={[4,4,0,0]}>
                {US_GINI_COMPARE.map((d,i)=><Cell key={i} fill={d.c==="Mỹ"?US_C.red:US_C.blue}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </US_Card>
        <US_Card>
          <US_STitle color={US_C.orange}>Chi Phí Y Tế / GDP So Sánh (%)</US_STitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={US_HEALTHCARE_COMPARE} margin={{top:5,right:10,bottom:5,left:-10}}>
              <XAxis dataKey="c" tick={{fill:US_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:US_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <Tooltip content={<US_TT/>}/>
              <Bar dataKey="v" name="% GDP" radius={[4,4,0,0]}>
                {US_HEALTHCARE_COMPARE.map((d,i)=><Cell key={i} fill={d.c==="Mỹ"?US_C.red:US_C.orange}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{color:US_C.dim,fontSize:11,marginTop:4}}>Mỹ chi nhiều nhất nhưng outcome y tế (kỳ vọng sống, tử vong sơ sinh) không tương xứng</div>
        </US_Card>
      </US_Grid>
      <US_Card style={{marginBottom:16}}>
        <US_STitle color={US_C.red}>Bất Bình Đẳng — Cấu Trúc Sâu</US_STitle>
        <US_Grid cols={2} gap={16}>
          <div>
            {[
              {l:"1% giàu nhất kiểm soát",v:"~35% tổng tài sản"},
              {l:"50% nghèo nhất kiểm soát",v:"~2.5% tổng tài sản"},
              {l:"Thu nhập trung bình CEO/công nhân",v:"~350:1 (1980: ~40:1)"},
              {l:"Tăng lương thực tế lao động phổ thông",v:"Gần như đình trệ 40 năm"},
            ].map((r,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${US_C.border}25`}}>
                <span style={{color:US_C.text,fontSize:12}}>{r.l}</span>
                <span style={{color:US_C.red,fontSize:12,fontWeight:700,textAlign:"right",marginLeft:8}}>{r.v}</span>
              </div>
            ))}
          </div>
          <div style={{padding:14,background:`${US_C.orange}08`,borderRadius:8,border:`1px solid ${US_C.orange}25`}}>
            <div style={{color:US_C.orange,fontSize:10,fontWeight:700,marginBottom:8}}>NGUYÊN NHÂN CẤU TRÚC:</div>
            <US_T style={{margin:0}}>Toàn cầu hóa + tự động hóa xóa bỏ việc làm chế tạo lương trung bình. Financialization thưởng vốn hơn lao động. Chi phí giáo dục đại học và y tế tăng vượt lạm phát nhiều lần. Chính sách thuế ưu đãi vốn (capital gains) hơn thu nhập lao động.</US_T>
          </div>
        </US_Grid>
      </US_Card>
      <US_Card>
        <US_STitle color={US_C.purple}>Phân Cực Chính Trị — Rủi Ro Thể Chế</US_STitle>
        <US_T>Mức độ phân cực chính trị Mỹ hiện tại được nhiều nhà khoa học chính trị đánh giá là <US_B>cao nhất từ Nội Chiến</US_B>. Hệ quả kinh tế trực tiếp: khó thông qua ngân sách dài hạn, chính sách thay đổi 180 độ theo mỗi kỳ tổng thống (thuế quan, năng lượng, quy định), doanh nghiệp khó lập kế hoạch dài hạn.</US_T>
        <div style={{marginTop:10,padding:12,background:US_C.card2,borderRadius:6}}>
          <div style={{color:US_C.purple,fontSize:11,fontWeight:700,marginBottom:6}}>VÍ DỤ TÁC ĐỘNG KINH TẾ TRỰC TIẾP:</div>
          <div style={{color:US_C.text,fontSize:12,lineHeight:1.7}}>
            • Chính sách thuế quan thay đổi mạnh giữa các chính quyền → doanh nghiệp khó lập kế hoạch supply chain dài hạn<br/>
            • Chính sách năng lượng đảo ngược (IRA vs cắt giảm) → bất định đầu tư năng lượng sạch<br/>
            • Shutdown chính phủ lặp lại → gián đoạn dịch vụ công, đánh giá tín nhiệm quốc gia
          </div>
        </div>
      </US_Card>
    </div>
  );
}

function US_TabTech() {
  return (
    <div>
      <US_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <US_Card>
          <US_STitle>Cơ Cấu GDP Theo Ngành (%)</US_STitle>
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie data={US_SECTOR_GDP} cx="50%" cy="50%" innerRadius={50} outerRadius={85}
                dataKey="v" nameKey="s" paddingAngle={2}>
                {US_SECTOR_GDP.map((_,i)=><Cell key={i} fill={US_PIE_COLORS[i]}/>)}
              </Pie>
              <Tooltip formatter={(v,n)=>[`${v}%`,n]}/>
              <Legend wrapperStyle={{color:US_C.text,fontSize:11}}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{color:US_C.dim,fontSize:11,textAlign:"center",marginTop:-4}}>Dịch vụ 77% — phản ánh "hậu công nghiệp hóa" từ 1980s</div>
        </US_Card>
        <US_Card>
          <US_STitle color={US_C.navy}>Thống Trị Công Nghệ Toàn Cầu</US_STitle>
          {[
            {s:"AI Foundation Models",r:"Thống trị",c:US_C.green,d:"OpenAI, Google DeepMind, Anthropic, Meta — dẫn đầu tuyệt đối"},
            {s:"Bán Dẫn Thiết Kế",r:"Thống trị",c:US_C.green,d:"Nvidia, AMD, Qualcomm — nhưng sản xuất phụ thuộc TSMC Đài Loan"},
            {s:"Phần Mềm Doanh Nghiệp/Cloud",r:"Thống trị",c:US_C.green,d:"AWS, Azure, Google Cloud kiểm soát ~65% thị trường cloud toàn cầu"},
            {s:"Dược Phẩm Sinh Học",r:"Dẫn đầu",c:US_C.blue,d:"Pfizer, Moderna, Merck — R&D dược lớn nhất thế giới"},
            {s:"Sản Xuất Chip Tiên Tiến",r:"Phụ thuộc",c:US_C.orange,d:"TSMC Đài Loan sản xuất ~90% chip <5nm — rủi ro địa chính trị lớn"},
            {s:"EV & Pin",r:"Tụt hậu",c:US_C.red,d:"Tesla mạnh nhưng BYD/CATL Trung Quốc vượt về quy mô & chi phí"},
          ].map((item,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",
              padding:"6px 0",borderBottom:`1px solid ${US_C.border}25`}}>
              <div>
                <div style={{color:US_C.bright,fontSize:12,fontWeight:600}}>{item.s}</div>
                <div style={{color:US_C.dim,fontSize:11}}>{item.d}</div>
              </div>
              <span style={{color:item.c,fontSize:11,fontWeight:700,whiteSpace:"nowrap",marginLeft:8}}>{item.r}</span>
            </div>
          ))}
        </US_Card>
      </US_Grid>
      <US_Card style={{marginBottom:16}}>
        <US_STitle color={US_C.gold}>Hệ Sinh Thái Đổi Mới — Lợi Thế Khó Sao Chép</US_STitle>
        <US_T>Sự kết hợp <US_B>đại học nghiên cứu hàng đầu</US_B> (MIT, Stanford, Harvard, Berkeley) + <US_B>thị trường vốn rủi ro sâu nhất thế giới</US_B> + <US_B>văn hóa chấp nhận thất bại kinh doanh</US_B> tạo ra combo mà không quốc gia nào sao chép được nhanh, kể cả Trung Quốc với nguồn lực nhà nước khổng lồ.</US_T>
        <US_Grid cols={3} gap={12} style={{marginTop:10}}>
          {[
            {t:"Đại Học Nghiên Cứu",d:"Top 20 đại học thế giới: Mỹ chiếm 15+. Hút nhân tài toàn cầu qua hệ thống visa/học bổng."},
            {t:"Venture Capital",d:"~$170B/năm đầu tư VC — nhiều hơn tất cả khu vực khác cộng lại. Silicon Valley là trung tâm không đối thủ."},
            {t:"Văn Hóa Chấp Nhận Thất Bại",d:"Phá sản kinh doanh không mang tính kỳ thị xã hội nặng như nhiều nước — khuyến khích rủi ro và tái khởi nghiệp."},
          ].map((item,i)=>(
            <div key={i} style={{padding:12,background:US_C.card2,borderRadius:6,border:`1px solid ${US_C.border}`}}>
              <div style={{color:US_C.gold,fontSize:11,fontWeight:700,marginBottom:6}}>{item.t}</div>
              <div style={{color:US_C.text,fontSize:12,lineHeight:1.6}}>{item.d}</div>
            </div>
          ))}
        </US_Grid>
      </US_Card>
      <US_Card>
        <US_STitle color={US_C.red}>Điểm Yếu — Phụ Thuộc TSMC & Rủi Ro Đài Loan</US_STitle>
        <US_T>Nghịch lý lớn nhất của sức mạnh công nghệ Mỹ: <US_B>thiết kế chip tiên tiến nhất thế giới nhưng không tự sản xuất được</US_B>. TSMC Đài Loan sản xuất ~90% chip dưới 5nm toàn cầu — bao gồm chip cho Apple, Nvidia, AMD.</US_T>
        <div style={{padding:12,background:`${US_C.red}08`,borderRadius:6,border:`1px solid ${US_C.red}20`,marginTop:8}}>
          <span style={{color:US_C.red,fontWeight:700}}>CHIPS Act (2022): </span>
          <span style={{color:US_C.text,fontSize:12.5}}>$52.7 tỷ trợ cấp xây nhà máy chip nội địa (TSMC Arizona, Intel, Samsung Texas). Nhưng xây ecosystem bán dẫn tiên tiến cần nhiều năm — Mỹ vẫn phụ thuộc TSMC trong trung hạn, tạo ra cùng loại rủi ro địa chính trị mà Trung Quốc đang gặp phải với chip.</span>
        </div>
      </US_Card>
    </div>
  );
}

function US_TabRisks() {
  return (
    <div>
      <US_Card style={{marginBottom:16}}>
        <US_STitle color={US_C.gold}>So Sánh Nhanh: Mỹ vs Trung Quốc — Hai Mô Hình Đối Lập</US_STitle>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr>
                {["Chiều","Mỹ","Trung Quốc"].map((h,i)=>(
                  <th key={i} style={{color:US_C.gold,fontSize:10,fontWeight:700,padding:"8px 10px",
                    textAlign:"left",borderBottom:`1px solid ${US_C.border}`,letterSpacing:"0.05em",background:US_C.card2}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {d:"Động lực tăng trưởng",us:"Tiêu dùng nội địa (68% GDP) + đổi mới",cn:"Đầu tư + xuất khẩu (37% tiêu dùng)"},
                {d:"Nợ/GDP",us:"~122% — nhưng vay bằng tiền tệ dự trữ",cn:"~310% tổng thể — nhiều nợ ẩn"},
                {d:"Nhân khẩu",us:"Ổn định hơn nhờ nhập cư",cn:"Khủng hoảng sâu, dân số giảm"},
                {d:"Hệ thống chính trị",us:"Dân chủ — phân cực nhưng có tự sửa",cn:"Tập trung — quyết nhanh, khó sửa sai"},
                {d:"Công nghệ",us:"Dẫn đầu AI, thiết kế chip, thiếu SX chip",cn:"Mạnh ứng dụng, EV, pin; yếu chip lõi"},
              ].map((r,i)=>(
                <tr key={i} style={{background:i%2===0?US_C.card:US_C.card2}}>
                  <td style={{color:US_C.bright,fontWeight:700,padding:"9px 10px",fontSize:12,borderBottom:`1px solid ${US_C.border}20`}}>{r.d}</td>
                  <td style={{color:US_C.blue,padding:"9px 10px",fontSize:12,borderBottom:`1px solid ${US_C.border}20`,lineHeight:1.5}}>{r.us}</td>
                  <td style={{color:US_C.red,padding:"9px 10px",fontSize:12,borderBottom:`1px solid ${US_C.border}20`,lineHeight:1.5}}>{r.cn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </US_Card>
      <US_Grid cols={3} gap={12} style={{marginBottom:16}}>
        {[
          {n:"Kịch Bản 1",t:"Soft Landing Kéo Dài",p:"40–45%",c:US_C.green,
            ck:["Fed hạ lãi suất từ từ, có kiểm soát","Lạm phát ổn định quanh 2%","Tăng trưởng bền vững 2-2.5%/năm","Đô la giữ vững vị thế dự trữ"]},
          {n:"Kịch Bản 2 — CƠ SỞ",t:"Muddle Through",p:"35–40%",c:US_C.gold,
            ck:["Chính trị bế tắc lặp lại theo chu kỳ","Nợ tiếp tục phình to nhưng chưa khủng hoảng","Bất bình đẳng gia tăng dần","Đổi mới công nghệ vẫn dẫn đầu toàn cầu"]},
          {n:"Kịch Bản 3",t:"Fiscal / Dollar Crisis",p:"15–20%",c:US_C.red,
            ck:["Niềm tin đô la suy giảm mạnh và nhanh","Lãi suất trái phiếu tăng vọt đột ngột","Buộc điều chỉnh tài khóa đau đớn","Rủi ro thấp trong ngắn-trung hạn nhưng không bằng 0"]},
        ].map((s,i)=>(
          <div key={i} style={{background:US_C.card,border:`1px solid ${US_C.border}`,borderRadius:8,
            padding:16,borderTop:`3px solid ${s.c}`}}>
            <div style={{color:US_C.muted,fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase"}}>{s.n}</div>
            <div style={{color:s.c,fontSize:13,fontWeight:700,margin:"4px 0"}}>{s.t}</div>
            <div style={{color:s.c,fontSize:20,fontWeight:700,fontFamily:"monospace",marginBottom:10}}>{s.p}</div>
            {s.ck.map((c,j)=><div key={j} style={{color:US_C.text,fontSize:11,marginBottom:4}}>• {c}</div>)}
          </div>
        ))}
      </US_Grid>
      <US_Card>
        <US_STitle color={US_C.teal}>Ma Trận Đánh Giá Tổng Thể</US_STitle>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr>
                {["Chiều","Điểm Mạnh","Điểm Yếu","Rủi Ro"].map((h,i)=>(
                  <th key={i} style={{color:US_C.gold,fontSize:10,fontWeight:700,padding:"8px 10px",
                    textAlign:"left",borderBottom:`1px solid ${US_C.border}`,letterSpacing:"0.05em",background:US_C.card2}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {d:"Tài Khóa",s:"Vay bằng tiền tệ dự trữ, thị trường sâu",w:"Nợ $35T+, chi lãi vượt quốc phòng",r:"Cao"},
                {d:"Chính Trị",s:"Thể chế dân chủ, tự sửa lỗi dài hạn",w:"Phân cực cao nhất từ Nội Chiến",r:"Cao"},
                {d:"Công Nghệ",s:"Dẫn đầu AI, thiết kế chip, VC",w:"Phụ thuộc TSMC sản xuất chip",r:"Trung Bình"},
                {d:"Xã Hội",s:"Nhập cư bù đắp nhân khẩu",w:"Bất bình đẳng cao nhất G7",r:"Trung Bình"},
                {d:"Y Tế",s:"Đổi mới dược phẩm hàng đầu",w:"Chi phí cao nhất, outcome không tương xứng",r:"Trung Bình"},
                {d:"Địa Chính Trị",s:"Đồng minh mạng lưới toàn cầu",w:"Đối đầu kéo dài với Trung Quốc",r:"Trung Bình"},
              ].map((r,i)=>(
                <tr key={i} style={{background:i%2===0?US_C.card:US_C.card2}}>
                  <td style={{color:US_C.bright,fontWeight:700,padding:"9px 10px",fontSize:12,borderBottom:`1px solid ${US_C.border}20`}}>{r.d}</td>
                  <td style={{color:US_C.green,padding:"9px 10px",fontSize:12,borderBottom:`1px solid ${US_C.border}20`,lineHeight:1.5}}>{r.s}</td>
                  <td style={{color:US_C.text,padding:"9px 10px",fontSize:12,borderBottom:`1px solid ${US_C.border}20`,lineHeight:1.5}}>{r.w}</td>
                  <td style={{padding:"9px 10px",borderBottom:`1px solid ${US_C.border}20`}}><US_Badge level={r.r}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{marginTop:16,padding:16,background:`${US_C.gold}08`,borderRadius:8,border:`1px solid ${US_C.gold}25`}}>
          <div style={{color:US_C.gold,fontSize:11,fontWeight:700,marginBottom:8}}>KẾT LUẬN:</div>
          <div style={{color:US_C.text,fontSize:13.5,lineHeight:1.85}}>
            Mỹ giữ vị thế siêu cường kinh tế-công nghệ số 1 thế giới nhờ <US_HL c={US_C.navy}>đặc quyền đồng đô la</US_HL>, <US_HL c={US_C.gold}>thị trường vốn sâu nhất</US_HL>, và <US_HL c={US_C.blue}>hệ sinh thái đổi mới không đối thủ</US_HL>. Nhưng đang tích lũy rủi ro cấu trúc dài hạn: <US_HL c={US_C.red}>nợ liên bang phình to</US_HL>, <US_HL c={US_C.purple}>phân cực chính trị</US_HL> làm suy yếu năng lực hoạch định chính sách, và <US_HL c={US_C.orange}>bất bình đẳng</US_HL> ngày càng sâu. Khác Trung Quốc, Mỹ có cơ chế dân chủ tự sửa lỗi — nhưng cơ chế đó đang bị thử thách nghiêm trọng bởi chính sự phân cực nội tại.
          </div>
        </div>
      </US_Card>
    </div>
  );
}

function US_TabExpert() {
  return (
    <div>
      <div style={{marginBottom:20,padding:"16px 20px",background:US_C.panel,borderRadius:8,
        border:`1px solid ${US_C.border}`,borderLeft:`4px solid ${US_C.gold}`}}>
        <div style={{color:US_C.gold,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>GÓC CHUYÊN GIA — TỔNG HỢP QUAN ĐIỂM VỀ MỸ/FED/USD</div>
        <p style={{color:US_C.bright,fontSize:14,lineHeight:1.75,margin:0}}>
          Tổng hợp các quan điểm liên quan trực tiếp đến Mỹ, Fed và đồng USD từ nhiều bài phân tích vĩ mô (2021–2025) của cùng một tác giả.
          Đây là những phần <US_HL>đặc thù cho Mỹ</US_HL> — không áp dụng máy móc các bài phân tích chung cho cả ba nước.
        </p>
        <div style={{color:US_C.dim,fontSize:11,marginTop:8,fontStyle:"italic"}}>
          * Tóm tắt quan điểm cá nhân của tác giả các bài viết, trình bày để đối chiếu góc nhìn — không phải nhận định của phân tích chính trong các tab khác.
        </div>
      </div>

      <US_Card style={{marginBottom:16}}>
        <US_STitle>"Easy Money Time" (04/2021) — Ba Đặc Thù Của Kỷ Nguyên Tiền Tệ Dễ Dãi</US_STitle>
        <US_T>Luận điểm trung tâm: từ đầu 1980s, các NHTW lớn (đặc biệt Fed) duy trì một <US_B>"Bình thường mới"</US_B> gồm ba đặc thù song hành, không phải hiện tượng ngắn hạn:</US_T>
        <US_Grid cols={3} gap={12} style={{marginTop:10}}>
          {[
            {n:"01",t:"Lãi Suất Thấp",c:US_C.blue,d:"Xu thế kéo dài từ 1980s — ngoại trừ vài giai đoạn ngắn thắt chặt chống lạm phát rồi lại lao dốc tiếp."},
            {n:"02",t:"Tiền Bơm Ào Ạt",c:US_C.orange,d:"Sau 2008, Fed phát hành gần như không kiểm soát vì lạm phát không xuất hiện. Tài sản Fed tăng ~10 lần trong 10 năm, gấp đôi riêng năm 2020."},
            {n:"03",t:"Vòng Quay Vốn Chậm",c:US_C.purple,d:"Velocity M1/M2 giảm liên tục từ đỉnh 1997-98 — đặc biệt sụp đổ sau 2008 và COVID-19."},
          ].map(s=>(
            <div key={s.n} style={{background:US_C.card2,border:`1px solid ${s.c}30`,borderRadius:8,
              padding:14,borderTop:`3px solid ${s.c}`}}>
              <div style={{color:s.c,fontSize:20,fontWeight:700,fontFamily:"monospace"}}>{s.n}</div>
              <div style={{color:US_C.bright,fontSize:13,fontWeight:700,margin:"4px 0"}}>{s.t}</div>
              <div style={{color:US_C.text,fontSize:12,lineHeight:1.6}}>{s.d}</div>
            </div>
          ))}
        </US_Grid>
        <US_T style={{marginTop:10}}><US_HL c={US_C.orange}>Vì sao bơm tiền dữ dội mà chưa lạm phát (giai đoạn 2021):</US_HL> (1) hệ số nhân tiền M1 sụp đổ do NHTM bị Basel 2-3 trói buộc, ngại mở rộng tín dụng vì sợ giảm ROE; (2) NHTM né khách hàng rủi ro (dân nghèo, DN nhỏ) → khoảng cách giàu nghèo giãn; (3) velocity giảm sâu nên tích số (M2 × velocity) chưa vượt ngưỡng gây lạm phát.</US_T>
      </US_Card>

      <US_Card style={{marginBottom:16}}>
        <US_STitle color={US_C.gold}>Dự Báo & Xác Nhận Của Chính Tác Giả Qua Các Bài Viết Sau</US_STitle>
        <US_Grid cols={2} gap={16}>
          <div>
            <div style={{color:US_C.gold,fontSize:10,fontWeight:700,marginBottom:8,letterSpacing:"0.06em"}}>DỰ BÁO GỐC (04/2021):</div>
            {[
              "Kỷ nguyên còn kéo dài: ngắn 2-3 năm, dài 7-10 năm",
              "2029-2030 sẽ có trật tự tiền tệ mới ('dự mò')",
              "Kịch bản gần nhất: vaccine → niềm tin quay lại → tiêu dùng bùng → velocity tăng đột ngột → lạm phát",
            ].map((s,i)=>(
              <div key={i} style={{display:"flex",gap:8,marginBottom:7}}>
                <span style={{color:US_C.gold}}>▸</span>
                <span style={{color:US_C.text,fontSize:12,lineHeight:1.55}}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{padding:14,background:`${US_C.blue}08`,borderRadius:8,border:`1px solid ${US_C.blue}25`}}>
            <div style={{color:US_C.blue,fontSize:10,fontWeight:700,marginBottom:8}}>TÁC GIẢ TỰ ĐỐI CHIẾU QUA CÁC BÀI SAU:</div>
            <US_T style={{margin:"0 0 8px 0"}}>Lạm phát Mỹ đúng như dự báo: 6.2% (10/2021, cao nhất 30 năm), đỉnh 9.1% (2022). Nhưng khi Fed tăng lãi suất mạnh, tác giả <US_B>nhiều lần khẳng định đây KHÔNG phải kết thúc kỷ nguyên</US_B>.</US_T>
            <div style={{padding:10,background:US_C.card2,borderRadius:6,marginTop:6}}>
              <div style={{color:US_C.dim,fontSize:10,fontStyle:"italic",marginBottom:4}}>11/2021, 05/2022 & 07/2022 — nhắc lại nhất quán:</div>
              <div style={{color:US_C.text,fontSize:12,lineHeight:1.6}}>"Thời đại tiền tệ dễ dãi đã kết thúc? Chưa đâu. Các biện pháp thắt chặt chỉ là thời điểm và chiến thuật."</div>
            </div>
          </div>
        </US_Grid>
      </US_Card>

      <US_Card style={{marginBottom:16}}>
        <US_STitle color={US_C.crimson||US_C.red}>Lịch Sử Chu Kỳ Fed — Ẩn Dụ "Kháng Sinh Trị Nhiễm Khuẩn"</US_STitle>
        <US_T>Từ bài "Tản Mạn T3" (04/2023): tác giả ví lạm phát như nhiễm khuẩn gây sốt — <US_B>tăng lãi suất là kháng sinh duy nhất</US_B>, chỉ khác nhau về liều lượng; nhưng kháng sinh liều cao luôn gây "loét dạ dày" (khủng hoảng ngân hàng) với độ trễ khoảng 1 nhịp.</US_T>
        <US_TL events={[
          {year:"Đầu 80s",title:"Lãi suất Fed Funds đẩy lên >19%",color:US_C.red,desc:"Lạm phát phi mã 15% bị dập tắt — cái giá: cuối 80s-đầu 90s hơn 500 ngân hàng phá sản"},
          {year:"2007-08",title:"Lãi suất đẩy lên 6% chống lạm phát",color:US_C.orange,desc:"Thắt chặt làm lộ diện Subprime Mortgage độc hại → kích hoạt GFC 2008. 25 ngân hàng sập ngay 2008 (tổng TS $374B), thêm 389 ngân hàng sập 2009-2011 ($303B)"},
          {year:"2022-23",title:"Lãi suất tăng nhanh nhất kể từ Volcker",color:US_C.gold,desc:"Chống lạm phát đỉnh 9.1% → kích hoạt SVB, Silvergate, Signature sập (gần $330B tài sản), Credit Suisse gần theo"},
        ]}/>
        <US_T style={{marginTop:8}}><US_HL c={US_C.gold}>Nghịch lý 2023 chưa từng có:</US_HL> Fed lần đầu phải "vừa chống lạm phát vừa cứu thanh khoản ngân hàng cùng lúc" — tác giả gọi là chính sách <US_B>"Thắt lưng nới bụng"</US_B>: tăng lãi suất mạnh nhưng rút tiền lưu thông chậm, thỉnh thoảng bơm ngược cứu trợ (chỉ 2 tuần cuối 3/2023 đã bơm gần $409 tỷ).</US_T>
      </US_Card>

      <US_Card style={{marginBottom:16}}>
        <US_STitle color={US_C.purple}>Khung Phương Pháp Luận Dự Báo — Vì Sao Đa Số Chuyên Gia Sai</US_STitle>
        <US_T>Từ bài "Lạm Phát, Dự Báo, Đầu Tư" (11/2021): một khung tư duy về bản chất của dự báo kinh tế đáng chú ý — dự báo hành vi con người có tính <US_B>tự triệt tiêu</US_B> (self-defeating) khi công chúng biết và hành động theo nó.</US_T>
        <div style={{padding:12,background:`${US_C.purple}08`,borderRadius:6,border:`1px solid ${US_C.purple}20`,marginTop:8}}>
          <span style={{color:US_C.purple,fontWeight:700}}>Thống kê IMF được trích dẫn: </span>
          <span style={{color:US_C.text,fontSize:12.5}}>Ngay cả các chuyên gia kinh tế hàng đầu thế giới chỉ dự đoán đúng một cuộc suy thoái 1 năm trước khi nó xảy ra <US_HL c={US_C.purple}>5/153 lần — tức 3.3%</US_HL>.</span>
        </div>
        <US_T style={{marginTop:8}}>6 nguyên tắc ẩn dụ "lái xe" cho việc dùng dự báo: không dự báo = lái xe ban đêm không đèn; chỉ nhìn quá khứ = chỉ nhìn gương chiếu hậu; không nghe dự báo người khác = không nhìn biển báo; nghe mà không "tiêu hóa" thành riêng = nhìn biển báo mà không nhìn đường; dự báo không cập nhật = dùng bản đồ 100 năm trước; dự báo mà không hành động = lái xe nhắm mắt.</US_T>
      </US_Card>

      <US_Card>
        <US_STitle color={US_C.orange}>Dự Báo Suy Thoái 2022 Từ Các Ngân Hàng Đầu Tư Lớn</US_STitle>
        <US_T>Từ bài "Bóng Ma Suy Thoái Lởn Vởn" (07/2022) — ghi nhận sự phân hóa dự báo giữa các định chế tài chính hàng đầu về thời điểm suy thoái Mỹ sau cú đòn kép Covid + lạm phát:</US_T>
        <US_Grid cols={2} gap={10} style={{marginTop:10}}>
          <div style={{padding:12,background:US_C.card2,borderRadius:6}}>
            <div style={{color:US_C.orange,fontSize:10,fontWeight:700,marginBottom:6}}>DỰ BÁO SUY THOÁI TRONG 2022</div>
            <div style={{color:US_C.text,fontSize:12,lineHeight:1.7}}>Bank of America, Wells Fargo, Nomura</div>
          </div>
          <div style={{padding:12,background:US_C.card2,borderRadius:6}}>
            <div style={{color:US_C.blue,fontSize:10,fontWeight:700,marginBottom:6}}>DỰ BÁO GIỮA NĂM 2023</div>
            <div style={{color:US_C.text,fontSize:12,lineHeight:1.7}}>Deutsche Bank</div>
          </div>
        </US_Grid>
        <US_T style={{marginTop:8}}>Thực tế: Mỹ tránh được suy thoái kỹ thuật (2 quý liên tiếp GDP âm) trong giai đoạn này — một ví dụ khác cho luận điểm chung của tác giả rằng ngay cả các tổ chức tài chính lớn nhất cũng thường xuyên dự báo sai về thời điểm suy thoái.</US_T>
      </US_Card>
    </div>
  );
}

const US_TABS = [
  {id:0,label:"Dashboard",icon:"📊"},
  {id:1,label:"Mô Hình & Đô La",icon:"💵"},
  {id:2,label:"Ngân Hàng & Fed",icon:"🏦"},
  {id:3,label:"Nợ Công",icon:"💸"},
  {id:4,label:"Bất Bình Đẳng",icon:"⚖️"},
  {id:5,label:"Công Nghệ",icon:"💻"},
  {id:6,label:"Rủi Ro & Kịch Bản",icon:"⚠️"},
  {id:7,label:"Góc Chuyên Gia",icon:"🎓"},
];
const US_CONTENT = [
  <US_TabDashboard/>,<US_TabModel/>,<US_TabBanking/>,<US_TabDebt/>,<US_TabInequality/>,<US_TabTech/>,<US_TabRisks/>,<US_TabExpert/>,
];

/* ==================== NGA (RU) ==================== */
const RU_C = {
  bg:"#FAF7F6", panel:"#FFFFFF", card:"#FFFFFF", card2:"#FBF2F1",
  border:"#EDE0DE", text:"#6B5A58", bright:"#211615", dim:"#9C8886",
  muted:"#7D6664", crimson:"#A83636", gold:"#A0791E", green:"#288A5A",
  blue:"#3A70B0", purple:"#6E52AE", orange:"#B86A2E", steel:"#4C6478",
};

const RU_GDP_DATA = [
  {y:"2018",g:2.8},{y:"2019",g:2.0},{y:"2020",g:-2.7},{y:"2021",g:5.6},
  {y:"2022",g:-2.1},{y:"2023",g:3.6},{y:"2024",g:3.9},
];
const RU_OIL_REVENUE = [
  {y:"2019",v:39},{y:"2020",v:28},{y:"2021",v:36},{y:"2022",v:42},
  {y:"2023",v:30},{y:"2024",v:31},
];
const RU_RESERVE_DATA = [
  {y:"2014",v:385},{y:"2018",v:460},{y:"2021",v:630},{y:"2/22",v:640},
  {y:"3/22",v:300},{y:"2023",v:580},{y:"2024",v:610},
];
const RU_KEY_RATE = [
  {m:"1/22",r:8.5},{m:"2/22",r:20},{m:"6/22",r:9.5},{m:"7/23",r:8.5},
  {m:"12/23",r:16},{m:"7/24",r:18},{m:"10/24",r:21},
];
const RU_TRADE_PARTNER = [
  {n:"Trung Quốc",v:34},{n:"EU (giảm mạnh)",v:12},{n:"Ấn Độ",v:11},
  {n:"Thổ Nhĩ Kỳ",v:9},{n:"Belarus/CIS",v:14},{n:"Khác",v:20},
];
const RU_RISK_RADAR = [
  {s:"Cấm Vận",v:78},{s:"Brain Drain",v:72},{s:"Phụ Thuộc TQ",v:80},
  {s:"Lạm Phát",v:70},{s:"Ngân Sách QP",v:75},{s:"Công Nghệ",v:82},
  {s:"Dân Số/LĐ",v:68},{s:"Tài Nguyên",v:55},
];
const RU_MIGRATION = [
  {y:"2022",v:550},{y:"2023",v:280},{y:"2024",v:170},
];
const RU_PIE_COLORS=[RU_C.crimson,RU_C.steel,RU_C.gold,RU_C.orange,RU_C.purple,RU_C.dim];

const RU_TT = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  return (
    <div style={{background:RU_C.panel,border:`1px solid ${RU_C.border}`,borderRadius:6,padding:"8px 12px"}}>
      <div style={{color:RU_C.gold,fontSize:11,fontWeight:700,marginBottom:4}}>{label}</div>
      {payload.map((p,i)=>(
        <div key={i} style={{color:p.color||RU_C.bright,fontSize:12}}>
          {p.name}: <span style={{fontFamily:"monospace",fontWeight:700}}>{typeof p.value==="number"?p.value.toFixed(1):p.value}</span>
        </div>
      ))}
    </div>
  );
};
const RU_Card = ({children,style={}}) => (
  <div style={{background:RU_C.card,border:`1px solid ${RU_C.border}`,borderRadius:8,padding:20,...style}}>{children}</div>
);
const RU_STitle = ({children,color=RU_C.gold}) => (
  <div style={{color,fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",
    marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
    <div style={{width:14,height:2,background:color,borderRadius:1,flexShrink:0}}/>{children}
  </div>
);
const RU_T = ({children,style}) => <p style={{color:RU_C.text,fontSize:13.5,lineHeight:1.75,margin:"5px 0",...style}}>{children}</p>;
const RU_B = ({children}) => <span style={{color:RU_C.bright,fontWeight:600}}>{children}</span>;
const RU_HL = ({children,c=RU_C.gold}) => <span style={{color:c,fontWeight:600}}>{children}</span>;
const RU_Metric = ({label,value,sub,color=RU_C.blue,warn}) => (
  <div style={{background:RU_C.card,border:`1px solid ${RU_C.border}`,borderRadius:8,
    padding:"14px 16px",borderTop:`3px solid ${color}`}}>
    <div style={{color:RU_C.muted,fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>{label}</div>
    <div style={{color,fontSize:22,fontWeight:700,fontFamily:"monospace",letterSpacing:"-0.02em"}}>{value}</div>
    {sub&&<div style={{color:RU_C.dim,fontSize:11,marginTop:3}}>{sub}</div>}
    {warn&&<div style={{color:RU_C.crimson,fontSize:10,marginTop:2,fontWeight:700}}>{warn}</div>}
  </div>
);
const RU_Badge = ({level}) => {
  const m={"Rất Cao":"#B8222C",Cao:RU_C.crimson,"Trung Bình":RU_C.gold,Thấp:RU_C.green};
  const c=m[level]||RU_C.gold;
  return <span style={{background:c+"20",color:c,border:`1px solid ${c}40`,
    borderRadius:4,padding:"2px 8px",fontSize:10,fontWeight:700}}>{level}</span>;
};
const RU_Grid = ({cols=2,gap=16,children,style}) => (
  <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap,...style}}>{children}</div>
);
const RU_TL = ({events}) => (
  <div style={{position:"relative",paddingLeft:22}}>
    <div style={{position:"absolute",left:7,top:4,bottom:4,width:1.5,background:RU_C.border}}/>
    {events.map((e,i)=>(
      <div key={i} style={{marginBottom:14,position:"relative"}}>
        <div style={{position:"absolute",left:-18,top:4,width:9,height:9,borderRadius:"50%",
          background:e.color||RU_C.gold,boxShadow:`0 0 6px ${e.color||RU_C.gold}60`}}/>
        <div style={{color:e.color||RU_C.gold,fontSize:10,fontWeight:700,letterSpacing:"0.06em"}}>{e.year}</div>
        <div style={{color:RU_C.bright,fontSize:13,fontWeight:600,marginTop:1}}>{e.title}</div>
        <div style={{color:RU_C.text,fontSize:12,lineHeight:1.6,marginTop:2}}>{e.desc}</div>
      </div>
    ))}
  </div>
);

function RU_TabDashboard() {
  return (
    <div>
      <div style={{marginBottom:20,padding:"16px 20px",background:RU_C.panel,borderRadius:8,
        border:`1px solid ${RU_C.border}`,borderLeft:`4px solid ${RU_C.crimson}`}}>
        <div style={{color:RU_C.crimson,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>LUẬN ĐIỂM CỐT LÕI</div>
        <p style={{color:RU_C.bright,fontSize:14,lineHeight:1.75,margin:0}}>
          Nga đã chứng minh khả năng <RU_HL c={RU_C.green}>chống chịu ngắn hạn</RU_HL> trước gói cấm vận lớn nhất lịch sử áp lên
          một nền kinh tế lớn — nhờ chiến lược "Fortress Economy" xây từ 2014 và chuyển hướng thương mại sang Trung Quốc-Ấn Độ.
          Nhưng đây là khả năng chống chịu <RU_HL c={RU_C.crimson}>đánh đổi bằng cấu trúc dài hạn</RU_HL>: kinh tế chiến tranh phi sản xuất,
          brain drain chưa có tiền lệ, và phụ thuộc bất đối xứng vào Trung Quốc ngày càng sâu.
        </p>
      </div>
      <RU_Grid cols={3} gap={12} style={{marginBottom:16}}>
        <RU_Metric label="Tăng Trưởng GDP 2024" value="3.9%" sub="Chủ yếu từ chi tiêu quốc phòng" color={RU_C.orange} warn="Tăng trưởng phi sản xuất"/>
        <RU_Metric label="Lãi Suất CBR" value="21%" sub="Cao nhất kể từ đầu 2000s" color={RU_C.crimson}/>
        <RU_Metric label="Dầu Khí / Ngân Sách" value="~30-35%" sub="Vẫn phụ thuộc tài nguyên nặng" color={RU_C.gold}/>
        <RU_Metric label="Chi Quốc Phòng/NS" value="~40%" sub="Mức chưa từng thấy từ Xô Viết" color={RU_C.crimson} warn="~7-8% GDP"/>
        <RU_Metric label="Di Cư Từ 2022" value="800K-1M" sub="Chủ yếu trẻ, có học vấn cao" color={RU_C.purple}/>
        <RU_Metric label="Dự Trữ Bị Đóng Băng" value="~$300B" sub="Tại các nước phương Tây" color={RU_C.steel}/>
      </RU_Grid>
      <RU_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <RU_Card>
          <RU_STitle>Tăng Trưởng GDP 2018–2024 (%)</RU_STitle>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={RU_GDP_DATA} margin={{top:5,right:10,bottom:5,left:-20}}>
              <defs>
                <linearGradient id="gG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={RU_C.orange} stopOpacity={0.35}/>
                  <stop offset="95%" stopColor={RU_C.orange} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="y" tick={{fill:RU_C.dim,fontSize:10}} axisLine={{stroke:RU_C.border}} tickLine={false}/>
              <YAxis tick={{fill:RU_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <Tooltip content={<RU_TT/>}/>
              <Area type="monotone" dataKey="g" stroke={RU_C.orange} fill="url(#gG)" strokeWidth={2} name="GDP %"/>
            </AreaChart>
          </ResponsiveContainer>
          <div style={{color:RU_C.dim,fontSize:11,marginTop:4}}>Giảm chỉ -2.1% năm 2022 — thấp hơn nhiều dự báo phương Tây (-10% đến -15%)</div>
        </RU_Card>
        <RU_Card>
          <RU_STitle>Radar Rủi Ro Cấu Trúc (0–100)</RU_STitle>
          <ResponsiveContainer width="100%" height={210}>
            <RadarChart data={RU_RISK_RADAR} margin={{top:5,right:25,bottom:5,left:25}}>
              <PolarGrid stroke={RU_C.border}/>
              <PolarAngleAxis dataKey="s" tick={{fill:RU_C.dim,fontSize:9}}/>
              <PolarRadiusAxis angle={90} domain={[0,100]} tick={{fill:RU_C.dim,fontSize:8}}/>
              <Radar dataKey="v" stroke={RU_C.crimson} fill={RU_C.crimson} fillOpacity={0.22} strokeWidth={1.5} name="Rủi Ro"/>
            </RadarChart>
          </ResponsiveContainer>
        </RU_Card>
      </RU_Grid>
      <RU_Card style={{marginBottom:16}}>
        <RU_STitle color={RU_C.steel}>Dự Trữ Ngoại Hối & Vàng (Tỷ USD) — Sốc 2022</RU_STitle>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={RU_RESERVE_DATA} margin={{top:5,right:10,bottom:5,left:-10}}>
            <defs>
              <linearGradient id="rG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={RU_C.steel} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={RU_C.steel} stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="y" tick={{fill:RU_C.dim,fontSize:10}} axisLine={{stroke:RU_C.border}} tickLine={false}/>
            <YAxis tick={{fill:RU_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip content={<RU_TT/>}/>
            <Area type="monotone" dataKey="v" stroke={RU_C.steel} fill="url(#rG)" strokeWidth={2} name="Dự trữ ($RU_B)"/>
          </AreaChart>
        </ResponsiveContainer>
        <div style={{color:RU_C.dim,fontSize:11,marginTop:4}}>~$300B bị đóng băng ngay sau 2/2022 — ~47% tổng dự trữ tại thời điểm đó</div>
      </RU_Card>
      <RU_Grid cols={3} gap={12}>
        {[
          {n:"Kịch Bản 1",t:"Chiến Tranh Kéo Dài + Ổn Định",p:"40–45%",c:RU_C.gold,
            d:"Xung đột kéo dài ở mức thấp, kinh tế chiến tranh tiếp tục nhưng không sụp đổ. Chuyển hướng TQ-Ấn Độ đủ để duy trì. Lạm phát và lãi suất cao kéo dài."},
          {n:"Kịch Bản 2",t:"Hòa Bình + Tái Cấu Trúc",p:"25–30%",c:RU_C.green,
            d:"Ngừng bắn/hòa bình cho phép giảm chi quốc phòng, nhưng đối mặt 'hangover' kinh tế chiến tranh: thất nghiệp tăng, cần tái cơ cấu công nghiệp quân sự."},
          {n:"Kịch Bản 3",t:"Khủng Hoảng Tài Khóa/Tiền Tệ",p:"20–25%",c:RU_C.crimson,
            d:"Chi tiêu quốc phòng không kiểm soát + lạm phát dai dẳng → khủng hoảng tài khóa, mất giá rúp mạnh, buộc thắt chặt đau đớn."},
        ].map((s,i)=>(
          <div key={i} style={{background:RU_C.card,border:`1px solid ${RU_C.border}`,borderRadius:8,
            padding:16,borderTop:`3px solid ${s.c}`}}>
            <div style={{color:RU_C.muted,fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase"}}>{s.n}</div>
            <div style={{color:s.c,fontSize:13,fontWeight:700,margin:"4px 0"}}>{s.t}</div>
            <div style={{color:s.c,fontSize:20,fontWeight:700,fontFamily:"monospace",marginBottom:8}}>{s.p}</div>
            <div style={{color:RU_C.text,fontSize:12,lineHeight:1.65}}>{s.d}</div>
          </div>
        ))}
      </RU_Grid>
    </div>
  );
}

function RU_TabModel() {
  return (
    <div>
      <RU_Card style={{marginBottom:16,borderLeft:`4px solid ${RU_C.gold}`}}>
        <RU_STitle>Petrostate — Nền Kinh Tế Tài Nguyên Cực Đoan</RU_STitle>
        <RU_T>Nga vận hành mô hình <RU_B>kinh tế tài nguyên (resource economy)</RU_B> điển hình: dầu khí chiếm ~30–35% GDP, ~60% xuất khẩu, và gần 40% ngân sách liên bang. Đây là nền kinh tế "petrostate" — thịnh vượng và khủng hoảng đều gắn trực tiếp với giá dầu-khí toàn cầu.</RU_T>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={RU_OIL_REVENUE} margin={{top:5,right:10,bottom:5,left:-10}}>
            <XAxis dataKey="y" tick={{fill:RU_C.dim,fontSize:10}} axisLine={{stroke:RU_C.border}} tickLine={false}/>
            <YAxis tick={{fill:RU_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip content={<RU_TT/>}/>
            <Bar dataKey="v" fill={RU_C.gold} name="% Ngân sách từ dầu khí" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
        <RU_T><RU_HL c={RU_C.orange}>Dutch Disease kinh điển:</RU_HL> Doanh thu dầu khí khổng lồ đẩy giá rúp lên, làm suy yếu năng lực cạnh tranh của các ngành sản xuất khác — Nga chưa bao giờ đa dạng hóa được kinh tế thực sự dù nhiều lần tuyên bố ý định.</RU_T>
      </RU_Card>
      <RU_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <RU_Card>
          <RU_STitle color={RU_C.steel}>Fortress Economy — Chiến Lược Tự Chủ Từ 2014</RU_STitle>
          <RU_T>Sau sáp nhập Crimea 2014 và cấm vận đầu tiên, Nga xây dựng chiến lược <RU_B>tự chủ tài chính có chủ đích</RU_B> dưới sự chỉ đạo của Elvira Nabiullina (Thống đốc CBR).</RU_T>
          {[
            {l:"Giảm nợ nước ngoài",v:"Từ ~40% GDP xuống ~15%",c:RU_C.green},
            {l:"Tích lũy dự trữ vàng-ngoại hối",v:"Đỉnh ~$640B trước 2022",c:RU_C.gold},
            {l:"Giảm phụ thuộc USD",v:"'De-dollarization' thương mại",c:RU_C.blue},
            {l:"National Wealth Fund",v:"Quỹ dự phòng chống sốc dầu",c:RU_C.steel},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${RU_C.border}30`}}>
              <span style={{color:RU_C.text,fontSize:12}}>{r.l}</span>
              <span style={{color:r.c,fontSize:11,fontWeight:700,textAlign:"right",marginLeft:8}}>{r.v}</span>
            </div>
          ))}
          <RU_T style={{marginTop:8}}><RU_HL>Chiến lược này lý giải phần lớn</RU_HL> tại sao Nga chống chịu tốt hơn dự kiến sau 2022 — nhưng không miễn nhiễm, vì ~47% dự trữ vẫn nằm ở phương Tây và bị đóng băng ngay lập tức.</RU_T>
        </RU_Card>
        <RU_Card>
          <RU_STitle color={RU_C.crimson}>Điểm Yếu Cấu Trúc — Chưa Bao Giờ Đa Dạng Hóa</RU_STitle>
          <RU_T>Suốt 20+ năm giá dầu cao (2000–2014, 2021–nay), Nga có cơ hội đa dạng hóa kinh tế nhưng không thực hiện được — vì lợi ích chính trị của elite tài nguyên (oligarch dầu khí) gắn chặt với nguyên trạng.</RU_T>
          <div style={{padding:12,background:`${RU_C.crimson}10`,borderRadius:6,border:`1px solid ${RU_C.crimson}25`,marginTop:8}}>
            <div style={{color:RU_C.crimson,fontSize:10,fontWeight:700,marginBottom:6}}>HỆ QUẢ:</div>
            <div style={{color:RU_C.text,fontSize:12,lineHeight:1.7}}>
              • Sản xuất công nghệ cao yếu, phụ thuộc nhập khẩu linh kiện<br/>
              • Nông nghiệp mạnh (lúa mì) nhưng công nghiệp chế biến yếu<br/>
              • Startup ecosystem gần như không tồn tại so với quy mô kinh tế<br/>
              • Tham nhũng và thiếu rule of law cản trở đầu tư tư nhân dài hạn
            </div>
          </div>
        </RU_Card>
      </RU_Grid>
      <RU_Card>
        <RU_STitle color={RU_C.purple}>Oligarch & Kinh Tế Chính Trị — Ai Kiểm Soát Của Cải?</RU_STitle>
        <RU_T>Nền kinh tế Nga vận hành qua mạng lưới oligarch thân cận Kremlin kiểm soát các ngành tài nguyên chiến lược (Rosneft, Gazprom, Lukoil, Norilsk Nickel). Đây không phải kinh tế thị trường tự do mà là <RU_B>"crony capitalism"</RU_B> — quyền lực kinh tế và chính trị gắn chặt hai chiều.</RU_T>
        <RU_T>Sau 2022, nhiều oligarch bị trừng phạt cá nhân (đóng băng tài sản nước ngoài), nhưng hệ thống nội bộ Nga vẫn tiếp tục vận hành — cho thấy mạng lưới quyền lực này chủ yếu phụ thuộc vào kiểm soát tài nguyên nội địa hơn là tài sản quốc tế.</RU_T>
      </RU_Card>
    </div>
  );
}

function RU_TabSanctions() {
  return (
    <div>
      <RU_Card style={{marginBottom:16}}>
        <RU_STitle color={RU_C.crimson}>Cấm Vận 2022 — Gói Lớn Nhất Lịch Sử Hiện Đại</RU_STitle>
        <RU_T>Sau xâm lược Ukraine 2/2022, Nga đối mặt <RU_B>gói cấm vận lớn nhất áp lên một nền kinh tế lớn trong lịch sử hiện đại</RU_B> — vượt cả cấm vận Iran hay Triều Tiên về quy mô nền kinh tế bị ảnh hưởng.</RU_T>
        <RU_TL events={[
          {year:"2/2022",title:"Đóng băng ~$300B dự trữ ngoại hối",color:RU_C.crimson,desc:"Phần lớn dự trữ tại các nước phương Tây bị khóa ngay lập tức — chưa từng có tiền lệ với một nền kinh tế G20"},
          {year:"3/2022",title:"Loại khỏi SWIFT (phần lớn ngân hàng lớn)",color:RU_C.crimson,desc:"Cắt đứt khả năng thanh toán quốc tế thông thường — buộc dùng hệ thống thay thế"},
          {year:"2022",title:"Cấm vận công nghệ bán dẫn",color:RU_C.orange,desc:"Đặc biệt nhằm vào chip dùng cho quân sự và công nghiệp quốc phòng"},
          {year:"12/2022",title:"Giá trần dầu Nga $60/barrel",color:RU_C.gold,desc:"G7+EU áp giá trần cho dầu Nga vận chuyển bằng tàu phương Tây/bảo hiểm phương Tây"},
          {year:"2023–24",title:"Shadow Fleet phát triển mạnh",color:RU_C.steel,desc:"Đội tàu chở dầu 'tối' (không bảo hiểm phương Tây, sở hữu mờ) né giá trần — ước tính 600+ tàu"},
        ]}/>
      </RU_Card>
      <RU_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <RU_Card>
          <RU_STitle color={RU_C.green}>Tại Sao Nga Không Sụp Đổ Như Dự Đoán</RU_STitle>
          <RU_T>GDP giảm chỉ <RU_B>~2.1% năm 2022</RU_B> — dự báo ban đầu của IMF/World Bank là -10% đến -15%. Đây là một trong những sai lệch dự báo lớn nhất về một nền kinh tế lớn trong lịch sử gần đây.</RU_T>
          {[
            {t:"Fortress Economy đã chuẩn bị từ 2014",d:"Dự trữ, giảm nợ nước ngoài, giảm phụ thuộc USD giúp đệm sốc ban đầu"},
            {t:"Chuyển hướng xuất khẩu nhanh sang TQ-Ấn Độ",d:"Dầu Nga chảy sang châu Á thay vì châu Âu — vẫn bán được, giá chiết khấu"},
            {t:"Nhập khẩu song bình qua nước thứ ba",d:"Thổ Nhĩ Kỳ, UAE, Trung Á, Armenia, Kazakhstan trở thành trung chuyển hàng hóa"},
            {t:"Chi tiêu quốc phòng bơm tiền vào kinh tế",d:"'Military Keynesianism' tạo tăng trưởng GDP ngắn hạn (dù phi sản xuất)"},
          ].map((item,i)=>(
            <div key={i} style={{marginBottom:8,paddingLeft:10,borderLeft:`2px solid ${RU_C.green}`}}>
              <div style={{color:RU_C.green,fontSize:12,fontWeight:700}}>{item.t}</div>
              <div style={{color:RU_C.text,fontSize:12,lineHeight:1.6}}>{item.d}</div>
            </div>
          ))}
        </RU_Card>
        <RU_Card>
          <RU_STitle color={RU_C.orange}>Shadow Fleet — Né Giá Trần Dầu</RU_STitle>
          <RU_T>Đội tàu chở dầu "tối" — sở hữu mờ, không bảo hiểm phương Tây, thường tàu cũ đã hết đời hoạt động thông thường — vận chuyển dầu Nga né giá trần $60/barrel.</RU_T>
          {[
            {l:"Số tàu ước tính trong Shadow Fleet",v:"600+ tàu"},
            {l:"% xuất khẩu dầu Nga qua Shadow Fleet",v:"~70%+"},
            {l:"Rủi ro môi trường (tàu cũ, không bảo hiểm)",v:"Cao — nguy cơ tràn dầu"},
            {l:"Phương Tây tăng trừng phạt tàu cụ thể",v:"Hàng trăm tàu bị chỉ định 2023-24"},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${RU_C.border}25`}}>
              <span style={{color:RU_C.text,fontSize:12}}>{r.l}</span>
              <span style={{color:RU_C.orange,fontSize:12,fontWeight:700,textAlign:"right",marginLeft:8}}>{r.v}</span>
            </div>
          ))}
          <RU_T style={{marginTop:8}}>Chiến lược này giúp Nga duy trì doanh thu dầu khí nhưng với <RU_HL c={RU_C.orange}>chi phí chiết khấu đáng kể</RU_HL> so với giá dầu Brent chuẩn — biên lợi nhuận bị bào mỏng dần theo thời gian khi phương Tây siết chặt giám sát.</RU_T>
        </RU_Card>
      </RU_Grid>
      <RU_Card>
        <RU_STitle color={RU_C.steel}>Cấm Vận Công Nghệ — Điểm Yếu Dài Hạn Thực Sự</RU_STitle>
        <RU_T>Khác với cấm vận tài chính (Nga thích ứng khá tốt), <RU_B>cấm vận công nghệ bán dẫn và linh kiện tiên tiến</RU_B> là vết thương chậm nhưng sâu — ảnh hưởng đến khả năng duy trì công nghiệp quốc phòng và hàng không dài hạn.</RU_T>
        <div style={{padding:12,background:`${RU_C.steel}10`,borderRadius:6,border:`1px solid ${RU_C.steel}25`,marginTop:8}}>
          <div style={{color:RU_C.steel,fontSize:10,fontWeight:700,marginBottom:6}}>TÁC ĐỘNG CỤ THỂ:</div>
          <div style={{color:RU_C.text,fontSize:12,lineHeight:1.7}}>
            • Ngành hàng không dân dụng: thiếu linh kiện thay thế cho máy bay Boeing/Airbus hiện có<br/>
            • Công nghiệp quốc phòng: phải tìm chip qua Trung Quốc/kênh song bình, chất lượng thấp hơn<br/>
            • Ô tô: các hãng phương Tây rút lui hoàn toàn — thị trường bị Trung Quốc (Chery, Haval) chiếm lĩnh<br/>
            • Phần mềm doanh nghiệp: chuyển sang giải pháp nội địa hoặc Trung Quốc, hiệu năng thấp hơn
          </div>
        </div>
      </RU_Card>
      <RU_Card style={{marginTop:16}}>
        <RU_STitle color={RU_C.crimson}>Sberbank — Minh Chứng Sốc Của Cấm Vận Tài Chính</RU_STitle>
        <RU_T>Sberbank — ngân hàng lớn nhất nước Nga (tổng tài sản ~$470 tỷ, lợi nhuận ~$10 tỷ/năm, nhà đầu tư nước ngoài sở hữu ~40% cổ phần) — niêm yết tại Sở GDCK London. Khi chiến tranh nổ ra 2/2022, hoảng loạn bán tháo khiến giá cổ phiếu <RU_B>giảm gần 500 lần</RU_B> — từ vốn hóa ~$100-110 tỷ xuống chỉ còn khoảng <RU_HL c={RU_C.crimson}>$242 triệu</RU_HL>.</RU_T>
        <div style={{padding:12,background:`${RU_C.crimson}08`,borderRadius:6,border:`1px solid ${RU_C.crimson}20`,marginTop:8}}>
          <span style={{color:RU_C.crimson,fontWeight:700}}>Diễn biến bất thường: </span>
          <span style={{color:RU_C.text,fontSize:12.5}}>Theo các nguồn tin chưa kiểm chứng, một nhóm nhà đầu tư giấu mặt đã âm thầm gom mua cổ phiếu Sberbank bị bán tháo tại London ngay sau đó — nghi vấn chính người Nga đang mua lại tài sản của mình với giá rẻ mạt, một hiện tượng thường thấy khi thị trường hoảng loạn quá mức so với giá trị nội tại thực.</span>
        </div>
      </RU_Card>
      <RU_Card style={{marginTop:16}}>
        <RU_STitle color={RU_C.gold}>Cơ Chế Phòng Thủ Tỷ Giá Bằng Vàng — "Bình Thông Nhau"</RU_STitle>
        <RU_T>Khi dự trữ ngoại hối bị đóng băng, CBR (Ngân hàng Trung ương Nga) dùng <RU_B>vàng làm công cụ neo tỷ giá gián tiếp</RU_B> — một giải pháp kỹ thuật tinh vi ít được chú ý:</RU_T>
        <div style={{margin:"10px 0",padding:14,background:RU_C.card2,borderRadius:8,border:`1px solid ${RU_C.border}`}}>
          {[
            {n:"01",t:"Trước chiến tranh: CBR dùng ngoại tệ mua vàng từ DN xuất khẩu vàng nội địa theo giá thế giới",c:RU_C.blue},
            {n:"02",t:"Sau cấm vận: chuyển sang dùng RUBLE mua vàng khai thác được — vừa tăng dự trữ vừa cứu DN & ngân hàng",c:RU_C.gold},
            {n:"03",t:"15/3/2022: CBR dừng mua (tránh đẩy giá) + bỏ thuế VAT vàng để khuyến khích dân giữ vàng thay ngoại tệ",c:RU_C.orange},
            {n:"04",t:"Ấn định giá mua 5.000 ruble/gram — tính ra tương đương tỷ giá ngầm ~79-80 ruble/$",c:RU_C.green},
          ].map(s=>(
            <div key={s.n} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
              <div style={{color:s.c,fontWeight:700,fontFamily:"monospace",fontSize:11,minWidth:22}}>{s.n}</div>
              <div style={{color:RU_C.text,fontSize:12.5,lineHeight:1.65}}>→ {s.t}</div>
            </div>
          ))}
        </div>
        <RU_T><RU_HL c={RU_C.gold}>Tại sao hiệu quả:</RU_HL> Nga là một trong các nước khai thác-xuất khẩu vàng lớn nhất thế giới (~10% kim ngạch toàn cầu) — vàng là "ngoại tệ tự sản xuất được", giá cả minh bạch toàn cầu, không thể bị phong tỏa như tài khoản ngân hàng. Đây là lý do đồng ruble hồi phục nhanh bất ngờ sau cú sốc ban đầu.</RU_T>
      </RU_Card>
      <RU_Card style={{marginTop:16}}>
        <RU_STitle color={RU_C.blue}>Giai Đoạn Giảm Phát Ngược — Ruble "Quá Mạnh" (7-8/2022)</RU_STitle>
        <RU_T>Một diễn biến nghịch lý ít được nhắc đến: sau cú sốc lạm phát 20% đầu chiến tranh, chỉ vài tháng sau Nga lại đối mặt vấn đề ngược — <RU_B>giảm phát</RU_B> và đồng ruble tăng giá <RU_HL>mạnh hơn cả trước chiến tranh</RU_HL> (có lúc chỉ ~52 ruble/$ so với 70-75 ruble/$ thời điểm trước 2/2022).</RU_T>
        <RU_Grid cols={2} gap={12} style={{marginTop:10}}>
          <div style={{padding:12,background:RU_C.card2,borderRadius:6}}>
            <div style={{color:RU_C.blue,fontSize:10,fontWeight:700,marginBottom:6}}>SỐ LIỆU CỤ THỂ</div>
            <div style={{color:RU_C.text,fontSize:12,lineHeight:1.8}}>
              • CPI tháng 6/2022: <RU_HL c={RU_C.blue}>-0.35%</RU_HL><br/>
              • Tuần đầu 8/2022: <RU_HL c={RU_C.blue}>-0.03%</RU_HL><br/>
              • Lãi suất cơ bản: 20% → giảm dần về 17%<br/>
              • Ruble: 150/$ (đỉnh hoảng loạn) → ~52/$ (đỉnh mạnh)
            </div>
          </div>
          <div style={{padding:12,background:`${RU_C.orange}08`,borderRadius:6,border:`1px solid ${RU_C.orange}20`}}>
            <div style={{color:RU_C.orange,fontSize:10,fontWeight:700,marginBottom:6}}>VẤN ĐỀ PHÁT SINH</div>
            <RU_T style={{margin:0}}>Ruble quá mạnh làm hại xuất khẩu (hàng Nga đắt hơn tương đối) → CBR phải tìm cách <RU_B>chủ động phá giá ngược lại</RU_B> và nới lỏng kiểm soát ngoại hối đã siết trước đó.</RU_T>
          </div>
        </RU_Grid>
        <RU_T style={{marginTop:8}}><RU_HL c={RU_C.red}>Rủi ro dài hạn nếu là căn cơ chứ không tạm thời:</RU_HL> Giảm phát kéo dài → sản xuất thua lỗ → đầu tư giảm → thất nghiệp tăng → cầu giảm thêm — một vòng xoáy giảm phát dẫn đến suy thoái sâu, đòi hỏi nhiều năm chính sách tiền tệ-tài khóa mạnh để thoát ra.</RU_T>
      </RU_Card>
    </div>
  );
}

function RU_TabWarEconomy() {
  return (
    <div>
      <RU_Grid cols={4} gap={12} style={{marginBottom:16}}>
        <RU_Metric label="Chi Quốc Phòng/Ngân Sách" value="~40%" sub="Mức chưa từng thấy từ Xô Viết" color={RU_C.crimson}/>
        <RU_Metric label="Chi Quốc Phòng/GDP" value="~7-8%" sub="Gấp 3-4x mức trước 2022" color={RU_C.orange}/>
        <RU_Metric label="Thất Nghiệp" value="~2.5%" sub="Thấp lịch sử — vì lý do sai" color={RU_C.gold} warn="Thiếu lao động, không phải mạnh"/>
        <RU_Metric label="Lãi Suất CBR" value="21%" sub="Cao nhất kể từ đầu 2000s" color={RU_C.crimson}/>
      </RU_Grid>
      <RU_Card style={{marginBottom:16}}>
        <RU_STitle color={RU_C.crimson}>Military Keynesianism — Tăng Trưởng Phi Sản Xuất</RU_STitle>
        <RU_T>Từ 2022, chi tiêu quốc phòng tăng vọt tạo <RU_B>tăng trưởng GDP giả tạo</RU_B> — ngành công nghiệp quân sự sản xuất đạn dược, xe tăng, thiết bị mà không tạo giá trị tiêu dùng dân sự nào. Đây là hiện tượng cổ điển trong lịch sử kinh tế chiến tranh.</RU_T>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={RU_KEY_RATE} margin={{top:5,right:20,bottom:5,left:-10}}>
            <XAxis dataKey="m" tick={{fill:RU_C.dim,fontSize:10}} axisLine={{stroke:RU_C.border}} tickLine={false}/>
            <YAxis tick={{fill:RU_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip content={<RU_TT/>}/>
            <Line type="stepAfter" dataKey="r" stroke={RU_C.crimson} strokeWidth={2.5} dot={{fill:RU_C.crimson,r:3}} name="CBR Key Rate %"/>
          </LineChart>
        </ResponsiveContainer>
        <RU_T><RU_HL c={RU_C.crimson}>Nghịch lý Guns vs Butter:</RU_HL> Chi tiêu quốc phòng bơm tiền vào kinh tế trong khi nguồn cung hàng hóa dân sự bị hạn chế bởi cấm vận và chuyển hướng sản xuất → lạm phát dai dẳng → CBR buộc giữ lãi suất cực cao (21% năm 2024) → nghẹt thở đầu tư dân sự và tín dụng tiêu dùng.</RU_T>
      </RU_Card>
      <RU_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <RU_Card>
          <RU_STitle color={RU_C.purple}>Brain Drain — Chảy Máu Chất Xám Chưa Có Tiền Lệ</RU_STitle>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={RU_MIGRATION} margin={{top:5,right:10,bottom:5,left:-10}}>
              <XAxis dataKey="y" tick={{fill:RU_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:RU_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <Tooltip content={<RU_TT/>}/>
              <Bar dataKey="v" fill={RU_C.purple} name="Di cư ước tính (nghìn người)" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
          <RU_T>Ước tính <RU_B>800,000–1,000,000 người</RU_B> rời Nga từ 2022 — chủ yếu <RU_HL c={RU_C.purple}>trẻ, có học vấn cao, làm việc trong IT/công nghệ/tài chính</RU_HL>. Đây là nhóm dân số có giá trị kinh tế cao nhất, khó thay thế trong ngắn-trung hạn.</RU_T>
        </RU_Card>
        <RU_Card>
          <RU_STitle color={RU_C.orange}>Khủng Hoảng Lao Động — Thất Nghiệp Thấp Vì Lý Do Sai</RU_STitle>
          <RU_T>Thất nghiệp Nga xuống mức thấp lịch sử ~2.5% — nhưng đây <RU_B>không phải dấu hiệu kinh tế mạnh</RU_B>. Nguyên nhân: động viên quân sự (hàng trăm nghìn nam giới trong tuổi lao động) + di cư + dân số già hóa từ trước.</RU_T>
          <div style={{padding:12,background:`${RU_C.orange}10`,borderRadius:6,border:`1px solid ${RU_C.orange}25`,marginTop:8}}>
            <div style={{color:RU_C.orange,fontSize:10,fontWeight:700,marginBottom:6}}>HỆ QUẢ KINH TẾ:</div>
            <div style={{color:RU_C.text,fontSize:12,lineHeight:1.7}}>
              • Lương tăng vọt trong ngành thiếu lao động (quốc phòng, logistics)<br/>
              • Doanh nghiệp dân sự khó tuyển người, cạnh tranh lương với ngành quốc phòng<br/>
              • Áp lực lạm phát từ chi phí lao động tăng nhanh hơn năng suất<br/>
              • Rủi ro dài hạn: thiếu lao động có kỹ năng khi cần tái cơ cấu kinh tế
            </div>
          </div>
        </RU_Card>
      </RU_Grid>
      <RU_Card>
        <RU_STitle color={RU_C.gold}>"Hạ Cánh" Sau Chiến Tranh — Rủi Ro Chưa Được Nói Đến</RU_STitle>
        <RU_T>Vấn đề cấu trúc nghiêm trọng nhất mà ít người phân tích: <RU_B>ngân sách Nga hiện phụ thuộc chi tiêu quốc phòng ở mức khó đảo ngược nhanh</RU_B>. Nếu chiến tranh kết thúc, việc giảm chi quốc phòng đột ngột có thể gây suy thoái — tương tự "military demobilization shock" mà nhiều nước từng trải qua sau chiến tranh lớn.</RU_T>
        <RU_T><RU_HL c={RU_C.gold}>Bài toán khó:</RU_HL> Chuyển đổi công nghiệp quốc phòng sang sản xuất dân sự đòi hỏi đầu tư, thời gian, và thị trường tiêu thụ — tất cả đều bất định trong môi trường cấm vận kéo dài.</RU_T>
      </RU_Card>
    </div>
  );
}

function RU_TabChina() {
  return (
    <div>
      <RU_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <RU_Card>
          <RU_STitle>Đối Tác Thương Mại Chính (%)</RU_STitle>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={RU_TRADE_PARTNER} cx="50%" cy="50%" innerRadius={50} outerRadius={85}
                dataKey="v" nameKey="n" paddingAngle={2}>
                {RU_TRADE_PARTNER.map((_,i)=><Cell key={i} fill={RU_PIE_COLORS[i]}/>)}
              </Pie>
              <Tooltip formatter={(v,n)=>[`${v}%`,n]}/>
              <Legend wrapperStyle={{color:RU_C.text,fontSize:11}}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{color:RU_C.dim,fontSize:11,textAlign:"center",marginTop:-4}}>EU giảm mạnh từ ~35% (trước 2022) — thay thế hoàn toàn bởi Trung Quốc-Ấn Độ</div>
        </RU_Card>
        <RU_Card>
          <RU_STitle color={RU_C.crimson}>Từ Đối Tác Bình Đẳng Thành Phụ Thuộc Đơn Phương</RU_STitle>
          <RU_T>Trước 2022, Nga-Trung Quốc là <RU_B>quan hệ tương đối cân bằng</RU_B> — Nga bán tài nguyên, mua hàng công nghiệp, hai bên có đòn bẩy đàm phán riêng. Sau 2022, cán cân nghiêng hẳn về Trung Quốc.</RU_T>
          {[
            {l:"Xuất khẩu Nga sang TQ (dầu, khí, gỗ)",v:"Tăng mạnh, giá chiết khấu",c:RU_C.orange},
            {l:"Nhập khẩu từ TQ (ô tô, điện tử, máy móc)",v:"Tăng mạnh, thế chỗ phương Tây",c:RU_C.blue},
            {l:"Thanh toán bằng nhân dân tệ",v:"Tăng từ gần 0 lên >30% thương mại",c:RU_C.gold},
            {l:"TQ từ chối bán bán dẫn tiên tiến",v:"Sợ cấm vận thứ cấp từ Mỹ",c:RU_C.crimson},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"8px 0",borderBottom:`1px solid ${RU_C.border}25`}}>
              <span style={{color:RU_C.text,fontSize:12,flex:1}}>{r.l}</span>
              <span style={{color:r.c,fontSize:11,fontWeight:700,textAlign:"right",maxWidth:"45%",marginLeft:8}}>{r.v}</span>
            </div>
          ))}
        </RU_Card>
      </RU_Grid>
      <RU_Card style={{marginBottom:16}}>
        <RU_STitle color={RU_C.orange}>Đòn Bẩy Bất Đối Xứng — Trung Quốc Nắm Lợi Thế</RU_STitle>
        <RU_Grid cols={2} gap={16}>
          <div>
            <div style={{color:RU_C.orange,fontSize:10,fontWeight:700,marginBottom:8,letterSpacing:"0.06em"}}>TẠI SAO TRUNG QUỐC CÓ LỢI THẾ:</div>
            {[
              "Nga cần Trung Quốc mua dầu hơn Trung Quốc cần dầu Nga (có nhiều nguồn cung khác)",
              "Nga không có đối tác thay thế khả thi ở quy mô tương đương",
              "Trung Quốc có thể ép giá chiết khấu sâu hơn vì thiếu cạnh tranh mua",
              "Trung Quốc kiểm soát công nghệ Nga cần (bán dẫn, máy móc) — Nga không có đòn bẩy ngược",
            ].map((s,i)=>(
              <div key={i} style={{display:"flex",gap:8,marginBottom:7}}>
                <span style={{color:RU_C.orange}}>▸</span>
                <span style={{color:RU_C.text,fontSize:12,lineHeight:1.6}}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{padding:14,background:`${RU_C.crimson}08`,borderRadius:8,border:`1px solid ${RU_C.crimson}20`}}>
            <div style={{color:RU_C.crimson,fontSize:10,fontWeight:700,marginBottom:8}}>NGA TRỞ THÀNH:</div>
            <RU_T style={{margin:0}}>Về bản chất, Nga đang trở thành <RU_B>"nguồn tài nguyên giá rẻ cho Trung Quốc"</RU_B> — vị thế tương tự các nước đang phát triển xuất khẩu tài nguyên thô cho nước công nghiệp lớn hơn, chỉ khác là Nga từng là siêu cường và có vũ khí hạt nhân.</RU_T>
            <RU_T style={{marginTop:8}}>Đây là <RU_HL c={RU_C.crimson}>đảo ngược vị thế lịch sử</RU_HL> — thời Xô Viết, Trung Quốc từng học hỏi công nghệ quân sự và công nghiệp từ Liên Xô. Nay dòng chảy công nghệ và ảnh hưởng gần như đảo ngược hoàn toàn.</RU_T>
          </div>
        </RU_Grid>
      </RU_Card>
      <RU_Card>
        <RU_STitle color={RU_C.steel}>Thanh Toán Nhân Dân Tệ & Rủi Ro Phụ Thuộc Tài Chính</RU_STitle>
        <RU_T>Thương mại Nga-Trung ngày càng thanh toán bằng nhân dân tệ (CNY) thay USD/EUR — phần của chiến lược "de-dollarization" chung. Nhưng điều này tạo <RU_B>phụ thuộc mới vào hệ thống tài chính Trung Quốc</RU_B> thay vì giảm phụ thuộc tài chính nói chung.</RU_T>
        <div style={{padding:12,background:`${RU_C.steel}10`,borderRadius:6,border:`1px solid ${RU_C.steel}25`,marginTop:8}}>
          <span style={{color:RU_C.steel,fontWeight:700}}>Rủi ro dài hạn: </span>
          <span style={{color:RU_C.text,fontSize:12.5}}>Nếu quan hệ Nga-Trung xấu đi vì bất kỳ lý do gì (địa chính trị, lợi ích Trung Á, Bắc Cực), Nga có rất ít đòn bẩy đàm phán vì đã đặt quá nhiều trứng vào giỏ Trung Quốc kể từ 2022.</span>
        </div>
      </RU_Card>
      <RU_Card style={{marginTop:16}}>
        <RU_STitle color={RU_C.purple}>Thông Cáo Chung Nga-Trung 02/2022 — "Đồng Sàng Dị Mộng"</RU_STitle>
        <RU_T>Ngay trước khi Nga xâm lược Ukraine, Putin thăm Bắc Kinh gặp Tập Cận Bình dịp khai mạc Olympic mùa đông — ký thông cáo chung dài, ngôn ngữ mang đậm màu sắc đối đầu kiểu Chiến tranh Lạnh nhưng nội hàm cụ thể khá mơ hồ.</RU_T>
        <RU_Grid cols={2} gap={12} style={{marginTop:10}}>
          <div style={{padding:12,background:`${RU_C.blue}08`,borderRadius:6,border:`1px solid ${RU_C.blue}20`}}>
            <div style={{color:RU_C.blue,fontSize:10,fontWeight:700,marginBottom:6}}>NGA MUỐN GÌ</div>
            <RU_T style={{margin:0}}>Khôi phục vị thế <RU_B>thế giới hai cực</RU_B> như hậu Thế chiến 2 — nơi Nga là một cực ngang hàng, không nhất thiết đòi hỏi trật tự toàn cầu mới hoàn toàn.</RU_T>
          </div>
          <div style={{padding:12,background:`${RU_C.gold}08`,borderRadius:6,border:`1px solid ${RU_C.gold}20`}}>
            <div style={{color:RU_C.gold,fontSize:10,fontWeight:700,marginBottom:6}}>TRUNG QUỐC MUỐN GÌ</div>
            <RU_T style={{margin:0}}>"Xào bài chia lại" hoàn toàn — triết lý <RU_B>"Cộng đồng nhân loại chung vận mệnh"</RU_B> đặt TQ ở vị trí trung tâm dẫn dắt thay thế vai trò Mỹ, tham vọng lớn hơn nhiều so với Nga.</RU_T>
          </div>
        </RU_Grid>
        <div style={{marginTop:10,padding:12,background:`${RU_C.crimson}08`,borderRadius:6,border:`1px solid ${RU_C.crimson}20`}}>
          <span style={{color:RU_C.crimson,fontWeight:700}}>Nghi ngại sâu xa của Nga: </span>
          <span style={{color:RU_C.text,fontSize:12.5}}>Dù công khai ca ngợi nhau, giới tinh hoa Nga chưa bao giờ thực sự tin Trung Quốc — bởi tham vọng lãnh thổ lịch sử của TQ với vùng Siberia đến Vladivostok vẫn tồn tại ngầm. Cụm từ trong thông cáo "tình hữu nghị không biên giới" bị nhiều người Nga đọc với ẩn ý cảnh giác chứ không phải thân thiết. Quan hệ Nga-Trung về bản chất là <RU_HL c={RU_C.crimson}>lợi dụng lẫn nhau hơn là đối tác chiến lược thật sự</RU_HL> — mỗi bên có động cơ và mục tiêu cuối cùng khác nhau, chỉ tạm thời hội tụ lợi ích trước áp lực chung từ phương Tây.</span>
        </div>
      </RU_Card>
      <RU_Card style={{marginTop:16}}>
        <RU_STitle color={RU_C.teal}>Kazakhstan — "Nút Cổ Chai" Nga Kiểm Soát Trên Con Đường Tơ Lụa</RU_STitle>
        <RU_T>Ít được chú ý nhưng mang tính chiến lược cao: Kazakhstan là <RU_B>cửa ngõ duy nhất</RU_B> mà "Một vành đai, một con đường" (BRI) của Trung Quốc phải đi qua để tới châu Âu bằng đường bộ — cùng với Belarus ở đầu kia.</RU_T>
        <div style={{margin:"10px 0",padding:12,background:RU_C.card2,borderRadius:8,display:"flex",flexWrap:"wrap",gap:6,alignItems:"center"}}>
          {["Trung Quốc","→","Kazakhstan","→","Nga","→","Belarus","→","EU (Ba Lan → Đức → Ý)"].map((s,i)=>(
            <span key={i} style={{color:s==="→"?RU_C.dim:RU_C.text,fontSize:12.5,fontWeight:s==="Kazakhstan"||s==="Nga"?700:400}}>{s}</span>
          ))}
        </div>
        <RU_T>Sau bạo loạn Kazakhstan 1/2022, lực lượng CSTO do Nga dẫn dắt (chỉ 3,000 quân) đã dẹp loạn trong 5 ngày và củng cố ảnh hưởng Nga tại đây — hệ quả là <RU_HL c={RU_C.teal}>Trung Quốc phải "thở qua lỗ mũi Nga"</RU_HL> để triển khai tuyến hàng hóa chiến lược của mình, một đòn bẩy địa chính trị quan trọng mà Nga nắm giữ trong quan hệ bất cân xứng với TQ.</RU_T>
        <RU_T style={{marginTop:8}}><RU_B>Kazakhstan cũng là nhà cung cấp năng lượng quan trọng cho Trung Quốc</RU_B> — sau bất ổn 2022, Bắc Kinh phải gấp rút mời ngoại trưởng các nước Ả Rập (Saudi, Kuwait, Oman, Bahrain) thăm để tìm nguồn thay thế, cho thấy mức độ phụ thuộc và lo ngại thực sự của TQ về an ninh năng lượng qua ngả Trung Á.</RU_T>
      </RU_Card>
    </div>
  );
}

function RU_TabRisks() {
  return (
    <div>
      <RU_Card style={{marginBottom:16}}>
        <RU_STitle color={RU_C.gold}>So Sánh Nhanh: Ba Petrostate Dưới Cấm Vận — Nga, Iran, Venezuela</RU_STitle>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr>
                {["Chiều","Nga","Iran","Venezuela"].map((h,i)=>(
                  <th key={i} style={{color:RU_C.gold,fontSize:10,fontWeight:700,padding:"8px 10px",
                    textAlign:"left",borderBottom:`1px solid ${RU_C.border}`,letterSpacing:"0.05em",background:RU_C.card2}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {d:"Quy mô kinh tế",r:"Lớn — G20, ~$2T GDP",i:"Trung bình — ~$400B",v:"Nhỏ — ~$100B (sụp đổ sâu)"},
                {d:"Thời gian bị cấm vận",r:"Từ 2014, nặng từ 2022",i:"40+ năm (từ 1979)",v:"~10 năm nặng nề"},
                {d:"Đối tác thay thế",r:"Trung Quốc, Ấn Độ mạnh",i:"Trung Quốc, hạn chế hơn",v:"Trung Quốc, Nga hạn chế"},
                {d:"Mức độ suy thoái",r:"Nhẹ — chống chịu tốt",i:"Trung bình — suy giảm dần",v:"Cực nặng — hyperinflation"},
              ].map((r,i)=>(
                <tr key={i} style={{background:i%2===0?RU_C.card:RU_C.card2}}>
                  <td style={{color:RU_C.bright,fontWeight:700,padding:"9px 10px",fontSize:12,borderBottom:`1px solid ${RU_C.border}20`}}>{r.d}</td>
                  <td style={{color:RU_C.crimson,padding:"9px 10px",fontSize:12,borderBottom:`1px solid ${RU_C.border}20`,lineHeight:1.5}}>{r.r}</td>
                  <td style={{color:RU_C.orange,padding:"9px 10px",fontSize:12,borderBottom:`1px solid ${RU_C.border}20`,lineHeight:1.5}}>{r.i}</td>
                  <td style={{color:RU_C.steel,padding:"9px 10px",fontSize:12,borderBottom:`1px solid ${RU_C.border}20`,lineHeight:1.5}}>{r.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <RU_T style={{marginTop:10}}><RU_HL c={RU_C.gold}>Bài học:</RU_HL> Quy mô kinh tế và chất lượng thể chế tài chính trước cấm vận (Fortress Economy của Nga) quyết định mức độ chống chịu nhiều hơn bản thân mức độ nặng nhẹ của cấm vận.</RU_T>
      </RU_Card>
      <RU_Grid cols={3} gap={12} style={{marginBottom:16}}>
        {[
          {n:"Kịch Bản 1",t:"Chiến Tranh Kéo Dài + Ổn Định",p:"40–45%",c:RU_C.gold,
            ck:["Xung đột duy trì ở mức thấp/đóng băng","Kinh tế chiến tranh tiếp tục nhưng ổn định","Chuyển hướng TQ-Ấn Độ đủ duy trì xuất khẩu","Lạm phát và lãi suất cao kéo dài nhiều năm"]},
          {n:"Kịch Bản 2",t:"Hòa Bình + Tái Cấu Trúc Đau Đớn",p:"25–30%",c:RU_C.green,
            ck:["Ngừng bắn/hòa bình cho phép giảm chi QP","Đối mặt 'demobilization shock' kinh tế","Cần tái cơ cấu công nghiệp quân sự lớn","Cơ hội bình thường hóa quan hệ phương Tây (chậm)"]},
          {n:"Kịch Bản 3",t:"Khủng Hoảng Tài Khóa/Tiền Tệ",p:"20–25%",c:RU_C.crimson,
            ck:["Chi quốc phòng không kiểm soát tiếp diễn","Lạm phát dai dẳng vượt kiểm soát CBR","Mất giá rúp mạnh, niềm tin suy giảm","Buộc thắt chặt tài khóa đau đớn bất ngờ"]},
        ].map((s,i)=>(
          <RU_Card key={i} style={{borderTop:`3px solid ${s.c}`}}>
            <div style={{color:RU_C.muted,fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase"}}>{s.n}</div>
            <div style={{color:s.c,fontSize:13,fontWeight:700,margin:"4px 0"}}>{s.t}</div>
            <div style={{color:s.c,fontSize:20,fontWeight:700,fontFamily:"monospace",marginBottom:10}}>{s.p}</div>
            {s.ck.map((c,j)=><div key={j} style={{color:RU_C.text,fontSize:11,marginBottom:4}}>• {c}</div>)}
          </RU_Card>
        ))}
      </RU_Grid>
      <RU_Card>
        <RU_STitle color={RU_C.steel}>Ma Trận Đánh Giá Tổng Thể</RU_STitle>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr>
                {["Chiều","Điểm Mạnh","Điểm Yếu","Rủi Ro"].map((h,i)=>(
                  <th key={i} style={{color:RU_C.gold,fontSize:10,fontWeight:700,padding:"8px 10px",
                    textAlign:"left",borderBottom:`1px solid ${RU_C.border}`,letterSpacing:"0.05em",background:RU_C.card2}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {d:"Tài Nguyên",s:"Dầu, khí, kim loại, nông sản khổng lồ",w:"Chưa bao giờ đa dạng hóa được kinh tế",r:"Trung Bình"},
                {d:"Tài Chính",s:"Fortress Economy chống chịu tốt 2022",w:"~$300B dự trữ bị đóng băng vĩnh viễn",r:"Cao"},
                {d:"Nhân Lực",s:"Dân số lớn, giáo dục kỹ thuật tốt",w:"Brain drain 800K-1M, dân số già hóa",r:"Rất Cao"},
                {d:"Công Nghệ",s:"Mạnh quốc phòng, không gian, năng lượng nguyên tử",w:"Cấm vận bán dẫn cắt đứt công nghệ dân sự tiên tiến",r:"Rất Cao"},
                {d:"Địa Chính Trị",s:"Vũ khí hạt nhân, ghế UNSC, ảnh hưởng CIS",w:"Cô lập phương Tây, phụ thuộc bất đối xứng TQ",r:"Cao"},
                {d:"Ngân Sách",s:"Chi quốc phòng tạo tăng trưởng ngắn hạn",w:"Phụ thuộc chi tiêu chiến tranh khó đảo ngược",r:"Cao"},
              ].map((r,i)=>(
                <tr key={i} style={{background:i%2===0?RU_C.card:RU_C.card2}}>
                  <td style={{color:RU_C.bright,fontWeight:700,padding:"9px 10px",fontSize:12,borderBottom:`1px solid ${RU_C.border}20`}}>{r.d}</td>
                  <td style={{color:RU_C.green,padding:"9px 10px",fontSize:12,borderBottom:`1px solid ${RU_C.border}20`,lineHeight:1.5}}>{r.s}</td>
                  <td style={{color:RU_C.text,padding:"9px 10px",fontSize:12,borderBottom:`1px solid ${RU_C.border}20`,lineHeight:1.5}}>{r.w}</td>
                  <td style={{padding:"9px 10px",borderBottom:`1px solid ${RU_C.border}20`}}><RU_Badge level={r.r}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{marginTop:16,padding:16,background:`${RU_C.gold}08`,borderRadius:8,border:`1px solid ${RU_C.gold}25`}}>
          <div style={{color:RU_C.gold,fontSize:11,fontWeight:700,marginBottom:8}}>KẾT LUẬN:</div>
          <div style={{color:RU_C.text,fontSize:13.5,lineHeight:1.85}}>
            Nga đã chứng minh <RU_HL c={RU_C.green}>khả năng chống chịu ngắn-trung hạn</RU_HL> đáng kinh ngạc trước gói cấm vận lớn nhất lịch sử hiện đại — nhờ chiến lược Fortress Economy chuẩn bị từ 2014 và khả năng chuyển hướng thương mại nhanh sang Trung Quốc-Ấn Độ. Nhưng đây là sự chống chịu <RU_HL c={RU_C.crimson}>đánh đổi bằng cấu trúc dài hạn</RU_HL>: kinh tế chiến tranh phi sản xuất không thể duy trì vô hạn, brain drain làm suy yếu năng lực đổi mới, và phụ thuộc bất đối xứng vào Trung Quốc ngày càng sâu — đảo ngược vị thế siêu cường độc lập mà Nga từng có trong thời Chiến Tranh Lạnh. Bài toán khó nhất phía trước không phải là tồn tại qua cấm vận, mà là <RU_HL c={RU_C.orange}>"hạ cánh"</RU_HL> khỏi kinh tế chiến tranh mà không gây ra cú sốc suy thoái mới.
          </div>
        </div>
      </RU_Card>
    </div>
  );
}

function RU_TabExpert() {
  return (
    <div>
      <div style={{marginBottom:20,padding:"16px 20px",background:RU_C.panel,borderRadius:8,
        border:`1px solid ${RU_C.border}`,borderLeft:`4px solid ${RU_C.gold}`}}>
        <div style={{color:RU_C.gold,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>GÓC CHUYÊN GIA — TỔNG HỢP QUAN ĐIỂM VỀ NGA</div>
        <p style={{color:RU_C.bright,fontSize:14,lineHeight:1.75,margin:0}}>
          Tổng hợp các đoạn phân tích <RU_HL>đặc thù cho Nga</RU_HL> rút ra từ nhiều bài viết vĩ mô khác nhau (2021–2026) của cùng một tác giả —
          bao gồm cả những câu trực tiếp nhắc đến Nga trong bối cảnh hệ thống tiền tệ toàn cầu, không chỉ các bài chuyên về chiến tranh/cấm vận.
        </p>
        <div style={{color:RU_C.dim,fontSize:11,marginTop:8,fontStyle:"italic"}}>
          * Tóm tắt quan điểm cá nhân của tác giả các bài viết, trình bày để đối chiếu góc nhìn — không phải nhận định của phân tích chính trong các tab khác.
        </div>
      </div>

      <RU_Card style={{marginBottom:16}}>
        <RU_STitle>"Con Tin Của USD" — Câu Duy Nhất Về Nga Trong Bài Phân Tích Nợ Mỹ (05/2025)</RU_STitle>
        <RU_T>Trong toàn bộ các bài viết về hệ thống tiền tệ toàn cầu, đây là đoạn <RU_B>duy nhất nhắc đích danh Nga</RU_B> — xuất hiện khi tác giả phân tích tại sao Trung Quốc không dùng trái phiếu Mỹ làm vũ khí tài chính:</RU_T>
        <div style={{margin:"10px 0",padding:16,background:RU_C.card2,borderRadius:8,border:`1px solid ${RU_C.gold}30`,borderLeft:`4px solid ${RU_C.gold}`}}>
          <div style={{color:RU_C.text,fontSize:13.5,lineHeight:1.8,fontStyle:"italic"}}>
            "Nắm giữ càng nhiều USD càng dễ thành con tin của USD như Nga đang chịu. Đạo luật 21st Century… là minh chứng."
          </div>
        </div>
        <RU_T><RU_HL c={RU_C.gold}>Ý nghĩa:</RU_HL> Câu này đặt Nga làm ví dụ cảnh báo cho Trung Quốc — cho thấy tác giả nhìn nhận vị thế tiền tệ của Nga không phải là "đã thoát ly USD thành công" mà là <RU_B>bằng chứng sống về rủi ro trở thành con tin</RU_B> khi một quốc gia phụ thuộc quá sâu vào hệ thống đồng tiền dự trữ do đối thủ địa chính trị kiểm soát — một khung nhìn khác với cách nhiều phân tích khác mô tả "chiến thắng thích ứng" của Nga sau cấm vận.</RU_T>
      </RU_Card>

      <RU_Card style={{marginBottom:16}}>
        <RU_STitle color={RU_C.teal}>ESG/Chuyển Đổi Xanh Như Vũ Khí Nhắm Vào Vị Thế Năng Lượng Nga (05/2022)</RU_STitle>
        <RU_T>Từ bài "Chuyển Đổi Xanh, ESG và Lạm Phát" — lập luận rằng đà thúc đẩy Green Transformation toàn cầu phục vụ đồng thời một mục tiêu địa chính trị cụ thể nhắm vào Nga:</RU_T>
        <div style={{padding:12,background:`${RU_C.teal}08`,borderRadius:6,border:`1px solid ${RU_C.teal}20`,marginTop:8}}>
          <span style={{color:RU_C.teal,fontWeight:700}}>Lập luận của tác giả: </span>
          <span style={{color:RU_C.text,fontSize:12.5}}>"Giảm phụ thuộc vào Nga — đối thủ — bằng cách đẩy nhanh quá trình thay thế nguyên liệu hóa thạch bằng năng lượng 'sạch, xanh' để hạ vị thế Nga vốn sống dựa vào khai thác tài nguyên." Ước tính giá trị GT năm 2025 sẽ đạt <RU_HL c={RU_C.teal}>$50 nghìn tỷ</RU_HL> — gấp <RU_B>35-40 lần GDP Nga</RU_B> tại thời điểm viết bài.</span>
        </div>
        <RU_T style={{marginTop:8}}>Tác giả đưa ra một suy đoán gây tranh cãi: thời điểm Nga phát động chiến tranh Ukraine (2/2022) có thể liên quan đến việc "giữ vị thế năng lượng trên bàn đàm phán trước khi quá muộn" — trước khi Green Transformation làm suy yếu hoàn toàn đòn bẩy dầu khí của Nga trong dài hạn. Đây là góc nhìn suy đoán cá nhân, không phải khẳng định có bằng chứng trực tiếp.</RU_T>
      </RU_Card>

      <RU_Card style={{marginBottom:16}}>
        <RU_STitle color={RU_C.blue}>Ba Lần Thất Bại Hội Nhập Châu Âu — Lịch Sử Ít Được Nhắc Đến</RU_STitle>
        <RU_T>Từ bài "Thông Cáo Chung Nga-Trung" (02/2022): trước khi trở thành đối thủ công khai với phương Tây, Nga hậu Xô Viết đã <RU_B>thực lòng cố gắng hội nhập châu Âu ba lần</RU_B> — cả ba đều thất bại vì sự không mặn mà từ phía Mỹ/EU chứ không phải Nga từ chối hợp tác:</RU_T>
        <RU_TL events={[
          {year:"1991-1993",title:"Giai đoạn Dân chủ hóa",color:RU_C.blue,desc:"Kỳ vọng cải tổ chính trị sẽ mở đường hội nhập kinh tế châu Âu — không thành hiện thực như mong đợi"},
          {year:"2001-2003",title:"Giai đoạn Chống khủng bố",color:RU_C.gold,desc:"Hợp tác an ninh sau 9/11 được kỳ vọng làm cầu nối quan hệ sâu hơn với phương Tây"},
          {year:"2008-2010",title:"Giai đoạn Hợp tác & Hiện đại hóa",color:RU_C.orange,desc:"Sau khủng hoảng tài chính toàn cầu, nỗ lực hợp tác hiện đại hóa kinh tế Nga với châu Âu"},
        ]}/>
        <RU_T style={{marginTop:8}}><RU_HL c={RU_C.blue}>Nhận định của tác giả:</RU_HL> "Người Nga nhận ra rằng tất cả những cam kết của châu Âu và Mỹ chỉ mang tính tình huống và sẵn sàng được bỏ qua hay nghĩ lại." Sau "quá tam ba bận", giới lãnh đạo Nga chuyển hẳn sang chiến lược tự thân vận động — đây là bối cảnh lịch sử quan trọng để hiểu vì sao Nga không còn coi trọng việc khôi phục quan hệ EU như một mục tiêu chiến lược khả thi.</RU_T>
      </RU_Card>

      <RU_Card style={{marginBottom:16}}>
        <RU_STitle color={RU_C.orange}>Khủng Hoảng Kaliningrad — Tiền Lệ Kỹ Thuật Cho Giải Pháp Ukraine? (07/2022)</RU_STitle>
        <RU_T>Từ bài "Bóng Ma Suy Thoái Lởn Vởn": một case study ít được chú ý về cách Nga-EU xử lý xung đột lãnh thổ mà tác giả cho là có thể là <RU_B>khuôn mẫu cho các giải pháp tương lai</RU_B>.</RU_T>
        <RU_T>Kaliningrad — vùng lãnh thổ Nga tách biệt, kẹp giữa Ba Lan và Lithuania — bị Lithuania cấm vận chuyển hàng hóa quá cảnh sau lệnh trừng phạt EU. Nga phản ứng dữ dội: đe dọa cắt điện Lithuania, đòi lại cảng Klaiped, thậm chí xem lại việc công nhận độc lập của Lithuania. Cuối cùng EU "giải thích lại" — chỉ cấm đường bộ, giữ nguyên đường sắt — khủng hoảng hạ nhiệt trong vài tuần.</RU_T>
        <div style={{marginTop:10,padding:12,background:`${RU_C.orange}08`,borderRadius:6,border:`1px solid ${RU_C.orange}20`}}>
          <span style={{color:RU_C.orange,fontWeight:700}}>Câu hỏi mở tác giả đặt ra: </span>
          <span style={{color:RU_C.text,fontSize:12.5}}>"Phải chăng đó là tiền lệ cho giải pháp Ucraina?" — gợi ý rằng các giải pháp thực dụng, thỏa hiệp kỹ thuật (không tuyên bố công khai nhượng bộ nguyên tắc) có thể là cách các xung đột lãnh thổ Nga-phương Tây được hóa giải trong thực tế, dù ngôn từ chính thức vẫn cứng rắn.</span>
        </div>
      </RU_Card>

      <RU_Card style={{marginBottom:16}}>
        <RU_STitle color={RU_C.purple}>Phân Hóa Lập Trường BRICS & Làn Sóng De-dollarization (2022-2023)</RU_STitle>
        <RU_T>Ghi nhận từ nhiều bài (07/2022 và 04/2023): mức độ ủng hộ Nga trong BRICS không đồng nhất — cho thấy giới hạn thực tế của khối này như một liên minh chống phương Tây thống nhất.</RU_T>
        <RU_Grid cols={2} gap={12} style={{marginTop:10}}>
          <div style={{padding:12,background:RU_C.card2,borderRadius:6}}>
            <div style={{color:RU_C.purple,fontSize:10,fontWeight:700,marginBottom:6}}>BỎ PHIẾU NGHỊ QUYẾT LÊN ÁN NGA (LHQ)</div>
            <div style={{color:RU_C.text,fontSize:12,lineHeight:1.8}}>
              • Nga: <span style={{color:RU_C.red}}>Chống</span><br/>
              • Brazil: <span style={{color:RU_C.blue}}>Thuận</span><br/>
              • Nam Phi, Ấn Độ, Trung Quốc: <span style={{color:RU_C.gold}}>Bỏ phiếu trắng</span>
            </div>
          </div>
          <div style={{padding:12,background:RU_C.card2,borderRadius:6}}>
            <div style={{color:RU_C.teal,fontSize:10,fontWeight:700,marginBottom:6}}>LÀN SÓNG DE-DOLLARIZATION 2022-23</div>
            <div style={{color:RU_C.text,fontSize:11.5,lineHeight:1.7}}>
              Brazil-TQ thanh toán bằng nội tệ; Ấn Độ trả dầu Nga bằng rupee/dirham/ruble; Saudi bán dầu cho TQ bằng NDT tại Sở GD Thượng Hải; Total Energies (Pháp) mua LNG từ TQ bằng NDT lần đầu
            </div>
          </div>
        </RU_Grid>
        <RU_T style={{marginTop:8}}><RU_HL c={RU_C.purple}>Nhận định:</RU_HL> Ba nước bỏ phiếu trắng (Nam Phi, Ấn Độ, Trung Quốc) cho thấy ngay cả các đối tác BRICS thân cận cũng giữ khoảng cách công khai với Nga tại các diễn đàn đa phương chính thức — dù vẫn hợp tác kinh tế song phương mạnh mẽ. Làn sóng thanh toán nội tệ lan rộng hơn Nga đơn lẻ, phản ánh xu hướng toàn cầu rộng hơn chứ không riêng phản ứng với chiến tranh Ukraine.</RU_T>
      </RU_Card>

      <RU_Card>
        <RU_STitle color={RU_C.red}>Điều Kiện Hòa Bình Ukraine Được Đồn Đoán (Draft, ~2025)</RU_STitle>
        <RU_T>Từ một bài viết dạng draft phân tích khả năng các điều khoản chấm dứt chiến tranh Nga-Ukraine dưới áp lực từ chính quyền Mỹ — mang tính suy đoán dựa trên phát biểu công khai của giới chức, cần đọc với sự thận trọng vì bản chất dự đoán chính trị:</RU_T>
        <div style={{padding:12,background:`${RU_C.red}08`,borderRadius:6,border:`1px solid ${RU_C.red}20`,marginTop:8}}>
          <div style={{color:RU_C.red,fontSize:10,fontWeight:700,marginBottom:6}}>ĐIỀU KIỆN ĐƯỢC NHẮC ĐẾN (theo đồn đoán/suy đoán của tác giả):</div>
          <div style={{color:RU_C.text,fontSize:12,lineHeight:1.7}}>
            • Ukraine từ bỏ yêu sách miền Đông, rút khỏi Kursk, không gia nhập NATO<br/>
            • Không có yêu cầu tương xứng rõ ràng đặt ra cho phía Nga ngoài ngừng bắn<br/>
            • Mỹ không cam kết tài chính tái thiết — kêu gọi châu Âu gánh vác phần lớn
          </div>
        </div>
        <RU_T style={{marginTop:8}}><RU_HL c={RU_C.gold}>Dữ liệu nhân khẩu học đi kèm:</RU_HL> Dân số Ukraine được ước tính giảm từ ~53 triệu (hậu Xô Viết) → 43 triệu (đầu 2022) → 28 triệu (cuối 2024), GDP giảm ~36%. Đây là các con số ước tính trong bài viết gốc, chưa được đối chiếu với số liệu thống kê chính thức độc lập, nên cần xem là ước tính tham khảo chứ không phải số liệu đã kiểm chứng.</RU_T>
      </RU_Card>
    </div>
  );
}

const RU_TABS = [
  {id:0,label:"Dashboard",icon:"📊"},
  {id:1,label:"Mô Hình Petrostate",icon:"🛢️"},
  {id:2,label:"Cấm Vận 2022",icon:"🚫"},
  {id:3,label:"Kinh Tế Chiến Tranh",icon:"⚔️"},
  {id:4,label:"Phụ Thuộc Trung Quốc",icon:"🐉"},
  {id:5,label:"Rủi Ro & Kịch Bản",icon:"⚠️"},
  {id:6,label:"Góc Chuyên Gia",icon:"🎓"},
];
const RU_CONTENT = [
  <RU_TabDashboard/>,<RU_TabModel/>,<RU_TabSanctions/>,<RU_TabWarEconomy/>,<RU_TabChina/>,<RU_TabRisks/>,<RU_TabExpert/>,
];

/* ==================== LIÊN MINH CHÂU ÂU (EU) ==================== */
const EU_C = {
  bg:"#FAF9F6", panel:"#FFFFFF", card:"#FFFFFF", card2:"#F2F4FB",
  border:"#E2E5EF", text:"#5B6472", bright:"#161A20", dim:"#8B93A0",
  muted:"#6B7280", navy:"#2C4CA0", gold:"#A9821E", red:"#B8443F",
  green:"#238F5E", blue:"#2A6BB8", purple:"#7255C9", orange:"#C46E30",
  euBlue:"#003399", euGold:"#A88400",
};

const EU_GDP_GROWTH = [
  {y:"2015",g:2.3},{y:"2016",g:2.0},{y:"2017",g:2.8},{y:"2018",g:2.1},
  {y:"2019",g:1.8},{y:"2020",g:-5.6},{y:"2021",g:6.0},{y:"2022",g:3.4},
  {y:"2023",g:0.4},{y:"2024",g:0.9},
];
const EU_INFLATION_EU_US = [
  {y:"1/22",eu:5.1,us:7.5},{y:"5/22",eu:8.1,us:8.6},{y:"10/22",eu:10.6,us:7.7},
  {y:"1/23",eu:8.6,us:6.4},{y:"6/23",eu:5.5,us:3.0},{y:"12/23",eu:2.9,us:3.4},
  {y:"6/24",eu:2.5,us:3.0},
];
const EU_DEBT_GDP_MEMBERS = [
  {c:"Đức",v:63},{c:"Pháp",v:112},{c:"Ý",v:137},{c:"Tây EU_B.Nha",v:105},
  {c:"Hy Lạp",v:159},{c:"Hà Lan",v:47},{c:"Ba Lan",v:50},
];
const EU_DEFENSE_SPEND = [
  {c:"Ba Lan",v:4.1},{c:"Estonia",v:3.4},{c:"Litva",v:2.9},
  {c:"Đức",v:2.1},{c:"Pháp",v:2.1},{c:"Ý",v:1.6},{c:"TB Nha",v:1.3},
];
const EU_GAS_DEPENDENCE = [
  {y:"2019",v:41},{y:"2021",v:45},{y:"2022",v:24},{y:"2023",v:9},{y:"2024",v:6},
];
const EU_TRADE_SURPLUS = [
  {c:"Đức",v:22},{c:"Ireland",v:19},{c:"Hà Lan",v:10},{c:"Ý",v:4},
  {c:"Pháp",v:-3},{c:"Tây EU_B.Nha",v:1},
];
const EU_RISK_RADAR = [
  {s:"Phân Mảnh CT",v:78},{s:"Năng Lượng",v:62},{s:"Nhân Khẩu",v:70},
  {s:"Cạnh Tranh CN",v:75},{s:"Nợ Công (Nam Âu)",v:65},{s:"An Ninh/NATO",v:58},
  {s:"Dân Túy",v:72},{s:"Năng Suất",v:60},
];
const EU_PIE_COLORS=[EU_C.euBlue,EU_C.gold,EU_C.red,EU_C.green,EU_C.purple,EU_C.dim];

const EU_TT = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  return (
    <div style={{background:EU_C.panel,border:`1px solid ${EU_C.border}`,borderRadius:6,padding:"8px 12px"}}>
      <div style={{color:EU_C.gold,fontSize:11,fontWeight:700,marginBottom:4}}>{label}</div>
      {payload.map((p,i)=>(
        <div key={i} style={{color:p.color||EU_C.bright,fontSize:12}}>
          {p.name}: <span style={{fontFamily:"monospace",fontWeight:700}}>{typeof p.value==="number"?p.value.toFixed(1):p.value}</span>
        </div>
      ))}
    </div>
  );
};
const EU_Card = ({children,style={}}) => (
  <div style={{background:EU_C.card,border:`1px solid ${EU_C.border}`,borderRadius:8,padding:20,...style}}>{children}</div>
);
const EU_STitle = ({children,color=EU_C.gold}) => (
  <div style={{color,fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",
    marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
    <div style={{width:14,height:2,background:color,borderRadius:1,flexShrink:0}}/>{children}
  </div>
);
const EU_T = ({children,style}) => <p style={{color:EU_C.text,fontSize:13.5,lineHeight:1.75,margin:"5px 0",...style}}>{children}</p>;
const EU_B = ({children}) => <span style={{color:EU_C.bright,fontWeight:600}}>{children}</span>;
const EU_HL = ({children,c=EU_C.gold}) => <span style={{color:c,fontWeight:600}}>{children}</span>;
const EU_Metric = ({label,value,sub,color=EU_C.blue,warn}) => (
  <div style={{background:EU_C.card,border:`1px solid ${EU_C.border}`,borderRadius:8,
    padding:"14px 16px",borderTop:`3px solid ${color}`}}>
    <div style={{color:EU_C.muted,fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>{label}</div>
    <div style={{color,fontSize:22,fontWeight:700,fontFamily:"monospace",letterSpacing:"-0.02em"}}>{value}</div>
    {sub&&<div style={{color:EU_C.dim,fontSize:11,marginTop:3}}>{sub}</div>}
    {warn&&<div style={{color:EU_C.red,fontSize:10,marginTop:2,fontWeight:700}}>{warn}</div>}
  </div>
);
const EU_Badge = ({level}) => {
  const m={"Rất Cao":"#B8222C",Cao:EU_C.red,"Trung Bình":EU_C.gold,Thấp:EU_C.green};
  const c=m[level]||EU_C.gold;
  return <span style={{background:c+"20",color:c,border:`1px solid ${c}40`,
    borderRadius:4,padding:"2px 8px",fontSize:10,fontWeight:700}}>{level}</span>;
};
const EU_Grid = ({cols=2,gap=16,children,style}) => (
  <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap,...style}}>{children}</div>
);
const EU_TL = ({events}) => (
  <div style={{position:"relative",paddingLeft:22}}>
    <div style={{position:"absolute",left:7,top:4,bottom:4,width:1.5,background:EU_C.border}}/>
    {events.map((e,i)=>(
      <div key={i} style={{marginBottom:14,position:"relative"}}>
        <div style={{position:"absolute",left:-18,top:4,width:9,height:9,borderRadius:"50%",
          background:e.color||EU_C.gold,boxShadow:`0 0 6px ${e.color||EU_C.gold}60`}}/>
        <div style={{color:e.color||EU_C.gold,fontSize:10,fontWeight:700,letterSpacing:"0.06em"}}>{e.year}</div>
        <div style={{color:EU_C.bright,fontSize:13,fontWeight:600,marginTop:1}}>{e.title}</div>
        <div style={{color:EU_C.text,fontSize:12,lineHeight:1.6,marginTop:2}}>{e.desc}</div>
      </div>
    ))}
  </div>
);

function EU_TabDashboard() {
  return (
    <div>
      <div style={{marginBottom:20,padding:"16px 20px",background:EU_C.panel,borderRadius:8,
        border:`1px solid ${EU_C.border}`,borderLeft:`4px solid ${EU_C.euGold}`}}>
        <div style={{color:EU_C.euGold,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>LUẬN ĐIỂM CỐT LÕI</div>
        <p style={{color:EU_C.bright,fontSize:14,lineHeight:1.75,margin:0}}>
          EU là <EU_HL c={EU_C.euBlue}>liên minh tiền tệ không có liên minh tài khóa tương xứng</EU_HL> — lỗi thiết kế từ khi thành lập Euro.
          Khối 27 nước phụ thuộc vào cạnh tranh ảnh hưởng Đức-Pháp, thiếu nội lực gắn kết độc lập với Mỹ về an ninh, và đang đối mặt
          đồng thời <EU_HL c={EU_C.red}>già hóa dân số</EU_HL>, <EU_HL c={EU_C.orange}>tụt hậu công nghệ</EU_HL>, và <EU_HL c={EU_C.purple}>phân mảnh chính trị</EU_HL> —
          trong khi vẫn là thị trường chung lớn thứ 2 thế giới với đồng tiền dự trữ lớn thứ 2 toàn cầu.
        </p>
      </div>
      <EU_Grid cols={3} gap={12} style={{marginBottom:16}}>
        <EU_Metric label="Tăng Trưởng GDP 2024" value="0.9%" sub="Thấp hơn nhiều Mỹ (2.8%)" color={EU_C.orange}/>
        <EU_Metric label="Nợ Công Ý" value="137% GDP" sub="Rủi ro phân mảnh nợ Eurozone" color={EU_C.red}/>
        <EU_Metric label="Phụ Thuộc Khí Đốt Nga" value="6%" sub="Giảm từ 45% (2021)" color={EU_C.green}/>
        <EU_Metric label="Lạm Phát Đỉnh 2022" value="10.6%" sub="Cao hơn cả đỉnh Mỹ (9.1%)" color={EU_C.red} warn="ECB phản ứng chậm hơn Fed"/>
        <EU_Metric label="Thị Phần EUR Dự Trữ TC" value="~20%" sub="Đứng thứ 2 sau USD (58%)" color={EU_C.euBlue}/>
        <EU_Metric label="Chi Quốc Phòng TB (Tây Âu)" value="~1.8%" sub="Dưới ngưỡng NATO 2% GDP" color={EU_C.gold}/>
      </EU_Grid>
      <EU_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <EU_Card>
          <EU_STitle>Tăng Trưởng GDP Eurozone 2015–2024 (%)</EU_STitle>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={EU_GDP_GROWTH} margin={{top:5,right:10,bottom:5,left:-20}}>
              <defs>
                <linearGradient id="gG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={EU_C.euBlue} stopOpacity={0.35}/>
                  <stop offset="95%" stopColor={EU_C.euBlue} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="y" tick={{fill:EU_C.dim,fontSize:10}} axisLine={{stroke:EU_C.border}} tickLine={false}/>
              <YAxis tick={{fill:EU_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <Tooltip content={<EU_TT/>}/>
              <Area type="monotone" dataKey="g" stroke={EU_C.euBlue} fill="url(#gG)" strokeWidth={2} name="GDP %"/>
            </AreaChart>
          </ResponsiveContainer>
        </EU_Card>
        <EU_Card>
          <EU_STitle>Radar Rủi Ro Cấu Trúc (0–100)</EU_STitle>
          <ResponsiveContainer width="100%" height={210}>
            <RadarChart data={EU_RISK_RADAR} margin={{top:5,right:25,bottom:5,left:25}}>
              <PolarGrid stroke={EU_C.border}/>
              <PolarAngleAxis dataKey="s" tick={{fill:EU_C.dim,fontSize:9}}/>
              <PolarRadiusAxis angle={90} domain={[0,100]} tick={{fill:EU_C.dim,fontSize:8}}/>
              <Radar dataKey="v" stroke={EU_C.red} fill={EU_C.red} fillOpacity={0.22} strokeWidth={1.5} name="Rủi Ro"/>
            </RadarChart>
          </ResponsiveContainer>
        </EU_Card>
      </EU_Grid>
      <EU_Card style={{marginBottom:16}}>
        <EU_STitle color={EU_C.red}>Lạm Phát EU vs Mỹ 2022–2024 (%) — ECB Phản Ứng Chậm Hơn</EU_STitle>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={EU_INFLATION_EU_US} margin={{top:5,right:20,bottom:5,left:-10}}>
            <XAxis dataKey="y" tick={{fill:EU_C.dim,fontSize:10}} axisLine={{stroke:EU_C.border}} tickLine={false}/>
            <YAxis tick={{fill:EU_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip content={<EU_TT/>}/>
            <Legend wrapperStyle={{color:EU_C.dim,fontSize:11}}/>
            <Line type="monotone" dataKey="eu" stroke={EU_C.euBlue} strokeWidth={2.5} dot={{r:3}} name="Eurozone CPI %"/>
            <Line type="monotone" dataKey="us" stroke={EU_C.red} strokeWidth={2.5} dot={{r:3}} name="Mỹ CPI %"/>
          </LineChart>
        </ResponsiveContainer>
        <div style={{color:EU_C.dim,fontSize:11,marginTop:4}}>Eurozone đạt đỉnh 10.6% (10/2022) — cao hơn đỉnh Mỹ 9.1% — do cú sốc năng lượng Nga trực tiếp hơn</div>
      </EU_Card>
      <EU_Grid cols={3} gap={12}>
        {[
          {n:"Kịch Bản 1",t:"Cải Cách Sâu + Liên Minh Tài Khóa",p:"15–20%",c:EU_C.green,
            d:"EU tiến tới liên minh tài khóa thực chất, phát hành trái phiếu chung quy mô lớn, tăng chi quốc phòng đồng bộ. Đòi hỏi đồng thuận chính trị hiếm có."},
          {n:"Kịch Bản 2 — CƠ SỞ",t:"Muddle Through Kéo Dài",p:"50–55%",c:EU_C.gold,
            d:"Tăng trưởng thấp 0.5-1.5%/năm kéo dài, phân mảnh Bắc-Nam tiếp diễn, cải cách từng phần chậm chạp. Không khủng hoảng lớn nhưng cũng không bứt phá."},
          {n:"Kịch Bản 3",t:"Khủng Hoảng Phân Mảnh Nợ",p:"25–30%",c:EU_C.red,
            d:"Nợ công Ý/Nam Âu vượt kiểm soát, spread lợi suất trái phiếu nới rộng mạnh, ECB buộc can thiệp khẩn cấp lặp lại kiểu 2012, dân túy thắng thế nhiều nước."},
        ].map((s,i)=>(
          <div key={i} style={{background:EU_C.card,border:`1px solid ${EU_C.border}`,borderRadius:8,
            padding:16,borderTop:`3px solid ${s.c}`}}>
            <div style={{color:EU_C.muted,fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase"}}>{s.n}</div>
            <div style={{color:s.c,fontSize:13,fontWeight:700,margin:"4px 0"}}>{s.t}</div>
            <div style={{color:s.c,fontSize:20,fontWeight:700,fontFamily:"monospace",marginBottom:8}}>{s.p}</div>
            <div style={{color:EU_C.text,fontSize:12,lineHeight:1.65}}>{s.d}</div>
          </div>
        ))}
      </EU_Grid>
    </div>
  );
}

function EU_TabModel() {
  return (
    <div>
      <EU_Card style={{marginBottom:16,borderLeft:`4px solid ${EU_C.euBlue}`}}>
        <EU_STitle color={EU_C.euBlue}>Liên Minh Tiền Tệ Không Có Liên Minh Tài Khóa — Lỗi Thiết Kế Từ 1988</EU_STitle>
        <EU_T>Báo cáo của Ủy ban Delors (1988-89, tác giả chính là Giáo sư Niels Thygesen) vạch đường cho Liên minh Kinh tế và Tiền tệ (EMU) và sự ra đời của đồng Euro. Nhưng ngay từ đầu, <EU_B>EMU/Euro được sinh ra mà không có nền tảng thích hợp là liên minh tài khóa</EU_B> — 20 nước Eurozone dùng chung một đồng tiền, một lãi suất do ECB quyết định, nhưng mỗi nước tự chủ hoàn toàn về ngân sách, thuế, chi tiêu.</EU_T>
        <div style={{margin:"12px 0",padding:16,background:EU_C.card2,borderRadius:8,border:`1px solid ${EU_C.border}`}}>
          <div style={{color:EU_C.euBlue,fontSize:10,fontWeight:700,marginBottom:10,letterSpacing:"0.08em"}}>HỆ QUẢ CỦA LỖI THIẾT KẾ:</div>
          {[
            {n:"01",t:"Một lãi suất chung không phù hợp với mọi nền kinh tế thành viên có cấu trúc khác nhau",c:EU_C.blue},
            {n:"02",t:"Khủng hoảng nợ công Hy Lạp/Nam Âu 2010-2012 phơi bày lỗ hổng — không có 'người cho vay cuối cùng' rõ ràng",c:EU_C.red},
            {n:"03",t:"ECB phải hành động ngoài khuôn khổ ban đầu — 'Whatever it takes' 2012 là bước ngoặt",c:EU_C.gold},
            {n:"04",t:"Đến nay vẫn chưa có trái phiếu chung EU quy mô lớn, thường trực — chỉ có các gói tạm thời (NextGenerationEU sau COVID)",c:EU_C.orange},
          ].map(s=>(
            <div key={s.n} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
              <div style={{color:s.c,fontWeight:700,fontFamily:"monospace",fontSize:11,minWidth:22}}>{s.n}</div>
              <div style={{color:EU_C.text,fontSize:12.5,lineHeight:1.65}}>→ {s.t}</div>
            </div>
          ))}
        </div>
        <EU_T>Nhưng cũng giống EMU/Euro, tác giả Steen Jakobsen (Saxo Bank) nhận định: <EU_HL>"tất cả chúng ta đều đánh giá thấp vốn liếng chính trị đã đầu tư"</EU_HL> — đồng Euro "buộc phải thành công" vì quá nhiều vốn chính trị đã bỏ vào, tương tự cách ESG/Green Transformation đang được đầu tư chính trị quy mô toàn cầu ngày nay.</EU_T>
      </EU_Card>
      <EU_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <EU_Card>
          <EU_STitle color={EU_C.gold}>"Whatever It Takes" — Khoảnh Khắc Draghi 2012</EU_STitle>
          <EU_T>Tại đỉnh điểm khủng hoảng nợ công châu Âu (Hy Lạp, Ý, Tây Ban Nha, Bồ Đào Nha, Ireland), Chủ tịch ECB Mario Draghi phát biểu tại Hội nghị đầu tư toàn cầu London 26/7/2012:</EU_T>
          <div style={{margin:"10px 0",padding:14,background:EU_C.card2,borderRadius:8,border:`1px solid ${EU_C.gold}30`,borderLeft:`4px solid ${EU_C.gold}`}}>
            <div style={{color:EU_C.text,fontSize:13,lineHeight:1.7,fontStyle:"italic"}}>
              "Trong thẩm quyền của mình, ECB sẵn sàng làm bất cứ điều gì cần thiết để bảo vệ đồng Euro. Và tin tôi đi, sẽ làm được."
            </div>
          </div>
          <EU_T>Câu nói này chấm dứt làn sóng đầu cơ chống lại khả năng tồn tại của đồng Euro — trở thành cam kết chính trị mang tính biểu tượng, minh chứng cho việc ECB sẵn sàng can thiệp vượt khuôn khổ ban đầu khi hệ thống bị đe dọa tồn vong.</EU_T>
        </EU_Card>
        <EU_Card>
          <EU_STitle color={EU_C.purple}>Brexit — Hệ Quả Tất Yếu Của Mở Rộng Thiếu Kiểm Soát</EU_STitle>
          <EU_T>Nhận định sắc bén: <EU_B>"EU càng kết nạp nhiều thành viên theo các động cơ chính trị thì sự khác biệt Kinh tế-Văn hóa-Chính trị càng lớn và tính hiệu quả trong điều hành càng kém."</EU_B></EU_T>
          <div style={{padding:12,background:`${EU_C.purple}08`,borderRadius:6,border:`1px solid ${EU_C.purple}20`,marginTop:8}}>
            <EU_T style={{margin:0}}>Anh "chịu không được nhiệt" và rút khỏi EU một phần chính vì lý do này. EU càng to, sự khác biệt càng lớn, nguy cơ tan vỡ càng cao — khối tồn tại thiếu nội lực mạnh, tính gắn kết mang đậm ý chí chính trị và sự tranh hùng thủ lĩnh giữa Đức-Pháp, khiến <EU_HL c={EU_C.purple}>cả khối phụ thuộc vào bên ngoài (Mỹ) về an ninh</EU_HL>.</EU_T>
          </div>
        </EU_Card>
      </EU_Grid>
      <EU_Card>
        <EU_STitle color={EU_C.euBlue}>Cấu Trúc Đức-Pháp — "Lưỡng Đầu" Thiếu Thủ Lĩnh Thống Nhất</EU_STitle>
        <EU_T>Không giống Mỹ (một trung tâm quyền lực rõ ràng) hay Trung Quốc (một Đảng lãnh đạo tuyệt đối), EU vận hành theo mô hình <EU_B>cạnh tranh ảnh hưởng song song</EU_B> giữa hai nền kinh tế lớn nhất khối — không bên nào đủ mạnh để áp đặt định hướng chung, dẫn đến quyết sách chậm, thỏa hiệp thường xuyên, và khó phản ứng nhanh trước khủng hoảng.</EU_T>
        <EU_Grid cols={2} gap={16} style={{marginTop:10}}>
          <div style={{padding:12,background:EU_C.card2,borderRadius:6}}>
            <div style={{color:EU_C.gold,fontSize:10,fontWeight:700,marginBottom:6}}>ĐỨC — ĐỘNG CƠ XUẤT KHẨU</div>
            <div style={{color:EU_C.text,fontSize:12,lineHeight:1.7}}>Mô hình tăng trưởng dựa vào xuất khẩu công nghiệp (ô tô, máy móc), thặng dư thương mại lớn nhất khối, nhưng phụ thuộc nặng năng lượng nhập khẩu (từng chủ yếu từ Nga) và thị trường Trung Quốc.</div>
          </div>
          <div style={{padding:12,background:EU_C.card2,borderRadius:6}}>
            <div style={{color:EU_C.blue,fontSize:10,fontWeight:700,marginBottom:6}}>PHÁP — ĐỘNG CƠ CHÍNH TRỊ-QUÂN SỰ</div>
            <div style={{color:EU_C.text,fontSize:12,lineHeight:1.7}}>Vai trò dẫn dắt chính trị-ngoại giao EU, năng lực quân sự-hạt nhân độc lập duy nhất trong khối hậu Brexit, nhưng nợ công cao (112% GDP) và bất ổn chính trị nội bộ thường xuyên.</div>
          </div>
        </EU_Grid>
      </EU_Card>
    </div>
  );
}

function EU_TabECB() {
  return (
    <div>
      <EU_Card style={{marginBottom:16}}>
        <EU_STitle color={EU_C.red}>Lagarde 2022 — Tranh Cãi Về Nguồn Gốc Lạm Phát</EU_STitle>
        <EU_T>Khi lạm phát Eurozone áp sát 8% (giữa 2022) so mục tiêu 2%, Chủ tịch ECB Christine Lagarde phát biểu tại Diễn đàn Kinh tế Thế giới Davos:</EU_T>
        <div style={{margin:"10px 0",padding:14,background:EU_C.card2,borderRadius:8,border:`1px solid ${EU_C.red}30`,borderLeft:`4px solid ${EU_C.red}`}}>
          <div style={{color:EU_C.text,fontSize:13,lineHeight:1.7,fontStyle:"italic"}}>
            "Tôi không nghĩ rằng chúng ta đang ở trong tình huống Cầu tăng vọt. Chắc chắn lạm phát bị đẩy bởi phía Cung của nền kinh tế."
          </div>
        </div>
        <EU_T><EU_HL c={EU_C.red}>Phê bình:</EU_HL> Phát biểu này bị đánh giá là đổ hoàn toàn trách nhiệm lạm phát lên phía Cung (đứt gãy chuỗi cung ứng, chiến tranh Ukraine) mà bỏ qua vai trò của chính ECB trong việc bơm tiền ồ ạt nhiều năm trước đó — tạo tiền đề Cầu vượt mức. Câu kết luận thêm của bà: <em>"We don't have to rush and we don't have to panic"</em> ("Chúng ta không cần vội vã và cũng chả nên hoảng hốt") bị đọc ngược: chính cách nói trấn an lặp lại nhiều lần là dấu hiệu ECB đang thực sự <EU_B>vội vã và hoảng hốt</EU_B>.</EU_T>
      </EU_Card>
      <EU_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <EU_Card>
          <EU_STitle color={EU_C.orange}>Nguy Cơ Stagflation Không Đồng Đều</EU_STitle>
          <EU_T>UBS cảnh báo rủi ro <EU_B>lạm phát đình trệ (stagflation)</EU_B> tại châu Âu — nhưng mức độ ảnh hưởng khác biệt rõ giữa các thành viên do một chính sách tiền tệ chung áp cho các cấu trúc kinh tế rất khác nhau:</EU_T>
          <div style={{padding:12,background:`${EU_C.orange}08`,borderRadius:6,border:`1px solid ${EU_C.orange}20`,marginTop:8}}>
            <div style={{color:EU_C.orange,fontSize:11,fontWeight:700,marginBottom:6}}>ĐỨC — CHỊU NẶNG NHẤT</div>
            <div style={{color:EU_C.text,fontSize:12}}>Phụ thuộc năng lượng nhập khẩu + xuất khẩu công nghiệp nhạy cảm với chi phí năng lượng cao</div>
          </div>
          <div style={{padding:12,background:`${EU_C.green}08`,borderRadius:6,border:`1px solid ${EU_C.green}20`,marginTop:8}}>
            <div style={{color:EU_C.green,fontSize:11,fontWeight:700,marginBottom:6}}>PHÁP & TÂY BAN NHA — ĐỠ HƠN</div>
            <div style={{color:EU_C.text,fontSize:12}}>Cơ cấu năng lượng đa dạng hơn (Pháp: điện hạt nhân), ít phụ thuộc xuất khẩu công nghiệp nặng</div>
          </div>
        </EU_Card>
        <EU_Card>
          <EU_STitle color={EU_C.red}>Nợ Công Phân Mảnh — Rủi Ro "TARGET2" Kiểu Mới</EU_STitle>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={EU_DEBT_GDP_MEMBERS} layout="vertical" margin={{top:5,right:30,bottom:5,left:10}}>
              <XAxis type="number" tick={{fill:EU_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis type="category" dataKey="c" tick={{fill:EU_C.text,fontSize:11}} axisLine={false} tickLine={false} width={70}/>
              <Tooltip content={<EU_TT/>}/>
              <Bar dataKey="v" name="Nợ/GDP (%)" radius={[0,4,4,0]}>
                {EU_DEBT_GDP_MEMBERS.map((d,i)=><Cell key={i} fill={d.v>100?EU_C.red:d.v>70?EU_C.orange:EU_C.green}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{color:EU_C.dim,fontSize:11,marginTop:4}}>Hy Lạp 159%, Ý 137% — vẫn ở vùng rủi ro cao dù đã qua đỉnh khủng hoảng 2012</div>
        </EU_Card>
      </EU_Grid>
      <EU_Card>
        <EU_STitle color={EU_C.gold}>Timeline Khủng Hoảng Nợ Công Châu Âu — Bài Học Chưa Cũ</EU_STitle>
        <EU_TL events={[
          {year:"2009-2010",title:"Khủng hoảng nợ Hy Lạp bùng phát",color:EU_C.red,desc:"Thâm hụt ngân sách thực tế cao gấp nhiều lần công bố — châm ngòi khủng hoảng niềm tin toàn Eurozone"},
          {year:"2011-2012",title:"Lan sang Ý, Tây Ban Nha, Bồ Đào Nha, Ireland",color:EU_C.orange,desc:"Lợi suất trái phiếu các nước Nam Âu tăng vọt — nguy cơ Eurozone tan rã lần đầu được đặt ra nghiêm túc"},
          {year:"7/2012",title:'Draghi: "Whatever it takes"',color:EU_C.gold,desc:"Cam kết ECB can thiệp không giới hạn — chấm dứt làn sóng đầu cơ chống Euro"},
          {year:"2020",title:"NextGenerationEU — gói phục hồi COVID",color:EU_C.blue,desc:"Lần đầu EU phát hành nợ chung quy mô lớn (€800 tỷ) — bước tiến nhỏ hướng tới liên minh tài khóa nhưng vẫn mang tính tạm thời"},
        ]}/>
      </EU_Card>
    </div>
  );
}

function EU_TabEnergy() {
  return (
    <div>
      <EU_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <EU_Card>
          <EU_STitle color={EU_C.red}>Phụ Thuộc Khí Đốt Nga — Từ 45% Xuống 6%</EU_STitle>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={EU_GAS_DEPENDENCE} margin={{top:5,right:10,bottom:5,left:-10}}>
              <defs>
                <linearGradient id="gasG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={EU_C.red} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={EU_C.red} stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="y" tick={{fill:EU_C.dim,fontSize:10}} axisLine={{stroke:EU_C.border}} tickLine={false}/>
              <YAxis tick={{fill:EU_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <Tooltip content={<EU_TT/>}/>
              <Area type="monotone" dataKey="v" stroke={EU_C.red} fill="url(#gasG)" strokeWidth={2} name="% nhập khẩu khí đốt từ Nga"/>
            </AreaChart>
          </ResponsiveContainer>
          <div style={{color:EU_C.dim,fontSize:11,marginTop:4}}>Chuyển đổi nhanh chưa từng có nhưng với chi phí kinh tế rất lớn (LNG đắt hơn, hợp đồng dài hạn mới)</div>
        </EU_Card>
        <EU_Card>
          <EU_STitle color={EU_C.orange}>Khủng Hoảng Kaliningrad — Phép Thử Đầu Tiên (2022)</EU_STitle>
          <EU_T>Kaliningrad — lãnh thổ Nga tách biệt, kẹp giữa Ba Lan và Lithuania — trở thành điểm nóng khi Lithuania cấm vận chuyển hàng hóa quá cảnh sau lệnh trừng phạt EU.</EU_T>
          <div style={{padding:12,background:`${EU_C.orange}08`,borderRadius:6,border:`1px solid ${EU_C.orange}20`,marginTop:8}}>
            <div style={{color:EU_C.orange,fontSize:10,fontWeight:700,marginBottom:6}}>DIỄN BIẾN:</div>
            <div style={{color:EU_C.text,fontSize:12,lineHeight:1.7}}>
              Nga đe dọa mạnh: cắt điện Lithuania, đòi lại cảng Klaiped, xem lại công nhận độc lập Lithuania → EU "giải thích lại": chỉ cấm đường bộ, giữ đường sắt → khủng hoảng hạ nhiệt trong vài tuần
            </div>
          </div>
          <EU_T style={{marginTop:8}}><EU_HL c={EU_C.orange}>Ý nghĩa:</EU_HL> Minh chứng cho thấy dù EU-Nga đối đầu công khai gay gắt, các thỏa hiệp kỹ thuật thực dụng (không tuyên bố nhượng bộ nguyên tắc) vẫn diễn ra khi lợi ích cả hai bên bị đe dọa trực tiếp.</EU_T>
        </EU_Card>
      </EU_Grid>
      <EU_Card>
        <EU_STitle color={EU_C.blue}>Chi Phí Chuyển Đổi Năng Lượng — Ai Trả Giá?</EU_STitle>
        <EU_T>Việc EU dẫn đầu thúc đẩy ESG/Green Transformation toàn cầu (đồng thời với Mỹ) có một chiều kích ít được nói đến: một phần động lực là <EU_B>giảm phụ thuộc vào Nga</EU_B> — đối thủ địa chính trị — bằng cách đẩy nhanh thay thế nguyên liệu hóa thạch. Nhưng bản thân EU cũng phải trả chi phí kinh tế rất lớn cho quá trình này.</EU_T>
        <EU_Grid cols={2} gap={12} style={{marginTop:10}}>
          <div style={{padding:12,background:EU_C.card2,borderRadius:6}}>
            <div style={{color:EU_C.red,fontSize:10,fontWeight:700,marginBottom:6}}>CHI PHÍ NGẮN HẠN</div>
            <div style={{color:EU_C.text,fontSize:12,lineHeight:1.7}}>
              • Giá năng lượng tăng vọt 2022, đẩy lạm phát lên đỉnh 10.6%<br/>
              • Công nghiệp nặng Đức mất lợi thế cạnh tranh chi phí<br/>
              • Đầu tư hạ tầng LNG mới tốn kém, thời gian hoàn vốn dài
            </div>
          </div>
          <div style={{padding:12,background:EU_C.card2,borderRadius:6}}>
            <div style={{color:EU_C.green,fontSize:10,fontWeight:700,marginBottom:6}}>LỢI ÍCH DÀI HẠN (kỳ vọng)</div>
            <div style={{color:EU_C.text,fontSize:12,lineHeight:1.7}}>
              • Giảm đòn bẩy địa chính trị của Nga trong dài hạn<br/>
              • Dẫn đầu chuẩn mực công nghệ xanh toàn cầu (pin, hydro)<br/>
              • Đa dạng hóa nguồn cung an ninh năng lượng bền vững hơn
            </div>
          </div>
        </EU_Grid>
      </EU_Card>
    </div>
  );
}

function EU_TabPolitics() {
  return (
    <div>
      <EU_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <EU_Card>
          <EU_STitle color={EU_C.gold}>Chi Tiêu Quốc Phòng / GDP (%) — Khoảng Cách Đông-Tây</EU_STitle>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={EU_DEFENSE_SPEND} layout="vertical" margin={{top:5,right:30,bottom:5,left:10}}>
              <XAxis type="number" tick={{fill:EU_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis type="category" dataKey="c" tick={{fill:EU_C.text,fontSize:11}} axisLine={false} tickLine={false} width={65}/>
              <Tooltip content={<EU_TT/>}/>
              <Bar dataKey="v" name="% GDP" radius={[0,4,4,0]}>
                {EU_DEFENSE_SPEND.map((d,i)=><Cell key={i} fill={d.v>=2?EU_C.green:EU_C.orange}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{color:EU_C.dim,fontSize:11,marginTop:4}}>Ngưỡng NATO 2% GDP — Ba Lan/Baltic vượt xa, Tây Âu (trừ Đức gần đây) dưới chuẩn nhiều năm</div>
        </EU_Card>
        <EU_Card>
          <EU_STitle color={EU_C.red}>Cảnh Báo Từ Washington Về NATO (Rubio, 2025)</EU_STitle>
          <EU_T>Góc nhìn trực tiếp từ phía hoạch định chính sách Mỹ về vấn đề "ăn theo" an ninh của Tây Âu:</EU_T>
          <div style={{margin:"10px 0",padding:14,background:EU_C.card2,borderRadius:8,border:`1px solid ${EU_C.red}30`,borderLeft:`4px solid ${EU_C.red}`}}>
            <div style={{color:EU_C.text,fontSize:12.5,lineHeight:1.7,fontStyle:"italic"}}>
              "Các quốc gia như Pháp, Đức — những nền kinh tế lớn, hùng mạnh — họ không chi nhiều cho an ninh quốc gia... Đó không phải là liên minh nữa rồi. Đó là sự phụ thuộc."
            </div>
          </div>
          <EU_T>Lập luận: các nước Tây Âu dựa vào quân đội Mỹ bảo vệ để dồn ngân sách cho phúc lợi xã hội (nghỉ hưu sớm, trợ cấp thất nghiệp) thay vì quốc phòng — trong khi các nước gần Nga (Ba Lan, Baltic) chi tỷ lệ GDP cao hơn nhiều vì cảm nhận trực tiếp mối đe dọa.</EU_T>
        </EU_Card>
      </EU_Grid>

      <EU_Card style={{marginBottom:16}}>
        <EU_STitle color={EU_C.crimson||EU_C.red}>ReArm Europe / Readiness 2030 — Kế Hoạch Tái Vũ Trang €800 Tỷ</EU_STitle>
        <EU_T>Tháng 3/2025, Chủ tịch Ủy ban EU Ursula von der Leyen công bố kế hoạch huy động <EU_B>€800 tỷ cho quốc phòng đến 2030</EU_B> — phản ứng trực tiếp trước lo ngại Mỹ giảm cam kết an ninh và chiến tranh Ukraine kéo dài.</EU_T>
        <div style={{margin:"10px 0",padding:14,background:EU_C.card2,borderRadius:8,border:`1px solid ${EU_C.border}`}}>
          <div style={{color:EU_C.gold,fontSize:10,fontWeight:700,marginBottom:10,letterSpacing:"0.08em"}}>HAI TRỤ CỘT TÀI CHÍNH:</div>
          {[
            {n:"01",t:"Kích hoạt 'National Escape Clause' của Hiệp ước Ổn định-Tăng trưởng — cho phép các nước tăng chi quốc phòng 1.5% GDP/năm mà không vi phạm trần thâm hụt 3% — tạo ~€650 tỷ dư địa tài khóa trong 4 năm",c:EU_C.blue},
            {n:"02",t:"Công cụ vay chung SAFE (Security Action for Europe) trị giá €150 tỷ — huy động trên thị trường vốn, giải ngân theo kế hoạch quốc gia — đã có 19/27 nước đăng ký vay",c:EU_C.gold},
          ].map(s=>(
            <div key={s.n} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
              <div style={{color:s.c,fontWeight:700,fontFamily:"monospace",fontSize:11,minWidth:22}}>{s.n}</div>
              <div style={{color:EU_C.text,fontSize:12.5,lineHeight:1.65}}>→ {s.t}</div>
            </div>
          ))}
        </div>
        <EU_Grid cols={3} gap={10} style={{marginTop:10}}>
          <EU_Metric label="Chi QP EU-27 (2021)" value="€218 tỷ" sub="Trước chiến tranh Ukraine" color={EU_C.dim}/>
          <EU_Metric label="Chi QP EU-27 (2025)" value="~€392 tỷ" sub="2.1% GDP — lần đầu vượt ngưỡng NATO 2%" color={EU_C.gold}/>
          <EU_Metric label="Mục Tiêu NATO 2035" value="5% GDP" sub="3.5% cốt lõi + 1.5% hạ tầng-an ninh mạng" color={EU_C.red} warn="Tây Ban Nha từ chối cam kết"/>
        </EU_Grid>
        <EU_T style={{marginTop:10}}>Đức đã thông qua cải cách "phanh nợ" (debt brake) lịch sử tháng 3/2025, cho phép chi quốc phòng vượt 1% GDP nằm ngoài giới hạn nợ hiến định — lần đầu tiên phá vỡ nguyên tắc tài khóa bảo thủ tồn tại nhiều thập kỷ. Ba Lan dẫn đầu khối với 4.7% GDP (2025), hướng tới 5% năm 2026 — cao nhất NATO.</EU_T>
      </EU_Card>

      <EU_Card style={{marginBottom:16}}>
        <EU_STitle color={EU_C.red}>Khủng Hoảng Phi Công Nghiệp Hóa Đức — "Rơi Tự Do"</EU_STitle>
        <EU_T>Đức — đầu tàu công nghiệp EU — đang trải qua điều mà Chủ tịch Liên đoàn Công nghiệp Đức (BDI) Peter Leibinger gọi là <EU_B>"cuộc khủng hoảng sâu sắc nhất trong lịch sử Cộng hòa Liên bang"</EU_B>, bước sang năm suy thoái/đình trệ thứ 3-4 liên tiếp — điều chưa từng xảy ra thời hậu chiến.</EU_T>
        <EU_TL events={[
          {year:"9/2024",title:"Volkswagen cân nhắc đóng cửa nhà máy lần đầu trong 87 năm",color:EU_C.red,desc:"CFO VW: chi phí vận hành tại Đức 'hoàn toàn không cạnh tranh nổi' — đề xuất cắt lương 10%, đóng ít nhất 3 nhà máy"},
          {year:"12/2024",title:"100,000 công nhân đình công cảnh báo",color:EU_C.orange,desc:"VW đồng ý với công đoàn IG Metall cắt 35,000 việc làm (1/4 nhân sự Đức) — chấm dứt thỏa thuận bảo đảm việc làm từ 1994"},
          {year:"2025",title:"Bosch cắt 13,000 việc làm, BASF đóng 3 dây chuyền Ludwigshafen",color:EU_C.crimson||EU_C.red,desc:"Khủng hoảng lan ra ngoài ô tô — hóa chất, linh kiện đều bị ảnh hưởng bởi chi phí năng lượng cao và cạnh tranh Trung Quốc"},
          {year:"9/2025",title:"120,000 việc làm công nghiệp mất trong 12 tháng",color:EU_C.red,desc:"Riêng ngành ô tô mất 49,000 việc (6.3% lực lượng lao động ngành) — tính từ 2019 đã mất gần 272,000 việc làm công nghiệp (4.8%)"},
        ]}/>
        <div style={{marginTop:10,padding:12,background:`${EU_C.red}08`,borderRadius:6,border:`1px solid ${EU_C.red}20`}}>
          <span style={{color:EU_C.red,fontWeight:700}}>Nguyên nhân cấu trúc: </span>
          <span style={{color:EU_C.text,fontSize:12.5}}>(1) Giá năng lượng cao gấp ~2 lần trước 2022 sau khi mất 80% nguồn khí đốt đường ống Nga; (2) Trung Quốc từ đối tác thương mại trở thành <EU_HL c={EU_C.red}>đối thủ trực tiếp</EU_HL> — tự sản xuất trong nước những gì từng nhập từ Đức; (3) Thuế quan Mỹ 15% (giảm từ đề xuất 25%) lên ô tô-linh kiện EU làm giảm 37% lợi nhuận hoạt động VW quý 1/2025; (4) BYD tăng doanh số 252% tại châu Âu trong khi Tesla giảm 55% tại Đức (7/2025).</span>
        </div>
      </EU_Card>

      <EU_Card style={{marginBottom:16}}>
        <EU_STitle color={EU_C.purple}>Thuế Quan EV Trung Quốc — Con Số Chính Xác & Hiệu Quả Hạn Chế</EU_STitle>
        <EU_T>Sau 9 tháng điều tra chống trợ cấp, EU áp thuế đối kháng chính thức lên xe điện Trung Quốc từ 31/10/2024, kéo dài 5 năm — mức thuế khác nhau theo từng hãng dựa trên mức độ trợ cấp phát hiện được.</EU_T>
        <EU_Grid cols={2} gap={12} style={{marginTop:10}}>
          <div style={{padding:12,background:EU_C.card2,borderRadius:6}}>
            <div style={{color:EU_C.purple,fontSize:10,fontWeight:700,marginBottom:6}}>MỨC THUẾ CỤ THỂ</div>
            <div style={{color:EU_C.text,fontSize:12,lineHeight:1.8}}>
              • Thuế đối kháng: <EU_HL c={EU_C.purple}>17% – 35.3%</EU_HL> tùy hãng<br/>
              • Cộng thêm thuế nhập khẩu ô tô tiêu chuẩn: <EU_B>10%</EU_B><br/>
              • Tổng cộng có thể lên: <EU_HL c={EU_C.red}>27% – 45.3%</EU_HL><br/>
              • Trung bình theo công bố chính thức: ~20.8% + 10%
            </div>
          </div>
          <div style={{padding:12,background:EU_C.card2,borderRadius:6}}>
            <div style={{color:EU_C.gold,fontSize:10,fontWeight:700,marginBottom:6}}>THỊ PHẦN XE TQ TẠI EU</div>
            <div style={{color:EU_C.text,fontSize:12,lineHeight:1.8}}>
              • Q2/2020: <EU_HL c={EU_C.gold}>3.5%</EU_HL> tổng doanh số EV<br/>
              • Q2/2024: <EU_HL c={EU_C.red}>27.2%</EU_HL> tổng doanh số EV (bao gồm cả Tesla sản xuất tại TQ)<br/>
              • Riêng thương hiệu Trung Quốc thuần: 1.9% → 14.1%
            </div>
          </div>
        </EU_Grid>
        <EU_T style={{marginTop:8}}><EU_HL c={EU_C.purple}>So với Mỹ:</EU_HL> Mỹ áp thuế đồng loạt 100% lên mọi xe EV Trung Quốc (tăng từ 25% vào 5/2024) — cứng rắn hơn nhiều so với cách tiếp cận EU phân hóa theo mức trợ cấp từng hãng. Chuyên gia ước tính cần thuế 40-50% mới đủ sức răn đe xe TQ tại thị trường EU — mức hiện tại được đánh giá là <EU_B>"chưa đủ để ngăn TQ mở rộng"</EU_B>, chỉ làm chậm lại.</EU_T>
        <div style={{marginTop:8,padding:10,background:`${EU_C.orange}08`,borderRadius:6,border:`1px solid ${EU_C.orange}20`}}>
          <span style={{color:EU_C.orange,fontWeight:700}}>Phản ứng của Trung Quốc: </span>
          <span style={{color:EU_C.text,fontSize:12}}>Điều tra chống bán phá giá thịt lợn, chống trợ cấp sữa, chống bán phá giá rượu brandy EU; đồng thời chỉ đạo các hãng xe tạm dừng đầu tư vào các nước EU đã bỏ phiếu ủng hộ thuế quan — dùng đầu tư làm đòn bẩy chia rẽ nội bộ khối (Đức và Hungary phản đối thuế, được TQ "thưởng" bằng đầu tư nhà máy pin/xe).</span>
        </div>
      </EU_Card>

      <EU_Card style={{marginBottom:16}}>
        <EU_STitle color={EU_C.blue}>Thặng Dư Thương Mại Nội Khối — Đức Là Ngoại Lệ</EU_STitle>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={EU_TRADE_SURPLUS} margin={{top:5,right:10,bottom:5,left:-10}}>
            <XAxis dataKey="c" tick={{fill:EU_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:EU_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip content={<EU_TT/>}/>
            <Bar dataKey="v" name="Thặng dư TM (% GDP)" radius={[4,4,0,0]}>
              {EU_TRADE_SURPLUS.map((d,i)=><Cell key={i} fill={d.v>=0?EU_C.green:EU_C.red}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <EU_T style={{marginTop:8}}>Mô hình tăng trưởng dựa xuất khẩu của Đức tạo thặng dư lớn nhưng cũng khiến nền kinh tế nhạy cảm cao với nhu cầu bên ngoài (đặc biệt Trung Quốc) và biến động tỷ giá — điểm yếu cấu trúc này giờ đã bộc lộ toàn diện khi cả nhu cầu Trung Quốc chững lại lẫn thuế quan Mỹ áp lên cùng lúc.</EU_T>
      </EU_Card>
      <EU_Card>
        <EU_STitle color={EU_C.orange}>Công Nghệ — Quy Định Nghiêm Ngặt, Đổi Mới Chậm</EU_STitle>
        <EU_T>EU dẫn đầu thế giới về quy định bảo vệ dữ liệu (GDPR) và trí tuệ nhân tạo (AI Act) — bảo vệ quyền riêng tư và cạnh tranh công bằng hơn Mỹ-Trung, nhưng cũng đi kèm chi phí tuân thủ cao và tốc độ đổi mới chậm hơn.</EU_T>
        <div style={{marginTop:10,padding:12,background:`${EU_C.orange}08`,borderRadius:6,border:`1px solid ${EU_C.orange}20`}}>
          <span style={{color:EU_C.orange,fontWeight:700}}>Thực trạng: </span>
          <span style={{color:EU_C.text,fontSize:12.5}}>Không có công ty công nghệ EU nào sánh được quy mô vốn hóa với nhóm "Magnificent 7" của Mỹ hay các đại gia công nghệ Trung Quốc (Alibaba, Tencent, BYD). SAP (Đức) là công ty phần mềm lớn nhất châu Âu nhưng vẫn nhỏ hơn nhiều so với Microsoft hay Google. Đầu tư VC vào startup công nghệ EU cũng thấp hơn đáng kể so với Mỹ.</span>
        </div>
      </EU_Card>
    </div>
  );
}

function EU_TabCompetitiveness() {
  return (
    <div>
      <EU_Card style={{marginBottom:16,borderLeft:`4px solid ${EU_C.gold}`}}>
        <EU_STitle>Báo Cáo Draghi (9/2024) — "Thách Thức Tồn Vong" Của EU</EU_STitle>
        <EU_T>Chủ tịch Ủy ban EU Ursula von der Leyen giao cựu Chủ tịch ECB Mario Draghi soạn báo cáo về tương lai năng lực cạnh tranh châu Âu — công bố 9/9/2024, dài 383 trang, gọi thẳng tình trạng EU hiện tại là <EU_B>"thách thức tồn vong" (existential challenge)</EU_B>.</EU_T>
        <EU_Grid cols={3} gap={12} style={{marginTop:10}}>
          <EU_Metric label="Khoảng Cách Đầu Tư Cần Thiết" value="€750-800 tỷ" sub="Hàng năm — tương đương 4.4-5% GDP EU" color={EU_C.red}/>
          <EU_Metric label="Khoảng Cách GDP EU-Mỹ" value="15% → 30%" sub="Nới rộng gấp đôi trong 20 năm qua" color={EU_C.orange}/>
          <EU_Metric label="Tiến Độ Thực Hiện (9/2025)" value="~11%" sub="Chỉ 11% khuyến nghị đã triển khai sau 1 năm" color={EU_C.crimson||EU_C.red} warn="Chậm nghiêm trọng"/>
        </EU_Grid>
        <EU_T style={{marginTop:10}}><EU_HL c={EU_C.gold}>Ba trụ cột hành động Draghi đề xuất:</EU_HL></EU_T>
        <EU_Grid cols={3} gap={10} style={{marginTop:8}}>
          {[
            {t:"Thu Hẹp Khoảng Cách Đổi Mới",d:"€450 tỷ — EU thất bại trong việc thương mại hóa sáng chế, doanh nghiệp đổi mới muốn mở rộng bị cản trở ở mọi giai đoạn",c:EU_C.blue},
            {t:"Khử Carbon Gắn Với Cạnh Tranh",d:"Giá năng lượng EU cao gấp tới 5 lần Mỹ — Draghi đề xuất coi chuyển đổi xanh là cơ hội chứ không phải gánh nặng",c:EU_C.green},
            {t:"Giảm Phụ Thuộc Chiến Lược",d:"€50 tỷ cho quốc phòng theo mục tiêu NATO — cộng phụ thuộc nguyên liệu thô, bán dẫn từ bên ngoài",c:EU_C.orange},
          ].map((item,i)=>(
            <div key={i} style={{padding:12,background:EU_C.card2,borderRadius:6,border:`1px solid ${item.c}30`,borderTop:`3px solid ${item.c}`}}>
              <div style={{color:item.c,fontSize:11,fontWeight:700,marginBottom:6}}>{item.t}</div>
              <div style={{color:EU_C.text,fontSize:11.5,lineHeight:1.6}}>{item.d}</div>
            </div>
          ))}
        </EU_Grid>
      </EU_Card>

      <EU_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <EU_Card>
          <EU_STitle color={EU_C.red}>Vấn Đề Cốt Lõi: Ai Trả Tiền?</EU_STitle>
          <EU_T>Draghi đề xuất huy động nợ chung EU quy mô lớn ("common debt for common projects") — nhưng đây chính là điểm gây chia rẽ sâu sắc nhất trong nội bộ khối.</EU_T>
          <div style={{padding:12,background:`${EU_C.red}08`,borderRadius:6,border:`1px solid ${EU_C.red}20`,marginTop:8}}>
            <div style={{color:EU_C.red,fontSize:10,fontWeight:700,marginBottom:6}}>PHE "TIẾT KIỆM" PHẢN ĐỐI</div>
            <div style={{color:EU_C.text,fontSize:12,lineHeight:1.7}}>Đức, Hà Lan và các nước "frugal" khác phản đối phát hành nợ chung quy mô lớn — lo ngại không kiểm soát được nợ khối phình to, lặp lại rủi ro kiểu khủng hoảng Hy Lạp 2010</div>
          </div>
          <EU_T style={{marginTop:8}}>Cơ cấu tài trợ truyền thống của EU: ~20% vốn công, 80% vốn tư nhân cho đầu tư sản xuất. Nhưng khu vực tư nhân EU hiện đang đầu tư <EU_B>€450 tỷ/năm ra bên ngoài khối</EU_B> (thể hiện qua thặng dư tài khoản vãng lai) — gần đủ để lấp khoảng trống nếu "kéo về" đầu tư nội khối, nhưng đòi hỏi cải cách quy định sâu để hấp dẫn hơn.</EU_T>
        </EU_Card>
        <EU_Card>
          <EU_STitle color={EU_C.purple}>Nhân Khẩu Học — Áp Lực Kép Với Năng Suất</EU_STitle>
          <EU_T>Draghi nhấn mạnh một nghịch lý về thời gian: tuổi trung vị Đức và Tây Ban Nha đã vượt <EU_B>46 tuổi</EU_B> (Mỹ: 38.5, Nigeria: 19) — và "thời điểm có nhiều người trong độ tuổi lao động nhất chính là ngay bây giờ".</EU_T>
          <div style={{padding:12,background:`${EU_C.purple}08`,borderRadius:6,border:`1px solid ${EU_C.purple}20`,marginTop:8}}>
            <span style={{color:EU_C.purple,fontWeight:700}}>Ẩn ý cấp bách: </span>
            <span style={{color:EU_C.text,fontSize:12.5}}>Nếu không cải thiện năng suất ngay khi lực lượng lao động còn đông đảo nhất, gánh nặng sẽ dồn hết lên thế hệ tiếp theo — khi dân số già đi nhanh hơn nữa. 72% khoảng cách tăng trưởng EU-Mỹ năm 2023 (nới rộng 12% trong năm đó) đến từ chênh lệch năng suất, không phải chênh lệch số giờ làm việc hay dân số lao động.</span>
          </div>
        </EU_Card>
      </EU_Grid>

      <EU_Card>
        <EU_STitle color={EU_C.blue}>Một Năm Sau — Đánh Giá Thực Tế (9/2025)</EU_STitle>
        <EU_T>Đích thân Draghi bày tỏ thất vọng, thúc giục lãnh đạo EU "làm những gì tôi đã nói" — cảnh báo châu Âu đang tụt hậu xa hơn so với Mỹ-Trung do "sự tự mãn của chính phủ".</EU_T>
        <EU_Grid cols={2} gap={12} style={{marginTop:10}}>
          <div style={{padding:12,background:`${EU_C.green}08`,borderRadius:6,border:`1px solid ${EU_C.green}20`}}>
            <div style={{color:EU_C.green,fontSize:10,fontWeight:700,marginBottom:6}}>TIẾN BỘ CÓ ĐƯỢC</div>
            <div style={{color:EU_C.text,fontSize:12,lineHeight:1.7}}>Khởi động Savings and Investment Union (SIU); Bộ trưởng Tài chính Đức-Pháp-Ý-Hà Lan-Ba Lan-Tây Ban Nha họp 1/2026 thúc đẩy Liên minh Thị trường Vốn; đề xuất đồng Euro số hóa</div>
          </div>
          <div style={{padding:12,background:`${EU_C.red}08`,borderRadius:6,border:`1px solid ${EU_C.red}20`}}>
            <div style={{color:EU_C.red,fontSize:10,fontWeight:700,marginBottom:6}}>ĐÌNH TRỆ HOÀN TOÀN</div>
            <div style={{color:EU_C.text,fontSize:12,lineHeight:1.7}}>Theo báo Ý Greenreport: các lĩnh vực Năng lượng, Quốc phòng, Dược phẩm, Ô tô — tiến độ cải cách bằng 0%. Chỉ nguyên liệu thô chiến lược có tiến triển nhất định</div>
          </div>
        </EU_Grid>
        <EU_T style={{marginTop:10}}>Một Bộ trưởng Tài chính giấu tên được The Economist trích lời: hoàn thiện Thị trường Chung sẽ tương đương gỡ bỏ rào cản nội khối bằng <EU_HL c={EU_C.blue}>44% thuế quan</EU_HL> — con số cho thấy quy mô phi hiệu quả nội tại của EU lớn đến mức nào, ngay cả khi không tính đến cạnh tranh bên ngoài.</EU_T>
      </EU_Card>
    </div>
  );
}

function EU_TabExpert() {
  return (
    <div>
      <div style={{marginBottom:20,padding:"16px 20px",background:EU_C.panel,borderRadius:8,
        border:`1px solid ${EU_C.border}`,borderLeft:`4px solid ${EU_C.euGold}`}}>
        <div style={{color:EU_C.euGold,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>GÓC CHUYÊN GIA — TỔNG HỢP QUAN ĐIỂM VỀ EU</div>
        <p style={{color:EU_C.bright,fontSize:14,lineHeight:1.75,margin:0}}>
          Tổng hợp các đoạn phân tích <EU_HL>đặc thù cho EU</EU_HL> rút ra từ nhiều bài viết vĩ mô khác nhau (2021–2025) của cùng một tác giả —
          bao gồm phân tích ECB, khủng hoảng nợ công, và các nhận định về NATO/an ninh từ nhiều nguồn khác nhau.
        </p>
        <div style={{color:EU_C.dim,fontSize:11,marginTop:8,fontStyle:"italic"}}>
          * Tóm tắt quan điểm cá nhân của tác giả các bài viết, trình bày để đối chiếu góc nhìn — không phải nhận định của phân tích chính trong các tab khác.
        </div>
      </div>

      <EU_Card style={{marginBottom:16}}>
        <EU_STitle>Steen Jakobsen (Saxo Bank) — So Sánh Euro Với ESG Như "Cú Đặt Cược Chính Trị"</EU_STitle>
        <EU_T>Từ bài "Lần Này Thì Khác" (11/2022, dịch từ Kinh tế trưởng Saxo Capital Markets): một góc nhìn sắc bén so sánh lịch sử ra đời đồng Euro với làn sóng ESG/Green Transformation đang diễn ra — cả hai đều là "cam kết chính trị buộc phải thành công".</EU_T>
        <div style={{margin:"10px 0",padding:14,background:EU_C.card2,borderRadius:8,border:`1px solid ${EU_C.border}`}}>
          <div style={{color:EU_C.text,fontSize:13,lineHeight:1.75,fontStyle:"italic"}}>
            "Tôi tình cờ là sinh viên của Giáo sư Niels Thygesen khi ông là tác giả báo cáo của Ủy ban Delors năm 1988/89... Tất cả chúng ta đều biết rằng EMU/Euro được sinh ra mà không có một nền tảng thích hợp là liên minh tài khóa, rằng không có liên minh tiền tệ nào tồn tại qua thử thách của thời gian và các quốc gia mạnh hơn sẽ 'hòa tan' các quốc gia yếu hơn. Mặc dù vậy tất cả chúng ta đều đánh giá thấp vốn liếng chính trị đã đầu tư."
          </div>
        </div>
        <EU_T><EU_HL c={EU_C.gold}>Điểm nhấn:</EU_HL> Tác giả gốc (Jakobsen) là người trong cuộc — từng học trực tiếp với kiến trúc sư của EMU — nên góc nhìn này có giá trị đặc biệt: đồng Euro tồn tại được không phải nhờ thiết kế hoàn hảo mà nhờ ý chí chính trị liên tục "vá" các lỗ hổng khi khủng hoảng xảy ra (Draghi 2012, NextGenerationEU 2020).</EU_T>
      </EU_Card>

      <EU_Card style={{marginBottom:16}}>
        <EU_STitle color={EU_C.red}>Christine Lagarde 2022 — Phân Tích Diễn Ngôn Chính Sách</EU_STitle>
        <EU_T>Từ bài "Chuyển Đổi Xanh, ESG và Lạm Phát" (05/2022): một phân tích diễn ngôn (discourse analysis) về cách Chủ tịch ECB xử lý câu hỏi trách nhiệm lạm phát trước công chúng — đáng chú ý vì cách "đọc ngược" phát biểu chính thức.</EU_T>
        <EU_Grid cols={2} gap={12} style={{marginTop:10}}>
          <div style={{padding:12,background:`${EU_C.red}08`,borderRadius:6,border:`1px solid ${EU_C.red}20`}}>
            <div style={{color:EU_C.red,fontSize:10,fontWeight:700,marginBottom:6}}>PHÁT BIỂU CHÍNH THỨC</div>
            <EU_T style={{margin:0}}>"Không nghĩ chúng ta đang trong tình huống Cầu tăng vọt... lạm phát bị đẩy bởi phía Cung" — đổ trách nhiệm hoàn toàn cho gián đoạn chuỗi cung ứng và chiến tranh.</EU_T>
          </div>
          <div style={{padding:12,background:`${EU_C.gold}08`,borderRadius:6,border:`1px solid ${EU_C.gold}20`}}>
            <div style={{color:EU_C.gold,fontSize:10,fontWeight:700,marginBottom:6}}>PHÊ BÌNH CỦA TÁC GIẢ</div>
            <EU_T style={{margin:0}}>"Bà đổ tội cho Cung làm tăng giá mà bỏ qua câu chuyện chính các NHTW là người bơm tiền ào ạt tăng Cầu" — coi đây là cách "tìm con dê tế thần" mới, tương tự cách 2008 đổ lỗi ngân hàng thương mại.</EU_T>
          </div>
        </EU_Grid>
        <EU_T style={{marginTop:8}}>Câu "We don't have to rush and we don't have to panic" được tác giả diễn giải ngược: chính việc lặp đi lặp lại lời trấn an là dấu hiệu cho thấy ECB "đang vội vã và đang hoảng hốt" — một kỹ thuật đọc tín hiệu chính sách qua ngôn ngữ phi chính thức đáng tham khảo.</EU_T>
      </EU_Card>

      <EU_Card>
        <EU_STitle color={EU_C.purple}>EU Trong Khung Phân Tích "Ba Chiều Lợi Ích" Của Mỹ (Rubio, 2025)</EU_STitle>
        <EU_T>Từ phỏng vấn Ngoại trưởng Mỹ Marco Rubio — vị trí của EU trong tư duy chiến lược Mỹ, đặc biệt về vấn đề Greenland liên quan trực tiếp một thành viên EU (Đan Mạch):</EU_T>
        <div style={{padding:12,background:EU_C.card2,borderRadius:6,marginTop:8}}>
          <div style={{color:EU_C.purple,fontSize:11,fontWeight:700,marginBottom:6}}>VỤ GREENLAND — PHÉP THỬ QUAN HỆ MỸ-EU:</div>
          <div style={{color:EU_C.text,fontSize:12,lineHeight:1.7}}>
            Rubio: "Tôi nghĩ quan điểm của Tổng thống là Đan Mạch không thể ngăn cản [Trung Quốc tiếp cận Bắc Cực]; họ sẽ dựa vào Mỹ để làm điều ấy." Cuộc điện đàm Trump-Thủ tướng Đan Mạch được mô tả là "diễn ra không mấy tốt đẹp" khi Mỹ không loại trừ khả năng dùng sức ép kinh tế/quân sự với một thành viên EU về vấn đề Greenland.
          </div>
        </div>
        <EU_T style={{marginTop:8}}><EU_HL c={EU_C.purple}>Ý nghĩa:</EU_HL> Vụ việc cho thấy ngay cả quan hệ đồng minh truyền thống Mỹ-EU cũng không miễn nhiễm trước logic "lợi ích quốc gia trên hết" của chính quyền Trump — đặt câu hỏi về mức độ tin cậy của "chiếc ô an ninh" Mỹ mà nhiều nước EU đã dựa vào suốt nhiều thập kỷ để tránh chi tiêu quốc phòng cao.</EU_T>
      </EU_Card>
    </div>
  );
}

const EU_TABS = [
  {id:0,label:"Dashboard",icon:"📊"},
  {id:1,label:"Mô Hình & Đồng Euro",icon:"💶"},
  {id:2,label:"ECB & Nợ Công",icon:"🏦"},
  {id:3,label:"Năng Lượng & Nga",icon:"⚡"},
  {id:4,label:"Chính Trị & Công Nghệ",icon:"🏛️"},
  {id:5,label:"Báo Cáo Draghi",icon:"📋"},
  {id:6,label:"Góc Chuyên Gia",icon:"🎓"},
];
const EU_CONTENT = [
  <EU_TabDashboard/>,<EU_TabModel/>,<EU_TabECB/>,<EU_TabEnergy/>,<EU_TabPolitics/>,<EU_TabCompetitiveness/>,<EU_TabExpert/>,
];

/* ==================== NHẬT BẢN (JP) ==================== */
const JP_C = {
  bg:"#FAF9F7", panel:"#FFFFFF", card:"#FFFFFF", card2:"#F5F3F6",
  border:"#E6E4EA", text:"#605E6A", bright:"#18171D", dim:"#96939E",
  muted:"#77748A", crimson:"#B83A47", gold:"#A9821E", blue:"#2A6BB8",
  green:"#238F5E", purple:"#7255C9", orange:"#C46E30", sakura:"#C25577",
  ink:"#2a3550",
};

const JP_GDP_GROWTH = [
  {y:"2015",g:1.6},{y:"2016",g:0.8},{y:"2017",g:1.7},{y:"2018",g:0.6},
  {y:"2019",g:-0.4},{y:"2020",g:-4.1},{y:"2021",g:2.6},{y:"2022",g:1.0},
  {y:"2023",g:1.9},{y:"2024",g:0.1},
];
const JP_DEBT_GDP = [
  {c:"Nhật",v:260},{c:"Ý",v:137},{c:"Mỹ",v:122},{c:"Pháp",v:112},
  {c:"Anh",v:100},{c:"Đức",v:63},
];
const JP_BOJ_RATE = [
  {y:"1999",r:0.0},{y:"2006",r:0.5},{y:"2008",r:0.1},{y:"2016",r:-0.1},
  {y:"2023",r:-0.1},{y:"7/24",r:0.25},{y:"1/25",r:0.5},
];
const JP_JPY_USD = [
  {y:"2012",v:80},{y:"2015",v:120},{y:"2020",v:105},{y:"2022",v:131},
  {y:"2023",v:141},{y:"7/24",v:161},{y:"2025",v:150},
];
const JP_AGING_POP = [
  {y:"2000",v:17.4},{y:"2010",v:23.0},{y:"2020",v:28.6},{y:"2030",v:31.2},
  {y:"2040",v:34.8},{y:"2050",v:37.7},
];
const JP_BOJ_JGB_HOLDING = [
  {y:"2013",v:12},{y:"2016",v:35},{y:"2019",v:44},{y:"2022",v:50},{y:"2024",v:53},
];
const JP_SECTOR_STRENGTH = [
  {n:"Ô tô & Linh kiện",v:22},{n:"Vật liệu bán dẫn",v:18},{n:"Robot công nghiệp",v:16},
  {n:"Điện tử tiêu dùng",v:14},{n:"Tài chính",v:15},{n:"Khác",v:15},
];
const JP_RISK_RADAR = [
  {s:"Nhân Khẩu Học",v:88},{s:"Nợ Công",v:70},{s:"Yen Yếu",v:60},
  {s:"Năng Suất LĐ",v:65},{s:"Phụ Thuộc XK",v:58},{s:"Địa CT (TQ)",v:55},
  {s:"Năng Lượng NK",v:62},{s:"Đổi Mới CN",v:50},
];
const JP_PIE_COLORS=[JP_C.crimson,JP_C.blue,JP_C.gold,JP_C.green,JP_C.purple,JP_C.dim];

const JP_TT = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  return (
    <div style={{background:JP_C.panel,border:`1px solid ${JP_C.border}`,borderRadius:6,padding:"8px 12px"}}>
      <div style={{color:JP_C.gold,fontSize:11,fontWeight:700,marginBottom:4}}>{label}</div>
      {payload.map((p,i)=>(
        <div key={i} style={{color:p.color||JP_C.bright,fontSize:12}}>
          {p.name}: <span style={{fontFamily:"monospace",fontWeight:700}}>{typeof p.value==="number"?p.value.toFixed(1):p.value}</span>
        </div>
      ))}
    </div>
  );
};
const JP_Card = ({children,style={}}) => (
  <div style={{background:JP_C.card,border:`1px solid ${JP_C.border}`,borderRadius:8,padding:20,...style}}>{children}</div>
);
const JP_STitle = ({children,color=JP_C.gold}) => (
  <div style={{color,fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",
    marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
    <div style={{width:14,height:2,background:color,borderRadius:1,flexShrink:0}}/>{children}
  </div>
);
const JP_T = ({children,style}) => <p style={{color:JP_C.text,fontSize:13.5,lineHeight:1.75,margin:"5px 0",...style}}>{children}</p>;
const JP_B = ({children}) => <span style={{color:JP_C.bright,fontWeight:600}}>{children}</span>;
const JP_HL = ({children,c=JP_C.gold}) => <span style={{color:c,fontWeight:600}}>{children}</span>;
const JP_Metric = ({label,value,sub,color=JP_C.blue,warn}) => (
  <div style={{background:JP_C.card,border:`1px solid ${JP_C.border}`,borderRadius:8,
    padding:"14px 16px",borderTop:`3px solid ${color}`}}>
    <div style={{color:JP_C.muted,fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>{label}</div>
    <div style={{color,fontSize:22,fontWeight:700,fontFamily:"monospace",letterSpacing:"-0.02em"}}>{value}</div>
    {sub&&<div style={{color:JP_C.dim,fontSize:11,marginTop:3}}>{sub}</div>}
    {warn&&<div style={{color:JP_C.crimson,fontSize:10,marginTop:2,fontWeight:700}}>{warn}</div>}
  </div>
);
const JP_Badge = ({level}) => {
  const m={"Rất Cao":"#B8222C",Cao:JP_C.crimson,"Trung Bình":JP_C.gold,Thấp:JP_C.green};
  const c=m[level]||JP_C.gold;
  return <span style={{background:c+"20",color:c,border:`1px solid ${c}40`,
    borderRadius:4,padding:"2px 8px",fontSize:10,fontWeight:700}}>{level}</span>;
};
const JP_Grid = ({cols=2,gap=16,children,style}) => (
  <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap,...style}}>{children}</div>
);
const JP_TL = ({events}) => (
  <div style={{position:"relative",paddingLeft:22}}>
    <div style={{position:"absolute",left:7,top:4,bottom:4,width:1.5,background:JP_C.border}}/>
    {events.map((e,i)=>(
      <div key={i} style={{marginBottom:14,position:"relative"}}>
        <div style={{position:"absolute",left:-18,top:4,width:9,height:9,borderRadius:"50%",
          background:e.color||JP_C.gold,boxShadow:`0 0 6px ${e.color||JP_C.gold}60`}}/>
        <div style={{color:e.color||JP_C.gold,fontSize:10,fontWeight:700,letterSpacing:"0.06em"}}>{e.year}</div>
        <div style={{color:JP_C.bright,fontSize:13,fontWeight:600,marginTop:1}}>{e.title}</div>
        <div style={{color:JP_C.text,fontSize:12,lineHeight:1.6,marginTop:2}}>{e.desc}</div>
      </div>
    ))}
  </div>
);

function JP_TabDashboard() {
  return (
    <div>
      <div style={{marginBottom:20,padding:"16px 20px",background:JP_C.panel,borderRadius:8,
        border:`1px solid ${JP_C.border}`,borderLeft:`4px solid ${JP_C.sakura}`}}>
        <div style={{color:JP_C.sakura,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>LUẬN ĐIỂM CỐT LÕI</div>
        <p style={{color:JP_C.bright,fontSize:14,lineHeight:1.75,margin:0}}>
          Nhật Bản giữ vai trò <JP_HL c={JP_C.blue}>điều tiết dòng vốn toàn cầu</JP_HL> qua cơ chế Yen Carry Trade — bất kỳ thay đổi lãi suất BOJ nào
          cũng gây chấn động thị trường thế giới. Là nền kinh tế lớn đầu tiên trải qua <JP_HL c={JP_C.crimson}>ba thập kỷ giảm phát-trì trệ</JP_HL> sau
          bong bóng 1990, Nhật cung cấp "tấm gương" quan trọng để hiểu các nền kinh tế khác (đặc biệt Trung Quốc) — nhưng khác biệt căn bản:
          Nhật <JP_B>giàu trước khi già</JP_B> và duy trì thể chế dân chủ ổn định suốt giai đoạn khó khăn.
        </p>
      </div>
      <JP_Grid cols={3} gap={12} style={{marginBottom:16}}>
        <JP_Metric label="Nợ Công / GDP" value="~260%" sub="Cao nhất trong các nước phát triển" color={JP_C.crimson} warn="Nhưng chưa từng khủng hoảng"/>
        <JP_Metric label="Lãi Suất BOJ (1/2025)" value="0.5%" sub="Từ âm 0.1% suốt 2016-2024" color={JP_C.blue}/>
        <JP_Metric label="Tỷ Giá JPY/USD" value="~150" sub="Đỉnh 161 (7/2024) — yếu nhất 38 năm" color={JP_C.orange}/>
        <JP_Metric label="Tỷ Lệ Người Già (65+)" value="~29%" sub="Cao nhất thế giới, dự báo 38% năm 2050" color={JP_C.crimson}/>
        <JP_Metric label="BOJ Sở Hữu JGB" value="~53%" sub="Hơn một nửa tổng trái phiếu CP lưu hành" color={JP_C.purple}/>
        <JP_Metric label="Tăng Trưởng GDP 2024" value="0.1%" sub="Gần như đình trệ" color={JP_C.gold}/>
      </JP_Grid>
      <JP_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <JP_Card>
          <JP_STitle>Tăng Trưởng GDP 2015–2024 (%)</JP_STitle>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={JP_GDP_GROWTH} margin={{top:5,right:10,bottom:5,left:-20}}>
              <defs>
                <linearGradient id="gG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={JP_C.sakura} stopOpacity={0.35}/>
                  <stop offset="95%" stopColor={JP_C.sakura} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="y" tick={{fill:JP_C.dim,fontSize:10}} axisLine={{stroke:JP_C.border}} tickLine={false}/>
              <YAxis tick={{fill:JP_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <Tooltip content={<JP_TT/>}/>
              <Area type="monotone" dataKey="g" stroke={JP_C.sakura} fill="url(#gG)" strokeWidth={2} name="GDP %"/>
            </AreaChart>
          </ResponsiveContainer>
        </JP_Card>
        <JP_Card>
          <JP_STitle>Radar Rủi Ro Cấu Trúc (0–100)</JP_STitle>
          <ResponsiveContainer width="100%" height={210}>
            <RadarChart data={JP_RISK_RADAR} margin={{top:5,right:25,bottom:5,left:25}}>
              <PolarGrid stroke={JP_C.border}/>
              <PolarAngleAxis dataKey="s" tick={{fill:JP_C.dim,fontSize:9}}/>
              <PolarRadiusAxis angle={90} domain={[0,100]} tick={{fill:JP_C.dim,fontSize:8}}/>
              <Radar dataKey="v" stroke={JP_C.crimson} fill={JP_C.crimson} fillOpacity={0.22} strokeWidth={1.5} name="Rủi Ro"/>
            </RadarChart>
          </ResponsiveContainer>
        </JP_Card>
      </JP_Grid>
      <JP_Card style={{marginBottom:16}}>
        <JP_STitle color={JP_C.crimson}>Nợ Công / GDP So Sánh G7 (%) — Nhật Vượt Xa</JP_STitle>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={JP_DEBT_GDP} margin={{top:5,right:10,bottom:5,left:-10}}>
            <XAxis dataKey="c" tick={{fill:JP_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:JP_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip content={<JP_TT/>}/>
            <Bar dataKey="v" name="Nợ/GDP %" radius={[4,4,0,0]}>
              {JP_DEBT_GDP.map((d,i)=><Cell key={i} fill={d.c==="Nhật"?JP_C.crimson:JP_C.blue}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div style={{color:JP_C.dim,fontSize:11,marginTop:4}}>Nợ cao nhất thế giới nhưng ~90% do chính người Nhật nắm giữ — khác biệt căn bản với các nước phụ thuộc chủ nợ nước ngoài</div>
      </JP_Card>
      <JP_Grid cols={3} gap={12}>
        {[
          {n:"Kịch Bản 1",t:"Thoát Giảm Phát Bền Vững",p:"25–30%",c:JP_C.green,
            d:"Lạm phát ổn định 2%, BOJ bình thường hóa lãi suất dần, tiền lương thực tế tăng liên tục nhiều năm, tiêu dùng nội địa phục hồi thật sự."},
          {n:"Kịch Bản 2 — CƠ SỞ",t:"Trì Trệ Có Quản Lý Kéo Dài",p:"45–50%",c:JP_C.gold,
            d:"Tăng trưởng thấp 0.5-1%/năm tiếp diễn, nợ công tiếp tục phình nhưng BOJ vẫn kiểm soát được nhờ tiết kiệm nội địa cao và niềm tin thể chế."},
          {n:"Kịch Bản 3",t:"Khủng Hoảng Nợ/Yen",p:"20–25%",c:JP_C.crimson,
            d:"Chênh lệch lãi suất với Fed buộc BOJ tăng nhanh hơn dự kiến → chi phí trả lãi nợ công vọt lên → khủng hoảng niềm tin JGB, yen mất giá không kiểm soát."},
        ].map((s,i)=>(
          <div key={i} style={{background:JP_C.card,border:`1px solid ${JP_C.border}`,borderRadius:8,
            padding:16,borderTop:`3px solid ${s.c}`}}>
            <div style={{color:JP_C.muted,fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase"}}>{s.n}</div>
            <div style={{color:s.c,fontSize:13,fontWeight:700,margin:"4px 0"}}>{s.t}</div>
            <div style={{color:s.c,fontSize:20,fontWeight:700,fontFamily:"monospace",marginBottom:8}}>{s.p}</div>
            <div style={{color:JP_C.text,fontSize:12,lineHeight:1.65}}>{s.d}</div>
          </div>
        ))}
      </JP_Grid>
    </div>
  );
}

function JP_TabCarryTrade() {
  return (
    <div>
      <JP_Card style={{marginBottom:16,borderLeft:`4px solid ${JP_C.blue}`}}>
        <JP_STitle color={JP_C.blue}>Yen Carry Trade — Cơ Chế Điều Tiết Dòng Vốn Toàn Cầu</JP_STitle>
        <JP_T>Nhật Bản giữ lãi suất gần 0% (thậm chí âm) suốt hơn 25 năm — biến JPY thành <JP_B>"đồng tiền tài trợ" (funding currency)</JP_B> ưa thích nhất thế giới cho carry trade. Đây là lý do khiến chính sách BOJ có tác động vượt xa quy mô nền kinh tế Nhật.</JP_T>
        <div style={{margin:"12px 0",padding:16,background:JP_C.card2,borderRadius:8,border:`1px solid ${JP_C.border}`}}>
          <div style={{color:JP_C.blue,fontSize:10,fontWeight:700,marginBottom:10,letterSpacing:"0.08em"}}>CƠ CHẾ HOẠT ĐỘNG:</div>
          {[
            {n:"01",t:"Nhà đầu tư vay JPY với lãi suất gần 0% từ hệ thống ngân hàng Nhật",c:JP_C.blue},
            {n:"02",t:"Chuyển đổi sang USD hoặc các đồng tiền lợi suất cao hơn (EM, AUD, NZD)",c:JP_C.gold},
            {n:"03",t:"Đầu tư vào tài sản lợi suất cao: TPCP Mỹ, cổ phiếu, trái phiếu thị trường mới nổi",c:JP_C.orange},
            {n:"04",t:"Kiếm lời từ chênh lệch lãi suất (interest rate differential) — quy mô ước tính hàng nghìn tỷ USD",c:JP_C.green},
            {n:"05",t:"Khi BOJ thay đổi chính sách hoặc yen biến động mạnh → buộc 'unwind' (đóng vị thế) hàng loạt → chấn động thị trường toàn cầu",c:JP_C.crimson},
          ].map(s=>(
            <div key={s.n} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
              <div style={{color:s.c,fontWeight:700,fontFamily:"monospace",fontSize:11,minWidth:22}}>{s.n}</div>
              <div style={{color:JP_C.text,fontSize:12.5,lineHeight:1.65}}>→ {s.t}</div>
            </div>
          ))}
        </div>
      </JP_Card>
      <JP_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <JP_Card>
          <JP_STitle color={JP_C.crimson}>Sự Kiện 8/2024 — "Yen Carry Trade Unwind"</JP_STitle>
          <JP_TL events={[
            {year:"31/7/2024",title:"BOJ bất ngờ tăng lãi suất lên 0.25%",color:JP_C.blue,desc:"Vượt kỳ vọng thị trường — tín hiệu BOJ nghiêm túc bình thường hóa chính sách sau nhiều năm"},
            {year:"2/8/2024",title:"Số liệu việc làm Mỹ yếu hơn dự báo",color:JP_C.gold,desc:"Làm tăng lo ngại suy thoái Mỹ — kết hợp với BOJ tăng lãi suất tạo cú sốc kép"},
            {year:"5/8/2024",title:'"Black Monday" — Nikkei giảm 12.4% trong 1 phiên',color:JP_C.crimson,desc:"Mức giảm mạnh nhất kể từ 1987. Chứng khoán toàn cầu (S&P 500, các thị trường châu Á) đồng loạt bán tháo do carry trade unwind hàng loạt"},
            {year:"7/8/2024",title:"Thị trường phục hồi phần lớn",color:JP_C.green,desc:"Sau tuyên bố trấn an từ BOJ về tốc độ tăng lãi suất tiếp theo — nhưng để lại bài học về mức độ liên kết ẩn của carry trade"},
          ]}/>
        </JP_Card>
        <JP_Card>
          <JP_STitle color={JP_C.gold}>Tỷ Giá JPY/USD — Yếu Nhất 38 Năm</JP_STitle>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={JP_JPY_USD} margin={{top:5,right:20,bottom:5,left:-10}}>
              <XAxis dataKey="y" tick={{fill:JP_C.dim,fontSize:10}} axisLine={{stroke:JP_C.border}} tickLine={false}/>
              <YAxis tick={{fill:JP_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
              <Tooltip content={<JP_TT/>}/>
              <Line type="monotone" dataKey="v" stroke={JP_C.gold} strokeWidth={2.5} dot={{fill:JP_C.gold,r:3}} name="JPY/USD"/>
            </LineChart>
          </ResponsiveContainer>
          <JP_T style={{marginTop:8}}><JP_HL c={JP_C.orange}>Con dao hai lưỡi:</JP_HL> Yen yếu lợi cho xuất khẩu (Toyota, Sony báo lãi kỷ lục) và du lịch (khách quốc tế bùng nổ) — nhưng gây lạm phát nhập khẩu (năng lượng, thực phẩm) đè nặng lên hộ gia đình có thu nhập không tăng tương ứng.</JP_T>
        </JP_Card>
      </JP_Grid>
      <JP_Card>
        <JP_STitle color={JP_C.purple}>BOJ Sở Hữu Hơn Một Nửa Trái Phiếu Chính Phủ — Chưa Từng Có Tiền Lệ</JP_STitle>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={JP_BOJ_JGB_HOLDING} margin={{top:5,right:10,bottom:5,left:-10}}>
            <defs>
              <linearGradient id="jgbG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={JP_C.purple} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={JP_C.purple} stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="y" tick={{fill:JP_C.dim,fontSize:10}} axisLine={{stroke:JP_C.border}} tickLine={false}/>
            <YAxis tick={{fill:JP_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip content={<JP_TT/>}/>
            <Area type="monotone" dataKey="v" stroke={JP_C.purple} fill="url(#jgbG)" strokeWidth={2} name="% JGB do BOJ nắm giữ"/>
          </AreaChart>
        </ResponsiveContainer>
        <JP_T style={{marginTop:8}}>Dưới thời Thống đốc Kuroda Haruhiko (2013-2023), chương trình Nới Lỏng Định Lượng-Định Tính (QQE) đưa BOJ trở thành chủ nợ lớn nhất của chính chính phủ Nhật — <JP_B>vượt qua 50% tổng lượng JGB lưu hành</JP_B> — đồng thời BOJ còn mua ETF cổ phiếu, trở thành một trong những cổ đông lớn nhất của TTCK Tokyo. Đây là chương trình can thiệp thị trường tài chính quy mô lớn và kéo dài nhất trong lịch sử tiền tệ hiện đại của bất kỳ nền kinh tế phát triển nào.</JP_T>
      </JP_Card>
      <JP_Card style={{marginTop:16,borderLeft:`4px solid ${JP_C.green}`}}>
        <JP_STitle color={JP_C.green}>19/3/2024 — Ngày BOJ Chính Thức Kết Thúc "Thí Nghiệm" Lãi Suất Âm</JP_STitle>
        <JP_T>Thống đốc Ueda Kazuo (kế nhiệm Kuroda từ 2023) chấm dứt chính sách lãi suất âm duy nhất còn sót lại trên thế giới, đồng thời bãi bỏ Kiểm Soát Đường Cong Lợi Suất (YCC) — lần tăng lãi suất đầu tiên của BOJ sau <JP_B>17 năm</JP_B>.</JP_T>
        <JP_Grid cols={2} gap={12} style={{marginTop:10}}>
          <div style={{padding:12,background:`${JP_C.green}08`,borderRadius:6,border:`1px solid ${JP_C.green}20`}}>
            <div style={{color:JP_C.green,fontSize:10,fontWeight:700,marginBottom:6}}>ĐIỀU KIỆN KÍCH HOẠT — KẾT QUẢ SHUNTO</div>
            <div style={{color:JP_C.text,fontSize:12,lineHeight:1.8}}>
              Đàm phán lương mùa xuân "Shunto" 2024 giữa Rengo (liên đoàn lao động lớn nhất) và giới chủ đạt mức tăng lương cơ bản bình quân <JP_HL c={JP_C.green}>3.7-5.28%</JP_HL> — mức cao nhất trong <JP_B>33 năm</JP_B>, vượt xa mức tăng CPI 2.8% cùng thời điểm
            </div>
          </div>
          <div style={{padding:12,background:JP_C.card2,borderRadius:6}}>
            <div style={{color:JP_C.blue,fontSize:10,fontWeight:700,marginBottom:6}}>THAY ĐỔI CHÍNH SÁCH CỤ THỂ</div>
            <div style={{color:JP_C.text,fontSize:12,lineHeight:1.7}}>
              Lãi suất ngắn hạn: -0.1% → 0-0.1%; bãi bỏ hoàn toàn khung YCC (từng neo lợi suất JGB 10 năm quanh 0%); ngừng mua ETF/J-REIT; vẫn duy trì mua ~6 nghìn tỷ yên JGB/tháng "trong thời gian tới"
            </div>
          </div>
        </JP_Grid>
        <JP_T style={{marginTop:8}}><JP_HL c={JP_C.green}>Cơ chế "vòng xoáy đức hạnh" (virtuous cycle) BOJ theo đuổi:</JP_HL> Lương tăng → tiêu dùng nội địa tăng → lạm phát ổn định bền vững ở mức 2% do cầu trong nước thúc đẩy (chứ không phải do yen yếu đẩy giá nhập khẩu như giai đoạn 2022-2023). Đây là ranh giới quan trọng: BOJ phân biệt rõ giữa lạm phát "tốt" (từ cầu nội địa, gắn với lương) và lạm phát "xấu" (nhập khẩu, ăn mòn sức mua thực tế).</JP_T>
        <div style={{marginTop:8,padding:10,background:`${JP_C.orange}08`,borderRadius:6,border:`1px solid ${JP_C.orange}20`}}>
          <span style={{color:JP_C.orange,fontWeight:700}}>Phản ứng thị trường tức thời: </span>
          <span style={{color:JP_C.text,fontSize:12.5}}>Nghịch lý điển hình: dù đây là lần tăng lãi suất đầu tiên sau 17 năm, đồng yen vẫn <JP_B>giảm giá mạnh</JP_B> ngay sau công bố (thị trường đã định giá trước, và BOJ cam kết giữ "điều kiện tài chính nới lỏng trong thời gian tới") — có thời điểm rơi xuống mức yếu nhất so với Euro kể từ 2008.</span>
        </div>
      </JP_Card>
    </div>
  );
}

function JP_TabRecent() {
  return (
    <div>
      <div style={{marginBottom:16,padding:"14px 18px",background:JP_C.panel,borderRadius:8,
        border:`1px solid ${JP_C.border}`,borderLeft:`4px solid ${JP_C.orange}`}}>
        <div style={{color:JP_C.orange,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>DIỄN BIẾN GẦN NHẤT 2024-2026</div>
        <p style={{color:JP_C.text,fontSize:13,lineHeight:1.65,margin:0}}>Ba sự kiện định hình lại cục diện kinh tế-chính trị Nhật trong giai đoạn gần nhất: cuộc "hôn nhân" ô tô đổ vỡ, khủng hoảng logistics nội địa, và sự thay đổi lãnh đạo chính trị mang tên "Sanaenomics".</p>
      </div>
      <JP_Card style={{marginBottom:16}}>
        <JP_STitle color={JP_C.red}>Nissan-Honda — Từ "Sáp Nhập Thế Kỷ" Đến Đổ Vỡ</JP_STitle>
        <JP_T>Vụ đàm phán sáp nhập lớn nhất lịch sử ngành ô tô Nhật — nếu thành công sẽ tạo ra tập đoàn Honda-Nissan-Mitsubishi với hơn 8 triệu xe bán ra/năm, lọt top các hãng xe lớn nhất thế giới — đã sụp đổ chỉ sau 2 tháng đàm phán chính thức.</JP_T>
        <JP_TL events={[
          {year:"12/2024",title:"Ký Biên Bản Ghi Nhớ (MOU) sáp nhập",color:JP_C.blue,desc:"Honda và Nissan công bố kế hoạch lập công ty holding chung, dự kiến đưa cả Mitsubishi Motors (Nissan sở hữu 24%) vào cùng tập đoàn"},
          {year:"Đầu 1/2025",title:"Honda chuyển hướng đòi biến Nissan thành công ty con",color:JP_C.orange,desc:"Thay vì mô hình 'sáp nhập ngang hàng' ban đầu — Honda muốn tự chọn Chủ tịch và đa số ghế HĐQT công ty holding"},
          {year:"13/2/2025",title:"Chính thức chấm dứt đàm phán",color:JP_C.crimson||JP_C.red,desc:"CEO Honda Mibe: 'Chúng tôi đề xuất cấu trúc một-quản-trị nhưng không đạt được thỏa thuận'. Họp HĐQT khẩn Nissan: chỉ 2/12 thành viên ủng hộ tiếp tục đàm phán"},
          {year:"2025",title:"Nissan công bố lỗ ròng ¥80 tỷ",color:JP_C.red,desc:"Đảo chiều hoàn toàn từ lãi ¥426.6 tỷ năm trước — kế hoạch tái cấu trúc cắt 9,000 việc làm (7% nhân sự), giảm 20% công suất sản xuất bị Honda đánh giá 'quá chậm'"},
          {year:"2026",title:"Quay lại hợp tác hẹp — không sáp nhập",color:JP_C.gold,desc:"CEO Nissan Espinosa (4/2026): đàm phán mới chỉ về từng dự án cụ thể — chia sẻ năng lực sản xuất tại Mỹ, kiến trúc phần cứng xe điện, có thể cả stack phần mềm chung"},
        ]}/>
        <JP_T style={{marginTop:8}}><JP_HL c={JP_C.red}>Ý nghĩa cấu trúc:</JP_HL> Vụ đổ vỡ phơi bày một điểm yếu quan trọng của mô hình quản trị doanh nghiệp truyền thống Nhật — văn hóa đồng thuận nội bộ mạnh (nhân vật Phó Chủ tịch phụ trách sản xuất Sakamoto phản đối quyết liệt việc "làm công ty con" dù không phải CEO) có thể vô hiệu hóa quyết định chiến lược cấp cao ngay cả khi ban lãnh đạo đã đồng thuận sơ bộ.</JP_T>
      </JP_Card>
      <JP_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <JP_Card>
          <JP_STitle color={JP_C.orange}>"Vấn Đề 2024" — Khủng Hoảng Logistics Tự Tạo</JP_STitle>
          <JP_T>Từ 1/4/2024, luật cải cách phong cách làm việc áp trần <JP_B>960 giờ làm thêm/năm</JP_B> (80 giờ/tháng) cho tài xế xe tải — nhằm cải thiện điều kiện lao động cho ngành vốn làm việc dài hơn 20% và lương thấp hơn 10% so với trung bình mọi ngành.</JP_T>
          <JP_Grid cols={2} gap={8} style={{marginTop:8}}>
            <JP_Metric label="Thiếu Hụt Năng Lực 2024" value="~14%" sub="So với năm cơ sở 2019" color={JP_C.orange}/>
            <JP_Metric label="Thiếu Hụt Dự Báo 2030" value="~34%" sub="Nếu không có biện pháp bổ sung" color={JP_C.red}/>
          </JP_Grid>
          <JP_T style={{marginTop:8}}>Hơn <JP_B>90% hàng hóa nội địa Nhật vận chuyển bằng đường bộ</JP_B> — Viện Nghiên cứu Nomura ước tính đến 2030 có thể <JP_HL c={JP_C.red}>1/3 lượng hàng không thể vận chuyển được</JP_HL> nếu không cải cách triệt để. Thiếu hụt tài xế dự kiến đạt 240,000 người vào 2027.</JP_T>
        </JP_Card>
        <JP_Card>
          <JP_STitle color={JP_C.purple}>GPIF — Quỹ Hưu Trí Lớn Nhất Thế Giới</JP_STitle>
          <JP_T>Government Pension Investment Fund quản lý quỹ hưu trí công của Nhật — vượt xa mọi quỹ hưu trí quốc gia khác về quy mô tài sản.</JP_T>
          <JP_Grid cols={2} gap={8} style={{marginTop:8}}>
            <JP_Metric label="Tổng AUM (9/2025)" value="¥277T" sub="≈ $1.87 nghìn tỷ" color={JP_C.purple}/>
            <JP_Metric label="Xếp Hạng Toàn Cầu" value="#1" sub="Quỹ hưu trí công lớn nhất thế giới" color={JP_C.gold}/>
          </JP_Grid>
          <JP_T style={{marginTop:8}}>Suốt hơn một thập kỷ lãi suất trong nước gần 0%, GPIF cùng các công ty bảo hiểm nhân thọ Nhật buộc phải "săn lợi suất" ở nước ngoài — đổ hàng trăm tỷ USD vào TPCP Mỹ và tài sản toàn cầu khác. Khi BOJ bình thường hóa lãi suất, dòng vốn khổng lồ này đang đứng trước áp lực <JP_HL c={JP_C.purple}>"quay đầu về nước" (repatriation)</JP_HL> — một biến số quan trọng cần theo dõi cho thị trường trái phiếu toàn cầu.</JP_T>
          <div style={{marginTop:8,padding:10,background:`${JP_C.orange}08`,borderRadius:6,border:`1px solid ${JP_C.orange}20`}}>
            <span style={{color:JP_C.orange,fontWeight:700}}>Cập nhật quan trọng: </span>
            <span style={{color:JP_C.text,fontSize:12}}>Sau 33 năm liên tục giữ ngôi "chủ nợ ròng lớn nhất thế giới" (Net International Investment Position ~$3.6 nghìn tỷ), <JP_B>Đức đã vượt qua Nhật</JP_B> tính theo USD — không phải vì Nhật tích lũy chậm lại, mà do hiệu ứng tỷ giá: yen mất giá mạnh làm tài sản nước ngoài của Nhật (định giá bằng ngoại tệ) quy đổi ra ít USD hơn tương đối. Tính theo yen, vị thế chủ nợ của Nhật vẫn tăng đều.</span>
          </div>
        </JP_Card>
      </JP_Grid>
      <JP_Card>
        <JP_STitle color={JP_C.gold}>"Sanaenomics" — Chuyển Giao Quyền Lực Chính Trị 10/2025</JP_STitle>
        <JP_T>Takaichi Sanae nhậm chức Thủ tướng tháng 10/2025, mang đến định hướng tài khóa mới được truyền thông gọi là <JP_B>"Sanaenomics"</JP_B> — kế thừa tinh thần chủ động tài khóa của Abenomics nhưng nhấn mạnh "tài chính có trách nhiệm và chủ động" (responsible and proactive public finances).</JP_T>
        <JP_Grid cols={2} gap={12} style={{marginTop:10}}>
          <div style={{padding:12,background:`${JP_C.gold}08`,borderRadius:6,border:`1px solid ${JP_C.gold}20`}}>
            <div style={{color:JP_C.gold,fontSize:10,fontWeight:700,marginBottom:6}}>GÓI KÍCH THÍCH TOÀN DIỆN (11/2025)</div>
            <div style={{color:JP_C.text,fontSize:12,lineHeight:1.7}}>
              Quy mô ~¥21.3 nghìn tỷ — ưu tiên giảm gánh nặng chi phí sinh hoạt tăng cao; nâng "ngưỡng 1.03 triệu yên" (rào cản thuế cho người có thu nhập phụ) lên 1.6 triệu yên; cắt giảm thuế thu nhập ~¥1.2 nghìn tỷ
            </div>
          </div>
          <div style={{padding:12,background:JP_C.card2,borderRadius:6}}>
            <div style={{color:JP_C.blue,fontSize:10,fontWeight:700,marginBottom:6}}>NGUYÊN TẮC TÀI KHÓA TUYÊN BỐ</div>
            <div style={{color:JP_C.text,fontSize:12,lineHeight:1.7}}>
              Phát hành trái phiếu chính phủ mới vẫn thấp hơn mức ¥42.1 nghìn tỷ của FY2024 — chính phủ khẳng định đây không phải "mở rộng vì mở rộng" mà là "chi tiêu khôn ngoan có mục tiêu"
            </div>
          </div>
        </JP_Grid>
        <JP_T style={{marginTop:8}}><JP_HL c={JP_C.orange}>Điểm cần theo dõi:</JP_HL> Cách tiếp cận "chủ động tài khóa" trong bối cảnh nợ công đã ~260% GDP tạo ra căng thẳng cố hữu với mục tiêu bình thường hóa chính sách tiền tệ của BOJ — nếu chi tiêu tài khóa quá mạnh trong khi BOJ tiếp tục tăng lãi suất, chi phí trả lãi nợ công sẽ tăng nhanh, thu hẹp dư địa chính sách trong tương lai.</JP_T>
      </JP_Card>
    </div>
  );
}

function JP_TabLostDecades() {
  return (
    <div>
      <JP_Card style={{marginBottom:16}}>
        <JP_STitle color={JP_C.crimson}>Ba Thập Kỷ Mất Mát — "Tấm Gương" Cho Các Nền Kinh Tế Khác</JP_STitle>
        <JP_T>Nhật Bản là nền kinh tế lớn đầu tiên trải qua chu kỳ giảm phát-trì trệ kéo dài trong lịch sử hiện đại, sau khi bong bóng bất động sản-chứng khoán khổng lồ vỡ đầu thập niên 1990. Đây là bài học tham chiếu quan trọng nhất khi phân tích rủi ro "Japanification" của các nền kinh tế khác.</JP_T>
        <JP_TL events={[
          {year:"1989",title:"Đỉnh bong bóng — Nikkei chạm gần 39,000 điểm",color:JP_C.gold,desc:"Giá đất tại Tokyo được ví có thể mua lại toàn bộ nước Mỹ theo giá trị danh nghĩa lúc đó"},
          {year:"1990-91",title:"Bong bóng vỡ",color:JP_C.crimson,desc:"BOJ tăng lãi suất mạnh chống đầu cơ → thị trường bất động sản và chứng khoán sụp đổ đồng loạt"},
          {year:"1990s",title:'"Thập kỷ mất mát" đầu tiên',color:JP_C.orange,desc:"Ngân hàng ôm nợ xấu khổng lồ nhưng trì hoãn xử lý ('zombie banks' nuôi 'zombie companies') — tăng trưởng gần như đình trệ"},
          {year:"1999",title:"BOJ hạ lãi suất về 0% lần đầu tiên",color:JP_C.blue,desc:"Chính sách Zero Interest Rate Policy (ZIRP) — tiền lệ cho toàn thế giới sau này (Fed, ECB áp dụng tương tự sau 2008)"},
          {year:"2013",title:"Abenomics — 'Ba Mũi Tên'",color:JP_C.green,desc:"Thủ tướng Abe Shinzo phát động: nới lỏng tiền tệ cực mạnh + kích thích tài khóa + cải cách cấu trúc — nỗ lực thoát giảm phát toàn diện nhất"},
        ]}/>
      </JP_Card>
      <JP_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <JP_Card>
          <JP_STitle color={JP_C.blue}>So Sánh Nhật 1990 vs Trung Quốc 2024 — Khác Biệt Quyết Định</JP_STitle>
          {[
            {t:"Giàu trước khi già",d:"GDP/người Nhật 1990 đã ~$25,000 (nước phát triển) — TQ 2024 chỉ ~$12,500 (thu nhập trung bình)",c:JP_C.green},
            {t:"Thể chế dân chủ ổn định",d:"Nhật có cơ chế chính trị tự sửa lỗi, minh bạch số liệu — TQ thiếu phản hồi thị trường độc lập",c:JP_C.blue},
            {t:"Không đối đầu địa chính trị lớn",d:"Nhật không bị cấm vận/chiến tranh thương mại toàn diện như TQ hiện tại đối đầu Mỹ",c:JP_C.gold},
            {t:"Đồng minh an ninh vững chắc với Mỹ",d:"Không phải phân tán nguồn lực cho đối đầu quân sự — TQ phải cân bằng chi tiêu quốc phòng lớn",c:JP_C.purple},
          ].map((item,i)=>(
            <div key={i} style={{marginBottom:10,paddingLeft:12,borderLeft:`2px solid ${item.c}`}}>
              <div style={{color:item.c,fontSize:12,fontWeight:700}}>{item.t}</div>
              <div style={{color:JP_C.text,fontSize:12,lineHeight:1.6}}>{item.d}</div>
            </div>
          ))}
        </JP_Card>
        <JP_Card>
          <JP_STitle color={JP_C.orange}>Điểm Tương Đồng Đáng Lo Ngại</JP_STitle>
          {[
            {t:"Bong bóng bất động sản khổng lồ trước khủng hoảng",c:JP_C.crimson},
            {t:"Mô hình tăng trưởng đầu tư-xuất khẩu phụ thuộc quá lâu",c:JP_C.orange},
            {t:"Dân số già hóa nhanh, tỷ lệ sinh giảm sâu",c:JP_C.gold},
            {t:"Ngân hàng trì hoãn xử lý nợ xấu ('zombie' hóa hệ thống)",c:JP_C.purple},
            {t:"Chính sách kích thích lặp lại nhưng hiệu quả giảm dần (diminishing returns)",c:JP_C.blue},
          ].map((item,i)=>(
            <div key={i} style={{display:"flex",gap:8,marginBottom:9,alignItems:"flex-start"}}>
              <span style={{color:item.c}}>▸</span>
              <span style={{color:JP_C.text,fontSize:12.5,lineHeight:1.6}}>{item.t}</span>
            </div>
          ))}
          <div style={{marginTop:10,padding:10,background:`${JP_C.gold}08`,borderRadius:6,border:`1px solid ${JP_C.gold}20`}}>
            <span style={{color:JP_C.gold,fontSize:12}}>Kết luận: Nhật là "phiên bản nhẹ hơn" của rủi ro mà nhiều nền kinh tế khác đang đối mặt — bài học không phải là tuyệt vọng mà là khả năng "quản lý suy giảm" trong nhiều thập kỷ mà không sụp đổ.</span>
          </div>
        </JP_Card>
      </JP_Grid>
      <JP_Card>
        <JP_STitle color={JP_C.purple}>Khủng Hoảng Nhân Khẩu Học Nghiêm Trọng Nhất G7</JP_STitle>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={JP_AGING_POP} margin={{top:5,right:10,bottom:5,left:-10}}>
            <defs>
              <linearGradient id="ageG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={JP_C.crimson} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={JP_C.crimson} stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="y" tick={{fill:JP_C.dim,fontSize:10}} axisLine={{stroke:JP_C.border}} tickLine={false}/>
            <YAxis tick={{fill:JP_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip content={<JP_TT/>}/>
            <Area type="monotone" dataKey="v" stroke={JP_C.crimson} fill="url(#ageG)" strokeWidth={2} name="% Dân số 65+"/>
          </AreaChart>
        </ResponsiveContainer>
        <JP_T style={{marginTop:8}}>Dân số Nhật giảm liên tục từ đỉnh 2008 (~128 triệu) — dự báo còn ~100 triệu vào 2050. Nhưng khác Trung Quốc, Nhật có <JP_B>nguồn lực tài chính-công nghệ để thích ứng dần</JP_B>: đầu tư mạnh vào robot công nghiệp/dịch vụ, tự động hóa sản xuất, và gần đây bắt đầu mở cửa nhập cư lao động có tay nghề — một bước ngoặt văn hóa lớn cho quốc gia vốn cực kỳ hạn chế nhập cư trong lịch sử.</JP_T>
      </JP_Card>
    </div>
  );
}

function JP_TabIndustry() {
  return (
    <div>
      <JP_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <JP_Card>
          <JP_STitle>Cơ Cấu Ngành Xuất Khẩu Chủ Lực (%)</JP_STitle>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={JP_SECTOR_STRENGTH} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                dataKey="v" nameKey="n" paddingAngle={2}>
                {JP_SECTOR_STRENGTH.map((_,i)=><Cell key={i} fill={JP_PIE_COLORS[i]}/>)}
              </Pie>
              <Tooltip formatter={(v,n)=>[`${v}%`,n]}/>
              <Legend wrapperStyle={{color:JP_C.text,fontSize:11}}/>
            </PieChart>
          </ResponsiveContainer>
        </JP_Card>
        <JP_Card>
          <JP_STitle color={JP_C.blue}>Vị Thế Công Nghiệp Toàn Cầu — Vẫn Mạnh Ở Phân Khúc Cụ Thể</JP_STitle>
          {[
            {s:"Ô Tô",r:"Dẫn đầu",c:JP_C.green,d:"Toyota, Honda vẫn top đầu doanh số toàn cầu, mạnh về hybrid dù chậm hơn về thuần điện (EV)"},
            {s:"Vật Liệu & Thiết Bị Bán Dẫn",r:"Thống trị ngách",c:JP_C.green,d:"Tokyo Electron, Shin-Etsu — mắt xích không thể thay thế trong chuỗi cung ứng chip toàn cầu"},
            {s:"Robot Công Nghiệp",r:"Dẫn đầu",c:JP_C.green,d:"FANUC, Yaskawa — chiếm thị phần lớn robot công nghiệp thế giới, lợi thế trực tiếp từ nhu cầu tự động hóa do thiếu lao động"},
            {s:"Điện Tử Tiêu Dùng",r:"Suy giảm",c:JP_C.orange,d:"Sony vẫn mạnh về cảm biến ảnh & game, nhưng Panasonic/Sharp mất vị thế trước Hàn Quốc-Trung Quốc"},
            {s:"Bán Dẫn Logic Tiên Tiến",r:"Tụt hậu",c:JP_C.crimson,d:"Mất vị thế dẫn đầu từ 1990s vào tay Hàn Quốc (Samsung) và Đài Loan (TSMC) — đang nỗ lực tái thiết qua dự án Rapidus"},
          ].map((item,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",
              padding:"7px 0",borderBottom:`1px solid ${JP_C.border}25`}}>
              <div>
                <div style={{color:JP_C.bright,fontSize:12,fontWeight:600}}>{item.s}</div>
                <div style={{color:JP_C.dim,fontSize:11}}>{item.d}</div>
              </div>
              <span style={{color:item.c,fontSize:11,fontWeight:700,whiteSpace:"nowrap",marginLeft:8}}>{item.r}</span>
            </div>
          ))}
        </JP_Card>
      </JP_Grid>
      <JP_Card style={{marginBottom:16}}>
        <JP_STitle color={JP_C.gold}>Warren Buffett & Sogo Shosha — Dòng Vốn Quốc Tế Quay Lại Nhật</JP_STitle>
        <JP_T>Từ 2020, Berkshire Hathaway của Warren Buffett âm thầm tích lũy cổ phần tại 5 tập đoàn thương mại tổng hợp lớn nhất Nhật (Sogo Shosha): Mitsubishi, Mitsui, Itochu, Sumitomo, Marubeni — nâng dần lên trên 9% mỗi công ty. Đây được coi là tín hiệu quan trọng cho niềm tin trở lại của giới đầu tư quốc tế vào TTCK Nhật sau nhiều thập kỷ bị định giá thấp.</JP_T>
        <div style={{marginTop:10,padding:12,background:`${JP_C.gold}08`,borderRadius:6,border:`1px solid ${JP_C.gold}20`}}>
          <span style={{color:JP_C.gold,fontWeight:700}}>Bối cảnh rộng hơn: </span>
          <span style={{color:JP_C.text,fontSize:12.5}}>Cải cách quản trị doanh nghiệp (corporate governance reform) từ Sở Giao dịch Tokyo yêu cầu các công ty niêm yết cải thiện hiệu quả sử dụng vốn, tăng cổ tức, mua lại cổ phiếu — góp phần đưa Nikkei 225 vượt đỉnh lịch sử 1989 lần đầu tiên vào tháng 2/2024, sau 34 năm.</span>
        </div>
      </JP_Card>
      <JP_Card>
        <JP_STitle color={JP_C.purple}>Rapidus — Canh Bạc Tái Thiết Ngành Bán Dẫn Tiên Tiến</JP_STitle>
        <JP_T>Chính phủ Nhật hậu thuẫn dự án Rapidus — liên doanh giữa 8 tập đoàn lớn (Toyota, Sony, NTT, SoftBank...) với mục tiêu sản xuất chip logic 2nm vào 2027, hợp tác kỹ thuật với IBM. Đây là nỗ lực tham vọng nhất để giành lại vị thế dẫn đầu bán dẫn đã mất từ thập niên 1990 — phần nào phản ánh cùng logic địa chính trị chip war đang định hình chiến lược công nghiệp Mỹ (CHIPS Act) và EU.</JP_T>
      </JP_Card>
    </div>
  );
}

function JP_TabExpert() {
  return (
    <div>
      <div style={{marginBottom:20,padding:"16px 20px",background:JP_C.panel,borderRadius:8,
        border:`1px solid ${JP_C.border}`,borderLeft:`4px solid ${JP_C.sakura}`}}>
        <div style={{color:JP_C.sakura,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>GÓC CHUYÊN GIA — TỔNG HỢP QUAN ĐIỂM VỀ NHẬT BẢN</div>
        <p style={{color:JP_C.bright,fontSize:14,lineHeight:1.75,margin:0}}>
          Tổng hợp các đoạn phân tích <JP_HL>đặc thù cho Nhật Bản</JP_HL> rút ra từ nhiều bài viết vĩ mô khác nhau của cùng một tác giả —
          Nhật chủ yếu xuất hiện như điểm tham chiếu so sánh khi phân tích Trung Quốc và hệ thống tiền tệ toàn cầu, không phải chủ đề chính của bài riêng nào.
        </p>
        <div style={{color:JP_C.dim,fontSize:11,marginTop:8,fontStyle:"italic"}}>
          * Tóm tắt quan điểm cá nhân của tác giả các bài viết, trình bày để đối chiếu góc nhìn — không phải nhận định của phân tích chính trong các tab khác.
        </div>
      </div>

      <JP_Card style={{marginBottom:16}}>
        <JP_STitle>Nhật Là Chủ Nợ Lớn Nhất Của Mỹ — Vị Thế Đặc Biệt Trong Hệ Thống USD</JP_STitle>
        <JP_T>Từ bài "Nợ Có Làm CP Mỹ Sụp Đổ Không?" (05/2025): trong phân tích cơ cấu chủ nợ nước ngoài của Mỹ, Nhật Bản được xác định là <JP_B>chủ nợ lớn nhất</JP_B> — vượt cả Trung Quốc:</JP_T>
        <div style={{margin:"10px 0",padding:14,background:JP_C.card2,borderRadius:8,border:`1px solid ${JP_C.border}`}}>
          <JP_Grid cols={2} gap={10}>
            <div style={{textAlign:"center",padding:10}}>
              <div style={{color:JP_C.blue,fontSize:20,fontWeight:700,fontFamily:"monospace"}}>~$1.13 nghìn tỷ</div>
              <div style={{color:JP_C.dim,fontSize:11}}>Nhật nắm giữ (3.3% tổng nợ Mỹ)</div>
            </div>
            <div style={{textAlign:"center",padding:10}}>
              <div style={{color:JP_C.crimson,fontSize:20,fontWeight:700,fontFamily:"monospace"}}>~$816 tỷ</div>
              <div style={{color:JP_C.dim,fontSize:11}}>Trung Quốc nắm giữ (2.4%, đang giảm)</div>
            </div>
          </JP_Grid>
        </div>
        <JP_T><JP_HL c={JP_C.blue}>Ý nghĩa chiến lược:</JP_HL> Tác giả xếp Nhật cùng nhóm "đồng minh truyền thống" (cùng Anh, EU) nắm giữ phần lớn nợ nước ngoài của Mỹ — nhóm này được đánh giá có "công cụ tài chính và chính trị để không bán tháo ào ạt hay cơ cấu lại" — khác hẳn nhóm quốc gia "có thể mâu thuẫn lợi ích" với Mỹ. Vị thế đồng minh an ninh giúp Nhật vừa là chủ nợ lớn vừa được coi là ổn định, không gây rủi ro hệ thống cho chính đồng tiền mình đang nắm giữ khối lượng lớn.</JP_T>
      </JP_Card>

      <JP_Card style={{marginBottom:16}}>
        <JP_STitle color={JP_C.orange}>Nhật Trong Khung "Đối Tác Ổn Định" Của Học Thuyết Rubio (2025)</JP_STitle>
        <JP_T>Từ phỏng vấn Ngoại trưởng Marco Rubio: dù không được nhắc trực tiếp nhiều như Trung Quốc/Nga, vị trí của Nhật trong tư duy chiến lược Mỹ có thể suy ra qua đối chiếu — Nhật là hình mẫu "đối tác đóng góp đủ" mà Rubio dùng để so sánh với các đồng minh NATO "ăn theo":</JP_T>
        <div style={{padding:12,background:`${JP_C.orange}08`,borderRadius:6,border:`1px solid ${JP_C.orange}20`,marginTop:8}}>
          <span style={{color:JP_C.orange,fontWeight:700}}>Bối cảnh Ấn Độ Dương-Thái Bình Dương: </span>
          <span style={{color:JP_C.text,fontSize:12.5}}>Rubio: "Ấn Độ Dương - Thái Bình Dương, nơi mà mỗi ngày — không chỉ Đài Loan mà cả Philippines — đang bị Trung Quốc thách thức mạnh mẽ về mặt quân sự" — đặt Nhật vào vị trí đồng minh tuyến đầu quan trọng ngang hàng NATO châu Âu trong chiến lược kiềm chế Trung Quốc, khác biệt với vai trò "phụ thuộc" mà Rubio phê phán ở Đức-Pháp.</span>
        </div>
      </JP_Card>

      <JP_Card>
        <JP_STitle color={JP_C.purple}>Nhật Như "Đối Chiếu Ngầm" Khi Phân Tích Trung Quốc</JP_STitle>
        <JP_T>Điểm đáng chú ý: trong toàn bộ 15 bài viết được khảo sát, <JP_B>không có bài nào phân tích trực tiếp, chuyên sâu về kinh tế Nhật Bản</JP_B> như một chủ đề độc lập — Nhật luôn xuất hiện như điểm neo tham chiếu (reference point) khi phân tích các chủ đề khác:</JP_T>
        <JP_Grid cols={2} gap={12} style={{marginTop:10}}>
          <div style={{padding:12,background:JP_C.card2,borderRadius:6}}>
            <div style={{color:JP_C.purple,fontSize:10,fontWeight:700,marginBottom:6}}>KHI PHÂN TÍCH ESG/TĂNG TRƯỞNG</div>
            <div style={{color:JP_C.text,fontSize:12,lineHeight:1.7}}>Nhật được nhắc trong bối cảnh "kinh tế thế giới sau thịnh vượng 80s-90s giảm tốc" — cùng nhóm Âu-Mỹ "đã đạt đỉnh" động lực tiêu dùng cũ.</div>
          </div>
          <div style={{padding:12,background:JP_C.card2,borderRadius:6}}>
            <div style={{color:JP_C.blue,fontSize:10,fontWeight:700,marginBottom:6}}>KHI PHÂN TÍCH LÃI SUẤT ÂM</div>
            <div style={{color:JP_C.text,fontSize:12,lineHeight:1.7}}>Nhật là tiền lệ lịch sử cho chính sách lãi suất âm mà Fed/ECB áp dụng sau này — dù các bài viết gốc không phân tích sâu cơ chế BOJ cụ thể.</div>
          </div>
        </JP_Grid>
        <div style={{marginTop:10,padding:12,background:`${JP_C.gold}08`,borderRadius:6,border:`1px solid ${JP_C.gold}20`}}>
          <span style={{color:JP_C.gold,fontWeight:700}}>Nhận xét phương pháp luận: </span>
          <span style={{color:JP_C.text,fontSize:12.5}}>Việc thiếu phân tích chuyên sâu trực tiếp về Nhật trong nguồn tư liệu gốc là lý do phần lớn nội dung các tab khác của file này (Yen Carry Trade, Ba Thập Kỷ Mất Mát, Ngành Công Nghiệp) dựa trên kiến thức nền tổng hợp — không trích dẫn trực tiếp từ tác giả như các file Mỹ/Trung/Nga/EU. Đây là điểm khác biệt quan trọng cần lưu ý khi đọc file này.</span>
        </div>
      </JP_Card>
    </div>
  );
}

const JP_TABS = [
  {id:0,label:"Dashboard",icon:"📊"},
  {id:1,label:"Yen Carry Trade",icon:"💴"},
  {id:2,label:"Diễn Biến 2024-2026",icon:"🆕"},
  {id:3,label:"Ba Thập Kỷ Mất Mát",icon:"📉"},
  {id:4,label:"Công Nghiệp & Vốn",icon:"🏭"},
  {id:5,label:"Góc Chuyên Gia",icon:"🎓"},
];
const JP_CONTENT = [
  <JP_TabDashboard/>,<JP_TabCarryTrade/>,<JP_TabRecent/>,<JP_TabLostDecades/>,<JP_TabIndustry/>,<JP_TabExpert/>,
];

/* ==================== TỔNG QUAN TOÀN CẦU (GL) ==================== */
const GL_C = {
  bg:"#FAF9F6", panel:"#FFFFFF", card:"#FFFFFF", card2:"#F3F3F8",
  border:"#E4E4EE", text:"#5F5F72", bright:"#16161F", dim:"#8E8EA0",
  muted:"#6E6E86", gold:"#A9821E",
  us:"#2A6BB8", cn:"#B8433D", ru:"#B83A47", eu:"#A88400", jp:"#C25577",
  red:"#B8443F", green:"#238F5E", blue:"#2A6BB8", purple:"#7255C9", orange:"#C46E30",
};

const GL_GDP_SHARE = [
  {n:"Mỹ",v:26.3,c:GL_C.us},{n:"Trung Quốc",v:16.9,c:GL_C.cn},{n:"EU",v:16.6,c:GL_C.eu},
  {n:"Nhật",v:3.9,c:GL_C.jp},{n:"Nga",v:1.9,c:GL_C.ru},{n:"Khác",v:34.4,c:GL_C.dim},
];
const GL_RESERVE_CURRENCY = [
  {n:"USD",v:58,c:GL_C.us},{n:"EUR",v:20,c:GL_C.eu},{n:"JPY",v:5.7,c:GL_C.jp},
  {n:"GBP",v:4.9,c:GL_C.dim},{n:"CNY",v:2.3,c:GL_C.cn},{n:"Khác",v:9.1,c:GL_C.muted},
];
const GL_DEBT_GDP_COMPARE = [
  {n:"Nhật",v:260,c:GL_C.jp},{n:"Trung Quốc",v:310,c:GL_C.cn},{n:"Mỹ",v:122,c:GL_C.us},
  {n:"EU (TB)",v:88,c:GL_C.eu},{n:"Nga",v:20,c:GL_C.ru},
];
const GL_POLICY_RATES = [
  {y:"2021",us:0.25,eu:0,jp:-0.1,cn:3.85},
  {y:"2022",us:4.5,eu:2.5,jp:-0.1,cn:3.65},
  {y:"2023",us:5.5,eu:4.0,jp:-0.1,cn:3.45},
  {y:"2024",us:4.5,eu:3.15,jp:0.25,cn:3.1},
  {y:"2025",us:4.0,eu:2.15,jp:0.5,cn:3.0},
];
const GL_AGING_COMPARE = [
  {n:"Nhật",v2024:29.3,c:GL_C.jp},
  {n:"EU (TB)",v2024:21.3,c:GL_C.eu},
  {n:"Trung Quốc",v2024:15.4,c:GL_C.cn},
  {n:"Mỹ",v2024:18.1,c:GL_C.us},
  {n:"Nga",v2024:16.5,c:GL_C.ru},
];
const GL_DEFENSE_SPEND_GLOBAL = [
  {n:"Mỹ",v:954,c:GL_C.us},{n:"Trung Quốc",v:336,c:GL_C.cn},{n:"EU-27",v:392,c:GL_C.eu},
  {n:"Nga",v:145,c:GL_C.ru},{n:"Nhật",v:58,c:GL_C.jp},
];
const GL_RISK_RADAR = [
  {s:"Nợ Toàn Cầu",v:82},{s:"Phân Mảnh Đa Cực",v:78},{s:"Nhân Khẩu Học",v:75},
  {s:"Chip War",v:70},{s:"Năng Lượng",v:60},{s:"Tiền Tệ Dễ Dãi",v:68},
  {s:"Địa CT (Đài Loan)",v:65},{s:"Bảo Hộ TM",v:72},
];

const GL_TT = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  return (
    <div style={{background:GL_C.panel,border:`1px solid ${GL_C.border}`,borderRadius:6,padding:"8px 12px"}}>
      <div style={{color:GL_C.gold,fontSize:11,fontWeight:700,marginBottom:4}}>{label}</div>
      {payload.map((p,i)=>(
        <div key={i} style={{color:p.color||GL_C.bright,fontSize:12}}>
          {p.name}: <span style={{fontFamily:"monospace",fontWeight:700}}>{typeof p.value==="number"?p.value.toFixed(1):p.value}</span>
        </div>
      ))}
    </div>
  );
};
const GL_Card = ({children,style={}}) => (
  <div style={{background:GL_C.card,border:`1px solid ${GL_C.border}`,borderRadius:8,padding:20,...style}}>{children}</div>
);
const GL_STitle = ({children,color=GL_C.gold}) => (
  <div style={{color,fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",
    marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
    <div style={{width:14,height:2,background:color,borderRadius:1,flexShrink:0}}/>{children}
  </div>
);
const GL_T = ({children,style}) => <p style={{color:GL_C.text,fontSize:13.5,lineHeight:1.75,margin:"5px 0",...style}}>{children}</p>;
const GL_B = ({children}) => <span style={{color:GL_C.bright,fontWeight:600}}>{children}</span>;
const GL_HL = ({children,c=GL_C.gold}) => <span style={{color:c,fontWeight:600}}>{children}</span>;
const GL_Metric = ({label,value,sub,color=GL_C.blue,warn}) => (
  <div style={{background:GL_C.card,border:`1px solid ${GL_C.border}`,borderRadius:8,
    padding:"14px 16px",borderTop:`3px solid ${color}`}}>
    <div style={{color:GL_C.muted,fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>{label}</div>
    <div style={{color,fontSize:22,fontWeight:700,fontFamily:"monospace",letterSpacing:"-0.02em"}}>{value}</div>
    {sub&&<div style={{color:GL_C.dim,fontSize:11,marginTop:3}}>{sub}</div>}
    {warn&&<div style={{color:GL_C.red,fontSize:10,marginTop:2,fontWeight:700}}>{warn}</div>}
  </div>
);
const GL_Badge = ({level}) => {
  const m={"Rất Cao":"#B8222C",Cao:GL_C.red,"Trung Bình":GL_C.gold,Thấp:GL_C.green};
  const c=m[level]||GL_C.gold;
  return <span style={{background:c+"20",color:c,border:`1px solid ${c}40`,
    borderRadius:4,padding:"2px 8px",fontSize:10,fontWeight:700}}>{level}</span>;
};
const GL_Grid = ({cols=2,gap=16,children,style}) => (
  <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap,...style}}>{children}</div>
);
const GL_TL = ({events}) => (
  <div style={{position:"relative",paddingLeft:22}}>
    <div style={{position:"absolute",left:7,top:4,bottom:4,width:1.5,background:GL_C.border}}/>
    {events.map((e,i)=>(
      <div key={i} style={{marginBottom:14,position:"relative"}}>
        <div style={{position:"absolute",left:-18,top:4,width:9,height:9,borderRadius:"50%",
          background:e.color||GL_C.gold,boxShadow:`0 0 6px ${e.color||GL_C.gold}60`}}/>
        <div style={{color:e.color||GL_C.gold,fontSize:10,fontWeight:700,letterSpacing:"0.06em"}}>{e.year}</div>
        <div style={{color:GL_C.bright,fontSize:13,fontWeight:600,marginTop:1}}>{e.title}</div>
        <div style={{color:GL_C.text,fontSize:12,lineHeight:1.6,marginTop:2}}>{e.desc}</div>
      </div>
    ))}
  </div>
);

function GL_TabDashboard() {
  return (
    <div>
      <div style={{marginBottom:20,padding:"18px 22px",background:GL_C.panel,borderRadius:8,
        border:`1px solid ${GL_C.border}`,borderLeft:`4px solid ${GL_C.gold}`}}>
        <div style={{color:GL_C.gold,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>BỨC TRANH VĨ MÔ TOÀN CẦU — TỔNG HỢP 5 NỀN KINH TẾ</div>
        <p style={{color:GL_C.bright,fontSize:14.5,lineHeight:1.8,margin:0}}>
          Năm nền kinh tế — <GL_HL c={GL_C.us}>Mỹ</GL_HL>, <GL_HL c={GL_C.cn}>Trung Quốc</GL_HL>, <GL_HL c={GL_C.eu}>EU</GL_HL>, <GL_HL c={GL_C.jp}>Nhật Bản</GL_HL>, <GL_HL c={GL_C.ru}>Nga</GL_HL> —
          chiếm gần <GL_B>66% GDP toàn cầu</GL_B> và định hình gần như mọi trục vận động lớn: dòng vốn, đồng tiền dự trữ, chuỗi cung ứng, chi tiêu quốc phòng.
          Không nền kinh tế nào trong số này vận động độc lập — <GL_HL>Nhật tài trợ thâm hụt Mỹ qua carry trade, Trung Quốc tìm "sân bay dự phòng"
          khỏi USD, EU chật vật giữa hai gọng kìm Mỹ-Trung, Nga bị đẩy vào quỹ đạo phụ thuộc Trung Quốc</GL_HL> — tạo thành một hệ thống liên đới
          chặt chẽ hơn bất kỳ giai đoạn nào kể từ Chiến tranh Lạnh.
        </p>
      </div>
      <GL_Grid cols={3} gap={12} style={{marginBottom:16}}>
        <GL_Metric label="Tổng GDP 5 Nền KT" value="~66%" sub="Của GDP toàn cầu danh nghĩa" color={GL_C.gold}/>
        <GL_Metric label="Chi Quốc Phòng Toàn Cầu 2025" value="$2.9 nghìn tỷ" sub="Cao nhất kể từ 2009 tính theo %GDP" color={GL_C.red} warn="Tăng 11 năm liên tiếp"/>
        <GL_Metric label="Thị Phần USD Dự Trữ TC" value="58%" sub="Giảm từ ~70% (2000) — chưa có đối thủ thay thế" color={GL_C.us}/>
        <GL_Metric label="Nợ Công Cao Nhất" value="Nhật 260%" sub="Trung Quốc ~310% tổng thể (bao gồm nợ ẩn)" color={GL_C.jp}/>
        <GL_Metric label="Tỷ Lệ Sinh Thấp Nhất" value="Trung Quốc 1.0" sub="Thấp hơn cả Nhật (1.2), Nga (1.4), EU (1.5)" color={GL_C.cn}/>
        <GL_Metric label="Điểm Nghẽn Chiến Lược" value="6+" sub="Đài Loan, Malacca, Hormuz, Panama, Kaliningrad, Greenland" color={GL_C.orange}/>
      </GL_Grid>
      <GL_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <GL_Card>
          <GL_STitle>Tỷ Trọng GDP Toàn Cầu (%)</GL_STitle>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={GL_GDP_SHARE} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                dataKey="v" nameKey="n" paddingAngle={2}>
                {GL_GDP_SHARE.map((d,i)=><Cell key={i} fill={d.c}/>)}
              </Pie>
              <Tooltip formatter={(v,n)=>[`${v}%`,n]}/>
              <Legend wrapperStyle={{color:GL_C.text,fontSize:11}}/>
            </PieChart>
          </ResponsiveContainer>
        </GL_Card>
        <GL_Card>
          <GL_STitle color={GL_C.red}>Radar Rủi Ro Hệ Thống Toàn Cầu (0–100)</GL_STitle>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={GL_RISK_RADAR} margin={{top:5,right:25,bottom:5,left:25}}>
              <PolarGrid stroke={GL_C.border}/>
              <PolarAngleAxis dataKey="s" tick={{fill:GL_C.dim,fontSize:9}}/>
              <PolarRadiusAxis angle={90} domain={[0,100]} tick={{fill:GL_C.dim,fontSize:8}}/>
              <Radar dataKey="v" stroke={GL_C.red} fill={GL_C.red} fillOpacity={0.22} strokeWidth={1.5} name="Rủi Ro"/>
            </RadarChart>
          </ResponsiveContainer>
        </GL_Card>
      </GL_Grid>
      <GL_Card style={{marginBottom:16}}>
        <GL_STitle color={GL_C.purple}>Nợ Công / GDP — So Sánh 5 Nền Kinh Tế (%)</GL_STitle>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={GL_DEBT_GDP_COMPARE} margin={{top:5,right:10,bottom:5,left:-10}}>
            <XAxis dataKey="n" tick={{fill:GL_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:GL_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip content={<GL_TT/>}/>
            <Bar dataKey="v" name="Nợ/GDP %" radius={[4,4,0,0]}>
              {GL_DEBT_GDP_COMPARE.map((d,i)=><Cell key={i} fill={d.c}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <GL_T style={{marginTop:8}}>Nghịch lý quan trọng: nợ cao nhất (Nhật, Trung Quốc) không đồng nghĩa rủi ro khủng hoảng cao nhất — cấu trúc chủ nợ (nội địa vs quốc tế) quan trọng hơn tỷ lệ tuyệt đối. Nga có tỷ lệ thấp nhất nhưng bị cô lập khỏi thị trường vốn quốc tế nên "an toàn" theo cách hoàn toàn khác.</GL_T>
      </GL_Card>
      <GL_Grid cols={3} gap={12}>
        {[
          {n:"Kịch Bản 1",t:"Đa Cực Ổn Định Có Quản Lý",p:"25–30%",c:GL_C.green,
            d:"Các cường quốc thiết lập được khuôn khổ cạnh tranh có luật chơi — tương tự Chiến tranh Lạnh nhưng nhiều cực hơn. Xung đột kinh tế nhưng tránh được chiến tranh nóng trực tiếp giữa các cường quốc lớn."},
          {n:"Kịch Bản 2 — CƠ SỞ",t:"Phân Mảnh Từ Từ, Không Khủng Hoảng Đột Ngột",p:"45–50%",c:GL_C.gold,
            d:'Toàn cầu hóa tiếp tục "phân luồng" theo khối địa chính trị, tăng trưởng chậm lại toàn cầu, mỗi nền kinh tế "quản lý suy giảm" theo cách riêng — không nước nào sụp đổ nhưng cũng không ai bứt phá rõ rệt.'},
          {n:"Kịch Bản 3",t:"Cú Sốc Hệ Thống (Đài Loan/Khủng Hoảng Nợ)",p:"20–25%",c:GL_C.red,
            d:"Một sự kiện kích hoạt (xung đột Đài Loan, khủng hoảng nợ Nhật/EU, hoặc khủng hoảng niềm tin USD) lan tỏa qua toàn bộ hệ thống liên đới do mức độ kết nối tài chính hiện nay."},
        ].map((s,i)=>(
          <div key={i} style={{background:GL_C.card,border:`1px solid ${GL_C.border}`,borderRadius:8,
            padding:16,borderTop:`3px solid ${s.c}`}}>
            <div style={{color:GL_C.muted,fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase"}}>{s.n}</div>
            <div style={{color:s.c,fontSize:13,fontWeight:700,margin:"4px 0"}}>{s.t}</div>
            <div style={{color:s.c,fontSize:20,fontWeight:700,fontFamily:"monospace",marginBottom:8}}>{s.p}</div>
            <div style={{color:GL_C.text,fontSize:12,lineHeight:1.65}}>{s.d}</div>
          </div>
        ))}
      </GL_Grid>
    </div>
  );
}

function GL_TabMultipolar() {
  return (
    <div>
      <GL_Card style={{marginBottom:16,borderLeft:`4px solid ${GL_C.gold}`}}>
        <GL_STitle>Thế Giới Đa Cực — Khung Phân Tích Từ Chính Washington</GL_STitle>
        <GL_T>Ngoại trưởng Mỹ Marco Rubio (2025) đưa ra một nhận định mang tính thừa nhận hiếm có từ phía siêu cường: thế giới đơn cực hậu Chiến tranh Lạnh là <GL_B>bất thường lịch sử</GL_B>, không phải trạng thái bình thường.</GL_T>
        <div style={{margin:"10px 0",padding:14,background:GL_C.card2,borderRadius:8,border:`1px solid ${GL_C.gold}30`,borderLeft:`4px solid ${GL_C.gold}`}}>
          <div style={{color:GL_C.text,fontSize:13,lineHeight:1.75,fontStyle:"italic"}}>
            "Không bình thường khi thế giới chỉ đơn giản có một cường quốc đơn cực... rồi cuối cùng chúng ta cũng sẽ quay trở lại điểm thế giới đa cực, với nhiều cường quốc ở các khu vực khác nhau trên hành tinh."
          </div>
        </div>
        <GL_T>Khung 3 chiều lợi ích quốc gia Mỹ dùng để phân tích mọi mối quan hệ song phương: <GL_HL c={GL_C.blue}>Thể chế</GL_HL> (có vận hành phù hợp trật tự Mỹ muốn?), <GL_HL c={GL_C.orange}>Vị trí địa lý</GL_HL> (vai trò trong hành lang kinh tế-quân sự chiến lược), <GL_HL c={GL_C.green}>Tài nguyên</GL_HL> (đặc biệt năng lượng, khoáng sản quan trọng).</GL_T>
      </GL_Card>
      <GL_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <GL_Card>
          <GL_STitle color={GL_C.cn}>Trung Quốc — Đối Thủ Chiến Lược Số 1</GL_STitle>
          <GL_T>Rubio: "Tương lai, lịch sử của thế kỷ 21 phần lớn sẽ xoay quanh những gì diễn ra giữa Mỹ và Trung Quốc." Nhận thức từ phía TQ (theo mô tả của Rubio): tin rằng TQ đang trên đà trỗi dậy không thể đảo ngược, còn phương Tây đang suy tàn không thể tránh khỏi.</GL_T>
          <div style={{padding:10,background:`${GL_C.cn}08`,borderRadius:6,border:`1px solid ${GL_C.cn}20`,marginTop:8}}>
            <span style={{color:GL_C.cn,fontSize:12}}>Đòn bẩy TQ nắm giữ: đất hiếm, cobalt, ~80% dược phẩm hoạt chất Mỹ, hạ tầng lưỡng dụng (Panama, tiềm năng Greenland/Bắc Cực)</span>
          </div>
        </GL_Card>
        <GL_Card>
          <GL_STitle color={GL_C.ru}>Nga — "Cường Quốc Cứng" Nhưng Kinh Tế Nhỏ</GL_STitle>
          <GL_T>Rubio thẳng thắn: đối thủ của Mỹ "mạnh hơn bao giờ hết" chứ không yếu đi — "chắc chắn Nga không coi mình yếu hơn so với 4 năm trước. Hiện họ kiểm soát lãnh thổ mà họ không có khi Trump rời nhiệm sở [lần đầu]."</GL_T>
          <div style={{padding:10,background:`${GL_C.ru}08`,borderRadius:6,border:`1px solid ${GL_C.ru}20`,marginTop:8}}>
            <span style={{color:GL_C.ru,fontSize:12}}>Nghịch lý Nga: kinh tế chỉ ~1.9% GDP toàn cầu nhưng vẫn là biến số quyết định nhờ vũ khí hạt nhân + tài nguyên năng lượng + vị trí địa lý xuyên lục địa Á-Âu</span>
          </div>
        </GL_Card>
      </GL_Grid>
      <GL_Card>
        <GL_STitle color={GL_C.purple}>Cuộc Rút Lui Khỏi "Chính Quyền Toàn Cầu" — Chủ Nghĩa Thực Dụng Mới</GL_STitle>
        <GL_T>Rubio mô tả một sự đảo chiều triết lý: cuối Chiến tranh Lạnh, Mỹ "trở thành chính quyền toàn cầu trong nhiều trường hợp, cố gắng giải quyết mọi vấn đề" — dẫn đến hệ quả không mong muốn. Nay chính sách đối ngoại quay lại logic thực dụng thuần túy: mỗi quốc gia hành động vì lợi ích riêng, không có ngoại lệ đạo đức.</GL_T>
        <div style={{marginTop:10,padding:12,background:`${GL_C.purple}08`,borderRadius:6,border:`1px solid ${GL_C.purple}20`}}>
          <span style={{color:GL_C.purple,fontWeight:700}}>Hệ quả cho các nước nhỏ/vừa: </span>
          <span style={{color:GL_C.text,fontSize:12.5}}>Trong logic 3 chiều (Thể chế-Vị trí-Tài nguyên), một quốc gia càng ít "hấp dẫn" theo 3 tiêu chí này càng ít bị các cường quốc can thiệp — nghịch lý là sự an toàn đôi khi đến từ việc không quá quan trọng về mặt chiến lược, chứ không phải từ sức mạnh riêng.</span>
        </div>
      </GL_Card>
    </div>
  );
}

function GL_TabCurrency() {
  return (
    <div>
      <GL_Grid cols={2} gap={16} style={{marginBottom:16}}>
        <GL_Card>
          <GL_STitle>Thị Phần Đồng Tiền Dự Trữ Toàn Cầu (%)</GL_STitle>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={GL_RESERVE_CURRENCY} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                dataKey="v" nameKey="n" paddingAngle={2}>
                {GL_RESERVE_CURRENCY.map((d,i)=><Cell key={i} fill={d.c}/>)}
              </Pie>
              <Tooltip formatter={(v,n)=>[`${v}%`,n]}/>
              <Legend wrapperStyle={{color:GL_C.text,fontSize:11}}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{color:GL_C.dim,fontSize:11,marginTop:-4,textAlign:"center"}}>USD vẫn thống trị tuyệt đối — EUR đứng thứ 2 nhưng cách xa; CNY chỉ 2.3%</div>
        </GL_Card>
        <GL_Card>
          <GL_STitle color={GL_C.orange}>Ai Đang Tìm "Sân Bay Dự Phòng" Khỏi USD?</GL_STitle>
          {[
            {n:"Trung Quốc",d:"Giảm 1/3 vị thế TPCP Mỹ trong 10 năm (từ đỉnh $1.3T) một cách âm thầm, không gây hỗn loạn — đẩy mạnh CIPS, e-CNY",c:GL_C.cn},
            {n:"Nga",d:"Bị đẩy thành 'con tin của USD' theo cách bị động (đạo luật trừng phạt) hơn là chủ động đa dạng hóa thành công",c:GL_C.ru},
            {n:"EU",d:"Thúc đẩy đồng Euro số hóa, tăng vai trò quốc tế Euro — nhưng vẫn phụ thuộc 'chiếc ô an ninh' Mỹ nên đòn bẩy hạn chế",c:GL_C.eu},
            {n:"Nhật",d:"Nghịch lý: JPY là công cụ carry trade toàn cầu (funding currency) nhưng bản thân Nhật là chủ nợ lớn của chính USD",c:GL_C.jp},
          ].map((item,i)=>(
            <div key={i} style={{marginBottom:9,paddingLeft:10,borderLeft:`2px solid ${item.c}`}}>
              <div style={{color:item.c,fontSize:12,fontWeight:700}}>{item.n}</div>
              <div style={{color:GL_C.text,fontSize:12,lineHeight:1.6}}>{item.d}</div>
            </div>
          ))}
        </GL_Card>
      </GL_Grid>
      <GL_Card style={{marginBottom:16}}>
        <GL_STitle color={GL_C.blue}>Chu Kỳ Lãi Suất 4 Ngân Hàng Trung Ương Lớn — Lệch Pha Ngày Càng Rõ</GL_STitle>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={GL_POLICY_RATES} margin={{top:5,right:20,bottom:5,left:-10}}>
            <XAxis dataKey="y" tick={{fill:GL_C.dim,fontSize:10}} axisLine={{stroke:GL_C.border}} tickLine={false}/>
            <YAxis tick={{fill:GL_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip content={<GL_TT/>}/>
            <Legend wrapperStyle={{color:GL_C.dim,fontSize:11}}/>
            <Line type="monotone" dataKey="us" stroke={GL_C.us} strokeWidth={2.5} dot={{r:3}} name="Fed (Mỹ) %"/>
            <Line type="monotone" dataKey="eu" stroke={GL_C.eu} strokeWidth={2.5} dot={{r:3}} name="ECB (EU) %"/>
            <Line type="monotone" dataKey="jp" stroke={GL_C.jp} strokeWidth={2.5} dot={{r:3}} name="BOJ (Nhật) %"/>
            <Line type="monotone" dataKey="cn" stroke={GL_C.cn} strokeWidth={2.5} dot={{r:3}} name="PBOC (TQ) %"/>
          </LineChart>
        </ResponsiveContainer>
        <GL_T style={{marginTop:8}}>Nhật là ngoại lệ hoàn toàn — giữ lãi suất gần 0%/âm suốt khi Fed-ECB tăng vọt 2022-2023, tạo <GL_HL c={GL_C.jp}>chênh lệch lãi suất khổng lồ</GL_HL> nuôi dưỡng Yen Carry Trade toàn cầu. Khi BOJ đảo chiều 2024, sự kiện "Black Monday" 8/2024 minh chứng mức độ liên kết ẩn giữa 4 hệ thống tiền tệ này.</GL_T>
      </GL_Card>
      <GL_Card>
        <GL_STitle color={GL_C.gold}>Michael Pettis Framework — Ai Đang "Xuất Khẩu" Mất Cân Bằng Cho Ai?</GL_STitle>
        <GL_T>Một cách nhìn hệ thống: tiết kiệm dư thừa của Trung Quốc (do tiêu dùng nội địa yếu) và Đức (do mô hình xuất khẩu) cần "chỗ đi" — phần lớn chảy vào tài sản Mỹ (TPCP, cổ phiếu) vì tính thanh khoản và an toàn không đâu sánh được.</GL_T>
        <div style={{marginTop:10,padding:12,background:`${GL_C.gold}08`,borderRadius:6,border:`1px solid ${GL_C.gold}20`}}>
          <span style={{color:GL_C.gold,fontWeight:700}}>Vòng lặp tự củng cố: </span>
          <span style={{color:GL_C.text,fontSize:12.5}}>Thặng dư TQ/Đức/Nhật → mua tài sản Mỹ → hỗ trợ USD mạnh & lãi suất Mỹ thấp hơn mức lẽ ra phải có → Mỹ duy trì được thâm hụt kép (ngân sách + thương mại) lâu hơn nhiều so với lý thuyết kinh tế cổ điển dự đoán → nhưng đồng thời làm sâu sắc thêm sự mất cân bằng toàn cầu mà chính hệ thống này đang cố "xuất khẩu" đi.</span>
        </div>
      </GL_Card>
    </div>
  );
}

function GL_TabChokepoints() {
  return (
    <div>
      <GL_Card style={{marginBottom:16,borderLeft:`4px solid ${GL_C.orange}`}}>
        <GL_STitle color={GL_C.orange}>Bản Đồ Điểm Nghẽn Chiến Lược Toàn Cầu</GL_STitle>
        <GL_T>Sáu điểm nghẽn địa lý-kinh tế nhỏ nhưng có khả năng gây chấn động toàn bộ hệ thống nếu bị gián đoạn — mỗi điểm liên quan trực tiếp đến ít nhất 2 trong 5 nền kinh tế đang phân tích.</GL_T>
      </GL_Card>
      <GL_Grid cols={2} gap={16} style={{marginBottom:16}}>
        {[
          {t:"Eo Biển Đài Loan",icon:"🇹🇼",c:GL_C.cn,
            d:"TSMC sản xuất ~90% chip tiên tiến (<5nm) toàn cầu. Xung đột sẽ gián đoạn chip cho cả Mỹ, EU, Nhật, Trung Quốc cùng lúc — không quốc gia công nghệ cao nào miễn nhiễm.",
            related:"Mỹ, Trung Quốc, Nhật, EU (chip)"},
          {t:"Kênh Đào Panama",icon:"🌎",c:GL_C.us,
            d:"Rubio (2025) cáo buộc doanh nghiệp Hong Kong vận hành 2 cảng đầu kênh có thể bị Bắc Kinh chỉ đạo đóng khi xung đột — Trump tuyên bố muốn giành lại quyền kiểm soát.",
            related:"Mỹ, Trung Quốc"},
          {t:"Bắc Cực & Greenland",icon:"🧊",c:GL_C.eu,
            d:"Băng tan mở tuyến hàng hải mới — Mỹ lo ngại TQ dùng vỏ bọc dân sự lập cơ sở lưỡng dụng tại Greenland (thành viên Đan Mạch, EU). Trump không loại trừ sức ép kinh tế/quân sự với đồng minh EU.",
            related:"Mỹ, EU, Trung Quốc, Nga"},
          {t:"Kaliningrad",icon:"🪆",c:GL_C.ru,
            d:"Lãnh thổ Nga tách biệt kẹp giữa Ba Lan-Lithuania (EU/NATO). Khủng hoảng quá cảnh 2022 cho thấy cả 2 bên sẵn sàng thỏa hiệp kỹ thuật khi lợi ích trực tiếp bị đe dọa.",
            related:"Nga, EU"},
          {t:"Eo Biển Hormuz",icon:"🛢️",c:GL_C.orange,
            d:"~20% dầu mỏ thế giới đi qua đây. Chiến tranh Iran 2026 khiến giá dầu chạm ngưỡng tâm lý $100/thùng — buộc Mỹ mở kho dự trữ chiến lược, nới lỏng một phần cấm vận dầu Nga.",
            related:"Toàn cầu, đặc biệt Trung Quốc-Nhật nhập khẩu"},
          {t:"Malacca & Biển Đông",icon:"⛴️",c:GL_C.cn,
            d:"Tuyến hàng hải huyết mạch nối Ấn Độ Dương-Thái Bình Dương. TQ phụ thuộc tuyến này cho phần lớn nhập khẩu năng lượng — điểm yếu chiến lược lớn nếu bị phong tỏa.",
            related:"Trung Quốc, Nhật, khu vực"},
        ].map((item,i)=>(
          <div key={i} style={{background:GL_C.card,border:`1px solid ${item.c}30`,borderRadius:8,
            padding:16,borderTop:`3px solid ${item.c}`}}>
            <div style={{fontSize:20,marginBottom:6}}>{item.icon}</div>
            <div style={{color:item.c,fontSize:13,fontWeight:700,marginBottom:6}}>{item.t}</div>
            <div style={{color:GL_C.text,fontSize:12,lineHeight:1.6,marginBottom:8}}>{item.d}</div>
            <div style={{color:GL_C.dim,fontSize:10,fontStyle:"italic"}}>Liên quan: {item.related}</div>
          </div>
        ))}
      </GL_Grid>
      <GL_Card>
        <GL_STitle color={GL_C.purple}>Vũ Khí Kinh Tế Đã Sử Dụng — Bài Học Từ Các Case Study Thật</GL_STitle>
        <GL_Grid cols={3} gap={10} style={{marginTop:6}}>
          {[
            {c:"Australia 2020",d:"TQ cấm than, rượu vang, đại mạch Úc — nhưng TQ thiệt hại nhiều hơn khi phải tìm nguồn thay thế đắt hơn",r:"Thấp"},
            {c:"Hàn Quốc 2017 (THAAD)",d:"TQ hạn chế du lịch — ảnh hưởng ngược lên chính TQ nhiều hơn dự kiến",r:"Thấp"},
            {c:"Nga 2022 (cấm vận)",d:"~$300B dự trữ bị đóng băng — Nga thích ứng qua Shadow Fleet, chuyển hướng TQ-Ấn Độ",r:"Trung Bình"},
          ].map((item,i)=>(
            <div key={i} style={{padding:12,background:GL_C.card2,borderRadius:6}}>
              <div style={{color:GL_C.purple,fontSize:11,fontWeight:700,marginBottom:5}}>{item.c}</div>
              <div style={{color:GL_C.text,fontSize:11.5,lineHeight:1.6,marginBottom:6}}>{item.d}</div>
              <GL_Badge level={item.r}/>
            </div>
          ))}
        </GL_Grid>
        <GL_T style={{marginTop:10}}><GL_HL c={GL_C.purple}>Bài học chung:</GL_HL> Vũ khí hóa thương mại/tài chính giữa các nền kinh tế lớn thường gây thiệt hại cho cả hai phía và hiếm khi đạt mục tiêu chính trị ban đầu đề ra — nhưng vẫn tiếp tục được sử dụng như công cụ răn đe và tín hiệu chính trị hơn là công cụ chiến thắng thực sự.</GL_T>
      </GL_Card>
    </div>
  );
}

function GL_TabDemographics() {
  return (
    <div>
      <GL_Card style={{marginBottom:16}}>
        <GL_STitle color={GL_C.red}>Khủng Hoảng Nhân Khẩu Học — Vấn Đề Chung Nhưng Mức Độ Khác Biệt</GL_STitle>
        <GL_T>Cả 5 nền kinh tế đều đối mặt già hóa dân số — nhưng xuất phát điểm giàu nghèo khi bắt đầu già hóa quyết định khả năng chống chịu hoàn toàn khác nhau.</GL_T>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={GL_AGING_COMPARE} margin={{top:5,right:10,bottom:5,left:-10}}>
            <XAxis dataKey="n" tick={{fill:GL_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:GL_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip content={<GL_TT/>}/>
            <Bar dataKey="v2024" name="% Dân số 65+ (2024)" radius={[4,4,0,0]}>
              {GL_AGING_COMPARE.map((d,i)=><Cell key={`a${i}`} fill={d.c}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </GL_Card>
      <GL_Grid cols={2} gap={16}>
        <GL_Card>
          <GL_STitle color={GL_C.green}>"Giàu Trước Khi Già" vs "Già Trước Khi Giàu"</GL_STitle>
          {[
            {n:"Nhật (giàu trước khi già)",d:"GDP/người khi bắt đầu già hóa (1990s) đã ~$25,000 — đủ nguồn lực đầu tư robot, tự động hóa, dần mở cửa nhập cư có chọn lọc",c:GL_C.green},
            {n:"EU (giàu trước khi già)",d:"Tuổi trung vị Đức/Tây Ban Nha vượt 46 — nhưng vẫn có hệ thống an sinh xã hội mạnh, dù đang tạo áp lực ngân sách lớn",c:GL_C.green},
            {n:"Mỹ (đệm bởi nhập cư)",d:"Tỷ lệ già hóa thấp nhất nhóm phát triển nhờ dòng nhập cư liên tục — nhưng đây cũng là chủ đề chính trị gây chia rẽ sâu sắc",c:GL_C.blue},
            {n:"Trung Quốc (già trước khi giàu)",d:"GDP/người hiện chỉ ~$12,500 khi tỷ lệ sinh đã xuống 1.0 — thấp hơn cả Nhật — rủi ro lớn nhất trong 5 nước",c:GL_C.red},
            {n:"Nga (già + chảy máu chất xám)",d:"Vấn đề kép: già hóa tự nhiên cộng thêm 800K-1M người trẻ có học vấn rời đi từ 2022 — mất cả số lượng lẫn chất lượng",c:GL_C.orange},
          ].map((item,i)=>(
            <div key={i} style={{marginBottom:9,paddingLeft:10,borderLeft:`2px solid ${item.c}`}}>
              <div style={{color:item.c,fontSize:12,fontWeight:700}}>{item.n}</div>
              <div style={{color:GL_C.text,fontSize:11.5,lineHeight:1.6}}>{item.d}</div>
            </div>
          ))}
        </GL_Card>
        <GL_Card>
          <GL_STitle color={GL_C.orange}>Phản Ứng Chính Sách — Ba Chiến Lược Khác Biệt</GL_STitle>
          <div style={{padding:12,background:GL_C.card2,borderRadius:6,marginBottom:8}}>
            <div style={{color:GL_C.jp,fontSize:11,fontWeight:700,marginBottom:4}}>NHẬT: TỰ ĐỘNG HÓA + NHẬP CƯ THẬN TRỌNG</div>
            <div style={{color:GL_C.text,fontSize:12,lineHeight:1.6}}>Robot công nghiệp/dịch vụ hàng đầu thế giới (FANUC, Yaskawa); gần đây mở visa lao động tay nghề — bước ngoặt văn hóa lớn cho quốc gia vốn cực kỳ hạn chế nhập cư</div>
          </div>
          <div style={{padding:12,background:GL_C.card2,borderRadius:6,marginBottom:8}}>
            <div style={{color:GL_C.cn,fontSize:11,fontWeight:700,marginBottom:4}}>TRUNG QUỐC: NỚI CHÍNH SÁCH SINH SẢN (chậm, ít hiệu quả)</div>
            <div style={{color:GL_C.text,fontSize:12,lineHeight:1.6}}>Từ 1 con → 2 con (2015) → 3 con (2021) — nhưng tỷ lệ sinh vẫn giảm vì chi phí nhà ở-giáo dục cao và văn hóa "lying flat" (nằm thẳng) của giới trẻ</div>
          </div>
          <div style={{padding:12,background:GL_C.card2,borderRadius:6}}>
            <div style={{color:GL_C.eu,fontSize:11,fontWeight:700,marginBottom:4}}>EU: TRANH LUẬN NHẬP CƯ CHÍNH TRỊ HÓA CAO ĐỘ</div>
            <div style={{color:GL_C.text,fontSize:12,lineHeight:1.6}}>Cần nhập cư để bù đắp lao động nhưng đây chính là chủ đề nuôi dưỡng làn sóng dân túy cực hữu khắp khối — mâu thuẫn giữa nhu cầu kinh tế và thực tế chính trị</div>
          </div>
        </GL_Card>
      </GL_Grid>
    </div>
  );
}

function GL_TabDefense() {
  return (
    <div>
      <GL_Card style={{marginBottom:16}}>
        <GL_STitle color={GL_C.red}>Chi Tiêu Quốc Phòng Toàn Cầu 2025 — Cao Nhất Kể Từ 2009</GL_STitle>
        <GL_T>Tổng chi quốc phòng toàn cầu đạt <GL_B>$2.9 nghìn tỷ</GL_B> năm 2025 (SIPRI) — tỷ lệ trên GDP toàn cầu chạm 2.5%, cao nhất kể từ 2009 — năm thứ 11 liên tiếp tăng.</GL_T>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={GL_DEFENSE_SPEND_GLOBAL} margin={{top:5,right:10,bottom:5,left:-10}}>
            <XAxis dataKey="n" tick={{fill:GL_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:GL_C.dim,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip content={<GL_TT/>}/>
            <Bar dataKey="v" name="Chi QP ($ tỷ)" radius={[4,4,0,0]}>
              {GL_DEFENSE_SPEND_GLOBAL.map((d,i)=><Cell key={i} fill={d.c}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <GL_T style={{marginTop:8}}>Mỹ vẫn chi nhiều nhất tuyệt đối nhưng <GL_HL c={GL_C.orange}>giảm 7.5%</GL_HL> năm 2025 (do không có viện trợ Ukraine mới) — trong khi <GL_HL c={GL_C.eu}>châu Âu tăng 14%</GL_HL> lên $864 tỷ, trở thành động lực chính của tăng trưởng chi tiêu toàn cầu. Đức lần đầu vượt ngưỡng NATO 2% GDP kể từ 1990.</GL_T>
      </GL_Card>
      <GL_Grid cols={2} gap={16}>
        <GL_Card>
          <GL_STitle color={GL_C.blue}>Địa Chính Trị Chip — Cuộc Đua Công Nghệ Xuyên 4 Khối</GL_STitle>
          {[
            {n:"Mỹ",d:"CHIPS Act $52.7B, dẫn đầu thiết kế nhưng phụ thuộc TSMC sản xuất",c:GL_C.us},
            {n:"Trung Quốc",d:"SMIC 7nm chi phí cao, yield thấp — Big Fund Phase 3 $47B nhưng thiếu EUV lithography",c:GL_C.cn},
            {n:"Nhật",d:"Dự án Rapidus — liên doanh 8 tập đoàn, mục tiêu chip 2nm vào 2027 với IBM",c:GL_C.jp},
            {n:"EU",d:"European Chips Act, nhưng Draghi Report xác nhận 'zero tiến độ' về bán dẫn trong 1 năm qua",c:GL_C.eu},
          ].map((item,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${GL_C.border}25`}}>
              <span style={{color:item.c,fontSize:12,fontWeight:700,minWidth:80}}>{item.n}</span>
              <span style={{color:GL_C.text,fontSize:11.5,textAlign:"right"}}>{item.d}</span>
            </div>
          ))}
        </GL_Card>
        <GL_Card>
          <GL_STitle color={GL_C.purple}>Tăng Chi Quốc Phòng — Ai Trả Giá?</GL_STitle>
          <GL_T>Tại cả EU và Mỹ, câu hỏi "guns or butter" (súng hay bơ) đang tái xuất hiện: tiền tăng quốc phòng thường lấy từ ngân sách chuyển đổi số, xanh hóa, hoặc phúc lợi xã hội — không phải từ nguồn thu mới.</GL_T>
          <div style={{marginTop:8,padding:10,background:`${GL_C.purple}08`,borderRadius:6,border:`1px solid ${GL_C.purple}20`}}>
            <span style={{color:GL_C.purple,fontSize:12}}>Draghi Report: khoản đầu tư quốc phòng €50 tỷ cần thiết theo mục tiêu NATO cạnh tranh trực tiếp nguồn lực với €450 tỷ cần cho khử carbon và €150 tỷ cho số hóa — không nước nào có đủ ngân sách cho cả ba cùng lúc.</span>
          </div>
        </GL_Card>
      </GL_Grid>
    </div>
  );
}

function GL_TabExpert() {
  return (
    <div>
      <div style={{marginBottom:20,padding:"16px 20px",background:GL_C.panel,borderRadius:8,
        border:`1px solid ${GL_C.border}`,borderLeft:`4px solid ${GL_C.gold}`}}>
        <div style={{color:GL_C.gold,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>GÓC CHUYÊN GIA — TỔNG HỢP QUAN ĐIỂM HỆ THỐNG TOÀN CẦU</div>
        <p style={{color:GL_C.bright,fontSize:14,lineHeight:1.75,margin:0}}>
          Các quan điểm xuyên quốc gia — không thuộc riêng một nền kinh tế nào — rút ra từ nhiều bài viết vĩ mô của cùng một tác giả,
          nhìn hệ thống toàn cầu như một chỉnh thể liên kết.
        </p>
        <div style={{color:GL_C.dim,fontSize:11,marginTop:8,fontStyle:"italic"}}>
          * Tóm tắt quan điểm cá nhân của tác giả các bài viết, trình bày để đối chiếu góc nhìn.
        </div>
      </div>

      <GL_Card style={{marginBottom:16}}>
        <GL_STitle>"Kỷ Nguyên Tiền Tệ Dễ Dãi" — Khung Nhìn Bao Trùm Cả Hệ Thống (2021)</GL_STitle>
        <GL_T>Luận điểm trung tâm xuất hiện xuyên suốt nhiều bài từ 2021: các NHTW lớn toàn cầu (không riêng Fed) đã duy trì <GL_B>lãi suất thấp + bơm tiền ào ạt + vòng quay vốn chậm</GL_B> như một "Bình thường mới" kéo dài hàng thập kỷ — không phải hiện tượng chu kỳ ngắn hạn.</GL_T>
        <div style={{padding:12,background:`${GL_C.gold}08`,borderRadius:6,border:`1px solid ${GL_C.gold}20`,marginTop:8}}>
          <span style={{color:GL_C.gold,fontWeight:700}}>Dự báo dài hạn (04/2021): </span>
          <span style={{color:GL_C.text,fontSize:12.5}}>"2029-2030 sẽ có trật tự tiền tệ mới" — một mốc thời gian đưa ra khi phần lớn thế giới còn tin lãi suất 0% là vĩnh viễn. Đến 2024, dù Fed-ECB đã thắt chặt mạnh, tác giả vẫn giữ nguyên quan điểm đây chỉ là "chiến thuật" trong khuôn khổ kỷ nguyên cũ — chưa phải điểm kết thúc.</span>
        </div>
      </GL_Card>

      <GL_Card style={{marginBottom:16}}>
        <GL_STitle color={GL_C.orange}>ESG/Chuyển Đổi Xanh Như Công Cụ Địa Chính Trị Kép (2022)</GL_STitle>
        <GL_T>Một luận điểm gây tranh cãi nhưng nhất quán qua nhiều bài: đà thúc đẩy ESG/Green Transformation toàn cầu — dù có động cơ môi trường thật — đồng thời phục vụ mục tiêu địa chính trị nhắm vào <GL_B>cả Nga lẫn Trung Quốc</GL_B> cùng lúc, do cả hai đều là nền kinh tế phụ thuộc tài nguyên/công nghiệp nặng.</GL_T>
        <GL_Grid cols={2} gap={12} style={{marginTop:10}}>
          <div style={{padding:12,background:`${GL_C.ru}08`,borderRadius:6,border:`1px solid ${GL_C.ru}20`}}>
            <div style={{color:GL_C.ru,fontSize:10,fontWeight:700,marginBottom:6}}>NGA</div>
            <div style={{color:GL_C.text,fontSize:12}}>Giảm phụ thuộc dầu khí Nga = hạ vị thế đòn bẩy năng lượng của Nga trong dài hạn</div>
          </div>
          <div style={{padding:12,background:`${GL_C.cn}08`,borderRadius:6,border:`1px solid ${GL_C.cn}20`}}>
            <div style={{color:GL_C.cn,fontSize:10,fontWeight:700,marginBottom:6}}>TRUNG QUỐC</div>
            <div style={{color:GL_C.text,fontSize:12}}>Ép cam kết carbon neutral 2050 = ép giảm tốc mô hình tăng trưởng công nghiệp nặng giá rẻ</div>
          </div>
        </GL_Grid>
        <GL_T style={{marginTop:8}}>Tác giả tự nhận là người ủng hộ chuyển đổi Xanh "không cực đoan" — không phủ nhận giá trị môi trường, chỉ lưu ý thêm chiều kích chính trị thường bị bỏ qua khi phân tích tác động ESG lên các nền kinh tế tài nguyên.</GL_T>
      </GL_Card>

      <GL_Card style={{marginBottom:16}}>
        <GL_STitle color={GL_C.purple}>Khung Dự Báo Hành Vi — Vì Sao Hệ Thống Này Khó Dự Đoán</GL_STitle>
        <GL_T>Một đóng góp phương pháp luận quan trọng: dự báo về hệ thống gồm nhiều nền kinh tế lớn tương tác lẫn nhau đặc biệt khó vì có tính <GL_B>tự triệt tiêu</GL_B> — hành động của một nước phản ứng trước dự báo có thể làm chính dự báo đó sai ở nước khác.</GL_T>
        <div style={{padding:12,background:`${GL_C.purple}08`,borderRadius:6,border:`1px solid ${GL_C.purple}20`,marginTop:8}}>
          <span style={{color:GL_C.purple,fontWeight:700}}>Thống kê tham chiếu: </span>
          <span style={{color:GL_C.text,fontSize:12.5}}>Ngay cả chuyên gia kinh tế hàng đầu IMF chỉ dự đoán đúng một cuộc suy thoái 1 năm trước khi xảy ra <GL_HL c={GL_C.purple}>5/153 lần (3.3%)</GL_HL> — với hệ thống 5 nền kinh tế liên đới phức tạp như hiện tại, độ khó dự báo còn cao hơn nhiều so với dự báo một nền kinh tế đơn lẻ.</span>
        </div>
      </GL_Card>

      <GL_Card>
        <GL_STitle color={GL_C.gold}>Đúc Kết — "Trật Tự Cũ Điều Chỉnh, Trật Tự Mới Chưa Hình Thành"</GL_STitle>
        <GL_T>Một câu tổng kết từ bài phân tích Iran/Trung Đông (03/2026) có thể áp dụng cho toàn bộ bức tranh 5 nền kinh tế: <em>"Trụ cột tài chính tiền tệ trật tự cũ cũng đang và sẽ buộc phải điều chỉnh theo trật tự mới. Vấn đề khó ở chỗ trật tự mới chưa hình thành."</em></GL_T>
        <div style={{marginTop:12,padding:16,background:`${GL_C.gold}08`,borderRadius:8,border:`1px solid ${GL_C.gold}25`}}>
          <div style={{color:GL_C.gold,fontSize:11,fontWeight:700,marginBottom:8}}>BA CÂU HỎI MỞ XUYÊN SUỐT TOÀN BỘ PHÂN TÍCH:</div>
          <div style={{color:GL_C.text,fontSize:13,lineHeight:1.85}}>
            <GL_HL c={GL_C.us}>1.</GL_HL> Mỹ còn khả năng áp đặt ý chí bằng sức mạnh quân sự-kinh tế nhanh gọn, hay chi phí duy trì vị thế đang vượt lợi ích thu về?<br/>
            <GL_HL c={GL_C.eu}>2.</GL_HL> Các hành lang, liên minh kinh tế khu vực (EU, BRICS, CPTPP) có thể tồn tại độc lập ngoài quỹ đạo Mỹ-Trung, hay sẽ buộc phải chọn phe?<br/>
            <GL_HL c={GL_C.cn}>3.</GL_HL> Cơ chế tài chính không-USD (CIPS, e-CNY, BRICS Pay) có thể đứng vững trước áp lực trừng phạt và chiến tranh, hay mãi chỉ là "sân bay dự phòng" chưa bao giờ cất cánh?
          </div>
        </div>
      </GL_Card>
    </div>
  );
}

const GL_TABS = [
  {id:0,label:"Dashboard",icon:"🌐"},
  {id:1,label:"Trật Tự Đa Cực",icon:"⚖️"},
  {id:2,label:"Chiến Tranh Tiền Tệ",icon:"💱"},
  {id:3,label:"Điểm Nghẽn Chiến Lược",icon:"🔗"},
  {id:4,label:"Nhân Khẩu Học",icon:"👥"},
  {id:5,label:"Quốc Phòng & Chip",icon:"🛡️"},
  {id:6,label:"Góc Chuyên Gia",icon:"🎓"},
];
const GL_CONTENT = [
  <GL_TabDashboard/>,<GL_TabMultipolar/>,<GL_TabCurrency/>,<GL_TabChokepoints/>,<GL_TabDemographics/>,<GL_TabDefense/>,<GL_TabExpert/>,
];
/* ==================== UNIFIED APP — 2-LEVEL NAVIGATION ==================== */

const REGIONS = [
  {
    id: "cn", label: "Trung Quốc", icon: "🇨🇳",
    accent: CN_C.gold, bgGrad: "linear-gradient(135deg,#FFFFFF 0%,#F3F6FB 100%)",
    tabs: CN_TABS, content: CN_CONTENT,
  },
  {
    id: "us", label: "Mỹ", icon: "🇺🇸",
    accent: US_C.navy, bgGrad: "linear-gradient(135deg,#FFFFFF 0%,#F2F5FA 100%)",
    tabs: US_TABS, content: US_CONTENT,
  },
  {
    id: "ru", label: "Nga", icon: "🇷🇺",
    accent: RU_C.crimson, bgGrad: "linear-gradient(135deg,#FFFFFF 0%,#FBF2F1 100%)",
    tabs: RU_TABS, content: RU_CONTENT,
  },
  {
    id: "eu", label: "EU", icon: "🇪🇺",
    accent: EU_C.euGold, bgGrad: "linear-gradient(135deg,#FFFFFF 0%,#F2F4FB 100%)",
    tabs: EU_TABS, content: EU_CONTENT,
  },
  {
    id: "jp", label: "Nhật Bản", icon: "🇯🇵",
    accent: JP_C.sakura, bgGrad: "linear-gradient(135deg,#FFFFFF 0%,#F5F3F6 100%)",
    tabs: JP_TABS, content: JP_CONTENT,
  },
  {
    id: "gl", label: "Toàn Cầu", icon: "🌐",
    accent: GL_C.gold, bgGrad: "linear-gradient(135deg,#FFFFFF 0%,#F3F3F8 100%)",
    tabs: GL_TABS, content: GL_CONTENT,
  },
];

const APP_BG = "#FAF9F6";
const APP_BORDER = "#E4E1D8";
const APP_TEXT = "#6B6558";
const APP_BRIGHT = "#1C1D1B";
const APP_MUTED = "#9A968A";

export default function App() {
  const [regionIdx, setRegionIdx] = useState(() => {
    const fromUrl = getSubTabFromUrl();
    const idx = REGIONS.findIndex((r) => r.id === fromUrl);
    return idx !== -1 ? idx : 0;
  });
  const [tabIdx, setTabIdx] = useState(0);
  const region = REGIONS[regionIdx];
  useEffect(() => { syncSubTabToUrl(region.id); }, [region.id]);

  const selectRegion = (idx) => {
    setRegionIdx(idx);
    setTabIdx(0);
    window.__scrollArticleToTop?.();
  };

  // Điều hướng "tab tiếp theo": hết tab trong vùng hiện tại thì nhảy sang vùng kế tiếp
  const isLastTabInRegion = tabIdx === region.tabs.length - 1;
  const isLastRegion = regionIdx === REGIONS.length - 1;
  const nextRegion = !isLastRegion ? REGIONS[regionIdx + 1] : null;
  const nextTabLabel = !isLastTabInRegion ? region.tabs[tabIdx + 1].label : (nextRegion ? `${nextRegion.icon} ${nextRegion.label} · ${nextRegion.tabs[0].label}` : null);
  const goNextTab = () => {
    if (!isLastTabInRegion) {
      setTabIdx(tabIdx + 1);
    } else if (nextRegion) {
      setRegionIdx(regionIdx + 1);
      setTabIdx(0);
    }
    window.__scrollArticleToTop?.();
  };

  return (
    <div style={{background:APP_BG,fontFamily:"'Inter',system-ui,sans-serif",color:APP_BRIGHT}}>
      {/* Gộp LEVEL 1 + LEVEL 2 vào chung 1 khối sticky top:0 — tránh phải đoán
          trước chiều cao của LEVEL 1 (dễ lệch mỗi khi chỉnh padding/nội dung),
          2 hàng tự xếp chồng theo flow bình thường bên trong khối luôn đứng yên. */}
      <div className="mobile-static" style={{position:"sticky",top:0,zIndex:20,background:"#FCFBF8"}}>
        {/* LEVEL 1 — REGION SELECTOR */}
        <div style={{borderBottom:`1px solid ${APP_BORDER}`,padding:"14px 24px 0 24px"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
            <div style={{width:3,height:30,background:"linear-gradient(180deg,#4f8fef 0%,#e05252 25%,#d13b4a 50%,#ffcc00 75%,#f0a0b5 100%)",borderRadius:2}}/>
            <div>
              <div style={{fontSize:16,fontWeight:700,color:APP_BRIGHT,letterSpacing:"-0.02em"}}>GIẢI PHẪU KINH TẾ TOÀN CẦU</div>
              <div style={{color:APP_MUTED,fontSize:9,letterSpacing:"0.16em",textTransform:"uppercase",marginTop:1}}>MỸ • TRUNG QUỐC • NGA • EU • NHẬT BẢN • TỔNG QUAN — PHÂN TÍCH CHUYÊN SÂU HỢP NHẤT</div>
            </div>
          </div>
          <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:12}}>
            {REGIONS.map((r, i) => (
              <button key={r.id} onClick={() => selectRegion(i)} style={{
                background: regionIdx === i ? r.accent : "#FFFFFF",
                color: regionIdx === i ? "#fff" : APP_TEXT,
                border: `0.5px solid ${regionIdx === i ? r.accent : APP_BORDER}`,
                padding: "8px 16px", cursor: "pointer", borderRadius: 8,
                fontSize: 13, fontWeight: regionIdx === i ? 700 : 500,
                whiteSpace: "nowrap", transition: "all 0.15s",
              }}>
                {r.icon} {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* LEVEL 2 — TAB SELECTOR WITHIN REGION */}
        <div style={{borderBottom:`1px solid ${APP_BORDER}`,padding:"10px 24px"}}>
          <div style={{display:"flex",gap:6,overflowX:"auto"}}>
            {region.tabs.map((t) => (
              <button key={t.id} onClick={() => { setTabIdx(t.id); window.__scrollArticleToTop?.(); }} style={{
                background: tabIdx === t.id ? region.accent : "#FFFFFF",
                color: tabIdx === t.id ? "#fff" : APP_TEXT,
                border: `0.5px solid ${tabIdx === t.id ? region.accent : APP_BORDER}`,
                padding: "7px 14px", cursor: "pointer", borderRadius: 8,
                fontSize: 12.5, fontWeight: tabIdx === t.id ? 700 : 500,
                whiteSpace: "nowrap", transition: "all 0.15s",
              }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{padding:"20px 24px"}}>
        {region.content[tabIdx]}

        {nextTabLabel && (
          <div style={{display:"flex",justifyContent:"flex-end",marginTop:24,paddingTop:16,borderTop:`1px solid ${APP_BORDER}`}}>
            <button onClick={goNextTab} style={{
              display:"flex",alignItems:"center",gap:8,padding:"10px 16px",
              border:`1px solid ${region.accent}55`,borderRadius:8,
              background:`${region.accent}15`,color:region.accent,
              fontSize:13,fontWeight:600,cursor:"pointer"
            }}>
              Tiếp: {nextTabLabel} →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
